import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Search, Plus, Building, MapPin, Users, DollarSign } from 'lucide-react';

const mockBranches = [
  {
    id: 'BR001',
    name: 'Main Branch',
    address: '123 Financial District, New York, NY 10001',
    manager: 'Sarah Williams',
    staff: 12,
    loans: 89,
    revenue: 145000,
    status: 'Active'
  },
  {
    id: 'BR002',
    name: 'Downtown Branch',
    address: '456 Commerce Ave, Los Angeles, CA 90015',
    manager: 'Michael Chen',
    staff: 8,
    loans: 54,
    revenue: 89000,
    status: 'Active'
  },
  {
    id: 'BR003',
    name: 'Suburban Branch',
    address: '789 Oak Street, Chicago, IL 60601',
    manager: 'Jennifer Lopez',
    staff: 6,
    loans: 32,
    revenue: 52000,
    status: 'Active'
  }
];

export function BranchesTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const totalBranches = mockBranches.length;
  const totalStaff = mockBranches.reduce((sum, branch) => sum + branch.staff, 0);
  const totalLoans = mockBranches.reduce((sum, branch) => sum + branch.loans, 0);
  const totalRevenue = mockBranches.reduce((sum, branch) => sum + branch.revenue, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Branches</p>
                <p className="text-2xl font-semibold">{totalBranches}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-semibold">{totalStaff}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-semibold">{totalLoans}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold">K{totalRevenue.toLocaleString()}</p>
              </div>
              <Building className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Branch Management</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search branches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Branch
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Staff Count</TableHead>
                <TableHead>Active Loans</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBranches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-muted-foreground">{branch.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{branch.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{branch.manager}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {branch.staff}
                    </div>
                  </TableCell>
                  <TableCell>{branch.loans}</TableCell>
                  <TableCell className="font-semibold">K{branch.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">{branch.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Staff</Button>
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