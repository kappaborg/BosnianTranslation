'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

const SpaceBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nebulae, setNebulae] = useState<{ x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const colors = ['#ffffff', '#ffd700', '#ff69b4', '#00ffff'];
      
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setStars(newStars);

      // Generate nebulae
      const newNebulae = [];
      for (let i = 0; i < 3; i++) {
        newNebulae.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        });
      }
      setNebulae(newNebulae);
    };

    generateStars();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

      {/* Nebulae */}
      {nebulae.map((nebula, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 2,
          }}
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: '300px',
            height: '300px',
            background: nebula.color,
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          animate={{
            x: `${star.x + mousePosition.x * star.speed}%`,
            y: `${star.y + mousePosition.y * star.speed}%`,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + star.speed * 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
        />
      ))}

      {/* Shooting stars */}
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        animate={{
          x: ['0%', '100%'],
          y: ['0%', '100%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'linear',
        }}
        style={{
          boxShadow: '0 0 20px #fff, 0 0 40px #fff',
        }}
      />

      {/* Cosmic dust */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-50" />
    </div>
  );
};

export default SpaceBackground; 