'use client';

import { setupSpeechSynthesis } from '@/utils/pronunciation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const numbers = [
  { number: 0, bosnian: 'nula' },
  { number: 1, bosnian: 'jedan' },
  { number: 2, bosnian: 'dva' },
  { number: 3, bosnian: 'tri' },
  { number: 4, bosnian: 'četiri' },
  { number: 5, bosnian: 'pet' },
  { number: 6, bosnian: 'šest' },
  { number: 7, bosnian: 'sedam' },
  { number: 8, bosnian: 'osam' },
  { number: 9, bosnian: 'devet' },
  { number: 10, bosnian: 'deset' },
  { number: 11, bosnian: 'jedanaest' },
  { number: 12, bosnian: 'dvanaest' },
  { number: 13, bosnian: 'trinaest' },
  { number: 14, bosnian: 'četrnaest' },
  { number: 15, bosnian: 'petnaest' },
  { number: 20, bosnian: 'dvadeset' },
  { number: 30, bosnian: 'trideset' },
  { number: 40, bosnian: 'četrdeset' },
  { number: 50, bosnian: 'pedeset' },
  { number: 100, bosnian: 'sto' },
  { number: 1000, bosnian: 'hiljada' },
];

export default function NumbersSection() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPronunciation = (text: string) => {
    if (isPlaying) return;

    setIsPlaying(true);
    const utterance = setupSpeechSynthesis(text, 'bs');
    
    utterance.onend = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Numbers in Bosnian</h2>
        <p className="text-gray-400">Learn how to count in Bosnian</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {numbers.map((item) => (
          <motion.button
            key={item.number}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedNumber(item.number);
              playPronunciation(item.bosnian);
            }}
            className={`p-4 rounded-xl transition-all ${
              selectedNumber === item.number
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <div className="text-2xl font-bold mb-2">{item.number}</div>
            <div className="text-lg">{item.bosnian}</div>
          </motion.button>
        ))}
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Tips:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Click on any number to hear its pronunciation</li>
          <li>Numbers 11-19 follow the pattern: base number + "naest"</li>
          <li>Tens (20, 30, etc.) usually end with "deset"</li>
          <li>Practice saying each number out loud</li>
        </ul>
      </div>
    </div>
  );
} 