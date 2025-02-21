'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  content: Array<{
    question: string;
    answer: string;
    options?: string[];
    chinese?: string;
  }>;
  type: 'quiz' | 'flashcards' | 'writing' | 'speaking' | 'listening' | 'matching';
}

const exercises: Record<string, Exercise> = {
  'vocab-quiz': {
    id: 'vocab-quiz',
    title: 'Vocabulary Quiz',
    description: 'Test your knowledge of common Bosnian words',
    type: 'quiz',
    content: [
      {
        question: 'What is the Bosnian word for "hello"?',
        answer: 'Zdravo',
        options: ['Zdravo', 'Doviđenja', 'Molim', 'Hvala'],
        chinese: '你好',
      },
      {
        question: 'How do you say "goodbye" in Bosnian?',
        answer: 'Doviđenja',
        options: ['Zdravo', 'Doviđenja', 'Molim', 'Hvala'],
        chinese: '再见',
      },
      {
        question: 'What does "kuća" mean?',
        answer: 'House',
        options: ['House', 'Car', 'Tree', 'Book'],
        chinese: '房子',
      },
      {
        question: 'Choose the correct translation for "porodica"',
        answer: 'Family',
        options: ['Friend', 'Family', 'Food', 'Work'],
        chinese: '家庭',
      },
      {
        question: 'What is "voda" in English?',
        answer: 'Water',
        options: ['Wine', 'Water', 'Coffee', 'Tea'],
        chinese: '水',
      }
    ],
  },
  'flashcards': {
    id: 'flashcards',
    title: 'Flashcard Review',
    description: 'Practice vocabulary with spaced repetition',
    type: 'flashcards',
    content: [
      {
        question: 'Zdravo',
        answer: 'Hello',
        chinese: '你好',
      },
      {
        question: 'Doviđenja',
        answer: 'Goodbye',
        chinese: '再见',
      },
      {
        question: 'Kuća',
        answer: 'House',
        chinese: '房子',
      },
      {
        question: 'Porodica',
        answer: 'Family',
        chinese: '家庭',
      },
      {
        question: 'Voda',
        answer: 'Water',
        chinese: '水',
      },
      {
        question: 'Hrana',
        answer: 'Food',
        chinese: '食物',
      },
      {
        question: 'Auto',
        answer: 'Car',
        chinese: '汽车',
      },
      {
        question: 'Knjiga',
        answer: 'Book',
        chinese: '书',
      }
    ],
  },
  'pronunciation': {
    id: 'pronunciation',
    title: 'Pronunciation Practice',
    description: 'Record and compare your pronunciation',
    type: 'speaking',
    content: [
      {
        question: 'Zdravo',
        answer: 'Hello',
        chinese: '你好',
      },
      {
        question: 'Dobar dan',
        answer: 'Good day',
        chinese: '日安',
      },
      {
        question: 'Kako ste?',
        answer: 'How are you?',
        chinese: '你好吗？',
      }
    ],
  },
  'listening': {
    id: 'listening',
    title: 'Listening Exercises',
    description: 'Improve your comprehension with audio exercises',
    type: 'listening',
    content: [
      {
        question: '/audio/zdravo.mp3',
        answer: 'Zdravo',
        options: ['Zdravo', 'Doviđenja', 'Hvala', 'Molim'],
        chinese: '你好',
      },
      {
        question: '/audio/dobar-dan.mp3',
        answer: 'Dobar dan',
        options: ['Dobro jutro', 'Dobar dan', 'Laku noć', 'Ćao'],
        chinese: '日安',
      }
    ],
  },
  'writing': {
    id: 'writing',
    title: 'Writing Challenges',
    description: 'Practice writing skills with guided exercises',
    type: 'writing',
    content: [
      {
        question: 'Write "hello" in Bosnian',
        answer: 'zdravo',
        chinese: '你好',
      },
      {
        question: 'Write "good day" in Bosnian',
        answer: 'dobar dan',
        chinese: '日安',
      }
    ],
  },
  'word-match': {
    id: 'word-match',
    title: 'Word Matching',
    description: 'Match words with their meanings',
    type: 'matching',
    content: [
      {
        question: 'Match the words with their meanings',
        answer: 'zdravo:hello,kuća:house,voda:water',
        options: ['zdravo', 'kuća', 'voda', 'hello', 'house', 'water'],
        chinese: '匹配词语',
      },
      {
        question: 'Match family-related words',
        answer: 'majka:mother,otac:father,sestra:sister',
        options: ['majka', 'otac', 'sestra', 'mother', 'father', 'sister'],
        chinese: '匹配家庭词语',
      }
    ],
  }
};

export default function PracticeExercise() {
  const params = useParams();
  const moduleId = typeof params.exerciseId === 'string' ? params.exerciseId : '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [audioRecording, setAudioRecording] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const exercise = exercises[moduleId];

  if (!exercise) {
    return (
      <div className="min-h-screen w-full py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500">Exercise not found</h1>
          <p className="text-gray-300 mt-4">Please select a valid exercise.</p>
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    const currentQuestion = exercise.content[currentIndex];
    const isCorrect = answer.toLowerCase() === currentQuestion.answer.toLowerCase();
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < exercise.content.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
        setUserInput('');
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        setAudioRecording(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const handleMatch = (item: string) => {
    if (matchedPairs.includes(item)) {
      setMatchedPairs(matchedPairs.filter(pair => pair !== item));
    } else {
      const newPairs = [...matchedPairs, item];
      setMatchedPairs(newPairs);

      if (newPairs.length === 2) {
        const [first, second] = newPairs;
        const currentQuestion = exercise.content[currentIndex];
        const pairs = currentQuestion.answer.split(',');
        const isCorrectMatch = pairs.some(pair => {
          const [word1, word2] = pair.split(':');
          return (first === word1 && second === word2) || (first === word2 && second === word1);
        });

        if (isCorrectMatch) {
          setScore(score + 1);
          setFeedback('correct');
        } else {
          setFeedback('incorrect');
        }

        setTimeout(() => {
          setMatchedPairs([]);
          setFeedback(null);
          if (currentIndex < exercise.content.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setShowResults(true);
          }
        }, 1000);
      }
    }
  };

  const renderExerciseContent = () => {
    const currentQuestion = exercise.content[currentIndex];

    switch (exercise.type) {
      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white text-xl mb-4">{currentQuestion.question}</p>
              <div className="grid gap-3">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      feedback === null
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : feedback === 'correct' && option === currentQuestion.answer
                        ? 'bg-green-500 text-white'
                        : feedback === 'incorrect' && option === currentQuestion.answer
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                    onClick={() => handleAnswer(option)}
                    disabled={feedback !== null}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
            {currentQuestion.chinese && (
              <p className="text-gray-400 text-center">Chinese: {currentQuestion.chinese}</p>
            )}
          </div>
        );

      case 'flashcards':
        return (
          <motion.div
            className="bg-white/5 rounded-xl p-8 cursor-pointer min-h-[200px]"
            onClick={() => setShowAnswer(!showAnswer)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center space-y-6">
              <p className="text-2xl text-white">
                {showAnswer ? currentQuestion.answer : currentQuestion.question}
              </p>
              {showAnswer && (
                <>
                  <p className="text-xl text-gray-400">
                    Chinese: {currentQuestion.chinese}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentIndex < exercise.content.length - 1) {
                          setCurrentIndex(currentIndex + 1);
                          setShowAnswer(false);
                        } else {
                          setShowResults(true);
                        }
                      }}
                    >
                      Difficult
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentIndex < exercise.content.length - 1) {
                          setCurrentIndex(currentIndex + 1);
                          setShowAnswer(false);
                          setScore(score + 1);
                        } else {
                          setShowResults(true);
                        }
                      }}
                    >
                      Easy
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        );

      case 'speaking':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 text-center">
              <p className="text-2xl text-white mb-4">{currentQuestion.question}</p>
              <p className="text-xl text-gray-400 mb-6">{currentQuestion.answer}</p>
              <p className="text-lg text-gray-400 mb-8">Chinese: {currentQuestion.chinese}</p>
              
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg ${
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </motion.button>
                {audioRecording && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg"
                    onClick={() => {
                      const url = URL.createObjectURL(audioRecording);
                      playAudio(url);
                    }}
                  >
                    Play Recording
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        );

      case 'listening':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex justify-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg"
                  onClick={() => playAudio(currentQuestion.question)}
                >
                  🔊 Play Audio
                </motion.button>
              </div>
              <div className="grid gap-3">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'writing':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white text-xl mb-4">{currentQuestion.question}</p>
              <p className="text-gray-400 mb-4">Chinese: {currentQuestion.chinese}</p>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswer(userInput);
                  }
                }}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type your answer..."
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg"
                onClick={() => handleAnswer(userInput)}
              >
                Submit
              </motion.button>
            </div>
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-white text-xl mb-6">{currentQuestion.question}</p>
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-3 rounded-lg transition-colors ${
                      matchedPairs.includes(option)
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    onClick={() => handleMatch(option)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
        <div className="text-center space-y-4">
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {exercise.title}
          </motion.h1>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {exercise.description}
          </motion.p>
        </div>

        {!showResults ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-400">
                Question {currentIndex + 1} of {exercise.content.length}
              </span>
              <span className="text-gray-400">
                Score: {score}/{exercise.content.length}
              </span>
            </div>
            {renderExerciseContent()}
          </>
        ) : (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-bold text-white">Exercise Complete!</h2>
            <div className="bg-white/5 rounded-xl p-8">
              <p className="text-3xl text-white mb-4">
                Your Score: {score}/{exercise.content.length}
              </p>
              <p className="text-xl text-gray-400 mb-8">
                {score === exercise.content.length
                  ? 'Perfect! Great job! 🎉'
                  : score >= exercise.content.length * 0.7
                  ? 'Well done! Keep practicing! 👏'
                  : 'Good effort! Try again to improve! 💪'}
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/practice">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg"
                  >
                    Back to Practice
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg"
                  onClick={() => {
                    setCurrentIndex(0);
                    setScore(0);
                    setShowResults(false);
                    setShowAnswer(false);
                    setUserInput('');
                    setMatchedPairs([]);
                  }}
                >
                  Try Again
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 