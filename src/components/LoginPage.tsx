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
  onLogin: (role: 'admin' | 'client', email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client'>('client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(selectedRole, email);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center p-4 font-['Manrope']">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border border-[#dee3ed] bg-white">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#a191f5] rounded-lg flex items-center justify-center">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LoanPro</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
            <p className="text-gray-600 text-sm">Access your loan management account</p>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as 'admin' | 'client')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedRole} className="mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
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

                    <div>
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

                    <Button
                      type="submit"
                      className="w-full bg-[#a191f5] hover:bg-[#8f7fff] text-white font-medium"
                      size="lg"
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <button className="text-[#a191f5] hover:text-[#8f7fff] hover:underline font-medium">
                  Contact support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}