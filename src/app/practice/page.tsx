'use client';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useState } from 'react';

// Lazy load components
const VocabularyQuiz = lazy(() => import('@/components/practice/VocabularyQuiz'));
const FlashcardReview = lazy(() => import('@/components/practice/FlashcardReview'));
const WordMatching = lazy(() => import('@/components/practice/WordMatching'));
const FileTranslator = lazy(() => import('@/components/FileTranslator'));

type PracticeMode = 'quiz' | 'flashcards' | 'matching' | 'translator';

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>('quiz');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showComponent, setShowComponent] = useState(true);

  const handleModeChange = (newMode: PracticeMode) => {
    setShowComponent(false);
    setTimeout(() => {
      setMode(newMode);
      setScore(0);
      setCurrentQuestion(1);
      setShowComponent(true);
    }, 300);
  };

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
  };

  const handleQuestionUpdate = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
  };

  const renderComponent = () => {
    if (!showComponent) return null;

    return (
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      }>
        {(() => {
          switch (mode) {
            case 'quiz':
              return (
                <VocabularyQuiz
                  category={selectedCategory}
                  onScoreUpdate={handleScoreUpdate}
                  onQuestionUpdate={handleQuestionUpdate}
                />
              );
            case 'flashcards':
              return (
                <FlashcardReview
                  category={selectedCategory}
                  onProgress={handleQuestionUpdate}
                />
              );
            case 'matching':
              return (
                <WordMatching
                  category={selectedCategory}
                  onScoreUpdate={handleScoreUpdate}
                />
              );
            case 'translator':
              return <FileTranslator maxFileSize={10} />;
            default:
              return null;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen w-full py-16 sm:py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            Bosnian Language Skills
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Choose a practice mode to improve your Bosnian language skills
          </motion.p>
        </div>

        {/* Practice Mode Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-4">
          {[
            { id: 'quiz', label: 'Vocabulary Quiz', icon: '📝', color: 'from-blue-500 to-indigo-500' },
            { id: 'flashcards', label: 'Flashcard Review', icon: '🎴', color: 'from-purple-500 to-pink-500' },
            { id: 'matching', label: 'Word Matching', icon: '🔤', color: 'from-green-500 to-emerald-500' },
            { id: 'translator', label: 'File Translator', icon: '📄', color: 'from-orange-500 to-red-500' },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModeChange(item.id as PracticeMode)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                mode === item.id
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-sm sm:text-base text-center">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white text-center mb-6">
            Select Category:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'greetings', label: 'Greetings' },
              { id: 'phrases', label: 'Common Phrases' },
              { id: 'questions', label: 'Questions' },
              { id: 'food', label: 'Food And Drink' },
              { id: 'weather', label: 'Weather' },
              { id: 'time', label: 'Time' },
              { id: 'family', label: 'Family' },
            ].map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 sm:p-4 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Practice Component */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode + selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6"
          >
            {renderComponent()}
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 right-4 bg-white/10 backdrop-blur-lg rounded-lg p-4"
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <span className="text-white">Question {currentQuestion} of 20</span>
            <div className="flex items-center space-x-4">
              <span className="text-white">Score: {score}/20</span>
              <Button
                onClick={() => {
                  setScore(0);
                  setCurrentQuestion(1);
                }}
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Reset Progress
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 