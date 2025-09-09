import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Upload,
  FileText,
  Camera,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  User,
  Home,
  DollarSign,
  Database,
  Eye,
  Download
} from 'lucide-react';

const kycDocuments = [
  {
    id: 'national_id',
    title: 'National ID',
    description: 'Upload a clear photo of your National ID card',
    icon: User,
    required: true,
    status: 'pending',
    uploaded: false
  },
  {
    id: 'photo',
    title: 'Passport Photo',
    description: 'Upload a recent passport-sized photo',
    icon: Camera,
    required: true,
    status: 'pending',
    uploaded: false
  },
  {
    id: 'proof_income',
    title: 'Proof of Income',
    description: 'Upload payslip, bank statement, or employment letter',
    icon: DollarSign,
    required: true,
    status: 'pending',
    uploaded: false
  },
  {
    id: 'proof_residence',
    title: 'Proof of Residence',
    description: 'Upload utility bill or lease agreement',
    icon: Home,
    required: true,
    status: 'pending',
    uploaded: false
  }
];

const verificationSteps = [
  { id: 'document_upload', title: 'Document Upload', status: 'completed', progress: 100 },
  { id: 'manual_review', title: 'Manual Review', status: 'in_progress', progress: 60 },
  { id: 'database_check', title: 'Database Verification', status: 'pending', progress: 0 },
  { id: 'final_approval', title: 'Final Approval', status: 'pending', progress: 0 }
];

export function KYCVerification() {
  const [documents, setDocuments] = useState(kycDocuments);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (documentId: string, file: File) => {
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setDocuments(prev => prev.map(doc =>
        doc.id === documentId
          ? { ...doc, status: 'uploaded', uploaded: true }
          : doc
      ));
      setIsUploading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'uploaded': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'uploaded': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const overallProgress = Math.round(
    (documents.filter(doc => doc.uploaded).length / documents.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">KYC & Identity Verification</h1>
            <p className="text-blue-100 mt-1">Complete your verification to access loan services</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Overall Progress</p>
            <p className="text-3xl font-bold">{overallProgress}%</p>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={overallProgress} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Verification Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Verification Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {verificationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : step.status === 'in_progress' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.title}</p>
                  <Progress value={step.progress} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document List */}
        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => {
                const IconComponent = doc.icon;
                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedDocument(doc.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        doc.uploaded ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upload Interface */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDocument
                ? documents.find(d => d.id === selectedDocument)?.title
                : 'Select a Document'
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDocument ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload {documents.find(d => d.id === selectedDocument)?.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your file here, or click to browse
                  </p>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && selectedDocument) {
                          handleFileUpload(selectedDocument, file);
                        }
                      }}
                    />
                    <Label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer" disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Choose File'}
                      </Button>
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                  </p>
                </div>

                {/* Document Preview */}
                {documents.find(d => d.id === selectedDocument)?.uploaded && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Document Uploaded Successfully</p>
                        <p className="text-sm text-green-600">File is being processed for verification</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Document to Upload
                </h3>
                <p className="text-gray-600">
                  Choose a document from the list to begin the upload process
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Database Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Government Database Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">National ID Database</p>
                <p className="text-sm text-muted-foreground">Verification in progress</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Credit Bureau Check</p>
                <p className="text-sm text-muted-foreground">Completed successfully</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Address Verification</p>
                <p className="text-sm text-muted-foreground">Pending review</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Need help? Contact our support team for assistance with document verification.
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Guidelines
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>
    </div>
  );
}