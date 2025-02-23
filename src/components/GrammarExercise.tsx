import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface GrammarExample {
  bosnian: string;
  english: string;
  explanation: string;
  category: string;
}

const grammarExamples: GrammarExample[] = [
  {
    category: 'verb-conjugation',
    bosnian: 'Ja idem u školu',
    english: 'I go to school',
    explanation: 'Present tense conjugation of "ići" (to go) - First person singular'
  },
  {
    category: 'verb-conjugation',
    bosnian: 'Ti ideš u park',
    english: 'You go to the park',
    explanation: 'Present tense conjugation of "ići" (to go) - Second person singular'
  },
  {
    category: 'noun-cases',
    bosnian: 'Knjiga je na stolu',
    english: 'The book is on the table',
    explanation: 'Locative case with preposition "na"'
  },
  {
    category: 'adjectives',
    bosnian: 'Velika kuća',
    english: 'Big house',
    explanation: 'Feminine adjective agreement'
  }
];

interface Props {
  category: string;
}

export default function GrammarExercise({ category }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const examples = grammarExamples.filter(ex => ex.category === category);
  const currentExample = examples[currentIndex];

  const checkAnswer = () => {
    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrectAnswer = currentExample.bosnian.toLowerCase();
    
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setFeedback('Correct! 🎉');
    } else {
      setFeedback(`Try again. The correct answer is: "${currentExample.bosnian}"`);
    }
  };

  const nextExample = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
    setUserAnswer('');
    setFeedback('');
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">
              {currentExample.english}
            </h3>
            <button
              onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentExample.bosnian))}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <SpeakerWaveIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type the Bosnian translation..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex space-x-2">
              <button
                onClick={checkAnswer}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Check Answer
              </button>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </button>
            </div>
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded-lg ${
                feedback.includes('Correct')
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              {feedback}
            </motion.div>
          )}

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-white/10"
            >
              <p className="text-gray-300">{currentExample.explanation}</p>
            </motion.div>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-gray-400">
            Example {currentIndex + 1} of {examples.length}
          </span>
          <button
            onClick={nextExample}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Next Example
          </button>
        </div>
      </motion.div>
    </div>
  );
} 