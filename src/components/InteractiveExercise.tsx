'use client';

import { Exercise, VocabularyWord } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface InteractiveExerciseProps {
  exercise: Exercise | VocabularyWord;
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'matching';
  onComplete: (success: boolean, score: number) => void;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({
  exercise,
  type,
  onComplete,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkAnswer = () => {
    const correct = isAnswerCorrect();
    setIsCorrect(correct);
    setFeedback(
      correct
        ? 'Excellent! You got it right!'
        : `Not quite. Try again! Hint: ${getHint()}`
    );
    setAttempts(attempts + 1);

    if (correct || attempts >= 2) {
      const score = calculateScore();
      onComplete(correct, score);
    }
  };

  const isAnswerCorrect = (): boolean => {
    if ('correctAnswer' in exercise) {
      return userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    } else if ('bosnian' in exercise) {
      return userAnswer.toLowerCase().trim() === exercise.bosnian.toLowerCase().trim();
    }
    return false;
  };

  const getHint = (): string => {
    if ('correctAnswer' in exercise) {
      return `The answer starts with "${exercise.correctAnswer[0]}"`;
    } else if ('bosnian' in exercise) {
      return `Think about the context: ${exercise.context}`;
    }
    return '';
  };

  const calculateScore = (): number => {
    const baseScore = 10;
    const attemptPenalty = 2;
    return Math.max(baseScore - (attempts * attemptPenalty), 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer) {
      checkAnswer();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        {/* Question/Prompt */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {'question' in exercise ? exercise.question : `Translate: ${exercise.english}`}
          </h3>
          {'options' in exercise && exercise.options && (
            <div className="grid grid-cols-2 gap-2">
              {exercise.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg text-left ${
                    userAnswer === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  onClick={() => setUserAnswer(option)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}
          {!('options' in exercise) && (
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={checkAnswer}
            disabled={!userAnswer}
          >
            Check Answer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
            onClick={() => setShowHint(true)}
          >
            Show Hint
          </motion.button>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
                  : 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
              }`}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 rounded-lg"
            >
              {getHint()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Attempts: {attempts}/3
          </div>
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(attempts / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExercise; 