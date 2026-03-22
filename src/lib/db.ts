// src/lib/db.ts
// ─────────────────────────────────────────────────────────────
// All Firestore read/write operations for Foxly
// ─────────────────────────────────────────────────────────────

import {
  doc, getDoc, setDoc, updateDoc, collection,
  query, orderBy, getDocs, serverTimestamp,
  increment, arrayUnion, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile, LessonResult, LanguageProgress } from '@/types';

// ── USER PROFILE ────────────────────────────────────────────

export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    xp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    totalLessons: 0,
    badges: [],
    languages: {},
    createdAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  await updateDoc(doc(db, 'users', uid), {
    ...data,
    lastActiveAt: serverTimestamp(),
  });
}

// ── XP & LEVELS ─────────────────────────────────────────────

export async function addXP(uid: string, amount: number) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const user = snap.data() as UserProfile;
  const newXP = (user.xp || 0) + amount;
  const newLevel = calculateLevel(newXP);

  await updateDoc(ref, {
    xp: increment(amount),
    level: newLevel,
    lastActiveAt: serverTimestamp(),
  });

  return { newXP, newLevel, leveledUp: newLevel > user.level };
}

export function calculateLevel(xp: number): number {
  // Every 500 XP = 1 level, starting at 1
  return Math.floor(xp / 500) + 1;
}

export function xpForNextLevel(level: number): number {
  return level * 500;
}

export function xpProgress(xp: number): number {
  const level = calculateLevel(xp);
  const levelStartXP = (level - 1) * 500;
  const levelXPRange = 500;
  return Math.round(((xp - levelStartXP) / levelXPRange) * 100);
}

// ── STREAK ──────────────────────────────────────────────────

export async function updateStreak(uid: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const user = snap.data() as UserProfile;
  const now = new Date();
  const last = user.lastActiveAt?.toDate?.() || new Date(0);
  const daysDiff = Math.floor((now.getTime() - last.getTime()) / 86400000);

  let newStreak = user.streak || 0;

  if (daysDiff === 0) {
    // Same day — no change
  } else if (daysDiff === 1) {
    // Consecutive day — increment
    newStreak += 1;
  } else {
    // Streak broken
    newStreak = 1;
  }

  const longestStreak = Math.max(newStreak, user.longestStreak || 0);

  await updateDoc(ref, {
    streak: newStreak,
    longestStreak,
    lastActiveAt: serverTimestamp(),
  });

  return { newStreak, longestStreak };
}

// ── LESSON RESULTS ──────────────────────────────────────────

export async function saveLessonResult(uid: string, result: LessonResult) {
  // Save to lessons subcollection
  const lessonsRef = collection(db, 'users', uid, 'lessons');
  await setDoc(doc(lessonsRef), {
    ...result,
    completedAt: serverTimestamp(),
  });

  // Update language progress
  const langKey = `languages.${result.language}`;
  await updateDoc(doc(db, 'users', uid), {
    [`${langKey}.lessonsCompleted`]: increment(1),
    [`${langKey}.totalXP`]: increment(result.xpEarned),
    [`${langKey}.lastPlayed`]: serverTimestamp(),
    totalLessons: increment(1),
  });

  // Add XP
  await addXP(uid, result.xpEarned);

  // Update streak
  await updateStreak(uid);
}

// ── LANGUAGE PROGRESS ───────────────────────────────────────

export async function getLanguageProgress(
  uid: string,
  language: string
): Promise<LanguageProgress | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const user = snap.data() as UserProfile;
  return user.languages?.[language] || null;
}

// ── BADGES ──────────────────────────────────────────────────

export async function awardBadge(uid: string, badgeId: string) {
  await updateDoc(doc(db, 'users', uid), {
    badges: arrayUnion(badgeId),
  });
}

export async function checkAndAwardBadges(uid: string): Promise<string[]> {
  const user = await getUserProfile(uid);
  if (!user) return [];

  const newBadges: string[] = [];

  if (user.totalLessons >= 1 && !user.badges.includes('first_step')) {
    await awardBadge(uid, 'first_step');
    newBadges.push('first_step');
  }
  if (user.streak >= 7 && !user.badges.includes('week_warrior')) {
    await awardBadge(uid, 'week_warrior');
    newBadges.push('week_warrior');
  }
  if (user.xp >= 100 && !user.badges.includes('word_wizard')) {
    await awardBadge(uid, 'word_wizard');
    newBadges.push('word_wizard');
  }

  return newBadges;
}

// ── PARENT DASHBOARD ────────────────────────────────────────

export async function getRecentLessons(uid: string, limit = 10) {
  const q = query(
    collection(db, 'users', uid, 'lessons'),
    orderBy('completedAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.slice(0, limit).map(d => ({ id: d.id, ...d.data() }));
}
