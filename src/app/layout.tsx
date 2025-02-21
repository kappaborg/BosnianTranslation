'use client';

import BugReport from "@/components/BugReport";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BugAntIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useState } from "react";
import "./globals.css";

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
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow bg-white dark:bg-gray-900 soft:bg-gray-100 pt-16">
              {children}
            </main>
            <Footer />

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
            <BugReport
              isOpen={isBugReportOpen}
              onClose={() => setIsBugReportOpen(false)}
            />

            {/* Chat Bot */}
            <ChatBot
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              initialContext={{
                difficulty: "beginner",
                focusArea: "conversation",
              }}
            />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
} 