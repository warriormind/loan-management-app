import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Banknote,
  Shield,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  DollarSign,
  Smartphone,
  Clock,
  Award,
  Heart,
  Target,
  Zap
} from 'lucide-react';

interface BorrowerLandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function BorrowerLandingPage({ onGetStarted, onLogin }: BorrowerLandingPageProps) {
  const features = [
    {
      icon: CreditCard,
      title: 'Easy Loan Applications',
      description: 'Apply for loans in minutes with our streamlined digital process'
    },
    {
      icon: TrendingUp,
      title: 'Track Your Credit Score',
      description: 'Monitor your credit health and get personalized improvement tips'
    },
    {
      icon: DollarSign,
      title: 'Flexible Payments',
      description: 'Pay via bank transfer, mobile money, or card with auto-payment options'
    },
    {
      icon: Shield,
      title: 'Secure & Protected',
      description: 'Bank-level security with full data encryption and privacy protection'
    },
    {
      icon: Clock,
      title: 'Quick Approvals',
      description: 'Get loan decisions in as little as 24 hours with instant pre-approvals'
    },
    {
      icon: Users,
      title: 'Personal Support',
      description: 'Dedicated loan officers to guide you through every step'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Happy Borrowers' },
    { value: 'K500M+', label: 'Loans Disbursed' },
    { value: '24hrs', label: 'Average Approval' },
    { value: '4.8/5', label: 'Customer Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Banknote className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">LoanPro</span>
                <p className="text-xs text-blue-600 -mt-1 font-medium">Borrow Smart, Live Better</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onLogin} className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium">
                Sign In
              </Button>
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 hover:from-blue-200 hover:to-cyan-200 px-4 py-2 text-sm font-medium border-0 shadow-sm">
              <Star className="w-4 h-4 mr-2" />
              Zambia's #1 Digital Lending Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Your Financial Future{' '}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Get instant loan approvals, track your credit score, and manage payments all in one place.
              Join thousands of Zambians building their financial future with LoanPro.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                Start Your Application
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onLogin}
                className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Check Your Dashboard
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
                <span>Licensed & Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-500" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                  <div className="mt-2 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Why Choose LoanPro
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Smart Borrowing
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of lending with our comprehensive platform designed
              specifically for Zambian borrowers. From application to repayment, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Simple 3-Step Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your Loan in 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Apply Online',
                description: 'Upload your documents and submit your application in minutes',
                icon: CreditCard
              },
              {
                step: '02',
                title: 'Get Approved',
                description: 'Receive instant pre-approval and final decision within 24 hours',
                icon: CheckCircle
              },
              {
                step: '03',
                title: 'Receive Funds',
                description: 'Get your loan disbursed directly to your account or mobile wallet',
                icon: DollarSign
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              What Our Customers Say
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Stories from Real Borrowers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "LoanPro made getting my business loan so easy! The online application took less than 10 minutes, and I had funds in my account the next day.",
                author: "Mary Banda",
                location: "Lusaka",
                rating: 5
              },
              {
                quote: "I love being able to track my credit score and see how my payments affect it. The mobile app makes managing my loan so convenient.",
                author: "John Phiri",
                location: "Kitwe",
                rating: 5
              },
              {
                quote: "The customer support is amazing! When I had questions about my loan, they responded immediately and helped me sort everything out.",
                author: "Grace Mwale",
                location: "Ndola",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-blue-600 font-medium">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of Zambians who trust LoanPro for their borrowing needs.
            Apply today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onLogin}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Sign In to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LoanPro</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering Zambians with accessible financial solutions.
                Licensed and regulated for your peace of mind.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Personal Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Credit Building</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Loan Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licensing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 LoanPro Zambia. All rights reserved. Licensed by Bank of Zambia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}