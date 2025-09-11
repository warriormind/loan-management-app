import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Calendar,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  BarChart3,
  Plus,
  Download,
  Eye,
  Bell,
  MessageSquare,
  Upload,
  RefreshCw,
  AlertTriangle,
  Zap
} from 'lucide-react';

const clientData = {
  name: "John Smith",
  email: "john.smith@email.com",
  creditScore: 720,
  totalLoans: "K45,000",
  outstandingBalance: "K12,500",
  nextPayment: {
    amount: "K2,500",
    dueDate: "2024-01-25",
    daysLeft: 5
  },
  daysOverdue: 0,
  activeLoans: [
    {
      id: "LN001",
      amount: "K25,000",
      outstanding: "K12,500",
      nextPayment: "K2,500",
      dueDate: "2024-01-25",
      daysOverdue: 0,
      status: "active"
    }
  ],
  recentPayments: [
    { id: "PAY001", amount: "K2,500", date: "2024-01-10", status: "completed", loanId: "LN001" },
    { id: "PAY002", amount: "K2,500", date: "2024-01-05", status: "completed", loanId: "LN001" },
    { id: "PAY003", amount: "K2,500", date: "2023-12-25", status: "completed", loanId: "LN001" },
    { id: "PAY004", amount: "K2,500", date: "2023-12-10", status: "completed", loanId: "LN001" },
    { id: "PAY005", amount: "K2,500", date: "2023-11-25", status: "completed", loanId: "LN001" },
  ],
  upcomingPayments: [
    { id: "PAY006", amount: "K2,500", dueDate: "2024-01-25", status: "pending", loanId: "LN001" },
    { id: "PAY007", amount: "K2,500", dueDate: "2024-02-05", status: "pending", loanId: "LN001" },
  ],
  notifications: [
    { id: "NOT001", type: "payment", message: "Payment due in 5 days", unread: true, date: "2024-01-20" },
    { id: "NOT002", type: "info", message: "Your loan application has been approved", unread: false, date: "2024-01-18" },
    { id: "NOT003", type: "warning", message: "Please upload your latest payslip", unread: true, date: "2024-01-15" },
  ],
  kycStatus: "verified",
  loanApplications: [
    { id: "APP001", amount: "K25,000", status: "approved", date: "2024-01-15" },
    { id: "APP002", amount: "K15,000", status: "pending", date: "2024-01-20" },
  ]
};

export function BorrowerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#00AEEF] to-[#00CED1] rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {clientData.name}!</h1>
            <p className="text-blue-100 mt-1">Here's your client management overview</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
                {clientData.notifications.filter(n => n.unread).length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                    {clientData.notifications.filter(n => n.unread).length}
                  </Badge>
                )}
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Credit Score</p>
              <p className="text-2xl font-bold">{clientData.creditScore}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Loan Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {clientData.activeLoans.map((loan) => (
          <Card key={loan.id} className="border-l-4 border-l-[#00AEEF]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="text-2xl font-semibold text-red-600">{loan.outstanding}</p>
                  <p className="text-xs text-muted-foreground">Loan {loan.id}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-2xl font-semibold">{clientData.nextPayment.amount}</p>
                <p className="text-sm text-muted-foreground">Due: {clientData.nextPayment.dueDate}</p>
                {clientData.daysOverdue > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-600 font-medium">
                      {clientData.daysOverdue} days overdue
                    </span>
                  </div>
                )}
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                clientData.daysOverdue > 0 ? 'bg-red-100' : 'bg-orange-100'
              }`}>
                <Calendar className={`w-6 h-6 ${
                  clientData.daysOverdue > 0 ? 'text-red-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Installment</p>
                <p className="text-2xl font-semibold">{clientData.nextPayment.amount}</p>
                <p className="text-sm text-muted-foreground">Due in {clientData.nextPayment.daysLeft} days</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">KYC Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {getKycStatusIcon(clientData.kycStatus)}
                  <Badge className={getKycStatusColor(clientData.kycStatus)}>
                    {clientData.kycStatus.charAt(0).toUpperCase() + clientData.kycStatus.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications & Messages */}
      {clientData.notifications.filter(n => n.unread).length > 0 && (
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              Notifications ({clientData.notifications.filter(n => n.unread).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clientData.notifications.filter(n => n.unread).slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'warning' ? 'bg-red-500' :
                    notification.type === 'payment' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="loans">My Loans</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Credit Score Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Credit Score Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Score</span>
                    <span className="text-2xl font-bold text-blue-600">{clientData.creditScore}</span>
                  </div>
                  <Progress value={72} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Excellent! Your credit score is in the good range (670-739)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-[#00AEEF] hover:bg-[#0099CC] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Apply for Loan
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Make Payment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Request Restructure
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Statement
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Officer
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData.recentPayments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        payment.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {payment.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Payment {payment.status === 'completed' ? 'Received' : 'Pending'}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                        <p className="text-xs text-muted-foreground">Loan {payment.loanId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {payment.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">{payment.id}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{payment.amount}</p>
                        <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Pending
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">{payment.amount}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Loan Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData.loanApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{application.amount}</p>
                      <p className="text-sm text-muted-foreground">Applied: {application.date}</p>
                    </div>
                    <Badge
                      variant={application.status === 'approved' ? 'default' : 'secondary'}
                      className={application.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Loan Statement</h3>
                    <p className="text-sm text-muted-foreground">Latest statement for January 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Clearance Certificate</h3>
                    <p className="text-sm text-muted-foreground">Loan completion certificate</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}