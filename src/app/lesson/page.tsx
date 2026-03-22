'use client';
// src/app/lesson/page.tsx — Full lesson engine

import { Suspense } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useFoxlyStore } from '@/lib/store';
import { saveLessonResult, checkAndAwardBadges } from '@/lib/db';
import { getLessonWords, DRAG_SENTENCES } from '@/data/lessons';
import toast from 'react-hot-toast';
import type { Language, LessonType, LessonWord } from '@/types';

// ── Wrap the whole page in Suspense for useSearchParams ──────
export default function LessonPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LessonContent />
    </Suspense>
  );
}

const LESSON_LENGTH = 6;

const FINN_PHRASES: Record<string, string[]> = {
  mcq:     ['Tap the right answer! You got this! 🎯', 'Think carefully — Finn believes in you!', 'Which one matches? 🤔'],
  flash:   ['Tap the card to reveal the answer! 🃏', 'Study it well, then flip!', 'You\'re getting so good at this! 🌟'],
  drag:    ['Put the words in the right order! 🧩', 'Drag to build the sentence!', 'Almost there!'],
  speak:   ['Say the word out loud! Finn is listening! 🎤', 'Speak clearly and slowly!', 'Your pronunciation is getting great!'],
  correct: ['¡Correcto! You nailed it! 🎉', 'Fantastique! Finn is dancing! 💃', 'Perfecto! ⭐', '¡Increíble! 🔥'],
  wrong:   ['Oops! Almost there! 💪', 'Don\'t worry — Finn got this wrong too at first!', 'So close! Next time! 🦊'],
};

function pick(arr: string[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }


function LessonContent() {
  const router = useRouter();
  const params = useSearchParams();
  const lang = (params.get('lang') || 'spanish') as Language;
  const user = useFoxlyStore((s) => s.user);

  const [lessonType, setLessonType] = useState<LessonType>('mcq');
  const [words, setWords] = useState<LessonWord[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [lives, setLives] = useState(3);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [finnMsg, setFinnMsg] = useState(pick(FINN_PHRASES.mcq));
  const [done, setDone] = useState(false);
  const [startTime] = useState(Date.now());

  // MCQ state
  const [options, setOptions] = useState<LessonWord[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);

  // Drag state
  const [placed, setPlaced] = useState<string[]>([]);
  const [bank, setBank] = useState<string[]>([]);

  // Speak state
  const [listening, setListening] = useState(false);
  const [speakScore, setSpeakScore] = useState<number | null>(null);

  // Flash state
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const w = shuffle(getLessonWords(lang));
    setWords(w);
  }, [lang]);

  useEffect(() => {
    if (words.length > 0) setupQuestion();
  }, [words, qIndex, lessonType]);

  const setupQuestion = useCallback(() => {
    setAnswered(false);
    setFeedback(null);
    setChosen(null);
    setFlipped(false);
    setSpeakScore(null);
    setFinnMsg(pick(FINN_PHRASES[lessonType]));

    const current = words[qIndex % words.length];

    if (lessonType === 'mcq') {
      const wrong = shuffle(words.filter(w => w.word !== current.word)).slice(0, 3);
      setOptions(shuffle([current, ...wrong]));
    }

    if (lessonType === 'drag') {
      const sentences = DRAG_SENTENCES[lang] || DRAG_SENTENCES.spanish;
      const s = sentences[qIndex % sentences.length];
      setBank(shuffle(s.words));
      setPlaced([]);
    }
  }, [words, qIndex, lessonType, lang]);

  const handleCorrect = (xpGain: number) => {
    setScore(s => s + 1);
    setXp(x => x + xpGain);
    setFeedback('correct');
    setFinnMsg(pick(FINN_PHRASES.correct));
    setAnswered(true);
  };

  const handleWrong = () => {
    setLives(l => Math.max(0, l - 1));
    setFeedback('wrong');
    setFinnMsg(pick(FINN_PHRASES.wrong));
    setAnswered(true);
  };

  const next = async () => {
    setFeedback(null);
    if (qIndex + 1 >= LESSON_LENGTH) {
      // Lesson complete
      if (user) {
        const duration = Math.round((Date.now() - startTime) / 1000);
        await saveLessonResult(user.uid, {
          language: lang, lessonType, score,
          total: LESSON_LENGTH,
          accuracy: Math.round((score / LESSON_LENGTH) * 100),
          xpEarned: xp, duration, wordsLearned: words.slice(0, LESSON_LENGTH).map(w => w.word),
        });
        const newBadges = await checkAndAwardBadges(user.uid);
        newBadges.forEach(b => toast.success(`🏆 Badge unlocked: ${b.replace('_',' ')}!`));
      }
      setDone(true);
    } else {
      setQIndex(i => i + 1);
    }
  };

  const current = words[qIndex % words.length];
  if (!current) return <LoadingScreen />;

  const playTTS = (word: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(word);
      utt.lang = langCode; utt.rate = 0.8;
      window.speechSynthesis.speak(utt);
    }
  };

  const langCodes: Record<Language, string> = {
    spanish: 'es-ES', french: 'fr-FR', german: 'de-DE', japanese: 'ja-JP', arabic: 'ar-SA',
  };

  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { simulateSpeak(); return; }
    setListening(true);
    const r = new SR();
    r.lang = langCodes[lang]; r.continuous = false; r.interimResults = false;
    r.onresult = (e: any) => {
      const said = e.results[0][0].transcript.toLowerCase().trim();
      const target = current.word.toLowerCase().trim();
      const sc = said === target ? 100 : said.includes(target) || target.includes(said) ? 78 : 45 + Math.floor(Math.random() * 25);
      finishSpeak(sc);
    };
    r.onerror = () => simulateSpeak();
    r.start();
    setTimeout(() => { try { r.stop(); } catch {} }, 4000);
  };

  const simulateSpeak = () => setTimeout(() => finishSpeak(60 + Math.floor(Math.random() * 35)), 1500);

  const finishSpeak = (sc: number) => {
    setListening(false);
    setSpeakScore(sc);
    if (sc >= 65) handleCorrect(12);
    else handleWrong();
  };

  if (done) {
    return (
      <CompletionScreen score={score} total={LESSON_LENGTH} xp={xp}
        lang={lang} onMap={() => router.push('/map')}
        onAgain={() => { setDone(false); setQIndex(0); setScore(0); setXp(0); setLives(3); }} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>

      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 sticky top-0 z-40"
           style={{ background: 'rgba(6,16,31,0.92)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => router.push('/map')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold transition-all hover:opacity-80"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid var(--border)' }}>←</button>
        <div className="flex-1">
          <div className="flex justify-between text-xs font-extrabold mb-1" style={{ color: 'var(--gold)' }}>
            <span>{qIndex + 1} / {LESSON_LENGTH}</span>
            <span>+{xp} XP</span>
          </div>
          <div className="progress-track h-2.5">
            <div className="progress-fill h-2.5" style={{ width: `${((qIndex) / LESSON_LENGTH) * 100}%` }} />
          </div>
        </div>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <span key={i} className="text-lg transition-all" style={{ opacity: i < lives ? 1 : 0.2 }}>❤️</span>
          ))}
        </div>
      </div>

      {/* Main lesson area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-lg mx-auto w-full">

        {/* Finn coach */}
        <div className="flex items-end gap-3 mb-5 self-start">
          <span className="text-4xl" style={{ animation: 'float 2.5s ease-in-out infinite' }}>🦊</span>
          <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm font-bold max-w-xs"
               style={{ background: 'rgba(13,24,53,0.9)', border: '1px solid rgba(249,200,70,0.2)', color: 'var(--text)' }}>
            {finnMsg}
          </div>
        </div>

        {/* Lesson card */}
        <AnimatePresence mode="wait">
          <motion.div key={`${qIndex}-${lessonType}`}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full glass-card p-7">

            {/* MCQ */}
            {lessonType === 'mcq' && (
              <div>
                <div className="text-xs font-extrabold mb-4 tracking-wide" style={{ color: 'var(--gold)' }}>🎯 WHAT DOES THIS MEAN?</div>
                <div className="text-center mb-3">
                  <div className="text-5xl mb-2">{current.emoji}</div>
                  <div className="font-baloo font-extrabold text-4xl mb-1" style={{ color: 'var(--gold)' }}>{current.word}</div>
                  <div className="text-sm font-bold" style={{ color: 'var(--muted)' }}>/{current.pronunciation}/</div>
                </div>
                <button onClick={() => playTTS(current.word, langCodes[lang])}
                  className="flex items-center gap-2 mx-auto mb-5 px-4 py-2 rounded-full text-sm font-extrabold transition-all hover:opacity-80"
                  style={{ background: 'rgba(61,217,200,0.1)', border: '1px solid rgba(61,217,200,0.25)', color: '#3dd9c8' }}>
                  🔊 Hear it
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {options.map(o => {
                    const isCorrect = o.translation === current.translation;
                    const isChosen = chosen === o.translation;
                    let bg = 'rgba(255,255,255,0.05)';
                    let border = 'var(--border)';
                    let color = 'var(--text)';
                    if (answered) {
                      if (isCorrect) { bg = 'rgba(34,197,94,0.15)'; border = '#22c55e'; color = '#22c55e'; }
                      else if (isChosen) { bg = 'rgba(239,68,68,0.15)'; border = '#ef4444'; color = '#ef4444'; }
                    }
                    return (
                      <button key={o.translation} disabled={answered}
                        onClick={() => {
                          setChosen(o.translation);
                          if (isCorrect) handleCorrect(10);
                          else handleWrong();
                        }}
                        className="py-4 rounded-2xl font-extrabold text-sm transition-all hover:opacity-90 disabled:cursor-default"
                        style={{ background: bg, border: `1.5px solid ${border}`, color }}>
                        {o.emoji} {o.translation}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FLASHCARD */}
            {lessonType === 'flashcard' && (
              <div>
                <div className="text-xs font-extrabold mb-4 tracking-wide" style={{ color: 'var(--gold)' }}>🃏 TAP TO FLIP</div>
                <div className="cursor-pointer" onClick={() => setFlipped(!flipped)} style={{ perspective: '800px' }}>
                  <motion.div animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.5 }} style={{ transformStyle: 'preserve-3d', position: 'relative', height: '160px' }}>
                    {/* Front */}
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center"
                         style={{ backfaceVisibility: 'hidden', background: 'rgba(249,200,70,0.08)', border: '1px solid rgba(249,200,70,0.2)' }}>
                      <div className="text-5xl mb-2">{current.emoji}</div>
                      <div className="font-baloo font-extrabold text-4xl" style={{ color: 'var(--gold)' }}>{current.word}</div>
                      <div className="text-sm font-bold mt-1" style={{ color: 'var(--muted)' }}>/{current.pronunciation}/</div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4"
                         style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'rgba(61,217,200,0.08)', border: '1px solid rgba(61,217,200,0.2)' }}>
                      <div className="font-baloo font-extrabold text-3xl mb-2" style={{ color: '#3dd9c8' }}>{current.translation}</div>
                      <div className="text-sm text-center font-semibold" style={{ color: 'var(--muted)' }}>"{current.example}"</div>
                    </div>
                  </motion.div>
                </div>
                <button onClick={() => playTTS(current.word, langCodes[lang])}
                  className="flex items-center gap-2 mx-auto mt-4 px-4 py-2 rounded-full text-sm font-extrabold"
                  style={{ background: 'rgba(61,217,200,0.1)', border: '1px solid rgba(61,217,200,0.25)', color: '#3dd9c8' }}>
                  🔊 Hear it
                </button>
                {!answered && (
                  <div className="flex gap-3 mt-5">
                    <button onClick={() => handleCorrect(8)}
                      className="flex-1 py-3 rounded-2xl font-extrabold text-sm"
                      style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
                      ✅ I knew it!
                    </button>
                    <button onClick={() => handleWrong()}
                      className="flex-1 py-3 rounded-2xl font-extrabold text-sm"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
                      ❌ Still learning
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* DRAG & DROP */}
            {lessonType === 'drag' && (
              <div>
                <div className="text-xs font-extrabold mb-2 tracking-wide" style={{ color: 'var(--gold)' }}>🧩 BUILD THE SENTENCE</div>
                <div className="text-base font-extrabold mb-4" style={{ color: '#3dd9c8' }}>
                  "{(DRAG_SENTENCES[lang] || DRAG_SENTENCES.spanish)[qIndex % (DRAG_SENTENCES[lang] || DRAG_SENTENCES.spanish).length].translation}"
                </div>
                {/* Drop zone */}
                <div className="min-h-12 rounded-2xl p-3 flex flex-wrap gap-2 items-center mb-4"
                     style={{ border: `2px dashed ${placed.length ? 'rgba(249,200,70,0.4)' : 'rgba(255,255,255,0.15)'}`, background: 'rgba(249,200,70,0.03)' }}>
                  {placed.length === 0 && <span className="text-sm font-bold" style={{ color: 'var(--muted)' }}>Tap words to build...</span>}
                  {placed.map((w, i) => (
                    <button key={`${w}-${i}`} disabled={answered}
                      onClick={() => { setPlaced(p => p.filter((_,j) => j !== i)); setBank(b => [...b, w]); }}
                      className="px-3 py-1.5 rounded-xl text-sm font-extrabold transition-all"
                      style={{ background: 'rgba(249,200,70,0.12)', border: '1.5px solid rgba(249,200,70,0.35)', color: 'var(--gold)' }}>
                      {w}
                    </button>
                  ))}
                </div>
                {/* Word bank */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {bank.map((w, i) => (
                    <button key={`${w}-${i}`} disabled={answered}
                      onClick={() => { setBank(b => b.filter((_,j) => j !== i)); setPlaced(p => [...p, w]); }}
                      className="px-3 py-1.5 rounded-xl text-sm font-extrabold transition-all hover:opacity-80"
                      style={{ background: 'rgba(155,127,244,0.15)', border: '1.5px solid rgba(155,127,244,0.3)', color: '#9b7ff4' }}>
                      {w}
                    </button>
                  ))}
                </div>
                {!answered && placed.length > 0 && (
                  <button onClick={() => {
                    const sentence = placed.join(' ');
                    const correct = (DRAG_SENTENCES[lang] || DRAG_SENTENCES.spanish)[qIndex % (DRAG_SENTENCES[lang] || DRAG_SENTENCES.spanish).length].words.join(' ');
                    if (sentence === correct) handleCorrect(15);
                    else handleWrong();
                  }}
                  className="w-full py-3 rounded-2xl font-extrabold text-sm"
                  style={{ background: 'linear-gradient(135deg,#f9c846,#e8960f)', color: '#06101f' }}>
                    Check Answer ✓
                  </button>
                )}
              </div>
            )}

            {/* SPEAK */}
            {lessonType === 'speak' && (
              <div>
                <div className="text-xs font-extrabold mb-4 tracking-wide" style={{ color: 'var(--gold)' }}>🎤 SAY IT OUT LOUD!</div>
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">{current.emoji}</div>
                  <div className="font-baloo font-extrabold text-4xl mb-1" style={{ color: 'var(--gold)' }}>{current.word}</div>
                  <div className="text-sm font-bold mb-1" style={{ color: 'var(--muted)' }}>/{current.pronunciation}/</div>
                  <div className="text-sm font-bold" style={{ color: '#3dd9c8' }}>{current.translation}</div>
                </div>
                <button onClick={() => playTTS(current.word, langCodes[lang])}
                  className="flex items-center gap-2 mx-auto mb-5 px-4 py-2 rounded-full text-sm font-extrabold"
                  style={{ background: 'rgba(61,217,200,0.1)', border: '1px solid rgba(61,217,200,0.25)', color: '#3dd9c8' }}>
                  🔊 Hear Finn say it
                </button>
                <div className="flex flex-col items-center gap-3">
                  <button onClick={startListening} disabled={answered || listening}
                    className="w-20 h-20 rounded-full font-extrabold text-3xl transition-all"
                    style={{
                      background: listening ? 'linear-gradient(135deg,#ef4444,#fb923c)' : 'linear-gradient(135deg,#fb923c,#f9c846)',
                      boxShadow: listening ? '0 0 0 12px rgba(239,68,68,0.2)' : '0 8px 28px rgba(249,200,70,0.4)',
                      animation: listening ? 'micPulse 1s ease-in-out infinite' : 'none',
                    }}>
                    {listening ? '🔴' : '🎤'}
                  </button>
                  <span className="text-sm font-extrabold" style={{ color: 'var(--muted)' }}>
                    {listening ? 'Listening...' : answered ? 'Done!' : 'Tap to speak'}
                  </span>
                  {speakScore !== null && (
                    <div className="w-full">
                      <div className="progress-track h-3 mb-1">
                        <div className="h-3 rounded-full transition-all"
                             style={{ width: `${speakScore}%`, background: `linear-gradient(90deg,${speakScore >= 85 ? '#22c55e' : speakScore >= 65 ? '#f9c846' : '#ef4444'},#3dd9c8)` }} />
                      </div>
                      <div className="text-center font-extrabold text-lg" style={{ color: speakScore >= 85 ? '#f9c846' : speakScore >= 65 ? '#22c55e' : 'var(--muted)' }}>
                        {speakScore >= 85 ? '🌟 Excellent!' : speakScore >= 65 ? '✅ Good!' : '💪 Keep practising!'} {speakScore}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback banner */}
      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            className="fixed bottom-16 left-0 right-0 z-50 px-4 py-4 flex items-center gap-3"
            style={{
              background: feedback === 'correct' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.1)',
              borderTop: `2px solid ${feedback === 'correct' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.25)'}`,
            }}>
            <span className="text-2xl">{feedback === 'correct' ? '✅' : '❌'}</span>
            <div className="flex-1">
              <div className="font-baloo font-extrabold text-lg">{feedback === 'correct' ? '¡Correcto! 🎉' : 'Not quite!'}</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>
                {feedback === 'correct' ? `+${lessonType === 'drag' ? 15 : lessonType === 'speak' ? 12 : lessonType === 'flashcard' ? 8 : 10} XP earned!` : `Answer: ${current.translation}`}
              </div>
            </div>
            <button onClick={next}
              className="px-5 py-2.5 rounded-xl font-extrabold text-sm"
              style={{ background: feedback === 'correct' ? '#22c55e' : '#ef4444', color: '#fff' }}>
              Continue →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom lesson type nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex"
           style={{ background: 'rgba(6,16,31,0.95)', backdropFilter: 'blur(18px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {(['mcq','flashcard','drag','speak'] as LessonType[]).map(t => (
          <button key={t} onClick={() => { setLessonType(t); setQIndex(0); setScore(0); setXp(0); setLives(3); setAnswered(false); setFeedback(null); }}
            className="flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-extrabold transition-all"
            style={{ color: lessonType === t ? 'var(--gold)' : 'var(--muted)' }}>
            <span className="text-xl">{{'mcq':'🎯','flashcard':'🃏','drag':'🧩','speak':'🎤'}[t]}</span>
            {{'mcq':'Quiz','flashcard':'Cards','drag':'Build','speak':'Speak'}[t]}
          </button>
        ))}
      </div>

      <style>{`@keyframes micPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.5)}50%{box-shadow:0 0 0 18px rgba(239,68,68,0)}}`}</style>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <div className="text-6xl mb-4" style={{ animation: 'float 2s ease-in-out infinite' }}>🦊</div>
        <div className="font-baloo font-extrabold text-xl" style={{ color: 'var(--gold)' }}>Loading lesson...</div>
      </div>
    </div>
  );
}

function CompletionScreen({ score, total, xp, lang, onMap, onAgain }: any) {
  const acc = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="glass-card p-10 max-w-md w-full text-center">
        <div className="text-7xl mb-2" style={{ animation: 'float 2s ease-in-out infinite' }}>🦊</div>
        <div className="flex gap-2 justify-center text-3xl mb-4">🎉 ⭐ 🎊 🌟</div>
        <h1 className="font-baloo font-extrabold text-3xl mb-2 text-gold-gradient">¡Increíble!</h1>
        <p className="text-sm font-semibold mb-6" style={{ color: 'var(--muted)' }}>Finn is SO proud of you right now!</p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { val: score, label: 'Correct' },
            { val: `${acc}%`, label: 'Accuracy' },
            { val: `+${xp}`, label: 'XP Earned' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl py-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
              <div className="font-baloo font-extrabold text-2xl" style={{ color: 'var(--gold)' }}>{s.val}</div>
              <div className="text-xs font-bold mt-1" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={onMap} className="w-full py-4 rounded-2xl font-extrabold text-base mb-3"
          style={{ background: 'linear-gradient(135deg,#f9c846,#e8960f)', color: '#06101f', boxShadow: '0 6px 24px rgba(249,200,70,0.35)' }}>
          🗺️ Back to World Map
        </button>
        <button onClick={onAgain} className="w-full py-3 rounded-2xl font-extrabold text-sm"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid var(--border)' }}>
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}
