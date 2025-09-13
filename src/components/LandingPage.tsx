import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  Play,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Sparkles,
  Zap,
  Target,
  Award,
  Globe,
  Clock,
  DollarSign,
  Heart
} from 'lucide-react';

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const startTime = Date.now();
      const startValue = start;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [end, duration, start, isAnimating]);

  const startAnimation = () => setIsAnimating(true);

  return { count, startAnimation };
}

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);

  // Animated counters for hero stats
  const activeUsers = useCountUp(10000, 2500);
  const loansManaged = useCountUp(2000000, 2500);
  const uptime = useCountUp(99.9, 2500);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 0.5 + 0.1
      }));
      setParticles(newParticles);
    };

    generateParticles();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start counter animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      activeUsers.startAnimation();
      setTimeout(() => loansManaged.startAnimation(), 300);
      setTimeout(() => uptime.startAnimation(), 600);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-default-color/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-color to-primary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-contrast-color" />
              </div>
              <span className="text-2xl font-bold text-heading-color">LoanPro</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-default-color hover:text-accent-color transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-default-color hover:text-accent-color transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('services')} className="text-default-color hover:text-accent-color transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-default-color hover:text-accent-color transition-colors font-medium">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-default-color hover:text-accent-color transition-colors font-medium">Contact</button>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                onClick={onGetStarted}
                className="hidden sm:flex bg-gradient-to-r from-accent-color to-primary text-contrast-color border-none shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-accent-color/10 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-surface-color border-t border-default-color/20">
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => scrollToSection('home')} className="block w-full text-left text-default-color hover:text-accent-color transition-colors font-medium py-2">Home</button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left text-default-color hover:text-accent-color transition-colors font-medium py-2">About</button>
                <button onClick={() => scrollToSection('services')} className="block w-full text-left text-default-color hover:text-accent-color transition-colors font-medium py-2">Services</button>
                <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-default-color hover:text-accent-color transition-colors font-medium py-2">Testimonials</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-default-color hover:text-accent-color transition-colors font-medium py-2">Contact</button>
                <Button
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-accent-color to-primary text-contrast-color border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-surface-color/20 to-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-color/5 to-primary/5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23008870" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-accent-color/20 to-primary/20 animate-pulse"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.id * 0.5}s`,
                animationDuration: `${2 + particle.speed}s`
              }}
            />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-accent-color/10 to-primary/10 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent-color/10 rotate-45 animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-accent-color/15 to-primary/15 rounded-lg animate-bounce opacity-50" style={{ animationDelay: '0.5s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-accent-color/10 text-accent-color border-accent-color/20 px-4 py-2 text-sm font-medium">
                🚀 Next-Generation Loan Management
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-heading-color mb-6 leading-tight">
                Smart Loan
                <span className="bg-gradient-to-r from-accent-color to-primary bg-clip-text text-transparent"> Management</span>
                <br />Made Simple
              </h1>

              <p className="text-xl text-default-color/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Streamline your lending operations with our comprehensive loan management platform.
                From application to repayment, manage everything in one powerful dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-accent-color to-primary text-contrast-color border-none shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('about')}
                  className="border-2 border-accent-color text-accent-color hover:bg-accent-color hover:text-contrast-color px-8 py-4 text-lg"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-heading-color transition-all duration-300 group-hover:scale-110 group-hover:text-accent-color">
                    {activeUsers.count.toLocaleString()}+
                  </div>
                  <div className="text-sm text-default-color/60">Active Users</div>
                  <div className="w-8 h-1 bg-gradient-to-r from-accent-color to-primary rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-heading-color transition-all duration-300 group-hover:scale-110 group-hover:text-accent-color">
                    ${(loansManaged.count / 1000000).toFixed(1)}M+
                  </div>
                  <div className="text-sm text-default-color/60">Loans Managed</div>
                  <div className="w-8 h-1 bg-gradient-to-r from-accent-color to-primary rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-heading-color transition-all duration-300 group-hover:scale-110 group-hover:text-accent-color">
                    {uptime.count.toFixed(1)}%
                  </div>
                  <div className="text-sm text-default-color/60">Uptime</div>
                  <div className="w-8 h-1 bg-gradient-to-r from-accent-color to-primary rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-surface-color to-background p-8 rounded-3xl shadow-2xl border border-default-color/20">
                <div className="aspect-square bg-gradient-to-br from-accent-color/10 to-primary/10 rounded-2xl flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-accent-color to-primary rounded-full flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-16 h-16 text-contrast-color" />
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-surface-color p-4 rounded-xl shadow-lg border border-default-color/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-heading-color">Loan Approved</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-surface-color p-4 rounded-xl shadow-lg border border-default-color/20">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-accent-color" />
                    <div>
                      <div className="text-sm font-bold text-heading-color">+24%</div>
                      <div className="text-xs text-default-color/60">Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-default-color/50" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-surface-color/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent-color/10 text-accent-color border-accent-color/20 px-4 py-2">
              About LoanPro
            </Badge>
            <h2 className="text-4xl font-bold text-heading-color mb-6">
              Revolutionizing Loan Management
            </h2>
            <p className="text-xl text-default-color/70 max-w-3xl mx-auto">
              We combine cutting-edge technology with deep financial expertise to deliver
              the most comprehensive loan management solution available.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-accent-color/10 to-primary/10 p-8 rounded-3xl">
                <div className="bg-gradient-to-br from-surface-color to-background p-6 rounded-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-accent-color to-primary p-6 rounded-xl text-center">
                      <Users className="w-8 h-8 text-contrast-color mx-auto mb-2" />
                      <div className="text-2xl font-bold text-contrast-color">50K+</div>
                      <div className="text-sm text-contrast-color/80">Clients Served</div>
                    </div>
                    <div className="bg-surface-color p-6 rounded-xl text-center border border-default-color/20">
                      <TrendingUp className="w-8 h-8 text-accent-color mx-auto mb-2" />
                      <div className="text-2xl font-bold text-heading-color">98%</div>
                      <div className="text-sm text-default-color/60">Success Rate</div>
                    </div>
                    <div className="bg-surface-color p-6 rounded-xl text-center border border-default-color/20">
                      <Shield className="w-8 h-8 text-accent-color mx-auto mb-2" />
                      <div className="text-2xl font-bold text-heading-color">256-bit</div>
                      <div className="text-sm text-default-color/60">Encryption</div>
                    </div>
                    <div className="bg-gradient-to-br from-accent-color to-primary p-6 rounded-xl text-center">
                      <BarChart3 className="w-8 h-8 text-contrast-color mx-auto mb-2" />
                      <div className="text-2xl font-bold text-contrast-color">24/7</div>
                      <div className="text-sm text-contrast-color/80">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-heading-color">
                Why Choose LoanPro?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-color mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-heading-color mb-2">Advanced Analytics</h4>
                    <p className="text-default-color/70">Get deep insights into your loan portfolio with real-time analytics and reporting.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-color mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-heading-color mb-2">Automated Workflows</h4>
                    <p className="text-default-color/70">Streamline your processes with intelligent automation and smart notifications.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-color mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-heading-color mb-2">Bank-Level Security</h4>
                    <p className="text-default-color/70">Your data is protected with enterprise-grade security and compliance standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent-color/10 text-accent-color border-accent-color/20 px-4 py-2">
              Our Services
            </Badge>
            <h2 className="text-4xl font-bold text-heading-color mb-6">
              Comprehensive Loan Solutions
            </h2>
            <p className="text-xl text-default-color/70 max-w-3xl mx-auto">
              From application processing to portfolio management, we provide everything you need
              to run a successful lending operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Client Management",
                description: "Complete CRM system for managing borrowers, applications, and relationships."
              },
              {
                icon: BarChart3,
                title: "Analytics & Reporting",
                description: "Advanced analytics with customizable dashboards and comprehensive reporting."
              },
              {
                icon: Shield,
                title: "Risk Assessment",
                description: "AI-powered credit scoring and risk analysis for informed decision making."
              },
              {
                icon: TrendingUp,
                title: "Portfolio Management",
                description: "Track performance, manage collections, and optimize your loan portfolio."
              },
              {
                icon: CheckCircle,
                title: "Compliance & Security",
                description: "Stay compliant with regulatory requirements and bank-level security."
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description: "Round-the-clock technical support and dedicated account management."
              }
            ].map((service, index) => (
              <Card key={index} className="bg-gradient-to-br from-surface-color to-background border-default-color/20 hover:border-accent-color/30 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-color to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-contrast-color" />
                  </div>
                  <h3 className="text-xl font-bold text-heading-color mb-4">{service.title}</h3>
                  <p className="text-default-color/70 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-br from-background to-surface-color/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent-color/10 text-accent-color border-accent-color/20 px-4 py-2">
              Interactive Demo
            </Badge>
            <h2 className="text-4xl font-bold text-heading-color mb-6">
              See LoanPro in Action
            </h2>
            <p className="text-xl text-default-color/70 max-w-3xl mx-auto">
              Experience our powerful features through this interactive demonstration.
              Click on different elements to explore the platform's capabilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-surface-color to-background p-6 rounded-2xl border border-default-color/20 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-heading-color">Loan Application Process</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-accent-color/10 rounded-lg cursor-pointer hover:bg-accent-color/20 transition-colors duration-300">
                    <CheckCircle className="w-5 h-5 text-accent-color" />
                    <span className="text-default-color">Application Submitted</span>
                    <span className="text-xs text-default-color/60 ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors duration-300">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-default-color">Credit Assessment in Progress</span>
                    <span className="text-xs text-default-color/60 ml-auto">Processing...</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <span className="text-default-color/60">Loan Approval Pending</span>
                    <span className="text-xs text-default-color/60 ml-auto">Next</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-accent-color/10 to-primary/10 p-4 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-accent-color mx-auto mb-2" />
                  <div className="text-sm font-semibold text-heading-color">Analytics</div>
                  <div className="text-xs text-default-color/60">Real-time insights</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent-color/10 p-4 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold text-heading-color">Security</div>
                  <div className="text-xs text-default-color/60">Bank-level protection</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-surface-color to-background p-8 rounded-3xl shadow-2xl border border-default-color/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-color to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-contrast-color" />
                  </div>
                  <h3 className="text-xl font-bold text-heading-color mb-2">Live Dashboard Preview</h3>
                  <p className="text-default-color/70 text-sm">Interactive loan management interface</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-heading-color">Loan Approved</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">$25,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-heading-color">Portfolio Growth</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">+12.5%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-heading-color">Active Clients</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">1,247</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    onClick={onGetStarted}
                    className="bg-gradient-to-r from-accent-color to-primary text-contrast-color border-none shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Try Interactive Demo
                    <Play className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-surface-color/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent-color/10 text-accent-color border-accent-color/20 px-4 py-2">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold text-heading-color mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-default-color/70 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what industry leaders say about LoanPro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                position: "CEO, FinanceCorp",
                content: "LoanPro has transformed our lending operations. The automation and analytics have increased our efficiency by 300%.",
                rating: 5,
                image: "SJ",
                icon: Sparkles
              },
              {
                name: "Michael Chen",
                position: "Director, Credit Union Plus",
                content: "The risk assessment tools are incredible. We've reduced default rates by 40% since implementing LoanPro.",
                rating: 5,
                image: "MC",
                icon: Target
              },
              {
                name: "Emily Rodriguez",
                position: "VP Operations, BankTrust",
                content: "Outstanding platform with excellent support. The compliance features give us complete peace of mind.",
                rating: 5,
                image: "ER",
                icon: Award
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-surface-color to-background border-default-color/20 hover:border-accent-color/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-color/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <testimonial.icon className="w-6 h-6 text-accent-color" />
                  </div>

                  <div className="flex mb-4 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current transition-all duration-300 hover:scale-110" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <p className="text-default-color/80 mb-6 italic relative z-10 group-hover:text-default-color transition-colors duration-300">"{testimonial.content}"</p>
                  <div className="flex items-center relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-color to-primary rounded-full flex items-center justify-center text-contrast-color font-bold mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold text-heading-color transition-colors duration-300 group-hover:text-accent-color">{testimonial.name}</div>
                      <div className="text-sm text-default-color/60">{testimonial.position}</div>
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-color/30 rounded-lg transition-all duration-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-color to-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-contrast-color mb-6">
            Ready to Transform Your Lending Business?
          </h2>
          <p className="text-xl text-contrast-color/80 mb-8">
            Join thousands of financial institutions already using LoanPro to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-contrast-color text-accent-color border-none shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-contrast-color text-contrast-color hover:bg-contrast-color hover:text-accent-color px-8 py-4 text-lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent-color/10 text-accent-color border-accent-color/20 px-4 py-2">
              Contact Us
            </Badge>
            <h2 className="text-4xl font-bold text-heading-color mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-default-color/70 max-w-3xl mx-auto">
              Have questions about LoanPro? Our team is here to help you get started.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-color to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-contrast-color" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading-color mb-2">Office Location</h3>
                  <p className="text-default-color/70">123 Financial District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-color to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-contrast-color" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading-color mb-2">Phone</h3>
                  <p className="text-default-color/70">+1 (555) 123-LOAN<br />Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-color to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-contrast-color" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading-color mb-2">Email</h3>
                  <p className="text-default-color/70">hello@loanpro.com<br />support@loanpro.com</p>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-lg font-semibold text-heading-color mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-accent-color to-primary rounded-lg flex items-center justify-center text-contrast-color hover:scale-110 transition-transform duration-300">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-accent-color to-primary rounded-lg flex items-center justify-center text-contrast-color hover:scale-110 transition-transform duration-300">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-accent-color to-primary rounded-lg flex items-center justify-center text-contrast-color hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-accent-color to-primary rounded-lg flex items-center justify-center text-contrast-color hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-surface-color to-background border-default-color/20">
              <CardHeader>
                <CardTitle className="text-2xl text-heading-color">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-heading-color">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-default-color/20 rounded-xl focus:border-accent-color focus:ring-2 focus:ring-accent-color/20 transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-heading-color">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-default-color/20 rounded-xl focus:border-accent-color focus:ring-2 focus:ring-accent-color/20 transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-heading-color">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-default-color/20 rounded-xl focus:border-accent-color focus:ring-2 focus:ring-accent-color/20 transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-heading-color">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-default-color/20 rounded-xl focus:border-accent-color focus:ring-2 focus:ring-accent-color/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-accent-color to-primary text-contrast-color border-none shadow-lg hover:shadow-xl transition-all duration-300 py-3">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-surface-color to-background border-t border-default-color/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-color to-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-contrast-color" />
                </div>
                <span className="text-xl font-bold text-heading-color">LoanPro</span>
              </div>
              <p className="text-default-color/70 mb-4 max-w-md">
                Revolutionizing loan management with cutting-edge technology and unparalleled customer service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-default-color/60 hover:text-accent-color transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-default-color/60 hover:text-accent-color transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-default-color/60 hover:text-accent-color transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-default-color/60 hover:text-accent-color transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-heading-color mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">Features</a></li>
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">Pricing</a></li>
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">Security</a></li>
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-heading-color mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">Documentation</a></li>
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">Help Center</a></li>
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-default-color/70 hover:text-accent-color transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-default-color/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-default-color/60 text-sm">
              © 2025 LoanPro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-default-color/60 hover:text-accent-color transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-default-color/60 hover:text-accent-color transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-default-color/60 hover:text-accent-color transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}