'use client';
// src/app/profile/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFoxlyStore } from '@/lib/store';
import { useAuth } from '@/hooks/useAuth';
import { KINGDOMS, BADGES } from '@/data/lessons';
import { calculateLevel, xpForNextLevel, xpProgress } from '@/lib/db';

const TABS = ['worlds','badges','streak','settings'] as const;
type Tab = typeof TABS[number];

export default function ProfilePage() {
  const router = useRouter();
  const user = useFoxlyStore((s) => s.user);
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('worlds');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center glass-card p-10">
          <div className="text-6xl mb-4">🦊</div>
          <h2 className="font-baloo font-extrabold text-2xl mb-4 text-gold-gradient">Sign in to see your profile!</h2>
          <button onClick={() => router.push('/auth')}
            className="px-6 py-3 rounded-2xl font-extrabold"
            style={{ background: 'linear-gradient(135deg,#f9c846,#e8960f)', color: '#06101f' }}>
            Sign In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  const level = calculateLevel(user.xp);
  const prog = xpProgress(user.xp);
  const nextLevelXP = xpForNextLevel(level);
  const xpIntoLevel = user.xp - (level - 1) * 500;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3"
           style={{ background: 'rgba(6,16,31,0.92)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => router.push('/map')} className="text-sm font-extrabold" style={{ color: 'var(--gold)' }}>← Map</button>
        <span className="font-baloo font-extrabold text-lg text-gold-gradient">My Profile</span>
        <div className="flex items-center gap-2 text-sm font-extrabold" style={{ color: '#ff6b3d' }}>🔥 {user.streak}</div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 pb-16">

        {/* Hero card */}
        <div className="rounded-3xl p-6 mt-4 mb-4 relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg,rgba(155,127,244,0.15),rgba(61,217,200,0.08))', border: '1px solid rgba(155,127,244,0.2)' }}>
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-0.5" style={{ background: 'linear-gradient(135deg,#f9c846,#fb923c,#9b7ff4)' }}>
                <div className="w-full h-full rounded-full flex items-center justify-center text-4xl" style={{ background: 'rgba(13,24,53,0.9)' }}>
                  {user.avatar}
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-baloo font-extrabold text-2xl">{user.displayName}</h1>
              <p className="text-xs font-bold mb-2" style={{ color: 'var(--muted)' }}>Explorer · Joined {new Date(user.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-extrabold px-2 py-1 rounded-full" style={{ background: 'rgba(249,200,70,0.15)', border: '1px solid rgba(249,200,70,0.3)', color: '#f9c846' }}>⭐ Level {level}</span>
                <span className="text-xs font-extrabold px-2 py-1 rounded-full" style={{ background: 'rgba(255,107,60,0.12)', border: '1px solid rgba(255,107,60,0.25)', color: '#ff6b3d' }}>🔥 {user.streak} streak</span>
              </div>
            </div>
          </div>
          {/* XP bar */}
          <div className="mb-1 flex justify-between text-xs font-extrabold" style={{ color: 'var(--gold)' }}>
            <span>Level {level} — Language Adventurer</span>
            <span>{user.xp} / {nextLevelXP} XP</span>
          </div>
          <div className="progress-track h-3 mb-1">
            <div className="progress-fill h-3 xp-bar-fill" style={{ width: `${prog}%` }} />
          </div>
        </div>

        {/* Finn nudge */}
        <div className="flex items-center gap-3 rounded-2xl p-4 mb-4"
             style={{ background: 'rgba(249,200,70,0.07)', border: '1px solid rgba(249,200,70,0.18)' }}>
          <span className="text-3xl" style={{ animation: 'float 2.5s ease-in-out infinite' }}>🦊</span>
          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
            You need <span style={{ color: 'var(--gold)' }}>{500 - xpIntoLevel} more XP</span> to reach Level {level + 1}! Complete a lesson now! 💪
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { val: user.xp, label: 'Total XP', color: '#f9c846' },
            { val: `🔥${user.streak}`, label: 'Streak', color: '#ff6b3d' },
            { val: user.totalLessons, label: 'Lessons', color: '#3dd9c8' },
            { val: user.badges.length, label: 'Badges', color: '#9b7ff4' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl py-3 px-2 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="font-baloo font-extrabold text-xl" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs font-bold mt-1" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-xl text-xs font-extrabold capitalize transition-all"
              style={{
                background: tab === t ? 'rgba(249,200,70,0.12)' : 'transparent',
                border: tab === t ? '1px solid rgba(249,200,70,0.2)' : '1px solid transparent',
                color: tab === t ? 'var(--gold)' : 'var(--muted)',
              }}>
              {{'worlds':'🌍 Worlds','badges':'🏆 Badges','streak':'🔥 Streak','settings':'⚙️ Settings'}[t]}
            </button>
          ))}
        </div>

        {/* Worlds tab */}
        {tab === 'worlds' && (
          <div className="flex flex-col gap-3">
            {KINGDOMS.map(k => {
              const lp = user.languages?.[k.id];
              const locked = level < k.unlockLevel;
              return (
                <div key={k.id} onClick={() => !locked && router.push(`/lesson?lang=${k.id}`)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${!locked ? 'cursor-pointer hover:border-opacity-50' : ''}`}
                  style={{ background: 'var(--card)', border: '1px solid var(--border)', opacity: locked ? 0.5 : 1, filter: locked ? 'grayscale(0.6)' : 'none' }}>
                  <span className="text-4xl">{k.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-baloo font-extrabold text-base" style={{ color: k.color }}>{k.name}</span>
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-full"
                        style={{ background: locked ? 'rgba(255,255,255,0.08)' : `rgba(${k.color},0.15)`, color: locked ? 'var(--muted)' : k.color }}>
                        {locked ? `🔒 Lv${k.unlockLevel}` : `Level ${lp?.level || 1}`}
                      </span>
                    </div>
                    <div className="progress-track h-1.5 mb-1">
                      <div className="h-1.5 rounded-full" style={{ width: `${locked ? 0 : Math.min(((lp?.lessonsCompleted || 0) / 50) * 100, 100)}%`, background: `linear-gradient(90deg,${k.color},#f9c846)` }} />
                    </div>
                    <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>
                      {locked ? `Complete Level ${k.unlockLevel - 1} to unlock` : `${lp?.lessonsCompleted || 0} lessons · ${lp?.totalXP || 0} XP`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Badges tab */}
        {tab === 'badges' && (
          <div>
            <div className="text-sm font-extrabold mb-3" style={{ color: 'var(--muted)' }}>
              🌟 Earned ({user.badges.length} / {BADGES.length})
            </div>
            <div className="grid grid-cols-5 gap-2 mb-5">
              {BADGES.map(b => {
                const earned = user.badges.includes(b.id);
                return (
                  <div key={b.id} title={b.description}
                    className="flex flex-col items-center gap-1 py-3 px-1 rounded-2xl text-center transition-all"
                    style={{ background: earned ? 'rgba(249,200,70,0.08)' : 'var(--card)', border: `1px solid ${earned ? 'rgba(249,200,70,0.2)' : 'var(--border)'}`, opacity: earned ? 1 : 0.3, filter: earned ? 'none' : 'grayscale(1)' }}>
                    <span className="text-2xl">{b.emoji}</span>
                    <span className="text-xs font-extrabold leading-tight" style={{ color: earned ? 'var(--muted)' : 'var(--muted)', fontSize: '9px' }}>{b.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Streak tab */}
        {tab === 'streak' && (
          <div>
            <div className="rounded-2xl p-6 text-center mb-4"
                 style={{ background: 'linear-gradient(135deg,rgba(255,107,60,0.12),rgba(249,200,70,0.08))', border: '1px solid rgba(255,107,60,0.2)' }}>
              <div className="text-6xl font-extrabold font-baloo" style={{ color: 'var(--gold)' }}>{user.streak}</div>
              <div className="text-sm font-bold mb-2" style={{ color: 'var(--muted)' }}>Day Streak · Best: {user.longestStreak} days 🏆</div>
              <div className="text-4xl" style={{ animation: 'float 2s ease-in-out infinite' }}>🦊</div>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { days: 3, reward: '+20 XP', done: user.streak >= 3 },
                { days: 7, reward: '🔥 Badge + 50 XP', done: user.streak >= 7 },
                { days: 14, reward: '+100 XP', done: user.streak >= 14 },
                { days: 30, reward: '👑 Legendary Badge', done: user.streak >= 30 },
              ].map(m => (
                <div key={m.days} className="flex items-center gap-4 p-4 rounded-2xl"
                     style={{ background: 'var(--card)', border: '1px solid var(--border)', opacity: m.done ? 1 : 0.6 }}>
                  <span className="text-2xl">{m.done ? '✅' : '🎯'}</span>
                  <div className="flex-1">
                    <div className="font-extrabold text-sm">{m.days}-Day Streak</div>
                    <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>{m.done ? 'Completed!' : `${m.days - user.streak} more days to go`}</div>
                  </div>
                  <span className="text-sm font-extrabold" style={{ color: 'var(--gold)' }}>{m.reward}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings tab */}
        {tab === 'settings' && (
          <div className="flex flex-col gap-3">
            {[
              { icon: '🎯', label: 'Daily Goal', sub: '15 min / day' },
              { icon: '🔔', label: 'Streak Reminder', sub: '6:00 PM daily' },
              { icon: '👨‍👩‍👧', label: 'Parent Dashboard', sub: 'View progress', action: () => router.push('/parent') },
              { icon: '🔒', label: 'Privacy & Safety', sub: 'COPPA compliant · Zero ads' },
            ].map(s => (
              <button key={s.label} onClick={s.action}
                className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all hover:opacity-80 w-full"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                <span className="text-xl w-6">{s.icon}</span>
                <div className="flex-1">
                  <div className="font-extrabold text-sm">{s.label}</div>
                  <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>{s.sub}</div>
                </div>
                <span style={{ color: 'var(--muted)' }}>›</span>
              </button>
            ))}
            <button onClick={signOut}
              className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all hover:opacity-80 w-full mt-2"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <span className="text-xl">🚪</span>
              <span className="font-extrabold text-sm" style={{ color: '#ef4444' }}>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
