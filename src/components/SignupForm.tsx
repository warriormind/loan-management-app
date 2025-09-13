import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

interface SignupFormProps {
  onComplete: (userData: any) => void;
  onBack: () => void;
  initialData?: Partial<UserData>;
}

interface UserData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;

  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Account Information
  password: string;
  confirmPassword: string;

  // Employment Information
  employmentStatus: string;
  monthlyIncome: string;
  employer: string;
}

export function SignupForm({ onComplete, onBack, initialData }: SignupFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: initialData?.gender || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || '',
    password: initialData?.password || '',
    confirmPassword: initialData?.confirmPassword || '',
    employmentStatus: initialData?.employmentStatus || '',
    monthlyIncome: initialData?.monthlyIncome || '',
    employer: initialData?.employer || ''
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<UserData> = {};

    switch (step) {
      case 1: // Personal Information
        if (!userData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!userData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!userData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = 'Email is invalid';
        if (!userData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!userData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!userData.gender) newErrors.gender = 'Gender is required';
        break;

      case 2: // Address Information
        if (!userData.address.trim()) newErrors.address = 'Address is required';
        if (!userData.city.trim()) newErrors.city = 'City is required';
        if (!userData.state.trim()) newErrors.state = 'State is required';
        if (!userData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!userData.country) newErrors.country = 'Country is required';
        break;

      case 3: // Account Information
        if (!userData.password) newErrors.password = 'Password is required';
        else if (userData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!userData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;

      case 4: // Employment Information
        if (!userData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
        if (!userData.monthlyIncome.trim()) newErrors.monthlyIncome = 'Monthly income is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(userData);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            i + 1 <= currentStep
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-glow'
              : 'bg-gray-200 text-gray-500'
          }`}>
            {i + 1 <= currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
              i + 1 < currentStep ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Personal Information</h3>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                <Input
                  id="firstName"
                  value={userData.firstName}
                  onChange={(e) => updateUserData('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                <Input
                  id="lastName"
                  value={userData.lastName}
                  onChange={(e) => updateUserData('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => updateUserData('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => updateUserData('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth *
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) => updateUserData('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'border-red-500' : ''}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium">Gender *</Label>
                <Select value={userData.gender} onValueChange={(value) => updateUserData('gender', value)}>
                  <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Address Information</h3>
              <p className="text-gray-600">Tell us where you're located</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">Street Address *</Label>
              <Input
                id="address"
                value={userData.address}
                onChange={(e) => updateUserData('address', e.target.value)}
                className={errors.address ? 'border-red-500' : ''}
                placeholder="Enter your street address"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                <Input
                  id="city"
                  value={userData.city}
                  onChange={(e) => updateUserData('city', e.target.value)}
                  className={errors.city ? 'border-red-500' : ''}
                  placeholder="Enter your city"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">State/Province *</Label>
                <Input
                  id="state"
                  value={userData.state}
                  onChange={(e) => updateUserData('state', e.target.value)}
                  className={errors.state ? 'border-red-500' : ''}
                  placeholder="Enter your state/province"
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sm font-medium">ZIP/Postal Code *</Label>
                <Input
                  id="zipCode"
                  value={userData.zipCode}
                  onChange={(e) => updateUserData('zipCode', e.target.value)}
                  className={errors.zipCode ? 'border-red-500' : ''}
                  placeholder="Enter your ZIP code"
                />
                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
                <Select value={userData.country} onValueChange={(value) => updateUserData('country', value)}>
                  <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="zm">Zambia</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Account Security</h3>
              <p className="text-gray-600">Create a secure password for your account</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={userData.password}
                  onChange={(e) => updateUserData('password', e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                  placeholder="Create a strong password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              <div className="text-xs text-gray-500 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li className={userData.password.length >= 8 ? 'text-green-600' : ''}>At least 8 characters</li>
                  <li className={/[A-Z]/.test(userData.password) ? 'text-green-600' : ''}>One uppercase letter</li>
                  <li className={/[a-z]/.test(userData.password) ? 'text-green-600' : ''}>One lowercase letter</li>
                  <li className={/\d/.test(userData.password) ? 'text-green-600' : ''}>One number</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={userData.confirmPassword}
                  onChange={(e) => updateUserData('confirmPassword', e.target.value)}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                  placeholder="Confirm your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Employment Information</h3>
              <p className="text-gray-600">Help us understand your financial background</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus" className="text-sm font-medium">Employment Status *</Label>
              <Select value={userData.employmentStatus} onValueChange={(value) => updateUserData('employmentStatus', value)}>
                <SelectTrigger className={errors.employmentStatus ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed Full-time</SelectItem>
                  <SelectItem value="part-time">Employed Part-time</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
              {errors.employmentStatus && <p className="text-red-500 text-sm">{errors.employmentStatus}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employer" className="text-sm font-medium">Employer/Company Name</Label>
              <Input
                id="employer"
                value={userData.employer}
                onChange={(e) => updateUserData('employer', e.target.value)}
                placeholder="Enter your employer or company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyIncome" className="text-sm font-medium">Monthly Income (USD) *</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={userData.monthlyIncome}
                onChange={(e) => updateUserData('monthlyIncome', e.target.value)}
                className={errors.monthlyIncome ? 'border-red-500' : ''}
                placeholder="Enter your monthly income"
              />
              {errors.monthlyIncome && <p className="text-red-500 text-sm">{errors.monthlyIncome}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Privacy & Security</h4>
                  <p className="text-sm text-blue-700">
                    Your information is encrypted and secure. We use industry-standard security measures to protect your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--background-color)' }}>
      <Card className="w-full max-w-2xl glass shadow-glow-lg" style={{ backgroundColor: 'var(--surface-color)', border: '1px solid color-mix(in srgb, var(--default-color), transparent 90%)' }}>
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
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {renderStepIndicator()}
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="glass hover-scale transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              className="btn-modern px-8 hover-bounce transition-all"
            >
              {currentStep === totalSteps ? 'Complete Signup' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}