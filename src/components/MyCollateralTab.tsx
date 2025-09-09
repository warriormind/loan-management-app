import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  Shield, 
  Plus, 
  Home, 
  Car,
  Banknote,
  FileText,
  Calendar,
  AlertTriangle
} from 'lucide-react';

const collateralItems = [
  {
    id: 1,
    type: "Real Estate",
    description: "4-bedroom house in Lilongwe",
    estimatedValue: 15000000, // MWK
    currentValue: 14500000, // MWK
    status: "active",
    documentStatus: "verified",
    registrationDate: "2024-03-15",
    loanCoverage: 500000, // Amount of loan this covers
    icon: Home
  },
  {
    id: 2,
    type: "Vehicle",
    description: "2020 Toyota Hilux",
    estimatedValue: 8000000, // MWK
    currentValue: 7200000, // MWK
    status: "active",
    documentStatus: "verified",
    registrationDate: "2024-06-20",
    loanCoverage: 300000,
    icon: Car
  },
  {
    id: 3,
    type: "Fixed Deposit",
    description: "Certificate of Deposit - Standard Bank",
    estimatedValue: 500000, // MWK
    currentValue: 520000, // MWK
    status: "active",
    documentStatus: "verified",
    registrationDate: "2024-08-01",
    loanCoverage: 200000,
    icon: Banknote
  }
];

const pendingDocuments = [
  {
    id: 1,
    collateralId: 2,
    documentType: "Insurance Certificate",
    status: "pending_upload",
    dueDate: "2025-09-10"
  },
  {
    id: 2,
    collateralId: 1,
    documentType: "Property Valuation Report",
    status: "under_review",
    dueDate: "2025-09-15"
  }
];

export function MyCollateralTab() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [collateralType, setCollateralType] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');

  const totalCollateralValue = collateralItems.reduce((sum, item) => sum + item.currentValue, 0);
  const totalLoanCoverage = collateralItems.reduce((sum, item) => sum + item.loanCoverage, 0);

  const handleAddCollateral = () => {
    // Handle add collateral logic here
    console.log('Adding collateral:', { collateralType, description, estimatedValue });
    setIsAddDialogOpen(false);
    setCollateralType('');
    setDescription('');
    setEstimatedValue('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Collateral Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collateral Value</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {totalCollateralValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {collateralItems.length} items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan Coverage</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK {totalLoanCoverage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalLoanCoverage / totalCollateralValue) * 100)}% of total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collateralItems.filter(item => item.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              All verified and active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions */}
      {pendingDocuments.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingDocuments.map((doc) => {
                const collateral = collateralItems.find(item => item.id === doc.collateralId);
                return (
                  <div key={doc.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">{doc.documentType}</p>
                      <p className="text-sm text-yellow-600">
                        For: {collateral?.description} • Due: {doc.dueDate}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      {doc.status === 'pending_upload' ? 'Upload' : 'View Status'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Collateral Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Collateral</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Collateral
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Collateral</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Collateral Type</Label>
                  <Select value={collateralType} onValueChange={setCollateralType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select collateral type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                      <SelectItem value="machinery">Machinery/Equipment</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about the collateral item"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Estimated Value (MWK)</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="Enter estimated value"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddCollateral} className="w-full">
                  Submit for Verification
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collateralItems.map((item) => {
              const IconComponent = item.icon;
              const valueChange = item.currentValue - item.estimatedValue;
              const valueChangePercent = ((valueChange / item.estimatedValue) * 100).toFixed(1);
              
              return (
                <Card key={item.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{item.type}</h3>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(item.documentStatus)}
                          >
                            {item.documentStatus}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Registered: {item.registrationDate}
                          </div>
                          <div>
                            Covers: MWK {item.loanCoverage.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        MWK {item.currentValue.toLocaleString()}
                      </p>
                      <p className={`text-sm ${
                        valueChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {valueChange >= 0 ? '+' : ''}MWK {Math.abs(valueChange).toLocaleString()}
                      </p>
                      <p className={`text-xs ${
                        valueChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ({valueChange >= 0 ? '+' : ''}{valueChangePercent}%)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Valuation
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}