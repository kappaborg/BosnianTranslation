'use client';

import FileTranslator from '@/components/FileTranslator';
import FlashcardReview from '@/components/practice/FlashcardReview';
import VocabularyQuiz from '@/components/practice/VocabularyQuiz';
import WordMatching from '@/components/practice/WordMatching';
import { motion } from 'framer-motion';
import { useState } from 'react';

type PracticeMode = 'quiz' | 'flashcards' | 'matching' | 'translator';

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>('quiz');

  const renderComponent = () => {
    switch (mode) {
      case 'quiz':
        return <VocabularyQuiz />;
      case 'flashcards':
        return <FlashcardReview />;
      case 'matching':
        return <WordMatching />;
      case 'translator':
        return <FileTranslator />;
      default:
        return null;
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
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            Practice Bosnian
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Choose a practice mode to improve your Bosnian language skills
          </motion.p>
        </div>

        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('quiz')}
            className={`px-6 py-3 rounded-lg ${
              mode === 'quiz'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Vocabulary Quiz
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('flashcards')}
            className={`px-6 py-3 rounded-lg ${
              mode === 'flashcards'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Flashcard Review
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('matching')}
            className={`px-6 py-3 rounded-lg ${
              mode === 'matching'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Word Matching
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('translator')}
            className={`px-6 py-3 rounded-lg ${
              mode === 'translator'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            File Translator
          </motion.button>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderComponent()}
        </motion.div>
      </motion.div>
    </div>
  );
} 