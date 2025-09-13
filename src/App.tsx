import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import {
  Users,
  DollarSign,
  CreditCard,
  Shield,
  PiggyBank,
  TrendingUp,
  Receipt,
  BarChart3,
  FileText,
  Calculator,
  Settings,
  Building,
  UserCheck,
  Calendar,
  Menu,
  Banknote,
  LogOut,
  Home,
  Wallet,
  FileCheck,
  CreditCardIcon
} from 'lucide-react';

// Import components
import { LoginPage } from './components/LoginPage';
import { BorrowerDashboard } from './components/BorrowerDashboard';
import { KYCVerification } from './components/KYCVerification';
import { CreditAssessment } from './components/CreditAssessment';
import { RepaymentTransactions } from './components/RepaymentTransactions';
import { Statements } from './components/Statements';
import { BorrowersTab } from './components/BorrowersTab';
import { LoansTab } from './components/LoansTab';
import { CreditRiskModule } from './components/CreditRiskModule';
import { RepaymentsTab } from './components/RepaymentsTab';
import { CollateralTab } from './components/CollateralTab';
import { SavingsTab } from './components/SavingsTab';
import { InvestorsTab } from './components/InvestorsTab';
import { ExpensesTab } from './components/ExpensesTab';
import { ChartsTab } from './components/ChartsTab';
import { ReportsTab } from './components/ReportsTab';
import { AccountingTab } from './components/AccountingTab';
import { SettingsTab } from './components/SettingsTab';
import { BranchesTab } from './components/BranchesTab';
import { StaffRolesTab } from './components/StaffRolesTab';
import { CalendarTab } from './components/CalendarTab';
import { PortfolioDetails } from './components/PortfolioDetails';
import { ServiceDetails } from './components/ServiceDetails';
import { StarterPage } from './components/StarterPage';

// Import signup flow components
import { SignupForm } from './components/SignupForm';
import { SignupKYC } from './components/SignupKYC';
import { SignupSuccess } from './components/SignupSuccess';
import { OnboardingTutorial } from './components/OnboardingTutorial';

// Admin navigation items
const adminNavigationItems = [
  { id: 'clients', label: 'Clients', icon: Users, component: BorrowersTab },
  { id: 'loans', label: 'Loans', icon: Banknote, component: LoansTab },
  { id: 'repayments', label: 'Repayments', icon: CreditCard, component: RepaymentsTab },
  { id: 'collateral', label: 'Loan Collateral', icon: Shield, component: CollateralTab },
  { id: 'savings', label: 'Savings', icon: PiggyBank, component: SavingsTab },
  { id: 'investors', label: 'Investors', icon: TrendingUp, component: InvestorsTab },
  { id: 'expenses', label: 'Expenses', icon: Receipt, component: ExpensesTab },
  { id: 'charts', label: 'Charts', icon: BarChart3, component: ChartsTab },
  { id: 'reports', label: 'Reports', icon: FileText, component: ReportsTab },
  { id: 'accounting', label: 'Accounting', icon: Calculator, component: AccountingTab },
  { id: 'risk', label: 'Credit & Risk', icon: Shield, component: CreditRiskModule },
  { id: 'services', label: 'Service Details', icon: Settings, component: ServiceDetails },
  { id: 'portfolio', label: 'Portfolio', icon: FileText, component: PortfolioDetails },
  { id: 'starter', label: 'Starter Page', icon: Home, component: StarterPage },
  { id: 'settings', label: 'Account Settings', icon: Settings, component: SettingsTab },
  { id: 'branches', label: 'Branches', icon: Building, component: BranchesTab },
  { id: 'staff', label: 'Staff & Roles', icon: UserCheck, component: StaffRolesTab },
  { id: 'calendar', label: 'Calendar', icon: Calendar, component: CalendarTab },
];

// Client navigation items (simplified)
const clientNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, component: BorrowerDashboard },
  { id: 'loans', label: 'My Loans', icon: CreditCardIcon, component: LoansTab },
  { id: 'repayments', label: 'Repayments', icon: Wallet, component: RepaymentTransactions },
  { id: 'kyc', label: 'KYC Verification', icon: FileCheck, component: KYCVerification },
  { id: 'credit', label: 'Credit Assessment', icon: TrendingUp, component: CreditAssessment },
  { id: 'statements', label: 'Statements', icon: FileText, component: Statements },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'client'>('client');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'kyc' | 'success' | 'tutorial'>('login');
  const [signupData, setSignupData] = useState<any>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleLogin = (role: 'admin' | 'client', email: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
    setActiveTab(role === 'admin' ? 'clients' : 'dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('client');
    setUserEmail('');
    setActiveTab('dashboard');
  };

  const handleGetStarted = () => {
    setCurrentView('signup');
  };

  const handleSignupComplete = (userData: any) => {
    setSignupData(userData);
    setCurrentView('kyc');
  };

  const handleKYCComplete = () => {
    setCurrentView('success');
  };

  const handleStartTutorial = () => {
    setShowTutorial(true);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setIsAuthenticated(true);
    setUserRole('client');
    setUserEmail(signupData.email);
    setCurrentView('dashboard');
  };

  const handleGoToDashboard = () => {
    setIsAuthenticated(true);
    setUserRole('client');
    setUserEmail(signupData.email);
    setCurrentView('dashboard');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  // Show login page if not authenticated
  if (!isAuthenticated && currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show signup form
  if (!isAuthenticated && currentView === 'signup') {
    return <SignupForm onComplete={handleSignupComplete} onBack={handleBackToLogin} />;
  }

  // Show KYC verification
  if (!isAuthenticated && currentView === 'kyc') {
    return <SignupKYC userData={signupData} onComplete={handleKYCComplete} onBack={() => setCurrentView('signup')} />;
  }

  // Show success message
  if (!isAuthenticated && currentView === 'success') {
    return <SignupSuccess userData={signupData} onStartTutorial={handleStartTutorial} onGoToDashboard={handleGoToDashboard} />;
  }

  // Show onboarding tutorial
  if (showTutorial) {
    return <OnboardingTutorial onComplete={handleTutorialComplete} onSkip={handleGoToDashboard} />;
  }

  const navigationItems = userRole === 'admin' ? adminNavigationItems : clientNavigationItems;
  const ActiveComponent = navigationItems.find(item => item.id === activeTab)?.component || BorrowersTab;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="border-r transition-all duration-300 shadow-xl">
          <SidebarHeader className="border-b px-6 py-4 hover-lift bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-color to-primary rounded-xl flex items-center justify-center hover-scale transition-transform shadow-lg">
                <Banknote className="w-6 h-6 text-contrast-color" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-heading-color">LoanPro</h1>
                <p className="text-sm text-default-color/70">Management System</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 py-6">
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={activeTab === item.id}
                    className="w-full justify-start gap-4 px-4 py-3 transition-all duration-300 hover:bg-accent/20 hover:text-accent-color hover:translate-x-2 hover:shadow-md btn-interactive rounded-lg group"
                  >
                    <item.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-default-color/20 px-8 py-6 flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-background to-surface-color/30 backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="lg:hidden hover-scale transition-transform p-2 rounded-lg hover:bg-accent/20">
                <Menu className="w-6 h-6" />
              </SidebarTrigger>
              <div className="fade-in">
                <h2 className="text-2xl font-bold text-heading-color transition-colors">
                  {navigationItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-default-color/70 transition-colors mt-1">
                  {userRole === 'admin'
                    ? `Manage your ${navigationItems.find(item => item.id === activeTab)?.label.toLowerCase()}`
                    : `Welcome back, ${userEmail.split('@')[0]}`
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex hover-lift transition-all px-4 py-2 bg-gradient-to-r from-accent-color/10 to-primary/10 border-accent-color/30 text-accent-color font-medium">
                {userRole === 'admin' ? 'Admin' : 'Client'}
              </Badge>
              <Badge variant="outline" className="hidden sm:flex hover-lift transition-all px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 text-green-500 font-medium pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
              {userRole === 'admin' && (
                <Button variant="outline" size="sm" className="btn-interactive hover-lift px-6 py-2 bg-gradient-to-r from-accent-color to-primary text-contrast-color border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  Export
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-3 btn-interactive hover-lift px-6 py-2 bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <LogOut className="w-4 h-4 transition-transform hover:rotate-12" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-8 slide-in-right bg-gradient-to-br from-background to-surface-color/20">
            <div className="max-w-7xl mx-auto">
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}