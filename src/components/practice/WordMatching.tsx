'use client';

import { setupSpeechSynthesis } from '@/utils/pronunciation';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MatchingWord {
  id: string;
  bosnian: string;
  english: string;
  pronunciation: string;
  matched: boolean;
  category: string;
}

const wordPairs: Omit<MatchingWord, 'matched'>[] = [
  // Greetings
  {
    id: 'g1',
    bosnian: 'zdravo',
    english: 'hello',
    pronunciation: 'ZDRAH-voh',
    category: 'greetings'
  },
  {
    id: 'g2',
    bosnian: 'doviđenja',
    english: 'goodbye',
    pronunciation: 'doh-vee-JEN-yah',
    category: 'greetings'
  },
  // Common Phrases
  {
    id: 'p1',
    bosnian: 'kako si',
    english: 'how are you',
    pronunciation: 'KAH-koh see',
    category: 'phrases'
  },
  {
    id: 'p2',
    bosnian: 'hvala',
    english: 'thank you',
    pronunciation: 'HVAH-lah',
    category: 'phrases'
  },
  // Questions
  {
    id: 'q1',
    bosnian: 'gdje',
    english: 'where',
    pronunciation: 'g-dyeh',
    category: 'questions'
  },
  {
    id: 'q2',
    bosnian: 'kada',
    english: 'when',
    pronunciation: 'KAH-dah',
    category: 'questions'
  },
  // Food and Drink
  {
    id: 'f1',
    bosnian: 'hljeb',
    english: 'bread',
    pronunciation: 'hlyeb',
    category: 'food'
  },
  {
    id: 'f2',
    bosnian: 'voda',
    english: 'water',
    pronunciation: 'VOH-dah',
    category: 'food'
  },
  // Weather
  {
    id: 'w1',
    bosnian: 'sunce',
    english: 'sun',
    pronunciation: 'SOON-tseh',
    category: 'weather'
  },
  {
    id: 'w2',
    bosnian: 'kiša',
    english: 'rain',
    pronunciation: 'KEE-shah',
    category: 'weather'
  },
  // Time
  {
    id: 't1',
    bosnian: 'danas',
    english: 'today',
    pronunciation: 'DAH-nahs',
    category: 'time'
  },
  {
    id: 't2',
    bosnian: 'sutra',
    english: 'tomorrow',
    pronunciation: 'SOO-trah',
    category: 'time'
  },
  // Family
  {
    id: 'fm1',
    bosnian: 'majka',
    english: 'mother',
    pronunciation: 'MY-kah',
    category: 'family'
  },
  {
    id: 'fm2',
    bosnian: 'otac',
    english: 'father',
    pronunciation: 'OH-tahts',
    category: 'family'
  }
];

interface Props {
  category: string;
  onScoreUpdate: (score: number) => void;
}

export default function WordMatching({ category, onScoreUpdate }: Props) {
  const [words, setWords] = useState<MatchingWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(category);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    // Initialize game with shuffled words
    const filteredWords = wordPairs.filter(word => 
      selectedCategory === 'all' || word.category === selectedCategory
    );
    const shuffledWords = [...filteredWords].map(word => ({ ...word, matched: false }));
    setWords(shuffledWords);
    setScore(0);
    setAttempts(0);
    onScoreUpdate(0);
  }, [selectedCategory, onScoreUpdate]);

  const handleWordClick = (wordId: string) => {
    const word = words.find(w => w.id === wordId);
    if (!word || word.matched) return;

    if (selectedWord === null) {
      setSelectedWord(wordId);
    } else {
      const firstWord = words.find(w => w.id === selectedWord);
      const secondWord = word;

      if (firstWord && secondWord) {
        setAttempts(attempts + 1);
        
        if (firstWord.english === secondWord.english || firstWord.bosnian === secondWord.bosnian) {
          // Match found
          const updatedWords = words.map(w => 
            (w.id === firstWord.id || w.id === secondWord.id)
              ? { ...w, matched: true }
              : w
          );
          setWords(updatedWords);
          const newScore = score + 1;
          setScore(newScore);
          onScoreUpdate(newScore);

          // Check if game is complete
          if (updatedWords.every(w => w.matched)) {
            setGameComplete(true);
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
          }
        }
      }
      setSelectedWord(null);
    }
  };

  const playPronunciation = (word: string) => {
    const utterance = setupSpeechSynthesis(word, 'bs');
    window.speechSynthesis.speak(utterance);
  };

  const resetGame = () => {
    const shuffledWords = [...wordPairs]
      .sort(() => Math.random() - 0.5)
      .map(word => ({ ...word, matched: false }));
    setWords(shuffledWords);
    setSelectedWord(null);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Word Matching</h2>
          <p className="text-gray-400">
            Score: {score} | Attempts: {attempts}
          </p>
        </div>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Bosnian Words */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Bosnian</h3>
          {words.map(word => (
            <motion.div
              key={`bosnian-${word.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg cursor-pointer flex justify-between items-center ${
                word.matched
                  ? 'bg-green-500/20 text-green-300'
                  : selectedWord === word.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              onClick={() => !word.matched && handleWordClick(word.id)}
            >
              <span>{word.bosnian}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playPronunciation(word.bosnian);
                }}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <SpeakerWaveIcon className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* English Words */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">English</h3>
          {words
            .sort(() => Math.random() - 0.5)
            .map(word => (
              <motion.div
                key={`english-${word.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg cursor-pointer ${
                  word.matched
                    ? 'bg-green-500/20 text-green-300'
                    : selectedWord === word.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => !word.matched && handleWordClick(word.id)}
              >
                {word.english}
              </motion.div>
            ))}
        </div>
      </div>

      {showCelebration && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-indigo-900/90 backdrop-blur-sm rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Congratulations! 🎉
            </h3>
            <p className="text-gray-300">
              You completed the game in {attempts} attempts!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
} 