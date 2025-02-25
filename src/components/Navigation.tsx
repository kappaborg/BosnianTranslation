'use client';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import { HomeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 soft:bg-soft-50 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            {!isHome && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/"
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white soft:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <HomeIcon className="w-6 h-6" />
                </Link>
              </motion.div>
            )}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                BosniaTrans
              </Link>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link 
                href="/learn" 
                className="text-gray-700 dark:text-gray-200 soft:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Learn Bosnian
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link 
                href="/culture" 
                className="text-gray-700 dark:text-gray-200 soft:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Culture
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link 
                href="/translation" 
                className="text-gray-700 dark:text-gray-200 soft:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Translate
              </Link>
            </motion.div>
            
            <ThemeSwitcher />

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="sm:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => {
                // Toggle mobile menu
                document.querySelector('.mobile-menu')?.classList.toggle('hidden');
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu hidden sm:hidden pb-4">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/learn"
              className="text-gray-700 dark:text-gray-200 soft:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Learn Bosnian
            </Link>
            <Link 
              href="/culture"
              className="text-gray-700 dark:text-gray-200 soft:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Culture
            </Link>
            <Link 
              href="/translation"
              className="text-gray-700 dark:text-gray-200 soft:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Translate
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 