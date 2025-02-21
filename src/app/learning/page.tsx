'use client';

import ModuleProgress from '@/components/ModuleProgress';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  color: string;
  topics: string[];
}

const learningModules: LearningModule[] = [
  {
    id: 'basics',
    title: 'Basic Phrases',
    description: 'Essential Bosnian phrases for everyday communication',
    level: 'Beginner',
    icon: '👋',
    color: 'from-green-500 to-emerald-500',
    topics: [
      'Greetings and Introductions',
      'Numbers and Counting',
      'Days and Months',
      'Common Questions',
      'Basic Responses',
    ],
  },
  {
    id: 'grammar',
    title: 'Grammar Fundamentals',
    description: 'Core grammar rules and sentence structures',
    level: 'Beginner',
    icon: '📚',
    color: 'from-blue-500 to-indigo-500',
    topics: [
      'Noun Cases',
      'Verb Conjugation',
      'Pronouns',
      'Adjectives',
      'Word Order',
    ],
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary Builder',
    description: 'Common words and expressions',
    level: 'Beginner',
    icon: '📝',
    color: 'from-purple-500 to-pink-500',
    topics: [
      'Family Members',
      'Food and Drinks',
      'Colors and Shapes',
      'Weather and Seasons',
      'Transportation',
    ],
  },
  {
    id: 'conversation',
    title: 'Conversation Skills',
    description: 'Practice dialogues and pronunciation',
    level: 'Intermediate',
    icon: '💬',
    color: 'from-orange-500 to-red-500',
    topics: [
      'Daily Conversations',
      'Shopping Dialogues',
      'Restaurant Orders',
      'Travel Situations',
      'Business Communication',
    ],
  },
  {
    id: 'culture',
    title: 'Cultural Insights',
    description: 'Learn about Bosnian traditions and customs',
    level: 'Intermediate',
    icon: '🎭',
    color: 'from-yellow-500 to-amber-500',
    topics: [
      'Traditional Customs',
      'Festivals and Celebrations',
      'Bosnian Cuisine',
      'Music and Arts',
      'Historical Sites',
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    description: 'Complex grammar and idiomatic expressions',
    level: 'Advanced',
    icon: '🎯',
    color: 'from-teal-500 to-cyan-500',
    topics: [
      'Complex Sentences',
      'Idiomatic Expressions',
      'Literary Texts',
      'Academic Writing',
      'Professional Communication',
    ],
  },
];

export default function LearningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [userId] = useState(() => {
    // Generate a random user ID if not exists
    const stored = localStorage.getItem('userId');
    if (stored) return stored;
    const newId = Math.random().toString(36).substring(2);
    localStorage.setItem('userId', newId);
    return newId;
  });

  const filteredModules = selectedLevel === 'all'
    ? learningModules
    : learningModules.filter(module => module.level.toLowerCase() === selectedLevel.toLowerCase());

  return (
    <div className="min-h-screen w-full py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center space-y-6">
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            Learning Journey
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Master Bosnian through interactive lessons and exercises
          </motion.p>
        </div>

        {/* Progress Tracking */}
        <ModuleProgress userId={userId} />

        {/* Level Filter */}
        <div className="flex justify-center space-x-4">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLevel === level
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/learning/${module.id}`}>
                <motion.div
                  className={`bg-gradient-to-r ${module.color} p-1 rounded-xl hover:scale-105 transition-transform`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-black rounded-lg p-6 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-4xl mb-4 block">{module.icon}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white">
                          {module.level}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-white mb-2">Topics covered:</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {module.topics.map((topic, i) => (
                          <li key={i} className="flex items-center">
                            <span className="mr-2">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 