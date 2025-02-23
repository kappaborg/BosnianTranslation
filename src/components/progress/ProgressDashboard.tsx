'use client';

import { Achievement, User } from '@/types';
import {
    AcademicCapIcon,
    ChartBarIcon,
    FireIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Props {
  user: User;
}

export default function ProgressDashboard({ user }: Props) {
  const calculateProgress = () => {
    const totalLessons = 100; // This should come from your total lessons count
    const completedPercentage = (user.progress.completedLessons.length / totalLessons) * 100;
    return Math.round(completedPercentage);
  };

  const calculateAverageScore = () => {
    const quizScores = user.progress.quizScores || [];
    if (quizScores.length === 0) return 0;
    
    const total = quizScores.reduce((acc, score) => {
      return acc + (score.score / score.totalQuestions) * 100;
    }, 0);
    
    return Math.round(total / quizScores.length);
  };

  const getLatestAchievements = (count: number): Achievement[] => {
    return user.achievements
      .filter(achievement => achievement.unlockedAt)
      .sort((a, b) => {
        return new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime();
      })
      .slice(0, count);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white soft:text-gray-800">
              Progress
            </h3>
            <ChartBarIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 soft:text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
            {calculateProgress()}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
            of lessons completed
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white soft:text-gray-800">
              Average Score
            </h3>
            <AcademicCapIcon className="w-6 h-6 text-green-600 dark:text-green-400 soft:text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
            {calculateAverageScore()}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
            across all quizzes
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white soft:text-gray-800">
              Streak
            </h3>
            <FireIcon className="w-6 h-6 text-orange-600 dark:text-orange-400 soft:text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
            {user.streak}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
            days in a row
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white soft:text-gray-800">
              Achievements
            </h3>
            <TrophyIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400 soft:text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white soft:text-gray-800">
            {user.achievements.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
            total earned
          </p>
        </motion.div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white soft:text-gray-800 mb-6">
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getLatestAchievements(3).map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 soft:bg-soft-100 rounded-lg"
            >
              <div className="flex-shrink-0 mr-4">
                <img
                  src={achievement.icon}
                  alt={achievement.title}
                  className="w-12 h-12"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white soft:text-gray-800">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Scores */}
      <div className="bg-white dark:bg-gray-800 soft:bg-soft-50 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white soft:text-gray-800 mb-6">
          Recent Quiz Scores
        </h3>
        <div className="space-y-4">
          {user.progress.quizScores.slice(-5).map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 soft:bg-soft-100 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white soft:text-gray-800">
                  Quiz {score.quizId}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 soft:text-gray-600">
                  {new Date(score.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 soft:bg-soft-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-400 soft:bg-indigo-600 rounded-full"
                    style={{
                      width: `${(score.score / score.totalQuestions) * 100}%`,
                    }}
                  />
                </div>
                <span className="ml-4 font-medium text-gray-900 dark:text-white soft:text-gray-800">
                  {Math.round((score.score / score.totalQuestions) * 100)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 