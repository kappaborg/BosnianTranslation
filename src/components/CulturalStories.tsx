'use client';

import { Story, stories } from '@/data/culturalStories';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function CulturalStories() {
  const [selectedCategory, setSelectedCategory] = useState<Story['category']>('history');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const filteredStories = stories.filter(story => story.category === selectedCategory);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setQuizActive(false);
    setQuizScore(0);
    setCurrentQuestionIndex(0);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!selectedStory?.quiz) return;

    const currentQuestion = selectedStory.quiz[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setQuizScore(score => score + 1);
    }

    if (currentQuestionIndex < selectedStory.quiz.length - 1) {
      setCurrentQuestionIndex(index => index + 1);
    } else {
      setQuizActive(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      >
        Explore Bosnian Culture
      </motion.h2>

      {/* Category Selection */}
      <div className="flex justify-center gap-4 mb-12">
        {['history', 'tradition', 'folklore', 'modern'].map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category as Story['category'])}
            className={`px-6 py-3 rounded-lg capitalize ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Stories Grid */}
      {!selectedStory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleStorySelect(story)}
            >
              <div className="relative h-48">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {story.readTime} min read
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8"
        >
          <button
            onClick={() => setSelectedStory(null)}
            className="text-indigo-400 hover:text-indigo-300 mb-6"
          >
            ← Back to Stories
          </button>

          <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
            <Image
              src={selectedStory.image}
              alt={selectedStory.title}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-3xl font-bold text-white mb-6">
            {selectedStory.title}
          </h3>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-line">{selectedStory.content}</p>
          </div>

          {selectedStory.quiz && !quizActive && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuizActive(true)}
              className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Test Your Knowledge
            </motion.button>
          )}

          {quizActive && selectedStory.quiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <h4 className="text-xl font-semibold text-white">
                Question {currentQuestionIndex + 1} of {selectedStory.quiz.length}
              </h4>
              
              <p className="text-lg text-white">
                {selectedStory.quiz[currentQuestionIndex].question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedStory.quiz[currentQuestionIndex].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuizAnswer(index)}
                    className="p-4 rounded-lg bg-white/10 text-white hover:bg-white/20"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              <p className="text-gray-400">
                Score: {quizScore} / {selectedStory.quiz.length}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
} 