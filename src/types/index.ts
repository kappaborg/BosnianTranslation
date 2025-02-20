// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  progress: UserProgress;
  achievements: Achievement[];
  streak: number;
  lastLoginDate: string;
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: QuizScore[];
  flashcardStats: FlashcardStats;
  writingExercises: WritingExercise[];
  pronunciationAttempts: PronunciationAttempt[];
}

// Pronunciation Types
export interface PronunciationGuide {
  id: string;
  word: string;
  ipa: string;
  audioUrl: string;
  examples: string[];
}

export interface PronunciationAttempt {
  id: string;
  wordId: string;
  recordingUrl: string;
  score: number;
  date: string;
}

// Flashcard Types
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  nextReview?: string;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
  userId: string;
}

export interface FlashcardStats {
  totalReviewed: number;
  correctAnswers: number;
  streakDays: number;
}

// Grammar Types
export interface GrammarLesson {
  id: string;
  title: string;
  content: string;
  examples: GrammarExample[];
  exercises: GrammarExercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GrammarExample {
  bosnian: string;
  english: string;
  explanation: string;
}

export interface GrammarExercise {
  id: string;
  question: string;
  correctAnswer: string;
  options?: string[];
  type: 'multiple-choice' | 'fill-in' | 'reorder';
}

// Cultural Content Types
export interface CulturalContent {
  id: string;
  title: string;
  type: 'article' | 'story' | 'song' | 'tradition';
  content: string;
  mediaUrls: string[];
  tags: string[];
}

// Conversation Types
export interface DialogueScenario {
  id: string;
  title: string;
  context: string;
  exchanges: DialogueExchange[];
  vocabulary: VocabularyItem[];
}

export interface DialogueExchange {
  speaker: string;
  bosnian: string;
  english: string;
  audioUrl?: string;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  context: string;
  usage: string[];
}

// Writing Types
export interface WritingPrompt {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples: string[];
  tips: string[];
}

export interface WritingExercise {
  id: string;
  promptId: string;
  content: string;
  corrections: WritingCorrection[];
  submissionDate: string;
  userId: string;
}

export interface WritingCorrection {
  originalText: string;
  correctedText: string;
  explanation: string;
  type: 'grammar' | 'spelling' | 'structure';
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

// Quiz Types
export interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  date: string;
} 