import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';

interface ApprovalApplication {
  id: string;
  borrowerName: string;
  borrowerId: string;
  amount: number;
  product: string;
  submittedDate: string;
  analystRecommendation: 'approve' | 'approve_with_conditions' | 'refer_back' | 'reject';
  analystNotes: string;
  riskScore: number;
  creditScore: number;
  collateralValue?: number;
  exposureAmount: number;
  status: 'pending_approval' | 'approved' | 'rejected' | 'referred_back';
  multiSignatureRequired: boolean;
  signatures?: {
    role: string;
    signed: boolean;
    signedBy?: string;
    signedAt?: string;
  }[];
}

const mockApplications: ApprovalApplication[] = [
  {
    id: 'APP001',
    borrowerName: 'John Smith',
    borrowerId: 'B001',
    amount: 25000,
    product: 'Personal Loan',
    submittedDate: '2024-01-15',
    analystRecommendation: 'approve_with_conditions',
    analystNotes: 'Good credit history but requires additional collateral',
    riskScore: 35,
    creditScore: 720,
    collateralValue: 30000,
    exposureAmount: 25000,
    status: 'pending_approval',
    multiSignatureRequired: true,
    signatures: [
      { role: 'Branch Manager', signed: false },
      { role: 'Credit Manager', signed: true, signedBy: 'Sarah Johnson', signedAt: '2024-01-18T10:30:00Z' }
    ]
  },
  {
    id: 'APP002',
    borrowerName: 'Mary Banda',
    borrowerId: 'B002',
    amount: 150000,
    product: 'Business Loan',
    submittedDate: '2024-01-16',
    analystRecommendation: 'refer_back',
    analystNotes: 'High exposure limit exceeded, requires committee review',
    riskScore: 85,
    creditScore: 680,
    collateralValue: 200000,
    exposureAmount: 180000,
    status: 'pending_approval',
    multiSignatureRequired: true,
    signatures: [
      { role: 'Branch Manager', signed: false },
      { role: 'Credit Manager', signed: false }
    ]
  }
];

export function ApproverTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<ApprovalApplication | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [decision, setDecision] = useState<'approve' | 'approve_with_conditions' | 'refer_back' | 'reject'>('approve');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [additionalConditions, setAdditionalConditions] = useState<string[]>([]);

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.borrowerId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
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
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'referred_back': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReviewApplication = (application: ApprovalApplication) => {
    setSelectedApplication(application);
    setDecision(application.analystRecommendation);
    setApprovalNotes('');
    setAdditionalConditions([]);
    setIsApprovalModalOpen(true);
  };

  const handleDecision = () => {
    if (!selectedApplication) return;

    const approvalData = {
      decision,
      notes: approvalNotes,
      additionalConditions,
      approvedBy: 'Current User',
      approvedAt: new Date().toISOString()
    };

    console.log('Making approval decision:', selectedApplication.id, approvalData);
    alert(`Decision recorded for application ${selectedApplication.id}`);
    setIsApprovalModalOpen(false);
  };

  const addCondition = () => {
    setAdditionalConditions([...additionalConditions, '']);
  };

  const updateCondition = (index: number, value: string) => {
    const newConditions = [...additionalConditions];
    newConditions[index] = value;
    setAdditionalConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    setAdditionalConditions(additionalConditions.filter((_, i) => i !== index));
  };

  const stats = {
    pending: mockApplications.filter(a => a.status === 'pending_approval').length,
    approved: mockApplications.filter(a => a.status === 'approved').length,
    highValue: mockApplications.filter(a => a.amount > 100000).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-semibold">{stats.pending}</p>
              </div>
              <FileText className="w-8 h-8 text-yellow-600" />
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
                <p className="text-sm text-muted-foreground">High Value Applications</p>
                <p className="text-2xl font-semibold">{stats.highValue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Queue */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Approval Queue</CardTitle>
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
                  <TableHead>Analyst Recommendation</TableHead>
                  <TableHead>Risk Score</TableHead>
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
                      <Badge className={
                        application.analystRecommendation === 'approve' ? 'bg-green-100 text-green-800' :
                        application.analystRecommendation === 'approve_with_conditions' ? 'bg-blue-100 text-blue-800' :
                        application.analystRecommendation === 'refer_back' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {application.analystRecommendation.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{application.riskScore}%</TableCell>
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
                        onClick={() => handleReviewApplication(application)}
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

      {/* Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Application - {selectedApplication?.id}</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Application Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Score</p>
                        <p className="text-lg font-semibold">{selectedApplication.riskScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-teal-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Collateral</p>
                        <p className="text-lg font-semibold">
                          {selectedApplication.collateralValue ? formatCurrency(selectedApplication.collateralValue) : 'None'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analyst Recommendation */}
              <Card>
                <CardHeader>
                  <CardTitle>Credit Analyst Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge className={
                        selectedApplication.analystRecommendation === 'approve' ? 'bg-green-100 text-green-800' :
                        selectedApplication.analystRecommendation === 'approve_with_conditions' ? 'bg-blue-100 text-blue-800' :
                        selectedApplication.analystRecommendation === 'refer_back' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {selectedApplication.analystRecommendation.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Risk Score: {selectedApplication.riskScore}% | Credit Score: {selectedApplication.creditScore}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Analyst Notes:</h4>
                      <p className="text-sm text-muted-foreground">{selectedApplication.analystNotes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Multi-Signature Status */}
              {selectedApplication.multiSignatureRequired && (
                <Card>
                  <CardHeader>
                    <CardTitle>Multi-Signature Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedApplication.signatures?.map((signature, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {signature.signed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            )}
                            <div>
                              <p className="font-medium">{signature.role}</p>
                              {signature.signed && signature.signedBy && (
                                <p className="text-sm text-muted-foreground">
                                  Signed by {signature.signedBy} on {formatDate(signature.signedAt || '')}
                                </p>
                              )}
                            </div>
                          </div>
                          {!signature.signed && (
                            <Button size="sm">
                              Sign Digitally
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Decision Making */}
              <Card>
                <CardHeader>
                  <CardTitle>Approval Decision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="decision">Decision</Label>
                    <Select value={decision} onValueChange={(value: any) => setDecision(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Approve</SelectItem>
                        <SelectItem value="approve_with_conditions">Approve with Conditions</SelectItem>
                        <SelectItem value="refer_back">Refer Back</SelectItem>
                        <SelectItem value="reject">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Approval Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Provide detailed reasoning for your decision..."
                      value={approvalNotes}
                      onChange={(e) => setApprovalNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {(decision === 'approve_with_conditions' || selectedApplication.analystRecommendation === 'approve_with_conditions') && (
                    <div>
                      <Label>Additional Conditions</Label>
                      <div className="space-y-2 mt-2">
                        {additionalConditions.map((condition, index) => (
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
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDecision}>
                  {decision === 'reject' ? 'Reject Application' :
                   decision === 'refer_back' ? 'Refer Back' :
                   'Approve Application'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}