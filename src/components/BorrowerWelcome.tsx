import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  CheckCircle,
  ArrowRight,
  User,
  CreditCard,
  TrendingUp,
  DollarSign,
  Shield,
  Star
} from 'lucide-react';

interface BorrowerWelcomeProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onContinue: () => void;
}

export function BorrowerWelcome({ userData, onContinue }: BorrowerWelcomeProps) {
  const nextSteps = [
    {
      icon: CreditCard,
      title: 'Apply for Your First Loan',
      description: 'Get pre-approved in minutes with our instant decision engine',
      action: 'Apply Now'
    },
    {
      icon: TrendingUp,
      title: 'Check Your Credit Score',
      description: 'Monitor your credit health and get personalized improvement tips',
      action: 'View Score'
    },
    {
      icon: DollarSign,
      title: 'Set Up Payment Methods',
      description: 'Add bank accounts and mobile money for easy repayments',
      action: 'Add Payment'
    },
    {
      icon: Shield,
      title: 'Complete Your Profile',
      description: 'Add more details to unlock better loan offers and rates',
      action: 'Update Profile'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to LoanPro, {userData.firstName}! 🎉
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Your account has been successfully created. You're now ready to start your financial journey with us.
          </p>
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
            Account Verified ✓
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Account Summary */}
        <Card className="mb-12 bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h3>
                  <p className="text-blue-100">{userData.email}</p>
                  <p className="text-sm text-blue-100 mt-1">Member since today</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">720</div>
                <div className="text-blue-100">Credit Score</div>
                <Badge className="bg-white/20 text-white mt-2">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What's Next?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your account is ready! Here are some recommended next steps to get the most out of LoanPro.
          </p>
        </div>

        {/* Next Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {nextSteps.map((step, index) => (
            <Card key={index} className="group relative bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">{step.description}</p>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onContinue}
                >
                  {step.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { value: '0', label: 'Active Loans', icon: CreditCard },
            { value: 'K0', label: 'Outstanding Balance', icon: DollarSign },
            { value: '720', label: 'Credit Score', icon: TrendingUp },
            { value: '100%', label: 'Profile Complete', icon: CheckCircle }
          ].map((stat, index) => (
            <Card key={index} className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Explore your dashboard to apply for loans, track your credit score, and manage your payments.
                Our team is here to help you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={onContinue}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Licensed & Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-green-500" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}