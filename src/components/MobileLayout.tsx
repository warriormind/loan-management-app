import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Menu, 
  Bell, 
  Search, 
  MoreVertical,
  ArrowLeft,
  Banknote
} from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  navigationItems: any[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function MobileLayout({ 
  children, 
  title, 
  subtitle, 
  navigationItems, 
  activeTab, 
  onTabChange 
}: MobileLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background md:hidden">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 w-9 h-9">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <div className="flex flex-col h-full">
                  {/* Menu Header */}
                  <div className="border-b p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Banknote className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h1 className="font-semibold">LoanPro</h1>
                        <p className="text-sm text-muted-foreground">Management System</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Menu */}
                  <ScrollArea className="flex-1 px-4 py-4">
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onTabChange(item.id);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                            activeTab === item.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent text-muted-foreground hover:text-accent-foreground'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Menu Footer */}
                  <div className="border-t p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Version 1.0.0</span>
                      <Badge variant="outline" className="text-xs">
                        PWA
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex flex-col">
              <h1 className="font-semibold text-base leading-none">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-0 w-9 h-9">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 w-9 h-9">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
}

// Quick Actions Component for Mobile
export function QuickActions() {
  const quickActions = [
    { label: 'New Loan', icon: Banknote, color: 'bg-blue-500' },
    { label: 'Add Borrower', icon: Search, color: 'bg-green-500' },
    { label: 'Record Payment', icon: Bell, color: 'bg-orange-500' },
    { label: 'View Reports', icon: MoreVertical, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {quickActions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-20 flex flex-col gap-2 p-4"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color}`}>
            <action.icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}