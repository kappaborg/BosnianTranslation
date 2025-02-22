'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AudioPronunciation from './AudioPronunciation';
import Categories from './Categories';
import DragDropQuiz from './DragDropQuiz';
import Quiz from './Quiz';

const commonPhrases = [
  { 
    english: 'Hello', 
    bosnian: 'Zdravo', 
    chinese: '你好',
    pronunciation: 'ZDRAH-voh',
    context: 'Greeting someone'
  },
  { 
    english: 'Thank you', 
    bosnian: 'Hvala', 
    chinese: '谢谢',
    pronunciation: 'HVAH-lah',
    context: 'Expressing gratitude'
  },
  { 
    english: 'Please', 
    bosnian: 'Molim', 
    chinese: '请',
    pronunciation: 'MOH-leem',
    context: 'Making a request'
  },
  { 
    english: 'How are you?', 
    bosnian: 'Kako si?', 
    chinese: '你好吗？',
    pronunciation: 'KAH-koh see',
    context: 'Asking about well-being'
  },
  { 
    english: 'Good morning', 
    bosnian: 'Dobro jutro', 
    chinese: '早上好',
    pronunciation: 'DOH-broh YOO-troh',
    context: 'Morning greeting'
  },
  { english: 'Goodbye', bosnian: 'Doviđenja', pronunciation: 'doh-vee-JEN-yah' },
  { english: 'Yes', bosnian: 'Da', pronunciation: 'dah' },
  { english: 'No', bosnian: 'Ne', pronunciation: 'neh' },
  { english: 'What is your name?', bosnian: 'Kako se zoveš?', pronunciation: 'KAH-koh seh ZOH-vesh' },
  { english: 'My name is...', bosnian: 'Zovem se...', pronunciation: 'ZOH-vem seh' },
  // Additional phrases
  { english: 'Good evening', bosnian: 'Dobro veče', pronunciation: 'DOH-broh VEH-cheh' },
  { english: 'Good night', bosnian: 'Laku noć', pronunciation: 'LAH-koo noch' },
  { english: 'How much is it?', bosnian: 'Koliko košta?', pronunciation: 'KOH-lee-koh KOSH-tah' },
  { english: 'Where is...?', bosnian: 'Gdje je...?', pronunciation: 'GD-yeh yeh' },
  { english: 'I understand', bosnian: 'Razumijem', pronunciation: 'rah-ZOO-mee-yem' }
];

type Tab = 'phrases' | 'quiz' | 'dragdrop' | 'categories';

export default function LearningSection() {
  const [selectedTab, setSelectedTab] = useState<Tab>('phrases');
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('basics');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn Bosnian</h2>
        <p className="text-gray-600 mb-6">
          Start your journey to learn Bosnian with these common phrases and essential vocabulary.
          Practice your knowledge with our interactive quizzes!
        </p>

        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setSelectedTab('phrases')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'phrases'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Common Phrases
          </button>
          <button
            onClick={() => setSelectedTab('categories')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'categories'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setSelectedTab('quiz')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'quiz'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Multiple Choice
          </button>
          <button
            onClick={() => setSelectedTab('dragdrop')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'dragdrop'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Fill in the Blanks
          </button>
        </div>
      </div>

      {selectedTab === 'phrases' && (
        <div className="grid gap-4">
          {commonPhrases.map((phrase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col space-y-4">
                {/* Context */}
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {phrase.context}
                </p>

                {/* English */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">EN</span>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{phrase.english}</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AudioPronunciation text={phrase.english} lang="en" />
                  </motion.div>
                </div>

                {/* Bosnian */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">BS</span>
                    <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{phrase.bosnian}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{phrase.pronunciation}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AudioPronunciation text={phrase.bosnian} lang="bs" />
                    </motion.div>
                  </div>
                </div>

                {/* Chinese */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ZH</span>
                    <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">{phrase.chinese}</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AudioPronunciation text={phrase.chinese} lang="zh" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTab === 'categories' && <Categories />}
      {selectedTab === 'quiz' && <Quiz />}
      {selectedTab === 'dragdrop' && <DragDropQuiz />}
    </div>
  );
} 