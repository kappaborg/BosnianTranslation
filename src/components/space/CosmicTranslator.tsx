'use client';

import { supportedLanguages } from '@/data/languages';
import { getFeatureSupport } from '@/utils/browserSupport';
import { MicrophoneIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Define types for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Props {
  onTranslate: (text: string, from: string, to: string) => Promise<string>;
}

export default function CosmicTranslator({ onTranslate }: Props) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('bs');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([]);
  const [browserSupport, setBrowserSupport] = useState(getFeatureSupport());
  const [showSupportWarning, setShowSupportWarning] = useState(false);

  useEffect(() => {
    const support = getFeatureSupport();
    setBrowserSupport(support);
    setShowSupportWarning(!support.speechRecognition || !support.speechSynthesis);
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = sourceLang;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleTranslate(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        setError('Speech recognition error: ' + event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [sourceLang]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setError(null);
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleTranslate = async (text: string) => {
    if (!text.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    setError(null);
    generateParticles();

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      if (data.translatedText) {
        setOutputText(data.translatedText);
        setError(null);
      } else {
        throw new Error('No translation received');
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError('Translation failed. Please try again.');
      setOutputText('');
    } finally {
      setIsLoading(false);
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
    setOutputText(inputText);
  };

  const handleSpeak = (text: string, lang: string) => {
    if (!text) return;
    
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing pronunciation:', error);
    }
  };

  return (
    <div className="relative bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      {showSupportWarning && browserSupport.recommendations && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-6"
        >
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
            Browser Compatibility Notice
          </h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-300">
            {browserSupport.recommendations.message}
          </p>
          <ul className="mt-2 list-disc list-inside text-sm text-yellow-600 dark:text-yellow-400">
            {browserSupport.recommendations.alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {supportedLanguages.map((lang) => (
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
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative space-y-2 mb-4">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
            className="w-full h-32 bg-white/10 text-white rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="absolute right-2 top-2 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSpeak(inputText, sourceLang)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <SpeakerWaveIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleListening}
              className={`p-2 rounded-full ${
                isListening 
                  ? 'bg-red-500/50 text-white hover:bg-red-500/70' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <MicrophoneIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleTranslate(inputText)}
        disabled={isLoading || !inputText.trim()}
        className={`w-full py-3 rounded-lg text-white font-medium mb-4
          ${isLoading || !inputText.trim()
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
          }`}
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center mb-4"
        >
          {error}
        </motion.div>
      )}

      <div className="relative space-y-2">
        <div className="relative">
          <textarea
            value={outputText}
            readOnly
            placeholder="Translation will appear here..."
            className="w-full h-32 bg-white/10 text-white rounded-lg p-4 pr-12 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSpeak(outputText, targetLang)}
            className="absolute right-2 top-2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <SpeakerWaveIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigator.clipboard.writeText(outputText)}
          className="text-white/70 hover:text-white"
        >
          Copy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setInputText('');
            setOutputText('');
            setError(null);
          }}
          className="text-white/70 hover:text-white"
        >
          Clear
        </motion.button>
      </div>
    </div>
  );
} 