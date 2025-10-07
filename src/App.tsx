import React, { useState } from 'react';
import { BorrowerFlow } from './components/BorrowerFlow';
import { AuthWrapper } from './components/AuthWrapper';
import { LoanProApp } from './components/LoanProApp';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

export default function App() {
  const [userType, setUserType] = useState<'borrower' | 'lender' | null>(null);

  // Check URL parameters or local storage to determine user type
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type === 'lender') {
      setUserType('lender');
    } else if (type === 'borrower') {
      setUserType('borrower');
    }
  }, []);

  if (userType === 'lender') {
    return (
      <AuthWrapper>
        <LoanProApp />
      </AuthWrapper>
    );
  }

  if (userType === 'borrower') {
    return <BorrowerFlow />;
  }

  // Landing page selector
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-4xl">🏦</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">LoanPro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose how you'd like to access our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Borrower</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Apply for loans, track your credit score, and manage payments with ease.
            </p>
            <Button
              onClick={() => setUserType('borrower')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Start Borrowing
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Lender</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Access the management dashboard for loan processing and analytics.
            </p>
            <Button
              onClick={() => setUserType('lender')}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 hover:text-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Lender Dashboard
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2">
            🔒 Licensed & Regulated in Zambia
          </Badge>
        </div>
      </div>
    </div>
  );
}