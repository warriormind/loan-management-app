import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Users,
  CreditCard,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  Home,
  X,
  Play,
  SkipForward
} from 'lucide-react';

interface OnboardingTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const tutorialSteps = [
  {
    id: 'welcome',
    title: 'Welcome to LoanPro!',
    description: 'Let\'s take a quick tour of your new dashboard and show you how to make the most of our platform.',
    icon: Home,
    color: 'from-blue-500 to-cyan-500',
    highlight: null
  },
  {
    id: 'navigation',
    title: 'Navigation Sidebar',
    description: 'Use the sidebar to navigate between different sections. Each tab represents a key feature of your loan management system.',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    highlight: 'sidebar'
  },
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    description: 'Your dashboard shows key metrics, recent activities, and quick actions. Monitor your loan portfolio at a glance.',
    icon: TrendingUp,
    color: 'from-green-500 to-teal-500',
    highlight: 'dashboard'
  },
  {
    id: 'loans',
    title: 'Loan Management',
    description: 'Apply for new loans, track existing ones, and manage repayments. View detailed loan information and payment schedules.',
    icon: CreditCard,
    color: 'from-orange-500 to-red-500',
    highlight: 'loans'
  },
  {
    id: 'reports',
    title: 'Financial Reports',
    description: 'Generate comprehensive reports on your loan performance, payments, and financial health.',
    icon: FileText,
    color: 'from-indigo-500 to-purple-500',
    highlight: 'reports'
  },
  {
    id: 'settings',
    title: 'Account Settings',
    description: 'Customize your profile, security settings, and notification preferences.',
    icon: Settings,
    color: 'from-yellow-500 to-orange-500',
    highlight: 'settings'
  },
  {
    id: 'support',
    title: 'Get Help',
    description: 'Our AI chatbot is available 24/7 for instant support. You can also reach our customer service team anytime.',
    icon: Bell,
    color: 'from-pink-500 to-rose-500',
    highlight: 'chatbot'
  }
];

export function OnboardingTutorial({ onComplete, onSkip }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const currentTutorialStep = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  const IconComponent = currentTutorialStep.icon;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSkip();
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Tutorial Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>

      {/* Tutorial Card */}
      <Card className="w-full max-w-2xl mx-4 glass shadow-glow-lg animate-bounce">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${currentTutorialStep.color} rounded-full flex items-center justify-center shadow-glow`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <Badge variant="outline" className="glass text-white border-white/30">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </Badge>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <CardTitle className="text-2xl font-bold text-gradient mb-2">
            {currentTutorialStep.title}
          </CardTitle>

          <Progress value={progress} className="w-full h-2 mb-4" />
        </CardHeader>

        <CardContent className="pt-0">
          <div className="text-center mb-8">
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              {currentTutorialStep.description}
            </p>

            {/* Interactive Demo Area */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${currentTutorialStep.color} rounded-full flex items-center justify-center shadow-glow animate-pulse`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>

              {currentStep === 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Account Created</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>KYC Verified</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Ready to Explore</span>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-2 text-sm text-white/80">
                  <p>🔹 Clients - Manage borrowers</p>
                  <p>🔹 Loans - Track loan applications</p>
                  <p>🔹 Repayments - Monitor payments</p>
                  <p>🔹 Reports - Generate insights</p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 rounded p-3">
                    <p className="text-white font-medium">Active Loans</p>
                    <p className="text-2xl font-bold text-blue-400">12</p>
                  </div>
                  <div className="bg-white/10 rounded p-3">
                    <p className="text-white font-medium">Total Portfolio</p>
                    <p className="text-2xl font-bold text-green-400">$45K</p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-2 text-sm text-white/80">
                  <p>💰 Apply for personal/business loans</p>
                  <p>📊 Track repayment schedules</p>
                  <p>📱 Mobile payment integration</p>
                  <p>🔒 Secure transaction processing</p>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-2 text-sm text-white/80">
                  <p>📈 Portfolio performance reports</p>
                  <p>💳 Payment history analytics</p>
                  <p>📊 Risk assessment insights</p>
                  <p>📅 Financial forecasting</p>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-2 text-sm text-white/80">
                  <p>👤 Profile management</p>
                  <p>🔐 Security preferences</p>
                  <p>🔔 Notification settings</p>
                  <p>🎨 Theme customization</p>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-2 text-sm text-white/80">
                  <p>🤖 AI-powered chatbot</p>
                  <p>📞 24/7 customer support</p>
                  <p>📚 Help documentation</p>
                  <p>💬 Live chat assistance</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="glass border-white/30 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Skip Tour
              </Button>
            </div>

            <Button
              onClick={handleNext}
              className="btn-modern hover-bounce transition-all group"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-white shadow-glow'
                    : index < currentStep
                    ? 'bg-white/60'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Floating Tips */}
      {currentStep > 0 && (
        <div className="absolute bottom-4 left-4 max-w-xs">
          <div className="glass rounded-lg p-3 border border-white/20 shadow-glow">
            <p className="text-sm text-white/90">
              💡 <strong>Pro Tip:</strong> You can always restart this tutorial from your settings page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}