import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Download, 
  Smartphone, 
  Shield, 
  Zap, 
  Wifi, 
  Bell, 
  Check,
  Apple,
  Chrome,
  Globe,
  Banknote
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function DownloadPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebApp = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebApp) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Banknote className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Download LoanPro</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the complete loan management system on your device. 
            Access your data offline, receive notifications, and enjoy a native app experience.
          </p>
          
          {isInstalled && (
            <Badge variant="secondary" className="mt-4 px-4 py-2">
              <Check className="w-4 h-4 mr-2" />
              App Already Installed
            </Badge>
          )}
        </div>

        {/* Installation Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 text-center">
            <CardHeader>
              <CardTitle className="text-2xl mb-2">Install LoanPro App</CardTitle>
              <CardDescription className="text-lg">
                Install our Progressive Web App for the best experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isInstalled && isInstallable && (
                <Button 
                  onClick={handleInstallClick}
                  size="lg"
                  className="text-lg px-8 py-6 h-auto"
                >
                  <Download className="w-6 h-6 mr-3" />
                  Install App Now
                </Button>
              )}

              {!isInstalled && !isInstallable && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Installation is available on supported browsers
                  </p>
                  
                  {isIOS && (
                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-start gap-3">
                        <Apple className="w-6 h-6 text-blue-600 mt-1" />
                        <div className="text-left">
                          <h4 className="font-semibold text-blue-900">Install on iOS</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Tap the share button in Safari, then select "Add to Home Screen"
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {isAndroid && (
                    <Card className="p-4 bg-green-50 border-green-200">
                      <div className="flex items-start gap-3">
                        <Chrome className="w-6 h-6 text-green-600 mt-1" />
                        <div className="text-left">
                          <h4 className="font-semibold text-green-900">Install on Android</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Tap the menu button in Chrome, then select "Add to Home screen"
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  <Card className="p-4 bg-purple-50 border-purple-200">
                    <div className="flex items-start gap-3">
                      <Globe className="w-6 h-6 text-purple-600 mt-1" />
                      <div className="text-left">
                        <h4 className="font-semibold text-purple-900">Desktop Browsers</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Look for the install button in your browser's address bar
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {isInstalled && (
                <div className="space-y-4">
                  <div className="text-green-600 text-lg font-semibold">
                    ✅ LoanPro is installed and ready to use!
                  </div>
                  <p className="text-muted-foreground">
                    You can now access LoanPro from your home screen or app drawer
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <Card className="text-center p-6">
            <Wifi className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Offline Access</h3>
            <p className="text-sm text-muted-foreground">
              Access your loan data even without internet connection
            </p>
          </Card>

          <Card className="text-center p-6">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Instant loading with cached data and optimized performance
            </p>
          </Card>

          <Card className="text-center p-6">
            <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Push Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Get reminded about due payments and important updates
            </p>
          </Card>

          <Card className="text-center p-6">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Your financial data is encrypted and stored securely
            </p>
          </Card>
        </div>

        {/* System Requirements */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>System Requirements</CardTitle>
            <CardDescription>
              LoanPro works on all modern devices and browsers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Mobile Devices</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    iOS 12.0+ (Safari)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Android 8.0+ (Chrome)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Modern mobile browsers
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Desktop</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Chrome 90+
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Firefox 88+
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Edge 90+
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}