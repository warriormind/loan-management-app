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
  Banknote
} from 'lucide-react';

// Import all tab components
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

const navigationItems = [
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

export default function App() {
  const [activeTab, setActiveTab] = useState('borrowers');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                  Manage your {navigationItems.find(item => item.id === activeTab)?.label.toLowerCase()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex">
                Live
              </Badge>
              <Button variant="outline" size="sm">
                Export
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