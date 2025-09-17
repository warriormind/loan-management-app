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

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

interface LandingPageProps {
  onGetStarted: (data: SignupFormData) => void;
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
    setFormData((prev: SignupFormData) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [field]: '' }));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Banknote className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">LoanPro</span>
                <p className="text-xs text-gray-500 -mt-1">Financial Solutions</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onLogin} className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium">
                Sign In
              </Button>
              <Button
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 px-4 py-2 text-sm font-medium border-0 shadow-sm">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ Financial Professionals
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              The most advanced loan management platform designed for modern financial institutions.
              Streamline operations, enhance decision-making, and deliver exceptional customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onLogin}
                className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Sign In to Dashboard
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-500" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                  <div className="mt-2 w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Enterprise-Grade Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Loan Management Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transform your lending operations with our comprehensive suite of tools designed
              for modern financial institutions. From automated underwriting to portfolio analytics,
              we provide everything you need to scale efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group relative bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10 pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
                  <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-8 text-lg">Trusted by leading financial institutions worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">BANK OF AMERICA</div>
              <div className="text-2xl font-bold text-gray-400">JPMORGAN CHASE</div>
              <div className="text-2xl font-bold text-gray-400">WELLS FARGO</div>
              <div className="text-2xl font-bold text-gray-400">CITIGROUP</div>
              <div className="text-2xl font-bold text-gray-400">GOLDMAN SACHS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Why Choose LoanPro
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Features for Modern Lending
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of financial institutions worldwide who trust our platform
              to streamline their lending operations and deliver exceptional customer experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              {[
                {
                  icon: Zap,
                  title: 'AI-Powered Underwriting',
                  description: 'Instant loan pre-approval with advanced machine learning algorithms that analyze thousands of data points in seconds.'
                },
                {
                  icon: TrendingUp,
                  title: 'Real-Time Analytics',
                  description: 'Comprehensive dashboards with live portfolio performance, risk metrics, and predictive insights for data-driven decisions.'
                },
                {
                  icon: Shield,
                  title: 'Bank-Level Security',
                  description: 'Military-grade encryption, biometric authentication, and compliance with global financial regulations.'
                },
                {
                  icon: Users,
                  title: 'Multi-User Collaboration',
                  description: 'Seamless collaboration between loan officers, underwriters, and compliance teams with role-based access control.'
                },
                {
                  icon: Calculator,
                  title: 'Automated Workflows',
                  description: 'Streamlined processes from application to disbursement with intelligent automation and smart notifications.'
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Reporting',
                  description: 'Customizable reports, regulatory compliance documentation, and executive dashboards for strategic planning.'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              {/* Feature Showcase Cards */}
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-700">2024 Winner</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Best FinTech Platform</h3>
                    <p className="text-gray-600 mb-4">Recognized by Global Finance Magazine for innovation in lending technology</p>
                    <div className="flex items-center text-green-600 font-semibold">
                      <Star className="w-5 h-5 mr-2 fill-current" />
                      <span>4.9/5 Customer Rating</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Certified</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">ISO 27001 & SOC 2</h3>
                    <p className="text-gray-600 mb-4">Certified for information security and data protection standards</p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Bank-Level Security</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              What Our Clients Say
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how LoanPro has transformed lending operations for financial institutions worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "LoanPro has revolutionized our lending process. We've seen a 300% increase in processing speed while maintaining the highest standards of compliance.",
                author: "Sarah Johnson",
                title: "Chief Lending Officer",
                company: "First National Bank",
                avatar: "SJ"
              },
              {
                quote: "The AI-powered underwriting has reduced our default rates by 40% while increasing our approval rates. This platform pays for itself.",
                author: "Michael Chen",
                title: "VP of Risk Management",
                company: "Pacific Credit Union",
                avatar: "MC"
              },
              {
                quote: "Outstanding customer support and seamless integration. Our team was up and running in just two weeks with minimal training.",
                author: "Emily Rodriguez",
                title: "Director of Operations",
                company: "Metro Finance Group",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                      <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
      <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Banknote className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">LoanPro</span>
                    <p className="text-sm text-gray-400">Financial Solutions</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Empowering financial institutions worldwide with cutting-edge lending technology.
                  Trusted by over 10,000 professionals across 50+ countries.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">f</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">t</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">in</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">y</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Loan Management</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Credit Assessment</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Risk Analytics</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">KYC Verification</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Portfolio Management</a></li>
                </ul>
              </div>

              {/* Support */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API Documentation</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">System Status</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community Forum</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">GDPR Compliance</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>

              {/* Contact & Newsletter */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-6 text-white">Stay Updated</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Get the latest updates on new features and industry insights.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-700 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone Support</p>
                  <p className="text-white font-medium">+1 (555) 123-LOAN</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Support</p>
                  <p className="text-white font-medium">support@loanpro.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Global Headquarters</p>
                  <p className="text-white font-medium">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="border-t border-gray-700 py-8">
            <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-sm">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Target className="w-5 h-5 text-orange-400" />
                <span className="text-sm">PCI DSS Level 1</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 LoanPro. All rights reserved. Built with ❤️ for financial institutions worldwide.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Made in New York</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}