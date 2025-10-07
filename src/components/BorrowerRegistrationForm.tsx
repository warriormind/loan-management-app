import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  Upload,
  Camera,
  FileText,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  User,
  CreditCard,
  DollarSign,
  Shield
} from 'lucide-react';

interface BorrowerRegistrationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;

  // Address Information
  address: string;
  city: string;
  province: string;

  // Employment Information
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  monthlyIncome: string;

  // Documents
  nrcFront: File | null;
  nrcBack: File | null;
  selfie: File | null;
  payslip1: File | null;
  payslip2: File | null;

  // Agreements
  termsAccepted: boolean;
  privacyAccepted: boolean;
  creditCheckConsent: boolean;
}

interface BorrowerRegistrationFormProps {
  onSubmit: (data: BorrowerRegistrationData) => void;
  onBack: () => void;
}

export function BorrowerRegistrationForm({ onSubmit, onBack }: BorrowerRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BorrowerRegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationality: 'Zambian',
    address: '',
    city: '',
    province: '',
    employmentStatus: '',
    employerName: '',
    jobTitle: '',
    monthlyIncome: '',
    nrcFront: null,
    nrcBack: null,
    selfie: null,
    payslip1: null,
    payslip2: null,
    termsAccepted: false,
    privacyAccepted: false,
    creditCheckConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.province) newErrors.province = 'Province is required';
    }

    if (step === 3) {
      if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
      if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = 'Monthly income is required';
    }

    if (step === 4) {
      if (!formData.nrcFront) newErrors.nrcFront = 'NRC front image is required';
      if (!formData.nrcBack) newErrors.nrcBack = 'NRC back image is required';
      if (!formData.selfie) newErrors.selfie = 'Selfie is required';
      if (!formData.payslip1) newErrors.payslip1 = 'First payslip is required';
      if (!formData.payslip2) newErrors.payslip2 = 'Second payslip is required';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
      if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy';
      if (!formData.creditCheckConsent) newErrors.creditCheckConsent = 'Credit check consent is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    if (file && !['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(file.type)) {
      setErrors(prev => ({ ...prev, [field]: 'Please upload a valid image or PDF file' }));
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({ ...prev, [field]: 'File size must be less than 5MB' }));
      return;
    }
    handleInputChange(field, file);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Registration</h2>
        <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
      </div>
      <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Personal Info</span>
        <span>Address</span>
        <span>Employment</span>
        <span>Documents</span>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={errors.dateOfBirth ? 'border-red-500' : ''}
                  />
                  {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your full address"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City/Town *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Province *</Label>
                  <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                    <SelectTrigger className={errors.province ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central</SelectItem>
                      <SelectItem value="copperbelt">Copperbelt</SelectItem>
                      <SelectItem value="eastern">Eastern</SelectItem>
                      <SelectItem value="luapula">Luapula</SelectItem>
                      <SelectItem value="lusaka">Lusaka</SelectItem>
                      <SelectItem value="muchinga">Muchinga</SelectItem>
                      <SelectItem value="northern">Northern</SelectItem>
                      <SelectItem value="northwestern">North-Western</SelectItem>
                      <SelectItem value="southern">Southern</SelectItem>
                      <SelectItem value="western">Western</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.province && <p className="text-sm text-red-500">{errors.province}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Employment & Income
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
                  <SelectTrigger className={errors.employmentStatus ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed (Full-time)</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="part-time">Employed (Part-time)</SelectItem>
                    <SelectItem value="contract">Contract Worker</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentStatus && <p className="text-sm text-red-500">{errors.employmentStatus}</p>}
              </div>

              {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'part-time' || formData.employmentStatus === 'contract') && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="employerName">Employer Name</Label>
                      <Input
                        id="employerName"
                        value={formData.employerName}
                        onChange={(e) => handleInputChange('employerName', e.target.value)}
                        placeholder="Enter employer name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        placeholder="Enter your job title"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income (ZMW) *</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder="Enter your monthly income"
                  className={errors.monthlyIncome ? 'border-red-500' : ''}
                />
                {errors.monthlyIncome && <p className="text-sm text-red-500">{errors.monthlyIncome}</p>}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Upload
                </CardTitle>
                <p className="text-sm text-gray-600">Please upload clear, high-quality images of your documents</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* NRC Front */}
                <div className="space-y-2">
                  <Label>National Registration Card - Front *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    {formData.nrcFront ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-green-600 font-medium">{formData.nrcFront.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('nrcFront', null)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Click to upload NRC front image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('nrcFront', e.target.files?.[0] || null)}
                          className="hidden"
                          id="nrc-front"
                        />
                        <label htmlFor="nrc-front">
                          <Button variant="outline" size="sm" asChild>
                            <span>Choose File</span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                  {errors.nrcFront && <p className="text-sm text-red-500">{errors.nrcFront}</p>}
                </div>

                {/* NRC Back */}
                <div className="space-y-2">
                  <Label>National Registration Card - Back *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    {formData.nrcBack ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-green-600 font-medium">{formData.nrcBack.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('nrcBack', null)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Click to upload NRC back image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('nrcBack', e.target.files?.[0] || null)}
                          className="hidden"
                          id="nrc-back"
                        />
                        <label htmlFor="nrc-back">
                          <Button variant="outline" size="sm" asChild>
                            <span>Choose File</span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                  {errors.nrcBack && <p className="text-sm text-red-500">{errors.nrcBack}</p>}
                </div>

                {/* Selfie */}
                <div className="space-y-2">
                  <Label>Selfie (Recent Photo) *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    {formData.selfie ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-green-600 font-medium">{formData.selfie.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('selfie', null)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Click to upload a recent selfie</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('selfie', e.target.files?.[0] || null)}
                          className="hidden"
                          id="selfie"
                        />
                        <label htmlFor="selfie">
                          <Button variant="outline" size="sm" asChild>
                            <span>Take/Choose Photo</span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                  {errors.selfie && <p className="text-sm text-red-500">{errors.selfie}</p>}
                </div>

                {/* Payslips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Latest Payslip *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      {formData.payslip1 ? (
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium text-sm">{formData.payslip1.name}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleInputChange('payslip1', null)}
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <FileText className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload('payslip1', e.target.files?.[0] || null)}
                            className="hidden"
                            id="payslip1"
                          />
                          <label htmlFor="payslip1">
                            <Button variant="outline" size="sm" asChild>
                              <span>Upload</span>
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                    {errors.payslip1 && <p className="text-sm text-red-500">{errors.payslip1}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Previous Payslip *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      {formData.payslip2 ? (
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium text-sm">{formData.payslip2.name}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleInputChange('payslip2', null)}
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <FileText className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload('payslip2', e.target.files?.[0] || null)}
                            className="hidden"
                            id="payslip2"
                          />
                          <label htmlFor="payslip2">
                            <Button variant="outline" size="sm" asChild>
                              <span>Upload</span>
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                    {errors.payslip2 && <p className="text-sm text-red-500">{errors.payslip2}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agreements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Terms & Agreements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the Terms of Service *
                    </label>
                    <p className="text-xs text-muted-foreground">
                      I agree to LoanPro's terms of service and loan agreement terms.
                    </p>
                  </div>
                </div>
                {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted}</p>}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="privacy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the Privacy Policy *
                    </label>
                    <p className="text-xs text-muted-foreground">
                      I consent to the collection and processing of my personal data.
                    </p>
                  </div>
                </div>
                {errors.privacyAccepted && <p className="text-sm text-red-500">{errors.privacyAccepted}</p>}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="credit-check"
                    checked={formData.creditCheckConsent}
                    onCheckedChange={(checked) => handleInputChange('creditCheckConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="credit-check"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I consent to credit checks *
                    </label>
                    <p className="text-xs text-muted-foreground">
                      I authorize LoanPro to perform credit checks and verify my information.
                    </p>
                  </div>
                </div>
                {errors.creditCheckConsent && <p className="text-sm text-red-500">{errors.creditCheckConsent}</p>}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderStepIndicator()}

        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onBack : handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? 'Back to Landing' : 'Previous'}
          </Button>

          <div className="flex gap-2">
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}