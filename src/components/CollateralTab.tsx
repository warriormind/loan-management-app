import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Search, Plus, Eye, Edit, Home, Car, Briefcase, Shield } from 'lucide-react';

const mockCollateral = [
  {
    id: 'C001',
    loanId: 'L001',
    borrowerName: 'John Smith',
    type: 'Real Estate',
    description: '3-bedroom house, 2,200 sq ft',
    location: '123 Main St, New York, NY',
    estimatedValue: 250000,
    currentValue: 245000,
    status: 'Active',
    condition: 'Excellent',
    appraisalDate: '2023-06-01',
    insuranceStatus: 'Current'
  },
  {
    id: 'C002',
    loanId: 'L002',
    borrowerName: 'Sarah Johnson',
    type: 'Vehicle',
    description: '2021 Toyota Camry',
    location: 'Los Angeles, CA',
    estimatedValue: 22000,
    currentValue: 20500,
    status: 'Active',
    condition: 'Good',
    appraisalDate: '2023-08-15',
    insuranceStatus: 'Current'
  },
  {
    id: 'C003',
    loanId: 'L003',
    borrowerName: 'Michael Brown',
    type: 'Equipment',
    description: 'Industrial printing equipment',
    location: 'Chicago, IL',
    estimatedValue: 35000,
    currentValue: 28000,
    status: 'Under Review',
    condition: 'Fair',
    appraisalDate: '2023-01-20',
    insuranceStatus: 'Expired'
  },
  {
    id: 'C004',
    loanId: 'L004',
    borrowerName: 'Emily Davis',
    type: 'Real Estate',
    description: 'Commercial office space, 5,000 sq ft',
    location: '789 Business Ave, Houston, TX',
    estimatedValue: 450000,
    currentValue: 465000,
    status: 'Active',
    condition: 'Excellent',
    appraisalDate: '2023-03-10',
    insuranceStatus: 'Current'
  }
];

export function CollateralTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredCollateral = mockCollateral.filter(item => {
    const matchesSearch = item.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || item.type.toLowerCase().replace(' ', '-') === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Released': return 'bg-blue-100 text-blue-800';
      case 'Seized': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsuranceColor = (status: string) => {
    switch (status) {
      case 'Current': return 'text-green-600';
      case 'Expired': return 'text-red-600';
      case 'Pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Real Estate': return <Home className="w-4 h-4" />;
      case 'Vehicle': return <Car className="w-4 h-4" />;
      case 'Equipment': return <Briefcase className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const totalValue = mockCollateral.reduce((sum, item) => sum + item.currentValue, 0);
  const activeCollateral = mockCollateral.filter(item => item.status === 'Active').length;
  const underReview = mockCollateral.filter(item => item.status === 'Under Review').length;
  const expiredInsurance = mockCollateral.filter(item => item.insuranceStatus === 'Expired').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-semibold">K{totalValue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Collateral</p>
                <p className="text-2xl font-semibold">{activeCollateral}</p>
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
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-semibold">{underReview}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Insurance Issues</p>
                <p className="text-2xl font-semibold">{expiredInsurance}</p>
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
            <CardTitle>Collateral Registry</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search collateral..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Collateral
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Collateral</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="loan">Associated Loan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L001">L001 - John Smith</SelectItem>
                          <SelectItem value="L002">L002 - Sarah Johnson</SelectItem>
                          <SelectItem value="L003">L003 - Michael Brown</SelectItem>
                          <SelectItem value="L004">L004 - Emily Davis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Collateral Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="vehicle">Vehicle</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="jewelry">Jewelry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Detailed description of collateral" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Physical location" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="value">Estimated Value</Label>
                      <Input id="value" type="number" placeholder="Enter estimated value" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="appraisal-date">Appraisal Date</Label>
                      <Input id="appraisal-date" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Add Collateral
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
                  <TableHead>ID</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Insurance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollateral.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.loanId}</TableCell>
                    <TableCell className="font-medium">{item.borrowerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="truncate">{item.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{item.location}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold">K{item.currentValue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          Est: K{item.estimatedValue.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {item.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getInsuranceColor(item.insuranceStatus)}`}>
                        {item.insuranceStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Appraise
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