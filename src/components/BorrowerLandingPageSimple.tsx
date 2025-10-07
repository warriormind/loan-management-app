import React from 'react';
import { Button } from './ui/button';
import {
  UserPlus,
  LogIn,
  Shield,
  Award
} from 'lucide-react';

interface BorrowerLandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function BorrowerLandingPageSimple({ onGetStarted, onLogin }: BorrowerLandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">🏦</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LoanPro</h1>
          <p className="text-gray-600">Your trusted lending partner</p>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Button
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-14 text-lg font-semibold"
          >
            <UserPlus className="w-5 h-5 mr-3" />
            Register Now
          </Button>

          <Button
            onClick={onLogin}
            variant="outline"
            className="w-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 h-14 text-lg font-semibold"
          >
            <LogIn className="w-5 h-5 mr-3" />
            Login
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Licensed</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-400">
          <p>© 2024 LoanPro Zambia. Licensed & Regulated.</p>
        </div>
      </div>
    </div>
  );
}