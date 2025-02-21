'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GalacticProgressProps {
  progress: number;
  total: number;
  label: string;
  color?: string;
}

const GalacticProgress: React.FC<GalacticProgressProps> = ({
  progress,
  total,
  label,
  color = 'purple',
}) => {
  const [orbitingPlanets, setOrbitingPlanets] = useState<{ x: number; y: number; size: number; color: string }[]>([]);
  const percentage = (progress / total) * 100;
  const colors = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-yellow-500',
  };

  useEffect(() => {
    const planets = [];
    const numPlanets = Math.min(5, total);
    const planetColors = ['#FFB6C1', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];
    
    for (let i = 0; i < numPlanets; i++) {
      const angle = (i / numPlanets) * Math.PI * 2;
      planets.push({
        x: Math.cos(angle) * 50 + 50,
        y: Math.sin(angle) * 50 + 50,
        size: Math.random() * 10 + 5,
        color: planetColors[i],
      });
    }
    setOrbitingPlanets(planets);
  }, [total]);

  return (
    <div className="relative w-full h-48 bg-black/50 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className={`absolute inset-0 bg-gradient-to-r ${colors[color as keyof typeof colors]} opacity-10`} />
      
      {/* Cosmic Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Central Sun */}
      <motion.div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${colors[color as keyof typeof colors]}`}
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(147, 51, 234, 0.5)',
            '0 0 40px rgba(147, 51, 234, 0.7)',
            '0 0 20px rgba(147, 51, 234, 0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: '20px', height: '20px' }}
      />

      {/* Progress Orbit */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.2)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.2)" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50%"
          cy="50%"
          r="60"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="4"
          className="opacity-20"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="60"
          fill="none"
          stroke={`url(#orbitGradient)`}
          strokeWidth="4"
          strokeDasharray="377"
          initial={{ strokeDashoffset: 377 }}
          animate={{ strokeDashoffset: 377 - (377 * percentage) / 100 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Orbiting Planets */}
      {orbitingPlanets.map((planet, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          animate={{
            x: [planet.x + '%', planet.x + 2 + '%', planet.x + '%'],
            y: [planet.y + '%', planet.y - 2 + '%', planet.y + '%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.2,
          }}
          style={{
            width: planet.size,
            height: planet.size,
            transform: `translate(-50%, -50%)`,
            backgroundColor: planet.color,
            boxShadow: `0 0 10px ${planet.color}`,
          }}
        />
      ))}

      {/* Progress Label */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <motion.p
          className="text-white text-lg font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {label}
        </motion.p>
        <motion.p
          className={`text-${color}-300 text-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {progress} / {total}
        </motion.p>
      </div>
    </div>
  );
};

export default GalacticProgress; 