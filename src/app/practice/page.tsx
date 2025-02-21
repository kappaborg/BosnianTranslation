'use client';

import { motion } from 'framer-motion';

interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'flashcards' | 'writing' | 'speaking' | 'listening' | 'matching';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  icon: string;
  color: string;
  categories: string[];
}

const practiceExercises = [
  {
    id: 'vocab-quiz',
    title: 'Vocabulary Quiz',
    description: 'Test your knowledge of Bosnian words with multiple-choice questions',
    type: 'quiz',
    difficulty: 'Easy',
    estimatedTime: '10 min',
    icon: '📝',
    color: 'from-blue-500 to-indigo-500',
    categories: ['Basic Words', 'Family', 'Food', 'Travel', 'Business'],
  },
  {
    id: 'flashcards',
    title: 'Flashcard Review',
    description: 'Practice vocabulary with spaced repetition flashcards',
    type: 'flashcards',
    difficulty: 'Medium',
    estimatedTime: '15 min',
    icon: '🎴',
    color: 'from-purple-500 to-pink-500',
    categories: ['Common Phrases', 'Verbs', 'Adjectives', 'Nouns', 'Expressions'],
  },
  {
    id: 'pronunciation',
    title: 'Pronunciation Practice',
    description: 'Record and compare your pronunciation with native speakers',
    type: 'speaking',
    difficulty: 'Medium',
    estimatedTime: '20 min',
    icon: '🎙️',
    color: 'from-red-500 to-orange-500',
    categories: ['Vowels', 'Consonants', 'Word Stress', 'Intonation', 'Tongue Twisters'],
  },
  {
    id: 'listening',
    title: 'Listening Exercises',
    description: 'Improve your comprehension with audio exercises',
    type: 'listening',
    difficulty: 'Hard',
    estimatedTime: '25 min',
    icon: '🎧',
    color: 'from-green-500 to-emerald-500',
    categories: ['Dialogues', 'News', 'Stories', 'Songs', 'Interviews'],
  },
  {
    id: 'writing',
    title: 'Writing Challenges',
    description: 'Practice writing skills with guided exercises',
    type: 'writing',
    difficulty: 'Hard',
    estimatedTime: '30 min',
    icon: '✍️',
    color: 'from-yellow-500 to-amber-500',
    categories: ['Sentences', 'Paragraphs', 'Essays', 'Letters', 'Creative Writing'],
  },
  {
    id: 'word-match',
    title: 'Word Matching',
    description: 'Match words with their meanings and translations',
    type: 'matching',
    difficulty: 'Easy',
    estimatedTime: '15 min',
    icon: '🔤',
    color: 'from-teal-500 to-cyan-500',
    categories: ['Synonyms', 'Antonyms', 'Categories', 'Translations', 'Word Families'],
  },
];

export default function PracticePage() {
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
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            Practice Zone
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Strengthen your skills with interactive exercises
          </motion.p>
        </div>

        {/* Practice Exercises Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {practiceExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`
                bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10
                hover:border-white/20 transition-all duration-300
                relative overflow-hidden group-hover:shadow-lg
              `}>
                {/* Background Gradient */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${exercise.color}
                  opacity-10 group-hover:opacity-20 transition-opacity duration-300
                `} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{exercise.icon}</span>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${exercise.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                        exercise.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'}
                    `}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {exercise.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      ⏱️ {exercise.estimatedTime}
                    </span>
                    <span className="text-white/70 text-sm">
                      Start Practice →
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <div className="mt-12 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Your Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white">Exercises Completed</h3>
              <p className="text-3xl font-bold text-purple-500">0</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white">Success Rate</h3>
              <p className="text-3xl font-bold text-green-500">0%</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white">Time Practiced</h3>
              <p className="text-3xl font-bold text-blue-500">0h</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white">Weekly Goal</h3>
              <p className="text-3xl font-bold text-orange-500">0/7</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 