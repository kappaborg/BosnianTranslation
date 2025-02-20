'use client';

import { BellIcon, WifiIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if the app is installable
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // Setup push notifications here
        }
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showPushNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 soft:bg-soft-50">
      {/* Offline/Online Status */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-yellow-500 dark:bg-yellow-600 soft:bg-yellow-400"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <WifiIcon className="h-5 w-5 text-white" />
                <p className="ml-3 font-medium text-white truncate">
                  You are currently offline. Some features may be limited.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install Prompt */}
      <AnimatePresence>
        {isInstallable && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-indigo-600 dark:bg-indigo-700 soft:bg-indigo-500"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <p className="font-medium text-white truncate">
                  Install BosniaTrans for offline access
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleInstallClick}
                  className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50"
                >
                  Install
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {showNotification && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-lg shadow-lg p-4 flex items-start space-x-4">
              <BellIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 soft:text-indigo-600" />
              <div>
                <p className="text-gray-900 dark:text-white soft:text-gray-800">
                  {notifications[0]}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="w-full max-w-md mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 soft:bg-soft-50 border-t border-gray-200 dark:border-gray-700 soft:border-gray-200 md:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4 py-3">
            {/* Add your navigation items here */}
          </div>
        </div>
      </nav>
    </div>
  );
} 