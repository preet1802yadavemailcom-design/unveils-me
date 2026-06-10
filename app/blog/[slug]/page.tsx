import Link from 'next/link'
import { notFound } from 'next/navigation'

const POSTS: Record<string, any> = {
  'groq-fastest-ai-inference': { title:'Why Groq is the fastest AI inference on the planet', author:'Arjun Mehta', date:'June 10, 2025', readTime:'6 min', tag:'AI', color:'#6c5ff4', content:'Groq LPU delivers 200+ tokens per second.\n\nFor Unveils.me this means identity generation in under 3 seconds.' },
  'digital-identity-future': { title:'The next layer of the internet is your AI identity', author:'Kavya Iyer', date:'June 5, 2025', readTime:'8 min', tag:'Vision', color:'#38bdf8', content:'Every platform shift created a new identity layer.\n\nAI-native web represents you, not just hosts you.' },
  'llama-33-70b-guide': { title:'LLaMA 3.3 70B: The model that makes AI identity possible', author:'Vikram Nair', date:'May 28, 2025', readTime:'10 min', tag:'Technical', color:'#34d399', content:'LLaMA 3.3 70B powers every identity on Unveils.\n\nBetter than GPT-4o on quality, speed, and cost.' },
  'personal-branding-ai': { title:'Personal branding in the AI age', author:'Priya Sharma', date:'May 20, 2025', readTime:'7 min', tag:'Strategy', color:'#f472b6', content:'People find you through AI assistants now, not Google.\n\nYou need machine-readable identity.' },
  'launching-saas-checklist': { title:'The complete SaaS launch checklist', author:'Arjun Mehta', date:'May 12, 2025', readTime:'12 min', tag:'Launch', color:'#fb923c', content:'150+ items we went through launching Unveils.\n\nMost missed: DNS takes 48h, rate limit all APIs, write Product Hunt post early.' },
  'multi-agent-systems': { title:'Building multi-agent systems that actually work', author:'Kavya Iyer', date:'May 5, 2025', readTime:'9 min', tag:'AI', color:'#a78bfa', content:'Challenge is coordination not intelligence.\n\nWe use shared context — all agents read and write to one store.' },
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
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.08)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(5,5,8,.9)', position:'sticky', top:0, zIndex:50 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', color:'#fff', fontWeight:700 }}>
          ✦ unveils.me
        </Link>
        <Link href="/blog" style={{ fontSize:13, color:'rgba(255,255,255,.45)', textDecoration:'none' }}>← All posts</Link>
        <Link href="/auth?mode=register" style={{ padding:'8px 18px', background:'#6c5ff4', borderRadius:9999, fontSize:13, color:'#fff', textDecoration:'none' }}>Get started</Link>
      </nav>
      <article style={{ maxWidth:700, margin:'0 auto', padding:'64px 28px' }}>
        <span style={{ padding:'3px 12px', borderRadius:9999, fontSize:11, background:post.color+'20', color:post.color, border:'1px solid '+post.color+'40' }}>{post.tag}</span>
        <h1 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:800, marginTop:20, marginBottom:16, lineHeight:1.15 }}>{post.title}</h1>
        <div style={{ fontSize:13, color:'rgba(255,255,255,.38)', marginBottom:48 }}>
          {post.author} · {post.date} · {post.readTime} read
        </div>
        {post.content.split('\n\n').map((p: string, i: number) => (
          <p key={i} style={{ fontSize:17, lineHeight:1.8, color:'rgba(255,255,255,.65)', marginBottom:24 }}>{p}</p>
        ))}
        <div style={{ marginTop:64, textAlign:'center' }}>
          <Link href="/auth?mode=register" style={{ padding:'14px 32px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:600, color:'#fff', textDecoration:'none' }}>✦ Get started free</Link>
        </div>
      </article>
    </main>
  )
}
