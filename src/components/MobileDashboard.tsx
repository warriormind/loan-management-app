import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import {
  Users,
  Banknote,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  ArrowRight,
  Download,
  Smartphone,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Bell,
  FileText,
  Shield,
  Target
} from 'lucide-react';

interface MobileDashboardProps {
  onNavigate?: (tab: string) => void;
}

export function MobileDashboard({ onNavigate }: MobileDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  // Enhanced mock data for comprehensive dashboard
  const portfolioStats = [
    { label: 'Total Outstanding Principal', value: 'K 12.5M', icon: Banknote, color: 'text-blue-600', change: '+2.1%' },
    { label: 'New Applications Today', value: '24', icon: FileText, color: 'text-green-600', change: '+15%' },
    { label: 'Disbursements Today', value: 'K 850K', icon: DollarSign, color: 'text-purple-600', change: '+8.5%' },
    { label: 'Available Funds', value: 'K 2.3M', icon: Shield, color: 'text-teal-600', change: '-5.2%' },
  ];

  const parData = [
    { label: 'PAR 30', value: 'K 125K', percentage: 2.5, color: 'bg-yellow-500' },
    { label: 'PAR 60', value: 'K 89K', percentage: 1.8, color: 'bg-orange-500' },
    { label: 'PAR 90', value: 'K 234K', percentage: 4.7, color: 'bg-red-500' },
  ];

  const overdueBuckets = [
    { days: '1-7 days', count: 12, amount: 'K 45K' },
    { days: '8-30 days', count: 28, amount: 'K 156K' },
    { days: '31-60 days', count: 15, amount: 'K 89K' },
    { days: '61+ days', count: 8, amount: 'K 67K' },
  ];

  const tasks = [
    { id: 1, title: 'Review 5 pending applications', priority: 'high', due: 'Today' },
    { id: 2, title: 'Approve disbursement for LN002', priority: 'medium', due: 'Today' },
    { id: 3, title: 'Follow up on overdue payments', priority: 'high', due: 'Tomorrow' },
    { id: 4, title: 'Monthly portfolio report', priority: 'low', due: 'End of week' },
  ];

  const recentActivity = [
    { name: 'John Mukuka', action: 'Payment received', amount: 'K 1,500', time: '2 min ago', status: 'success' },
    { name: 'Mary Banda', action: 'Loan approved', amount: 'K 50,000', time: '15 min ago', status: 'approved' },
    { name: 'David Phiri', action: 'Payment overdue', amount: 'K 2,300', time: '1 hour ago', status: 'overdue' },
    { name: 'Grace Mwale', action: 'New application', amount: 'K 25,000', time: '2 hours ago', status: 'pending' },
  ];

  const quickActions = [
    { label: 'Add Borrower', icon: Users, tab: 'borrowers' },
    { label: 'New Loan', icon: Banknote, tab: 'loans' },
    { label: 'Record Payment', icon: CheckCircle, tab: 'repayments' },
    { label: 'View Reports', icon: TrendingUp, tab: 'reports' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Install App Prompt */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Install LoanPro App</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get offline access, push notifications, and a native app experience
              </p>
              <Button
                size="sm"
                onClick={() => onNavigate?.('download')}
                className="text-xs h-8"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer ID or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="lusaka">Lusaka</SelectItem>
                  <SelectItem value="kitwe">Kitwe</SelectItem>
                  <SelectItem value="ndola">Ndola</SelectItem>
                </SelectContent>
              </Select>
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from yesterday
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio at Risk (PAR) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Portfolio at Risk (PAR)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parData.map((par, index) => (
              <div key={index} className="text-center">
                <div className={`w-full h-3 ${par.color} rounded-full mb-2`} style={{ width: `${par.percentage * 10}%` }}></div>
                <p className="font-semibold">{par.label}</p>
                <p className="text-2xl font-bold text-red-600">{par.value}</p>
                <p className="text-sm text-muted-foreground">{par.percentage}% of portfolio</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overdue Accounts Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Overdue Accounts Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {overdueBuckets.map((bucket, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{bucket.days}</p>
                  <p className="text-sm text-muted-foreground">{bucket.count} accounts</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">{bucket.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks & Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Tasks & Alerts ({tasks.filter(t => t.priority === 'high').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">Due: {task.due}</p>
                </div>
                <Badge variant={
                  task.priority === 'high' ? 'destructive' :
                  task.priority === 'medium' ? 'secondary' : 'outline'
                }>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Tasks
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Review Applications', icon: FileText, tab: 'loans' },
              { label: 'Process Disbursements', icon: DollarSign, tab: 'loans' },
              { label: 'Record Payments', icon: CheckCircle, tab: 'repayments' },
              { label: 'Generate Reports', icon: TrendingUp, tab: 'reports' },
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-16 flex flex-col gap-1 p-3"
                onClick={() => onNavigate?.(action.tab)}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loan Portfolio Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Loan Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Active Loans</span>
              <span className="font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Collection Rate</span>
              <span className="font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>At Risk Loans</span>
              <span className="font-medium text-red-600">8%</span>
            </div>
            <Progress value={8} className="h-2 bg-red-100" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{activity.name}</p>
                      <Badge className={`text-xs px-2 py-0 ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Payment Alerts</p>
              <p className="text-xs text-muted-foreground">
                23 loans are overdue. 15 payments due today.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 h-8 text-xs"
                onClick={() => onNavigate?.('repayments')}
              >
                Review Payments
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add floating action button for quick loan creation */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button 
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg"
          onClick={() => onNavigate?.('loans')}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}