'use client';

import VirtualTour from '@/components/VirtualTour';
import { motion } from 'framer-motion';

export default function ToursPage() {
  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VirtualTour />
      </motion.div>
    </div>
  );
} 