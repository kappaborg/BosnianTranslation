'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FlashCardProps {
  bosnianWord: string;
  englishTranslation: string;
  pronunciation?: string;
  example?: string;
}

export default function FlashCard({
  bosnianWord,
  englishTranslation,
  pronunciation,
  example
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto h-64 cursor-pointer">
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, animationDirection: 'normal' }}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
        onClick={handleFlip}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front of card (Bosnian) */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6
            ${isFlipped ? 'invisible' : 'visible'}
            bg-gradient-to-br from-blue-500 to-purple-600 text-white
            flex flex-col justify-center items-center shadow-xl`}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">{bosnianWord}</h2>
          {pronunciation && (
            <p className="text-lg text-gray-200 mb-2">/{pronunciation}/</p>
          )}
          {example && (
            <p className="text-sm text-gray-200 italic mt-4 text-center">
              {example}
            </p>
          )}
        </div>

        {/* Back of card (English) */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6
            ${isFlipped ? 'visible' : 'invisible'}
            bg-gradient-to-br from-purple-600 to-blue-500 text-white
            flex flex-col justify-center items-center shadow-xl
            transform rotate-y-180`}
        >
          <h2 className="text-3xl font-bold mb-4 text-center normal-text">
            {englishTranslation}
          </h2>
        </div>
      </motion.div>
    </div>
  );
} 