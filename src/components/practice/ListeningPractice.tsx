'use client';

import { setupSpeechSynthesis } from '@/utils/pronunciation';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  category: string;
  onScoreUpdate: (score: number) => void;
}

const exercises = [
  {
    text: 'Dobar dan',
    options: ['Good day', 'Good night', 'Hello', 'Goodbye'],
    correct: 'Good day'
  },
  {
    text: 'Kako si',
    options: ['What time is it', 'How are you', 'Where are you', 'Who are you'],
    correct: 'How are you'
  },
  {
    text: 'Hvala lijepo',
    options: ['You\'re welcome', 'Please', 'Thank you very much', 'Excuse me'],
    correct: 'Thank you very much'
  }
];

export default function ListeningPractice({ category, onScoreUpdate }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentExercise = exercises[currentIndex];

  const playAudio = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    const utterance = setupSpeechSynthesis(currentExercise.text, 'bs');
    
    utterance.onend = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (answer === currentExercise.correct) {
      const newScore = score + 1;
      setScore(newScore);
      onScoreUpdate(newScore);
    }

    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Listening Practice</h2>
        <p className="text-gray-400">Listen to Bosnian words and select their meaning</p>
      </div>

      <div className="bg-white/5 rounded-xl p-8 space-y-6">
        <div className="text-center space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playAudio}
            disabled={isPlaying}
            className={`px-6 py-3 rounded-lg font-medium ${
              isPlaying
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white`}
          >
            {isPlaying ? 'Playing...' : 'Play Audio 🔊'}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentExercise.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => checkAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-lg text-white transition-colors ${
                selectedAnswer === null
                  ? 'bg-white/10 hover:bg-white/20'
                  : option === currentExercise.correct
                  ? 'bg-green-600'
                  : selectedAnswer === option
                  ? 'bg-red-600'
                  : 'bg-white/10'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {selectedAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg p-4 text-center ${
              selectedAnswer === currentExercise.correct
                ? 'bg-green-600/20 text-green-400'
                : 'bg-red-600/20 text-red-400'
            }`}
          >
            {selectedAnswer === currentExercise.correct ? (
              <>
                <p className="font-bold">Correct! 🎉</p>
                <p className="text-sm">Great listening skills!</p>
              </>
            ) : (
              <>
                <p className="font-bold">Not quite right</p>
                <p className="text-sm">The correct answer was: {currentExercise.correct}</p>
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