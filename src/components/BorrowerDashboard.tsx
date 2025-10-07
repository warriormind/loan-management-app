import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
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
  Zap,
  User,
  Banknote,
  Menu,
  LogOut,
  Users,
  PiggyBank,
  Receipt,
  Settings
} from 'lucide-react';
import { ClientChatbot } from './ClientChatbot';
import { LoanApplicationWizard } from './LoanApplicationWizard';
import { ApplicationStatusPage } from './ApplicationStatusPage';
import { BorrowerRepayments } from './BorrowerRepayments';
import { BorrowerRequests } from './BorrowerRequests';

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
    { id: "APP001", amount: 25000, status: "approved", date: "2024-01-15" },
    { id: "APP002", amount: 15000, status: "pending", date: "2024-01-20" },
  ]
};

const borrowerNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: 'dashboard' },
  { id: 'loans', label: 'My Loans', icon: Banknote, component: 'loans' },
  { id: 'applications', label: 'Applications', icon: FileCheck, component: 'applications' },
  { id: 'payments', label: 'Payments', icon: CreditCard, component: 'payments' },
  { id: 'requests', label: 'Requests', icon: RefreshCw, component: 'requests' },
  { id: 'documents', label: 'Documents', icon: FileCheck, component: 'documents' },
  { id: 'profile', label: 'Profile', icon: User, component: 'profile' },
];

export function BorrowerDashboard() {
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

  const handleLoanApplication = (application: any) => {
    // Handle loan application submission
    console.log('Loan application submitted:', application);
    // Here you would typically send the application to your backend
    // For now, we'll just show a success message
    alert('Loan application submitted successfully! Application ID: APP' + Date.now());
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSignOut = async () => {
    // Handle sign out - could redirect to landing page
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
    </SidebarProvider>
  );

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
        <TabsList className="grid w-full grid-cols-6">
           <TabsTrigger value="overview">Overview</TabsTrigger>
           <TabsTrigger value="applications">Applications</TabsTrigger>
           <TabsTrigger value="payments">Payments</TabsTrigger>
           <TabsTrigger value="loans">My Loans</TabsTrigger>
           <TabsTrigger value="requests">Requests</TabsTrigger>
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
                <Button
                  className="w-full justify-start bg-[#00AEEF] hover:bg-[#0099CC] text-white"
                  onClick={() => setIsWizardOpen(true)}
                >
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
                         {formatCurrency(payment.amount)}
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

        <TabsContent value="applications" className="space-y-4">
          <ApplicationStatusPage />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <BorrowerRepayments />
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
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

                     <div className="flex gap-2 mt-4">
                       <Button variant="outline" size="sm">
                         View Schedule
                       </Button>
                       <Button variant="outline" size="sm">
                         Download Statement
                       </Button>
                       <Button variant="outline" size="sm">
                         Request Restructure
                       </Button>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </TabsContent>
 
         <TabsContent value="requests" className="space-y-4">
           <BorrowerRequests />
         </TabsContent>
 
         <TabsContent value="documents" className="space-y-4">
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
                   <Button variant="outline" size="sm">
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

                 <div className="flex items-center justify-between p-3 border rounded-lg">
                   <div>
                     <h4 className="font-medium">Payment Schedule</h4>
                     <p className="text-sm text-muted-foreground">Amortization schedule</p>
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

                 <div className="flex items-center justify-between p-3 border rounded-lg">
                   <div>
                     <h4 className="font-medium">Bank Statement</h4>
                     <p className="text-sm text-muted-foreground">Latest 3 months</p>
                   </div>
                   <Button variant="outline" size="sm">
                     <Upload className="w-4 h-4 mr-2" />
                     Update
                   </Button>
                 </div>
               </CardContent>
             </Card>

             {/* Certificates */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5" />
                   Certificates
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-3 border rounded-lg">
                   <div>
                     <h4 className="font-medium">Clearance Certificate</h4>
                     <p className="text-sm text-muted-foreground">Available upon loan completion</p>
                   </div>
                   <Badge variant="secondary">Pending</Badge>
                 </div>

                 <div className="flex items-center justify-between p-3 border rounded-lg">
                   <div>
                     <h4 className="font-medium">Good Standing Certificate</h4>
                     <p className="text-sm text-muted-foreground">Loan performance certificate</p>
                   </div>
                   <Button variant="outline" size="sm">
                     <Download className="w-4 h-4 mr-2" />
                     Request
                   </Button>
                 </div>
               </CardContent>
             </Card>

             {/* Upload New Document */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Upload className="w-5 h-5" />
                   Upload Documents
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                   <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                   <p className="text-sm text-muted-foreground mb-2">
                     Drag and drop files here or click to browse
                   </p>
                   <p className="text-xs text-muted-foreground">
                     Supported formats: PDF, JPG, PNG (Max 5MB each)
                   </p>
                   <Button variant="outline" className="mt-3">
                     Browse Files
                   </Button>
                 </div>

                 <div className="text-sm text-muted-foreground">
                   <p className="font-medium mb-1">Common document types:</p>
                   <ul className="list-disc list-inside space-y-1">
                     <li>Bank statements</li>
                     <li>Salary slips</li>
                     <li>Tax certificates</li>
                     <li>Additional ID documents</li>
                   </ul>
                 </div>
               </CardContent>
             </Card>
           </div>
         </TabsContent>
      </Tabs>

      {/* Client Chatbot */}
      <ClientChatbot />

      {/* Loan Application Wizard */}
      <LoanApplicationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleLoanApplication}
      />
    </div>
  );
}