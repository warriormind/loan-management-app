import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Search, Plus, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const mockInvestors = [
  {
    id: 'I001',
    name: 'Capital Investment Group',
    type: 'Institution',
    totalInvestment: 2500000,
    currentReturn: 8.5,
    portfolioLoans: 45,
    riskProfile: 'Conservative',
    joinDate: '2022-03-15',
    status: 'Active'
  },
  {
    id: 'I002',
    name: 'Jane Wilson',
    type: 'Individual',
    totalInvestment: 150000,
    currentReturn: 9.2,
    portfolioLoans: 8,
    riskProfile: 'Moderate',
    joinDate: '2023-06-20',
    status: 'Active'
  }
];

export function InvestorsTab() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investors</p>
                <p className="text-2xl font-semibold">47</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Capital</p>
                <p className="text-2xl font-semibold">K5.2M</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Return</p>
                <p className="text-2xl font-semibold">8.9%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Portfolios</p>
                <p className="text-2xl font-semibold">43</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Investor Management</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search investors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Investor
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Return Rate</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Risk Profile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvestors.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{investor.name}</div>
                      <div className="text-sm text-muted-foreground">Since {investor.joinDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>{investor.type}</TableCell>
                  <TableCell className="font-semibold">K{investor.totalInvestment.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">{investor.currentReturn}%</TableCell>
                  <TableCell>{investor.portfolioLoans} loans</TableCell>
                  <TableCell>
                    <Badge variant="outline">{investor.riskProfile}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">{investor.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
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