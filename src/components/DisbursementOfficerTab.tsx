import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  Calendar,
  CreditCard,
  Smartphone,
  Building,
  Printer,
  Shield,
  Filter,
  Download
} from 'lucide-react';

interface ApprovedApplication {
  id: string;
  borrowerName: string;
  borrowerId: string;
  amount: number;
  product: string;
  approvedDate: string;
  disbursementReady: boolean;
  checklistStatus: {
    loanDocument: boolean;
    signedAgreement: boolean;
    kycVerified: boolean;
    glAccountMapped: boolean;
    fundsAvailable: boolean;
    bankDetailsVerified: boolean;
  };
}

const mockApplications: ApprovedApplication[] = [
  {
    id: 'APP001',
    borrowerName: 'John Smith',
    borrowerId: 'B001',
    amount: 25000,
    product: 'Personal Loan',
    approvedDate: '2024-01-18',
    disbursementReady: true,
    checklistStatus: {
      loanDocument: true,
      signedAgreement: true,
      kycVerified: true,
      glAccountMapped: true,
      fundsAvailable: true,
      bankDetailsVerified: true
    }
  },
  {
    id: 'APP002',
    borrowerName: 'Mary Banda',
    borrowerId: 'B002',
    amount: 150000,
    product: 'Business Loan',
    approvedDate: '2024-01-19',
    disbursementReady: false,
    checklistStatus: {
      loanDocument: true,
      signedAgreement: false,
      kycVerified: true,
      glAccountMapped: true,
      fundsAvailable: true,
      bankDetailsVerified: false
    }
  }
];

export function DisbursementOfficerTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<ApprovedApplication | null>(null);
  const [isDisbursementModalOpen, setIsDisbursementModalOpen] = useState(false);
  const [disbursementDate, setDisbursementDate] = useState('');
  const [disbursementAmount, setDisbursementAmount] = useState('');
  const [disbursementChannel, setDisbursementChannel] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [charges, setCharges] = useState('');
  const [dualAuthRequired, setDualAuthRequired] = useState(false);

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.borrowerId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

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

  const handleCreateDisbursement = (application: ApprovedApplication) => {
    setSelectedApplication(application);
    setDisbursementDate(new Date().toISOString().split('T')[0]);
    setDisbursementAmount(application.amount.toString());
    setDisbursementChannel('');
    setBankDetails('');
    setCharges('0');
    setDualAuthRequired(application.amount > 50000); // Threshold for dual auth
    setIsDisbursementModalOpen(true);
  };

  const handleInitiatePayment = () => {
    if (!selectedApplication || !disbursementDate || !disbursementAmount || !disbursementChannel) return;

    // Check if all checklist items are completed
    const allChecksPassed = Object.values(selectedApplication.checklistStatus).every(status => status);
    if (!allChecksPassed) {
      alert('Cannot proceed: Not all pre-disbursement checks have passed.');
      return;
    }

    console.log('Initiating payment:', {
      applicationId: selectedApplication.id,
      amount: disbursementAmount,
      channel: disbursementChannel,
      date: disbursementDate
    });

    alert('Payment initiated successfully! Transaction ID: TXN' + Date.now());
  };

  const handlePostJournal = () => {
    console.log('Posting journal entry for disbursement');
    alert('Journal entry posted to accounting system');
  };

  const handlePrintSlip = () => {
    console.log('Printing disbursement slip');
    alert('Disbursement slip printed successfully');
  };

  const getChecklistStatus = (application: ApprovedApplication) => {
    const passed = Object.values(application.checklistStatus).filter(status => status).length;
    const total = Object.values(application.checklistStatus).length;
    return { passed, total, percentage: (passed / total) * 100 };
  };

  const stats = {
    ready: mockApplications.filter(a => a.disbursementReady).length,
    pending: mockApplications.filter(a => !a.disbursementReady).length,
    totalAmount: mockApplications.reduce((sum, a) => sum + a.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready for Disbursement</p>
                <p className="text-2xl font-semibold">{stats.ready}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Checks</p>
                <p className="text-2xl font-semibold">{stats.pending}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
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
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Approved Applications - Ready for Disbursement</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Checklist Status</TableHead>
                  <TableHead>Approved Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => {
                  const checklist = getChecklistStatus(application);
                  return (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.borrowerName}</div>
                          <div className="text-sm text-muted-foreground">{application.borrowerId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{formatCurrency(application.amount)}</TableCell>
                      <TableCell>{application.product}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{checklist.passed}/{checklist.total}</span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${checklist.percentage}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(application.approvedDate)}</TableCell>
                      <TableCell>
                        {application.disbursementReady ? (
                          <Button
                            size="sm"
                            onClick={() => handleCreateDisbursement(application)}
                          >
                            Create Disbursement
                          </Button>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Pending Checks
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Disbursement Modal */}
      <Dialog open={isDisbursementModalOpen} onOpenChange={setIsDisbursementModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Disbursement - {selectedApplication?.id}</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Pre-disbursement Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pre-disbursement Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { key: 'loanDocument', label: 'Final approved loan document present' },
                      { key: 'signedAgreement', label: 'Signed loan agreement (e-sign captured)' },
                      { key: 'kycVerified', label: 'Mandatory KYC verified' },
                      { key: 'glAccountMapped', label: 'GL account mapping completed' },
                      { key: 'fundsAvailable', label: 'Available funds check passed' },
                      { key: 'bankDetailsVerified', label: 'Borrower bank details verified' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center gap-3">
                        {selectedApplication.checklistStatus[item.key as keyof typeof selectedApplication.checklistStatus] ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Disbursement Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Disbursement Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="disbursement-date">Disbursement Date</Label>
                      <Input
                        id="disbursement-date"
                        type="date"
                        value={disbursementDate}
                        onChange={(e) => setDisbursementDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="disbursement-amount">Disbursement Amount</Label>
                      <Input
                        id="disbursement-amount"
                        type="number"
                        value={disbursementAmount}
                        onChange={(e) => setDisbursementAmount(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="channel">Disbursement Channel</Label>
                    <Select value={disbursementChannel} onValueChange={setDisbursementChannel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select disbursement channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="mobile">Mobile Money</SelectItem>
                        <SelectItem value="cash">Cash (Branch)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(disbursementChannel === 'bank' || disbursementChannel === 'mobile') && (
                    <div>
                      <Label htmlFor="bank-details">Bank/Mobile Details</Label>
                      <Input
                        id="bank-details"
                        placeholder="Account number, mobile number, etc."
                        value={bankDetails}
                        onChange={(e) => setBankDetails(e.target.value)}
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="charges">Charges to be Applied</Label>
                    <Input
                      id="charges"
                      type="number"
                      placeholder="0.00"
                      value={charges}
                      onChange={(e) => setCharges(e.target.value)}
                    />
                  </div>

                  {dualAuthRequired && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800 font-medium">
                          Dual Authorization Required
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Amount exceeds threshold. Second authorization required.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDisbursementModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handlePrintSlip}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print Slip
                </Button>
                <Button variant="outline" onClick={handlePostJournal}>
                  Post Journal
                </Button>
                <Button onClick={handleInitiatePayment}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Initiate Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}