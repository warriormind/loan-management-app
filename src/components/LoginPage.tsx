import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  Shield,
  Users,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Banknote,
  UserCheck,
  CreditCard,
  Building
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'borrower', email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'borrower'>('borrower');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(selectedRole, email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Banknote className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LoanPro</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to the Future of
              <span className="text-primary"> Lending</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Secure, fast, and transparent loan management platform designed for both administrators and borrowers.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Secure</h3>
                <p className="text-sm text-gray-600">Bank-level security</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
              <CreditCard className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Fast</h3>
                <p className="text-sm text-gray-600">Instant approvals</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">User-Friendly</h3>
                <p className="text-sm text-gray-600">Easy navigation</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
              <Building className="w-8 h-8 text-orange-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Reliable</h3>
                <p className="text-sm text-gray-600">24/7 support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Sign In to Your Account
              </CardTitle>
              <p className="text-gray-600">
                Choose your role and access your dashboard
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as 'admin' | 'borrower')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="borrower" className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Borrower
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="borrower" className="space-y-4">
                  <div className="text-center mb-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Borrower Portal
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      Access your loan applications, repayments, and statements
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4">
                  <div className="text-center mb-4">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Admin Portal
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      Manage loans, borrowers, and system settings
                    </p>
                  </div>
                </TabsContent>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Sign In as {selectedRole === 'admin' ? 'Administrator' : 'Borrower'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button className="text-primary hover:underline font-medium">
                      Contact support
                    </button>
                  </p>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}