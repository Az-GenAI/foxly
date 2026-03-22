// src/types/index.ts
// All TypeScript types for Foxly

import { Timestamp } from 'firebase/firestore';

// ── USER ────────────────────────────────────────────────────
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  avatar: string;          // emoji character
  ageGroup: '8-10' | '11-13' | '14+';
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  totalLessons: number;
  badges: string[];
  languages: Record<string, LanguageProgress>;
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  isGuest?: boolean;
  parentEmail?: string;
}

// ── LANGUAGE PROGRESS ───────────────────────────────────────
export interface LanguageProgress {
  lessonsCompleted: number;
  totalXP: number;
  level: number;
  accuracy: number;
  lastPlayed?: Timestamp | null;
  wordsLearned: number;
}

// ── LESSON ──────────────────────────────────────────────────
export type LessonType = 'mcq' | 'flashcard' | 'drag' | 'speak';
export type Language = 'spanish' | 'french' | 'german' | 'japanese' | 'arabic';

export interface LessonWord {
  word: string;         // Target language word
  pronunciation: string;
  translation: string;  // English
  emoji: string;
  example: string;      // Example sentence in target language
  category: string;
}

export interface LessonResult {
  language: Language;
  lessonType: LessonType;
  score: number;
  total: number;
  accuracy: number;
  xpEarned: number;
  duration: number;     // seconds
  wordsLearned: string[];
}

// ── KINGDOM ─────────────────────────────────────────────────
export interface Kingdom {
  id: Language;
  name: string;
  theme: string;
  emoji: string;
  color: string;
  glowColor: string;
  unlockLevel: number;
  totalLevels: number;
  description: string;
}

// ── BADGE ───────────────────────────────────────────────────
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: string;
}

// ── AUTH ────────────────────────────────────────────────────
export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}
