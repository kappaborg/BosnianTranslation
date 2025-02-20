'use client';

import { motion } from 'framer-motion';
import AudioPronunciation from './AudioPronunciation';

interface Phrase {
  english: string;
  bosnian: string;
  pronunciation: string;
}

interface Category {
  name: string;
  phrases: Phrase[];
}

const categories: Category[] = [
  {
    name: 'Numbers',
    phrases: [
      { english: 'One', bosnian: 'Jedan', pronunciation: 'YEH-dahn' },
      { english: 'Two', bosnian: 'Dva', pronunciation: 'dvah' },
      { english: 'Three', bosnian: 'Tri', pronunciation: 'tree' },
      { english: 'Four', bosnian: 'Četiri', pronunciation: 'CHEH-tee-ree' },
      { english: 'Five', bosnian: 'Pet', pronunciation: 'pet' },
    ]
  },
  {
    name: 'Food & Drinks',
    phrases: [
      { english: 'Water', bosnian: 'Voda', pronunciation: 'VOH-dah' },
      { english: 'Coffee', bosnian: 'Kafa', pronunciation: 'KAH-fah' },
      { english: 'Bread', bosnian: 'Hljeb', pronunciation: 'hlyeb' },
      { english: 'Milk', bosnian: 'Mlijeko', pronunciation: 'mlee-YEH-koh' },
      { english: 'Tea', bosnian: 'Čaj', pronunciation: 'chai' },
    ]
  },
  {
    name: 'Days of the Week',
    phrases: [
      { english: 'Monday', bosnian: 'Ponedjeljak', pronunciation: 'poh-neh-DYEH-lyahk' },
      { english: 'Tuesday', bosnian: 'Utorak', pronunciation: 'OO-toh-rahk' },
      { english: 'Wednesday', bosnian: 'Srijeda', pronunciation: 'SREE-eh-dah' },
      { english: 'Thursday', bosnian: 'Četvrtak', pronunciation: 'CHET-vr-tahk' },
      { english: 'Friday', bosnian: 'Petak', pronunciation: 'PEH-tahk' },
    ]
  }
];

export default function Categories() {
  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="bg-indigo-50 p-4">
            <h3 className="text-lg font-semibold text-indigo-900">{category.name}</h3>
          </div>
          <div className="divide-y">
            {category.phrases.map((phrase, phraseIndex) => (
              <motion.div
                key={phraseIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: phraseIndex * 0.1 }}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">{phrase.english}</p>
                    <p className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
                      {phrase.bosnian}
                      <AudioPronunciation text={phrase.bosnian} lang="bs" />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Pronunciation:</p>
                    <p className="text-sm font-medium text-gray-700">{phrase.pronunciation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 