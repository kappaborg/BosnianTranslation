'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface LessonContent {
  id: string;
  title: string;
  content: string;
  examples: Array<{
    bosnian: string;
    english: string;
    chinese: string;
    audio?: string;
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  exercises: Array<{
    type: 'multiple-choice' | 'fill-in' | 'matching' | 'pronunciation';
    question: string;
    options?: string[];
    correctAnswer: string;
    hint?: string;
  }>;
}

const lessonContents: Record<string, LessonContent> = {
  'basics': {
    id: 'basics',
    title: 'Basic Phrases',
    content: 'Learn essential Bosnian phrases for everyday communication. Master greetings, numbers, and common expressions.',
    examples: [
      {
        bosnian: 'Dobar dan',
        english: 'Good day',
        chinese: '你好',
        audio: '/audio/dobar-dan.mp3'
      },
      {
        bosnian: 'Kako ste?',
        english: 'How are you?',
        chinese: '你好吗？',
        audio: '/audio/kako-ste.mp3'
      },
      {
        bosnian: 'Hvala',
        english: 'Thank you',
        chinese: '谢谢',
        audio: '/audio/hvala.mp3'
      },
      {
        bosnian: 'Molim',
        english: 'Please',
        chinese: '请',
        audio: '/audio/molim.mp3'
      },
      {
        bosnian: 'Do viđenja',
        english: 'Goodbye',
        chinese: '再见',
        audio: '/audio/dovidjenja.mp3'
      }
    ],
    quiz: [
      {
        question: 'How do you say "Good day" in Bosnian?',
        options: ['Hvala', 'Dobar dan', 'Dobro jutro', 'Laku noć'],
        correctAnswer: 1
      },
      {
        question: 'What does "Kako ste?" mean?',
        options: ['Goodbye', 'Thank you', 'How are you?', 'Good morning'],
        correctAnswer: 2
      }
    ],
    exercises: [
      {
        type: 'pronunciation',
        question: 'Practice pronouncing: Dobar dan',
        correctAnswer: 'dobar dan',
        hint: 'DOH-bar dahn'
      },
      {
        type: 'matching',
        question: 'Match the Bosnian phrases with their meanings',
        options: ['Hvala', 'Molim', 'Do viđenja'],
        correctAnswer: 'Thank you,Please,Goodbye'
      }
    ]
  },
  'grammar': {
    id: 'grammar',
    title: 'Grammar Fundamentals',
    content: 'Master the core grammar rules of the Bosnian language, including verb conjugations, noun cases, and sentence structure.',
    examples: [
      {
        bosnian: 'Ja čitam knjigu',
        english: 'I am reading a book',
        chinese: '我在读书',
        audio: '/audio/citam-knjigu.mp3'
      },
      {
        bosnian: 'Ti piješ vodu',
        english: 'You are drinking water',
        chinese: '你在喝水',
        audio: '/audio/pijes-vodu.mp3'
      },
      {
        bosnian: 'On/Ona radi',
        english: 'He/She works',
        chinese: '他/她在工作',
        audio: '/audio/radi.mp3'
      }
    ],
    quiz: [
      {
        question: 'Which is the correct form of "to read" for "ja" (I)?',
        options: ['čitam', 'čitaš', 'čita', 'čitamo'],
        correctAnswer: 0
      },
      {
        question: 'What is the correct word order in Bosnian?',
        options: [
          'Subject-Verb-Object',
          'Verb-Subject-Object',
          'Object-Subject-Verb',
          'Flexible with emphasis'
        ],
        correctAnswer: 3
      }
    ],
    exercises: [
      {
        type: 'fill-in',
        question: 'Complete the sentence: Ja ___ kafu. (I drink coffee)',
        correctAnswer: 'pijem',
        hint: 'Use the present tense of "piti" (to drink)'
      },
      {
        type: 'multiple-choice',
        question: 'Choose the correct case for the direct object:',
        options: ['Nominative', 'Accusative', 'Dative', 'Instrumental'],
        correctAnswer: 'Accusative'
      }
    ]
  },
  'vocabulary': {
    id: 'vocabulary',
    title: 'Vocabulary Builder',
    content: 'Build your Bosnian vocabulary with common words and expressions organized by themes.',
    examples: [
      {
        bosnian: 'Kuća',
        english: 'House',
        chinese: '房子',
        audio: '/audio/kuca.mp3'
      },
      {
        bosnian: 'Porodica',
        english: 'Family',
        chinese: '家庭',
        audio: '/audio/porodica.mp3'
      },
      {
        bosnian: 'Hrana',
        english: 'Food',
        chinese: '食物',
        audio: '/audio/hrana.mp3'
      }
    ],
    quiz: [
      {
        question: 'What does "kuća" mean?',
        options: ['Car', 'House', 'Book', 'Tree'],
        correctAnswer: 1
      },
      {
        question: 'Choose the correct word for "family":',
        options: ['Prijatelj', 'Porodica', 'Posao', 'Park'],
        correctAnswer: 1
      }
    ],
    exercises: [
      {
        type: 'matching',
        question: 'Match the words with their categories',
        options: ['kuća', 'auto', 'stan'],
        correctAnswer: 'buildings,vehicles,buildings'
      },
      {
        type: 'pronunciation',
        question: 'Practice pronouncing: Porodica',
        correctAnswer: 'porodica',
        hint: 'po-RO-di-tsa'
      }
    ]
  }
};

export default function LearningModule() {
  const params = useParams();
  const moduleId = typeof params.moduleId === 'string' ? params.moduleId : '';
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExercises, setShowExercises] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const lesson = lessonContents[moduleId];

  if (!lesson) {
    return (
      <div className="min-h-screen w-full py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500">Module not found</h1>
          <p className="text-gray-300 mt-4">Please select a valid learning module.</p>
        </div>
      </div>
    );
  }

  const handleNextExample = () => {
    if (currentExampleIndex < lesson.examples.length - 1) {
      setCurrentExampleIndex(currentExampleIndex + 1);
    }
  };

  const handlePreviousExample = () => {
    if (currentExampleIndex > 0) {
      setCurrentExampleIndex(currentExampleIndex - 1);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === lesson.quiz[currentExampleIndex].correctAnswer) {
      setQuizScore(quizScore + 1);
    }
  };

  const handleExerciseSubmit = (answer: string) => {
    const currentExercise = lesson.exercises[currentExerciseIndex];
    if (answer.toLowerCase() === currentExercise.correctAnswer.toLowerCase()) {
      setQuizScore(quizScore + 1);
    }
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setShowExercises(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <motion.h1
          className="text-4xl font-bold text-white text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {lesson.title}
        </motion.h1>

        {/* Content Section */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 space-y-6">
          <p className="text-gray-300">{lesson.content}</p>
          
          {/* Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Examples</h2>
            <motion.div
              key={currentExampleIndex}
              className="bg-white/5 rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Bosnian</p>
                  <p className="text-xl text-white">{lesson.examples[currentExampleIndex].bosnian}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">English</p>
                  <p className="text-xl text-white">{lesson.examples[currentExampleIndex].english}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Chinese</p>
                  <p className="text-xl text-white">{lesson.examples[currentExampleIndex].chinese}</p>
                </div>
              </div>
              {lesson.examples[currentExampleIndex].audio && (
                <button
                  onClick={() => {
                    const audio = new Audio(lesson.examples[currentExampleIndex].audio);
                    audio.play();
                  }}
                  className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  🔊 Listen
                </button>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousExample}
                disabled={currentExampleIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentExampleIndex === 0
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                ← Previous
              </button>
              <button
                onClick={handleNextExample}
                disabled={currentExampleIndex === lesson.examples.length - 1}
                className={`px-4 py-2 rounded-lg ${
                  currentExampleIndex === lesson.examples.length - 1
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                Next →
              </button>
            </div>
          </div>

          {/* Practice Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Practice</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowQuiz(true);
                  setShowExercises(false);
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Start Quiz
              </button>
              <button
                onClick={() => {
                  setShowExercises(true);
                  setShowQuiz(false);
                }}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Try Exercises
              </button>
            </div>

            {/* Quiz Section */}
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-white/5 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Quiz</h3>
                <div className="space-y-4">
                  {lesson.quiz.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-white">{question.question}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {question.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(optionIndex)}
                            className={`p-3 rounded-lg text-left ${
                              selectedAnswer === optionIndex
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Exercises Section */}
            {showExercises && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-white/5 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Exercises</h3>
                <div className="space-y-4">
                  {lesson.exercises.map((exercise, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-white">{exercise.question}</p>
                      {exercise.type === 'multiple-choice' && exercise.options && (
                        <div className="grid grid-cols-1 gap-2">
                          {exercise.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleExerciseSubmit(option)}
                              className="p-3 rounded-lg text-left bg-white/10 text-gray-300 hover:bg-white/20"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                      {exercise.type === 'fill-in' && (
                        <input
                          type="text"
                          placeholder="Type your answer..."
                          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleExerciseSubmit((e.target as HTMLInputElement).value);
                            }
                          }}
                        />
                      )}
                      {exercise.hint && (
                        <p className="text-sm text-gray-400 mt-2">💡 Hint: {exercise.hint}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 