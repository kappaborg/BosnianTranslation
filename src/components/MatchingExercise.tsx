'use client';

import { motion, Reorder } from 'framer-motion';
import { useState } from 'react';

interface Props {
  items: Array<{
    id: string;
    text: string;
    match: string;
  }>;
  onComplete: (isCorrect: boolean) => void;
}

export default function MatchingExercise({ items, onComplete }: Props) {
  const [leftItems, setLeftItems] = useState(items.map(item => ({ id: item.id, text: item.text })));
  const [rightItems, setRightItems] = useState(
    items.map(item => ({ id: item.id, text: item.match })).sort(() => Math.random() - 0.5)
  );
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    checkMatches();
  };

  const checkMatches = () => {
    const isCorrect = items.every(item => {
      const matchedRight = rightItems.find((right, index) => index === leftItems.findIndex(left => left.id === item.id));
      return matchedRight && matchedRight.text === item.match;
    });
    onComplete(isCorrect);
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <Reorder.Group
        axis="y"
        values={leftItems}
        onReorder={setLeftItems}
        className="space-y-4"
      >
        {leftItems.map(item => (
          <Reorder.Item
            key={item.id}
            value={item}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              className={`p-4 rounded-lg bg-white/10 cursor-grab active:cursor-grabbing
                ${isDragging ? 'z-10' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.text}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Reorder.Group
        axis="y"
        values={rightItems}
        onReorder={setRightItems}
        className="space-y-4"
      >
        {rightItems.map(item => (
          <Reorder.Item
            key={item.id}
            value={item}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              className={`p-4 rounded-lg bg-white/10 cursor-grab active:cursor-grabbing
                ${isDragging ? 'z-10' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.text}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
} 