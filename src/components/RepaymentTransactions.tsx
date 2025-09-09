import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import {
  CreditCard,
  Smartphone,
  Building,
  Receipt,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Phone,
  Banknote,
  Calendar,
  DollarSign
} from 'lucide-react';

const paymentMethods = [
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    icon: Smartphone,
    description: 'Pay using Airtel Money, MTN Money, or Zamtel Money',
    providers: ['Airtel Money', 'MTN Money', 'Zamtel Money'],
    processingTime: 'Instant'
  },
  {
    id: 'debit_order',
    name: 'Debit Order',
    icon: CreditCard,
    description: 'Automatic monthly payments from your bank account',
    providers: ['Bank Debit Order'],
    processingTime: '1-2 business days'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: Building,
    description: 'Direct bank transfer to loan account',
    providers: ['Bank Transfer', 'Online Banking'],
    processingTime: '1-3 business days'
  }
];

const recentPayments = [
  {
    id: 'PAY001',
    amount: 'K2,500',
    method: 'Mobile Money',
    date: '2024-01-15',
    status: 'completed',
    reference: 'MM240115001',
    receipt: true
  },
  {
    id: 'PAY002',
    amount: 'K2,500',
    method: 'Bank Transfer',
    date: '2024-01-10',
    status: 'completed',
    reference: 'BT240110002',
    receipt: true
  },
  {
    id: 'PAY003',
    amount: 'K2,500',
    method: 'Debit Order',
    date: '2024-01-05',
    status: 'completed',
    reference: 'DO240105003',
    receipt: true
  }
];

const upcomingPayments = [
  {
    id: 'PAY004',
    amount: 'K2,500',
    dueDate: '2024-01-25',
    method: 'Mobile Money',
    status: 'pending'
  },
  {
    id: 'PAY005',
    amount: 'K2,500',
    dueDate: '2024-02-05',
    method: 'Debit Order',
    status: 'scheduled'
  }
];

export function RepaymentTransactions() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastPayment, setLastPayment] = useState<any>(null);

  const handlePayment = () => {
    if (!selectedMethod || !paymentAmount) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const payment = {
        id: `PAY${Date.now()}`,
        amount: paymentAmount,
        method: paymentMethods.find(m => m.id === selectedMethod)?.name,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        reference: `${selectedMethod.toUpperCase()}${Date.now().toString().slice(-6)}`,
        receipt: true
      };

      setLastPayment(payment);
      setIsProcessing(false);
      setShowReceipt(true);
      setPaymentAmount('');
      setMobileNumber('');
      setSelectedMethod(null);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Repayment Transactions</h1>
            <p className="text-blue-100 mt-1">Make payments and track your repayment history</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Next Payment Due</p>
            <p className="text-2xl font-bold">K2,500</p>
            <p className="text-sm text-blue-100">Jan 25, 2024</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Mobile Money</h3>
                <p className="text-sm text-muted-foreground">Instant payment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Debit Order</h3>
                <p className="text-sm text-muted-foreground">Auto-payment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Bank Transfer</h3>
                <p className="text-sm text-muted-foreground">Direct transfer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="pay" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pay">Make Payment</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="pay" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <Label className="text-base font-medium mb-4 block">Select Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent className="w-6 h-6 text-gray-600" />
                          <h3 className="font-medium">{method.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {method.processingTime}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Details */}
              {selectedMethod && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Payment Amount (K)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {selectedMethod === 'mobile_money' && (
                      <div>
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+260 XXX XXX XXX"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    )}

                    {selectedMethod === 'mobile_money' && (
                      <div>
                        <Label>Mobile Money Provider</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="airtel">Airtel Money</SelectItem>
                            <SelectItem value="mtn">MTN Money</SelectItem>
                            <SelectItem value="zamtel">Zamtel Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-medium mb-2">Payment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>K{paymentAmount || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee:</span>
                          <span>K0.00</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-2">
                          <span>Total:</span>
                          <span>K{paymentAmount || '0'}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handlePayment}
                      disabled={!paymentAmount || isProcessing}
                      className="w-full"
                      size="lg"
                    >
                      {isProcessing ? 'Processing...' : 'Make Payment'}
                    </Button>
                  </div>
                </div>
              )}
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
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <p className="font-medium">{payment.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.method} • {payment.date}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Ref: {payment.reference}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                      {payment.receipt && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
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
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <p className="font-medium">{payment.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {payment.dueDate}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payment.method}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Payment Successful
            </DialogTitle>
          </DialogHeader>
          {lastPayment && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{lastPayment.amount}</p>
                  <p className="text-sm text-green-700">Payment completed successfully</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Payment ID:</span>
                  <span className="font-medium">{lastPayment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reference:</span>
                  <span className="font-medium">{lastPayment.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-medium">{lastPayment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{lastPayment.date}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={() => setShowReceipt(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}