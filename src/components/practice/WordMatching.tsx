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
}

const wordPairs: Omit<MatchingWord, 'matched'>[] = [
  {
    id: '1',
    bosnian: 'kuća',
    english: 'house',
    pronunciation: 'KOO-cha'
  },
  {
    id: '2',
    bosnian: 'mačka',
    english: 'cat',
    pronunciation: 'MAHCH-kah'
  },
  {
    id: '3',
    bosnian: 'pas',
    english: 'dog',
    pronunciation: 'pahs'
  },
  {
    id: '4',
    bosnian: 'drvo',
    english: 'tree',
    pronunciation: 'DR-voh'
  },
  {
    id: '5',
    bosnian: 'knjiga',
    english: 'book',
    pronunciation: 'KNYEE-gah'
  }
];

export default function WordMatching() {
  const [words, setWords] = useState<MatchingWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Initialize game with shuffled words
    const shuffledWords = [...wordPairs].map(word => ({ ...word, matched: false }));
    setWords(shuffledWords);
  }, []);

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
          setScore(score + 1);

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