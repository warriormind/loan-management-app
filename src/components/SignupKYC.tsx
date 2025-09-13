import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface SignupKYCProps {
  userData: any;
  onComplete: () => void;
  onBack: () => void;
}

const kycSteps = [
  {
    id: 'identity',
    title: 'Identity Verification',
    description: 'Upload your government-issued ID',
    icon: User,
    required: true,
    documents: ['national_id', 'passport_photo']
  },
  {
    id: 'address',
    title: 'Address Verification',
    description: 'Prove your residential address',
    icon: Home,
    required: true,
    documents: ['utility_bill', 'lease_agreement']
  },
  {
    id: 'income',
    title: 'Income Verification',
    description: 'Verify your income source',
    icon: DollarSign,
    required: true,
    documents: ['pay_stub', 'bank_statement']
  }
];

export function SignupKYC({ userData, onComplete, onBack }: SignupKYCProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'processing' | 'completed'>('pending');

  const currentStepData = kycSteps[currentStep];
  const totalSteps = kycSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleFileUpload = (documentType: string, file: File) => {
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setUploadedFiles(prev => ({ ...prev, [documentType]: file }));
      setIsUploading(false);
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Start verification process
      setVerificationStatus('processing');
      setTimeout(() => {
        setVerificationStatus('completed');
        setTimeout(() => {
          onComplete();
        }, 2000);
      }, 3000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderDocumentUpload = (documentType: string, label: string) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        {uploadedFiles[documentType] ? (
          <div className="space-y-3">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
            <p className="text-sm font-medium text-green-700">
              {uploadedFiles[documentType]?.name}
            </p>
            <p className="text-xs text-gray-500">File uploaded successfully</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <div>
              <Label htmlFor={`file-${documentType}`} className="cursor-pointer">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Click to upload
                </span>
                <Input
                  id={`file-${documentType}`}
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(documentType, file);
                    }
                  }}
                  disabled={isUploading}
                />
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (verificationStatus === 'processing') {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-4">Verifying Your Documents</h3>
          <p className="text-gray-600 mb-8">Please wait while we process your information...</p>
          <div className="space-y-4">
            <Progress value={75} className="w-full max-w-md mx-auto" />
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Documents uploaded
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Verification in progress
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'completed') {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-4">Verification Complete!</h3>
          <p className="text-gray-600 mb-8">Your documents have been successfully verified.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-green-800">
              ✅ All required documents verified<br/>
              ✅ Identity confirmed<br/>
              ✅ Address verified<br/>
              ✅ Ready to proceed
            </p>
          </div>
        </div>
      );
    }

    const IconComponent = currentStepData.icon;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${currentStep === 0 ? 'from-blue-500 to-cyan-500' : currentStep === 1 ? 'from-purple-500 to-pink-500' : 'from-orange-500 to-red-500'} rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-2">{currentStepData.title}</h3>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>

        <div className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              {renderDocumentUpload('national_id', 'National ID / Passport')}
              {renderDocumentUpload('passport_photo', 'Passport-sized Photo')}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              {renderDocumentUpload('utility_bill', 'Utility Bill (Last 3 months)')}
              {renderDocumentUpload('lease_agreement', 'Lease Agreement or Property Deed')}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {renderDocumentUpload('pay_stub', 'Recent Pay Stub')}
              {renderDocumentUpload('bank_statement', 'Bank Statement (Last 3 months)')}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Secure & Private</h4>
              <p className="text-sm text-blue-700">
                Your documents are encrypted and stored securely. We comply with all data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {kycSteps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            index < currentStep
              ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-glow'
              : index === currentStep
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-glow'
              : 'bg-gray-200 text-gray-500'
          }`}>
            {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
              index < currentStep ? 'bg-gradient-to-r from-green-500 to-teal-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass shadow-glow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover-scale transition-transform"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge variant="outline" className="glass">
              KYC Verification
            </Badge>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-gray-600">
              {verificationStatus === 'pending'
                ? `Step ${currentStep + 1} of ${totalSteps}`
                : verificationStatus === 'processing'
                ? 'Processing...'
                : 'Complete!'
              }
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {verificationStatus === 'pending' && renderStepIndicator()}
          {renderStepContent()}

          {verificationStatus === 'pending' && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="glass hover-scale transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={isUploading}
                className="btn-modern px-8 hover-bounce transition-all"
              >
                {currentStep === totalSteps - 1 ? 'Complete Verification' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}