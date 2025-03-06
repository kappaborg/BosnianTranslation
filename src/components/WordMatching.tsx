'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Word {
  bosnian: string;
  english: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pronunciation?: string;
}

const wordDatabase: Word[] = [
  // Greetings & Basic Phrases (Easy)
  { bosnian: 'Zdravo', english: 'Hello', category: 'Greetings', difficulty: 'easy', pronunciation: 'zdrah-voh' },
  { bosnian: 'Hvala', english: 'Thank you', category: 'Greetings', difficulty: 'easy', pronunciation: 'hva-la' },
  { bosnian: 'Molim', english: 'Please', category: 'Greetings', difficulty: 'easy', pronunciation: 'mo-leem' },
  { bosnian: 'Dobar dan', english: 'Good day', category: 'Greetings', difficulty: 'easy', pronunciation: 'doh-bar dan' },
  { bosnian: 'Kako si', english: 'How are you', category: 'Greetings', difficulty: 'easy', pronunciation: 'ka-ko see' },
  { bosnian: 'Dobro', english: 'Good', category: 'Greetings', difficulty: 'easy', pronunciation: 'doh-bro' },
  
  // Numbers (Easy)
  { bosnian: 'Jedan', english: 'One', category: 'Numbers', difficulty: 'easy', pronunciation: 'yeh-dan' },
  { bosnian: 'Dva', english: 'Two', category: 'Numbers', difficulty: 'easy', pronunciation: 'dva' },
  { bosnian: 'Tri', english: 'Three', category: 'Numbers', difficulty: 'easy', pronunciation: 'tree' },
  { bosnian: 'Četiri', english: 'Four', category: 'Numbers', difficulty: 'easy', pronunciation: 'che-tee-ree' },
  { bosnian: 'Pet', english: 'Five', category: 'Numbers', difficulty: 'easy', pronunciation: 'pet' },

  // Food & Drinks (Medium)
  { bosnian: 'Kafa', english: 'Coffee', category: 'Food', difficulty: 'medium', pronunciation: 'ka-fa' },
  { bosnian: 'Čaj', english: 'Tea', category: 'Food', difficulty: 'medium', pronunciation: 'chai' },
  { bosnian: 'Hljeb', english: 'Bread', category: 'Food', difficulty: 'medium', pronunciation: 'hlyeb' },
  { bosnian: 'Mlijeko', english: 'Milk', category: 'Food', difficulty: 'medium', pronunciation: 'mlee-ye-ko' },
  { bosnian: 'Voda', english: 'Water', category: 'Food', difficulty: 'medium', pronunciation: 'vo-da' },

  // Common Verbs (Medium)
  { bosnian: 'Raditi', english: 'To work', category: 'Verbs', difficulty: 'medium', pronunciation: 'ra-dee-tee' },
  { bosnian: 'Spavati', english: 'To sleep', category: 'Verbs', difficulty: 'medium', pronunciation: 'spa-va-tee' },
  { bosnian: 'Jesti', english: 'To eat', category: 'Verbs', difficulty: 'medium', pronunciation: 'yes-tee' },
  { bosnian: 'Piti', english: 'To drink', category: 'Verbs', difficulty: 'medium', pronunciation: 'pee-tee' },
  { bosnian: 'Učiti', english: 'To learn', category: 'Verbs', difficulty: 'medium', pronunciation: 'u-chee-tee' },

  // Advanced Phrases (Hard)
  { bosnian: 'Kako se kaže', english: 'How do you say', category: 'Phrases', difficulty: 'hard', pronunciation: 'ka-ko seh ka-zheh' },
  { bosnian: 'Ne razumijem', english: 'I don\'t understand', category: 'Phrases', difficulty: 'hard', pronunciation: 'neh ra-zu-mee-yem' },
  { bosnian: 'Drago mi je', english: 'Nice to meet you', category: 'Phrases', difficulty: 'hard', pronunciation: 'dra-go mee yeh' },
  { bosnian: 'Izvini', english: 'Excuse me', category: 'Phrases', difficulty: 'hard', pronunciation: 'eez-vee-nee' },
  { bosnian: 'Vidimo se', english: 'See you later', category: 'Phrases', difficulty: 'hard', pronunciation: 'vee-dee-mo seh' }
];

interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard' | 'all';
  category: string;
  wordsPerRound: number;
  showPronunciation: boolean;
}

export default function WordMatching() {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedBosnian, setSelectedBosnian] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shuffledBosnian, setShuffledBosnian] = useState<string[]>([]);
  const [shuffledEnglish, setShuffledEnglish] = useState<string[]>([]);
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'easy',
    category: 'all',
    wordsPerRound: 6,
    showPronunciation: true
  });
  const [showSettings, setShowSettings] = useState(false);

  const categories = Array.from(new Set(wordDatabase.map(w => w.category)));

  const filterWords = (words: Word[]): Word[] => {
    return words.filter(word => 
      (settings.difficulty === 'all' || word.difficulty === settings.difficulty) &&
      (settings.category === 'all' || word.category === settings.category)
    );
  };

  const startNewGame = () => {
    const filteredWords = filterWords(wordDatabase);
    const gameWords = [...filteredWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, settings.wordsPerRound);
    
    setWords(gameWords);
    setShuffledBosnian(gameWords.map(w => w.bosnian).sort(() => Math.random() - 0.5));
    setShuffledEnglish(gameWords.map(w => w.english).sort(() => Math.random() - 0.5));
    setMatchedPairs(new Set());
    setScore(0);
    setStreak(0);
    setSelectedBosnian(null);
    setSelectedEnglish(null);
  };

  useEffect(() => {
    startNewGame();
  }, [settings]);

  const handleWordClick = (word: string, isBosnian: boolean) => {
    if (isBosnian) {
      setSelectedBosnian(selectedBosnian === word ? null : word);
    } else {
      setSelectedEnglish(selectedEnglish === word ? null : word);
    }
  };

  useEffect(() => {
    if (selectedBosnian && selectedEnglish) {
      const matchingWord = words.find(w => w.bosnian === selectedBosnian);
      if (matchingWord && matchingWord.english === selectedEnglish) {
        // Correct match
        setMatchedPairs(prev => new Set([...prev, selectedBosnian]));
        const bonus = streak >= 2 ? 5 : 0; // Bonus points for streaks
        const difficultyMultiplier = 
          matchingWord.difficulty === 'hard' ? 2 :
          matchingWord.difficulty === 'medium' ? 1.5 : 1;
        
        const points = Math.round((10 + bonus) * difficultyMultiplier);
        setScore(prev => {
          const newScore = prev + points;
          setHighScore(current => Math.max(current, newScore));
          return newScore;
        });
        setStreak(prev => prev + 1);
      } else {
        // Wrong match
        setTimeout(() => {
          setScore(prev => Math.max(0, prev - 5));
          setStreak(0);
        }, 500);
      }
      setTimeout(() => {
        setSelectedBosnian(null);
        setSelectedEnglish(null);
      }, 1000);
    }
  }, [selectedBosnian, selectedEnglish, words, streak]);

  const isWordMatched = (word: string) => matchedPairs.has(word);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Match the Words</h2>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-lg">Score: {score}</p>
            <p className="text-sm text-gray-400">High Score: {highScore}</p>
            {streak >= 2 && (
              <p className="text-sm text-yellow-500">Streak: {streak}🔥</p>
            )}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ⚙️ Settings
            </button>
            <button
              onClick={startNewGame}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Game
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 rounded-lg p-4 mb-6"
          >
            <h3 className="text-lg font-semibold mb-4">Game Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Difficulty</label>
                <select
                  value={settings.difficulty}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    difficulty: e.target.value as GameSettings['difficulty']
                  }))}
                  className="w-full bg-gray-700 rounded-lg p-2"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Category</label>
                <select
                  value={settings.category}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    category: e.target.value
                  }))}
                  className="w-full bg-gray-700 rounded-lg p-2"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Words per Round</label>
                <select
                  value={settings.wordsPerRound}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    wordsPerRound: Number(e.target.value)
                  }))}
                  className="w-full bg-gray-700 rounded-lg p-2"
                >
                  <option value="4">4 Words</option>
                  <option value="6">6 Words</option>
                  <option value="8">8 Words</option>
                  <option value="10">10 Words</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.showPronunciation}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      showPronunciation: e.target.checked
                    }))}
                    className="form-checkbox h-5 w-5"
                  />
                  <span className="text-sm">Show Pronunciation</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bosnian Words */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Bosnian</h3>
          <div className="space-y-2">
            {shuffledBosnian.map((word) => {
              const currentWord = words.find(w => w.bosnian === word);
              return (
                <motion.button
                  key={word}
                  onClick={() => !isWordMatched(word) && handleWordClick(word, true)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    isWordMatched(word)
                      ? 'bg-green-600 text-white cursor-default'
                      : selectedBosnian === word
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  whileHover={!isWordMatched(word) ? { scale: 1.02 } : {}}
                  whileTap={!isWordMatched(word) ? { scale: 0.98 } : {}}
                >
                  <div>
                    {word}
                    {settings.showPronunciation && currentWord?.pronunciation && (
                      <div className="text-sm text-gray-400 mt-1">
                        /{currentWord.pronunciation}/
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* English Words */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">English</h3>
          <div className="space-y-2">
            {shuffledEnglish.map((word) => {
              const matchingBosnian = words.find(w => w.english === word)?.bosnian;
              const isMatched = matchingBosnian ? isWordMatched(matchingBosnian) : false;

              return (
                <motion.button
                  key={word}
                  onClick={() => !isMatched && handleWordClick(word, false)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    isMatched
                      ? 'bg-green-600 text-white cursor-default'
                      : selectedEnglish === word
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  whileHover={!isMatched ? { scale: 1.02 } : {}}
                  whileTap={!isMatched ? { scale: 0.98 } : {}}
                >
                  {word}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {matchedPairs.size === words.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <h3 className="text-2xl font-bold text-green-500 mb-4">
            Congratulations! You matched all words!
          </h3>
          <div className="space-y-2 mb-6">
            <p className="text-lg">Final Score: {score}</p>
            {score > highScore && (
              <p className="text-yellow-500">New High Score! 🏆</p>
            )}
            {streak >= 3 && (
              <p className="text-orange-500">Amazing Streak: {streak}��</p>
            )}
          </div>
          <button
            onClick={startNewGame}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
} 