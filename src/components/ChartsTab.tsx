import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const loanTrendData = [
  { month: 'Jan', disbursed: 450000, collected: 380000, outstanding: 2200000 },
  { month: 'Feb', disbursed: 520000, collected: 420000, outstanding: 2300000 },
  { month: 'Mar', disbursed: 480000, collected: 460000, outstanding: 2320000 },
  { month: 'Apr', disbursed: 600000, collected: 510000, outstanding: 2410000 },
  { month: 'May', disbursed: 550000, collected: 580000, outstanding: 2380000 },
  { month: 'Jun', disbursed: 650000, collected: 620000, outstanding: 2410000 }
];

const loanStatusData = [
  { name: 'Active', value: 68, color: '#10B981' },
  { name: 'Overdue', value: 15, color: '#EF4444' },
  { name: 'Paid Off', value: 12, color: '#3B82F6' },
  { name: 'Under Review', value: 5, color: '#F59E0B' }
];

const interestRateData = [
  { range: '5-8%', count: 25 },
  { range: '8-12%', count: 45 },
  { range: '12-15%', count: 35 },
  { range: '15-18%', count: 20 },
  { range: '18%+', count: 10 }
];

const monthlyRevenueData = [
  { month: 'Jan', revenue: 85000, expenses: 45000, profit: 40000 },
  { month: 'Feb', revenue: 92000, expenses: 48000, profit: 44000 },
  { month: 'Mar', revenue: 88000, expenses: 46000, profit: 42000 },
  { month: 'Apr', revenue: 95000, expenses: 50000, profit: 45000 },
  { month: 'May', revenue: 102000, expenses: 52000, profit: 50000 },
  { month: 'Jun', revenue: 108000, expenses: 54000, profit: 54000 }
];

export function ChartsTab() {
  return (
    <div className="space-y-6">
      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Portfolio Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loanTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="disbursed" stroke="#3B82F6" strokeWidth={2} name="Disbursed" />
                  <Line type="monotone" dataKey="collected" stroke="#10B981" strokeWidth={2} name="Collected" />
                  <Line type="monotone" dataKey="outstanding" stroke="#F59E0B" strokeWidth={2} name="Outstanding" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loanStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {loanStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Interest Rate Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interestRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue & Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Expenses" />
                  <Area type="monotone" dataKey="profit" stackId="3" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
              <p className="text-2xl font-semibold">$2.41M</p>
              <p className="text-sm text-green-600">+12.5% vs last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Active Loans</p>
              <p className="text-2xl font-semibold">138</p>
              <p className="text-sm text-blue-600">+8 new this month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Default Rate</p>
              <p className="text-2xl font-semibold">2.8%</p>
              <p className="text-sm text-red-600">-0.3% vs last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg Interest</p>
              <p className="text-2xl font-semibold">11.2%</p>
              <p className="text-sm text-purple-600">Market competitive</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}