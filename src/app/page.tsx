'use client';

import CosmicTranslator from '@/components/space/CosmicTranslator';
import GalacticProgress from '@/components/space/GalacticProgress';
import { motion } from 'framer-motion';

export default function Home() {
  const handleTranslate = async (text: string, from: string, to: string) => {
    // Implement your translation logic here
    return `Translated: ${text}`;
  };

  return (
    <div className="min-h-screen w-full py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            Explore Bosnian Language
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Embark on a cosmic journey through language learning with our
            interactive translation and learning platform.
          </motion.p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GalacticProgress progress={42} total={100} label="Words Mastered" />
          <GalacticProgress progress={7} total={30} label="Daily Streak" />
          <GalacticProgress progress={3} total={10} label="Lessons Completed" />
        </div>

        {/* Translator Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CosmicTranslator onTranslate={handleTranslate} />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            {
              title: 'Interactive Learning',
              description: 'Engage with dynamic exercises and real-time feedback',
              icon: '🎯',
            },
            {
              title: 'Cultural Insights',
              description: 'Discover the rich heritage of Bosnia and Herzegovina',
              icon: '🏰',
            },
            {
              title: 'Progress Tracking',
              description: 'Monitor your learning journey through the cosmos',
              icon: '📈',
            },
            {
              title: 'Audio Pronunciation',
              description: 'Master authentic Bosnian pronunciation',
              icon: '🎙️',
            },
            {
              title: 'Community',
              description: 'Connect with fellow language explorers',
              icon: '👥',
            },
            {
              title: 'Daily Challenges',
              description: 'Stay motivated with daily language missions',
              icon: '⭐',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
} 