'use client';

import { BugAntIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Analytics } from "@vercel/analytics/react";
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { Inter } from "next/font/google";
import { Suspense, useState } from 'react';
import "./globals.css";

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

// Dynamically import components with noSSR option and suspense
const ThemeProvider = dynamic(() => import('@/components/ThemeProvider'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const BugReport = dynamic(() => import('@/components/BugReport'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const ChatBot = dynamic(() => import('@/components/ChatBot'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const PlanetaryNavigation = dynamic(() => import('@/components/space/PlanetaryNavigation'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const SpaceBackground = dynamic(() => import('@/components/space/SpaceBackground'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <Suspense fallback={<LoadingSpinner />}>
          <ThemeProvider>
            <div className="relative">
              <Suspense fallback={<LoadingSpinner />}>
                <SpaceBackground />
              </Suspense>
              <main className="relative z-10">
                {children}
              </main>
              <Suspense fallback={<LoadingSpinner />}>
                <PlanetaryNavigation />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <Footer />
              </Suspense>

              {/* Bug Report Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsBugReportOpen(true)}
                className="fixed bottom-4 right-24 p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
              >
                <BugAntIcon className="w-6 h-6" />
                <span className="sr-only">Report Bug</span>
              </motion.button>

              {/* Chat Bot Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                <span className="sr-only">Open Chat Assistant</span>
              </motion.button>

              {/* Bug Report Modal */}
              <Suspense fallback={<LoadingSpinner />}>
                <BugReport
                  isOpen={isBugReportOpen}
                  onClose={() => setIsBugReportOpen(false)}
                />
              </Suspense>

              {/* Chat Bot */}
              <Suspense fallback={<LoadingSpinner />}>
                <ChatBot
                  isOpen={isChatOpen}
                  onClose={() => setIsChatOpen(false)}
                  initialContext={{
                    difficulty: "beginner",
                    focusArea: "conversation",
                  }}
                />
              </Suspense>
            </div>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
} 