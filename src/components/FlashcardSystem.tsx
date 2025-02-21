'use client';

import { ReviewHistory, SRSCard } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FlashcardSystemProps {
  cards: SRSCard[];
  onReview: (cardId: string, performance: ReviewHistory['performance']) => void;
}

const FlashcardSystem: React.FC<FlashcardSystemProps> = ({ cards, onReview }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewStartTime, setReviewStartTime] = useState<number>(0);
  const [showPerformanceButtons, setShowPerformanceButtons] = useState(false);

  useEffect(() => {
    setReviewStartTime(Date.now());
  }, [currentCardIndex]);

  const currentCard = cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setShowPerformanceButtons(true);
    }
  };

  const handlePerformance = (performance: ReviewHistory['performance']) => {
    const timeSpent = (Date.now() - reviewStartTime) / 1000; // Convert to seconds
    onReview(currentCard.id, performance);
    setShowPerformanceButtons(false);
    setIsFlipped(false);
    
    // Move to next card after a short delay
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        // Handle completion of deck
        console.log('Deck completed');
      }
    }, 500);
  };

  const getNextReviewText = (card: SRSCard) => {
    const nextReview = new Date(card.nextReview);
    const now = new Date();
    const diffHours = Math.round((nextReview.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `Next review in ${diffHours} hours`;
    } else {
      const diffDays = Math.round(diffHours / 24);
      return `Next review in ${diffDays} days`;
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          No cards to review!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Check back later for more reviews.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
          <span>Progress</span>
          <span>{currentCardIndex + 1} / {cards.length}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative perspective-1000">
        <motion.div
          className={`relative w-full aspect-[3/2] cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 backface-hidden ${
              isFlipped ? 'hidden' : ''
            } bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center`}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentCard.front}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Click to reveal answer
            </p>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 backface-hidden ${
              !isFlipped ? 'hidden' : ''
            } bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center rotate-y-180`}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentCard.back}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {getNextReviewText(currentCard)}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Performance Buttons */}
      <AnimatePresence>
        {showPerformanceButtons && (
          <motion.div
            className="mt-6 grid grid-cols-4 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <button
              onClick={() => handlePerformance('poor')}
              className="p-3 bg-red-500 text-white rounded-lg"
            >
              Again
            </button>
            <button
              onClick={() => handlePerformance('fair')}
              className="p-3 bg-yellow-500 text-white rounded-lg"
            >
              Hard
            </button>
            <button
              onClick={() => handlePerformance('good')}
              className="p-3 bg-green-500 text-white rounded-lg"
            >
              Good
            </button>
            <button
              onClick={() => handlePerformance('perfect')}
              className="p-3 bg-blue-500 text-white rounded-lg"
            >
              Easy
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Info */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>Card Level: {currentCard.level}</p>
        <p>Type: {currentCard.type}</p>
        <p>Reviews: {currentCard.history.length}</p>
      </div>
    </div>
  );
};

export default FlashcardSystem; 