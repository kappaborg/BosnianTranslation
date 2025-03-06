'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  category: string;
  onScoreUpdate: (score: number) => void;
}

const exercises = [
  {
    bosnian: 'Dobar dan',
    english: 'Good day',
    hint: 'Common greeting used during the day'
  },
  {
    bosnian: 'Kako si',
    english: 'How are you',
    hint: 'Common question to ask about someone\'s wellbeing'
  },
  {
    bosnian: 'Hvala lijepo',
    english: 'Thank you very much',
    hint: 'Polite way to express gratitude'
  }
];

export default function WritingExercise({ category, onScoreUpdate }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercise = exercises[currentIndex];

  const checkAnswer = () => {
    const isCorrect = userInput.toLowerCase().trim() === currentExercise.bosnian.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      onScoreUpdate(newScore);
    }

    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserInput('');
        setFeedback(null);
        setShowHint(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Writing Exercise</h2>
        <p className="text-gray-400">Practice writing Bosnian words and phrases</p>
      </div>

      <div className="bg-white/5 rounded-xl p-8 space-y-6">
        <div className="text-center space-y-4">
          <p className="text-xl text-white">Write in Bosnian:</p>
          <p className="text-2xl font-bold text-white">"{currentExercise.english}"</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </motion.button>
          
          {showHint && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 italic"
            >
              Hint: {currentExercise.hint}
            </motion.p>
          )}
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                checkAnswer();
              }
            }}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your answer..."
          />
          
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={checkAnswer}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Check Answer
            </motion.button>
          </div>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg p-4 text-center ${
              feedback === 'correct'
                ? 'bg-green-600/20 text-green-400'
                : 'bg-red-600/20 text-red-400'
            }`}
          >
            {feedback === 'correct' ? (
              <>
                <p className="font-bold">Correct! 🎉</p>
                <p className="text-sm">Well done!</p>
              </>
            ) : (
              <>
                <p className="font-bold">Not quite right</p>
                <p className="text-sm">The correct answer was: {currentExercise.bosnian}</p>
              </>
            )}
          </motion.div>
        )}

        <div className="text-center text-gray-400">
          Score: {score}/{exercises.length}
        </div>
      </div>
    </div>
  );
} 