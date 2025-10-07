import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PWAInstall } from './PWAInstall';
import { registerServiceWorker, requestNotificationPermission } from '../utils/pwa';
import { useAuth } from './AuthContext';
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
  Download,
  LogOut,
  CheckCircle
} from 'lucide-react';

// Import all tab components
import { BorrowersTab } from './BorrowersTab';
import { LoansTab } from './LoansTab';
import { LoanApplicationsTab } from './LoanApplicationsTab';
import { CreditAnalystTab } from './CreditAnalystTab';
import { ApproverTab } from './ApproverTab';
import { DisbursementOfficerTab } from './DisbursementOfficerTab';
import { AccountantTab } from './AccountantTab';
import { RepaymentsTab } from './RepaymentsTab';
import { CollateralTab } from './CollateralTab';
import { SavingsTab } from './SavingsTab';
import { InvestorsTab } from './InvestorsTab';
import { ExpensesTab } from './ExpensesTab';
import { ChartsTab } from './ChartsTab';
import { ReportsTab } from './ReportsTab';
import { AccountingTab } from './AccountingTab';
import { SettingsTab } from './SettingsTab';
import { BranchesTab } from './BranchesTab';
import { StaffRolesTab } from './StaffRolesTab';
import { CalendarTab } from './CalendarTab';
import { MobileDashboard } from './MobileDashboard';
import { MobileLayout } from './MobileLayout';
import { DownloadPage } from './DownloadPage';
import { DownloadBanner } from './DownloadBanner';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: MobileDashboard },
  { id: 'borrowers', label: 'Borrowers', icon: Users, component: BorrowersTab },
  { id: 'loans', label: 'Loans', icon: Banknote, component: LoansTab },
  { id: 'applications', label: 'Applications', icon: FileText, component: LoanApplicationsTab },
  { id: 'credit-analysis', label: 'Credit Analysis', icon: TrendingUp, component: CreditAnalystTab },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle, component: ApproverTab },
  { id: 'disbursements', label: 'Disbursements', icon: DollarSign, component: DisbursementOfficerTab },
  { id: 'accounting', label: 'Accounting', icon: Calculator, component: AccountantTab },
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
  { id: 'download', label: 'Download App', icon: Download, component: DownloadPage },
];

export const LoanProApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Register service worker for PWA functionality
    registerServiceWorker();
    
    // Request notification permission for loan reminders
    requestNotificationPermission();

    // Handle URL parameters for deep linking
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && navigationItems.find(item => item.id === tab)) {
      setActiveTab(tab);
    }
  }, []);

  const ActiveComponent = navigationItems.find(item => item.id === activeTab)?.component || MobileDashboard;

  // Handle navigation from mobile components
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Update URL for deep linking
    window.history.pushState({}, '', `?tab=${tabId}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-background">
        {/* Download Banner */}
        <DownloadBanner />
        
        <div className="flex flex-1 overflow-hidden">
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
                        handleTabChange(item.id);
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

              {/* User info and sign out at bottom */}
              <div className="mt-auto pt-4 border-t">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Signed in as: {user?.name || user?.email}
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
                    {navigationItems.find(item => item.id === activeTab)?.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your {navigationItems.find(item => item.id === activeTab)?.label.toLowerCase()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="hidden sm:flex">
                  Demo Mode
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleTabChange('download')}
                  className="hidden sm:flex"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download App
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </header>

            <main className="flex-1 overflow-auto p-6">
              {activeTab === 'dashboard' ? (
                <ActiveComponent onNavigate={handleTabChange} />
              ) : (
                <ActiveComponent />
              )}
            </main>
          </div>
        </div>
        
        {/* PWA Installation Prompt */}
        <PWAInstall />
      </div>
    </SidebarProvider>
  );
};