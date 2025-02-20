'use client';

import DailyPhrases from '@/components/DailyPhrases';
import DragDropQuiz from '@/components/DragDropQuiz';
import NumbersSection from '@/components/NumbersSection';
import Quiz from '@/components/Quiz';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const sections = [
  { id: 'daily-phrases', title: 'Daily Phrases', component: DailyPhrases },
  { id: 'numbers', title: 'Numbers', component: NumbersSection },
  { id: 'quiz', title: 'Multiple Choice Quiz', component: Quiz },
  { id: 'drag-drop', title: 'Drag & Drop Quiz', component: DragDropQuiz },
];

export default function LearnPage() {
  const [activeSection, setActiveSection] = useState('daily-phrases');

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
      >
        Learn Bosnian
      </motion.h1>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(section.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors
              ${activeSection === section.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {section.title}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          {ActiveComponent && <ActiveComponent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 