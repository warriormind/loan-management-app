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
      description: 'Comprehensive loan processing, approval, and monitoring system for efficient lending operations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Complete client profiles, KYC verification, and credit assessment tools.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: CreditCard,
      title: 'Repayment Tracking',
      description: 'Automated repayment scheduling, payment processing, and delinquency management.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Advanced credit scoring, risk analysis, and collateral management features.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: PiggyBank,
      title: 'Savings Management',
      description: 'Savings account management with interest calculations and withdrawal tracking.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Financial Reporting',
      description: 'Comprehensive reports, analytics, and financial statements for informed decision making.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const benefits = [
    'Streamlined loan application process',
    'Real-time portfolio monitoring',
    'Automated repayment scheduling',
    'Advanced risk assessment tools',
    'Comprehensive client management',
    'Detailed financial reporting'
  ];

  return (
    <div className="min-h-screen font-['Manrope'] relative overflow-x-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent z-0"></div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Banknote className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">LoanPro</h1>
                <p className="text-sm text-white/90 drop-shadow">Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onGetStarted}
                className="text-white hover:text-cyan-300 hover:bg-white/10 backdrop-blur-sm border border-white/20"
              >
                Login
              </Button>
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                🚀 Transform Your Lending Business
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 drop-shadow-2xl leading-tight">
              Modern Loan Management
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto drop-shadow-lg leading-relaxed px-2">
              Streamline your lending operations with our comprehensive loan management system.
              From application to repayment, manage everything in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onGetStarted}
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-semibold shadow-xl w-full sm:w-auto"
              >
                Login to Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 sm:py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
              Powerful Features for Modern Lending
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg px-2">
              Everything you need to manage loans efficiently and grow your lending business
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 sm:p-8">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed drop-shadow text-sm sm:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-16 sm:py-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 drop-shadow-2xl">
                Why Choose LoanPro?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-10 drop-shadow-lg leading-relaxed">
                Join thousands of financial institutions using our platform to streamline their lending operations and improve customer satisfaction.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-white text-base sm:text-lg drop-shadow">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/20">
              <div className="text-center">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current drop-shadow-lg" />
                  ))}
                </div>
                <p className="text-white/90 italic text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed drop-shadow">
                  "LoanPro has transformed our lending operations. The automation features have saved us countless hours and improved our customer experience significantly."
                </p>
                <div className="text-white/70 font-medium drop-shadow text-sm sm:text-base">
                  - Sarah Johnson, Operations Manager
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-24 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">
              ✨ Start Your Journey Today
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 drop-shadow-2xl leading-tight">
            Ready to Transform Your Lending Business?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 drop-shadow-lg max-w-3xl mx-auto leading-relaxed px-2">
            Join LoanPro today and experience the future of client management with our cutting-edge platform
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-50 px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-white/25 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Banknote className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">LoanPro</h3>
                  <p className="text-white/70 text-sm sm:text-base">Management System</p>
                </div>
              </div>
              <p className="text-white/80 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                Modern loan management platform designed for financial institutions and lenders.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-white">Product</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors text-sm sm:text-lg">Features</a></li>
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors text-sm sm:text-lg">Pricing</a></li>
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors text-sm sm:text-lg">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-white">Support</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors text-sm sm:text-lg">Documentation</a></li>
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors text-sm sm:text-lg">Contact</a></li>
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors text-sm sm:text-lg">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-white/60 text-base sm:text-lg">&copy; 2024 LoanPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}