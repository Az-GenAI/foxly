'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FoxlyLogo, GoldBtn, GhostBtn, GlassCard, TextInput, Divider, GoogleBtn, StepDots, TrustBadges } from '@/components/ui';
import type { Language } from '@/types';

const AVATARS = ['🦊','🐉','🦄','🐺','🦋','🐬','🦅','🐼'];
const LANGS: Array<{id:Language;emoji:string;name:string}> = [
  {id:'spanish',emoji:'🌮',name:'Spanish'},
  {id:'french',emoji:'🏰',name:'French'},
  {id:'german',emoji:'⚙️',name:'German'},
  {id:'japanese',emoji:'🌸',name:'Japanese'},
  {id:'arabic',emoji:'🌙',name:'Arabic'},
];

type Screen = 'login' | 'signup-1' | 'signup-2' | 'signup-3' | 'guest';

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp, signInWithGoogle, loading } = useAuth();
  const [screen, setScreen] = useState<Screen>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🦊');
  const [ageGroup, setAgeGroup] = useState<'8-10'|'11-13'|'14+'>('11-13');
  const [firstLang, setFirstLang] = useState<Language>('spanish');
  const [guestName, setGuestName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const go = (path: string) => router.push(path);

  const handleLogin = async () => { const r = await signIn(email, password); if(r.success) go('/map'); };
  const handleSignup = async () => { if(!agreed) return; const r = await signUp(email,password,name,avatar,ageGroup,firstLang); if(r.success) go('/map'); };
  const handleGoogle = async () => { const r = await signInWithGoogle(); if(r.success) go('/map'); };
  const handleGuest = () => { if(typeof window!=='undefined') localStorage.setItem('foxly_guest_name', guestName||'Explorer'); go('/map'); };

  const S: React.CSSProperties = { minHeight:'100vh', background:'#06101f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 16px 40px', fontFamily:'var(--font-nunito,"Nunito",sans-serif)' };

  return (
    <div style={S}>
      {/* Logo */}
      <div style={{ marginBottom:28 }}><FoxlyLogo size="lg" /></div>

      {/* Screen tabs */}
      <div style={{ display:'flex', gap:4, padding:4, borderRadius:50, marginBottom:20, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}>
        {(['login','signup-1','guest'] as const).map((s,i) => (
          <button key={s} onClick={() => setScreen(s)}
            style={{ padding:'8px 18px', borderRadius:50, fontSize:13, fontWeight:800, cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit', border:'none',
              background: screen.startsWith(s==='signup-1'?'signup':s) ? 'linear-gradient(135deg,#f9c846,#e8960f)' : 'transparent',
              color: screen.startsWith(s==='signup-1'?'signup':s) ? '#06101f' : 'var(--muted)',
            }}>
            {['Sign In','Sign Up','Guest'][i]}
          </button>
        ))}
      </div>

      <div style={{ width:'100%', maxWidth:440 }}>

        {/* LOGIN */}
        {screen === 'login' && (
          <GlassCard>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <div style={{ fontSize:52, marginBottom:4, animation:'floatSimple 2.5s ease-in-out infinite' }}>🦊</div>
              <h1 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:28, background:'linear-gradient(135deg,#fff,#f9c846)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Welcome Back!</h1>
              <p style={{ fontSize:14, color:'var(--muted)', fontWeight:600, marginTop:4 }}>Finn missed you — continue your quest!</p>
            </div>
            <GoogleBtn onClick={handleGoogle} loading={loading} />
            <Divider label="or sign in with email" />
            <TextInput label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="your@email.com" />
            <TextInput label="PASSWORD" type={showPw?'text':'password'} value={password} onChange={setPassword} placeholder="••••••••"
              rightEl={<button onClick={()=>setShowPw(!showPw)} style={{background:'none',border:'none',cursor:'pointer',fontSize:16,color:'var(--muted)'}}>{showPw?'🙈':'👁️'}</button>} />
            <GoldBtn onClick={handleLogin} loading={loading}>🚀 Sign In & Continue</GoldBtn>
            <p style={{ textAlign:'center', fontSize:13, color:'var(--muted)', marginTop:14, fontWeight:600 }}>
              No account? <span onClick={()=>setScreen('signup-1')} style={{color:'#f9c846',fontWeight:800,cursor:'pointer'}}>Sign Up Free</span>
            </p>
          </GlassCard>
        )}

        {/* SIGNUP STEP 1 */}
        {screen === 'signup-1' && (
          <GlassCard>
            <StepDots step={1} total={3} />
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:44, marginBottom:4 }}>🌟</div>
              <h1 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:24, background:'linear-gradient(135deg,#fff,#f9c846)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Create Account</h1>
              <p style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>Step 1 of 3 — account details</p>
            </div>
            <GoogleBtn onClick={handleGoogle} loading={loading} />
            <Divider label="or use email" />
            <TextInput label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="parent@email.com" />
            <TextInput label="PASSWORD" type={showPw?'text':'password'} value={password} onChange={setPassword} placeholder="Min 6 characters"
              rightEl={<button onClick={()=>setShowPw(!showPw)} style={{background:'none',border:'none',cursor:'pointer',fontSize:16,color:'var(--muted)'}}>{showPw?'🙈':'👁️'}</button>} />
            <GoldBtn onClick={() => email&&password.length>=6&&setScreen('signup-2')}>Continue →</GoldBtn>
          </GlassCard>
        )}

        {/* SIGNUP STEP 2 */}
        {screen === 'signup-2' && (
          <GlassCard>
            <StepDots step={2} total={3} />
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:44, marginBottom:4 }}>🎨</div>
              <h1 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:24, background:'linear-gradient(135deg,#fff,#f9c846)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Build Explorer</h1>
              <p style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>Step 2 of 3 — personalise</p>
            </div>
            <TextInput label="EXPLORER NAME" value={name} onChange={setName} placeholder="What should Finn call you?" />
            <div style={{ fontSize:11, fontWeight:800, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:8 }}>PICK AVATAR</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:16 }}>
              {AVATARS.map(a => (
                <button key={a} onClick={() => setAvatar(a)} style={{ aspectRatio:'1', borderRadius:14, fontSize:24, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit', border:`2px solid ${avatar===a?'#f9c846':'rgba(255,255,255,0.1)'}`, background:avatar===a?'rgba(249,200,70,0.12)':'rgba(255,255,255,0.05)', transform:avatar===a?'scale(1.1)':'scale(1)' }}>{a}</button>
              ))}
            </div>
            <div style={{ fontSize:11, fontWeight:800, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:8 }}>AGE GROUP</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:20 }}>
              {(['8-10','11-13','14+'] as const).map(age => (
                <button key={age} onClick={() => setAgeGroup(age)} style={{ padding:'10px', borderRadius:12, fontSize:13, fontWeight:800, cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s', border:`1.5px solid ${ageGroup===age?'#f9c846':'rgba(255,255,255,0.1)'}`, background:ageGroup===age?'rgba(249,200,70,0.12)':'rgba(255,255,255,0.05)', color:ageGroup===age?'#f9c846':'var(--muted)' }}>{age}</button>
              ))}
            </div>
            <GoldBtn onClick={() => name&&setScreen('signup-3')}>Continue →</GoldBtn>
            <p style={{ textAlign:'center', fontSize:13, color:'#f9c846', fontWeight:800, cursor:'pointer', marginTop:12 }} onClick={()=>setScreen('signup-1')}>← Back</p>
          </GlassCard>
        )}

        {/* SIGNUP STEP 3 */}
        {screen === 'signup-3' && (
          <GlassCard>
            <StepDots step={3} total={3} />
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:44, marginBottom:4 }}>🗺️</div>
              <h1 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:24, background:'linear-gradient(135deg,#fff,#f9c846)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>First Kingdom</h1>
              <p style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>Step 3 of 3 — start your adventure</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
              {LANGS.map(l => (
                <button key={l.id} onClick={() => setFirstLang(l.id)} style={{ padding:'14px 8px', borderRadius:12, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:4, transition:'all 0.2s', fontFamily:'inherit', gridColumn:l.id==='arabic'?'span 2':undefined, border:`1.5px solid ${firstLang===l.id?'#f9c846':'rgba(255,255,255,0.1)'}`, background:firstLang===l.id?'rgba(249,200,70,0.12)':'rgba(255,255,255,0.05)', color:firstLang===l.id?'#f9c846':'var(--muted)' }}>
                  <span style={{ fontSize:22 }}>{l.emoji}</span>{l.name}
                </button>
              ))}
            </div>
            <label onClick={() => setAgreed(!agreed)} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:14, cursor:'pointer' }}>
              <div style={{ width:20, height:20, borderRadius:6, flexShrink:0, marginTop:1, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:900, transition:'all 0.2s', border:`1.5px solid ${agreed?'#f9c846':'rgba(255,255,255,0.2)'}`, background:agreed?'#f9c846':'rgba(255,255,255,0.05)', color:agreed?'#06101f':'transparent' }}>✓</div>
              <span style={{ fontSize:12, color:'var(--muted)', fontWeight:600, lineHeight:1.5 }}>I agree to Foxly's <span style={{color:'#f9c846'}}>Terms</span> & <span style={{color:'#f9c846'}}>Privacy Policy</span>. I confirm I am a parent or guardian.</span>
            </label>
            <GoldBtn onClick={handleSignup} loading={loading} disabled={!agreed}>🦊 Start My Adventure!</GoldBtn>
            <p style={{ textAlign:'center', fontSize:13, color:'#f9c846', fontWeight:800, cursor:'pointer', marginTop:12 }} onClick={()=>setScreen('signup-2')}>← Back</p>
          </GlassCard>
        )}

        {/* GUEST */}
        {screen === 'guest' && (
          <GlassCard>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <div style={{ fontSize:52, marginBottom:4 }}>🎭</div>
              <h1 style={{ fontFamily:'var(--font-baloo,"Baloo 2",cursive)', fontWeight:800, fontSize:26, background:'linear-gradient(135deg,#fff,#f9c846)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Explore as Guest</h1>
              <p style={{ fontSize:14, color:'var(--muted)', fontWeight:600, marginTop:4 }}>No account needed — try Foxly now!</p>
            </div>
            <TextInput label="YOUR NICKNAME" value={guestName} onChange={setGuestName} placeholder="What should Finn call you?" />
            <button onClick={handleGuest} style={{ width:'100%', padding:'15px', borderRadius:14, background:'rgba(61,217,200,0.1)', border:'1.5px solid rgba(61,217,200,0.3)', color:'#3dd9c8', fontWeight:900, fontSize:15, cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s' }}>
              🎭 Start Exploring — No Sign Up!
            </button>
            <div style={{ background:'rgba(249,200,70,0.06)', border:'1px solid rgba(249,200,70,0.15)', borderRadius:12, padding:'12px 14px', marginTop:14, fontSize:12, fontWeight:600, color:'var(--muted)', lineHeight:1.6 }}>
              ⚠️ Progress saves on this device only. <span onClick={()=>setScreen('signup-1')} style={{color:'#f9c846',fontWeight:800,cursor:'pointer'}}>Create a free account</span> to save everywhere.
            </div>
          </GlassCard>
        )}

        <TrustBadges />
      </div>
    </div>
  );
}
