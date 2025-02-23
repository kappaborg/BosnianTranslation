import { setupSpeechSynthesis } from '@/utils/pronunciation';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

const numbers = Array.from({ length: 101 }, (_, i) => ({
  number: i,
  bosnian: [
    'nula', 'jedan', 'dva', 'tri', 'četiri', 'pet', 'šest', 'sedam', 'osam', 'devet', 'deset',
    'jedanaest', 'dvanaest', 'trinaest', 'četrnaest', 'petnaest', 'šesnaest', 'sedamnaest', 'osamnaest', 'devetnaest', 'dvadeset',
    ...Array.from({ length: 80 }, (_, j) => {
      const tens = Math.floor((j + 20) / 10);
      const ones = (j + 20) % 10;
      const tensWords = ['dvadeset', 'trideset', 'četrdeset', 'pedeset', 'šezdeset', 'sedamdeset', 'osamdeset', 'devedeset', 'sto'];
      return ones === 0 ? tensWords[tens - 2] : `${tensWords[tens - 2]} ${['jedan', 'dva', 'tri', 'četiri', 'pet', 'šest', 'sedam', 'osam', 'devet'][ones - 1]}`;
    })
  ][i],
  pronunciation: [
    'NOO-lah',
    'YEH-dahn',
    'DVAH',
    'TREE',
    'CHEH-tee-ree',
    'PEHT',
    'SHEHST',
    'SEH-dahm',
    'OH-sahm',
    'DEH-veht',
    'DEH-seht',
    'yeh-DAH-nah-ehst',
    'dvah-NAH-ehst',
    'tree-NAH-ehst',
    'cheh-teer-NAH-ehst',
    'peht-NAH-ehst',
    'shehst-NAH-ehst',
    'seh-dahm-NAH-ehst',
    'oh-sahm-NAH-ehst',
    'deh-veht-NAH-ehst',
    'dvah-DEH-seht',
    ...Array.from({ length: 80 }, (_, j) => {
      const tens = Math.floor((j + 20) / 10);
      const ones = (j + 20) % 10;
      const tensWords = [
        'dvah-DEH-seht',
        'tree-DEH-seht',
        'cheh-tehr-DEH-seht',
        'peh-DEH-seht',
        'sheh-zdeh-SEHT',
        'seh-dahm-DEH-seht',
        'oh-sahm-DEH-seht',
        'deh-veh-DEH-seht',
        'STOH'
      ];
      return ones === 0 ? tensWords[tens - 2] : `${tensWords[tens - 2]} ${[
        'YEH-dahn',
        'DVAH',
        'TREE',
        'CHEH-tee-ree',
        'PEHT',
        'SHEHST',
        'SEH-dahm',
        'OH-sahm',
        'DEH-veht'
      ][ones - 1]}`;
    })
  ][i],
}));

export default function NumbersLearning() {
  const [selectedRange, setSelectedRange] = useState<'0-20' | '21-50' | '51-100'>('0-20');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getNumbersForRange = () => {
    switch (selectedRange) {
      case '0-20':
        return numbers.slice(0, 21);
      case '21-50':
        return numbers.slice(21, 51);
      case '51-100':
        return numbers.slice(51, 101);
      default:
        return numbers;
    }
  };

  const filteredNumbers = getNumbersForRange().filter(
    num => 
      num.number.toString().includes(searchQuery) ||
      num.bosnian.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const speakNumber = async (number: typeof numbers[0]) => {
    try {
      window.speechSynthesis.cancel();
      const utterance = setupSpeechSynthesis(number.bosnian, 'bs');
      
      utterance.onend = () => setError(null);
      utterance.onerror = () => setError('Failed to play audio. Please try again.');
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing number:', error);
      setError('Failed to play audio. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedRange('0-20')}
            className={`px-4 py-2 rounded-lg ${
              selectedRange === '0-20'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            0-20
          </button>
          <button
            onClick={() => setSelectedRange('21-50')}
            className={`px-4 py-2 rounded-lg ${
              selectedRange === '21-50'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            21-50
          </button>
          <button
            onClick={() => setSelectedRange('51-100')}
            className={`px-4 py-2 rounded-lg ${
              selectedRange === '51-100'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            51-100
          </button>
        </div>
        <input
          type="text"
          placeholder="Search numbers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-lg bg-red-500/20 text-red-300"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNumbers.map((num) => (
          <motion.div
            key={num.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-2xl font-bold text-white">{num.number}</span>
                <p className="text-gray-300">{num.bosnian}</p>
                <p className="text-sm text-gray-400">{num.pronunciation}</p>
              </div>
              <button
                onClick={() => speakNumber(num)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <SpeakerWaveIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 