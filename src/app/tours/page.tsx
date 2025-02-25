'use client';

import { Button } from '@/components/ui/button';
import VirtualTour from '@/components/VirtualTour';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ToursPage() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Simulate checking for required data/assets
      const checkAssets = async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        setIsLoading(false);
      };
      
      checkAssets();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load tour data'));
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">Something went wrong</h2>
          <p className="text-gray-400">{error.message}</p>
          <div className="space-x-4">
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Loading virtual tour...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VirtualTour />
      </motion.div>
    </div>
  );
} 