'use client';

import { DialogueScenario as DialogueScenarioType } from '@/types';
import {
    InformationCircleIcon,
    PlayIcon,
    SpeakerWaveIcon,
    TranslateIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  scenario: DialogueScenarioType;
}

export default function DialogueScenario({ scenario }: Props) {
  const [showTranslations, setShowTranslations] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);
  const [audioElements] = useState<{ [key: number]: HTMLAudioElement }>({});

  const playAudio = async (index: number) => {
    try {
      const exchange = scenario.exchanges[index];
      if (!exchange.audioUrl) return;

      if (!audioElements[index]) {
        audioElements[index] = new Audio(exchange.audioUrl);
      }

      const audio = audioElements[index];

      if (playingAudioIndex !== null) {
        audioElements[playingAudioIndex].pause();
        audioElements[playingAudioIndex].currentTime = 0;
      }

      setPlayingAudioIndex(index);
      audio.onended = () => setPlayingAudioIndex(null);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingAudioIndex(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Scenario Header */}
      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white soft:text-gray-800 mb-2">
          {scenario.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 soft:text-gray-600">
          {scenario.context}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTranslations(!showTranslations)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-600
            dark:bg-indigo-900/20 dark:text-indigo-400
            soft:bg-indigo-50 soft:text-indigo-600"
        >
          <TranslateIcon className="w-5 h-5" />
          <span>{showTranslations ? 'Hide' : 'Show'} Translations</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowVocabulary(!showVocabulary)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-100 text-green-600
            dark:bg-green-900/20 dark:text-green-400
            soft:bg-green-50 soft:text-green-600"
        >
          <InformationCircleIcon className="w-5 h-5" />
          <span>{showVocabulary ? 'Hide' : 'Show'} Vocabulary</span>
        </motion.button>
      </div>

      {/* Dialogue */}
      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 soft:divide-gray-200">
          {scenario.exchanges.map((exchange, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 ${
                exchange.speaker === 'User'
                  ? 'bg-indigo-50 dark:bg-indigo-900/10 soft:bg-indigo-50/50'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white soft:text-gray-800">
                  {exchange.speaker}
                </span>
                {exchange.audioUrl && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => playAudio(index)}
                    className="p-2 rounded-full bg-gray-100 text-gray-600
                      dark:bg-gray-700 dark:text-gray-400
                      soft:bg-gray-50 soft:text-gray-600"
                  >
                    {playingAudioIndex === index ? (
                      <SpeakerWaveIcon className="w-5 h-5 animate-pulse" />
                    ) : (
                      <PlayIcon className="w-5 h-5" />
                    )}
                  </motion.button>
                )}
              </div>
              <p className="text-lg text-gray-900 dark:text-white soft:text-gray-800 mb-1">
                {exchange.bosnian}
              </p>
              <AnimatePresence>
                {showTranslations && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-600 dark:text-gray-400 soft:text-gray-600 italic"
                  >
                    {exchange.english}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vocabulary */}
      <AnimatePresence>
        {showVocabulary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white soft:text-gray-800 mb-4">
              Vocabulary
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {scenario.vocabulary.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 soft:bg-soft-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white soft:text-gray-800">
                      {item.word}
                    </h4>
                    <span className="text-gray-600 dark:text-gray-400 soft:text-gray-600">
                      {item.translation}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-500 mb-2">
                    {item.context}
                  </p>
                  <div className="space-y-1">
                    {item.usage.map((example, i) => (
                      <p
                        key={i}
                        className="text-sm text-gray-600 dark:text-gray-400 soft:text-gray-600 italic"
                      >
                        • {example}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 