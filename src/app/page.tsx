'use client';
// src/app/page.tsx — Root page (Landing)

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFoxlyStore } from '@/lib/store';
import Link from 'next/link';

export default function Home() {
  const user = useFoxlyStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/map');
  }, [user, router]);

  return (
    <main style={{ background: '#06101f', minHeight: '100vh', color: '#f0eefc', fontFamily: 'Nunito, sans-serif' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: 'rgba(6,16,31,0.88)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(249,200,70,0.13)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#f9c846,#e8960f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🦊</div>
          <span style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 22, background: 'linear-gradient(135deg,#f9c846,#ff9f43)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Foxly</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/auth" style={{ color: 'rgba(240,238,252,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Sign In</Link>
          <Link href="/auth" style={{ background: 'linear-gradient(135deg,#f9c846,#e8960f)', color: '#06101f', padding: '9px 20px', borderRadius: 50, fontWeight: 900, fontSize: 14, textDecoration: 'none' }}>Start Free ✨</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,200,70,0.1)', border: '1px solid rgba(249,200,70,0.28)', padding: '7px 18px', borderRadius: 50, fontSize: 13, fontWeight: 800, color: '#f9c846', marginBottom: 28 }}>
            ✨ 100% Free · No Ads · No Paywalls
          </div>
          <div style={{ fontSize: 100, display: 'block', marginBottom: 18, animation: 'foxFloat 3s ease-in-out infinite', filter: 'drop-shadow(0 12px 36px rgba(249,200,70,0.45))' }}>🦊</div>
          <h1 style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 'clamp(40px, 7vw, 76px)', lineHeight: 1.1, marginBottom: 20, background: 'linear-gradient(140deg,#fff 0%,#f9c846 45%,#ff9f43 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Learn 5 Languages<br />Through Adventure
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(240,238,252,0.7)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.75, fontWeight: 600 }}>
            Join Finn the Fox on a magical quest across 5 enchanted kingdoms. Master Spanish, French, German, Japanese & Arabic — completely free.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth" style={{ background: 'linear-gradient(135deg,#f9c846,#e8960f)', color: '#06101f', padding: '17px 40px', borderRadius: 50, fontWeight: 900, fontSize: 17, textDecoration: 'none', boxShadow: '0 8px 36px rgba(249,200,70,0.42)' }}>
              🚀 Start Your Quest
            </Link>
            <Link href="/map" style={{ background: 'rgba(255,255,255,0.07)', color: '#f0eefc', padding: '17px 40px', borderRadius: 50, fontWeight: 800, fontSize: 17, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
              🗺️ Explore Worlds
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap', marginTop: 56, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '24px 32px', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            {[['5','Language Worlds'],['200+','Quests & Games'],['100%','Free Forever'],['8–13','Perfect Age']].map(([n,l]) => (
              <div key={l} style={{ flex: 1, minWidth: 110, textAlign: 'center', padding: '8px 0', borderLeft: n !== '5' ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: '"Baloo 2", cursive', fontSize: 32, fontWeight: 800, background: 'linear-gradient(135deg,#f9c846,#ff9f43)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(240,238,252,0.5)', fontWeight: 700, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worlds */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#f9c846', marginBottom: 12 }}>🌍 Language Worlds</div>
          <h2 style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 'clamp(28px,5vw,48px)', marginBottom: 12 }}>Five Enchanted Kingdoms</h2>
          <p style={{ fontSize: 17, color: 'rgba(240,238,252,0.6)', fontWeight: 600 }}>Each language is a magical world to explore with Finn.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 18 }}>
          {[
            { emoji:'🌮', name:'Spanish',  theme:'The Fiesta Kingdom',      color:'#fb923c' },
            { emoji:'🏰', name:'French',   theme:'The Enchanted Château',   color:'#c084fc' },
            { emoji:'⚙️', name:'German',   theme:'The Clockwork Kingdom',   color:'#60a5fa' },
            { emoji:'🌸', name:'Japanese', theme:'Cherry Blossom Empire',   color:'#f472b6' },
            { emoji:'🌙', name:'Arabic',   theme:'The Desert Star Realm',   color:'#fbbf24' },
          ].map(w => (
            <div key={w.name} style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', transition: 'transform .3s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-8px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>{w.emoji}</div>
              <div style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 20, color: w.color, marginBottom: 4 }}>{w.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(240,238,252,0.5)', fontWeight: 700, marginBottom: 16 }}>{w.theme}</div>
              <div style={{ background: 'rgba(249,200,70,0.12)', border: '1px solid rgba(249,200,70,0.28)', color: '#f9c846', borderRadius: 50, padding: '5px 14px', fontSize: 12, fontWeight: 800, display: 'inline-block' }}>🔓 Start Learning</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '80px 24px', background: 'radial-gradient(ellipse at 50% 0%,rgba(249,200,70,0.1) 0%,transparent 65%)' }}>
        <h2 style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 'clamp(28px,6vw,56px)', marginBottom: 16, lineHeight: 1.2 }}>Start Your Adventure Today 🚀</h2>
        <p style={{ fontSize: 17, color: 'rgba(240,238,252,0.6)', marginBottom: 36, fontWeight: 600 }}>Free on web. Mobile app coming soon.</p>
        <Link href="/auth" style={{ background: 'linear-gradient(135deg,#f9c846,#e8960f)', color: '#06101f', padding: '18px 48px', borderRadius: 50, fontWeight: 900, fontSize: 18, textDecoration: 'none', boxShadow: '0 8px 36px rgba(249,200,70,0.42)' }}>
          🦊 Start With Finn — It's Free
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: 'rgba(0,0,0,0.28)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 22, background: 'linear-gradient(135deg,#f9c846,#ff9f43)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>🦊 Foxly</div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>Made with love for young language explorers · © 2025 Foxly</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes foxFloat { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-18px) rotate(4deg)} }
      `}</style>
    </main>
  );
}
