import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Calculator, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const accountingData = [
  { account: 'Cash & Bank', balance: 245000, type: 'Asset', change: '+5.2%' },
  { account: 'Loan Receivables', balance: 2410000, type: 'Asset', change: '+8.1%' },
  { account: 'Interest Income', balance: 185000, type: 'Revenue', change: '+12.3%' },
  { account: 'Operating Expenses', balance: -45000, type: 'Expense', change: '+3.8%' },
  { account: 'Loan Loss Provision', balance: -25000, type: 'Expense', change: '-2.1%' }
];

export function AccountingTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-semibold">K2.66M</p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue YTD</p>
                <p className="text-2xl font-semibold">K185K</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expenses YTD</p>
                <p className="text-2xl font-semibold">K70K</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Income</p>
                <p className="text-2xl font-semibold">K115K</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chart of Accounts</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">Export GL</Button>
              <Button>New Entry</Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountingData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.account}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell className={item.balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                    K{Math.abs(item.balance).toLocaleString()}
                  </TableCell>
                  <TableCell className={item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {item.change}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}