'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  onTranslate: (text: string, from: string, to: string) => Promise<string>;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

export default function CosmicTranslator({ onTranslate }: Props) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('bs');
  const [isTranslating, setIsTranslating] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([]);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    generateParticles();

    try {
      const result = await onTranslate(inputText, sourceLang, targetLang);
      setOutputText(result);
    } catch (error) {
      console.error('Translation error:', error);
      setOutputText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const generateParticles = () => {
    const newParticles = Array.from({ length: 10 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div className="relative bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      {/* Language Selection */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={swapLanguages}
          className="mx-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          ⇄
        </motion.button>

        <div className="flex-1">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input Text Area */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
        className="w-full h-32 bg-white/10 text-white rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Translate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleTranslate}
        disabled={isTranslating || !inputText.trim()}
        className={`w-full py-3 rounded-lg text-white font-medium mb-4
          ${isTranslating || !inputText.trim()
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
          }`}
      >
        {isTranslating ? 'Translating...' : 'Translate'}
      </motion.button>

      {/* Output Text Area */}
      <div className="relative">
        <textarea
          value={outputText}
          readOnly
          placeholder="Translation will appear here..."
          className="w-full h-32 bg-white/10 text-white rounded-lg p-4 focus:outline-none"
        />

        {/* Floating Particles */}
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            initial={{ x: `${particle.x}%`, y: '0%', opacity: 1 }}
            animate={{
              x: `${particle.x}%`,
              y: '100%',
              opacity: 0,
            }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => {
              if (index === particles.length - 1) {
                setParticles([]);
              }
            }}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={() => {
            navigator.clipboard.writeText(outputText);
          }}
          className="text-white/70 hover:text-white"
        >
          Copy
        </button>
        <button
          onClick={() => {
            setInputText('');
            setOutputText('');
          }}
          className="text-white/70 hover:text-white"
        >
          Clear
        </button>
      </div>
    </div>
  );
} 