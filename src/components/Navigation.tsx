'use client';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 soft:bg-soft-50 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
              BosniaTrans
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/learn" 
                className="text-gray-700 dark:text-gray-200 soft:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Learn Bosnian
              </Link>
            </motion.div>
            
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 