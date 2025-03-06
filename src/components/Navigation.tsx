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
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link href={isHome ? "#" : "/"} className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                BosniaTrans
              </Link>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
            {!isHome && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center"
              >
                <Link 
                  href="/"
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                    pathname === '/' 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <HomeIcon className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link 
                href="/learning" 
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === '/learning' 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
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
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === '/culture' 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
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
                href="/tours" 
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === '/tours' 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Virtual Tour
              </Link>
            </motion.div>
            
            <ThemeSwitcher />

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="sm:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => {
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
          <div className="flex flex-col space-y-3 px-2 py-3 bg-white/5 rounded-lg mt-2">
            {!isHome && (
              <Link 
                href="/"
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </Link>
            )}
            <Link 
              href="/learning"
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                pathname === '/learning' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Learn Bosnian
            </Link>
            <Link 
              href="/culture"
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                pathname === '/culture' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Culture
            </Link>
            <Link 
              href="/tours"
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                pathname === '/tours' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Virtual Tour
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 