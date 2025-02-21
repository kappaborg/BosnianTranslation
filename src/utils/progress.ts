import { UserProgress } from '@/types';

export const calculateLevelProgress = (xpPoints: number): number => {
  const XP_PER_LEVEL = 1000;
  return Math.floor(xpPoints / XP_PER_LEVEL);
};

export const calculateXPForActivity = (activity: string, success: boolean): number => {
  const xpTable = {
    translation: { success: 10, attempt: 2 },
    grammar: { success: 15, attempt: 3 },
    vocabulary: { success: 8, attempt: 2 },
    pronunciation: { success: 12, attempt: 3 },
    writing: { success: 20, attempt: 5 },
    quiz: { success: 25, attempt: 5 },
    cultural: { success: 15, attempt: 3 },
  };

  const activityType = activity as keyof typeof xpTable;
  return success ? xpTable[activityType].success : xpTable[activityType].attempt;
};

export const updateProgress = (
  currentProgress: UserProgress,
  activity: string,
  success: boolean
): UserProgress => {
  const xpGained = calculateXPForActivity(activity, success);
  const newXP = currentProgress.xpPoints + xpGained;
  const newLevel = calculateLevelProgress(newXP);

  return {
    ...currentProgress,
    xpPoints: newXP,
    level: newLevel,
    lastStudyDate: new Date().toISOString(),
    dailyStreak: updateStreak(currentProgress),
  };
};

const updateStreak = (progress: UserProgress): number => {
  const lastStudy = new Date(progress.lastStudyDate);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return progress.dailyStreak;
  if (diffDays === 1) return progress.dailyStreak + 1;
  return 0;
};

export const getNextMilestone = (progress: UserProgress): { type: string; target: number; current: number } => {
  const milestones = {
    xp: [1000, 5000, 10000, 25000, 50000],
    streak: [7, 30, 90, 180, 365],
    lessons: [10, 50, 100, 250, 500],
  };

  const currentXP = progress.xpPoints;
  const currentStreak = progress.dailyStreak;
  const completedLessons = progress.completedLessons.length;

  const nextXPMilestone = milestones.xp.find(m => m > currentXP) || milestones.xp[milestones.xp.length - 1];
  const nextStreakMilestone = milestones.streak.find(m => m > currentStreak) || milestones.streak[milestones.streak.length - 1];
  const nextLessonMilestone = milestones.lessons.find(m => m > completedLessons) || milestones.lessons[milestones.lessons.length - 1];

  const milestoneProgress = [
    { type: 'XP', target: nextXPMilestone, current: currentXP },
    { type: 'Streak', target: nextStreakMilestone, current: currentStreak },
    { type: 'Lessons', target: nextLessonMilestone, current: completedLessons },
  ];

  return milestoneProgress.reduce((closest, current) => {
    const closestProgress = (closest.current / closest.target) * 100;
    const currentProgress = (current.current / current.target) * 100;
    return currentProgress > closestProgress ? current : closest;
  });
}; 