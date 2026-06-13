'use client'
import { useState, Suspense, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Zap, Shield, Globe, Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowser } from '@/lib/auth/supabase'
import toast from 'react-hot-toast'

function ParticleCanvas() { return null }

function MouseGlow() {
  const x=useMotionValue(0),y=useMotionValue(0)
  const sx=useSpring(x,{stiffness:80,damping:20}),sy=useSpring(y,{stiffness:80,damping:20})
  useEffect(()=>{
    const move=(e: MouseEvent)=>{x.set(e.clientX);y.set(e.clientY)}
    window.addEventListener('mousemove',move)
    return()=>window.removeEventListener('mousemove',move)
  },[x,y])
  return <motion.div style={{left:sx,top:sy,x:'-50%',y:'-50%',position:'fixed',pointerEvents:'none',zIndex:1,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(108,95,244,.1) 0%,transparent 70%)'}}/>
}

function PasswordStrength({password}) {
  const checks=[password.length>=8,/[A-Z]/.test(password),/[0-9]/.test(password),/[^A-Za-z0-9]/.test(password)]
  const s=checks.filter(Boolean).length
  const colors=['','#f87171','#fbbf24','#34d399','#6c5ff4']
  const labels=['','Weak','Fair','Good','Strong']
  if(!password)return null
  return(
    <div style={{marginTop:8}}>
      <div style={{display:'flex',gap:4,marginBottom:4}}>
        {[1,2,3,4].map(i=><div key={i} style={{flex:1,height:2,borderRadius:2,transition:'background .3s',background:i<=s?colors[s]:'rgba(255,255,255,.08)'}}/>)}
      </div>
      <span style={{fontSize:11,color:colors[s]}}>{labels[s]}</span>
    </div>
  )
}

function AuthForm() {
  const router=useRouter(),params=useSearchParams()
  const redirect=params.get('redirect')??'/dashboard'
  const [mode,setMode]=useState(params.get('mode')??'login')
  const [email,setEmail]=useState(''), [password,setPassword]=useState('')
  const [name,setName]=useState(''), [showPw,setShowPw]=useState(false)
  const [loading,setLoading]=useState(false), [error,setError]=useState(null)
  const [focused,setFocused]=useState(null)
  // ✅ FIXED: Initialize Supabase safely in useEffect
  const [sb, setSb] = useState(null)
  
  useEffect(() => {
    try {
      setSb(createBrowser())
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to initialize auth'
      setError(msg)
      toast.error(msg)
    }
  }, [])

  async function handleGoogle(){
    if (!sb) {
      toast.error('Auth service not initialized')
      return
    }
    setLoading(true)
    const{error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${window.location.origin}/auth/callback?redirect=${redirect}`}})
    if(error){toast.error(error.message);setLoading(false)}
  }

  async function handleSubmit(e){
    if (!sb) {
      toast.error('Auth service not initialized')
      return
    }
    e.preventDefault();setError(null);setLoading(true)
    try{
      if(mode==='register'){
        if(password.length<8)throw new Error('Password must be at least 8 characters')
        const{error}=await sb.auth.signUp({email,password,options:{data:{name,full_name:name},emailRedirectTo:`${window.location.origin}/auth/callback`}})
        if(error)throw error
        toast.success('Check your email to confirm your account!')
        setMode('login')
      }else{
        const{error}=await sb.auth.signInWithPassword({email,password})
        if(error)throw error
        toast.success('Welcome back!')
        router.push(redirect);router.refresh()
      }
    }catch(err){
      const msg=err instanceof Error?err.message:'Something went wrong'
      setError(msg);toast.error(msg)
    }finally{setLoading(false)}
  }

  const inp=(f)=>({
    width:'100%',background:focused===f?'rgba(108,95,244,.07)':'rgba(255,255,255,.04)',
    border:`1px solid ${focused===f?'rgba(108,95,244,.5)':'rgba(255,255,255,.09)'}`,
    borderRadius:12,padding:'12px 14px 12px 42px',fontSize:14,color:'#fff',
    fontFamily:'inherit',outline:'none',transition:'all .2s',caretColor:'#6c5ff4',
    boxShadow:focused===f?'0 0 0 3px rgba(108,95,244,.12)':'none'
  })

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    input::placeholder{color:rgba(255,255,255,.22)}
    input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #0a0a12 inset!important;-webkit-text-fill-color:#fff!important}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    @keyframes aurora{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.85;transform:scale(1.1)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    .card-float{animation:float 7s ease-in-out infinite}
    .aurora-blob{animation:aurora 9s ease-in-out infinite}
    @media(max-width:900px){.left-side{display:none!important}}
  `

  return(
    <div style={{minHeight:'100vh',background:'#03030a',display:'flex',overflow:'hidden',position:'relative',fontFamily:"'DM Sans',sans-serif"}}>
      <style dangerouslySetInnerHTML={{__html:css}}/>
      <ParticleCanvas/>
      <MouseGlow/>
      <div className="aurora-blob" style={{position:'fixed',top:'-20%',left:'-10%',width:'60vw',height:'60vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(108,95,244,.18) 0%,transparent 70%)',filter:'blur(40px)'}}/>
      <div className="aurora-blob" style={{position:'fixed',bottom:'-20%',right:'-10%',width:'50vw',height:'50vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 70%)',filter:'blur(40px)'}}/>
      <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',backgroundImage:'linear-gradient(rgba(108,95,244,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(108,95,244,.04) 1px,transparent 1px)',backgroundSize:'50px 50px'}}/>

      <div className="left-side" style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px 4% 60px 7%',position:'relative',zIndex:2}}>
        <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:.6}} style={{display:'flex',alignItems:'center',gap:10,marginBottom:60}}>
          <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#6c5ff4,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,boxShadow:'0 0 20px rgba(108,95,244,.4)'}}>✨</div>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:'#fff',letterSpacing:'-.03em'}}>unveils.me</span>
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.1}} style={{display:'inline-flex',alignItems:'center',gap:6,padding:'5px 12px',borderRadius:9999,background:'rgba(52,211,153,.1)',border:'1px solid rgba(52,211,153,.3)',width:'fit-content',marginBottom:24}}>
          <span style={{width:5,height:5,borderRadius:'50%',background:'#34d399',display:'inline-block'}}/>
          <span style={{fontSize:11,fontWeight:600,color:'#34d399'}}>AI-Powered Identity</span>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.15,duration:.7,ease:[.16,1,.3,1]}} style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(34px,3.8vw,54px)',fontWeight:800,color:'#fff',lineHeight:1.1,marginBottom:20,letterSpacing:'-.03em'}}>
          Create your<br/>digital universe
        </motion.h1>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.25,duration:.6}} style={{fontSize:15,color:'rgba(255,255,255,.42)',lineHeight:1.8,maxWidth:360,marginBottom:40}}>
          The AI identity platform that makes you unforgettable. One link. Infinite presence.
        </motion.p>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}} style={{display:'flex',gap:28,marginBottom:40}}>
          {[['12K+','Creators'],['98%','Satisfaction'],['< 30s','Setup']].map(([n,l])=>(
            <div key={l}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-.03em'}}>{n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </motion.div>
        <div style={{display:'flex',flexDirection:'column',gap:8,maxWidth:360}}>
          {[{icon:<Zap size={15}/>,title:'Groq-powered AI',desc:'Identity generation in under 3 seconds'},{icon:<Globe size={15}/>,title:'Your own subdomain',desc:'arjun.unveils.me — live instantly'},{icon:<Shield size={15}/>,title:'Enterprise security',desc:'SOC2, GDPR, and data privacy'}].map((f,i)=>(
            <motion.div key={f.title} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:.4+i*.1,duration:.6}} style={{display:'flex',gap:14,padding:'14px 16px',borderRadius:12,background:'rgba(108,95,244,.08)',border:'1px solid rgba(108,95,244,.15)'}}>
              <div style={{width:34,height:34,borderRadius:9,background:'rgba(108,95,244,.15)',border:'1px solid rgba(108,95,244,.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'#8b7cf8'}}>{f.icon}</div>
              <div><div style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,.85)',marginBottom:2}}>{f.title}</div><div style={{fontSize:12,color:'rgba(255,255,255,.38)',lineHeight:1.5}}>{f.desc}</div></div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}} style={{marginTop:32,display:'flex',alignItems:'center',gap:12}}>
          <div style={{display:'flex'}}>{['#6c5ff4','#38bdf8','#34d399','#f472b6','#fbbf24'].map((c,i)=>(<div key={i} style={{width:26,height:26,borderRadius:'50%',background:`linear-gradient(135deg,${c},${c})`,boxShadow:`0 0 12px ${c}`,marginRight:i>0?-8:0}}/>))}</div>
          <div>
            <div style={{display:'flex',gap:1,marginBottom:2}}>{[1,2,3,4,5].map(i=><Star key={i} size={10} fill="#fbbf24" color="#fbbf24"/>)}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>Loved by 12,000+ founders</div>
          </div>
        </motion.div>
      </div>

      <div style={{width:'min(480px,100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 28px',position:'relative',zIndex:2}}>
        <motion.div initial={{opacity:0,y:32,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.7,ease:[.16,1,.3,1]}} className="card-float" style={{width:'100%',maxWidth:420,background:'rgba(10,10,18,.8)',border:'1px solid rgba(108,95,244,.2)',borderRadius:20,padding:32,backdropFilter:'blur(10px)'}}>
          <div style={{position:'absolute',top:-60,left:'50%',transform:'translateX(-50%)',width:240,height:120,background:'radial-gradient(ellipse,rgba(108,95,244,.22) 0%,transparent 70%)',pointerEvents:'none'}}/>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24,justifyContent:'center'}}>
            <div style={{width:28,height:28,borderRadius:8,background:'linear-gradient(135deg,#6c5ff4,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,boxShadow:'0 0 16px rgba(108,95,244,.4)'}}>✨</div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,letterSpacing:'-.03em',color:'#fff'}}>unveils.me</span>
          </div>
          <div style={{display:'flex',background:'rgba(255,255,255,.04)',borderRadius:11,padding:3,marginBottom:24,border:'1px solid rgba(255,255,255,.06)'}}>
            {['login','register'].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setError(null)}} style={{flex:1,padding:'9px',borderRadius:9,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',border:'none',background:mode===m?'rgba(108,95,244,.3)':'transparent',color:'#fff',transition:'all .2s'}}>
                {m==='login'?'Sign in':'Create account'}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.22}} style={{marginBottom:20}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,letterSpacing:'-.03em',color:'#fff',marginBottom:3}}>{mode==='login'?'Welcome back ⚡':'Join the future'}</h2>
              <p style={{fontSize:12,color:'rgba(255,255,255,.35)'}}>{mode==='login'?'Sign in to your AI identity platform':'Free forever. No credit card needed.'}</p>
            </motion.div>
          </AnimatePresence>
          <motion.button whileHover={{scale:1.02}} whileTap={{scale:.98}} onClick={handleGoogle} disabled={loading || !sb} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px',borderRadius:12,fontSize:14,fontWeight:600,cursor:loading||!sb?'not-allowed':'pointer',fontFamily:'inherit',border:'1px solid rgba(255,255,255,.1)',color:'#fff',background:'rgba(255,255,255,.04)',transition:'all .2s',opacity:loading||!sb?.6:1}}>
            <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </motion.button>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
            <div style={{flex:1,height:'1px',background:'rgba(255,255,255,.07)'}}/>
            <span style={{fontSize:10,color:'rgba(255,255,255,.25)',letterSpacing:'.05em'}}>OR</span>
            <div style={{flex:1,height:'1px',background:'rgba(255,255,255,.07)'}}/>
          </div>
          <AnimatePresence>
            {error&&(<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 12px',borderRadius:10,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.3)',marginBottom:16}}><AlertCircle size={16} color="#ef4444"/><span style={{fontSize:12,color:'#fca5a5'}}>{error}</span></motion.div>)}
          </AnimatePresence>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:12}}>
            <AnimatePresence>
              {mode==='register'&&(
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.22}}>
                  <label style={{display:'block',fontSize:10,fontWeight:600,color:'rgba(255,255,255,.3)',letterSpacing:'.07em',marginBottom:5}}>FULL NAME</label>
                  <div style={{position:'relative'}}>
                    <User size={13} style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,.25)',pointerEvents:'none'}}/>
                    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Arjun Mehta" required onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)} style={inp('name') as any}/>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <label style={{display:'block',fontSize:10,fontWeight:600,color:'rgba(255,255,255,.3)',letterSpacing:'.07em',marginBottom:5}}>EMAIL</label>
              <div style={{position:'relative'}}>
                <Mail size={13} style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,.25)',pointerEvents:'none'}}/>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)} style={inp('email') as any}/>
              </div>
            </div>
            <div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                <label style={{fontSize:10,fontWeight:600,color:'rgba(255,255,255,.3)',letterSpacing:'.07em'}}>PASSWORD</label>
                {mode==='login'&&<Link href="/auth?mode=login" style={{fontSize:10,color:'rgba(255,255,255,.3)',textDecoration:'none'}}>Forgot?</Link>}
              </div>
              <div style={{position:'relative'}}>
                <Lock size={13} style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,.25)',pointerEvents:'none'}}/>
                <input type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required minLength={8} onFocus={()=>setFocused('password')} onBlur={()=>setFocused(null)} style={{...inp('password'),paddingRight:42} as any}/>
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,.3)',display:'flex'}}>
                  {showPw?<EyeOff size={13}/>:<Eye size={13}/>}
                </button>
              </div>
              {mode==='register'&&<PasswordStrength password={password}/>}
            </div>
            {mode==='register'&&(<p style={{fontSize:11,color:'rgba(255,255,255,.28)',lineHeight:1.6}}>By registering you agree to our <Link href="/legal/terms" style={{color:'#a29afb',textDecoration:'none'}}>Terms</Link> &amp; <Link href="/legal/privacy" style={{color:'#a29afb',textDecoration:'none'}}>Privacy Policy</Link>.</p>)}
            <motion.button type="submit" disabled={loading || !sb} whileHover={!loading && sb?{scale:1.02,boxShadow:'0 0 40px rgba(108,95,244,.6)'}:{}} whileTap={!loading && sb?{scale:.98}:{}} style={{width:'100%',padding:'13px',borderRadius:12,fontSize:14,fontWeight:600,cursor:loading || !sb?'not-allowed':'pointer',fontFamily:'inherit',border:'none',color:'#fff',marginTop:2,background:loading || !sb?'rgba(108,95,244,.5)':'linear-gradient(135deg,#6c5ff4 0%,#8b7cf8 50%,#6c5ff4 100%)',display:'flex',alignItems:'center',justifyContent:'center',gap:8,transition:'all .2s',opacity:loading||!sb?.7:1,boxShadow:'0 0 28px rgba(108,95,244,.35)'}}>
              {loading?(<><div style={{width:13,height:13,borderRadius:'50%',border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',animation:'spin .7s linear infinite'}}/><span>Please wait…</span></>):(<>{mode==='login'?'Sign in':'Create free account'}<ArrowRight size={14}/></>)}
            </motion.button>
          </form>
          <p style={{textAlign:'center',fontSize:12,color:'rgba(255,255,255,.28)',marginTop:18}}>
            {mode==='login'?"Don't have an account? ":"Already have an account? "}
            <button onClick={()=>{setMode(mode==='login'?'register':'login');setError(null)}} style={{background:'none',border:'none',cursor:'pointer',color:'#a29afb',fontSize:12,fontFamily:'inherit'}}>
              {mode==='login'?'Sign up free →':'Sign in →'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return <Suspense fallback={<div style={{minHeight:'100vh',background:'#03030a',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{color:'rgba(255,255,255,.3)'}}>Loading...</div></div>}>
    <AuthForm/>
  </Suspense>
}
