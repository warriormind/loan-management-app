import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  PiggyBank, 
  Plus, 
  TrendingUp, 
  Target,
  Calendar,
  DollarSign
} from 'lucide-react';

const savingsAccounts = [
  {
    id: 1,
    name: "Emergency Fund",
    balance: 75000, // MWK
    target: 100000, // MWK
    interestRate: 8.5,
    type: "savings",
    lastDeposit: "2025-08-28"
  },
  {
    id: 2,
    name: "House Down Payment",
    balance: 180000, // MWK
    target: 500000, // MWK
    interestRate: 10.0,
    type: "fixed_deposit",
    lastDeposit: "2025-08-25"
  },
  {
    id: 3,
    name: "Children's Education",
    balance: 95000, // MWK
    target: 300000, // MWK
    interestRate: 9.2,
    type: "education_savings",
    lastDeposit: "2025-08-20"
  }
];

const recentTransactions = [
  { id: 1, account: "Emergency Fund", type: "deposit", amount: 15000, date: "2025-08-28", status: "completed" },
  { id: 2, account: "House Down Payment", type: "deposit", amount: 25000, date: "2025-08-25", status: "completed" },
  { id: 3, account: "Emergency Fund", type: "interest", amount: 532, date: "2025-08-01", status: "completed" },
  { id: 4, account: "Children's Education", type: "deposit", amount: 20000, date: "2025-08-20", status: "completed" },
];

export function MySavingsTab() {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

  const totalSavings = savingsAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalTargets = savingsAccounts.reduce((sum, account) => sum + account.target, 0);
  const overallProgress = (totalSavings / totalTargets) * 100;

  const handleDeposit = () => {
    // Handle deposit logic here
    console.log('Depositing', depositAmount, 'to', selectedAccount);
    setIsDepositDialogOpen(false);
    setDepositAmount('');
    setSelectedAccount('');
  };

  return (
    <div className="space-y-6">
      {/* Savings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +MWK 8,750 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
            <Progress value={overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              MWK {(totalTargets - totalSavings).toLocaleString()} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Interest</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK 2,380</div>
            <p className="text-xs text-muted-foreground">
              Average 8.9% APY
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Savings Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Savings Accounts</CardTitle>
          <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Make Deposit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Make a Deposit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="account">Select Account</Label>
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose savings account" />
                    </SelectTrigger>
                    <SelectContent>
                      {savingsAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.name}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (MWK)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter deposit amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleDeposit} className="w-full">
                  Confirm Deposit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savingsAccounts.map((account) => {
              const progress = (account.balance / account.target) * 100;
              return (
                <Card key={account.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{account.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {account.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {account.interestRate}% APY
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">MWK {account.balance.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        of MWK {account.target.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Goal</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last deposit: {account.lastDeposit}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      MWK {(account.target - account.balance).toLocaleString()} to go
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Savings Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'interest' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {transaction.type === 'interest' ? (
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    ) : (
                      <PiggyBank className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.type === 'interest' ? 'Interest Earned' : 'Deposit'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.account} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    +MWK {transaction.amount.toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}