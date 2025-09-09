import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Search, Plus, Users, Shield, UserCheck, Settings } from 'lucide-react';

const mockStaff = [
  {
    id: 'ST001',
    name: 'Sarah Williams',
    email: 'sarah.w@loanpro.com',
    role: 'Branch Manager',
    department: 'Operations',
    branch: 'Main Branch',
    permissions: ['Loan Approval', 'User Management', 'Reports'],
    status: 'Active',
    lastActive: '2024-01-30'
  },
  {
    id: 'ST002',
    name: 'Michael Chen',
    email: 'm.chen@loanpro.com',
    role: 'Loan Officer',
    department: 'Lending',
    branch: 'Downtown Branch',
    permissions: ['Loan Processing', 'Customer Management'],
    status: 'Active',
    lastActive: '2024-01-30'
  },
  {
    id: 'ST003',
    name: 'Jennifer Lopez',
    email: 'j.lopez@loanpro.com',
    role: 'Credit Analyst',
    department: 'Risk',
    branch: 'Suburban Branch',
    permissions: ['Credit Assessment', 'Risk Analysis'],
    status: 'Active',
    lastActive: '2024-01-29'
  }
];

export function StaffRolesTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const totalStaff = mockStaff.length;
  const activeStaff = mockStaff.filter(staff => staff.status === 'Active').length;
  const departments = [...new Set(mockStaff.map(staff => staff.department))].length;
  const roles = [...new Set(mockStaff.map(staff => staff.role))].length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-semibold">{totalStaff}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-semibold">{activeStaff}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-semibold">{departments}</p>
              </div>
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Roles</p>
                <p className="text-2xl font-semibold">{roles}</p>
              </div>
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Staff & Permissions</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">Manage Roles</Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Staff
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground">{staff.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{staff.role}</Badge>
                  </TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.branch}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {staff.permissions.slice(0, 2).map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs mr-1">
                          {permission}
                        </Badge>
                      ))}
                      {staff.permissions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{staff.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{staff.lastActive}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">{staff.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Permissions</Button>
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