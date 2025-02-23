'use client';

import { useEffect, useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'vocabulary' | 'grammar' | 'pronunciation' | 'culture';
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: "How do you say 'Good day' in Bosnian?",
    options: ["Dobar dan", "Dobro jutro", "Dobra večer", "Laku noć"],
    correctAnswer: "Dobar dan",
    explanation: "'Dobar dan' is the formal way to say 'Good day' in Bosnian, commonly used as a greeting throughout the day.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '2',
    question: "What is the correct pronunciation of 'Gdje'?",
    options: ["g-dye", "g-de", "gdye", "gdje"],
    correctAnswer: "g-dye",
    explanation: "The Bosnian word 'gdje' (meaning 'where') is pronounced as 'g-dye', with a soft 'd' sound.",
    difficulty: 'beginner',
    category: 'pronunciation'
  },
  {
    id: '3',
    question: "Which word means 'Thank you' in Bosnian?",
    options: ["Hvala", "Molim", "Izvolite", "Prijatno"],
    correctAnswer: "Hvala",
    explanation: "'Hvala' is the standard way to say 'Thank you' in Bosnian.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '4',
    question: "What does 'Kako ste?' mean?",
    options: ["How are you?", "Where are you?", "What is this?", "Who are you?"],
    correctAnswer: "How are you?",
    explanation: "'Kako ste?' is the formal way to ask 'How are you?' in Bosnian.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '5',
    question: "Which is the correct plural form of 'knjiga' (book)?",
    options: ["knjige", "knjiga", "knjizi", "knjigu"],
    correctAnswer: "knjige",
    explanation: "In Bosnian, most feminine nouns ending in 'a' form their plural by changing 'a' to 'e'.",
    difficulty: 'intermediate',
    category: 'grammar'
  },
  {
    id: '6',
    question: "What is the correct way to say 'Goodbye' formally?",
    options: ["Doviđenja", "Ćao", "Zdravo", "Adio"],
    correctAnswer: "Doviđenja",
    explanation: "'Doviđenja' is the formal way to say goodbye in Bosnian.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '7',
    question: "Which word means 'Please' in Bosnian?",
    options: ["Molim", "Hvala", "Izvolite", "Oprostite"],
    correctAnswer: "Molim",
    explanation: "'Molim' is used to say 'please' or 'you're welcome' in Bosnian.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '8',
    question: "How do you say 'I don't understand' in Bosnian?",
    options: ["Ne razumijem", "Ne znam", "Ne mogu", "Nije važno"],
    correctAnswer: "Ne razumijem",
    explanation: "'Ne razumijem' literally means 'I don't understand' and is commonly used when you need clarification.",
    difficulty: 'intermediate',
    category: 'vocabulary'
  },
  {
    id: '9',
    question: "What is the correct form of 'I am' in Bosnian?",
    options: ["Ja sam", "Ti si", "On je", "Mi smo"],
    correctAnswer: "Ja sam",
    explanation: "'Ja sam' is the first person singular form of 'to be' in Bosnian.",
    difficulty: 'beginner',
    category: 'grammar'
  },
  {
    id: '10',
    question: "Which phrase means 'Nice to meet you'?",
    options: ["Drago mi je", "Kako ste", "Dobro došli", "Prijatno"],
    correctAnswer: "Drago mi je",
    explanation: "'Drago mi je' literally means 'It is pleasant to me' and is used when meeting someone for the first time.",
    difficulty: 'intermediate',
    category: 'vocabulary'
  },
  {
    id: '11',
    question: "What is the correct way to say 'Good night'?",
    options: ["Laku noć", "Dobro veče", "Dobra večer", "Dobar dan"],
    correctAnswer: "Laku noć",
    explanation: "'Laku noć' is used to say 'good night' when someone is going to sleep.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '12',
    question: "How do you say 'What is your name?' informally?",
    options: ["Kako se zoveš?", "Kako ste?", "Ko si ti?", "Šta radiš?"],
    correctAnswer: "Kako se zoveš?",
    explanation: "'Kako se zoveš?' is the informal way to ask someone's name.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '13',
    question: "Which word means 'Water' in Bosnian?",
    options: ["Voda", "Sok", "Kafa", "Čaj"],
    correctAnswer: "Voda",
    explanation: "'Voda' is the Bosnian word for water.",
    difficulty: 'beginner',
    category: 'vocabulary'
  },
  {
    id: '14',
    question: "What is the correct pronunciation of 'Hvala'?",
    options: ["hva-la", "fa-la", "kva-la", "ha-la"],
    correctAnswer: "hva-la",
    explanation: "'Hvala' is pronounced with a soft 'h' sound followed by 'va-la'.",
    difficulty: 'beginner',
    category: 'pronunciation'
  },
  {
    id: '15',
    question: "Which is the correct form of 'We are'?",
    options: ["Mi smo", "Vi ste", "Oni su", "Ja sam"],
    correctAnswer: "Mi smo",
    explanation: "'Mi smo' is the first person plural form of 'to be' in Bosnian.",
    difficulty: 'intermediate',
    category: 'grammar'
  }
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);

  useEffect(() => {
    // Check browser support for required features
    const checkBrowserSupport = () => {
      const hasWebSpeech = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      const hasWebAudio = 'AudioContext' in window || 'webkitAudioContext' in window;
      setIsBrowserSupported(hasWebSpeech && hasWebAudio);
    };

    checkBrowserSupport();
  }, []);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    if (isAnswerLocked) return;
    
    setIsAnswerLocked(true);
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));

    // Wait before moving to next question
    setTimeout(() => {
      if (questionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(questionIndex + 1);
        setIsAnswerLocked(false);
      } else {
        // Calculate final score
        const finalScore = Object.entries(selectedAnswers).reduce((acc, [idx, ans]) => {
          return acc + (ans === quizQuestions[Number(idx)].correctAnswer ? 1 : 0);
        }, 0) + (answer === quizQuestions[questionIndex].correctAnswer ? 1 : 0);
        
        setScore(finalScore);
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setIsAnswerLocked(false);
    setError(null);
  };

  if (!isBrowserSupported) {
    return (
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
          Browser Compatibility Notice
        </h3>
        <p className="mt-2 text-yellow-700 dark:text-yellow-300">
          Some features may not work in your current browser. For the best experience, please use Chrome, Firefox, or Safari.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
          Error
        </h3>
        <p className="mt-2 text-red-700 dark:text-red-300">{error}</p>
        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quiz Results</h2>
        <p className="text-xl">Your score: {score} out of {quizQuestions.length}</p>
        <div className="space-y-4">
          {quizQuestions.map((q, index) => (
            <div key={q.id} className="p-4 rounded-lg bg-white/5">
              <p className="font-medium">{q.question}</p>
              <p className="text-sm mt-2">
                Your answer: <span className={selectedAnswers[index] === q.correctAnswer ? 'text-green-500' : 'text-red-500'}>
                  {selectedAnswers[index]}
                </span>
              </p>
              <p className="text-sm mt-1">Correct answer: <span className="text-green-500">{q.correctAnswer}</span></p>
              <p className="text-sm mt-2 text-gray-400">{q.explanation}</p>
            </div>
          ))}
        </div>
        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz</h2>
        <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
      </div>
      
      <div className="p-4 rounded-lg bg-white/5">
        <p className="text-lg font-medium">{currentQuestion.question}</p>
        <div className="mt-4 space-y-2">
          {currentQuestion.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
              disabled={isAnswerLocked}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                selectedAnswers[currentQuestionIndex] === option
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 