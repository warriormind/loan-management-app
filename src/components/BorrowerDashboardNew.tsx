import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
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
  Zap,
  User,
  Banknote,
  Menu,
  LogOut,
  Settings,
  Phone,
  Mail
} from 'lucide-react';
import { LoanApplicationWizard } from './LoanApplicationWizard';
import { ApplicationStatusPage } from './ApplicationStatusPage';
import { BorrowerRepayments } from './BorrowerRepayments';
import { BorrowerRequests } from './BorrowerRequests';

const borrowerNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'loans', label: 'My Loans', icon: Banknote },
  { id: 'applications', label: 'Applications', icon: FileCheck },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'credit', label: 'Credit Score', icon: TrendingUp },
  { id: 'documents', label: 'Documents', icon: FileCheck },
  { id: 'support', label: 'Support', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const clientData = {
  name: "John Smith",
  email: "john.smith@email.com",
  creditScore: 720,
  totalLoans: 45000,
  outstandingBalance: 12500,
  nextPayment: {
    amount: 2500,
    dueDate: "2024-01-25",
    daysLeft: 5
  },
  daysOverdue: 0,
  overduePenalty: 0,
  activeLoans: [
    {
      id: "LN001",
      amount: 25000,
      outstanding: 12500,
      nextPayment: 2500,
      dueDate: "2024-01-25",
      daysOverdue: 0,
      penalty: 0,
      status: "active"
    }
  ],
  recentPayments: [
    { id: "PAY001", amount: 2500, date: "2024-01-10", status: "completed", loanId: "LN001" },
    { id: "PAY002", amount: 2500, date: "2024-01-05", status: "completed", loanId: "LN001" },
    { id: "PAY003", amount: 2500, date: "2023-12-25", status: "completed", loanId: "LN001" },
    { id: "PAY004", amount: 2500, date: "2023-12-10", status: "completed", loanId: "LN001" },
    { id: "PAY005", amount: 2500, date: "2023-11-25", status: "completed", loanId: "LN001" },
  ],
  notifications: [
    { id: "NOT001", type: "payment", message: "Payment due in 5 days", unread: true, date: "2024-01-20" },
    { id: "NOT002", type: "info", message: "Your loan application has been approved", unread: false, date: "2024-01-18" },
    { id: "NOT003", type: "warning", message: "Please upload your latest payslip", unread: true, date: "2024-01-15" },
  ],
  kycStatus: "verified",
  loanApplications: [
    { id: "APP001", amount: 25000, status: "approved", date: "2024-01-15" },
    { id: "APP002", amount: 15000, status: "pending", date: "2024-01-20" },
  ]
};

export function BorrowerDashboardNew() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Utility functions for formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Africa/Lusaka'
    });
  };

  const handleLoanApplication = (application: any) => {
    console.log('Loan application submitted:', application);
    alert('Loan application submitted successfully! Application ID: APP' + Date.now());
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSignOut = async () => {
    window.location.href = '/';
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-[#00AEEF] to-[#00CED1] rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {clientData.name}!</h1>
                  <p className="text-blue-100 mt-1">Here's your financial overview</p>
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
                <Card key={loan.id} className={`border-l-4 ${loan.daysOverdue > 0 ? 'border-l-red-500' : 'border-l-[#00AEEF]'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                        <p className={`text-2xl font-semibold ${loan.daysOverdue > 0 ? 'text-red-600' : 'text-red-600'}`}>
                          {formatCurrency(loan.outstanding)}
                        </p>
                        <p className="text-xs text-muted-foreground">Loan {loan.id}</p>
                        {loan.penalty > 0 && (
                          <p className="text-xs text-red-600 font-medium mt-1">
                            Penalty: {formatCurrency(loan.penalty)}
                          </p>
                        )}
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        loan.daysOverdue > 0 ? 'bg-red-100' : 'bg-red-100'
                      }`}>
                        <Wallet className={`w-6 h-6 ${loan.daysOverdue > 0 ? 'text-red-600' : 'text-red-600'}`} />
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
                      <p className={`text-2xl font-semibold ${clientData.daysOverdue > 0 ? 'text-red-600' : ''}`}>
                        {formatCurrency(clientData.nextPayment.amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">Due: {formatDate(clientData.nextPayment.dueDate)}</p>
                      {clientData.daysOverdue > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-600 font-medium">
                            {clientData.daysOverdue} days overdue
                          </span>
                        </div>
                      )}
                      {clientData.overduePenalty > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-600 font-medium">
                            Penalty: {formatCurrency(clientData.overduePenalty)}
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
                      <p className="text-2xl font-semibold">{formatCurrency(clientData.nextPayment.amount)}</p>
                      <p className="text-sm text-muted-foreground">Due in {clientData.nextPayment.daysLeft} days</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(clientData.nextPayment.dueDate)}
                      </p>
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
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <Badge className="text-green-600 bg-green-100">
                          Verified
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  size="lg"
                  className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12 text-base font-semibold"
                  onClick={() => setIsWizardOpen(true)}
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Apply for Loan
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-medium"
                  variant="outline"
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Make Payment
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-medium"
                  variant="outline"
                >
                  <RefreshCw className="w-5 h-5 mr-3" />
                  Request Restructure
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start border-2 border-purple-500 text-purple-600 hover:bg-purple-50 hover:border-purple-600 shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-medium"
                  variant="outline"
                >
                  <Upload className="w-5 h-5 mr-3" />
                  Upload Documents
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600 shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-medium"
                  variant="outline"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Download Statement
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start border-2 border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600 shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-medium"
                  variant="outline"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Contact Officer
                </Button>
              </CardContent>
            </Card>

            {/* Insights & Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Payment Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">On-time Payments</span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      19 of 20 payments made on time
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Financial Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Debt Reduction</span>
                      <span className="font-medium text-blue-600">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      K7,500 of K11,000 paid off
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Total Borrowed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(clientData.totalLoans)}</div>
                  <p className="text-sm text-muted-foreground">Across all loans</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Total Paid</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(7500)}</div>
                  <p className="text-sm text-muted-foreground">Principal + Interest</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Outstanding Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(clientData.outstandingBalance)}</div>
                  <p className="text-sm text-muted-foreground">Remaining to pay</p>
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
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground">{payment.id}</p>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-semibold h-12 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Eye className="w-5 h-5 mr-3" />
                    View All Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'loans':
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData.activeLoans.map((loan) => (
                  <div key={loan.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">Loan {loan.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          Started: {formatDate('2023-06-15')}
                        </p>
                      </div>
                      <Badge className={loan.daysOverdue > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {loan.daysOverdue > 0 ? 'Overdue' : 'Active'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Principal</p>
                        <p className="font-medium">{formatCurrency(loan.amount)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Outstanding</p>
                        <p className="font-medium text-red-600">{formatCurrency(loan.outstanding)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Payment</p>
                        <p className="font-medium">{formatCurrency(loan.nextPayment)}</p>
                        <p className="text-xs text-muted-foreground">Due: {formatDate(loan.dueDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">{formatCurrency(832.50)}</p>
                      </div>
                    </div>

                    {loan.daysOverdue > 0 && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">
                            {loan.daysOverdue} days overdue
                          </span>
                        </div>
                        {loan.penalty > 0 && (
                          <p className="text-sm text-red-600 mt-1">
                            Penalty: {formatCurrency(loan.penalty)}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-medium"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Schedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 font-medium"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Statement
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300 font-medium"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Request Restructure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'applications':
        return <ApplicationStatusPage />;

      case 'payments':
        return <BorrowerRepayments />;

      case 'requests':
        return <BorrowerRequests />;

      case 'documents':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loan Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Loan Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Loan Agreement</h4>
                    <p className="text-sm text-muted-foreground">Signed on {formatDate('2023-06-15')}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 font-medium shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Loan Statement</h4>
                    <p className="text-sm text-muted-foreground">Latest statement for January 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* KYC Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  KYC Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">National ID</h4>
                    <p className="text-sm text-muted-foreground">Verified on {formatDate('2023-06-10')}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Proof of Address</h4>
                    <p className="text-sm text-muted-foreground">Utility bill - Verified</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'credit':
        return (
          <div className="space-y-6">
            {/* Credit Score Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Credit Score Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{clientData.creditScore}</div>
                    <div className="text-sm text-muted-foreground">Current Score</div>
                    <div className="text-xs text-green-600 mt-1">Excellent Range</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">+15</div>
                    <div className="text-sm text-muted-foreground">Points This Month</div>
                    <div className="text-xs text-green-600 mt-1">Great Progress!</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">750</div>
                    <div className="text-sm text-muted-foreground">Target Score</div>
                    <div className="text-xs text-purple-600 mt-1">Next Milestone</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Excellent</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Credit Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Factors Affecting Your Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { factor: 'Payment History', impact: '35%', status: 'Excellent', color: 'text-green-600' },
                    { factor: 'Credit Utilization', impact: '30%', status: 'Good', color: 'text-blue-600' },
                    { factor: 'Account Age', impact: '15%', status: 'Good', color: 'text-blue-600' },
                    { factor: 'Credit Mix', impact: '10%', status: 'Fair', color: 'text-yellow-600' },
                    { factor: 'New Credit', impact: '10%', status: 'Excellent', color: 'text-green-600' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.factor}</div>
                        <div className="text-sm text-muted-foreground">{item.impact} impact</div>
                      </div>
                      <div className={`font-medium ${item.color}`}>{item.status}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvement Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Improve Your Credit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tip: 'Pay all bills on time', impact: 'High', icon: '⏰' },
                    { tip: 'Keep credit utilization below 30%', impact: 'High', icon: '📊' },
                    { tip: 'Avoid opening new credit accounts', impact: 'Medium', icon: '🚫' },
                    { tip: 'Review your credit report regularly', impact: 'Medium', icon: '👁️' },
                    { tip: 'Maintain diverse credit types', impact: 'Low', icon: '🔄' }
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="text-2xl">{tip.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">{tip.tip}</div>
                        <div className="text-sm text-muted-foreground">Impact: {tip.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-muted-foreground">Available 24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Phone Support</div>
                      <div className="text-sm text-muted-foreground">+260 211 123 456</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-muted-foreground">support@loanpro.zm</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">How to apply for a loan</div>
                      <div className="text-sm text-muted-foreground">Step-by-step guide</div>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Payment methods</div>
                      <div className="text-sm text-muted-foreground">Available options</div>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Document requirements</div>
                      <div className="text-sm text-muted-foreground">What you need to apply</div>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Loan terms explained</div>
                      <div className="text-sm text-muted-foreground">Understanding your loan</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm">Your loan application has been approved! Funds will be disbursed within 24 hours.</div>
                      <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">System Notification</div>
                      <div className="text-sm">Your payment of K2,500 has been received successfully.</div>
                      <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="p-3 border rounded-lg bg-gray-50">{clientData.name}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="p-3 border rounded-lg bg-gray-50">{clientData.email}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="p-3 border rounded-lg bg-gray-50">+260 955 123 456</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Status</label>
                    <div className="p-3 border rounded-lg bg-green-50 text-green-700">Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive updates via email</div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive updates via SMS</div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Payment Reminders</div>
                    <div className="text-sm text-muted-foreground">Get reminded about upcoming payments</div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing Communications</div>
                    <div className="text-sm text-muted-foreground">Receive promotional offers</div>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Change Password</div>
                    <div className="text-sm text-muted-foreground">Update your account password</div>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-medium shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Change
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 font-medium shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Login History</div>
                    <div className="text-sm text-muted-foreground">View recent account activity</div>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 font-medium shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Dashboard content</div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Banknote className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">LoanPro</h1>
                <p className="text-sm text-muted-foreground">Borrower Portal</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              {borrowerNavigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start gap-3 px-3 py-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* User info and sign out at bottom */}
            <div className="mt-auto pt-4 border-t">
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Signed in as: {clientData.name}
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-3 px-3 py-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden">
                <Menu className="w-5 h-5" />
              </SidebarTrigger>
              <div>
                <h2 className="text-xl font-semibold">
                  {borrowerNavigationItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage your {borrowerNavigationItems.find(item => item.id === activeTab)?.label.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex">
                Borrower Portal
              </Badge>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <p className="text-lg font-bold">{clientData.creditScore}</p>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {renderActiveComponent()}
          </main>
        </div>
      </div>

      {/* Floating Action Button for Quick Loan Application */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          onClick={() => setIsWizardOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {/* Loan Application Wizard */}
      <LoanApplicationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleLoanApplication}
      />
    </SidebarProvider>
  );
}