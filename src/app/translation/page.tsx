'use client';

import CosmicTranslator from '@/components/space/CosmicTranslator';
import { motion } from 'framer-motion';

export default function TranslationPage() {
  const handleTranslate = async (text: string, from: string, to: string) => {
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
  };

  return (
    <div className="min-h-screen w-full py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center space-y-6">
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            Universal Translator
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Translate between English, Bosnian, and Chinese with ease
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CosmicTranslator onTranslate={handleTranslate} />
        </motion.div>
      </motion.div>
    </div>
  );
} 