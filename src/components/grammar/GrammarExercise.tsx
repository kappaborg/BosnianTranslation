'use client';

import { GrammarExercise as GrammarExerciseType, GrammarLesson } from '@/types';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  lesson: GrammarLesson;
  onComplete?: (score: number) => void;
}

export default function GrammarExercise({ lesson, onComplete }: Props) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentExercise = lesson.exercises[currentExerciseIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentExercise.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        const finalScore = ((correctAnswers + (answer === currentExercise.correctAnswer ? 1 : 0)) / lesson.exercises.length) * 100;
        onComplete?.(finalScore);
      }
    }, 1500);
  };

  const renderExercise = (exercise: GrammarExerciseType) => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {exercise.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                disabled={!!selectedAnswer}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors
                  ${
                    selectedAnswer
                      ? option === exercise.correctAnswer
                        ? 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500'
                        : option === selectedAnswer
                        ? 'bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500'
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                      : 'bg-white border-gray-200 hover:border-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white soft:text-gray-800">
                    {option}
                  </span>
                  {selectedAnswer && (
                    <AnimatePresence>
                      {option === exercise.correctAnswer ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <CheckCircleIcon className="w-6 h-6 text-green-500" />
                        </motion.div>
                      ) : option === selectedAnswer ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <XCircleIcon className="w-6 h-6 text-red-500" />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 'fill-in':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Type your answer..."
              value={selectedAnswer || ''}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && selectedAnswer) {
                  handleAnswerSelect(selectedAnswer);
                }
              }}
              disabled={showFeedback}
              className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                dark:bg-gray-800 dark:border-gray-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500
                soft:bg-soft-50 soft:border-soft-200 soft:focus:border-indigo-500"
            />
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  selectedAnswer === exercise.correctAnswer
                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }`}
              >
                {selectedAnswer === exercise.correctAnswer
                  ? 'Correct!'
                  : `Incorrect. The correct answer is: ${exercise.correctAnswer}`}
              </motion.div>
            )}
          </div>
        );

      case 'reorder':
        // Implementation for reorder exercise type
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
            {lesson.title}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
            Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 soft:bg-soft-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 dark:bg-indigo-500 soft:bg-indigo-600 transition-all duration-300"
            style={{
              width: `${((currentExerciseIndex + 1) / lesson.exercises.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6 mb-8">
        <p className="text-lg text-gray-900 dark:text-white soft:text-gray-800 mb-6">
          {currentExercise.question}
        </p>
        {renderExercise(currentExercise)}
      </div>

      {lesson.examples.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 soft:bg-soft-100 rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white soft:text-gray-800 mb-4">
            Examples
          </h3>
          <div className="space-y-3">
            {lesson.examples.map((example, index) => (
              <div key={index} className="space-y-1">
                <p className="text-indigo-600 dark:text-indigo-400 soft:text-indigo-600 font-medium">
                  {example.bosnian}
                </p>
                <p className="text-gray-600 dark:text-gray-400 soft:text-gray-600">
                  {example.english}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 soft:text-gray-500 italic">
                  {example.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 