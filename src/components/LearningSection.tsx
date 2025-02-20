'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AudioPronunciation from './AudioPronunciation';
import Categories from './Categories';
import DragDropQuiz from './DragDropQuiz';
import Quiz from './Quiz';

const commonPhrases = [
  { english: 'Hello', bosnian: 'Zdravo', pronunciation: 'ZDRAH-voh' },
  { english: 'Thank you', bosnian: 'Hvala', pronunciation: 'HVAH-lah' },
  { english: 'Please', bosnian: 'Molim', pronunciation: 'MOH-leem' },
  { english: 'How are you?', bosnian: 'Kako si?', pronunciation: 'KAH-koh see' },
  { english: 'Good morning', bosnian: 'Dobro jutro', pronunciation: 'DOH-broh YOO-troh' },
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
        <>
          <div className="grid gap-4">
            {commonPhrases.map((phrase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">{phrase.english}</p>
                    <p className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
                      {phrase.bosnian}
                      <AudioPronunciation text={phrase.bosnian} lang="bs" />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Pronunciation:</p>
                    <p className="text-sm font-medium text-gray-700">{phrase.pronunciation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Pro Tips:</h3>
            <ul className="list-disc list-inside text-indigo-800 space-y-2">
              <li>Bosnian pronunciation is phonetic - each letter always represents the same sound</li>
              <li>Stress is usually on the first syllable of the word</li>
              <li>Practice speaking out loud to improve your accent</li>
              <li>Click the speaker icon to hear the pronunciation</li>
            </ul>
          </div>
        </>
      )}

      {selectedTab === 'categories' && <Categories />}
      {selectedTab === 'quiz' && <Quiz />}
      {selectedTab === 'dragdrop' && <DragDropQuiz />}
    </div>
  );
} 