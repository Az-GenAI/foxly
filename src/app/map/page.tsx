'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useFoxlyStore } from '@/lib/store';
import { calculateLevel } from '@/lib/db';
import { FoxlyNav, XPPill, StreakPill, AvatarBtn, PageWrapper } from '@/components/ui';

const KINGDOMS = [
  { id:'spanish',  name:'Spanish',  theme:'The Fiesta Kingdom',      emoji:'🌮', color:'#fb923c', glow:'rgba(251,146,60,0.35)',  unlockLevel:1,  description:'Start your Spanish adventure! Learn to speak, read and understand Spanish from absolute zero.' },
  { id:'french',   name:'French',   theme:'The Enchanted Château',   emoji:'🏰', color:'#c084fc', glow:'rgba(192,132,252,0.35)', unlockLevel:1,  description:'Discover the magic of French — the language of art, food and romance.' },
  { id:'german',   name:'German',   theme:'The Clockwork Kingdom',   emoji:'⚙️', color:'#60a5fa', glow:'rgba(96,165,250,0.35)',  unlockLevel:4,  description:'Unlock the precision of German — powerful, logical and fascinating.' },
  { id:'japanese', name:'Japanese', theme:'Cherry Blossom Empire',   emoji:'🌸', color:'#f472b6', glow:'rgba(244,114,182,0.35)', unlockLevel:6,  description:'Enter the ancient Cherry Blossom Empire — anime, sushi and samurai await.' },
  { id:'arabic',   name:'Arabic',   theme:'The Desert Star Realm',   emoji:'🌙', color:'#fbbf24', glow:'rgba(251,191,36,0.35)',  unlockLevel:5,  description:'Explore the Desert Star Realm — one of the world\'s most beautiful languages.' },
];

export default function MapPage() {
  const router = useRouter();
  const user = useFoxlyStore(s => s.user);
  const [selected, setSelected] = useState<typeof KINGDOMS[0] | null>(null);
  const userLevel = user ? calculateLevel(user.xp) : 1;

  return (
    <PageWrapper>
      {/* Stars */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        {Array.from({length:80}).map((_,i) => (
          <div key={i} style={{
            position:'absolute', borderRadius:'50%', background:'#fff',
            width: `${Math.random()*2+0.5}px`, height: `${Math.random()*2+0.5}px`,
            top:`${Math.random()*70}%`, left:`${Math.random()*100}%`,
            opacity: Math.random()*0.7+0.1,
            animation:`twinkle ${2+Math.random()*3}s ease-in-out infinite ${Math.random()*4}s`,
          }} />
        ))}
      </div>

      {/* Nav */}
      <FoxlyNav right={
        <>
          {user && <XPPill xp={user.xp} />}
          {user && <StreakPill streak={user.streak} />}
          <AvatarBtn avatar={user?.avatar || '🦊'} onClick={() => router.push('/profile')} />
        </>
      } />

      {/* Language pills */}
      <div style={{ position:'fixed', top:58, left:0, right:0, zIndex:150, display:'flex', gap:8, padding:'8px 16px', overflowX:'auto', background:'rgba(6,16,31,0.8)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        {KINGDOMS.map((k,i) => {
          const locked = userLevel < k.unlockLevel;
          return (
            <button key={k.id} onClick={() => setSelected(k)}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:50, fontSize:12, fontWeight:800, flexShrink:0, cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit',
                background: selected?.id===k.id ? `rgba(${locked?'255,255,255':'249,200,70'},0.12)` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${selected?.id===k.id?(locked?'rgba(255,255,255,0.2)':'rgba(249,200,70,0.3)'):'rgba(255,255,255,0.08)'}`,
                color: selected?.id===k.id?(locked?'var(--muted)':'#f9c846'):'var(--muted)',
                opacity: locked ? 0.5 : 1,
              }}>
              {k.emoji} {k.name} {locked && '🔒'}
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div style={{ position:'relative', zIndex:10, paddingTop:110, paddingBottom:120, minHeight:'100vh' }}>
        <div style={{ maxWidth:700, margin:'0 auto', padding:'0 16px' }}>

          {/* Title */}
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ fontSize:12, fontWeight:800, letterSpacing:2, textTransform:'uppercase', color:'#f9c846', marginBottom:8 }}>🌍 Choose Your Kingdom</div>
            <h1 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:'clamp(26px,5vw,40px)', lineHeight:1.2, background:'linear-gradient(140deg,#fff,#f9c846)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Five Worlds Await<br />Your Exploration
            </h1>
          </div>

          {/* Top row: Spanish, French, German */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:14 }}>
            {KINGDOMS.slice(0,3).map((k,i) => (
              <KingdomCard key={k.id} kingdom={k} userLevel={userLevel} selected={selected?.id===k.id} onClick={() => setSelected(k)} />
            ))}
          </div>

          {/* Finn */}
          <div style={{ textAlign:'center', margin:'24px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
            <div style={{ fontSize:52, animation:'float 3s ease-in-out infinite', filter:'drop-shadow(0 8px 20px rgba(249,200,70,0.5))' }}>🦊</div>
            <div style={{ background:'rgba(13,24,53,0.9)', border:'1px solid rgba(249,200,70,0.25)', borderRadius:'14px 14px 14px 4px', padding:'10px 16px', fontSize:13, fontWeight:700, color:'#f0eefc', maxWidth:240 }}>
              {selected ? `Let's explore ${selected.name}! 🚀` : 'Tap a kingdom to begin! 🗺️'}
            </div>
          </div>

          {/* Bottom row: Arabic, Japanese */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, maxWidth:360, margin:'0 auto' }}>
            {KINGDOMS.slice(3).map(k => (
              <KingdomCard key={k.id} kingdom={k} userLevel={userLevel} selected={selected?.id===k.id} onClick={() => setSelected(k)} />
            ))}
          </div>

          {/* Sea decorations */}
          <div style={{ display:'flex', justifyContent:'space-around', marginTop:32, opacity:0.15, fontSize:24, pointerEvents:'none' }}>
            {['⛵','🐬','🐋','⛵'].map((e,i) => <span key={i}>{e}</span>)}
          </div>
        </div>
      </div>

      {/* Kingdom popup */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
            transition={{type:'spring',damping:28,stiffness:300}}
            style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:300, borderRadius:'28px 28px 0 0', background:'rgba(6,16,31,0.98)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)', padding:'0 24px 36px' }}>

            <div onClick={() => setSelected(null)} style={{ width:40, height:4, borderRadius:99, background:'rgba(255,255,255,0.15)', margin:'14px auto 20px', cursor:'pointer' }} />

            <div style={{ maxWidth:500, margin:'0 auto' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:12 }}>
                <span style={{ fontSize:48 }}>{selected.emoji}</span>
                <div>
                  <h2 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:26, color:selected.color, marginBottom:2 }}>{selected.name}</h2>
                  <p style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>{selected.theme}</p>
                </div>
              </div>

              <p style={{ fontSize:14, color:'var(--muted)', fontWeight:600, lineHeight:1.7, marginBottom:16 }}>{selected.description}</p>

              {userLevel < selected.unlockLevel ? (
                <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, padding:'14px 16px', marginBottom:16, textAlign:'center' }}>
                  <div style={{ fontSize:24, marginBottom:6 }}>🔒</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'var(--muted)' }}>Unlock at Level {selected.unlockLevel}</div>
                  <div style={{ fontSize:13, color:'var(--muted)', marginTop:4 }}>Keep learning to level up!</div>
                </div>
              ) : (
                <button onClick={() => router.push(`/learn?lang=${selected.id}`)}
                  className="btn-gold" style={{ width:'100%', padding:'16px', borderRadius:14, fontSize:16, fontFamily:'inherit', marginBottom:10 }}>
                  🚀 Enter {selected.name}
                </button>
              )}

              <button onClick={() => setSelected(null)} className="btn-ghost"
                style={{ width:'100%', padding:'12px', borderRadius:14, fontSize:14, fontFamily:'inherit', fontWeight:700 }}>
                Not now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes twinkle{0%,100%{opacity:0.15}50%{opacity:0.8}}`}</style>
    </PageWrapper>
  );
}

function KingdomCard({ kingdom, userLevel, selected, onClick }: { kingdom: typeof KINGDOMS[0]; userLevel: number; selected: boolean; onClick: ()=>void }) {
  const locked = userLevel < kingdom.unlockLevel;
  return (
    <motion.button whileHover={{ y:-8, scale:1.02 }} whileTap={{ scale:0.97 }} onClick={onClick}
      style={{ padding:'20px 12px', borderRadius:20, textAlign:'center', cursor:'pointer', border:`1px solid ${selected?(locked?'rgba(255,255,255,0.2)':kingdom.color+'66'):'rgba(255,255,255,0.08)'}`, background: selected?`${kingdom.color}11`:'rgba(255,255,255,0.04)', boxShadow: selected?`0 0 30px ${kingdom.glow}`:'none', filter:locked?'grayscale(0.6)':'none', opacity:locked?0.6:1, fontFamily:'inherit' }}>
      <div style={{ fontSize:36, marginBottom:8 }}>{kingdom.emoji}</div>
      <div style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:14, color:locked?'var(--muted)':kingdom.color, marginBottom:4 }}>{kingdom.name}</div>
      <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700 }}>
        {locked ? `🔒 Lv ${kingdom.unlockLevel}` : 'Tap to enter'}
      </div>
    </motion.button>
  );
}
