'use client';

import { translateText } from '@/utils/translation';
import { ArrowsRightLeftIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AudioPronunciation from './AudioPronunciation';

type LanguageCode = 'en' | 'bs' | 'zh';

interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

export default function TranslationBox() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState<LanguageCode>('en');
  const [targetLang, setTargetLang] = useState<LanguageCode>('bs');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    setError(null);
    
    try {
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
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setError(null);
  };

  const getLanguageSelectStyles = (isSource: boolean) => `
    w-full p-2 rounded-lg bg-white dark:bg-gray-800 border-2 
    ${isSource ? 'border-indigo-500' : 'border-purple-500'} 
    text-gray-900 dark:text-white focus:ring-2 
    ${isSource ? 'focus:ring-indigo-500' : 'focus:ring-purple-500'}
    focus:border-transparent
  `;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full md:w-2/5">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value as LanguageCode)}
            className={getLanguageSelectStyles(true)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={switchLanguages}
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
        >
          <ArrowsRightLeftIcon className="w-6 h-6" />
        </motion.button>

        <div className="w-full md:w-2/5">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as LanguageCode)}
            className={getLanguageSelectStyles(false)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
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
              placeholder={`Enter text in ${languages.find(l => l.code === sourceLang)?.name}...`}
              dir={sourceLang === 'zh' ? 'ltr' : 'auto'}
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
              dir={targetLang === 'zh' ? 'ltr' : 'auto'}
            />
            {translatedText && (
              <div className="absolute bottom-4 right-4">
                <AudioPronunciation text={translatedText} lang={targetLang} />
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
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
          }`}
      >
        {isTranslating ? (
          <div className="flex items-center justify-center">
            <LanguageIcon className="w-6 h-6 animate-spin mr-2" />
            <span>Translating...</span>
          </div>
        ) : (
          'Translate'
        )}
      </motion.button>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-3">Tips:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>For better results, write complete sentences</li>
          <li>Chinese translations work best with simplified Chinese characters</li>
          <li>Check the translation accuracy before using it in important communications</li>
          <li>The translation service supports English ↔ Bosnian ↔ Chinese translations</li>
        </ul>
      </div>
    </div>
  );
} 