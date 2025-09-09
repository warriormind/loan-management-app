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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-blue-500 to-emerald-600">
        {/* Animated Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/6 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-white/80 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8 animate-fade-in">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <Banknote className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">LoanPro</h1>
                  <p className="text-sm text-white/80">Management System</p>
                </div>
              </div>
              <h2 className="text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                Welcome to the Future of
                <span className="text-emerald-200 block animate-pulse"> Lending</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Secure, fast, and transparent loan management platform designed for both administrators and borrowers.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group flex items-center gap-3 p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-emerald-400/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/50 transition-colors">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Secure</h3>
                  <p className="text-sm text-white/80">Bank-level security</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-blue-400/30 rounded-lg flex items-center justify-center group-hover:bg-blue-400/50 transition-colors">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Fast</h3>
                  <p className="text-sm text-white/80">Instant approvals</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-purple-400/30 rounded-lg flex items-center justify-center group-hover:bg-purple-400/50 transition-colors">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">User-Friendly</h3>
                  <p className="text-sm text-white/80">Easy navigation</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-orange-400/30 rounded-lg flex items-center justify-center group-hover:bg-orange-400/50 transition-colors">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Reliable</h3>
                  <p className="text-sm text-white/80">24/7 support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
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
                          className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-teal-500"
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
                          className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-teal-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      size="lg"
                    >
                      Sign In as {selectedRole === 'admin' ? 'Administrator' : 'Borrower'}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <button className="text-teal-600 hover:text-teal-700 hover:underline font-medium transition-colors">
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
    </div>
  );
}