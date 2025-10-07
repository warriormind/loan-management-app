import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  RefreshCw,
  DollarSign,
  AlertTriangle,
  FileText,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface Loan {
  id: string;
  outstanding: number;
  originalAmount: number;
  term: number;
  interestRate: number;
  startDate: string;
}

interface Request {
  id: string;
  type: 'restructure' | 'early_repayment' | 'complaint';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedDate: string;
  loanId: string;
  description: string;
  response?: string;
  responseDate?: string;
}

const mockLoans: Loan[] = [
  {
    id: 'LN001',
    outstanding: 12500,
    originalAmount: 25000,
    term: 24,
    interestRate: 12.5,
    startDate: '2023-06-15'
  }
];

const mockRequests: Request[] = [
  {
    id: 'REQ001',
    type: 'restructure',
    status: 'under_review',
    submittedDate: '2024-01-15',
    loanId: 'LN001',
    description: 'Request to extend loan term due to financial difficulties',
    response: 'Your request is being reviewed by our credit team.',
    responseDate: '2024-01-16'
  }
];

export function BorrowerRequests() {
  const [activeTab, setActiveTab] = useState('restructure');
  const [isRestructureModalOpen, setIsRestructureModalOpen] = useState(false);
  const [isEarlyRepaymentModalOpen, setIsEarlyRepaymentModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  // Restructure form state
  const [restructureReason, setRestructureReason] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [restructureDetails, setRestructureDetails] = useState('');

  // Early repayment form state
  const [earlyRepaymentAmount, setEarlyRepaymentAmount] = useState('');

  // Complaint form state
  const [complaintType, setComplaintType] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [complaintPriority, setComplaintPriority] = useState('');

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

  const calculateEarlyRepayment = (loan: Loan) => {
    const monthsElapsed = Math.floor(
      (new Date().getTime() - new Date(loan.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    // Simplified calculation - in real app this would be more complex
    const principalPaid = loan.originalAmount - loan.outstanding;
    const remainingPrincipal = loan.outstanding;

    // Early repayment discount (if paid within first half of term)
    const discountRate = monthsElapsed < loan.term / 2 ? 0.05 : 0; // 5% discount
    const discount = remainingPrincipal * discountRate;

    return {
      remainingPrincipal,
      discount,
      totalPayoff: remainingPrincipal - discount
    };
  };

  const handleRestructureSubmit = () => {
    if (!selectedLoan || !restructureReason || !newTerm) return;

    const request = {
      type: 'restructure',
      loanId: selectedLoan.id,
      reason: restructureReason,
      newTerm: parseInt(newTerm),
      newAmount: newAmount ? parseFloat(newAmount) : null,
      details: restructureDetails
    };

    console.log('Submitting restructure request:', request);
    alert('Restructure request submitted successfully! You will be notified once reviewed.');
    setIsRestructureModalOpen(false);
    resetRestructureForm();
  };

  const handleEarlyRepaymentSubmit = () => {
    if (!selectedLoan) return;

    const calculation = calculateEarlyRepayment(selectedLoan);
    const request = {
      type: 'early_repayment',
      loanId: selectedLoan.id,
      payoffAmount: calculation.totalPayoff
    };

    console.log('Submitting early repayment request:', request);
    alert('Early repayment request submitted successfully! You will be notified once reviewed.');
    setIsEarlyRepaymentModalOpen(false);
  };

  const handleComplaintSubmit = () => {
    if (!complaintType || !complaintDescription) return;

    const request = {
      type: 'complaint',
      complaintType,
      description: complaintDescription,
      priority: complaintPriority
    };

    console.log('Submitting complaint:', request);
    alert('Complaint submitted successfully! Reference number: COMP' + Date.now());
    setIsComplaintModalOpen(false);
    resetComplaintForm();
  };

  const resetRestructureForm = () => {
    setSelectedLoan(null);
    setRestructureReason('');
    setNewTerm('');
    setNewAmount('');
    setRestructureDetails('');
  };

  const resetComplaintForm = () => {
    setComplaintType('');
    setComplaintDescription('');
    setComplaintPriority('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Request History */}
      <Card>
        <CardHeader>
          <CardTitle>Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <div key={request.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  request.type === 'restructure' ? 'bg-blue-100' :
                  request.type === 'early_repayment' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {request.type === 'restructure' ? <RefreshCw className="w-5 h-5 text-blue-600" /> :
                   request.type === 'early_repayment' ? <DollarSign className="w-5 h-5 text-green-600" /> :
                   <AlertTriangle className="w-5 h-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium capitalize">{request.type.replace('_', ' ')}</h4>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      {request.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Submitted: {formatDate(request.submittedDate)}
                  </p>
                  {request.response && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Response:</p>
                      <p className="text-sm text-gray-600">{request.response}</p>
                      {request.responseDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(request.responseDate)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {mockRequests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No requests found. Create your first request below.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* New Request Forms */}
      <Card>
        <CardHeader>
          <CardTitle>Submit New Request</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="restructure">Loan Restructure</TabsTrigger>
              <TabsTrigger value="early_repayment">Early Repayment</TabsTrigger>
              <TabsTrigger value="complaint">Complaints</TabsTrigger>
            </TabsList>

            <TabsContent value="restructure" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="loan-select">Select Loan</Label>
                  <Select value={selectedLoan?.id || ''} onValueChange={(value) => {
                    const loan = mockLoans.find(l => l.id === value);
                    setSelectedLoan(loan || null);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose loan to restructure" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLoans.map((loan) => (
                        <SelectItem key={loan.id} value={loan.id}>
                          Loan {loan.id} - Outstanding: {formatCurrency(loan.outstanding)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reason">Reason for Restructure</Label>
                  <Select value={restructureReason} onValueChange={setRestructureReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial_difficulty">Financial Difficulty</SelectItem>
                      <SelectItem value="business_changes">Business Changes</SelectItem>
                      <SelectItem value="personal_reasons">Personal Reasons</SelectItem>
                      <SelectItem value="extend_term">Extend Term Only</SelectItem>
                      <SelectItem value="reduce_installment">Reduce Monthly Installment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-term">Proposed New Term (months)</Label>
                    <Input
                      id="new-term"
                      type="number"
                      placeholder="e.g., 36"
                      value={newTerm}
                      onChange={(e) => setNewTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-amount">Proposed New Amount (optional)</Label>
                    <Input
                      id="new-amount"
                      type="number"
                      placeholder="Leave empty to keep same"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Provide more details about your situation and proposed changes..."
                    value={restructureDetails}
                    onChange={(e) => setRestructureDetails(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Supporting documents may be required. You can upload them after submission.
                  </span>
                </div>

                <Button
                  onClick={handleRestructureSubmit}
                  disabled={!selectedLoan || !restructureReason || !newTerm}
                  className="w-full"
                >
                  Submit Restructure Request
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="early_repayment" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="repayment-loan">Select Loan</Label>
                  <Select value={selectedLoan?.id || ''} onValueChange={(value) => {
                    const loan = mockLoans.find(l => l.id === value);
                    setSelectedLoan(loan || null);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose loan to repay early" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLoans.map((loan) => (
                        <SelectItem key={loan.id} value={loan.id}>
                          Loan {loan.id} - Outstanding: {formatCurrency(loan.outstanding)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedLoan && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-800 mb-3">Early Repayment Calculation</h4>
                      {(() => {
                        const calc = calculateEarlyRepayment(selectedLoan);
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Remaining Principal:</span>
                              <span className="font-medium">{formatCurrency(calc.remainingPrincipal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Early Repayment Discount:</span>
                              <span className="font-medium text-green-600">-{formatCurrency(calc.discount)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-semibold">
                              <span>Total Payoff Amount:</span>
                              <span className="text-green-600">{formatCurrency(calc.totalPayoff)}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Early repayment may incur fees. The final amount will be confirmed after review.
                  </span>
                </div>

                <Button
                  onClick={handleEarlyRepaymentSubmit}
                  disabled={!selectedLoan}
                  className="w-full"
                >
                  Request Early Repayment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="complaint" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="complaint-type">Complaint Type</Label>
                  <Select value={complaintType} onValueChange={setComplaintType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complaint type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">Poor Service</SelectItem>
                      <SelectItem value="loan_terms">Loan Terms Dispute</SelectItem>
                      <SelectItem value="payment_issue">Payment Processing Issue</SelectItem>
                      <SelectItem value="documentation">Documentation Error</SelectItem>
                      <SelectItem value="staff_conduct">Staff Conduct</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={complaintPriority} onValueChange={setComplaintPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="complaint-description">Description</Label>
                  <Textarea
                    id="complaint-description"
                    placeholder="Please provide detailed description of your complaint..."
                    value={complaintDescription}
                    onChange={(e) => setComplaintDescription(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    You can attach supporting documents after submission.
                  </span>
                </div>

                <Button
                  onClick={handleComplaintSubmit}
                  disabled={!complaintType || !complaintDescription}
                  className="w-full"
                >
                  Submit Complaint
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}