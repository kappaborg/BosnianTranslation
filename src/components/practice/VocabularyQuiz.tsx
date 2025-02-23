'use client';

import { vocabularyWords } from '@/data/vocabulary';
import { VocabularyWord } from '@/types';
import { setupSpeechSynthesis } from '@/utils/pronunciation';
import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface QuizQuestion {
  word: VocabularyWord;
  options: string[];
}

export default function VocabularyQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(vocabularyWords.map(word => word.category))];

  const generateQuestions = (category: string) => {
    const filteredWords = category === 'all'
      ? vocabularyWords
      : vocabularyWords.filter(word => word.category === category);

    return filteredWords.map(word => {
      const otherWords = vocabularyWords.filter(w => w.id !== word.id);
      const incorrectOptions = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.english);
      
      return {
        word,
        options: [...incorrectOptions, word.english].sort(() => Math.random() - 0.5)
      };
    }).sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setQuestions(generateQuestions(selectedCategory));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowPronunciation(false);
  }, [selectedCategory]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.word.english;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowPronunciation(false);
    }
  };

  const handleRestart = () => {
    setQuestions(generateQuestions(selectedCategory));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setShowPronunciation(false);
  };

  const playPronunciation = () => {
    if (!currentQuestion?.word.bosnian) {
      console.warn('No text available for pronunciation');
      return;
    }

    try {
      const utterance = setupSpeechSynthesis(currentQuestion.word.bosnian, 'bs');
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing pronunciation:', error);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        {/* Category Selection */}
        <div className="mb-8">
          <label className="block text-gray-300 mb-2">Select Category:</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Progress and Score */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-gray-300">
            Score: {score}/{questions.length}
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <motion.div
            key={currentQuestion.word.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              {currentQuestion.word.bosnian}
            </h2>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={playPronunciation}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <SpeakerWaveIcon className="w-5 h-5" />
                Play Pronunciation
              </button>
              {showPronunciation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-gray-400 italic">
                    [{currentQuestion.word.pronunciation}]
                  </p>
                  {currentQuestion.word.context && (
                    <p className="text-gray-400 text-sm">
                      {currentQuestion.word.context}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`
                p-4 rounded-lg text-lg font-medium transition-all
                ${
                  selectedAnswer === null
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : selectedAnswer === option
                    ? isCorrect
                      ? 'bg-green-500/20 text-green-300 border-2 border-green-500'
                      : 'bg-red-500/20 text-red-300 border-2 border-red-500'
                    : option === currentQuestion.word.english && isCorrect === false
                    ? 'bg-green-500/20 text-green-300 border-2 border-green-500'
                    : 'bg-white/5 text-gray-400'
                }
              `}
              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Feedback and Controls */}
        <AnimatePresence>
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-4"
            >
              <p
                className={`text-xl font-bold ${
                  isCorrect ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isCorrect ? 'Correct! 🎉' : 'Incorrect 😢'}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPronunciation(!showPronunciation)}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {showPronunciation ? 'Hide' : 'Show'} Pronunciation Guide
                </button>
                {currentQuestion.word.examples && showPronunciation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-sm space-y-1"
                  >
                    <p className="font-medium">Examples:</p>
                    {currentQuestion.word.examples.map((example, index) => (
                      <p key={index}>{example}</p>
                    ))}
                  </motion.div>
                )}
              </div>
              {currentQuestionIndex < questions.length - 1 ? (
                <motion.button
                  onClick={handleNextQuestion}
                  className="block w-full py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next Question
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleRestart}
                  className="block w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Again
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 