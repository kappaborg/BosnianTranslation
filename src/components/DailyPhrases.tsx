'use client';

import AudioPronunciation from '@/components/AudioPronunciation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Phrase {
  bosnian: string;
  english: string;
  category: string;
}

const phrases: Phrase[] = [
  // Greetings
  { bosnian: 'Dobar dan', english: 'Good day', category: 'Greetings' },
  { bosnian: 'Dobro jutro', english: 'Good morning', category: 'Greetings' },
  { bosnian: 'Dobro veče', english: 'Good evening', category: 'Greetings' },
  { bosnian: 'Laku noć', english: 'Good night', category: 'Greetings' },
  { bosnian: 'Kako ste?', english: 'How are you? (formal)', category: 'Greetings' },
  { bosnian: 'Kako si?', english: 'How are you? (informal)', category: 'Greetings' },
  
  // Common Expressions
  { bosnian: 'Hvala lijepo', english: 'Thank you very much', category: 'Common Expressions' },
  { bosnian: 'Nema na čemu', english: "You're welcome", category: 'Common Expressions' },
  { bosnian: 'Izvinite', english: 'Excuse me (formal)', category: 'Common Expressions' },
  { bosnian: 'Izvini', english: 'Excuse me (informal)', category: 'Common Expressions' },
  { bosnian: 'Molim vas', english: 'Please (formal)', category: 'Common Expressions' },
  
  // Questions
  { bosnian: 'Gdje je...?', english: 'Where is...?', category: 'Questions' },
  { bosnian: 'Koliko košta?', english: 'How much does it cost?', category: 'Questions' },
  { bosnian: 'Kako se zoveš?', english: 'What is your name?', category: 'Questions' },
  { bosnian: 'Odakle si?', english: 'Where are you from?', category: 'Questions' },
  { bosnian: 'Šta radiš?', english: 'What are you doing?', category: 'Questions' },
  
  // Food & Drinks
  { bosnian: 'Želim kafu', english: 'I want coffee', category: 'Food & Drinks' },
  { bosnian: 'Mogu li dobiti vodu?', english: 'Can I get water?', category: 'Food & Drinks' },
  { bosnian: 'Prijatno', english: 'Enjoy your meal', category: 'Food & Drinks' },
  { bosnian: 'Žedan/Žedna sam', english: 'I am thirsty', category: 'Food & Drinks' },
  { bosnian: 'Gladan/Gladna sam', english: 'I am hungry', category: 'Food & Drinks' },
  
  // Directions
  { bosnian: 'Lijevo', english: 'Left', category: 'Directions' },
  { bosnian: 'Desno', english: 'Right', category: 'Directions' },
  { bosnian: 'Pravo', english: 'Straight', category: 'Directions' },
  { bosnian: 'Nazad', english: 'Back', category: 'Directions' },
  { bosnian: 'Blizu', english: 'Near', category: 'Directions' },
  
  // Weather
  { bosnian: 'Danas je lijepo vrijeme', english: 'Today is nice weather', category: 'Weather' },
  { bosnian: 'Pada kiša', english: "It's raining", category: 'Weather' },
  { bosnian: 'Sunčano je', english: "It's sunny", category: 'Weather' },
  { bosnian: 'Hladno je', english: "It's cold", category: 'Weather' },
  { bosnian: 'Toplo je', english: "It's warm", category: 'Weather' }
];

export default function DailyPhrases() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...new Set(phrases.map(phrase => phrase.category))];
  
  const filteredPhrases = selectedCategory === 'All' 
    ? phrases 
    : phrases.filter(phrase => phrase.category === selectedCategory);

  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // In a real app, fetch from API
    setPhrases(phrases);
  }, []);

  const nextPhrase = () => {
    setCurrentIndex((prev) => (prev + 1) % phrases.length);
  };

  const previousPhrase = () => {
    setCurrentIndex((prev) => (prev - 1 + phrases.length) % phrases.length);
  };

  if (phrases.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  const phrase = phrases[currentIndex];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Daily Phrases</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPhrases.map((phrase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {phrase.bosnian}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {phrase.english}
                </p>
              </div>
              <AudioPronunciation text={phrase.bosnian} lang="bs" />
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400">
              {phrase.category}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={previousPhrase}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200
            dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
            soft:bg-gray-200 soft:text-gray-700 soft:hover:bg-gray-300"
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextPhrase}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Next
        </motion.button>
      </div>
    </div>
  );
} 