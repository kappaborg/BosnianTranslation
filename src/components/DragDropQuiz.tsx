'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Sentence {
  text: string;
  missingWord: string;
  options: string[];
}

const sentences: Sentence[] = [
  {
    text: "_____ means hello in Bosnian",
    missingWord: "Zdravo",
    options: ["Zdravo", "Hvala", "Molim", "Ne"]
  },
  {
    text: "To say good morning, you say _____",
    missingWord: "Dobro jutro",
    options: ["Dobro jutro", "Laku noć", "Dobar dan", "Dobro veče"]
  },
  {
    text: "_____ means how are you?",
    missingWord: "Kako si",
    options: ["Kako si", "Gdje si", "Ko si", "Šta radiš"]
  },
  {
    text: "To say thank you, use the word _____",
    missingWord: "Hvala",
    options: ["Hvala", "Molim", "Izvolite", "Prijatno"]
  },
  {
    text: "_____ means goodbye in Bosnian",
    missingWord: "Doviđenja",
    options: ["Doviđenja", "Zdravo", "Dobro", "Hvala"]
  },
  {
    text: "To ask 'what is your name?', say _____",
    missingWord: "Kako se zoveš",
    options: ["Kako se zoveš", "Gdje živiš", "Koliko imaš godina", "Odakle si"]
  },
  {
    text: "_____ means 'please' in Bosnian",
    missingWord: "Molim",
    options: ["Molim", "Hvala", "Izvolite", "Prijatno"]
  },
  {
    text: "To say 'good night', use _____",
    missingWord: "Laku noć",
    options: ["Laku noć", "Dobro jutro", "Dobar dan", "Dobro veče"]
  },
  {
    text: "_____ is how you say 'water' in Bosnian",
    missingWord: "Voda",
    options: ["Voda", "Kafa", "Čaj", "Sok"]
  },
  {
    text: "The Bosnian word for coffee is _____",
    missingWord: "Kafa",
    options: ["Kafa", "Čaj", "Mlijeko", "Voda"]
  },
  {
    text: "To say 'I understand', use _____",
    missingWord: "Razumijem",
    options: ["Razumijem", "Ne znam", "Vidim", "Čujem"]
  },
  {
    text: "_____ means 'bread' in Bosnian",
    missingWord: "Hljeb",
    options: ["Hljeb", "Meso", "Sir", "Riba"]
  },
  {
    text: "To ask 'where is...?', say _____",
    missingWord: "Gdje je",
    options: ["Gdje je", "Šta je", "Ko je", "Kako je"]
  },
  {
    text: "_____ means 'milk' in Bosnian",
    missingWord: "Mlijeko",
    options: ["Mlijeko", "Voda", "Kafa", "Sok"]
  },
  {
    text: "To say 'good evening', use _____",
    missingWord: "Dobro veče",
    options: ["Dobro veče", "Dobro jutro", "Dobar dan", "Laku noć"]
  }
];

interface QuizResults {
  total: number;
  correct: number;
  mistakes: { question: string; userAnswer: string; correctAnswer: string }[];
}

export default function DragDropQuiz() {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [results, setResults] = useState<QuizResults>({
    total: sentences.length,
    correct: 0,
    mistakes: []
  });
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState(sentences[0].options);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (word: string) => {
    setIsDragging(false);
    setUserAnswer(word);
  };

  const checkAnswer = () => {
    const isCorrect = userAnswer === sentences[currentSentence].missingWord;
    
    if (!isCorrect) {
      setResults(prev => ({
        ...prev,
        mistakes: [...prev.mistakes, {
          question: sentences[currentSentence].text,
          userAnswer: userAnswer || 'No answer',
          correctAnswer: sentences[currentSentence].missingWord
        }]
      }));
    } else {
      setResults(prev => ({
        ...prev,
        correct: prev.correct + 1
      }));
    }

    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      setUserAnswer(null);
      setOptions(sentences[currentSentence + 1].options);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentSentence(0);
    setUserAnswer(null);
    setShowResult(false);
    setOptions(sentences[0].options);
    setResults({
      total: sentences.length,
      correct: 0,
      mistakes: []
    });
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-2xl font-bold text-center mb-4 dark:text-white">
          Quiz Complete!
        </h3>
        <div className="text-center mb-6">
          <p className="text-lg mb-2 dark:text-gray-200">
            Your score: {results.correct} out of {results.total}
          </p>
          <p className="text-lg mb-4 dark:text-gray-200">
            Accuracy: {((results.correct / results.total) * 100).toFixed(1)}%
          </p>
        </div>

        {results.mistakes.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 dark:text-gray-200">Review Mistakes:</h4>
            <div className="space-y-3">
              {results.mistakes.map((mistake, index) => (
                <div key={index} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{mistake.question}</p>
                  <p className="text-red-600 dark:text-red-400">Your answer: {mistake.userAnswer}</p>
                  <p className="text-green-600 dark:text-green-400">Correct answer: {mistake.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentSentence + 1} of {sentences.length}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Score: {results.correct}
          </span>
        </div>

        <div className="text-xl font-semibold mb-8 dark:text-white">
          {sentences[currentSentence].text.split('_____').map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <motion.div
                  animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
                  className={`inline-block min-w-32 px-4 py-2 mx-2 border-2 rounded ${
                    userAnswer 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                      : 'border-dashed border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {userAnswer || 'Drop word here'}
                </motion.div>
              )}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((word) => (
            <motion.div
              key={word}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragStart={handleDragStart}
              onDragEnd={() => handleDragEnd(word)}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.1 }}
              className={`p-3 text-center bg-white dark:bg-gray-700 border-2 border-indigo-200 dark:border-indigo-500/30 rounded-lg cursor-move
                ${userAnswer === word ? 'opacity-50' : 'hover:border-indigo-500 dark:hover:border-indigo-400'}`}
            >
              <span className="dark:text-white">{word}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={checkAnswer}
          disabled={!userAnswer}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium
            ${!userAnswer
              ? 'bg-indigo-400 dark:bg-indigo-500/50 cursor-not-allowed'
              : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
            }`}
        >
          Check Answer
        </motion.button>
      </div>
    </div>
  );
} 