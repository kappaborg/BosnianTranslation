'use client';

import TranslationBox from '@/components/TranslationBox';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Bosnian-English Translation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Translate between Bosnian and English instantly. Our free translation service
          helps you communicate effectively in both languages.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TranslationBox />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">
          Why Learn Bosnian?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Rich Cultural Heritage
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover the vibrant culture, literature, and traditions of Bosnia and Herzegovina
              through its language.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Professional Opportunities
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Open new career paths and connect with businesses in the Balkans region.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 