import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Upload,
  Search,
  CheckCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  Calculator,
  Download,
  RefreshCw,
  Filter
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  amount: number;
  reference: string;
  date: string;
  source: 'bank' | 'mpesa' | 'gateway';
  status: 'matched' | 'unmatched' | 'manual_match';
  matchedLoanId?: string;
  borrowerName?: string;
  suggestedAllocation?: {
    principal: number;
    interest: number;
    fees: number;
  };
}

interface UnmatchedPayment extends PaymentRecord {
  status: 'unmatched';
}

const mockPayments: PaymentRecord[] = [
  {
    id: 'PAY001',
    amount: 2500,
    reference: 'TXN123456789',
    date: '2024-01-20',
    source: 'bank',
    status: 'matched',
    matchedLoanId: 'LN001',
    borrowerName: 'John Smith',
    suggestedAllocation: {
      principal: 2000,
      interest: 500,
      fees: 0
    }
  },
  {
    id: 'PAY002',
    amount: 1500,
    reference: 'MPesa789456',
    date: '2024-01-20',
    source: 'mpesa',
    status: 'unmatched'
  },
  {
    id: 'PAY003',
    amount: 3200,
    reference: 'GW987654321',
    date: '2024-01-21',
    source: 'gateway',
    status: 'manual_match',
    matchedLoanId: 'LN002',
    borrowerName: 'Mary Banda',
    suggestedAllocation: {
      principal: 2500,
      interest: 700,
      fees: 0
    }
  }
];

export function AccountantTab() {
  const [activeTab, setActiveTab] = useState('import');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [allocationRule, setAllocationRule] = useState<'interest_first' | 'principal_first'>('interest_first');
  const [selectedLoanId, setSelectedLoanId] = useState('');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (payment.borrowerName && payment.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const unmatchedPayments = mockPayments.filter(p => p.status === 'unmatched') as UnmatchedPayment[];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return 'bg-green-100 text-green-800';
      case 'unmatched': return 'bg-red-100 text-red-800';
      case 'manual_match': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'bank': return '🏦';
      case 'mpesa': return '📱';
      case 'gateway': return '🌐';
      default: return '💰';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploading file:', file.name);
      alert(`File "${file.name}" uploaded successfully. Processing payments...`);
    }
  };

  const handleManualMatch = (payment: UnmatchedPayment) => {
    setSelectedPayment(payment);
    setSelectedLoanId('');
    setIsMatchModalOpen(true);
  };

  const handleConfirmMatch = () => {
    if (!selectedPayment || !selectedLoanId) return;

    console.log('Manually matching payment:', selectedPayment.id, 'to loan:', selectedLoanId);
    alert('Payment matched successfully!');
    setIsMatchModalOpen(false);
  };

  const handlePostPayment = (payment: PaymentRecord) => {
    if (!payment.suggestedAllocation) return;

    console.log('Posting payment:', payment.id, 'with allocation:', payment.suggestedAllocation);
    alert('Payment posted to accounting system successfully!');
  };

  const calculateSuggestedAllocation = (amount: number, rule: 'interest_first' | 'principal_first') => {
    // Simplified allocation calculation
    if (rule === 'interest_first') {
      const interest = Math.min(amount * 0.2, 500); // Max 20% or K500 interest
      const principal = amount - interest;
      return { principal, interest, fees: 0 };
    } else {
      const principal = Math.max(amount - 500, amount * 0.8); // Min 80% or amount - K500
      const interest = amount - principal;
      return { principal, interest, fees: 0 };
    }
  };

  const stats = {
    total: mockPayments.length,
    matched: mockPayments.filter(p => p.status === 'matched').length,
    unmatched: unmatchedPayments.length,
    totalAmount: mockPayments.reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Payments</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-matched</p>
                <p className="text-2xl font-semibold">{stats.matched}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unmatched</p>
                <p className="text-2xl font-semibold">{stats.unmatched}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-semibold">{formatCurrency(stats.totalAmount)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Reconciliation</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="import">Import Payments</TabsTrigger>
              <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
              <TabsTrigger value="unmatched">Unmatched Queue</TabsTrigger>
            </TabsList>

            <TabsContent value="import" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      🏦 Bank Statement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Upload bank statement CSV or Excel file
                      </p>
                      <div>
                        <Input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      📱 M-Pesa Statement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Upload M-Pesa transaction report
                      </p>
                      <div>
                        <Input
                          type="file"
                          accept=".csv,.xlsx,.xls,.pdf"
                          onChange={handleFileUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      🌐 Payment Gateway
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Upload gateway settlement file
                      </p>
                      <div>
                        <Input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Allocation Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="allocation-rule">Payment Allocation Rule</Label>
                      <Select value={allocationRule} onValueChange={(value: any) => setAllocationRule(value)}>
                        <SelectTrigger className="w-64">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interest_first">Interest First</SelectItem>
                          <SelectItem value="principal_first">Principal First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {allocationRule === 'interest_first'
                        ? 'Interest is allocated first, then principal'
                        : 'Principal is allocated first, then interest'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reconciliation" className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">Payment Reconciliation</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Matched To</TableHead>
                      <TableHead>Suggested Allocation</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>
                          <span className="mr-2">{getSourceIcon(payment.source)}</span>
                          {payment.source.toUpperCase()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.matchedLoanId && payment.borrowerName ? (
                            <div>
                              <div className="font-medium">{payment.borrowerName}</div>
                              <div className="text-sm text-muted-foreground">{payment.matchedLoanId}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {payment.suggestedAllocation ? (
                            <div className="text-sm">
                              <div>P: {formatCurrency(payment.suggestedAllocation.principal)}</div>
                              <div>I: {formatCurrency(payment.suggestedAllocation.interest)}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {payment.status === 'matched' && payment.suggestedAllocation && (
                            <Button
                              size="sm"
                              onClick={() => handlePostPayment(payment)}
                            >
                              Post Payment
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="unmatched" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Unmatched Payments Queue</h3>
                <Badge className="bg-red-100 text-red-800">
                  {unmatchedPayments.length} unmatched
                </Badge>
              </div>

              <div className="space-y-4">
                {unmatchedPayments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="mr-2">{getSourceIcon(payment.source)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{formatCurrency(payment.amount)}</div>
                            <div className="text-sm text-muted-foreground">
                              {payment.reference} • {formatDate(payment.date)}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleManualMatch(payment)}
                          variant="outline"
                        >
                          Manual Match
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {unmatchedPayments.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-muted-foreground">All payments have been matched!</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Manual Match Modal */}
      <Dialog open={isMatchModalOpen} onOpenChange={setIsMatchModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manual Payment Match</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Payment Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="font-semibold">{formatCurrency(selectedPayment.amount)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reference:</span>
                    <p className="font-mono">{selectedPayment.reference}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p>{formatDate(selectedPayment.date)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Source:</span>
                    <p>{selectedPayment.source.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="loan-match">Match to Loan</Label>
                <Select value={selectedLoanId} onValueChange={setSelectedLoanId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan to match payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LN001">LN001 - John Smith (Outstanding: K12,500)</SelectItem>
                    <SelectItem value="LN002">LN002 - Mary Banda (Outstanding: K45,000)</SelectItem>
                    <SelectItem value="LN003">LN003 - David Phiri (Outstanding: K8,750)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedLoanId && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Suggested Allocation</h4>
                  {(() => {
                    const allocation = calculateSuggestedAllocation(selectedPayment.amount, allocationRule);
                    return (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Principal:</span>
                          <p className="font-semibold">{formatCurrency(allocation.principal)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Interest:</span>
                          <p className="font-semibold">{formatCurrency(allocation.interest)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fees:</span>
                          <p className="font-semibold">{formatCurrency(allocation.fees)}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsMatchModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmMatch} disabled={!selectedLoanId}>
                  Confirm Match
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}