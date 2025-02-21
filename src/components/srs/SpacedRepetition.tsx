'use client';

import { SRSItem } from '@/types';
import {
    CheckCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AudioPronunciation from '../AudioPronunciation';

interface Props {
  items: SRSItem[];
  onItemReviewed: (itemId: string, wasSuccessful: boolean) => void;
}

export default function SpacedRepetition({ items, onItemReviewed }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedItems, setReviewedItems] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState(0);

  const currentItem = items[currentIndex];
  const hasNextItem = currentIndex < items.length - 1;
  const hasPrevItem = currentIndex > 0;

  useEffect(() => {
    // Reset state when items change
    setCurrentIndex(0);
    setShowAnswer(false);
    setReviewedItems(new Set());
  }, [items]);

  const handleNext = () => {
    if (hasNextItem) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (hasPrevItem) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleReview = (wasSuccessful: boolean) => {
    if (!currentItem) return;

    onItemReviewed(currentItem.id, wasSuccessful);
    setReviewedItems(prev => new Set([...prev, currentItem.id]));
    handleNext();
  };

  if (!currentItem) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400">No items to review</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{currentIndex + 1} of {items.length}</span>
          <span>{Math.round((reviewedItems.size / items.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: direction * 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 200 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="h-full bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-lg p-6 flex flex-col">
              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {currentItem.type.charAt(0).toUpperCase() + currentItem.type.slice(1)}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {showAnswer ? currentItem.content.english : currentItem.content.bosnian}
                </h3>
                {currentItem.content.context && (
                  <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                    {currentItem.content.context}
                  </p>
                )}
                <div className="mt-4">
                  <AudioPronunciation
                    text={showAnswer ? currentItem.content.english : currentItem.content.bosnian}
                    lang={showAnswer ? 'en' : 'bs'}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6">
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Show Answer
                  </button>
                ) : (
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReview(false)}
                      className="flex items-center space-x-2 py-3 px-6 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      <XCircleIcon className="w-5 h-5" />
                      <span>Again</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReview(true)}
                      className="flex items-center space-x-2 py-3 px-6 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                      <span>Good</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={!hasPrevItem}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNextItem}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
} 