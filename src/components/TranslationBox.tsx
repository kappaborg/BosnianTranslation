'use client';

import { translateText } from '@/utils/translation';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AudioPronunciation from './AudioPronunciation';

export default function TranslationBox() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState<'en' | 'bs'>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    setError(null);
    
    try {
      const targetLang = sourceLang === 'en' ? 'bs' : 'en';
      const result = await translateText(sourceText, sourceLang, targetLang);
      setTranslatedText(result);
    } catch (err) {
      setError('Translation failed. Please try again later.');
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  const switchLanguages = () => {
    setSourceLang(sourceLang === 'en' ? 'bs' : 'en');
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {sourceLang === 'en' ? 'English' : 'Bosnian'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Source Language
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={switchLanguages}
          className="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
        >
          <ArrowsRightLeftIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </motion.button>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {sourceLang === 'en' ? 'Bosnian' : 'English'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Target Language
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="relative">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="w-full h-48 p-4 text-lg border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                dark:bg-gray-800 dark:text-white dark:border-gray-600
                placeholder-gray-400 dark:placeholder-gray-500
                shadow-sm"
              placeholder={`Enter ${sourceLang === 'en' ? 'English' : 'Bosnian'} text...`}
            />
            {sourceText && (
              <div className="absolute bottom-4 right-4">
                <AudioPronunciation text={sourceText} lang={sourceLang} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <textarea
              value={translatedText}
              readOnly
              className="w-full h-48 p-4 text-lg bg-gray-50 dark:bg-gray-900 border-2 rounded-lg
                dark:text-white dark:border-gray-600
                font-medium text-indigo-700 dark:text-indigo-300
                shadow-sm"
              placeholder="Translation will appear here..."
            />
            {translatedText && (
              <div className="absolute bottom-4 right-4">
                <AudioPronunciation text={translatedText} lang={sourceLang === 'en' ? 'bs' : 'en'} />
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleTranslate}
        disabled={isTranslating || !sourceText.trim()}
        className={`mt-6 w-full py-4 px-6 rounded-lg text-white font-medium text-lg shadow-md
          ${isTranslating || !sourceText.trim()
            ? 'bg-indigo-400 dark:bg-indigo-500/50 cursor-not-allowed'
            : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
          }`}
      >
        {isTranslating ? 'Translating...' : 'Translate'}
      </motion.button>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-3">Tips:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>For better results, write complete sentences</li>
          <li>Check the translation accuracy before using it in important communications</li>
          <li>The translation service is powered by MyMemory Translation API</li>
        </ul>
      </div>
    </div>
  );
} 