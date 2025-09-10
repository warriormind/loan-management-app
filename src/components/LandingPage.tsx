import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Banknote,
  Shield,
  Users,
  TrendingUp,
  FileText,
  CreditCard,
  PiggyBank,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Banknote,
      title: 'Loan Management',
      description: 'Comprehensive loan processing, approval, and monitoring system for efficient lending operations.'
    },
    {
      icon: Users,
      title: 'Borrower Management',
      description: 'Complete borrower profiles, KYC verification, and credit assessment tools.'
    },
    {
      icon: CreditCard,
      title: 'Repayment Tracking',
      description: 'Automated repayment scheduling, payment processing, and delinquency management.'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Advanced credit scoring, risk analysis, and collateral management features.'
    },
    {
      icon: PiggyBank,
      title: 'Savings Management',
      description: 'Savings account management with interest calculations and withdrawal tracking.'
    },
    {
      icon: BarChart3,
      title: 'Financial Reporting',
      description: 'Comprehensive reports, analytics, and financial statements for informed decision making.'
    }
  ];

  const benefits = [
    'Streamlined loan application process',
    'Real-time portfolio monitoring',
    'Automated repayment scheduling',
    'Advanced risk assessment tools',
    'Comprehensive borrower management',
    'Detailed financial reporting'
  ];

  return (
    <div className="min-h-screen bg-[#f5f8ff] font-['Manrope']">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#dee3ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#a191f5] rounded-lg flex items-center justify-center">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LoanPro</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onGetStarted}
                className="text-[#a191f5] hover:text-[#8f7fff] hover:bg-[#f5f8ff]"
              >
                Login
              </Button>
              <Button
                onClick={onGetStarted}
                className="bg-[#a191f5] hover:bg-[#8f7fff] text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Loan Management
              <span className="text-[#a191f5]"> Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your lending operations with our comprehensive loan management system.
              From application to repayment, manage everything in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-[#a191f5] hover:bg-[#8f7fff] text-white px-8 py-3 text-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onGetStarted}
                className="border-[#a191f5] text-[#a191f5] hover:bg-[#a191f5] hover:text-white px-8 py-3 text-lg"
              >
                Login to Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Lending
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage loans efficiently and grow your lending business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-[#dee3ed] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#a191f5] rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#f5f8ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose LoanPro?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of financial institutions using our platform to streamline their lending operations and improve customer satisfaction.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#a191f5] flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg border border-[#dee3ed]">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "LoanPro has transformed our lending operations. The automation features have saved us countless hours and improved our customer experience significantly."
                </p>
                <div className="text-sm text-gray-500">
                  - Sarah Johnson, Operations Manager
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#a191f5]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Lending Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join LoanPro today and experience the future of loan management
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-white text-[#a191f5] hover:bg-gray-50 px-8 py-3 text-lg font-semibold"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#a191f5] rounded-lg flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">LoanPro</h3>
                  <p className="text-gray-400">Management System</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Modern loan management platform designed for financial institutions and lenders.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LoanPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}