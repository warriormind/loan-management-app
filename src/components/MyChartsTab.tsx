import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  PiggyBank,
  CreditCard
} from 'lucide-react';

const savingsData = [
  { month: 'Jan', savings: 45000, deposits: 15000, interest: 380 },
  { month: 'Feb', savings: 62000, deposits: 17000, interest: 425 },
  { month: 'Mar', savings: 83000, deposits: 21000, interest: 510 },
  { month: 'Apr', savings: 108000, deposits: 25000, interest: 620 },
  { month: 'May', savings: 135000, deposits: 27000, interest: 735 },
  { month: 'Jun', savings: 165000, deposits: 30000, interest: 860 },
  { month: 'Jul', savings: 198000, deposits: 33000, interest: 995 },
  { month: 'Aug', savings: 234000, deposits: 36000, interest: 1150 },
];

const loanData = [
  { month: 'Jan', balance: 485000, payment: 45000, interest: 4850 },
  { month: 'Feb', balance: 442000, payment: 45000, interest: 4420 },
  { month: 'Mar', balance: 399000, payment: 45000, interest: 3990 },
  { month: 'Apr', balance: 356000, payment: 45000, interest: 3560 },
  { month: 'May', balance: 313000, payment: 45000, interest: 3130 },
  { month: 'Jun', balance: 270000, payment: 45000, interest: 2700 },
  { month: 'Jul', balance: 227000, payment: 45000, interest: 2270 },
  { month: 'Aug', balance: 184000, payment: 45000, interest: 1840 },
];

const expenseData = [
  { category: 'Loan Payments', amount: 45000, color: '#8884d8' },
  { category: 'Savings', amount: 36000, color: '#82ca9d' },
  { category: 'Insurance', amount: 8000, color: '#ffc658' },
  { category: 'Bank Fees', amount: 2500, color: '#ff7c7c' },
  { category: 'Other', amount: 3500, color: '#8dd1e1' },
];

const recentActivityData = [
  { date: '2025-08-28', type: 'Deposit', amount: 15000, category: 'Savings' },
  { date: '2025-08-25', type: 'Payment', amount: -45000, category: 'Loan' },
  { date: '2025-08-22', type: 'Deposit', amount: 25000, category: 'Savings' },
  { date: '2025-08-20', type: 'Interest', amount: 532, category: 'Savings' },
  { date: '2025-08-18', type: 'Fee', amount: -250, category: 'Bank' },
  { date: '2025-08-15', type: 'Deposit', amount: 20000, category: 'Savings' },
  { date: '2025-08-10', type: 'Payment', amount: -45000, category: 'Loan' },
  { date: '2025-08-05', type: 'Deposit', amount: 18000, category: 'Savings' },
];

export function MyChartsTab() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');

  const totalSavings = savingsData[savingsData.length - 1].savings;
  const totalDeposits = savingsData.reduce((sum, data) => sum + data.deposits, 0);
  const totalInterestEarned = savingsData.reduce((sum, data) => sum + data.interest, 0);
  const currentLoanBalance = loanData[loanData.length - 1].balance;

  const monthlyGrowth = ((savingsData[savingsData.length - 1].savings - savingsData[savingsData.length - 2].savings) / savingsData[savingsData.length - 2].savings * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {totalSavings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{monthlyGrowth}% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposited</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {totalDeposits.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Across all accounts
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interest Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {totalInterestEarned.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              This year
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {currentLoanBalance.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              Decreasing monthly
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Analytics</h2>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="1year">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Savings Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Savings Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `MWK ${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                formatter={(value: number) => [`MWK ${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
                name="Total Savings"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Paydown Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Paydown Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={loanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `MWK ${(value / 1000).toFixed(0)}K`} />
                <Tooltip 
                  formatter={(value: number) => [`MWK ${value.toLocaleString()}`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#ff7c7c" 
                  strokeWidth={2}
                  name="Remaining Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Deposits vs Interest */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Deposits vs Interest Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `MWK ${(value / 1000).toFixed(0)}K`} />
                <Tooltip 
                  formatter={(value: number) => [`MWK ${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Bar dataKey="deposits" fill="#82ca9d" name="Deposits" />
                <Bar dataKey="interest" fill="#8884d8" name="Interest" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`MWK ${value.toLocaleString()}`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recentActivityData.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${
                      activity.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {activity.amount > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date} • {activity.category}
                      </p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    activity.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.amount > 0 ? '+' : ''}MWK {Math.abs(activity.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}