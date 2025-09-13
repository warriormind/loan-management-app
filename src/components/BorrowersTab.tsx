import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Skeleton, TableSkeleton, CardSkeleton } from './ui/skeleton';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const mockBorrowers = [
  {
    id: 'B001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY',
    creditScore: 720,
    status: 'Active',
    totalLoans: 'K45,000',
    lastPayment: '2024-01-15'
  },
  {
    id: 'B002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Los Angeles, CA',
    creditScore: 680,
    status: 'Active',
    totalLoans: 'K32,500',
    lastPayment: '2024-01-12'
  },
  {
    id: 'B003',
    name: 'Michael Brown',
    email: 'm.brown@email.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine Rd, Chicago, IL',
    creditScore: 590,
    status: 'Defaulted',
    totalLoans: 'K28,000',
    lastPayment: '2023-11-20'
  },
  {
    id: 'B004',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 321-9876',
    address: '321 Elm St, Houston, TX',
    creditScore: 750,
    status: 'Active',
    totalLoans: 'K67,800',
    lastPayment: '2024-01-14'
  }
];

export function BorrowersTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const filteredClients = mockBorrowers.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Defaulted': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 700) return 'text-green-600';
    if (score >= 600) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleActionSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 relative">
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg fade-in">
            Action completed successfully!
          </div>
        )}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <Card className="card-interactive hover-lift bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-default-color/70 font-medium mb-2">Total Clients</p>
                      <p className="text-3xl font-bold text-heading-color">1,247</p>
                      <p className="text-xs text-accent-color mt-1">+12% from last month</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center hover-scale shadow-lg">
                      <Search className="w-8 h-8 text-contrast-color" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive hover-lift bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-default-color/70 font-medium mb-2">Active Clients</p>
                      <p className="text-3xl font-bold text-heading-color">1,089</p>
                      <p className="text-xs text-green-500 mt-1">87.2% active rate</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center hover-scale shadow-lg">
                      <div className="w-4 h-4 bg-green-400 rounded-full pulse shadow-lg"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive hover-lift bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-default-color/70 font-medium mb-2">Defaulted</p>
                      <p className="text-3xl font-bold text-heading-color">158</p>
                      <p className="text-xs text-red-500 mt-1">12.7% default rate</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center hover-scale shadow-lg">
                      <div className="w-4 h-4 bg-red-400 rounded-full pulse shadow-lg"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive hover-lift bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-default-color/70 font-medium mb-2">Avg Credit Score</p>
                      <p className="text-3xl font-bold text-heading-color">684</p>
                      <p className="text-xs text-purple-500 mt-1">+5.2 points improvement</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center hover-scale shadow-lg">
                      <div className="w-8 h-8 bg-purple-400 rounded-xl shadow-lg"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

      {/* Main Content */}
      <Card className="bg-gradient-to-br from-surface-color to-background border-default-color/20 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-accent-color/5 to-primary/5 border-b border-default-color/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <CardTitle className="text-2xl font-bold text-heading-color mb-2">Clients Management</CardTitle>
              <p className="text-sm text-default-color/70">Manage and monitor your client portfolio</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-default-color/50" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-background border-default-color/20 rounded-xl focus:border-accent-color focus:ring-accent-color/20 transition-all duration-300"
                />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="flex items-center gap-3 btn-interactive hover-lift px-6 py-3 bg-gradient-to-r from-accent-color to-primary text-contrast-color border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                        <Plus className="w-5 h-5 transition-transform hover:rotate-90" />
                        Add Client
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add a new client to the system</p>
                    </TooltipContent>
                  </Tooltip>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter address" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="credit-score">Credit Score</Label>
                      <Input id="credit-score" type="number" placeholder="Enter credit score" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="defaulted">Defaulted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      setIsAddDialogOpen(false);
                      handleActionSuccess();
                    }}>
                      Add Client
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="overflow-x-auto rounded-xl border border-default-color/10 bg-gradient-to-br from-background to-surface-color/30">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-default-color/20 bg-gradient-to-r from-accent-color/5 to-primary/5 hover:bg-accent-color/10 transition-colors">
                    <TableHead className="text-heading-color font-bold py-4 px-6">Client ID</TableHead>
                    <TableHead className="text-heading-color font-bold py-4 px-6">Name</TableHead>
                    <TableHead className="text-heading-color font-bold py-4 px-6">Contact</TableHead>
                    <TableHead className="text-heading-color font-bold py-4 px-6">Credit Score</TableHead>
                    <TableHead className="text-heading-color font-bold py-4 px-6">Status</TableHead>
                    <TableHead className="text-heading-color font-bold py-4 px-6">Total Loans</TableHead>
                    <TableHead className="text-heading-color font-bold py-4 px-6">Last Payment</TableHead>
                    <TableHead className="text-heading-color font-bold py-4 px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client, index) => (
                    <TableRow key={client.id} className="table-row-interactive cursor-pointer border-b border-default-color/10 hover:bg-gradient-to-r hover:from-accent-color/5 hover:to-primary/5 transition-all duration-300 group">
                      <TableCell className="font-semibold text-heading-color py-6 px-6">{client.id}</TableCell>
                      <TableCell className="py-6 px-6">
                        <div>
                          <div className="font-semibold text-heading-color group-hover:text-accent-color transition-colors">{client.name}</div>
                          <div className="text-sm text-default-color/60 mt-1">{client.address}</div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 px-6">
                        <div>
                          <div className="text-sm text-heading-color">{client.email}</div>
                          <div className="text-sm text-default-color/60">{client.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 px-6">
                        <span className={`font-bold text-lg ${getCreditScoreColor(client.creditScore)}`}>
                          {client.creditScore}
                        </span>
                      </TableCell>
                      <TableCell className="py-6 px-6">
                        <Badge className={`${getStatusColor(client.status)} font-medium px-3 py-1 rounded-full shadow-sm`}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-heading-color py-6 px-6">{client.totalLoans}</TableCell>
                      <TableCell className="text-default-color/80 py-6 px-6">{client.lastPayment}</TableCell>
                      <TableCell className="py-6 px-6">
                        <div className="flex items-center gap-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover-scale transition-all duration-300 p-2 rounded-lg hover:bg-blue-500/10 hover:text-blue-600">
                                <Eye className="w-5 h-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View client details</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover-scale transition-all duration-300 p-2 rounded-lg hover:bg-green-500/10 hover:text-green-600">
                                <Edit className="w-5 h-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit client information</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover-lift transition-all duration-300 p-2 rounded-lg hover:bg-red-500/10 hover:text-red-600">
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete client</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
}