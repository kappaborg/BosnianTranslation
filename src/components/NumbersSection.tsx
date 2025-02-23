'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AudioPronunciation from './AudioPronunciation';

interface NumberItem {
  number: number;
  bosnian: string;
  english: string;
}

const numbers: NumberItem[] = [
  { number: 0, bosnian: 'nula', english: 'zero' },
  { number: 1, bosnian: 'jedan', english: 'one' },
  { number: 2, bosnian: 'dva', english: 'two' },
  { number: 3, bosnian: 'tri', english: 'three' },
  { number: 4, bosnian: 'četiri', english: 'four' },
  { number: 5, bosnian: 'pet', english: 'five' },
  { number: 6, bosnian: 'šest', english: 'six' },
  { number: 7, bosnian: 'sedam', english: 'seven' },
  { number: 8, bosnian: 'osam', english: 'eight' },
  { number: 9, bosnian: 'devet', english: 'nine' },
  { number: 10, bosnian: 'deset', english: 'ten' },
  { number: 11, bosnian: 'jedanaest', english: 'eleven' },
  { number: 12, bosnian: 'dvanaest', english: 'twelve' },
  { number: 13, bosnian: 'trinaest', english: 'thirteen' },
  { number: 14, bosnian: 'četrnaest', english: 'fourteen' },
  { number: 15, bosnian: 'petnaest', english: 'fifteen' },
  { number: 16, bosnian: 'šesnaest', english: 'sixteen' },
  { number: 17, bosnian: 'sedamnaest', english: 'seventeen' },
  { number: 18, bosnian: 'osamnaest', english: 'eighteen' },
  { number: 19, bosnian: 'devetnaest', english: 'nineteen' },
  { number: 20, bosnian: 'dvadeset', english: 'twenty' },
  { number: 30, bosnian: 'trideset', english: 'thirty' },
  { number: 40, bosnian: 'četrdeset', english: 'forty' },
  { number: 50, bosnian: 'pedeset', english: 'fifty' },
  { number: 60, bosnian: 'šezdeset', english: 'sixty' },
  { number: 70, bosnian: 'sedamdeset', english: 'seventy' },
  { number: 80, bosnian: 'osamdeset', english: 'eighty' },
  { number: 90, bosnian: 'devedeset', english: 'ninety' },
  { number: 100, bosnian: 'sto', english: 'hundred' }
];

export default function NumbersSection() {
  const [selectedNumber, setSelectedNumber] = useState<NumberItem | null>(null);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Numbers in Bosnian</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {numbers.map((item) => (
          <motion.div
            key={item.number}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedNumber(item)}
            className={`p-4 rounded-lg cursor-pointer border-2 transition-colors
              ${selectedNumber?.number === item.number
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {item.number}
              </span>
              <AudioPronunciation text={item.bosnian} lang="bs" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{item.bosnian}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{item.english}</div>
          </motion.div>
        ))}
      </div>

      {selectedNumber && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Number Details
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Number:</span> {selectedNumber.number}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Bosnian:</span> {selectedNumber.bosnian}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">English:</span> {selectedNumber.english}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
} 