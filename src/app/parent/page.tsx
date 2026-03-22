'use client';
// src/app/parent/page.tsx — Parent Dashboard

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFoxlyStore } from '@/lib/store';
import { getRecentLessons } from '@/lib/db';
import { KINGDOMS } from '@/data/lessons';

export default function ParentPage() {
  const router = useRouter();
  const user = useFoxlyStore((s) => s.user);
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    if (user) getRecentLessons(user.uid).then(setLessons);
  }, [user]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="glass-card p-10 text-center max-w-sm">
        <div className="text-5xl mb-4">👨‍👩‍👧</div>
        <h2 className="font-baloo font-extrabold text-2xl mb-4 text-gold-gradient">Parent Dashboard</h2>
        <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>Sign in to view your child's progress.</p>
        <button onClick={() => router.push('/auth')}
          className="px-6 py-3 rounded-2xl font-extrabold"
          style={{ background: 'linear-gradient(135deg,#f9c846,#e8960f)', color: '#06101f' }}>Sign In</button>
      </div>
    </div>
  );

  const weeklyXP = lessons.slice(0, 7).reduce((sum, l) => sum + (l.xpEarned || 0), 0);
  const avgAccuracy = lessons.length ? Math.round(lessons.reduce((s, l) => s + (l.accuracy || 0), 0) / lessons.length) : 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3"
           style={{ background: 'rgba(6,16,31,0.92)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => router.push('/profile')} className="text-sm font-extrabold" style={{ color: 'var(--gold)' }}>← Profile</button>
        <span className="font-baloo font-extrabold text-lg text-gold-gradient">Parent Dashboard</span>
        <span className="text-2xl">{user.avatar}</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 pb-16 pt-4">

        {/* Child summary */}
        <div className="glass-card p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">{user.avatar}</div>
            <div>
              <h2 className="font-baloo font-extrabold text-xl">{user.displayName}</h2>
              <p className="text-xs font-bold" style={{ color: 'var(--muted)' }}>Age group: {user.ageGroup} · Level {Math.floor(user.xp / 500) + 1}</p>
            </div>
          </div>
          {/* Streak alert */}
          {user.streak > 0 && (
            <div className="rounded-xl p-3 text-sm font-bold"
                 style={{ background: 'rgba(249,200,70,0.08)', border: '1px solid rgba(249,200,70,0.2)', color: 'var(--text)' }}>
              🔥 {user.displayName} is on a <span style={{ color: 'var(--gold)' }}>{user.streak}-day streak!</span> Keep it alive today.
            </div>
          )}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Total XP', val: user.xp, color: '#f9c846', icon: '⭐' },
            { label: 'Streak', val: `🔥 ${user.streak} days`, color: '#ff6b3d', icon: '🔥' },
            { label: 'Lessons Done', val: user.totalLessons, color: '#3dd9c8', icon: '📚' },
            { label: 'Avg Accuracy', val: `${avgAccuracy}%`, color: '#9b7ff4', icon: '🎯' },
          ].map(k => (
            <div key={k.label} className="rounded-2xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-extrabold mb-1 tracking-wide" style={{ color: 'var(--muted)' }}>{k.icon} {k.label.toUpperCase()}</div>
              <div className="font-baloo font-extrabold text-2xl" style={{ color: k.color }}>{k.val}</div>
            </div>
          ))}
        </div>

        {/* Language progress */}
        <div className="glass-card p-5 mb-4">
          <h3 className="font-baloo font-extrabold text-base mb-4">🌍 Language Progress</h3>
          {KINGDOMS.map(k => {
            const lp = user.languages?.[k.id];
            if (!lp && k.unlockLevel > Math.floor(user.xp / 500) + 1) return null;
            return (
              <div key={k.id} className="flex items-center gap-3 mb-3 last:mb-0">
                <span className="text-2xl">{k.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-extrabold mb-1">
                    <span style={{ color: k.color }}>{k.name}</span>
                    <span style={{ color: 'var(--muted)' }}>{lp?.lessonsCompleted || 0} lessons · {lp?.totalXP || 0} XP</span>
                  </div>
                  <div className="progress-track h-2">
                    <div className="h-2 rounded-full" style={{ width: `${Math.min(((lp?.lessonsCompleted || 0) / 50) * 100, 100)}%`, background: `linear-gradient(90deg,${k.color},#f9c846)` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent activity */}
        <div className="glass-card p-5 mb-4">
          <h3 className="font-baloo font-extrabold text-base mb-4">⚡ Recent Activity</h3>
          {lessons.length === 0 && (
            <p className="text-sm font-semibold text-center py-4" style={{ color: 'var(--muted)' }}>No lessons yet — encourage {user.displayName} to start! 🦊</p>
          )}
          {lessons.map((l, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b last:border-b-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <span className="text-xl">{{'mcq':'🎯','flashcard':'🃏','drag':'🧩','speak':'🎤'}[l.lessonType as string] || '📚'}</span>
              <div className="flex-1">
                <div className="text-sm font-extrabold capitalize">{l.language} — {l.lessonType}</div>
                <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>{l.accuracy}% accuracy · {l.score}/{l.total}</div>
              </div>
              <span className="text-sm font-extrabold" style={{ color: 'var(--gold)' }}>+{l.xpEarned} XP</span>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="glass-card p-5">
          <h3 className="font-baloo font-extrabold text-base mb-4">⚙️ Controls</h3>
          {[
            { icon: '🔔', label: 'Daily Reminder', sub: 'Notify child at 6 PM', toggle: true },
            { icon: '⏱️', label: 'Screen Time Limit', sub: '30 min per day' },
            { icon: '🔒', label: 'Safe Mode', sub: 'No external links', toggle: true },
            { icon: '📧', label: 'Weekly Report Email', sub: 'Every Sunday', toggle: true },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between py-3 border-b last:border-b-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="text-sm font-extrabold">{s.label}</div>
                  <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>{s.sub}</div>
                </div>
              </div>
              {s.toggle && <Toggle />}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function Toggle() {
  const [on, setOn] = useState(true);
  return (
    <div onClick={() => setOn(!on)} className="w-10 h-5 rounded-full cursor-pointer relative transition-all"
         style={{ background: on ? 'var(--gold)' : 'rgba(255,255,255,0.1)' }}>
      <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow"
           style={{ left: on ? '20px' : '2px' }} />
    </div>
  );
}
