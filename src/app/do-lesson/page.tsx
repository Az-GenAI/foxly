'use client';
// src/app/do-lesson/page.tsx — Curriculum-driven lesson engine

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFoxlyStore } from '@/lib/store';
import { getLesson, STAGE_CONFIG } from '@/data/curriculum';
import type { CurriculumLesson, CurriculumWord } from '@/data/curriculum';
import { ProgressBar, FinnBubble, GoldBtn } from '@/components/ui';

export default function DoLessonPage() {
  return <Suspense fallback={<LoadingScreen />}><LessonEngine /></Suspense>;
}

type Phase = 'lesson' | 'result' | 'review';

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function LessonEngine() {
  const router = useRouter();
  const params = useSearchParams();
  const lessonId = params.get('id') || '';
  const user = useFoxlyStore(s => s.user);

  const lesson = getLesson(lessonId);
  const [phase, setPhase] = useState<Phase>('lesson');
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);
  const [wrongWords, setWrongWords] = useState<CurriculumWord[]>([]);
  const [options, setOptions] = useState<CurriculumWord[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakScore, setSpeakScore] = useState<number | null>(null);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [bankWords, setBankWords] = useState<string[]>([]);

  const stageConfig = lesson ? STAGE_CONFIG[lesson.stage] : null;

  useEffect(() => {
    if (lesson) setupQ(lesson, 0);
  }, [lesson]);

  const setupQ = useCallback((l: CurriculumLesson, idx: number) => {
    setAnswered(false);
    setChosen(null);
    setFlipped(false);
    setSpeakScore(null);
    const word = l.words[idx % l.words.length];
    if (l.stage === 'understand' || l.stage === 'prove') {
      const wrong = shuffle(l.words.filter(w => w.id !== word.id)).slice(0, 3);
      setOptions(shuffle([word, ...wrong]));
    }
    if (l.stage === 'practice') {
      const parts = shuffle(word.example.split(' '));
      setBankWords(parts);
      setPlacedWords([]);
    }
  }, []);

  if (!lesson || !stageConfig) {
    return (
      <div style={{ minHeight:'100vh', background:'#06101f', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
        <div style={{ fontSize:50 }}>🦊</div>
        <p style={{ color:'#f9c846', fontWeight:700 }}>Lesson not found!</p>
        <button onClick={() => router.push('/map')} className="btn-gold" style={{ padding:'12px 24px', borderRadius:12 }}>Back to Map</button>
      </div>
    );
  }

  const total = lesson.words.length;
  const current = lesson.words[qIndex % total];
  const pct = Math.round((qIndex / total) * 100);

  const playTTS = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'es-ES'; u.rate = 0.8; u.pitch = 1;
      window.speechSynthesis.speak(u);
    }
  };

  const handleCorrect = (xpGain: number) => {
    setScore(s => s + 1);
    setXp(x => x + xpGain);
    setAnswered(true);
  };

  const handleWrong = (word: CurriculumWord) => {
    setWrongWords(w => [...w, word]);
    setAnswered(true);
  };

  const next = () => {
    if (qIndex + 1 >= total) {
      // Lesson done
      if (lesson.stage === 'discover') {
        // Auto-pass discover
        completeLesson(total, total);
      } else {
        const finalScore = score + (answered && chosen === current.translation ? 1 : 0);
        completeLesson(finalScore, total);
      }
    } else {
      const nextIdx = qIndex + 1;
      setQIndex(nextIdx);
      setupQ(lesson, nextIdx);
    }
  };

  const completeLesson = (finalScore: number, total: number) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const key = `foxly_completed_${user?.uid || 'guest'}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      if (!existing.includes(lessonId)) {
        localStorage.setItem(key, JSON.stringify([...existing, lessonId]));
      }
    }
    setScore(finalScore);
    setPhase('result');
  };

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 100;
  const passed = lesson.stage === 'discover' || accuracy >= lesson.passThreshold;
  const stars = accuracy >= 90 ? 3 : accuracy >= 80 ? 2 : accuracy >= lesson.passThreshold ? 1 : 0;

  // ── RESULT SCREEN ──────────────────────────────────────────
  if (phase === 'result') {
    return (
      <div style={{ minHeight:'100vh', background:'#06101f', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 16px' }}>
        <div className="glass anim-card-in" style={{ maxWidth:460, width:'100%', borderRadius:28, padding:'40px 32px', textAlign:'center' }}>

          {/* Finn reaction */}
          <div style={{ fontSize:80, marginBottom:8, animation:'floatSimple 2s ease-in-out infinite' }}>
            {lesson.stage === 'discover' ? '🦊' : passed ? stars === 3 ? '🎉' : '🦊' : '😔'}
          </div>

          {/* Stars */}
          {lesson.stage !== 'discover' && (
            <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:16 }}>
              {[1,2,3].map(i => (
                <span key={i} className={i <= stars ? 'anim-pop-in' : ''} style={{ fontSize:36, filter: i <= stars ? 'drop-shadow(0 0 6px rgba(249,200,70,0.8))' : 'grayscale(1) opacity(0.3)', animationDelay:`${(i-1)*0.15}s` }}>⭐</span>
              ))}
            </div>
          )}

          <h2 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:28, marginBottom:8 }}>
            {lesson.stage === 'discover' ? 'Great exploring! 🦊' : passed ? stars === 3 ? '¡Perfecto! 🎉' : '¡Bien hecho! 👏' : 'So close! 💪'}
          </h2>

          <p style={{ fontSize:15, color:'var(--muted)', fontWeight:600, marginBottom:24, lineHeight:1.6 }}>
            {lesson.stage === 'discover'
              ? `You discovered ${total} new words! Come back tomorrow to practise them.`
              : passed
                ? `You scored ${accuracy}% — Finn is proud of you!`
                : `You scored ${accuracy}%. You need ${lesson.passThreshold}% to pass. Let's review the tricky words!`}
          </p>

          {/* Stats */}
          {lesson.stage !== 'discover' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:24 }}>
              {[
                { label:'Correct', value:`${score}/${total}`, color:'#22c55e' },
                { label:'Accuracy', value:`${accuracy}%`, color: passed ? '#f9c846' : '#ff6b6b' },
                { label:'XP', value:`+${xp}`, color:'#f9c846' },
              ].map(s => (
                <div key={s.label} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'14px 8px' }}>
                  <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:24, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Words recap */}
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'14px', marginBottom:20, textAlign:'left' }}>
            <div style={{ fontSize:12, fontWeight:800, color:'var(--muted)', letterSpacing:1, textTransform:'uppercase', marginBottom:10 }}>Words in this lesson</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {lesson.words.map(w => (
                <div key={w.id} style={{ display:'flex', alignItems:'center', gap:8, fontSize:14 }}>
                  <span>{w.emoji}</span>
                  <span style={{ fontWeight:800, color:'#f9c846' }}>{w.word}</span>
                  <span style={{ color:'var(--muted)' }}>—</span>
                  <span style={{ color:'var(--text)', fontWeight:600 }}>{w.translation}</span>
                  <button onClick={() => playTTS(w.word)} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', fontSize:14, opacity:0.7 }}>🔊</button>
                </div>
              ))}
            </div>
          </div>

          {passed ? (
            <button onClick={() => router.push('/learn?lang=spanish')} className="btn-gold"
              style={{ width:'100%', padding:'16px', borderRadius:14, fontSize:15, fontFamily:'inherit' }}>
              {lesson.stage === 'discover' ? '▶ Next Lesson' : '🗺️ Back to Path'}
            </button>
          ) : (
            <>
              <div style={{ background:'rgba(249,200,70,0.07)', border:'1px solid rgba(249,200,70,0.2)', borderRadius:12, padding:'12px 14px', marginBottom:14, fontSize:13, fontWeight:600, color:'var(--text)' }}>
                🦊 Finn says: "Don't worry! Let me show you the tricky words again, then you can try once more. You've got this!"
              </div>
              <button onClick={() => { setPhase('lesson'); setQIndex(0); setScore(0); setXp(0); setWrongWords([]); setupQ(lesson, 0); }} className="btn-gold"
                style={{ width:'100%', padding:'16px', borderRadius:14, fontSize:15, fontFamily:'inherit', marginBottom:10 }}>
                🔄 Review & Try Again
              </button>
              <button onClick={() => router.push('/learn?lang=spanish')} className="btn-ghost"
                style={{ width:'100%', padding:'12px', borderRadius:14, fontSize:14, fontFamily:'inherit', fontWeight:700 }}>
                Back to Path
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── LESSON SCREENS ─────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'#06101f', display:'flex', flexDirection:'column' }}>

      {/* Top bar */}
      <div style={{ position:'sticky', top:0, zIndex:100, padding:'12px 16px', display:'flex', alignItems:'center', gap:12, background:'rgba(6,16,31,0.95)', backdropFilter:'blur(18px)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => router.push('/learn?lang=spanish')}
          style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#f0eefc', cursor:'pointer', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>←</button>

        <div style={{ flex:1 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:800, color:'var(--muted)', marginBottom:5 }}>
            <span style={{ color: stageConfig.color }}>{stageConfig.icon} {stageConfig.label}</span>
            <span style={{ color:'#f9c846' }}>{qIndex + 1} / {total}</span>
          </div>
          <ProgressBar pct={pct} color={`linear-gradient(90deg,${stageConfig.color},${stageConfig.color}aa)`} height={8} />
        </div>

        <div style={{ fontSize:13, fontWeight:800, color:'#f9c846', flexShrink:0 }}>+{xp} XP</div>
      </div>

      {/* Lesson content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px 16px 100px', maxWidth:520, margin:'0 auto', width:'100%' }}>

        {/* Finn */}
        <FinnBubble
          message={
            answered
              ? chosen === current.translation || lesson.stage === 'discover'
                ? ['¡Correcto! Amazing! 🎉', '¡Fantástico! You nailed it! ⭐', '¡Perfecto! Keep going! 🔥'][qIndex % 3]
                : ['So close! The right answer is shown below 💪', 'Don\'t worry — you\'ll get it next time! 🦊', 'Almost! Check the answer below 📚'][qIndex % 3]
              : [stageConfig.tip, `Word ${qIndex+1} of ${total} — you can do this! 💪`, 'Take your time — Finn is cheering for you! 🦊'][qIndex % 3]
          }
          mood={answered ? (chosen === current.translation || lesson.stage === 'discover' ? 'celebrating' : 'thinking') : 'happy'}
        />

        {/* ── DISCOVER LESSON ── */}
        {lesson.stage === 'discover' && (
          <DiscoverCard word={current} onPlay={playTTS} onNext={() => {
            if (qIndex + 1 >= total) completeLesson(total, total);
            else { setQIndex(i => i + 1); setupQ(lesson, qIndex + 1); }
          }} isLast={qIndex + 1 >= total} />
        )}

        {/* ── UNDERSTAND / PROVE LESSON (MCQ) ── */}
        {(lesson.stage === 'understand' || lesson.stage === 'prove') && (
          <div className="glass anim-card-in" style={{ width:'100%', borderRadius:22, padding:'28px 24px' }}>
            <div style={{ fontSize:11, fontWeight:800, color: stageConfig.color, letterSpacing:1, textTransform:'uppercase', marginBottom:16 }}>
              What does this mean?
            </div>

            {/* Word display */}
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:56, marginBottom:8 }}>{current.emoji}</div>
              <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:44, color:'#f9c846', marginBottom:4 }}>{current.word}</div>
              <div style={{ fontSize:14, color:'var(--muted)', fontWeight:600 }}>/{current.pronunciation}/</div>
            </div>

            <button onClick={() => playTTS(current.word)}
              style={{ display:'flex', alignItems:'center', gap:6, margin:'0 auto 20px', padding:'8px 18px', borderRadius:50, background:'rgba(61,217,200,0.1)', border:'1px solid rgba(61,217,200,0.25)', color:'#3dd9c8', fontSize:13, fontWeight:800, cursor:'pointer' }}>
              🔊 Hear it
            </button>

            {/* Options */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {options.map(opt => {
                const isCorrect = opt.translation === current.translation;
                const isChosen = chosen === opt.translation;
                let bg = 'rgba(255,255,255,0.05)';
                let border = 'rgba(255,255,255,0.11)';
                let color = '#f0eefc';
                if (answered) {
                  if (isCorrect) { bg = 'rgba(34,197,94,0.15)'; border = '#22c55e'; color = '#22c55e'; }
                  else if (isChosen) { bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#ef4444'; }
                }
                return (
                  <button key={opt.id} disabled={answered}
                    onClick={() => { setChosen(opt.translation); if(isCorrect) handleCorrect(lesson.stage==='prove'?15:10); else handleWrong(current); }}
                    style={{ padding:'14px 10px', borderRadius:14, background:bg, border:`1.5px solid ${border}`, color, fontWeight:800, fontSize:14, cursor:answered?'default':'pointer', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'inherit' }}
                    onMouseEnter={e => { if(!answered)(e.currentTarget.style.background='rgba(255,255,255,0.1)'); }}
                    onMouseLeave={e => { if(!answered)(e.currentTarget.style.background=bg); }}>
                    {opt.emoji} {opt.translation}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div style={{ marginTop:16 }}>
                {chosen !== current.translation && (
                  <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:12, padding:'10px 14px', marginBottom:12, fontSize:13, fontWeight:600 }}>
                    <strong style={{color:'#ef4444'}}>Correct answer: </strong><span style={{color:'#f0eefc'}}>{current.emoji} {current.translation}</span>
                    <br /><span style={{color:'var(--muted)'}}>Example: {current.example} — "{current.exampleTranslation}"</span>
                  </div>
                )}
                <button onClick={next} className="btn-gold"
                  style={{ width:'100%', padding:'14px', borderRadius:12, fontSize:15, fontFamily:'inherit' }}>
                  {qIndex + 1 >= total ? '🏁 See Results' : 'Continue →'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── PRACTICE LESSON (Sentence builder + speak) ── */}
        {lesson.stage === 'practice' && (
          <div className="glass anim-card-in" style={{ width:'100%', borderRadius:22, padding:'28px 24px' }}>
            <div style={{ fontSize:11, fontWeight:800, color: stageConfig.color, letterSpacing:1, textTransform:'uppercase', marginBottom:16 }}>
              🎤 Say it out loud!
            </div>

            <div style={{ textAlign:'center', marginBottom:16 }}>
              <div style={{ fontSize:52, marginBottom:6 }}>{current.emoji}</div>
              <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:40, color:'#f9c846', marginBottom:4 }}>{current.word}</div>
              <div style={{ fontSize:14, color:'var(--muted)', fontWeight:600, marginBottom:4 }}>/{current.pronunciation}/</div>
              <div style={{ fontSize:13, color:'#3dd9c8', fontWeight:700 }}>{current.translation}</div>
            </div>

            <button onClick={() => playTTS(current.word)}
              style={{ display:'flex', alignItems:'center', gap:6, margin:'0 auto 20px', padding:'8px 18px', borderRadius:50, background:'rgba(61,217,200,0.1)', border:'1px solid rgba(61,217,200,0.25)', color:'#3dd9c8', fontSize:13, fontWeight:800, cursor:'pointer' }}>
              🔊 Hear Finn say it
            </button>

            {/* Mic */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, marginBottom:16 }}>
              <button onClick={() => {
                const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                if (!SR) { const s = 65+Math.floor(Math.random()*30); setSpeakScore(s); if(s>=65) handleCorrect(12); else handleWrong(current); return; }
                setListening(true);
                const r = new SR(); r.lang='es-ES'; r.continuous=false; r.interimResults=false;
                r.onresult = (e:any) => {
                  const said = e.results[0][0].transcript.toLowerCase().trim();
                  const target = current.word.toLowerCase().trim();
                  const sc = said===target?100:said.includes(target)||target.includes(said)?78:45+Math.floor(Math.random()*25);
                  setListening(false); setSpeakScore(sc); if(sc>=65) handleCorrect(12); else handleWrong(current);
                };
                r.onerror = () => { setListening(false); const s = 55+Math.floor(Math.random()*30); setSpeakScore(s); if(s>=65) handleCorrect(12); else handleWrong(current); };
                r.start(); setTimeout(()=>{try{r.stop();}catch{}},4000);
              }} disabled={answered || listening}
              style={{
                width:72, height:72, borderRadius:'50%', border:'none', cursor: answered||listening?'default':'pointer', fontSize:28, display:'flex', alignItems:'center', justifyContent:'center',
                background: listening?'linear-gradient(135deg,#ef4444,#fb923c)':'linear-gradient(135deg,#fb923c,#f9c846)',
                boxShadow: listening?'0 0 0 0 rgba(239,68,68,0.5)':'0 8px 28px rgba(249,200,70,0.4)',
                animation: listening?'micPulse 1s ease-in-out infinite':'none',
                opacity: answered?0.5:1,
              }}>
                {listening?'🔴':'🎤'}
              </button>
              <span style={{ fontSize:13, fontWeight:700, color:'var(--muted)' }}>
                {listening?'Listening...':answered?'Done!':'Tap to speak'}
              </span>
              {speakScore !== null && (
                <div style={{ width:'100%' }}>
                  <ProgressBar pct={speakScore} color={speakScore>=85?'#22c55e':speakScore>=65?'#f9c846':'#ef4444'} height={10} />
                  <div style={{ textAlign:'center', marginTop:6, fontWeight:800, fontSize:15, color: speakScore>=85?'#f9c846':speakScore>=65?'#22c55e':'var(--muted)' }}>
                    {speakScore>=85?'🌟 Excellent!':speakScore>=65?'✅ Good job!':'💪 Keep practising!'} {speakScore}%
                  </div>
                </div>
              )}
            </div>

            {answered && (
              <button onClick={next} className="btn-gold"
                style={{ width:'100%', padding:'14px', borderRadius:12, fontSize:15, fontFamily:'inherit' }}>
                {qIndex + 1 >= total ? '🏁 See Results' : 'Continue →'}
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`@keyframes micPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.5)}50%{box-shadow:0 0 0 18px rgba(239,68,68,0)}}`}</style>
    </div>
  );
}

// ── DISCOVER CARD ────────────────────────────────────────────
function DiscoverCard({ word, onPlay, onNext, isLast }: { word: CurriculumWord; onPlay: (w:string)=>void; onNext: ()=>void; isLast: boolean }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
    // Auto-play audio
    setTimeout(() => onPlay(word.word), 400);
  }, [word.id]);

  return (
    <div className="glass anim-card-in" style={{ width:'100%', borderRadius:24, padding:'32px 28px', textAlign:'center' }}>
      <div style={{ fontSize:11, fontWeight:800, color:'#9b7ff4', letterSpacing:1, textTransform:'uppercase', marginBottom:20 }}>
        👀 Discover — No scoring today!
      </div>

      {/* Word card */}
      <div style={{ background:'linear-gradient(135deg,rgba(155,127,244,0.12),rgba(249,200,70,0.08))', border:'1px solid rgba(155,127,244,0.25)', borderRadius:20, padding:'32px 24px', marginBottom:20 }}>
        <div style={{ fontSize:72, marginBottom:12 }}>{word.emoji}</div>
        <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:52, color:'#f9c846', marginBottom:6 }}>{word.word}</div>
        <div style={{ fontSize:15, color:'var(--muted)', fontWeight:600, marginBottom:16 }}>/{word.pronunciation}/</div>

        <button onClick={() => onPlay(word.word)}
          style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'10px 20px', borderRadius:50, background:'rgba(61,217,200,0.1)', border:'1px solid rgba(61,217,200,0.25)', color:'#3dd9c8', fontSize:14, fontWeight:800, cursor:'pointer', marginBottom:20 }}>
          🔊 Hear it again
        </button>

        {/* Tap to reveal translation */}
        {!revealed ? (
          <button onClick={() => setRevealed(true)}
            style={{ display:'block', width:'100%', padding:'12px', borderRadius:12, background:'rgba(249,200,70,0.08)', border:'1.5px dashed rgba(249,200,70,0.3)', color:'#f9c846', fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>
            Tap to see the meaning 👆
          </button>
        ) : (
          <div className="anim-pop-in">
            <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:28, color:'#3dd9c8', marginBottom:8 }}>
              {word.translation}
            </div>
            <div style={{ fontSize:13, color:'var(--muted)', fontWeight:600, fontStyle:'italic', lineHeight:1.5 }}>
              "{word.example}"
              <br />
              <span style={{ color:'rgba(240,238,252,0.4)' }}>"{word.exampleTranslation}"</span>
            </div>
          </div>
        )}
      </div>

      <button onClick={onNext} className="btn-gold"
        style={{ width:'100%', padding:'15px', borderRadius:14, fontSize:15, fontFamily:'inherit' }}>
        {isLast ? '🏁 Finish Lesson' : 'Next word →'}
      </button>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight:'100vh', background:'#06101f', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:60, animation:'floatSimple 2s ease-in-out infinite' }}>🦊</div>
        <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, color:'#f9c846', fontSize:18, marginTop:12 }}>Loading lesson...</div>
      </div>
    </div>
  );
}
