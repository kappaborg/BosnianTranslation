'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ModuleProgress {
  id: string;
  title: string;
  completed: number;
  total: number;
  lastAccessed: Date;
}

interface Props {
  userId: string;
  onProgressUpdate?: (progress: ModuleProgress[]) => void;
}

export default function ProgressTracker({ userId, onProgressUpdate }: Props) {
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`progress_${userId}`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    // Load streak
    const savedStreak = localStorage.getItem(`streak_${userId}`);
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }

    // Load XP
    const savedXP = localStorage.getItem(`xp_${userId}`);
    if (savedXP) {
      setTotalXP(parseInt(savedXP, 10));
    }
  }, [userId]);

  const updateProgress = (moduleId: string, completed: number) => {
    const newProgress = progress.map(p =>
      p.id === moduleId
        ? { ...p, completed, lastAccessed: new Date() }
        : p
    );
    setProgress(newProgress);
    localStorage.setItem(`progress_${userId}`, JSON.stringify(newProgress));
    
    if (onProgressUpdate) {
      onProgressUpdate(newProgress);
    }
  };

  const addXP = (amount: number) => {
    const newXP = totalXP + amount;
    setTotalXP(newXP);
    localStorage.setItem(`xp_${userId}`, newXP.toString());
  };

  const updateStreak = () => {
    const today = new Date();
    const lastLogin = localStorage.getItem(`lastLogin_${userId}`);
    
    if (lastLogin) {
      const lastDate = new Date(lastLogin);
      const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem(`streak_${userId}`, newStreak.toString());
      } else if (diffDays > 1) {
        setStreak(1);
        localStorage.setItem(`streak_${userId}`, '1');
      }
    } else {
      setStreak(1);
      localStorage.setItem(`streak_${userId}`, '1');
    }
    
    localStorage.setItem(`lastLogin_${userId}`, today.toISOString());
  };

  return (
    <div className="space-y-8">
      {/* Overall Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white/5 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Daily Streak</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-orange-500">{streak}</span>
            <span className="text-gray-400">days</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/5 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Total XP</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-purple-500">{totalXP}</span>
            <span className="text-gray-400">points</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/5 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Modules Completed</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-green-500">
              {progress.filter(p => p.completed === p.total).length}
            </span>
            <span className="text-gray-400">of {progress.length}</span>
          </div>
        </motion.div>
      </div>

      {/* Module Progress */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Module Progress</h2>
        {progress.map(module => (
          <motion.div
            key={module.id}
            className="bg-white/5 rounded-lg p-4"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-white">{module.title}</h3>
              <span className="text-gray-400">
                {module.completed}/{module.total}
              </span>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(module.completed / module.total) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Last accessed: {new Date(module.lastAccessed).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Achievement Badges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎯', title: 'First Lesson', description: 'Complete your first lesson' },
            { icon: '🔥', title: 'Week Streak', description: 'Maintain a 7-day streak' },
            { icon: '⭐', title: 'Perfect Score', description: 'Get 100% on a quiz' },
            { icon: '🎓', title: 'Module Master', description: 'Complete all lessons in a module' },
          ].map((badge, index) => (
            <motion.div
              key={index}
              className="bg-white/5 rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-4xl mb-2 block">{badge.icon}</span>
              <h3 className="text-white font-medium">{badge.title}</h3>
              <p className="text-sm text-gray-400">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 