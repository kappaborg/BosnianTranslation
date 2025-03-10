'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

// Dynamically import components with noSSR option
const CosmicTranslator = dynamic(() => import('@/components/space/CosmicTranslator'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const FlashCard = dynamic(() => import('@/components/FlashCard'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const sampleFlashCards = [
  {
    bosnianWord: 'Zdravo',
    englishTranslation: 'Hello',
    pronunciation: 'zdrah-voh',
    example: 'Zdravo, kako si?'
  },
  {
    bosnianWord: 'Hvala',
    englishTranslation: 'Thank you',
    pronunciation: 'hva-la',
    example: 'Hvala lijepo!'
  }
];

const features = [
  {
    
    title: 'Bosnian Culture',
    description: 'Learn Bosnian culture and traditions',
    link: '/culture',
    icon: '🏰'
  },
  {
    title: 'Practice',
    description: 'Improve your Bosnian with interactive exercises',
    link: '/learning',
    icon: '📝'
  },
  {
    title: 'Virtual Tour',
    description: 'Explore Bosnia through an interactive virtual tour',
    link: '/tours',
    icon: '🗺️'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Learn Bosnian Language
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Translate, learn, and explore the Bosnian language with our comprehensive tools and resources.
          </p>
        </motion.div>

        {/* Translation Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">
            Universal Translator
          </h2>
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<LoadingSpinner />}>
              <CosmicTranslator onTranslate={async (text: string, from: string, to: string) => {
                try {
                  const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text, from, to }),
                  });
                  const data = await response.json();
                  return data.translatedText;
                } catch (error) {
                  console.error('Translation error:', error);
                  return 'Translation failed. Please try again.';
                }
              }} />
            </Suspense>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-8">
            Explore More Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link href={feature.link} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Sample Flashcards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
        </motion.section>
      </div>
    </div>
  );
} 