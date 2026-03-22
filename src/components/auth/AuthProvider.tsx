'use client';
// src/components/auth/AuthProvider.tsx
// Listens to Firebase auth state and syncs to Zustand store

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile } from '@/lib/db';
import { useFoxlyStore } from '@/lib/store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useFoxlyStore((s) => s.setUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, [setUser]);

  return <>{children}</>;
}
