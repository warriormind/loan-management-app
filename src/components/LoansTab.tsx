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
import { Search, Plus, Eye, Edit, DollarSign, Calendar, Percent } from 'lucide-react';

const mockLoans = [
  {
    id: 'L001',
    borrowerId: 'B001',
    borrowerName: 'John Smith',
    amount: 25000,
    interestRate: 12.5,
    term: 36,
    status: 'Active',
    startDate: '2023-06-15',
    dueDate: '2026-06-15',
    remainingBalance: 18500,
    nextPayment: '2024-02-15',
    monthlyPayment: 832.50
  },
  {
    id: 'L002',
    borrowerId: 'B002',
    borrowerName: 'Sarah Johnson',
    amount: 15000,
    interestRate: 10.8,
    term: 24,
    status: 'Active',
    startDate: '2023-09-01',
    dueDate: '2025-09-01',
    remainingBalance: 9200,
    nextPayment: '2024-02-01',
    monthlyPayment: 695.20
  },
  {
    id: 'L003',
    borrowerId: 'B003',
    borrowerName: 'Michael Brown',
    amount: 30000,
    interestRate: 15.2,
    term: 48,
    status: 'Overdue',
    startDate: '2022-12-10',
    dueDate: '2026-12-10',
    remainingBalance: 22800,
    nextPayment: '2023-12-10',
    monthlyPayment: 854.30
  },
  {
    id: 'L004',
    borrowerId: 'B004',
    borrowerName: 'Emily Davis',
    amount: 40000,
    interestRate: 9.5,
    term: 60,
    status: 'Active',
    startDate: '2023-03-20',
    dueDate: '2028-03-20',
    remainingBalance: 35600,
    nextPayment: '2024-02-20',
    monthlyPayment: 835.40
  }
];

export function LoansTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredLoans = mockLoans.filter(loan =>
    loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.borrowerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Defaulted': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const calculateProgress = (amount: number, remaining: number) => {
    return ((amount - remaining) / amount) * 100;
  };

  const totalLoansAmount = mockLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalOutstanding = mockLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  const activeLoans = mockLoans.filter(loan => loan.status === 'Active').length;
  const overdueLoans = mockLoans.filter(loan => loan.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Loans</p>
                <p className="text-2xl font-semibold">K{totalLoansAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-semibold">K{totalOutstanding.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-semibold">{activeLoans}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-semibold">{overdueLoans}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Loans Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search loans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Loan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Loan</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="borrower">Borrower</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select borrower" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B001">John Smith (B001)</SelectItem>
                          <SelectItem value="B002">Sarah Johnson (B002)</SelectItem>
                          <SelectItem value="B003">Michael Brown (B003)</SelectItem>
                          <SelectItem value="B004">Emily Davis (B004)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Loan Amount</Label>
                      <Input id="amount" type="number" placeholder="Enter loan amount" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="interest">Interest Rate (%)</Label>
                      <Input id="interest" type="number" step="0.1" placeholder="Enter interest rate" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="term">Term (months)</Label>
                      <Input id="term" type="number" placeholder="Enter term in months" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Create Loan
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
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{loan.borrowerName}</div>
                        <div className="text-sm text-muted-foreground">{loan.borrowerId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">K{loan.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          Remaining: K{loan.remainingBalance.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Percent className="w-3 h-3" />
                        {loan.interestRate}%
                      </div>
                    </TableCell>
                    <TableCell>{loan.term} months</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={calculateProgress(loan.amount, loan.remainingBalance)} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {Math.round(calculateProgress(loan.amount, loan.remainingBalance))}% paid
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(loan.status)}>
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{loan.nextPayment}</div>
                        <div className="text-sm text-muted-foreground">
                          K{loan.monthlyPayment.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-green-600">
                          Payment
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