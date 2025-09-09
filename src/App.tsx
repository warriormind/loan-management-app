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

// Admin navigation items
const adminNavigationItems = [
  { id: 'borrowers', label: 'Borrowers', icon: Users, component: BorrowersTab },
  { id: 'loans', label: 'Loans', icon: Banknote, component: LoansTab },
  { id: 'repayments', label: 'Repayments', icon: CreditCard, component: RepaymentsTab },
  { id: 'collateral', label: 'Loan Collateral', icon: Shield, component: CollateralTab },
  { id: 'savings', label: 'Savings', icon: PiggyBank, component: SavingsTab },
  { id: 'investors', label: 'Investors', icon: TrendingUp, component: InvestorsTab },
  { id: 'expenses', label: 'Expenses', icon: Receipt, component: ExpensesTab },
  { id: 'charts', label: 'Charts', icon: BarChart3, component: ChartsTab },
  { id: 'reports', label: 'Reports', icon: FileText, component: ReportsTab },
  { id: 'accounting', label: 'Accounting', icon: Calculator, component: AccountingTab },
  { id: 'settings', label: 'Account Settings', icon: Settings, component: SettingsTab },
  { id: 'branches', label: 'Branches', icon: Building, component: BranchesTab },
  { id: 'staff', label: 'Staff & Roles', icon: UserCheck, component: StaffRolesTab },
  { id: 'calendar', label: 'Calendar', icon: Calendar, component: CalendarTab },
];

// Borrower navigation items (simplified)
const borrowerNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, component: BorrowerDashboard },
  { id: 'loans', label: 'My Loans', icon: CreditCardIcon, component: LoansTab },
  { id: 'repayments', label: 'Repayments', icon: Wallet, component: RepaymentTransactions },
  { id: 'kyc', label: 'KYC Verification', icon: FileCheck, component: KYCVerification },
  { id: 'credit', label: 'Credit Assessment', icon: TrendingUp, component: CreditAssessment },
  { id: 'statements', label: 'Statements', icon: FileText, component: Statements },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'borrower'>('borrower');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (role: 'admin' | 'borrower', email: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
    setActiveTab(role === 'admin' ? 'borrowers' : 'dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('borrower');
    setUserEmail('');
    setActiveTab('dashboard');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navigationItems = userRole === 'admin' ? adminNavigationItems : borrowerNavigationItems;
  const ActiveComponent = navigationItems.find(item => item.id === activeTab)?.component || BorrowersTab;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Banknote className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">LoanPro</h1>
                <p className="text-sm text-muted-foreground">Management System</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={activeTab === item.id}
                    className="w-full justify-start gap-3 px-3 py-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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
                  {navigationItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {userRole === 'admin'
                    ? `Manage your ${navigationItems.find(item => item.id === activeTab)?.label.toLowerCase()}`
                    : `Welcome back, ${userEmail.split('@')[0]}`
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex">
                {userRole === 'admin' ? 'Admin' : 'Borrower'}
              </Badge>
              <Badge variant="outline" className="hidden sm:flex">
                Live
              </Badge>
              {userRole === 'admin' && (
                <Button variant="outline" size="sm">
                  Export
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <ActiveComponent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}