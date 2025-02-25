'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CulturalContent {
  id: string;
  title: string;
  description: string;
  category: 'History' | 'Traditions' | 'Food' | 'Music' | 'Art' | 'Literature';
  imageUrl: string;
  icon: string;
  color: string;
}

const culturalContent: CulturalContent[] = [
  {
    id: 'history',
    title: 'Rich History',
    description: 'Explore the fascinating history of Bosnia and Herzegovina',
    category: 'History',
    imageUrl: '/images/history.jpg',
    icon: '🏰',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'traditions',
    title: 'Cultural Traditions',
    description: 'Learn about Bosnian customs and celebrations',
    category: 'Traditions',
    imageUrl: '/images/traditions.jpg',
    icon: '🎭',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'cuisine',
    title: 'Bosnian Cuisine',
    description: 'Discover traditional Bosnian dishes and recipes',
    category: 'Food',
    imageUrl: '/images/food.jpg',
    icon: '🥘',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'music',
    title: 'Traditional Music',
    description: 'Experience the sounds of Bosnian folk music',
    category: 'Music',
    imageUrl: '/images/music.jpg',
    icon: '🎵',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'art',
    title: 'Arts & Crafts',
    description: 'Explore traditional Bosnian arts and crafts',
    category: 'Art',
    imageUrl: '/images/art.jpg',
    icon: '🎨',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'literature',
    title: 'Literature',
    description: 'Read works by famous Bosnian authors',
    category: 'Literature',
    imageUrl: '/images/literature.jpg',
    icon: '📚',
    color: 'from-teal-500 to-cyan-500',
  },
];

const featuredArticles = [
  {
    title: 'The Art of Bosnian Coffee',
    excerpt: 'Discover the traditional way of preparing Bosnian coffee...',
    readTime: '5 min',
  },
  {
    title: 'Traditional Festivals',
    excerpt: 'Experience the vibrant festivals throughout the year...',
    readTime: '7 min',
  },
  {
    title: 'Architecture Through Ages',
    excerpt: 'Explore the unique architectural styles in Bosnia...',
    readTime: '6 min',
  },
];

export default function CulturePage() {
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
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            Bosnian Culture
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover the rich heritage and traditions of Bosnia and Herzegovina
          </motion.p>
        </div>

        {/* Cultural Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {culturalContent.map((content, index) => (
            <Link
              key={content.id}
              href={`/culture/${content.id === 'music' ? 'traditional-music' : 
                     content.id === 'literature' ? 'bosnian-war-literature' : content.id}`}
            >
              <motion.div
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
                    absolute inset-0 bg-gradient-to-br ${content.color}
                    opacity-10 group-hover:opacity-20 transition-opacity duration-300
                  `} />

                  {/* Content */}
                  <div className="relative z-10">
                    <span className="text-3xl mb-4 block">{content.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {content.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {content.category}
                      </span>
                      <span className="text-white/70 text-sm">
                        Learn More →
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Featured Articles */}
        <div className="mt-12 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>📖 {article.readTime} read</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Cultural Insights
          </h2>
          <p className="text-gray-300 mb-6">
            Subscribe to receive weekly articles about Bosnian culture
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <button className="px-6 py-2 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 