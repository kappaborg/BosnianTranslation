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
  xpPoints: number;
  level: number;
  dailyStreak: number;
  lastStudyDate: string;
  completedLessons: CompletedLesson[];
  vocabularyMastered: number;
  quizzesPassed: number;
  achievements: Achievement[];
  learningPath: LearningPath;
  quizScores: QuizScore[];
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
  content: string | {
    overview: string;
    instruments?: {
      title: string;
      items: Array<{
        name: string;
        description: string;
        imageUrl: string;
      }>;
    };
    songs?: {
      title: string;
      items: Array<{
        title: string;
        description: string;
        youtubeId: string;
      }>;
    };
    artists?: {
      title: string;
      items: Array<{
        name: string;
        description: string;
        imageUrl: string;
      }>;
    };
  };
  mediaUrls: string[];
  tags: string[];
  relatedVocabulary?: VocabularyWord[];
  musicPlaylists?: {
    spotify?: {
      playlistId: string;
      title: string;
      description: string;
    }[];
    youtube?: {
      playlistId: string;
      title: string;
      description: string;
    }[];
  };
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
  earnedAt: string;
  type: 'milestone' | 'skill' | 'streak' | 'special';
  icon?: string;
}

// Quiz Types
export interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  date: string;
}

// SRS Types
export interface SRSItem {
  id: string;
  type: 'vocabulary' | 'phrase' | 'grammar';
  content: {
    bosnian: string;
    english: string;
    context?: string;
    audioUrl?: string;
  };
  level: number; // 0-5, representing difficulty levels
  nextReview: string; // ISO date string
  lastReviewed?: string;
  reviewCount: number;
  successCount: number;
  failureCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  suggestions?: string[];
  learningContent?: any;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  context: {
    topic?: string;
    difficulty?: string;
    focusArea?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Enhanced Quiz Types
export interface EnhancedQuiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'multiple-choice' | 'fill-in-blanks' | 'matching' | 'listening' | 'speaking';
  questions: QuizQuestion[];
  timeLimit?: number; // in seconds
  passingScore: number;
  xpReward: number;
  prerequisites?: string[]; // IDs of quizzes that should be completed first
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-in-blanks' | 'matching' | 'listening' | 'speaking';
  question: {
    text: string;
    audioUrl?: string;
    imageUrl?: string;
  };
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CompletedLesson {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'culture' | 'quiz';
  completedAt: string;
  score: number;
}

export interface LearningPath {
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  focusAreas: string[];
  completedTopics: string[];
  nextMilestones: string[];
}

export interface VocabularyWord {
  id: string;
  bosnian: string;
  english: string;
  chinese?: string;
  pronunciation: string;  // IPA or simplified pronunciation guide
  audioUrl?: string;     // URL to pre-recorded pronunciation audio
  context?: string;      // Usage context or additional information
  examples?: string[];   // Example sentences using the word
  category: string;      // Word category (e.g., Greetings, Food, etc.)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  usage?: string[];     // Additional usage examples or notes
  lastReviewed?: string; // Timestamp of last review
  reviewCount?: number;  // Number of times reviewed
  nextReview?: string;   // Timestamp for next scheduled review
  successRate?: number;  // Success rate in reviews (0-1)
}

export interface PracticeDialogue {
  title: string;
  context: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exchanges: DialogueExchange[];
  vocabulary: VocabularyWord[];
  audioUrl?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  audioEnabled: boolean;
  dailyGoal: number;
  notificationsEnabled: boolean;
  preferredLearningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  focusAreas: string[];
}

export interface LearningSession {
  id: string;
  startTime: string;
  endTime?: string;
  activities: LearningActivity[];
  totalXPEarned: number;
  mistakes: number;
  corrections: number;
}

export interface LearningActivity {
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'culture' | 'quiz';
  content: any;
  duration: number;
  score: number;
  mistakes: string[];
  corrections: string[];
}

export interface PronunciationFeedback {
  word: string;
  accuracy: number;
  issues?: string[];
  suggestions: string[];
  audioUrl?: string;
}

export interface WritingExercise {
  prompt: string;
  expectedLength: number;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples?: string[];
  rubric: WritingRubric;
}

export interface WritingRubric {
  grammar: number;
  vocabulary: number;
  coherence: number;
  creativity: number;
  totalScore: number;
  feedback: string[];
}

export interface SRSCard {
  id: string;
  front: string;
  back: string;
  type: 'vocabulary' | 'grammar' | 'phrase';
  level: number;
  nextReview: string;
  history: ReviewHistory[];
}

export interface ReviewHistory {
  date: string;
  performance: 'perfect' | 'good' | 'fair' | 'poor';
  timeSpent: number;
}

export interface Attachment {
  type: 'image' | 'audio' | 'video';
  url: string;
  description?: string;
}

// Exercise Types
export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'flashcards' | 'writing' | 'speaking' | 'listening' | 'matching';
  content: Array<{
    question: string;
    answer: string;
    options?: string[];
    chinese?: string;
  }>;
  correctAnswer?: string;
  context?: string;
}

export interface PronunciationGuideType {
  word: string;
  description: string;
  audioUrl?: string;
  examples?: string[];
}

export interface CosmicWord {
  word: string;
  translation: string;
  context: string;
  examples: string[];
  audioUrl?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  pronunciation: string;
}

// Virtual Tour Types
export interface Location {
  id: string;
  name: string;
  description: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  historicalFacts: string[];
  panorama?: {
    url: string;
    thumbnailUrl: string;
    hotspots: Array<{
      pitch: number;
      yaw: number;
      text: string;
      type: string;
    }>;
  };
  audioGuide?: {
    url: string;
    duration: string;
    transcript: string;
  };
  tripadvisorInfo: {
    rating: number;
    reviews: number;
    link: string;
  };
} 