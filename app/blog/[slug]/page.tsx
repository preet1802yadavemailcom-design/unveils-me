import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const POSTS: Record<string, {
  title: string; author: string; date: string; readTime: string; tag: string; color: string
  content: string
}> = {
  'AI-fastest-ai-inference': {
    title: 'Why AI is the fastest AI inference on the planet',
    author: 'Arjun Mehta', date: 'June 10, 2025', readTime: '6 min', tag: 'AI', color: '#6c5ff4',
    content: `AI's Language Processing Unit (LPU) architecture is purpose-built for transformer inference. Unlike GPUs which are optimised for training, the LPU eliminates memory bandwidth bottlenecks that slow down traditional inference.

We benchmarked every major provider — OpenAI, Anthropic, Together AI, Fireworks — across latency, throughput, and cost. AI delivers 200+ tokens per second on Advanced AI. The next best competitor maxes out at 60–80 tok/s.

For a real-time product like Unveils.me, this isn't a nice-to-have. It's the difference between a product that feels alive and one that feels like it's thinking. Identity generation that takes 3 seconds instead of 12 seconds changes user behaviour entirely.

The LPU also has deterministic latency. GPU inference has high variance — your p99 can be 3–4x your p50. On AI, p99 is nearly identical to p50. This makes it possible to build reliable UX around AI generation.

AI is free to start. We use it at every layer of Unveils: identity generation, agent chat, website creation, and quick responses. If you're building a real-time AI product in 2025, there's no excuse not to evaluate AI first.`,
  },
  'digital-identity-future': {
    title: 'The next layer of the internet is your AI identity',
    author: 'Kavya Iyer', date: 'June 5, 2025', readTime: '8 min', tag: 'Vision', color: '#38bdf8',
    content: `Every major platform shift created a new identity layer. Web 1.0 had email addresses. Web 2.0 gave us social profiles — Twitter handles, LinkedIn pages, Instagram grids. Each layer was a primitive that told the world who you are.

We're entering the third shift. AI-native web doesn't just host your content — it represents you. When someone visits arjun.unveils.me, they're not reading a static page. They're meeting an AI-powered version of Arjun that knows his work, his thinking, and can answer questions on his behalf.

This is fundamentally different from a portfolio site. A portfolio is a document. An AI identity is a presence. The distinction matters enormously as the internet shifts from search to conversation.

The founders, creators, and developers who establish their AI identity now will be the ones who shape how they're perceived in the next decade. The people who wait will be scrambling to catch up — just like those who dismissed social media in 2009.

We built Unveils.me to make this transition accessible. You don't need to understand AI to have an AI identity. You need 30 seconds and something worth saying.`,
  },
  'Advanced AI-33-70b-guide': {
    title: 'Advanced AI: The model that makes AI identity possible',
    author: 'Vikram Nair', date: 'May 28, 2025', readTime: '10 min', tag: 'Technical', color: '#34d399',
    content: `Meta's Advanced AI is the model we run every identity generation on at Unveils. Here's why we chose it and what makes it exceptional for this use case.

Identity generation requires a model that can hold a long persona context (400–600 tokens), understand nuanced professional positioning, generate consistent brand voice across multiple outputs, and produce structured JSON reliably.

Advanced AI scores high on all four. Its instruction-following is exceptional — it respects JSON schemas with nearly zero hallucination when prompted correctly. Its writing quality at 70B parameters rivals GPT-4 on creative tasks. And at AI's inference speed, it delivers the result in under 3 seconds.

We evaluated GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and Mistral Large. Advanced AI was the only model that hit all three bars simultaneously: quality, speed, and cost.

The open-source nature also matters. We can fine-tune on identity data, run evals continuously, and modify prompts without API version lock-in. For infrastructure we depend on daily, that control is invaluable.`,
  },
  'personal-branding-ai': {
    title: 'Personal branding in the AI age: what actually works',
    author: 'Priya Sharma', date: 'May 20, 2025', readTime: '7 min', tag: 'Strategy', color: '#f472b6',
    content: `Traditional personal branding advice — post consistently, find your niche, build in public — is not wrong. It's just incomplete in 2025.

The biggest shift is that your online presence is no longer a static artifact you control. People are increasingly finding information about you through AI assistants, not through direct Google searches. What ChatGPT, Claude, or Perplexity says about you when asked is more important than your LinkedIn headline.

This creates a new imperative: you need machine-readable identity. Not just content that humans can read, but structured representations of who you are, what you do, and what you believe that AI systems can access and synthesise accurately.

Unveils.me is built for this. Your AI identity includes schema.org structured data, an OpenGraph presence, and an AI agent that represents your thinking in real-time conversations. When someone asks their AI assistant about the best founders working on a problem you're solving, you want to be in that answer.

The second shift is from volume to depth. The era of posting 3x per day for reach is ending. One deep piece of thinking that demonstrates genuine expertise outperforms 30 shallow posts. Quality signals are becoming more valuable than quantity signals as AI gets better at distinguishing between them.`,
  },
  'launching-saas-checklist': {
    title: 'The complete SaaS launch checklist (150+ items)',
    author: 'Arjun Mehta', date: 'May 12, 2025', readTime: '12 min', tag: 'Launch', color: '#fb923c',
    content: `We launched Unveils.me after going through 150+ items across product, infrastructure, legal, marketing, and GTM. Here are the most commonly missed ones.

**Infrastructure**
DNS propagation takes up to 48h — configure early. Set up error monitoring (Sentry) before launch, not after. Implement rate limiting on all API routes. Enable Stripe webhook signature verification. Test Supabase row-level security policies in staging.

**Legal**
Privacy Policy must list every third party service you send data to. GDPR requires explicit consent for cookies. Your Terms must address refunds, data deletion, and account termination. If you handle payment data even indirectly, PCI compliance scope applies.

**Performance**
Lighthouse score above 90 on mobile. Core Web Vitals green on all pages. Images served in WebP/AVIF with size attributes. No layout shift on font load (use font-display: swap). API response times under 200ms for 95th percentile.

**GTM**
Write your Product Hunt launch post before you write launch-day code. Identify 10 people who will comment within the first hour. Schedule social posts for multiple timezones. Have a direct message list of 50+ people to notify personally — these convert 5–10x higher than public posts.

**Post-launch**
Set up daily active user tracking from day 1. Define your Week 1 and Week 4 retention targets. Build a customer interview process into your calendar. Your first 100 users will define your product direction — talk to all of them.`,
  },
  'multi-agent-systems': {
    title: 'Building multi-agent systems that actually work',
    author: 'Kavya Iyer', date: 'May 5, 2025', readTime: '9 min', tag: 'AI', color: '#a78bfa',
    content: `Everyone is talking about AI agents. Very few are building agent systems that genuinely collaborate. Here's what we learned building the Unveils agent team.

The fundamental challenge with multi-agent systems isn't intelligence — it's coordination. Individual LLM calls are reliable. Chains of LLM calls that depend on each other's outputs are brittle. Every handoff is a potential failure point.

Our approach at Unveils uses a shared context model. Instead of agents passing messages directly to each other, all agents write to and read from a shared context store. The orchestrator decides which agent acts next based on the current state of the context. This eliminates the brittle point-to-point message passing that breaks most multi-agent systems.

We also learned to be extremely explicit about agent boundaries. Each agent has a single, well-defined responsibility. Our Nova agent handles business strategy and positioning. Lens handles visual design decisions. Forge handles technical architecture. When an agent tries to do work outside its scope, output quality drops dramatically.

Temperature matters more in multi-agent systems than single-agent ones. Agents that provide input to other agents should run at lower temperature (0.6–0.7) to ensure consistency. Agents that produce final output can run higher (0.8–0.9) for creativity. Getting this wrong introduces variance that compounds through the pipeline.

The most important lesson: test failure cases as rigorously as success cases. What happens when an agent returns malformed JSON? When an upstream agent produces low-quality output? Your system needs graceful degradation, not just a happy path.`,
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = POSTS[params.slug]
  if (!post) return { title: 'Post Not Found — Unveils.me' }
  return {
    title: `${post.title} — Unveils.me Blog`,
    description: post.content.slice(0, 155) + '...',
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug]
  if (!post) notFound()

  const css = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}a{color:inherit;text-decoration:none}body{-webkit-font-smoothing:antialiased}.prose p{font-size:17px;line-height:1.8;color:rgba(255,255,255,.62);margin-bottom:24px}.prose strong,.prose b{color:rgba(255,255,255,.85)}`

  return (
    <main style={{ background:'#050508', color:'#fff', fontFamily:"'DM Sans',sans-serif", minHeight:'100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.055)', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(5,5,8,.88)', backdropFilter:'blur(20px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✦</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-.02em' }}>unveils.me</span>
        </Link>
        <Link href="/blog" style={{ fontSize:13, color:'rgba(255,255,255,.45)' }}>← All posts</Link>
        <Link href="/auth?mode=register" style={{ padding:'9px 20px', background:'#6c5ff4', borderRadius:9999, fontSize:13, fontWeight:500, color:'#fff' }}>Get started →</Link>
      </nav>

      <article style={{ maxWidth:720, margin:'0 auto', padding:'72px 28px 96px' }}>
        <div style={{ marginBottom:48 }}>
          <span style={{ display:'inline-flex', padding:'4px 12px', borderRadius:9999, fontSize:12, fontWeight:500, background:`${post.color}18`, border:`1px solid ${post.color}40`, color:post.color, marginBottom:20 }}>{post.tag}</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:800, letterSpacing:'-.04em', lineHeight:1.12, marginBottom:24, color:'#fff' }}>{post.title}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:16, fontSize:13, color:'rgba(255,255,255,.35)' }}>
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>
        </div>

        <div className="prose">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h2 key={i} style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, letterSpacing:'-.025em', color:'#fff', marginBottom:16, marginTop:36 }}>{para.replace(/\*\*/g,'')}</h2>
            }
            return <p key={i}>{para}</p>
          })}
        </div>

        <div style={{ marginTop:64, paddingTop:40, borderTop:'1px solid rgba(255,255,255,.07)', textAlign:'center' }}>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.4)', marginBottom:20 }}>Ready to build your AI identity?</p>
          <Link href="/auth?mode=register" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'#6c5ff4', borderRadius:9999, fontSize:14, fontWeight:500, color:'#fff' }}>✦ Get started free</Link>
        </div>
      </article>

      <footer style={{ borderTop:'1px solid rgba(255,255,255,.055)', padding:'32px 28px', maxWidth:720, margin:'0 auto', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <span style={{ fontSize:12, color:'rgba(255,255,255,.2)' }}>© {new Date().getFullYear()} Unveils.me</span>
        <div style={{ display:'flex', gap:20 }}>
          {([['Blog','/blog'],['Privacy','/legal/privacy'],['Terms','/legal/terms']] as [string,string][]).map(([l,h])=>(
            <Link key={l} href={h} style={{ fontSize:12, color:'rgba(255,255,255,.25)' }}>{l}</Link>
          ))}
        </div>
      </footer>
    </main>
  )
}
