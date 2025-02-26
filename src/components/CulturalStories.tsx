'use client';

import { Story, stories } from '@/data/culturalStories';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  questions: QuizQuestion[];
}

export default function CulturalStories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Story['category']>('history');

  const filteredStories = stories.filter(story => story.category === selectedCategory);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!selectedStory?.quiz) return;

    const currentQuestion = selectedStory.quiz.questions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setQuizScore(score => score + 1);
    }

    if (currentQuestionIndex < selectedStory.quiz.questions.length - 1) {
      setCurrentQuestionIndex(index => index + 1);
    } else {
      setShowQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Selection */}
        <div className="flex space-x-4 mb-8">
          {(['history', 'tradition', 'folklore', 'modern'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStorySelect(story)}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="relative h-48">
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{story.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{story.readTime} read</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Story Modal */}
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64">
                <Image
                  src={selectedStory.imageUrl}
                  alt={selectedStory.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold text-white mb-4">{selectedStory.title}</h2>
                <p className="text-gray-300 whitespace-pre-line">{selectedStory.content}</p>

                {selectedStory.quiz && !showQuiz && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQuiz(true)}
                    className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Test Your Knowledge
                  </motion.button>
                )}

                {showQuiz && selectedStory.quiz && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 bg-gray-700 rounded-lg p-6"
                  >
                    <h4 className="text-xl font-semibold text-white">
                      Question {currentQuestionIndex + 1} of {selectedStory.quiz.questions.length}
                    </h4>
                    
                    <p className="text-lg text-white">
                      {selectedStory.quiz.questions[currentQuestionIndex].question}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedStory.quiz.questions[currentQuestionIndex].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuizAnswer(index)}
                          className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>

                    <p className="text-gray-400">
                      Score: {quizScore} / {selectedStory.quiz.questions.length}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 