'use client';

import AudioPronunciation from '@/components/AudioPronunciation';
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
        ? 'Excellent! You got it right! 🎉'
        : `Not quite. Try again! 💪 Hint: ${getHint()}`
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

  const renderQuestion = () => {
    if ('content' in exercise && Array.isArray(exercise.content) && exercise.content.length > 0) {
      return exercise.content[0].question;
    } else if ('bosnian' in exercise) {
      return `Translate: ${exercise.bosnian}`;
    }
    return 'Question not available';
  };

  const renderAudioControls = () => {
    if ('bosnian' in exercise) {
      return (
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bosnian</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AudioPronunciation text={exercise.bosnian} lang="bs" />
            </motion.div>
          </div>
          {exercise.english && (
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">English</span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AudioPronunciation text={exercise.english} lang="en" />
              </motion.div>
            </div>
          )}
          {exercise.chinese && (
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Chinese</span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AudioPronunciation text={exercise.chinese} lang="zh" />
              </motion.div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {renderQuestion()}
          </h3>
          {renderAudioControls()}
          {type === 'vocabulary' && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Enter the correct translation
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
              dark:text-white transition-all duration-200 text-lg"
            placeholder="Type your answer..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex justify-between items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHint(true)}
            className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 
              dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
          >
            💡 Show Hint
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswer}
            disabled={!userAnswer}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              userAnswer
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            ✨ Check Answer
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800"
            >
              <p className="text-blue-800 dark:text-blue-200 flex items-center">
                <span className="mr-2">💭</span>
                {getHint()}
              </p>
            </motion.div>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-4 rounded-lg border ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800 text-red-800 dark:text-red-200'
              }`}
            >
              <p className="flex items-center">
                <span className="mr-2">{isCorrect ? '🎉' : '💪'}</span>
                {feedback}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Attempts: {attempts}/3</span>
            <span>Score: {calculateScore()} points</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(attempts / 3) * 100}%` }}
              className={`h-full ${
                attempts === 3
                  ? 'bg-red-500'
                  : attempts === 2
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InteractiveExercise; 