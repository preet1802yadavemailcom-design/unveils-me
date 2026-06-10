import Link from 'next/link'
import { notFound } from 'next/navigation'

const POSTS: Record<string, any> = {
  'groq-fastest-ai-inference': { title:'Why Groq is the fastest AI inference on the planet', author:'Arjun Mehta', date:'June 10, 2025', readTime:'6 min', tag:'AI', color:'#6c5ff4', content:'Groq LPU architecture delivers 200+ tokens per second. We benchmarked every major provider and Groq wins on speed, cost, and latency consistency.\n\nFor real-time products like Unveils.me, this means identity generation in under 3 seconds instead of 12. That changes user behaviour entirely.' },
  'digital-identity-future': { title:'The next layer of the internet is your AI identity', author:'Kavya Iyer', date:'June 5, 2025', readTime:'8 min', tag:'Vision', color:'#38bdf8', content:'Every major platform shift created a new identity layer. Web 1.0 had email. Web 2.0 gave us social profiles.\n\nAI-native web does not just host your content. It represents you. When someone visits arjun.unveils.me they meet an AI-powered version of Arjun.' },
  'llama-33-70b-guide': { title:'LLaMA 3.3 70B: The model that makes AI identity possible', author:'Vikram Nair', date:'May 28, 2025', readTime:'10 min', tag:'Technical', color:'#34d399', content:'LLaMA 3.3 70B is the model powering every identity on Unveils. It holds long persona context and produces structured JSON reliably.\n\nWe evaluated GPT-4o, Claude 3.5, Gemini 1.5. LLaMA 3.3 70B was the only one hitting quality, speed, and cost simultaneously.' },
  'personal-branding-ai': { title:'Personal branding in the AI age: what actually works', author:'Priya Sharma', date:'May 20, 2025', readTime:'7 min', tag:'Strategy', color:'#f472b6', content:'Traditional personal branding advice is incomplete in 2025. People now find information about you through AI assistants, not Google searches.\n\nYou need machine-readable identity. Structured representations that AI systems can access accurately.' },
  'launching-saas-checklist': { title:'The complete SaaS launch checklist (150+ items)', author:'Arjun Mehta', date:'May 12, 2025', readTime:'12 min', tag:'Launch', color:'#fb923c', content:'We launched Unveils.me after going through 150+ items. Most commonly missed: DNS takes 48h, set up Sentry before launch, rate limit all APIs.\n\nGTM: Write your Product Hunt post before launch day code. Have 10 people ready to comment in the first hour.' },
  'multi-agent-systems': { title:'Building multi-agent systems that actually work', author:'Kavya Iyer', date:'May 5, 2025', readTime:'9 min', tag:'AI', color:'#a78bfa', content:'The challenge with multi-agent systems is coordination, not intelligence. Every handoff is a failure point.\n\nWe use a shared context model. All agents write to and read from one shared store. The orchestrator decides who acts next.' },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return { title: 'Not Found' }
  return { title: post.title + ' — Unveils.me' }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:'sans-serif', minHeight:'100vh' }}>
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.08)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(5,5,8,.9)', backdropFilter:'blur(20px)', position:'sticky', top:0, zIndex:50 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', color:'#fff' }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center' }}>✦</div>
          <span style={{ fontWeight:700, fontSize:15 }}>unveils.me</span>
        </Link>
        <Link href="/blog" style={{ fontSize:13, color:'rgba(255,255,255,.45)', textDecoration:'none' }}>← All posts</Link>
        <Link href="/auth?mode=register" style={{ padding:'8px 18px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff', textDecoration:'none' }}>Get started</Link>
      </nav>

      <article style={{ maxWidth:700, margin:'0 auto', padding:'64px 28px 96px' }}>
        <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:9999, fontSize:11, fontWeight:600, background:post.color+'20', color:post.color, border:'1px solid '+post.color+'40', marginBottom:20 }}>{post.tag}</span>
        <h1 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:800, letterSpacing:'-.03em', lineHeight:1.15, marginBottom:20 }}>{post.title}</h1>
        <div style={{ fontSize:13, color:'rgba(255,255,255,.38)', marginBottom:48, display:'flex', gap:12 }}>
          <span>{post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
        </div>
        {post.content.split('\n\n').map((p: string, i: number) => (
          <p key={i} style={{ fontSize:17, lineHeight:1.8, color:'rgba(255,255,255,.65)', marginBottom:24 }}>{p}</p>
        ))}
        <div style={{ marginTop:64, textAlign:'center', borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:48 }}>
          <Link href="/auth?mode=register" style={{ padding:'14px 32px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:600, color:'#fff', textDecoration:'none' }}>✦ Get started free</Link>
        </div>
      </article>
    </main>
  )
}
