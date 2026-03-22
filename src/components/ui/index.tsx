'use client';
// Foxly shared UI components — import from here in every page

import React from 'react';
import Link from 'next/link';

// ── FOXLY LOGO ───────────────────────────────────────────────
export function FoxlyLogo({ size = 'md' }: { size?: 'sm'|'md'|'lg' }) {
  const sizes = { sm: { box: 30, font: 18, text: 18 }, md: { box: 36, font: 20, text: 22 }, lg: { box: 44, font: 26, text: 28 } };
  const s = sizes[size];
  return (
    <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none' }}>
      <div style={{ width:s.box, height:s.box, borderRadius:10, background:'linear-gradient(135deg,#f9c846,#e8960f)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:s.font, boxShadow:'0 0 18px rgba(249,200,70,0.4)', flexShrink:0 }}>🦊</div>
      <span style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:s.text, background:'linear-gradient(135deg,#f9c846,#ff9f43)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Foxly</span>
    </Link>
  );
}

// ── NAV BAR ──────────────────────────────────────────────────
export function FoxlyNav({ right }: { right?: React.ReactNode }) {
  return (
    <nav className="foxly-nav">
      <FoxlyLogo />
      {right && <div style={{ display:'flex', alignItems:'center', gap:10 }}>{right}</div>}
    </nav>
  );
}

// ── XP PILL ──────────────────────────────────────────────────
export function XPPill({ xp }: { xp: number }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(249,200,70,0.1)', border:'1px solid rgba(249,200,70,0.25)', borderRadius:50, padding:'5px 12px', fontSize:12, fontWeight:800, color:'#f9c846' }}>
      ⭐ {xp.toLocaleString()} XP
    </div>
  );
}

// ── STREAK PILL ──────────────────────────────────────────────
export function StreakPill({ streak }: { streak: number }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(255,107,60,0.12)', border:'1px solid rgba(255,107,60,0.25)', borderRadius:50, padding:'5px 12px', fontSize:12, fontWeight:800, color:'#ff6b3d' }}>
      🔥 {streak}
    </div>
  );
}

// ── AVATAR BUTTON ────────────────────────────────────────────
export function AvatarBtn({ avatar, onClick }: { avatar: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#f9c846,#e8960f)', border:'none', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {avatar}
    </button>
  );
}

// ── GOLD BUTTON ──────────────────────────────────────────────
export function GoldBtn({ children, onClick, loading, disabled, style }: { children: React.ReactNode; onClick?: () => void; loading?: boolean; disabled?: boolean; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} disabled={loading || disabled} className="btn-gold"
      style={{ padding:'14px 28px', borderRadius:14, fontSize:15, width:'100%', opacity:(loading||disabled)?0.5:1, cursor:(loading||disabled)?'default':'pointer', ...style }}>
      {loading ? '⏳ Loading...' : children}
    </button>
  );
}

// ── GHOST BUTTON ─────────────────────────────────────────────
export function GhostBtn({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} className="btn-ghost"
      style={{ padding:'14px 28px', borderRadius:14, fontSize:15, width:'100%', fontWeight:800, ...style }}>
      {children}
    </button>
  );
}

// ── GLASS CARD ───────────────────────────────────────────────
export function GlassCard({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`glass anim-card-in ${className||''}`} style={{ borderRadius:24, padding:32, ...style }}>
      {children}
    </div>
  );
}

// ── DARK CARD ────────────────────────────────────────────────
export function DarkCard({ children, style, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <div className="card-dark" onClick={onClick} style={{ borderRadius:18, padding:20, cursor:onClick?'pointer':'default', transition:'transform 0.2s', ...style }}
      onMouseEnter={e => { if(onClick)(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
      {children}
    </div>
  );
}

// ── TEXT INPUT ───────────────────────────────────────────────
export function TextInput({ label, type='text', value, onChange, placeholder, rightEl }: { label?: string; type?: string; value: string; onChange: (v:string)=>void; placeholder?: string; rightEl?: React.ReactNode }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <div style={{ fontSize:11, fontWeight:800, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:6 }}>{label}</div>}
      <div style={{ position:'relative' }}>
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="input-dark"
          style={{ padding:'13px 16px', borderRadius:12, fontSize:15, paddingRight: rightEl?'44px':'16px' }} />
        {rightEl && <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }}>{rightEl}</div>}
      </div>
    </div>
  );
}

// ── PROGRESS BAR ─────────────────────────────────────────────
export function ProgressBar({ pct, color, height=8 }: { pct: number; color?: string; height?: number }) {
  return (
    <div className="prog-track" style={{ height }}>
      <div className="prog-fill" style={{ width:`${Math.min(pct,100)}%`, background: color || 'linear-gradient(90deg,#fb923c,#f9c846)', height }} />
    </div>
  );
}

// ── STAR RATING ──────────────────────────────────────────────
export function StarRating({ stars, max=3, size=22 }: { stars: number; max?: number; size?: number }) {
  return (
    <div style={{ display:'flex', gap:4 }}>
      {Array.from({length:max}).map((_,i) => (
        <span key={i} style={{ fontSize:size, filter: i < stars ? 'drop-shadow(0 0 4px rgba(249,200,70,0.8))' : 'none' }}>
          {i < stars ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}

// ── BADGE PILL ───────────────────────────────────────────────
export function BadgePill({ children, color='gold' }: { children: React.ReactNode; color?: 'gold'|'mint'|'lav'|'coral'|'green' }) {
  const colors = {
    gold:  { bg:'rgba(249,200,70,0.12)',  border:'rgba(249,200,70,0.3)',  text:'#f9c846' },
    mint:  { bg:'rgba(61,217,200,0.12)',  border:'rgba(61,217,200,0.3)',  text:'#3dd9c8' },
    lav:   { bg:'rgba(155,127,244,0.12)', border:'rgba(155,127,244,0.3)', text:'#9b7ff4' },
    coral: { bg:'rgba(255,107,107,0.12)', border:'rgba(255,107,107,0.3)', text:'#ff6b6b' },
    green: { bg:'rgba(34,197,94,0.12)',   border:'rgba(34,197,94,0.3)',   text:'#22c55e' },
  };
  const c = colors[color];
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:c.bg, border:`1px solid ${c.border}`, borderRadius:50, padding:'4px 12px', fontSize:11, fontWeight:800, color:c.text }}>
      {children}
    </span>
  );
}

// ── FINN SPEECH BUBBLE ───────────────────────────────────────
export function FinnBubble({ message, size=48, mood='happy' }: { message: string; size?: number; mood?: 'happy'|'excited'|'thinking'|'sad'|'celebrating' }) {
  const moods = { happy:'🦊', excited:'🤩', thinking:'🤔', sad:'😔', celebrating:'🎉' };
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:12, marginBottom:24 }}>
      <span style={{ fontSize:size, animation:'floatSimple 2.5s ease-in-out infinite', flexShrink:0, filter:'drop-shadow(0 4px 12px rgba(249,200,70,0.4))' }}>{moods[mood]}</span>
      <div style={{ background:'rgba(13,24,53,0.92)', border:'1px solid rgba(249,200,70,0.22)', borderRadius:'16px 16px 16px 4px', padding:'12px 16px', fontSize:14, fontWeight:700, lineHeight:1.55, color:'var(--text)', maxWidth:280, boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
        {message}
      </div>
    </div>
  );
}

// ── PAGE WRAPPER ─────────────────────────────────────────────
export function PageWrapper({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ minHeight:'100vh', background:'#06101f', color:'#f0eefc', fontFamily:'var(--font-nunito,"Nunito",sans-serif)', paddingTop:64, ...style }}>
      {children}
    </div>
  );
}

// ── SECTION DIVIDER ──────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, margin:'16px 0' }}>
      <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.08)' }} />
      {label && <span style={{ fontSize:12, fontWeight:800, color:'var(--muted)', whiteSpace:'nowrap' }}>{label}</span>}
      <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.08)' }} />
    </div>
  );
}

// ── GOOGLE SIGN IN BUTTON ────────────────────────────────────
export function GoogleBtn({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return (
    <button onClick={onClick} disabled={loading} className="btn-ghost"
      style={{ width:'100%', padding:'13px', borderRadius:12, fontSize:14, fontWeight:800, marginBottom:16, opacity:loading?0.6:1 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" style={{flexShrink:0}}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {loading ? 'Signing in...' : 'Continue with Google'}
    </button>
  );
}

// ── STEP DOTS ────────────────────────────────────────────────
export function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display:'flex', gap:6, justifyContent:'center', marginBottom:20 }}>
      {Array.from({length:total}).map((_,i) => (
        <div key={i} style={{ height:6, borderRadius:99, transition:'all 0.3s', width: i===step-1?22:8, background: i<step-1?'#3dd9c8': i===step-1?'#f9c846':'rgba(255,255,255,0.15)' }} />
      ))}
    </div>
  );
}

// ── TRUST BADGES ─────────────────────────────────────────────
export function TrustBadges() {
  return (
    <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginTop:20 }}>
      {['🔒 Secure','🚫 Zero Ads','👨‍👩‍👧 COPPA Safe','✅ Free Forever'].map(b => (
        <span key={b} style={{ fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:50, background:'rgba(255,255,255,0.05)', color:'var(--muted)' }}>{b}</span>
      ))}
    </div>
  );
}
