import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { LoginForm } from './LoginForm';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthContent: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <AuthProvider>
      <AuthContent>{children}</AuthContent>
    </AuthProvider>
  );
};