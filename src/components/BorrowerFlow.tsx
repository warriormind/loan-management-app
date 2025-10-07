import React, { useState } from 'react';
import { BorrowerLandingPageSimple as BorrowerLandingPage } from './BorrowerLandingPageSimple';
import { BorrowerRegistrationForm } from './BorrowerRegistrationForm';
import { BorrowerWelcome } from './BorrowerWelcome';
import { BorrowerDashboardNew } from './BorrowerDashboardNew';

interface BorrowerRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  address: string;
  city: string;
  province: string;
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  monthlyIncome: string;
  nrcFront: File | null;
  nrcBack: File | null;
  selfie: File | null;
  payslip1: File | null;
  payslip2: File | null;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  creditCheckConsent: boolean;
}

export function BorrowerFlow() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'registration' | 'welcome' | 'dashboard'>('landing');
  const [userData, setUserData] = useState<BorrowerRegistrationData | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('registration');
  };

  const handleLogin = () => {
    // For now, just go to dashboard. In a real app, this would handle authentication
    setCurrentStep('dashboard');
  };

  const handleRegistrationSubmit = (data: BorrowerRegistrationData) => {
    setUserData(data);
    setCurrentStep('welcome');
  };

  const handleContinueToDashboard = () => {
    setCurrentStep('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentStep('landing');
  };

  switch (currentStep) {
    case 'landing':
      return (
        <BorrowerLandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleLogin}
        />
      );

    case 'registration':
      return (
        <BorrowerRegistrationForm
          onSubmit={handleRegistrationSubmit}
          onBack={handleBackToLanding}
        />
      );

    case 'welcome':
      return (
        <BorrowerWelcome
          userData={{
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            email: userData?.email || ''
          }}
          onContinue={handleContinueToDashboard}
        />
      );

    case 'dashboard':
    return <BorrowerDashboardNew />;

    default:
      return (
        <BorrowerLandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleLogin}
        />
      );
  }
}