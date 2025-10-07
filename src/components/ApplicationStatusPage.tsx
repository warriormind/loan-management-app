import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  Upload,
  FileText,
  Calendar,
  Phone,
  Mail,
  Edit,
  X,
  Send
} from 'lucide-react';

interface ApplicationStatus {
  id: string;
  status: 'draft' | 'submitted' | 'under_review' | 'pending_docs' | 'approved' | 'rejected';
  submittedDate: string;
  lastUpdated: string;
  assignedOfficer?: {
    name: string;
    phone: string;
    email: string;
  };
  timeline: {
    date: string;
    status: string;
    description: string;
    officer?: string;
  }[];
  requiredActions: {
    id: string;
    type: 'upload' | 'verify' | 'sign';
    description: string;
    deadline?: string;
    completed: boolean;
  }[];
  messages: {
    id: string;
    from: string;
    message: string;
    date: string;
    type: 'officer' | 'borrower';
  }[];
  product: string;
  amount: number;
  term: number;
}

const mockApplication: ApplicationStatus = {
  id: 'APP001',
  status: 'under_review',
  submittedDate: '2024-01-15T10:30:00Z',
  lastUpdated: '2024-01-18T14:20:00Z',
  assignedOfficer: {
    name: 'Sarah Johnson',
    phone: '+260 955 123 456',
    email: 'sarah.johnson@loanpro.com'
  },
  timeline: [
    {
      date: '2024-01-15T10:30:00Z',
      status: 'submitted',
      description: 'Application submitted successfully',
      officer: 'System'
    },
    {
      date: '2024-01-16T09:15:00Z',
      status: 'under_review',
      description: 'Application assigned to credit officer',
      officer: 'Sarah Johnson'
    },
    {
      date: '2024-01-17T11:45:00Z',
      status: 'pending_docs',
      description: 'Additional documents requested',
      officer: 'Sarah Johnson'
    },
    {
      date: '2024-01-18T14:20:00Z',
      status: 'under_review',
      description: 'Documents received, back under review',
      officer: 'Sarah Johnson'
    }
  ],
  requiredActions: [
    {
      id: 'doc1',
      type: 'upload',
      description: 'Upload latest bank statement',
      deadline: '2024-01-25',
      completed: false
    },
    {
      id: 'doc2',
      type: 'upload',
      description: 'Upload salary slip for December 2023',
      deadline: '2024-01-25',
      completed: true
    },
    {
      id: 'verify',
      type: 'verify',
      description: 'Verify employment details',
      completed: false
    }
  ],
  messages: [
    {
      id: 'msg1',
      from: 'Sarah Johnson',
      message: 'Thank you for your loan application. We have received all required documents and your application is now under review.',
      date: '2024-01-16T09:15:00Z',
      type: 'officer'
    },
    {
      id: 'msg2',
      from: 'Sarah Johnson',
      message: 'Please upload your latest bank statement to complete the verification process.',
      date: '2024-01-17T11:45:00Z',
      type: 'officer'
    },
    {
      id: 'msg3',
      from: 'John Smith',
      message: 'I have uploaded the requested bank statement. Please let me know if you need anything else.',
      date: '2024-01-18T10:30:00Z',
      type: 'borrower'
    }
  ],
  product: 'Personal Loan',
  amount: 25000,
  term: 24
};

interface ApplicationStatusPageProps {
  applicationId?: string;
}

export function ApplicationStatusPage({ applicationId }: ApplicationStatusPageProps) {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const application = mockApplication; // In real app, fetch by applicationId

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Lusaka'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'pending_docs': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'pending_docs': return <AlertCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'draft': return 10;
      case 'submitted': return 25;
      case 'under_review': return 50;
      case 'pending_docs': return 75;
      case 'approved': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
      setIsMessageDialogOpen(false);
    }
  };

  const handleUploadDocument = (actionId: string) => {
    // Handle document upload
    console.log('Uploading document for action:', actionId);
    setIsUploadDialogOpen(false);
  };

  const handleWithdrawApplication = () => {
    if (confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      // Handle withdrawal
      console.log('Withdrawing application');
    }
  };

  return (
    <div className="space-y-6">
      {/* Application Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Application {application.id}
                <Badge className={getStatusColor(application.status)}>
                  {getStatusIcon(application.status)}
                  {application.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Submitted on {formatDate(application.submittedDate)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatCurrency(application.amount)}</p>
              <p className="text-sm text-muted-foreground">{application.product}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Application Progress</span>
              <span>{getProgressValue(application.status)}%</span>
            </div>
            <Progress value={getProgressValue(application.status)} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {getStatusIcon(event.status)}
                      </div>
                      {index < application.timeline.length - 1 && (
                        <div className="w-px h-8 bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.description}</h4>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      {event.officer && (
                        <p className="text-sm text-muted-foreground">By: {event.officer}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Officer & Actions */}
        <div className="space-y-6">
          {/* Assigned Officer */}
          {application.assignedOfficer && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Assigned Officer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{application.assignedOfficer.name}</p>
                  <p className="text-sm text-muted-foreground">Credit Officer</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {application.assignedOfficer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {application.assignedOfficer.email}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsMessageDialogOpen(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Required Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Required Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.requiredActions.map((action) => (
                  <div key={action.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      action.completed ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {action.completed ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{action.description}</p>
                      {action.deadline && (
                        <p className="text-xs text-muted-foreground">
                          Due: {formatDate(action.deadline)}
                        </p>
                      )}
                    </div>
                    {!action.completed && action.type === 'upload' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsUploadDialogOpen(true)}
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {application.status === 'draft' && (
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Draft
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsUploadDialogOpen(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
              {['draft', 'submitted', 'pending_docs'].includes(application.status) && (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleWithdrawApplication}
                >
                  <X className="w-4 h-4 mr-2" />
                  Withdraw Application
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Messages & Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {application.messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'borrower' ? 'justify-end' : ''}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.type === 'officer'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{message.from}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(message.date)}
                    </span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(true)}
              className="w-full"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send New Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="document">Select Document</Label>
              <Input id="document" type="file" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input id="description" placeholder="Brief description of the document" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUploadDocument('')}>
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}