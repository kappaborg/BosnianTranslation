'use client';

import { vocabularyWords } from '@/data/vocabulary';
import { setupSpeechSynthesis } from '@/utils/pronunciation';
import {
    SpeakerWaveIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  pronunciation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  nextReview?: string;
  reviewCount: number;
  examples?: string[];
  context?: string;
}

interface Props {
  category: string;
  onProgress: (cardNumber: number) => void;
}

const REVIEW_INTERVALS = {
  easy: 7, // days
  medium: 3,
  hard: 1,
};

export default function FlashcardReview({ category, onProgress }: Props) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [stats, setStats] = useState({
    totalReviewed: 0,
    correctAnswers: 0,
    streakDays: 0,
  });

  const categories = ['all', ...new Set(vocabularyWords.map(word => word.category))];

  useEffect(() => {
    // Convert vocabulary words to flashcards
    const newCards = vocabularyWords
      .filter(word => selectedCategory === 'all' || word.category === selectedCategory)
      .map(word => ({
        id: word.id,
        front: word.bosnian,
        back: word.english,
        pronunciation: word.pronunciation,
        category: word.category,
        difficulty: 'medium' as const,
        reviewCount: 0,
        examples: word.examples,
        context: word.context,
      }));

    setCards(newCards.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowPronunciation(false);
  }, [selectedCategory]);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowPronunciation(false);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowPronunciation(false);
    }
  };

  const shuffleCards = () => {
    setCards([...cards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowPronunciation(false);
  };

  const updateCardDifficulty = (newDifficulty: Flashcard['difficulty']) => {
    const now = new Date();
    const nextReviewDate = new Date(now.setDate(now.getDate() + REVIEW_INTERVALS[newDifficulty]));

    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      ...currentCard,
      difficulty: newDifficulty,
      lastReviewed: new Date().toISOString(),
      nextReview: nextReviewDate.toISOString(),
      reviewCount: currentCard.reviewCount + 1,
    };

    setCards(updatedCards);
    setStats(prev => ({
      ...prev,
      totalReviewed: prev.totalReviewed + 1,
      correctAnswers: prev.correctAnswers + (newDifficulty === 'easy' ? 1 : 0),
    }));

    nextCard();
  };

  const playPronunciation = () => {
    if (!currentCard?.front) {
      console.warn('No text available for pronunciation');
      return;
    }

    try {
      const utterance = setupSpeechSynthesis(currentCard.front, 'bs');
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing pronunciation:', error);
    }
  };

  if (!currentCard) return null;

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-white text-center">
        Flashcard Review - {category}
      </h3>
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Select Category:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Progress and Stats */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-300">
              Card {currentIndex + 1} of {cards.length}
            </div>
            <div className="flex space-x-4 text-gray-300">
              <span>Reviewed: {stats.totalReviewed}</span>
              <span>Correct: {stats.correctAnswers}</span>
              <span>Streak: {stats.streakDays} days</span>
            </div>
          </div>

          {/* Flashcard */}
          <div className="relative perspective-1000 mb-8">
            <motion.div
              className={`relative w-full aspect-[3/2] cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              {/* Front */}
              <div
                className={`absolute inset-0 backface-hidden ${
                  isFlipped ? 'invisible' : ''
                }`}
              >
                <div className="h-full bg-white/10 rounded-xl p-8 flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {currentCard.front}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playPronunciation();
                      }}
                      className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      <SpeakerWaveIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPronunciation(!showPronunciation);
                      }}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {showPronunciation ? 'Hide' : 'Show'} Pronunciation
                    </button>
                  </div>
                  {showPronunciation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center"
                    >
                      <p className="text-gray-400 italic">
                        [{currentCard.pronunciation}]
                      </p>
                      {currentCard.context && (
                        <p className="text-gray-400 text-sm mt-2">
                          {currentCard.context}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Back */}
              <div
                className={`absolute inset-0 backface-hidden rotate-y-180 ${
                  !isFlipped ? 'invisible' : ''
                }`}
              >
                <div className="h-full bg-white/10 rounded-xl p-8 flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {currentCard.back}
                  </h2>
                  {currentCard.examples && (
                    <div className="mt-4 text-center">
                      <h3 className="text-gray-300 font-medium mb-2">Examples:</h3>
                      <ul className="text-gray-400 space-y-1">
                        {currentCard.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={previousCard}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleCards}
                className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Shuffle
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextCard}
                disabled={currentIndex === cards.length - 1}
                className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </motion.button>
            </div>

            <AnimatePresence>
              {isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-center space-x-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateCardDifficulty('hard')}
                    className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Hard
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateCardDifficulty('medium')}
                    className="px-6 py-3 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700"
                  >
                    Medium
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateCardDifficulty('easy')}
                    className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Easy
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
} 