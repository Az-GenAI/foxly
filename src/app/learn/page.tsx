'use client';
// src/app/learn/page.tsx — Unit Map (the learning path)

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFoxlyStore } from '@/lib/store';
import { SPANISH_CURRICULUM } from '@/data/curriculum';
import type { CurriculumUnit, CurriculumLevel, CurriculumLesson } from '@/data/curriculum';
import { FoxlyNav, XPPill, StreakPill, AvatarBtn, PageWrapper, FinnBubble } from '@/components/ui';
import Link from 'next/link';

export default function LearnPage() {
  return <Suspense fallback={<Loading />}><LearnContent /></Suspense>;
}

function LearnContent() {
  const router = useRouter();
  const params = useSearchParams();
  const lang = params.get('lang') || 'spanish';
  const user = useFoxlyStore(s => s.user);
  const [selectedLesson, setSelectedLesson] = useState<CurriculumLesson | null>(null);

  // In real app pull from Firestore — for now use local state
  const completedLessons: Set<string> = new Set(
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(`foxly_completed_${user?.uid || 'guest'}`) || '[]')
      : []
  );

  const units = SPANISH_CURRICULUM;

  const isLessonUnlocked = (unitIdx: number, levelIdx: number, lessonIdx: number) => {
    if (unitIdx === 0 && levelIdx === 0 && lessonIdx === 0) return true;
    // Unlock if previous lesson completed
    let count = 0;
    for (let u = 0; u <= unitIdx; u++) {
      const unit = units[u];
      for (let lv = 0; lv < unit.levels.length; lv++) {
        if (u === unitIdx && lv > levelIdx) break;
        for (let ls = 0; ls < unit.levels[lv].lessons.length; ls++) {
          if (u === unitIdx && lv === levelIdx && ls >= lessonIdx) break;
          const lid = unit.levels[lv].lessons[ls].id;
          if (!completedLessons.has(lid)) return false;
        }
      }
    }
    return true;
  };

  const stageIcon: Record<string,string> = { discover:'👀', understand:'🧠', practice:'✏️', prove:'🏆' };
  const stageColor: Record<string,string> = { discover:'#9b7ff4', understand:'#3dd9c8', practice:'#fb923c', prove:'#f9c846' };

  return (
    <PageWrapper>
      {/* Nav */}
      <FoxlyNav right={
        <>
          {user && <XPPill xp={user.xp} />}
          {user && <StreakPill streak={user.streak} />}
          <button onClick={() => router.push('/map')}
            style={{ padding:'7px 14px', borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', color:'#f0eefc', cursor:'pointer', fontSize:13, fontWeight:700 }}>
            ← Map
          </button>
        </>
      } />

      <div style={{ maxWidth:640, margin:'0 auto', padding:'24px 16px 100px' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontSize:56, marginBottom:8 }}>🌮</div>
          <h1 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:32, marginBottom:6 }}>
            <span className="grad-gold">Spanish</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--muted)', fontWeight:600 }}>The Fiesta Kingdom</p>
        </div>

        {/* Finn nudge */}
        <div style={{ marginBottom:28, display:'flex', justifyContent:'center' }}>
          <FinnBubble message="¡Hola Explorer! Start with Unit 0 to learn how Spanish sounds. Take it step by step — I'll be with you the whole way! 🦊" mood="excited" />
        </div>

        {/* Units */}
        {units.map((unit, unitIdx) => {
          const unitComplete = unit.levels.every(lv =>
            lv.lessons.every(ls => completedLessons.has(ls.id))
          );
          const unitStarted = unit.levels.some(lv =>
            lv.lessons.some(ls => completedLessons.has(ls.id))
          );
          const firstLessonId = unit.levels[0]?.lessons[0]?.id;
          const unitUnlocked = unitIdx === 0 || isLessonUnlocked(unitIdx, 0, 0);

          return (
            <div key={unit.id} style={{ marginBottom:32 }}>
              {/* Unit header */}
              <div style={{
                display:'flex', alignItems:'center', gap:14, padding:'16px 20px',
                borderRadius:18, marginBottom:16,
                background: unitUnlocked
                  ? `linear-gradient(135deg,${unit.color}22,${unit.color}11)`
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${unitUnlocked ? unit.color+'44' : 'rgba(255,255,255,0.08)'}`,
                opacity: unitUnlocked ? 1 : 0.5,
              }}>
                <span style={{ fontSize:36 }}>{unit.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:18, color: unitUnlocked ? unit.color : 'var(--muted)' }}>
                    Unit {unit.number}: {unit.title}
                  </div>
                  <div style={{ fontSize:13, color:'var(--muted)', fontWeight:600, marginTop:2 }}>{unit.subtitle}</div>
                </div>
                {!unitUnlocked && <span style={{ fontSize:20 }}>🔒</span>}
                {unitComplete && <span style={{ fontSize:20 }}>✅</span>}
              </div>

              {/* Levels inside unit */}
              {unitUnlocked && unit.levels.map((level, levelIdx) => (
                <div key={level.id} style={{ paddingLeft:16, marginBottom:16 }}>
                  {/* Level label */}
                  <div style={{ fontSize:12, fontWeight:800, color:'var(--muted)', letterSpacing:1, textTransform:'uppercase', marginBottom:10, paddingLeft:4 }}>
                    Level {level.number}: {level.title}
                  </div>

                  {/* Lesson nodes */}
                  <div style={{ display:'flex', flexDirection:'column', gap:8, position:'relative' }}>
                    {/* Connecting line */}
                    <div style={{ position:'absolute', left:27, top:20, bottom:20, width:2, background:'rgba(255,255,255,0.07)', zIndex:0 }} />

                    {level.lessons.map((lesson, lessonIdx) => {
                      const unlocked = isLessonUnlocked(unitIdx, levelIdx, lessonIdx);
                      const completed = completedLessons.has(lesson.id);
                      const isCurrent = unlocked && !completed;

                      return (
                        <button key={lesson.id}
                          onClick={() => unlocked && setSelectedLesson(lesson)}
                          style={{
                            display:'flex', alignItems:'center', gap:14, padding:'12px 16px',
                            borderRadius:14, border:`1.5px solid ${completed ? stageColor[lesson.stage]+'55' : isCurrent ? stageColor[lesson.stage]+'88' : 'rgba(255,255,255,0.06)'}`,
                            background: completed ? `${stageColor[lesson.stage]}18` : isCurrent ? `${stageColor[lesson.stage]}11` : 'rgba(255,255,255,0.03)',
                            cursor: unlocked ? 'pointer' : 'default',
                            opacity: unlocked ? 1 : 0.4,
                            transition:'all 0.2s', textAlign:'left', position:'relative', zIndex:1,
                            boxShadow: isCurrent ? `0 0 20px ${stageColor[lesson.stage]}33` : 'none',
                            transform: isCurrent ? 'none' : 'none',
                          }}
                          onMouseEnter={e => { if(unlocked)(e.currentTarget.style.transform='translateX(4px)'); }}
                          onMouseLeave={e => { e.currentTarget.style.transform='none'; }}>

                          {/* Stage icon circle */}
                          <div style={{
                            width:42, height:42, borderRadius:'50%', flexShrink:0,
                            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
                            background: completed ? stageColor[lesson.stage] : isCurrent ? `${stageColor[lesson.stage]}33` : 'rgba(255,255,255,0.06)',
                            border: `2px solid ${completed ? stageColor[lesson.stage] : isCurrent ? stageColor[lesson.stage]+'66' : 'rgba(255,255,255,0.1)'}`,
                            boxShadow: isCurrent ? `0 0 14px ${stageColor[lesson.stage]}55` : 'none',
                          }}>
                            {completed ? '✓' : !unlocked ? '🔒' : stageIcon[lesson.stage]}
                          </div>

                          <div style={{ flex:1 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                              <span style={{ fontSize:13, fontWeight:800, color: completed ? stageColor[lesson.stage] : isCurrent ? '#f0eefc' : 'var(--muted)' }}>
                                {lesson.stageLabel}
                              </span>
                              {isCurrent && (
                                <span style={{ fontSize:10, fontWeight:800, padding:'2px 8px', borderRadius:50, background:stageColor[lesson.stage], color:'#06101f' }}>
                                  NEXT
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize:12, color:'var(--muted)', fontWeight:600 }}>{lesson.stageDescription}</div>
                          </div>

                          <div style={{ textAlign:'right', flexShrink:0 }}>
                            <div style={{ fontSize:12, fontWeight:800, color: completed ? '#22c55e' : 'var(--muted)' }}>
                              {completed ? `+${lesson.xpReward} XP ✓` : `${lesson.xpReward} XP`}
                            </div>
                            {lesson.passThreshold > 0 && (
                              <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{lesson.passThreshold}% to pass</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Pre-lesson popup */}
      {selectedLesson && (
        <PreLessonModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)}
          onStart={() => {
            router.push(`/do-lesson?id=${selectedLesson.id}`);
          }} />
      )}
    </PageWrapper>
  );
}

function PreLessonModal({ lesson, onClose, onStart }: { lesson: CurriculumLesson; onClose: ()=>void; onStart: ()=>void }) {
  const stageColor: Record<string,string> = { discover:'#9b7ff4', understand:'#3dd9c8', practice:'#fb923c', prove:'#f9c846' };
  const stageTip: Record<string,string> = {
    discover: "Just watch and listen — no scoring today! Relax and enjoy.",
    understand: "Match each word to the right meaning. You've seen these before!",
    practice: "Time to use what you've learned. Hints are available if you need them!",
    prove: "No hints this time — but you've got this! You've practised hard.",
  };
  const stageDuration: Record<string,string> = { discover:'~3 min', understand:'~5 min', practice:'~7 min', prove:'~8 min' };
  const c = stageColor[lesson.stage];

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:400, display:'flex', alignItems:'flex-end', justifyContent:'center', backdropFilter:'blur(6px)' }}>
      <div onClick={e => e.stopPropagation()} className="anim-slide-up"
        style={{ width:'100%', maxWidth:520, background:'rgba(8,18,40,0.98)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'28px 28px 0 0', padding:'28px 28px 40px' }}>

        {/* Drag handle */}
        <div onClick={onClose} style={{ width:40, height:4, borderRadius:99, background:'rgba(255,255,255,0.15)', margin:'0 auto 24px', cursor:'pointer' }} />

        {/* Stage badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:`${c}22`, border:`1px solid ${c}55`, borderRadius:50, padding:'6px 14px', fontSize:13, fontWeight:800, color:c, marginBottom:16 }}>
          <span>{{discover:'👀',understand:'🧠',practice:'✏️',prove:'🏆'}[lesson.stage]}</span>
          {lesson.stageLabel} Lesson
        </div>

        <h2 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:26, marginBottom:8 }}>{lesson.title}</h2>

        {/* Finn tip */}
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'14px 16px', marginBottom:20, display:'flex', gap:10, alignItems:'flex-start' }}>
          <span style={{ fontSize:28, flexShrink:0 }}>🦊</span>
          <p style={{ fontSize:14, fontWeight:600, color:'var(--text)', lineHeight:1.6 }}>{stageTip[lesson.stage]}</p>
        </div>

        {/* Lesson stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:24 }}>
          {[
            { label:'Words', value: lesson.words.length.toString() },
            { label:'Duration', value: stageDuration[lesson.stage] },
            { label:'XP Reward', value: `+${lesson.xpReward}` },
          ].map(s => (
            <div key={s.label} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:22, color:c }}>{s.value}</div>
              <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {lesson.passThreshold > 0 && (
          <div style={{ background:'rgba(249,200,70,0.06)', border:'1px solid rgba(249,200,70,0.18)', borderRadius:12, padding:'10px 14px', marginBottom:20, fontSize:13, fontWeight:600, color:'var(--muted)' }}>
            🎯 Pass mark: <strong style={{color:'#f9c846'}}>{lesson.passThreshold}%</strong> — score below this and Finn will help you review the tricky words before retrying.
          </div>
        )}

        {/* Start button */}
        <button onClick={onStart} className="btn-gold"
          style={{ width:'100%', padding:'16px', borderRadius:14, fontSize:16, fontFamily:'var(--font-nunito,"Nunito",sans-serif)' }}>
          {{discover:'👀 Start Discovering',understand:'🧠 Start Learning',practice:'✏️ Start Practising',prove:'🏆 Start Prove It'}[lesson.stage]}
        </button>

        <button onClick={onClose} className="btn-ghost"
          style={{ width:'100%', padding:'12px', borderRadius:14, fontSize:14, marginTop:10, fontFamily:'var(--font-nunito,"Nunito",sans-serif)', fontWeight:700 }}>
          Not now
        </button>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div style={{ minHeight:'100vh', background:'#06101f', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:60, marginBottom:12, animation:'floatSimple 2s ease-in-out infinite' }}>🦊</div>
        <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:18, color:'#f9c846' }}>Loading your path...</div>
      </div>
    </div>
  );
}
