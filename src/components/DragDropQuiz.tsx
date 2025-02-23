'use client';

import { useState } from 'react';

interface Exercise {
  sentence: string;
  answers: string[];
  hints: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'vocabulary' | 'grammar' | 'conversation';
}

const exercises: Exercise[] = [
  {
    sentence: "Dobar ___ (morning)! Kako ___ (are) danas?",
    answers: ["jutro", "ste"],
    hints: ["Time of day when you wake up", "Formal way to ask 'are'"],
    difficulty: "beginner",
    category: "conversation"
  },
  {
    sentence: "Ja ___ (speak) bosanski ___ (language).",
    answers: ["govorim", "jezik"],
    hints: ["First person singular of 'to speak'", "What you use to communicate"],
    difficulty: "beginner",
    category: "grammar"
  },
  {
    sentence: "___ (where) je najbliža ___ (restaurant)?",
    answers: ["gdje", "restoran"],
    hints: ["Question word for location", "Place where you eat"],
    difficulty: "beginner",
    category: "vocabulary"
  },
  {
    sentence: "Možete li mi ___ (help) da ___ (find) hotel?",
    answers: ["pomoći", "nađem"],
    hints: ["To assist someone", "To locate something"],
    difficulty: "intermediate",
    category: "conversation"
  },
  {
    sentence: "Danas je ___ (beautiful) ___ (weather).",
    answers: ["lijepo", "vrijeme"],
    hints: ["Positive description", "Atmospheric conditions"],
    difficulty: "beginner",
    category: "vocabulary"
  },
  {
    sentence: "___ (I would like) kafu sa ___ (milk), molim.",
    answers: ["htio bih", "mlijekom"],
    hints: ["Polite way to request", "White liquid added to coffee"],
    difficulty: "intermediate",
    category: "grammar"
  },
  {
    sentence: "Moja ___ (favorite) ___ (food) je burek.",
    answers: ["omiljena", "hrana"],
    hints: ["Personal preference", "What you eat"],
    difficulty: "intermediate",
    category: "vocabulary"
  },
  {
    sentence: "___ (excuse me), kako da ___ (get to) centar grada?",
    answers: ["izvinite", "dođem do"],
    hints: ["Polite way to get attention", "Direction to reach"],
    difficulty: "advanced",
    category: "conversation"
  }
];

export default function DragDropQuiz() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleDragStart = (word: string) => {
    setDraggedWord(word);
  };

  const handleDrop = (index: number) => {
    if (draggedWord && userAnswers[index] === undefined) {
      const newAnswers = [...userAnswers];
      newAnswers[index] = draggedWord;
      setUserAnswers(newAnswers);
      setDraggedWord(null);
    }
  };

  const checkAnswers = () => {
    const correct = exercises[currentExercise].answers.every(
      (answer, index) => answer.toLowerCase() === userAnswers[index]?.toLowerCase()
    );
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      resetExercise();
    }
  };

  const resetExercise = () => {
    setUserAnswers([]);
    setIsCorrect(null);
    setShowHints(false);
    setShowAnswer(false);
  };

  const resetQuiz = () => {
    setCurrentExercise(0);
    setScore(0);
    resetExercise();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-500 dark:text-green-400';
      case 'intermediate':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'advanced':
        return 'text-red-500 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const renderSentence = () => {
    const words = exercises[currentExercise].sentence.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('___')) {
        const hintIndex = words.filter((w, i) => w.startsWith('___') && i < index).length;
        const placeholder = userAnswers[hintIndex] || '___';
        return (
          <span
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(hintIndex)}
            className={`inline-block mx-1 px-3 py-1 rounded border-2 ${
              showAnswer
                ? userAnswers[hintIndex]?.toLowerCase() === exercises[currentExercise].answers[hintIndex]?.toLowerCase()
                  ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                  : 'border-red-500 bg-red-100 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {placeholder}
          </span>
        );
      }
      return <span key={index} className="mx-1">{word.replace(/[()]/g, '')}</span>;
    });
  };

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Exercise {currentExercise + 1} of {exercises.length}
          </span>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-sm font-medium ${
              getDifficultyColor(exercises[currentExercise].difficulty)
            }`}>
              {exercises[currentExercise].difficulty.charAt(0).toUpperCase() +
                exercises[currentExercise].difficulty.slice(1)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              • {exercises[currentExercise].category}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            Score: {score}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-lg text-gray-900 dark:text-white">
          {renderSentence()}
        </div>

        <div className="flex flex-wrap gap-2">
          {exercises[currentExercise].answers.map((answer, index) => (
            !userAnswers.includes(answer) && (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(answer)}
                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded cursor-move"
              >
                {answer}
              </div>
            )
          ))}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>

          {showHints && (
            <div className="space-y-2">
              {exercises[currentExercise].hints.map((hint, index) => (
                <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  • {hint}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {isCorrect !== null && (
            <div className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              {isCorrect
                ? '🎉 Correct! Well done!'
                : '💪 Keep practicing! Try again or check the correct answers.'}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={checkAnswers}
              disabled={userAnswers.length !== exercises[currentExercise].answers.length}
              className={`flex-1 py-2 px-4 rounded-lg ${
                userAnswers.length === exercises[currentExercise].answers.length
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Check Answers
            </button>

            {showAnswer && (
              <button
                onClick={nextExercise}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Next Exercise
              </button>
            )}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Reset Quiz
          </button>
        </div>
      </div>
    </div>
  );
} 