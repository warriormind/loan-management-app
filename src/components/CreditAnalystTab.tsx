import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  TrendingUp,
  Shield,
  Target,
  Calculator,
  Users,
  DollarSign,
  Filter,
  Download
} from 'lucide-react';

interface CreditApplication {
  id: string;
  borrowerName: string;
  borrowerId: string;
  amount: number;
  product: string;
  submittedDate: string;
  priority: 'high' | 'medium' | 'low';
  riskScore: number;
  creditScore: number;
  status: 'pending_analysis' | 'under_review' | 'approved' | 'rejected' | 'referred';
  assignedAnalyst: string;
  autoChecks: {
    debtToIncomeRatio: number;
    exposureLimit: number;
    relatedPartyCheck: 'pass' | 'fail' | 'warning';
    previousDelinquencies: number;
  };
  manualOverride?: {
    riskRating: 'high' | 'medium' | 'low';
    reason: string;
    conditions: string[];
  };
}

const mockApplications: CreditApplication[] = [
  {
    id: 'APP001',
    borrowerName: 'John Smith',
    borrowerId: 'B001',
    amount: 25000,
    product: 'Personal Loan',
    submittedDate: '2024-01-15',
    priority: 'medium',
    riskScore: 65,
    creditScore: 720,
    status: 'under_review',
    assignedAnalyst: 'Current User',
    autoChecks: {
      debtToIncomeRatio: 35,
      exposureLimit: 85,
      relatedPartyCheck: 'pass',
      previousDelinquencies: 0
    }
  },
  {
    id: 'APP002',
    borrowerName: 'Mary Banda',
    borrowerId: 'B002',
    amount: 150000,
    product: 'Business Loan',
    submittedDate: '2024-01-16',
    priority: 'high',
    riskScore: 45,
    creditScore: 680,
    status: 'pending_analysis',
    assignedAnalyst: 'Current User',
    autoChecks: {
      debtToIncomeRatio: 55,
      exposureLimit: 95,
      relatedPartyCheck: 'warning',
      previousDelinquencies: 1
    }
  },
  {
    id: 'APP003',
    borrowerName: 'David Phiri',
    borrowerId: 'B003',
    amount: 5000,
    product: 'Emergency Loan',
    submittedDate: '2024-01-14',
    priority: 'low',
    riskScore: 25,
    creditScore: 750,
    status: 'approved',
    assignedAnalyst: 'Current User',
    autoChecks: {
      debtToIncomeRatio: 20,
      exposureLimit: 45,
      relatedPartyCheck: 'pass',
      previousDelinquencies: 0
    },
    manualOverride: {
      riskRating: 'low',
      reason: 'Excellent credit history and low debt ratio',
      conditions: []
    }
  }
];

export function CreditAnalystTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<CreditApplication | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [riskRating, setRiskRating] = useState<'high' | 'medium' | 'low'>('medium');
  const [analysisReason, setAnalysisReason] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);

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

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return 'High Risk';
    if (score >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_analysis': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'referred': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAutoCheckStatus = (check: any, type: string) => {
    switch (type) {
      case 'debtToIncomeRatio':
        return check > 50 ? 'fail' : check > 40 ? 'warning' : 'pass';
      case 'exposureLimit':
        return check > 90 ? 'fail' : check > 80 ? 'warning' : 'pass';
      case 'relatedPartyCheck':
        return check;
      case 'previousDelinquencies':
        return check > 2 ? 'fail' : check > 0 ? 'warning' : 'pass';
      default:
        return 'pass';
    }
  };

  const handleAnalysis = (application: CreditApplication) => {
    setSelectedApplication(application);
    setRiskRating(application.manualOverride?.riskRating || 'medium');
    setAnalysisReason(application.manualOverride?.reason || '');
    setConditions(application.manualOverride?.conditions || []);
    setIsAnalysisModalOpen(true);
  };

  const handleApprove = () => {
    if (!selectedApplication) return;

    const analysis = {
      riskRating,
      reason: analysisReason,
      conditions
    };

    console.log('Approving application:', selectedApplication.id, analysis);
    alert(`Application ${selectedApplication.id} approved with conditions`);
    setIsAnalysisModalOpen(false);
  };

  const handleRefer = () => {
    if (!selectedApplication) return;

    console.log('Referring application to committee:', selectedApplication.id);
    alert(`Application ${selectedApplication.id} referred to committee`);
    setIsAnalysisModalOpen(false);
  };

  const handleReject = () => {
    if (!selectedApplication) return;

    console.log('Rejecting application:', selectedApplication.id);
    alert(`Application ${selectedApplication.id} rejected`);
    setIsAnalysisModalOpen(false);
  };

  const addCondition = () => {
    setConditions([...conditions, '']);
  };

  const updateCondition = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = value;
    setConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const stats = {
    pending: mockApplications.filter(a => a.status === 'pending_analysis').length,
    underReview: mockApplications.filter(a => a.status === 'under_review').length,
    approved: mockApplications.filter(a => a.status === 'approved').length,
    highRisk: mockApplications.filter(a => a.riskScore >= 70).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Analysis</p>
                <p className="text-2xl font-semibold">{stats.pending}</p>
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
                <p className="text-2xl font-semibold">{stats.underReview}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
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
                <p className="text-sm text-muted-foreground">High Risk Cases</p>
                <p className="text-2xl font-semibold">{stats.highRisk}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Queue */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Credit Analysis Queue</CardTitle>
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
                  <SelectItem value="pending_analysis">Pending Analysis</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="referred">Referred</SelectItem>
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Credit Score</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell className="font-semibold">{formatCurrency(application.amount)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getRiskColor(application.riskScore)}`}>
                          {application.riskScore}%
                        </span>
                        <Badge variant="outline" className={getRiskColor(application.riskScore)}>
                          {getRiskLevel(application.riskScore)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{application.creditScore}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(application.submittedDate)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAnalysis(application)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Modal */}
      <Dialog open={isAnalysisModalOpen} onOpenChange={setIsAnalysisModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Credit Analysis - {selectedApplication?.id}</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Application Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Borrower</p>
                        <p className="text-lg font-semibold">{selectedApplication.borrowerName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="text-lg font-semibold">{formatCurrency(selectedApplication.amount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-red-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Score</p>
                        <p className="text-lg font-semibold">{selectedApplication.riskScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Tabs */}
              <Tabs defaultValue="auto-checks" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="auto-checks">Auto Checks</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                </TabsList>

                <TabsContent value="auto-checks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Automated Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Debt-to-Income Ratio</span>
                            <Badge className={
                              selectedApplication.autoChecks.debtToIncomeRatio > 50 ? 'bg-red-100 text-red-800' :
                              selectedApplication.autoChecks.debtToIncomeRatio > 40 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {selectedApplication.autoChecks.debtToIncomeRatio}%
                            </Badge>
                          </div>
                          <Progress value={selectedApplication.autoChecks.debtToIncomeRatio} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Exposure Limit</span>
                            <Badge className={
                              selectedApplication.autoChecks.exposureLimit > 90 ? 'bg-red-100 text-red-800' :
                              selectedApplication.autoChecks.exposureLimit > 80 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {selectedApplication.autoChecks.exposureLimit}%
                            </Badge>
                          </div>
                          <Progress value={selectedApplication.autoChecks.exposureLimit} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Related Party Check</span>
                            <Badge className={
                              selectedApplication.autoChecks.relatedPartyCheck === 'fail' ? 'bg-red-100 text-red-800' :
                              selectedApplication.autoChecks.relatedPartyCheck === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {selectedApplication.autoChecks.relatedPartyCheck}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Previous Delinquencies</span>
                            <Badge className={
                              selectedApplication.autoChecks.previousDelinquencies > 2 ? 'bg-red-100 text-red-800' :
                              selectedApplication.autoChecks.previousDelinquencies > 0 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {selectedApplication.autoChecks.previousDelinquencies}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Document Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: 'ID Document', status: 'verified', extracted: 'Name: John Smith, ID: 12345678' },
                          { name: 'Proof of Address', status: 'verified', extracted: 'Address: 123 Main St, Lusaka' },
                          { name: 'Salary Slip', status: 'verified', extracted: 'Monthly Income: K 8,500' },
                          { name: 'Bank Statement', status: 'pending', extracted: 'Processing...' }
                        ].map((doc, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                            <div className={`w-3 h-3 rounded-full mt-2 ${
                              doc.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                            <div className="flex-1">
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.extracted}</p>
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

                <TabsContent value="analysis" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Credit Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="risk-rating">Risk Rating</Label>
                          <Select value={riskRating} onValueChange={(value: any) => setRiskRating(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low Risk</SelectItem>
                              <SelectItem value="medium">Medium Risk</SelectItem>
                              <SelectItem value="high">High Risk</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="analysis-reason">Analysis Reason</Label>
                        <Textarea
                          id="analysis-reason"
                          placeholder="Provide detailed analysis and reasoning..."
                          value={analysisReason}
                          onChange={(e) => setAnalysisReason(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="conditions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Approval Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {conditions.map((condition, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="Enter condition..."
                              value={condition}
                              onChange={(e) => updateCondition(index, e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeCondition(index)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" onClick={addCondition}>
                          Add Condition
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAnalysisModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  Reject Application
                </Button>
                <Button variant="secondary" onClick={handleRefer}>
                  Refer to Committee
                </Button>
                <Button onClick={handleApprove}>
                  Approve with Conditions
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}