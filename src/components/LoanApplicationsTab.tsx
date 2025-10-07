import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import {
  Search,
  Eye,
  UserCheck,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Filter,
  Download,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Target
} from 'lucide-react';

interface LoanApplication {
  id: string;
  borrowerName: string;
  borrowerId: string;
  product: string;
  amount: number;
  term: number;
  status: 'draft' | 'submitted' | 'under_review' | 'pending_docs' | 'escalated' | 'approved' | 'rejected';
  assignedLO?: string;
  submittedDate: string;
  priority: 'low' | 'medium' | 'high';
  riskScore?: number;
  creditScore?: number;
}

const mockApplications: LoanApplication[] = [
  {
    id: 'APP001',
    borrowerName: 'John Smith',
    borrowerId: 'B001',
    product: 'Personal Loan',
    amount: 25000,
    term: 24,
    status: 'under_review',
    assignedLO: 'Sarah Johnson',
    submittedDate: '2024-01-15',
    priority: 'medium',
    riskScore: 65,
    creditScore: 720
  },
  {
    id: 'APP002',
    borrowerName: 'Mary Banda',
    borrowerId: 'B002',
    product: 'Business Loan',
    amount: 150000,
    term: 36,
    status: 'pending_docs',
    assignedLO: 'Michael Brown',
    submittedDate: '2024-01-16',
    priority: 'high',
    riskScore: 45,
    creditScore: 680
  },
  {
    id: 'APP003',
    borrowerName: 'David Phiri',
    borrowerId: 'B003',
    product: 'Emergency Loan',
    amount: 5000,
    term: 6,
    status: 'approved',
    assignedLO: 'Sarah Johnson',
    submittedDate: '2024-01-14',
    priority: 'low',
    riskScore: 25,
    creditScore: 750
  },
  {
    id: 'APP004',
    borrowerName: 'Grace Mwale',
    borrowerId: 'B004',
    product: 'Personal Loan',
    amount: 35000,
    term: 30,
    status: 'escalated',
    assignedLO: 'Sarah Johnson',
    submittedDate: '2024-01-17',
    priority: 'high',
    riskScore: 85,
    creditScore: 620
  }
];

export function LoanApplicationsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.borrowerId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'pending_docs': return 'bg-orange-100 text-orange-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'under_review': return <Eye className="w-4 h-4" />;
      case 'pending_docs': return <AlertTriangle className="w-4 h-4" />;
      case 'escalated': return <AlertTriangle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleViewApplication = (application: LoanApplication) => {
    setSelectedApplication(application);
    setIsDetailModalOpen(true);
  };

  const handleAssignLO = (applicationId: string, loName: string) => {
    console.log(`Assigning ${applicationId} to ${loName}`);
    // Handle assignment logic
  };

  const handleRequestDocs = (applicationId: string) => {
    console.log(`Requesting additional docs for ${applicationId}`);
    // Handle document request logic
  };

  const handlePreApprove = (applicationId: string) => {
    console.log(`Pre-approving ${applicationId}`);
    // Handle pre-approval logic
  };

  const stats = {
    total: mockApplications.length,
    pending: mockApplications.filter(a => a.status === 'under_review').length,
    approved: mockApplications.filter(a => a.status === 'approved').length,
    rejected: mockApplications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-semibold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-semibold">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-semibold">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Loan Applications</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="pending_docs">Pending Docs</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned LO</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.borrowerName}</div>
                        <div className="text-sm text-muted-foreground">{application.borrowerId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{application.product}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(application.amount)}</TableCell>
                    <TableCell>{application.term} months</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        {application.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{application.assignedLO || 'Unassigned'}</TableCell>
                    <TableCell>{formatDate(application.submittedDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewApplication(application)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!application.assignedLO && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAssignLO(application.id, 'Sarah Johnson')}
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRequestDocs(application.id)}
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                        {application.status === 'under_review' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePreApprove(application.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details - {selectedApplication?.id}</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Application Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Amount Requested</p>
                        <p className="text-xl font-semibold">{formatCurrency(selectedApplication.amount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Term</p>
                        <p className="text-xl font-semibold">{selectedApplication.term} months</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Score</p>
                        <p className="text-xl font-semibold">{selectedApplication.riskScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Tabs */}
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="credit">Credit Checks</TabsTrigger>
                  <TabsTrigger value="scoring">Scoring & Notes</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Borrower Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Borrower Name</label>
                          <p>{selectedApplication.borrowerName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Borrower ID</label>
                          <p>{selectedApplication.borrowerId}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Product</label>
                          <p>{selectedApplication.product}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Credit Score</label>
                          <p>{selectedApplication.creditScore}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Document Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: 'ID Document', status: 'verified', date: '2024-01-15' },
                          { name: 'Proof of Address', status: 'verified', date: '2024-01-15' },
                          { name: 'Salary Slip', status: 'pending', date: null },
                          { name: 'Bank Statement', status: 'verified', date: '2024-01-16' }
                        ].map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {doc.status === 'verified' ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Clock className="w-5 h-5 text-yellow-600" />
                              )}
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                {doc.date && (
                                  <p className="text-sm text-muted-foreground">Verified: {formatDate(doc.date)}</p>
                                )}
                              </div>
                            </div>
                            <Badge className={
                              doc.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }>
                              {doc.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="credit" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Credit Check Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Credit Bureau Score</label>
                          <p className="text-lg font-semibold">{selectedApplication.creditScore}</p>
                          <Progress value={75} className="mt-2" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Risk Assessment</label>
                          <p className="text-lg font-semibold">{selectedApplication.riskScore}% Risk</p>
                          <Progress value={selectedApplication.riskScore || 0} className="mt-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="scoring" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scoring & Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">LO Notes</label>
                        <Textarea
                          placeholder="Add notes about this application..."
                          className="mt-2"
                          rows={4}
                        />
                      </div>
                      <Button>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Save Notes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { date: '2024-01-15T10:30:00Z', action: 'Application submitted', user: 'System' },
                          { date: '2024-01-16T09:15:00Z', action: 'Assigned to Sarah Johnson', user: 'System' },
                          { date: '2024-01-16T14:20:00Z', action: 'Documents verified', user: 'Sarah Johnson' },
                          { date: '2024-01-17T11:45:00Z', action: 'Credit check completed', user: 'Credit System' }
                        ].map((event, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="font-medium">{event.action}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(event.date)} by {event.user}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}