'use client';

import type { Phrase } from '@/data/phrases';
import { phrases } from '@/data/phrases';
import { getBosnianVoice, improveBosnianPronunciation, isVoiceSuitableForBosnian, setupSpeechSynthesis } from '@/utils/pronunciation';
import { MicrophoneIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Categories from './Categories';
import DragDropQuiz from './DragDropQuiz';
import NumbersLearning from './NumbersLearning';
import Quiz from './Quiz';

type Tab = 'phrases' | 'quiz' | 'dragdrop' | 'categories' | 'numbers' | 'grammar';

export default function LearningSection() {
  const [selectedTab, setSelectedTab] = useState<Tab>('phrases');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [spokenText, setSpokenText] = useState('');
  const [feedback, setFeedback] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Filter phrases based on selected category
  const filteredPhrases = selectedCategory === 'all' 
    ? phrases 
    : phrases.filter(phrase => phrase.category === selectedCategory);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setIsListening(false);
        
        if (selectedPhrase) {
          const correctText = selectedPhrase.bosnian.toLowerCase();
          const similarity = compareTexts(transcript, correctText);
          
          if (similarity > 0.8) {
            setFeedback('Perfect pronunciation! 🎉');
          } else if (similarity > 0.6) {
            setFeedback('Good try! Keep practicing! 👍');
          } else {
            setFeedback(`Try again! The correct pronunciation is "${selectedPhrase.bosnian}"`);
          }
        }
      };

      recognition.onerror = (event: any) => {
        setFeedback('Speech recognition error. Please try again.');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [selectedPhrase]);

  // Helper function to compare text similarity
  const compareTexts = (text1: string, text2: string) => {
    const maxLength = Math.max(text1.length, text2.length);
    let matches = 0;
    
    for (let i = 0; i < maxLength; i++) {
      if (text1[i] === text2[i]) matches++;
    }
    
    return matches / maxLength;
  };

  const startListening = (phrase: Phrase) => {
    if (recognition) {
      setSelectedPhrase(phrase);
      recognition.lang = 'hr-HR'; // Using Croatian for Bosnian
      recognition.start();
      setIsListening(true);
      setFeedback('');
    } else {
      setFeedback('Speech recognition is not supported in your browser');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakText = async (text: string, lang: 'en' | 'bs' | 'zh') => {
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Get available voices
      let voices = window.speechSynthesis.getVoices();
      
      // If voices haven't loaded yet, wait for them
      if (voices.length === 0) {
        await new Promise<void>((resolve) => {
          const voicesChangedHandler = () => {
            voices = window.speechSynthesis.getVoices();
            window.speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
            resolve();
          };
          window.speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler);
        });
      }

      // For Bosnian text, apply special preprocessing
      const processedText = lang === 'bs' ? improveBosnianPronunciation(text) : text;
      
      // Setup utterance with proper pronunciation handling
      const utterance = setupSpeechSynthesis(processedText, lang);
      
      // Get appropriate voice
      let voice;
      if (lang === 'bs') {
        voice = getBosnianVoice(voices);
        if (!voice) {
          console.warn('No suitable voice found for Bosnian, using Croatian fallback');
          voice = voices.find(v => v.lang === 'hr-HR');
        }
        
        // If no Slavic voice is found, use English voice with modified pronunciation
        if (!voice || !isVoiceSuitableForBosnian(voice)) {
          voice = voices.find(v => v.lang === 'en-US');
          utterance.rate = 0.7; // Even slower for English voice speaking Bosnian
          utterance.pitch = 1.2; // Higher pitch for better Slavic sound approximation
        }
      } else {
        voice = voices.find(v => v.lang.toLowerCase().startsWith(lang));
      }

      if (voice) {
        utterance.voice = voice;
      } else {
        console.warn(`No voice found for ${lang}, using default voice`);
      }

      // Add error handling
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setError('Failed to play audio. Please try again.');
      };

      // Add success feedback
      utterance.onend = () => {
        setError(null);
        console.log('Speech synthesis completed successfully');
      };

      // Add word boundary event for better timing
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          // Adjust timing for better pronunciation
          utterance.rate = lang === 'bs' ? 0.75 : 1.0;
        }
      };

      // Add pause between words for clearer pronunciation
      if (lang === 'bs') {
        utterance.text = processedText.split(' ').join(', ');
      }

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setError('An error occurred while playing audio. Please try again.');
    }
  };

  // Add pronunciation feedback system
  const providePronunciationFeedback = (spokenText: string, correctText: string) => {
    const similarity = compareTexts(spokenText.toLowerCase(), correctText.toLowerCase());
    if (similarity > 0.8) {
      return "Perfect pronunciation! 🌟";
    } else if (similarity > 0.6) {
      return "Good try! Keep practicing. 👍";
    } else {
      return "Let's practice more. Listen carefully and try again. 💪";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn Bosnian</h2>
        <p className="text-gray-600 mb-6">
          Start your journey to learn Bosnian with these interactive lessons covering common phrases,
          numbers, grammar, and essential vocabulary. Practice your knowledge with our engaging quizzes!
        </p>

        <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setSelectedTab('phrases')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'phrases'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Common Phrases
          </button>
          <button
            onClick={() => setSelectedTab('numbers')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'numbers'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Numbers
          </button>
          <button
            onClick={() => setSelectedTab('grammar')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'grammar'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Grammar
          </button>
          <button
            onClick={() => setSelectedTab('categories')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'categories'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setSelectedTab('quiz')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'quiz'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Multiple Choice
          </button>
          <button
            onClick={() => setSelectedTab('dragdrop')}
            className={`pb-2 px-4 text-sm font-medium ${
              selectedTab === 'dragdrop'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Fill in the Blanks
          </button>
        </div>
      </div>

      {selectedTab === 'phrases' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            {selectedCategory === 'all' ? 'All Phrases' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Phrases`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPhrases.map((phrase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="space-y-4">
                  {/* English Section */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {phrase.english}
                      </h3>
                      <p className="text-sm text-gray-400">{phrase.context}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => speakText(phrase.english, 'en')}
                      className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                      <SpeakerWaveIcon className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Bosnian Section */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {phrase.bosnian}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Pronunciation: {phrase.pronunciation}
                      </p>
                      <p className="text-xs text-gray-500">
                        Difficulty: {phrase.difficulty}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => speakText(phrase.bosnian, 'bs')}
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                      >
                        <SpeakerWaveIcon className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => isListening ? stopListening() : startListening(phrase)}
                        className={`p-2 rounded-full ${
                          isListening && selectedPhrase === phrase
                            ? 'bg-red-500/50 text-white hover:bg-red-500/70'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <MicrophoneIcon className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Chinese Section */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {phrase.chinese}
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => speakText(phrase.chinese, 'zh')}
                      className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                      <SpeakerWaveIcon className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Feedback Section */}
                  {selectedPhrase === phrase && feedback && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mt-4 p-3 rounded-lg ${
                        feedback.includes('Perfect')
                          ? 'bg-green-500/20 text-green-300'
                          : feedback.includes('Good')
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {feedback}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'numbers' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-6">Numbers in Bosnian</h2>
          <NumbersLearning />
        </div>
      )}

      {selectedTab === 'grammar' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-6">Bosnian Grammar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Verb Conjugation</h3>
              <p className="text-gray-300 mb-4">Learn how to conjugate Bosnian verbs in different tenses.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Start Learning
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Noun Cases</h3>
              <p className="text-gray-300 mb-4">Master the seven cases in Bosnian grammar.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Start Learning
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Adjectives</h3>
              <p className="text-gray-300 mb-4">Learn how adjectives change based on gender and case.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Start Learning
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Pronouns</h3>
              <p className="text-gray-300 mb-4">Understand personal, possessive, and demonstrative pronouns.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Start Learning
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {selectedTab === 'categories' && <Categories />}
      {selectedTab === 'quiz' && <Quiz />}
      {selectedTab === 'dragdrop' && <DragDropQuiz />}
    </div>
  );
} 