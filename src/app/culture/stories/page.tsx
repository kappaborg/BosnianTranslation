'use client';

import CulturalStories from '@/components/CulturalStories';
import { motion } from 'framer-motion';

export default function StoriesPage() {
  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CulturalStories />
      </motion.div>
    </div>
  );
} 