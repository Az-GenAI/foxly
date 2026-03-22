// src/lib/store.ts
// Global state with Zustand — no prop drilling anywhere in the app

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, Language } from '@/types';

interface FoxlyStore {
  // Auth
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;

  // Active lesson session
  currentLanguage: Language | null;
  setCurrentLanguage: (lang: Language | null) => void;

  // XP animation trigger
  xpGained: number;
  triggerXP: (amount: number) => void;
  clearXP: () => void;

  // Toast-style celebration
  celebration: string | null;
  setCelebration: (msg: string | null) => void;

  // Streak
  streakAlertShown: boolean;
  setStreakAlertShown: (v: boolean) => void;
}

export const useFoxlyStore = create<FoxlyStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      currentLanguage: null,
      setCurrentLanguage: (lang) => set({ currentLanguage: lang }),

      xpGained: 0,
      triggerXP: (amount) => set({ xpGained: amount }),
      clearXP: () => set({ xpGained: 0 }),

      celebration: null,
      setCelebration: (msg) => set({ celebration: msg }),

      streakAlertShown: false,
      setStreakAlertShown: (v) => set({ streakAlertShown: v }),
    }),
    {
      name: 'foxly-storage',
      // Only persist non-sensitive state for guest mode
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        streakAlertShown: state.streakAlertShown,
      }),
    }
  )
);
