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
    if ('correctAnswer' in exercise && exercise.correctAnswer) {
      return userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    } else if ('bosnian' in exercise) {
      return userAnswer.toLowerCase().trim() === exercise.bosnian.toLowerCase().trim();
    }
    // If no valid answer can be checked, return false
    return false;
  };

  const getHint = (): string => {
    if ('correctAnswer' in exercise && exercise.correctAnswer) {
      return `The answer starts with "${exercise.correctAnswer[0]}"`;
    } else if ('bosnian' in exercise) {
      return `Think about the context: ${exercise.context}`;
    }
    return 'No hint available';
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
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="mb-4">
          {'question' in exercise ? (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {exercise.content[0].question}
            </h3>
          ) : (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Translate: {exercise.bosnian}
            </h3>
          )}
        </div>

        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Type your answer..."
        />

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setShowHint(true)}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Show Hint
          </button>
          <button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className={`px-4 py-2 rounded-lg ${
              userAnswer
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
            >
              <p className="text-blue-800 dark:text-blue-200">{getHint()}</p>
            </motion.div>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveExercise; 