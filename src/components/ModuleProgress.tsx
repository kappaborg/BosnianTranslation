'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ModuleProgress {
  id: string;
  title: string;
  completed: number;
  total: number;
  lastAccessed: Date;
  score: number;
}

interface Props {
  userId: string;
  onProgressUpdate?: (progress: ModuleProgress[]) => void;
}

export default function ModuleProgress({ userId, onProgressUpdate }: Props) {
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [completedModules, setCompletedModules] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`moduleProgress_${userId}`);
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress(parsed);
      updateStats(parsed);
    }
  }, [userId]);

  const updateStats = (currentProgress: ModuleProgress[]) => {
    const completed = currentProgress.filter(p => p.completed === p.total).length;
    const total = currentProgress.reduce((acc, curr) => acc + curr.score, 0);
    setCompletedModules(completed);
    setTotalScore(total);
  };

  const updateModuleProgress = (moduleId: string, completed: number, score: number) => {
    const newProgress = progress.map(p =>
      p.id === moduleId
        ? { ...p, completed, lastAccessed: new Date(), score }
        : p
    );
    setProgress(newProgress);
    localStorage.setItem(`moduleProgress_${userId}`, JSON.stringify(newProgress));
    updateStats(newProgress);
    
    if (onProgressUpdate) {
      onProgressUpdate(newProgress);
    }
  };

  return (
    <div className="space-y-8">
      {/* Overall Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white/5 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Total Score</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-purple-500">{totalScore}</span>
            <span className="text-gray-400">points</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/5 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Completed Modules</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-green-500">{completedModules}</span>
            <span className="text-gray-400">of {progress.length}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/5 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Learning Streak</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-orange-500">
              {Math.floor(totalScore / 100)}
            </span>
            <span className="text-gray-400">days</span>
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
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-400">
                Last accessed: {new Date(module.lastAccessed).toLocaleDateString()}
              </p>
              <span className="text-sm font-medium text-purple-400">
                Score: {module.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Badges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎯', title: 'First Module', description: 'Complete your first module', unlocked: completedModules > 0 },
            { icon: '🔥', title: 'Perfect Score', description: 'Get 100% on any module', unlocked: progress.some(p => p.score === 100) },
            { icon: '⭐', title: 'Half Way There', description: 'Complete 50% of all modules', unlocked: completedModules >= progress.length / 2 },
            { icon: '🎓', title: 'Graduate', description: 'Complete all modules', unlocked: completedModules === progress.length },
          ].map((badge, index) => (
            <motion.div
              key={index}
              className={`bg-white/5 rounded-xl p-4 text-center ${
                badge.unlocked ? 'opacity-100' : 'opacity-50'
              }`}
              whileHover={{ scale: badge.unlocked ? 1.05 : 1 }}
            >
              <span className="text-4xl mb-2 block">{badge.icon}</span>
              <h3 className="text-white font-medium">{badge.title}</h3>
              <p className="text-sm text-gray-400">{badge.description}</p>
              {badge.unlocked && (
                <span className="text-green-400 text-sm mt-2 block">Unlocked! 🎉</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 