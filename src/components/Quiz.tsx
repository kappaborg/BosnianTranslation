'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Question {
  question: string;
  correctAnswer: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: 'How do you say "Hello" in Bosnian?',
    correctAnswer: 'Zdravo',
    options: ['Zdravo', 'Hvala', 'Molim', 'Da'],
  },
  {
    question: 'What does "Hvala" mean?',
    correctAnswer: 'Thank you',
    options: ['Hello', 'Please', 'Thank you', 'Goodbye'],
  },
  {
    question: 'How do you say "Good morning" in Bosnian?',
    correctAnswer: 'Dobro jutro',
    options: ['Dobro veče', 'Dobro jutro', 'Laku noć', 'Doviđenja'],
  },
  {
    question: 'What does "Kako si?" mean?',
    correctAnswer: 'How are you?',
    options: ['What is your name?', 'How are you?', 'Where are you?', 'Who are you?'],
  },
  {
    question: 'How do you say "Yes" in Bosnian?',
    correctAnswer: 'Da',
    options: ['Ne', 'Da', 'Možda', 'Ok'],
  },
  {
    question: 'What is "water" in Bosnian?',
    correctAnswer: 'Voda',
    options: ['Voda', 'Kafa', 'Čaj', 'Mlijeko'],
  },
  {
    question: 'How do you say "Please" in Bosnian?',
    correctAnswer: 'Molim',
    options: ['Hvala', 'Molim', 'Izvolite', 'Dobar dan'],
  },
  {
    question: 'What does "Doviđenja" mean?',
    correctAnswer: 'Goodbye',
    options: ['Good morning', 'Hello', 'Goodbye', 'Good night'],
  },
  {
    question: 'How do you say "coffee" in Bosnian?',
    correctAnswer: 'Kafa',
    options: ['Čaj', 'Kafa', 'Voda', 'Sok'],
  },
  {
    question: 'What is "bread" in Bosnian?',
    correctAnswer: 'Hljeb',
    options: ['Meso', 'Hljeb', 'Sir', 'Riba'],
  },
  {
    question: 'How do you say "Good evening" in Bosnian?',
    correctAnswer: 'Dobro veče',
    options: ['Dobro jutro', 'Dobar dan', 'Dobro veče', 'Laku noć'],
  },
  {
    question: 'What does "Gdje je...?" mean?',
    correctAnswer: 'Where is...?',
    options: ['What is...?', 'Who is...?', 'Where is...?', 'How is...?'],
  },
  {
    question: 'How do you say "I understand" in Bosnian?',
    correctAnswer: 'Razumijem',
    options: ['Razumijem', 'Ne znam', 'Možda', 'Vidim'],
  },
  {
    question: 'What is "milk" in Bosnian?',
    correctAnswer: 'Mlijeko',
    options: ['Voda', 'Kafa', 'Mlijeko', 'Sok'],
  },
  {
    question: 'How do you say "Good night" in Bosnian?',
    correctAnswer: 'Laku noć',
    options: ['Dobro veče', 'Laku noć', 'Dobar dan', 'Dobro jutro'],
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    setTimeout(() => {
      if (correct) setScore(score + 1);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h3>
        <p className="text-center text-lg mb-4">
          Your score: {score} out of {questions.length}
        </p>
        <div className="flex justify-center">
          <button
            onClick={resetQuiz}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>
        <h3 className="text-xl font-semibold mb-4">
          {questions[currentQuestion].question}
        </h3>
      </div>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !selectedAnswer && handleAnswer(option)}
            className={`w-full p-3 text-left rounded-lg transition-colors ${
              selectedAnswer
                ? option === questions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : option === selectedAnswer
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-50 border-gray-200'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            } border`}
            disabled={!!selectedAnswer}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 