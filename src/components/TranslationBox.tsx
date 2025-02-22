'use client';

import { translateText } from '@/utils/translation';
import { ArrowsRightLeftIcon, LanguageIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
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
  const [error, setError] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    setError(null);

    try {
      const result = await translateText(sourceText, sourceLang, targetLang);
      setTranslatedText(result);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const switchLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const getLanguageSelectStyles = (isSource: boolean) => `
    w-full p-2 rounded-lg bg-white dark:bg-gray-800 border-2 
    ${isSource ? 'border-indigo-500' : 'border-purple-500'} 
    text-gray-900 dark:text-white focus:ring-2 
    ${isSource ? 'focus:ring-indigo-500' : 'focus:ring-purple-500'}
    focus:border-transparent
  `;

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={switchLanguages}
          className="mx-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowsRightLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </motion.button>

        <div className="flex-1">
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
        {/* Source Text */}
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
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AudioPronunciation text={sourceText} lang={sourceLang} />
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Translated Text */}
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
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AudioPronunciation text={translatedText} lang={targetLang} />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Translate Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTranslate}
          disabled={!sourceText.trim() || isTranslating}
          className={`px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2
            ${isTranslating || !sourceText.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
          <LanguageIcon className="w-5 h-5" />
          <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
        </motion.button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

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