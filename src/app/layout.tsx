'use client';

import { Analytics } from "@vercel/analytics/react";
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
              {/* We are not adding this button for now  */}

              {/* Bug Report Modal */}
              <Suspense fallback={<LoadingSpinner />}>
                <BugReport
                  isOpen={isBugReportOpen}
                  onClose={() => setIsBugReportOpen(false)}
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