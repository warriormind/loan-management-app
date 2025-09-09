import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Search, Plus, TrendingUp, PiggyBank, Target, Calendar } from 'lucide-react';

const mockSavingsAccounts = [
  {
    id: 'S001',
    accountNumber: 'SAV001234567',
    customerName: 'John Smith',
    customerId: 'C001',
    accountType: 'Regular Savings',
    currentBalance: 15420.50,
    interestRate: 3.5,
    minimumBalance: 500,
    openDate: '2023-01-15',
    lastTransaction: '2024-01-20',
    status: 'Active',
    goal: 25000,
    monthlyDeposit: 800
  },
  {
    id: 'S002',
    accountNumber: 'SAV002345678',
    customerName: 'Sarah Johnson',
    customerId: 'C002',
    accountType: 'High Yield',
    currentBalance: 42150.25,
    interestRate: 4.2,
    minimumBalance: 1000,
    openDate: '2022-11-08',
    lastTransaction: '2024-01-18',
    status: 'Active',
    goal: 50000,
    monthlyDeposit: 1200
  },
  {
    id: 'S003',
    accountNumber: 'SAV003456789',
    customerName: 'Michael Brown',
    customerId: 'C003',
    accountType: 'Goal Savings',
    currentBalance: 8950.75,
    interestRate: 3.8,
    minimumBalance: 250,
    openDate: '2023-05-22',
    lastTransaction: '2023-12-05',
    status: 'Dormant',
    goal: 15000,
    monthlyDeposit: 500
  },
  {
    id: 'S004',
    accountNumber: 'SAV004567890',
    customerName: 'Emily Davis',
    customerId: 'C004',
    accountType: 'Premium Savings',
    currentBalance: 67890.40,
    interestRate: 4.8,
    minimumBalance: 5000,
    openDate: '2022-08-12',
    lastTransaction: '2024-01-22',
    status: 'Active',
    goal: 100000,
    monthlyDeposit: 2500
  }
];

export function SavingsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAccounts = mockSavingsAccounts.filter(account => {
    const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = accountTypeFilter === 'all' || 
                       account.accountType.toLowerCase().replace(' ', '-') === accountTypeFilter;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Dormant': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Frozen': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateGoalProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const totalSavings = mockSavingsAccounts.reduce((sum, account) => sum + account.currentBalance, 0);
  const activeAccounts = mockSavingsAccounts.filter(account => account.status === 'Active').length;
  const avgInterestRate = mockSavingsAccounts.reduce((sum, account) => sum + account.interestRate, 0) / mockSavingsAccounts.length;
  const totalGoals = mockSavingsAccounts.reduce((sum, account) => sum + account.goal, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-2xl font-semibold">K{totalSavings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Accounts</p>
                <p className="text-2xl font-semibold">{activeAccounts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Interest Rate</p>
                <p className="text-2xl font-semibold">{avgInterestRate.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-semibold">K{totalGoals.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Savings Accounts</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={accountTypeFilter} onValueChange={setAccountTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="regular-savings">Regular Savings</SelectItem>
                  <SelectItem value="high-yield">High Yield</SelectItem>
                  <SelectItem value="goal-savings">Goal Savings</SelectItem>
                  <SelectItem value="premium-savings">Premium Savings</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Open New Savings Account</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="customer">Customer</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="C001">John Smith (C001)</SelectItem>
                          <SelectItem value="C002">Sarah Johnson (C002)</SelectItem>
                          <SelectItem value="C003">Michael Brown (C003)</SelectItem>
                          <SelectItem value="C004">Emily Davis (C004)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="account-type">Account Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular Savings (3.5% APY)</SelectItem>
                          <SelectItem value="high-yield">High Yield (4.2% APY)</SelectItem>
                          <SelectItem value="goal">Goal Savings (3.8% APY)</SelectItem>
                          <SelectItem value="premium">Premium Savings (4.8% APY)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="initial-deposit">Initial Deposit</Label>
                      <Input id="initial-deposit" type="number" placeholder="Enter initial deposit amount" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="savings-goal">Savings Goal (Optional)</Label>
                      <Input id="savings-goal" type="number" placeholder="Enter savings goal" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="monthly-target">Monthly Deposit Target (Optional)</Label>
                      <Input id="monthly-target" type="number" placeholder="Enter monthly target" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Open Account
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Goal Progress</TableHead>
                  <TableHead>Monthly Target</TableHead>
                  <TableHead>Last Transaction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.accountNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{account.customerName}</div>
                        <div className="text-sm text-muted-foreground">{account.customerId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold">K{account.currentBalance.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          Min: K{account.minimumBalance.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        {account.interestRate}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 min-w-32">
                        <div className="flex justify-between text-xs">
                          <span>K{account.currentBalance.toLocaleString()}</span>
                          <span>K{account.goal.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={calculateGoalProgress(account.currentBalance, account.goal)} 
                          className="h-2" 
                        />
                        <div className="text-xs text-muted-foreground text-center">
                          {Math.round(calculateGoalProgress(account.currentBalance, account.goal))}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        K{account.monthlyDeposit.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{account.lastTransaction}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(account.status)}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Deposit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-green-600">
                          Withdraw
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}