'use client';
// src/hooks/useAuth.ts
// All authentication logic in one clean hook

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { createUserProfile, getUserProfile } from '@/lib/db';
import { useFoxlyStore } from '@/lib/store';
import toast from 'react-hot-toast';
import type { Language } from '@/types';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const setUser = useFoxlyStore((s) => s.setUser);

  // ── Email Sign In ──────────────────────────────────────────
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(cred.user.uid);
      setUser(profile);
      toast.success('Welcome back, Explorer! 🦊');
      return { success: true };
    } catch (err: any) {
      const msg = getFriendlyError(err.code);
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // ── Email Sign Up ──────────────────────────────────────────
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    avatar: string,
    ageGroup: '8-10' | '11-13' | '14+',
    firstLanguage: Language
  ) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName });

      await createUserProfile(cred.user.uid, {
        uid: cred.user.uid,
        email,
        displayName,
        avatar,
        ageGroup,
        languages: {
          [firstLanguage]: {
            lessonsCompleted: 0,
            totalXP: 0,
            level: 1,
            accuracy: 0,
            wordsLearned: 0,
            lastPlayed: null,
          },
        },
      });

      const profile = await getUserProfile(cred.user.uid);
      setUser(profile);
      toast.success('¡Bienvenido a Foxly! 🎉');
      return { success: true };
    } catch (err: any) {
      const msg = getFriendlyError(err.code);
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // ── Google Sign In / Up ────────────────────────────────────
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      let profile = await getUserProfile(cred.user.uid);

      // New Google user — create profile
      if (!profile) {
        await createUserProfile(cred.user.uid, {
          uid: cred.user.uid,
          email: cred.user.email || '',
          displayName: cred.user.displayName || 'Explorer',
          avatar: '🦊',
          ageGroup: '11-13',
          languages: {
            spanish: {
              lessonsCompleted: 0,
              totalXP: 0,
              level: 1,
              accuracy: 0,
              wordsLearned: 0,
              lastPlayed: null,
            },
          },
        });
        profile = await getUserProfile(cred.user.uid);
      }

      setUser(profile);
      toast.success('Welcome to Foxly! 🦊');
      return { success: true };
    } catch (err: any) {
      const msg = getFriendlyError(err.code);
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // ── Sign Out ───────────────────────────────────────────────
  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    toast('See you next time! 🦊', { icon: '👋' });
  };

  return { signIn, signUp, signInWithGoogle, signOut, loading };
}

// ── Error messages for kids ────────────────────────────────
function getFriendlyError(code: string): string {
  const errors: Record<string, string> = {
    'auth/user-not-found':      'No account found with that email!',
    'auth/wrong-password':      'Oops! That password is wrong. Try again!',
    'auth/email-already-in-use':'That email is already used. Try signing in!',
    'auth/weak-password':       'Password needs to be at least 6 characters!',
    'auth/invalid-email':       'That email address doesn\'t look right!',
    'auth/popup-closed-by-user':'Google sign-in was cancelled.',
    'auth/network-request-failed': 'No internet connection. Check your wifi!',
  };
  return errors[code] || 'Something went wrong. Please try again!';
}
