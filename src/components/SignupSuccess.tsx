import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  User,
  Shield,
  CreditCard,
  TrendingUp,
  Home,
  Settings,
  Bell
} from 'lucide-react';

interface SignupSuccessProps {
  userData: any;
  onStartTutorial: () => void;
  onGoToDashboard: () => void;
}

export function SignupSuccess({ userData, onStartTutorial, onGoToDashboard }: SignupSuccessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const welcomeSteps = [
    {
      icon: User,
      title: "Welcome to LoanPro!",
      description: `Hi ${userData.firstName}! Your account has been created successfully.`,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Account Verified",
      description: "Your identity and documents have been verified. You're all set!",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: CreditCard,
      title: "Ready for Loans",
      description: "You can now apply for loans, check your credit score, and manage repayments.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    setShowConfetti(true);

    // Auto-advance through welcome steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < welcomeSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentWelcomeStep = welcomeSteps[currentStep];
  const IconComponent = currentWelcomeStep.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <Card className="w-full max-w-2xl glass shadow-glow-lg relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-glow animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <CardTitle className="text-3xl font-bold text-gradient mb-2">
            Account Created Successfully!
          </CardTitle>

          <Badge variant="outline" className="glass text-white border-white/30">
            Welcome to LoanPro
          </Badge>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Welcome Steps */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-r ${currentWelcomeStep.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow transition-all duration-500`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{currentWelcomeStep.title}</h3>
            <p className="text-white/80">{currentWelcomeStep.description}</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <Progress value={((currentStep + 1) / welcomeSteps.length) * 100} className="w-full h-2" />
            <p className="text-center text-sm text-white/60 mt-2">
              Step {currentStep + 1} of {welcomeSteps.length}
            </p>
          </div>

          {/* Account Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60">Full Name</p>
                <p className="text-white font-medium">{userData.firstName} {userData.lastName}</p>
              </div>
              <div>
                <p className="text-white/60">Email</p>
                <p className="text-white font-medium">{userData.email}</p>
              </div>
              <div>
                <p className="text-white/60">Account Type</p>
                <p className="text-white font-medium">Personal Banking</p>
              </div>
              <div>
                <p className="text-white/60">Status</p>
                <Badge className="bg-green-500 text-white">Verified</Badge>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-white/80">Apply for Loan</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-white/80">Check Credit</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <Home className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-white/80">My Loans</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <Settings className="w-8 h-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-white/80">Settings</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onStartTutorial}
              className="flex-1 btn-modern py-3 hover-bounce transition-all group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Start Guided Tour
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={onGoToDashboard}
              variant="outline"
              className="flex-1 glass border-white/30 text-white hover:bg-white/10 py-3 hover-scale transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-sm text-white/60">
              Need help? Our support team is here 24/7
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-0 h-auto">
                <Bell className="w-4 h-4 mr-1" />
                Enable Notifications
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}