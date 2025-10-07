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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Smartphone,
  Building,
  Wallet,
  Shield,
  Eye,
  Download,
  RefreshCw,
  Lock,
  AlertCircle
} from 'lucide-react';

interface Loan {
  id: string;
  outstanding: number;
  nextPayment: number;
  nextDueDate: string;
  daysOverdue: number;
  penalty: number;
  monthlyPayment: number;
}

interface PaymentScheduleItem {
  date: string;
  principal: number;
  interest: number;
  fees: number;
  balance: number;
  status: 'paid' | 'pending' | 'overdue';
}

const mockLoans: Loan[] = [
  {
    id: 'LN001',
    outstanding: 12500,
    nextPayment: 2500,
    nextDueDate: '2024-01-25',
    daysOverdue: 0,
    penalty: 0,
    monthlyPayment: 2500
  }
];

const mockSchedule: PaymentScheduleItem[] = [
  { date: '2024-01-25', principal: 2000, interest: 500, fees: 0, balance: 10500, status: 'pending' },
  { date: '2024-02-25', principal: 2025, interest: 475, fees: 0, balance: 8475, status: 'pending' },
  { date: '2024-03-25', principal: 2050, interest: 450, fees: 0, balance: 6425, status: 'pending' },
  { date: '2024-04-25', principal: 2075, interest: 425, fees: 0, balance: 4350, status: 'pending' },
  { date: '2024-05-25', principal: 2100, interest: 400, fees: 0, balance: 2250, status: 'pending' },
  { date: '2024-06-25', principal: 2125, interest: 375, fees: 0, balance: 125, status: 'pending' },
  { date: '2024-07-25', principal: 125, interest: 0, fees: 0, balance: 0, status: 'pending' }
];

export function BorrowerRepayments() {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isAutoDebitSetup, setIsAutoDebitSetup] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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

  const calculatePaymentBreakdown = (amount: number) => {
    // Simplified breakdown - in real app this would be calculated based on loan terms
    const interest = Math.min(amount * 0.2, 500); // Max 20% interest
    const principal = amount - interest;
    return { principal, interest, fees: 0 };
  };

  const handlePayment = () => {
    if (!paymentAmount || !selectedPaymentMethod) return;

    // Show OTP input for 2FA
    setShowOtpInput(true);
  };

  const handleConfirmPayment = () => {
    if (!otpCode) return;

    // Process payment
    console.log('Processing payment:', {
      loanId: selectedLoan?.id,
      amount: paymentAmount,
      method: selectedPaymentMethod,
      otp: otpCode
    });

    // Show success message
    alert('Payment processed successfully! Receipt will be sent to your email.');

    // Reset form
    setIsPaymentModalOpen(false);
    setPaymentAmount('');
    setSelectedPaymentMethod('');
    setOtpCode('');
    setShowOtpInput(false);
  };

  const handleSetupAutoDebit = () => {
    // Handle auto-debit setup
    console.log('Setting up auto-debit for loan:', selectedLoan?.id);
    setIsAutoDebitSetup(true);
    alert('Auto-debit has been set up successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Active Loans Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockLoans.map((loan) => (
          <Card
            key={loan.id}
            className={`cursor-pointer transition-all ${
              selectedLoan?.id === loan.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            } ${loan.daysOverdue > 0 ? 'border-red-200' : ''}`}
            onClick={() => setSelectedLoan(loan)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Loan {loan.id}</h3>
                {loan.daysOverdue > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    Overdue
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Outstanding</span>
                  <span className="font-medium">{formatCurrency(loan.outstanding)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Payment</span>
                  <span className="font-medium">{formatCurrency(loan.nextPayment)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">{formatDate(loan.nextDueDate)}</span>
                </div>
                {loan.daysOverdue > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Days Overdue</span>
                    <span className="font-medium text-red-600">{loan.daysOverdue}</span>
                  </div>
                )}
              </div>

              <Button
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLoan(loan);
                  setIsPaymentModalOpen(true);
                }}
              >
                Pay Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View for Selected Loan */}
      {selectedLoan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Loan {selectedLoan.id} - Payment Details</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Schedule
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Statement
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
                <TabsTrigger value="history">Payment History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                          <p className="text-xl font-semibold">{formatCurrency(selectedLoan.outstanding)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Next Due Date</p>
                          <p className="text-xl font-semibold">{formatDate(selectedLoan.nextDueDate)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedLoan.daysOverdue > 0 ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {selectedLoan.daysOverdue > 0 ? (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Payment Status</p>
                          <p className={`text-xl font-semibold ${
                            selectedLoan.daysOverdue > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {selectedLoan.daysOverdue > 0 ? `${selectedLoan.daysOverdue} days overdue` : 'On Track'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Auto-Debit Setup */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5" />
                      Auto-Debit Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automatic Monthly Payments</p>
                        <p className="text-sm text-muted-foreground">
                          Set up automatic payments from your bank account
                        </p>
                      </div>
                      <Button
                        variant={isAutoDebitSetup ? "secondary" : "outline"}
                        onClick={handleSetupAutoDebit}
                        disabled={isAutoDebitSetup}
                      >
                        {isAutoDebitSetup ? 'Auto-Debit Active' : 'Set Up Auto-Debit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Principal</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Fees</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockSchedule.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{formatDate(item.date)}</TableCell>
                              <TableCell>{formatCurrency(item.principal)}</TableCell>
                              <TableCell>{formatCurrency(item.interest)}</TableCell>
                              <TableCell>{formatCurrency(item.fees)}</TableCell>
                              <TableCell>{formatCurrency(item.balance)}</TableCell>
                              <TableCell>
                                <Badge className={
                                  item.status === 'paid' ? 'bg-green-100 text-green-800' :
                                  item.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }>
                                  {item.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { date: '2024-01-10', amount: 2500, method: 'Bank Transfer', status: 'completed' },
                        { date: '2023-12-10', amount: 2500, method: 'Mobile Money', status: 'completed' },
                        { date: '2023-11-10', amount: 2500, method: 'Cash', status: 'completed' }
                      ].map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Payment Received</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(payment.date)} • {payment.method}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">{formatCurrency(payment.amount)}</p>
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
          </DialogHeader>

          {!showOtpInput ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Loan {selectedLoan?.id}</strong><br />
                  Outstanding: {formatCurrency(selectedLoan?.outstanding || 0)}<br />
                  Next Due: {formatDate(selectedLoan?.nextDueDate || '')}
                </p>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="amount">Payment Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    min="1"
                    max={selectedLoan?.outstanding}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum: {formatCurrency(100)} • Maximum: {formatCurrency(selectedLoan?.outstanding || 0)}
                  </p>
                </div>

                <div>
                  <Label htmlFor="method">Payment Method</Label>
                  <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="cash">Cash (Branch)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentAmount && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2">Payment Breakdown</h4>
                      <div className="space-y-1 text-sm">
                        {(() => {
                          const breakdown = calculatePaymentBreakdown(parseFloat(paymentAmount));
                          return (
                            <>
                              <div className="flex justify-between">
                                <span>Principal:</span>
                                <span>{formatCurrency(breakdown.principal)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Interest:</span>
                                <span>{formatCurrency(breakdown.interest)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fees:</span>
                                <span>{formatCurrency(breakdown.fees)}</span>
                              </div>
                              <hr className="my-1" />
                              <div className="flex justify-between font-medium">
                                <span>Total:</span>
                                <span>{formatCurrency(parseFloat(paymentAmount))}</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setIsPaymentModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handlePayment}
                  disabled={!paymentAmount || !selectedPaymentMethod}
                >
                  Proceed to Pay
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Confirm Payment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter the 6-digit code sent to your phone/email
                </p>
              </div>

              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <div className="text-center">
                <Button variant="link" size="sm" className="text-xs">
                  Didn't receive code? Resend
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowOtpInput(false)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={handleConfirmPayment} disabled={otpCode.length !== 6}>
                  Confirm Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}