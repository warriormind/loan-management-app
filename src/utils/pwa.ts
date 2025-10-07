// PWA utility functions

export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      // Update available
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              console.log('New content is available; please refresh.');
            }
          });
        }
      });
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if ('Notification' in window) {
    return await Notification.requestPermission();
  }
  return 'denied';
};

export const sendNotification = (title: string, options?: NotificationOptions): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png',
      ...options,
    });
  }
};

export const schedulePaymentReminder = (borrowerName: string, amount: string, dueDate: Date): void => {
  const now = new Date();
  const timeUntilDue = dueDate.getTime() - now.getTime();
  
  // Schedule notification for 1 day before due date
  const reminderTime = Math.max(0, timeUntilDue - 24 * 60 * 60 * 1000);
  
  setTimeout(() => {
    sendNotification('Payment Due Soon', {
      body: `${borrowerName} has a payment of K${amount} due tomorrow`,
      tag: 'payment-reminder',
      requireInteraction: true,
    });
  }, reminderTime);
};

export const isStandalone = (): boolean => {
  return (window.navigator as any).standalone === true || 
         window.matchMedia('(display-mode: standalone)').matches;
};

export const getInstallPrompt = (): Promise<any> => {
  return new Promise((resolve) => {
    window.addEventListener('beforeinstallprompt', resolve, { once: true });
  });
};

// Offline data management
export const saveOfflineData = (key: string, data: any): void => {
  try {
    localStorage.setItem(`offline_${key}`, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.error('Failed to save offline data:', error);
  }
};

export const getOfflineData = (key: string): any => {
  try {
    const stored = localStorage.getItem(`offline_${key}`);
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      // Return data if it's less than 24 hours old
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return data;
      }
    }
  } catch (error) {
    console.error('Failed to get offline data:', error);
  }
  return null;
};

export const clearOfflineData = (key?: string): void => {
  if (key) {
    localStorage.removeItem(`offline_${key}`);
  } else {
    // Clear all offline data
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('offline_')) {
        localStorage.removeItem(k);
      }
    });
  }
};

// Check if device is mobile
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Get device info for analytics
export const getDeviceInfo = () => {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screen: {
      width: screen.width,
      height: screen.height,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
};