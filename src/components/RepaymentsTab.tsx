import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Plus, Download, Filter, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

const mockRepayments = [
  {
    id: 'R001',
    loanId: 'L001',
    borrowerName: 'John Smith',
    amount: 832.50,
    principal: 625.40,
    interest: 207.10,
    paymentDate: '2024-01-15',
    dueDate: '2024-01-15',
    status: 'Paid',
    method: 'Bank Transfer',
    reference: 'TXN123456789'
  },
  {
    id: 'R002',
    loanId: 'L002',
    borrowerName: 'Sarah Johnson',
    amount: 695.20,
    principal: 565.30,
    interest: 129.90,
    paymentDate: '2024-01-01',
    dueDate: '2024-01-01',
    status: 'Paid',
    method: 'Direct Debit',
    reference: 'DD987654321'
  },
  {
    id: 'R003',
    loanId: 'L003',
    borrowerName: 'Michael Brown',
    amount: 854.30,
    principal: 0,
    interest: 0,
    paymentDate: null,
    dueDate: '2023-12-10',
    status: 'Overdue',
    method: null,
    reference: null
  },
  {
    id: 'R004',
    loanId: 'L004',
    borrowerName: 'Emily Davis',
    amount: 835.40,
    principal: 698.20,
    interest: 137.20,
    paymentDate: '2024-01-20',
    dueDate: '2024-01-20',
    status: 'Paid',
    method: 'Cash',
    reference: 'CASH001'
  },
  {
    id: 'R005',
    loanId: 'L001',
    borrowerName: 'John Smith',
    amount: 832.50,
    principal: 0,
    interest: 0,
    paymentDate: null,
    dueDate: '2024-02-15',
    status: 'Pending',
    method: null,
    reference: null
  }
];

export function RepaymentsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredRepayments = mockRepayments.filter(repayment => {
    const matchesSearch = repayment.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repayment.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repayment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || repayment.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Partial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string | null) => {
    if (!method) return null;
    switch (method) {
      case 'Bank Transfer':
      case 'Direct Debit':
        return <CreditCard className="w-4 h-4" />;
      case 'Cash':
        return <div className="w-4 h-4 bg-green-600 rounded-full"></div>;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const totalCollected = mockRepayments
    .filter(r => r.status === 'Paid')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalOverdue = mockRepayments
    .filter(r => r.status === 'Overdue')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalPending = mockRepayments
    .filter(r => r.status === 'Pending')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-2xl font-semibold">K{totalCollected.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-semibold">K{totalOverdue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold">K{totalPending.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-semibold">94.2%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-lg"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Repayments Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search repayments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Record Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Record New Payment</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="loan">Loan</Label>
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
                      <Label htmlFor="amount">Payment Amount</Label>
                      <Input id="amount" type="number" step="0.01" placeholder="Enter payment amount" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                          <SelectItem value="direct-debit">Direct Debit</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Payment Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reference">Reference</Label>
                      <Input id="reference" placeholder="Enter reference number" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Record Payment
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
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRepayments.map((repayment) => (
                  <TableRow key={repayment.id}>
                    <TableCell className="font-medium">{repayment.id}</TableCell>
                    <TableCell>{repayment.loanId}</TableCell>
                    <TableCell className="font-medium">{repayment.borrowerName}</TableCell>
                    <TableCell className="font-semibold">K{repayment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {repayment.principal > 0 ? `K${repayment.principal.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      {repayment.interest > 0 ? `K${repayment.interest.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>{repayment.dueDate}</TableCell>
                    <TableCell>{repayment.paymentDate || '-'}</TableCell>
                    <TableCell>
                      {repayment.method && (
                        <div className="flex items-center gap-2">
                          {getMethodIcon(repayment.method)}
                          <span className="text-sm">{repayment.method}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(repayment.status)}>
                        {repayment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {repayment.reference || '-'}
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