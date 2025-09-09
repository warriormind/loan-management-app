import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  CreditCard, 
  PiggyBank,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const mockUser = {
  name: "John Mukela",
  accountNumber: "ACC-12345",
  balance: 250000, // MWK
  totalSavings: 150000, // MWK
  currentLoan: {
    amount: 500000, // MWK
    remaining: 320000, // MWK
    nextPayment: 45000, // MWK
    dueDate: "2025-09-15",
    status: "active"
  }
};

const recentActivity = [
  { id: 1, type: 'payment', description: 'Loan Payment', amount: -45000, date: '2025-08-01', status: 'completed' },
  { id: 2, type: 'deposit', description: 'Savings Deposit', amount: 25000, date: '2025-07-28', status: 'completed' },
  { id: 3, type: 'payment', description: 'Loan Payment', amount: -45000, date: '2025-07-01', status: 'completed' },
  { id: 4, type: 'deposit', description: 'Savings Deposit', amount: 20000, date: '2025-06-25', status: 'completed' },
];

export function DashboardTab() {
  const loanProgress = ((mockUser.currentLoan.amount - mockUser.currentLoan.remaining) / mockUser.currentLoan.amount) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg">
        <h1>Welcome back, {mockUser.name}</h1>
        <p className="opacity-90">Account: {mockUser.accountNumber}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {mockUser.balance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +MWK 12,500 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Loan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {mockUser.currentLoan.remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Remaining of MWK {mockUser.currentLoan.amount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {mockUser.currentLoan.nextPayment.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Due {mockUser.currentLoan.dueDate}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Loan Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Loan Progress</span>
              <Badge variant="secondary">{Math.round(loanProgress)}% Paid</Badge>
            </div>
            <Progress value={loanProgress} className="w-full" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Original Amount:</span>
                <span>MWK {mockUser.currentLoan.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Amount Paid:</span>
                <span>MWK {(mockUser.currentLoan.amount - mockUser.currentLoan.remaining).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Remaining:</span>
                <span>MWK {mockUser.currentLoan.remaining.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Payment Due in 14 days
                </span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Your next payment of MWK {mockUser.currentLoan.nextPayment.toLocaleString()} is due on {mockUser.currentLoan.dueDate}
              </p>
            </div>

            <Button className="w-full">Make Payment</Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'payment' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {activity.type === 'payment' ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      activity.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.amount > 0 ? '+' : ''}MWK {Math.abs(activity.amount).toLocaleString()}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">Make Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <PiggyBank className="h-5 w-5" />
              <span className="text-sm">Add Savings</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">Check Eligibility</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}