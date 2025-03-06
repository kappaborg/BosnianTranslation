'use client';

import DailyPhrases from '@/components/DailyPhrases';
import DragDropQuiz from '@/components/DragDropQuiz';
import NumbersSection from '@/components/NumbersSection';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense, lazy, useState } from 'react';

// Lazy load practice components
const VocabularyQuiz = lazy(() => import('@/components/practice/VocabularyQuiz'));
const FlashcardReview = lazy(() => import('@/components/practice/FlashcardReview'));
const WordMatching = dynamic(() => import('@/components/WordMatching'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const sections = [
  {
    id: 'learning',
    title: 'Learning',
    items: [
      { id: 'daily-phrases', title: 'Daily Phrases', component: DailyPhrases, icon: '📖', color: 'from-blue-500 to-indigo-500' },
      { id: 'numbers', title: 'Numbers', component: NumbersSection, icon: '🔢', color: 'from-green-500 to-emerald-500' },
      { id: 'drag-drop', title: 'Drag & Drop Quiz', component: DragDropQuiz, icon: '🎯', color: 'from-purple-500 to-pink-500' },
    ]
  },
  {
    id: 'practice',
    title: 'Practice',
    items: [
      { id: 'quiz', title: 'Vocabulary Quiz', component: VocabularyQuiz, icon: '📝', color: 'from-blue-500 to-indigo-500' },
      { id: 'flashcards', title: 'Flashcard Review', component: FlashcardReview, icon: '🎴', color: 'from-purple-500 to-pink-500' },
      { id: 'matching', title: 'Word Matching', component: WordMatching, icon: '🔤', color: 'from-green-500 to-emerald-500' },
    ]
  }
];

export default function LearnPage() {
  const [activeSection, setActiveSection] = useState('daily-phrases');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showComponent, setShowComponent] = useState(true);

  const handleModeChange = (newMode: string) => {
    setShowComponent(false);
    setTimeout(() => {
      setActiveSection(newMode);
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

  const ActiveComponent = [...sections[0].items, ...sections[1].items].find(
    item => item.id === activeSection
  )?.component;

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
            Learn & Practice Bosnian
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Choose a mode to improve your Bosnian language skills
          </motion.p>
        </div>

        {/* Mode Selection */}
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-white text-center">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleModeChange(item.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${item.color || 'from-purple-500 to-pink-500'} text-white shadow-lg`
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-3xl mb-3">{item.icon}</span>
                  <span className="text-lg text-center">{item.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Category Selection */}
        {(activeSection === 'quiz' || activeSection === 'flashcards') && (
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
        )}

        {/* Active Component */}
        {showComponent && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection + selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl p-6"
            >
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                  <LoadingSpinner />
                </div>
              }>
                {ActiveComponent && (
                  activeSection === 'quiz' ? (
                    <VocabularyQuiz
                      category={selectedCategory}
                      onScoreUpdate={handleScoreUpdate}
                      onQuestionUpdate={handleQuestionUpdate}
                    />
                  ) : activeSection === 'flashcards' ? (
                    <FlashcardReview
                      category={selectedCategory}
                      onProgressAction={handleQuestionUpdate}
                    />
                  ) : activeSection === 'matching' ? (
                    <WordMatching />
                  ) : activeSection === 'numbers' ? (
                    <NumbersSection />
                  ) : activeSection === 'drag-drop' ? (
                    <DragDropQuiz />
                  ) : (
                    <DailyPhrases />
                  )
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
} 