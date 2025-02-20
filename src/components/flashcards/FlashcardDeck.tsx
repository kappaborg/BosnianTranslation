'use client';

import { FlashcardDeck as FlashcardDeckType } from '@/types';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  deck: FlashcardDeckType;
  onUpdateCard?: (cardId: string, status: 'easy' | 'medium' | 'hard') => void;
}

export default function FlashcardDeck({ deck, onUpdateCard }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentCard = deck.cards[currentIndex];

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentIndex < deck.cards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (onUpdateCard) {
      onUpdateCard(currentCard.id, difficulty);
    }
    nextCard();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
          {deck.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
          Card {currentIndex + 1} of {deck.cards.length}
        </p>
      </div>

      <div className="relative h-64 mb-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 200 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full cursor-pointer"
              onClick={flipCard}
            >
              {/* Front of card */}
              <div
                style={{ backfaceVisibility: 'hidden' }}
                className={`absolute inset-0 flex items-center justify-center p-6 rounded-xl shadow-lg
                  ${isFlipped ? 'invisible' : 'visible'}
                  bg-white dark:bg-gray-800 soft:bg-soft-50`}
              >
                <p className="text-xl text-gray-900 dark:text-white soft:text-gray-800">
                  {currentCard.front}
                </p>
              </div>

              {/* Back of card */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className={`absolute inset-0 flex items-center justify-center p-6 rounded-xl shadow-lg
                  ${isFlipped ? 'visible' : 'invisible'}
                  bg-white dark:bg-gray-800 soft:bg-soft-50`}
              >
                <p className="text-xl text-gray-900 dark:text-white soft:text-gray-800">
                  {currentCard.back}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={previousCard}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200
            dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700
            soft:bg-gray-50 soft:text-gray-600 soft:hover:bg-gray-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextCard}
          disabled={currentIndex === deck.cards.length - 1}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200
            dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700
            soft:bg-gray-50 soft:text-gray-600 soft:hover:bg-gray-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </motion.button>
      </div>

      {isFlipped && (
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDifficultySelect('easy')}
            className="px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200
              dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30
              soft:bg-green-50 soft:text-green-600 soft:hover:bg-green-100"
          >
            Easy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDifficultySelect('medium')}
            className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200
              dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30
              soft:bg-yellow-50 soft:text-yellow-600 soft:hover:bg-yellow-100"
          >
            Medium
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDifficultySelect('hard')}
            className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200
              dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30
              soft:bg-red-50 soft:text-red-600 soft:hover:bg-red-100"
          >
            Hard
          </motion.button>
        </div>
      )}
    </div>
  );
} 