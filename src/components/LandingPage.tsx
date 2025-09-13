import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Banknote,
  Shield,
  TrendingUp,
  Users,
  CreditCard,
  FileCheck,
  Calculator,
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Award,
  Zap,
  Heart,
  Target,
  DollarSign,
  PiggyBank,
  Receipt,
  Calendar,
  UserCheck
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onGetStarted(formData);
    }, 2000);
  };

  const services = [
    {
      icon: CreditCard,
      title: 'Loan Application & Approval',
      description: 'Streamlined application process with instant pre-approval and automated decision-making.'
    },
    {
      icon: Users,
      title: 'Borrower Dashboards',
      description: 'Comprehensive dashboards to track loan status, payments, and financial health.'
    },
    {
      icon: Shield,
      title: 'Credit Risk Analysis',
      description: 'Advanced algorithms to assess creditworthiness and minimize default risks.'
    },
    {
      icon: FileCheck,
      title: 'KYC Verification',
      description: 'Secure identity verification and document management for compliance.'
    },
    {
      icon: TrendingUp,
      title: 'Investor Management',
      description: 'Tools for investors to track portfolio performance and returns.'
    },
    {
      icon: Calculator,
      title: 'Expense Tracking',
      description: 'Detailed expense management and financial reporting capabilities.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '$50M+', label: 'Loans Disbursed' },
    { value: '99.5%', label: 'Approval Rate' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#00AEEF] rounded-lg flex items-center justify-center">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Loan Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onLogin} className="hover-scale">
                Login
              </Button>
              <Button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="btn-interactive">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00AEEF]/10 text-[#00AEEF] hover:bg-[#00AEEF]/20">
              <Zap className="w-4 h-4 mr-1" />
              Smart Lending Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Empower Your Finances with{' '}
              <span className="text-[#00AEEF]">Loan Pro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Smart Lending Solutions for Everyone – Apply for loans, manage repayments,
              track credit scores, and access powerful financial tools all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-interactive hover-lift"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onLogin}
                className="hover-scale"
              >
                Login to Account
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center card-interactive hover-lift">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-[#00AEEF] mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Loan Management Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage loans effectively – from application to repayment,
              with powerful tools for credit assessment, risk analysis, and financial planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-interactive hover-lift group">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00AEEF]/20 transition-colors">
                    <service.icon className="w-6 h-6 text-[#00AEEF]" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Loan Pro?
              </h2>
              <div className="space-y-4">
                {[
                  'Instant loan pre-approval with AI-powered decision making',
                  'Real-time credit score monitoring and improvement tips',
                  'Secure KYC verification with biometric authentication',
                  'Comprehensive borrower and investor dashboards',
                  'Automated repayment scheduling and reminders',
                  'Advanced risk assessment and portfolio management'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-interactive hover-lift">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-[#00AEEF] mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Award Winning</h3>
                  <p className="text-sm text-gray-600">Best FinTech Platform 2024</p>
                </CardContent>
              </Card>
              <Card className="card-interactive hover-lift">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-[#00AEEF] mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Bank-Level Security</h3>
                  <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                </CardContent>
              </Card>
              <Card className="card-interactive hover-lift">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-[#00AEEF] mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Customer First</h3>
                  <p className="text-sm text-gray-600">24/7 support available</p>
                </CardContent>
              </Card>
              <Card className="card-interactive hover-lift">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-[#00AEEF] mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">High Success Rate</h3>
                  <p className="text-sm text-gray-600">99.5% approval rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start Your Financial Journey Today
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of users who trust Loan Pro for their financial needs.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={errors.dateOfBirth ? 'border-red-500' : ''}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-interactive hover-lift"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Already have an account?
                </p>
                <Button variant="outline" onClick={onLogin} className="hover-scale">
                  Login Instead
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#00AEEF] rounded-lg flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Loan Pro</span>
              </div>
              <p className="text-gray-400">
                Empowering your financial future with smart lending solutions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Loan Applications</li>
                <li>Credit Assessment</li>
                <li>Risk Analysis</li>
                <li>KYC Verification</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@loanpro.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="text-center text-gray-400">
            <p>&copy; 2024 Loan Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}