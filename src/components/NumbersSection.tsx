'use client';

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
  { number: 16, bosnian: 'šesnaest' },
  { number: 17, bosnian: 'sedamnaest' },
  { number: 18, bosnian: 'osamnaest' },
  { number: 19, bosnian: 'devetnaest' },
  { number: 20, bosnian: 'dvadeset' },
  { number: 30, bosnian: 'trideset' },
  { number: 40, bosnian: 'četrdeset' },
  { number: 50, bosnian: 'pedeset' },
  { number: 60, bosnian: 'šezdeset' },
  { number: 70, bosnian: 'sedamdeset' },
  { number: 80, bosnian: 'osamdeset' },
  { number: 90, bosnian: 'devedeset' },
  { number: 100, bosnian: 'sto' },
  { number: 1000, bosnian: 'hiljada' }
];

export default function NumbersSection() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    setShowTranslation(true);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Numbers in Bosnian</h2>
        <p className="text-gray-300">Click on a number to see its Bosnian translation</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {numbers.map(({ number, bosnian }) => (
          <motion.button
            key={number}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNumberClick(number)}
            className={`p-4 rounded-lg transition-all ${
              selectedNumber === number
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <div className="text-xl font-bold">{number}</div>
            {selectedNumber === number && showTranslation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm mt-2"
              >
                {bosnian}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {selectedNumber !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <p className="text-2xl text-white">
            <span className="font-bold">{selectedNumber}</span> in Bosnian is{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {numbers.find(n => n.number === selectedNumber)?.bosnian}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
} 