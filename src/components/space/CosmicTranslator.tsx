'use client';

import { supportedLanguages } from '@/data/languages';
import { addBosnianPronunciationGuide, enhanceBosnianTranslation, prepareBosnianTranslationParams } from '@/utils/bosnianAccent';
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
  const [showPronunciation, setShowPronunciation] = useState(false);

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
      // MyMemory API kullanarak çeviri yap
      const langPair = `${sourceLang}|${targetLang}`;
      const params = prepareBosnianTranslationParams(text, langPair);
      
      const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      
      if (data.responseData && data.responseData.translatedText) {
        let translatedText = data.responseData.translatedText;
        
        // Hedef dil Boşnakça ise, metni iyileştir
        if (targetLang === 'bs') {
          translatedText = enhanceBosnianTranslation(translatedText);
        }
        
        setOutputText(translatedText);
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
      
      // Boşnakça ses için özel ayarlar
      if (lang === 'bs') {
        // Boşnakça için mümkünse Hırvatça veya Sırpça sesi kullan
        utterance.lang = 'hr'; // Hırvatça sesi Boşnakça'ya yakın
        
        // Hız ve ton ayarları
        utterance.rate = 0.9; // Biraz yavaşlat
        utterance.pitch = 1.1; // Biraz daha yüksek ton
      }
      
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
        className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center space-x-2 
          ${isLoading || !inputText.trim() 
            ? 'bg-purple-500/40 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
          }`}
      >
        {isLoading ? (
          <>
            <span className="animate-pulse">Translating</span>
            <span className="animate-pulse delay-100">.</span>
            <span className="animate-pulse delay-200">.</span>
            <span className="animate-pulse delay-300">.</span>
          </>
        ) : (
          <span>Translate</span>
        )}
      </motion.button>

      {outputText && (
        <div className="mt-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg -z-10" />
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="text-white font-medium">Translation</h3>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPronunciation(!showPronunciation)}
                  className="text-xs text-white/70 hover:text-white"
                >
                  {showPronunciation ? 'Hide Pronunciation' : 'Show Pronunciation'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSpeak(outputText, targetLang)}
                  className="p-1 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <SpeakerWaveIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <div className="bg-black/20 rounded p-3 text-white">
              {targetLang === 'bs' && showPronunciation 
                ? addBosnianPronunciationGuide(outputText)
                : outputText
              }
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Particles Effect */}
      {isLoading && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-purple-500 rounded-full"
              initial={{ x: `${particle.x}%`, y: 0, opacity: 1 }}
              animate={{ 
                y: '100%', 
                opacity: 0,
                x: `${particle.x + (Math.random() * 10 - 5)}%`
              }}
              transition={{ 
                duration: 1 + Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
} 