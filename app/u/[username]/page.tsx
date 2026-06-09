import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const DEMO = {
  name: 'Arjun Mehta', subdomain: 'arjun', type: 'FOUNDER',
  tagline: 'Building the Internet That Should Exist',
  bio: "I'm a full-stack founder obsessed with AI infrastructure. Currently building Unveils.me — the AI identity OS for the future internet. Previously at Stripe and Y Combinator.",
  skills: ['AI/ML', 'System Design', 'Next.js', 'TypeScript', 'Product Strategy', 'AI'],
  websiteHero: 'Building the Internet That Should Exist',
  ctaText: 'Work with me',
  colorPalette: { primary: '#6c5ff4', secondary: '#a78bfa', accent: '#34d399', background: '#0a0a0f', text: '#ffffff' },
  seoMeta: { title: 'Arjun Mehta — Founder & Builder', description: 'Building Unveils.me.' },
  agents: [
    { id: '1', name: 'Nova',  emoji: '🧠', role: 'Business strategy & growth'   },
    { id: '2', name: 'Lens',  emoji: '🎨', role: 'Visual design & brand system'  },
    { id: '3', name: 'Forge', emoji: '⚡', role: 'Code, architecture & DevOps'   },
  ],
  viewCount: 2847,
}

async function getProfile(username: string) {
  try {
    const { default: prisma } = await import('@/lib/db/prisma')
    return await prisma.identity.findUnique({
      where: { subdomain: username, isPublished: true },
      include: { agents: true },
    })
  } catch { return null }
}

// ✅ Next.js 15: params is now a Promise — must be awaited
export async function generateMetadata(
  { params }: { params: Promise<{ username: string }> }
): Promise<Metadata> {
  const { username } = await params
  const data = await getProfile(username) ?? (username === 'demo' ? DEMO : null)
  if (!data) return { title: 'Not Found' }
  const seo = data.seoMeta as { title: string; description: string }
  return { title: seo.title, description: seo.description }
}

export default async function PublicProfile(
  { params }: { params: Promise<{ username: string }> }
) {
  // ✅ Next.js 15: await params before accessing its properties
  const { username } = await params

  const profile = await getProfile(username)
  const data    = profile ?? (username === 'demo' ? DEMO : null)
  if (!data) notFound()

  const cp     = data.colorPalette as { primary: string; secondary: string; accent: string; background: string; text: string }
  const agents = data.agents as Array<{ id: string; name: string; emoji: string; role: string }>
  const skills = data.skills as string[]

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
        body{background:${cp.background};color:${cp.text};font-family:'DM Sans',system-ui,sans-serif;min-height:100vh}
        a{color:inherit;text-decoration:none}
        .reveal{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .tag{display:inline-block;padding:6px 14px;border-radius:9999px;font-size:12px;font-weight:500;background:${cp.primary}18;border:1px solid ${cp.primary}35;color:${cp.primary}}
        .btn-cta{display:inline-flex;align-items:center;padding:13px 26px;background:${cp.primary};color:#fff;border-radius:9999px;font-size:14px;font-weight:600;transition:opacity .2s}
        .btn-cta:hover{opacity:.88}
        .btn-ghost{display:inline-flex;align-items:center;padding:13px 22px;border-radius:9999px;font-size:14px;border:1px solid ${cp.text}20;color:${cp.text}55}
        .divider{height:1px;background:${cp.text}08;margin:52px 0}
        .stat-card{padding:18px 20px;border-radius:14px;background:${cp.text}04;border:1px solid ${cp.text}07}
        .agent-card{padding:20px;border-radius:16px;background:${cp.text}04;border:1px solid ${cp.text}07;text-align:center}
        .skill-track{height:4px;background:${cp.text}10;border-radius:2px;margin-top:5px}
        .skill-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,${cp.primary},${cp.secondary});transition:width 1.2s cubic-bezier(.16,1,.3,1)}
        .top-nav{position:fixed;top:0;inset-inline:0;z-index:50;backdrop-filter:blur(20px);background:${cp.background}cc;border-bottom:1px solid ${cp.text}08}
        .nav-inner{max-width:700px;margin:0 auto;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between}
        @keyframes lp{0%,100%{opacity:1}50%{opacity:.35}}
        .live-dot{width:7px;height:7px;border-radius:50%;background:${cp.accent};animation:lp 2s ease-in-out infinite;display:inline-block}
        .badge-live{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:500;background:${cp.accent}15;border:1px solid ${cp.accent}28;color:${cp.accent}}
        .powered{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:9999px;font-size:11px;border:1px solid ${cp.text}10;color:${cp.text}30}
        .cta-band{padding:40px 32px;border-radius:20px;background:${cp.primary}10;border:1px solid ${cp.primary}22;text-align:center}
      `}} />

      <nav className="top-nav">
        <div className="nav-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="live-dot" />
            <span style={{ fontFamily: 'Syne,system-ui', fontWeight: 700, fontSize: 14 }}>{data.subdomain}.unveils.me</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="badge-live">● Live</span>
            <a href={`mailto:hello@${data.subdomain}.unveils.me`} className="btn-cta" style={{ padding: '8px 18px', fontSize: 13 }}>{data.ctaText} →</a>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 700, margin: '0 auto', padding: '92px 24px 72px' }}>

        {/* Hero */}
        <section className="reveal" style={{ marginBottom: 60 }}>
          <div style={{ display: 'inline-block', padding: '3px 11px', borderRadius: 9999, fontSize: 11, fontWeight: 500,
                        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 22,
                        background: `${cp.primary}14`, border: `1px solid ${cp.primary}28`, color: cp.primary }}>
            {(data.type as string).toLowerCase()}
          </div>
          <h1 style={{ fontFamily: 'Syne,system-ui', fontSize: 'clamp(32px,5.5vw,58px)', fontWeight: 800,
                       lineHeight: 1.08, marginBottom: 18, letterSpacing: '-0.02em' }}>
            {data.websiteHero}
          </h1>
          <p style={{ fontSize: 17, color: `${cp.text}68`, maxWidth: 500, lineHeight: 1.8, marginBottom: 32 }}>{data.tagline}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            <a href={`mailto:hello@${data.subdomain}.unveils.me`} className="btn-cta">{data.ctaText} →</a>
            <span className="btn-ghost">{data.subdomain}.unveils.me</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {[
              { label: 'Profile views', value: (data.viewCount ?? 0).toLocaleString() },
              { label: 'AI agents',     value: String(agents.length) },
              { label: 'Skills',        value: String(skills.length) },
            ].map(({ label, value }) => (
              <div key={label} className="stat-card">
                <div style={{ fontFamily: 'Syne,system-ui', fontSize: 26, fontWeight: 700, color: cp.primary, marginBottom: 3 }}>{value}</div>
                <div style={{ fontSize: 11, color: `${cp.text}40` }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* About */}
        <section className="reveal" style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Syne,system-ui', fontSize: 20, fontWeight: 700, marginBottom: 16, color: cp.primary }}>About</h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: `${cp.text}72`, maxWidth: 560 }}>{data.bio}</p>
        </section>

        <div className="divider" />

        {/* Skills */}
        <section className="reveal" style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Syne,system-ui', fontSize: 20, fontWeight: 700, marginBottom: 18, color: cp.primary }}>Expertise</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 28px', marginBottom: 20 }}>
            {skills.map((skill, i) => (
              <div key={skill}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: `${cp.text}65` }}>
                  <span>{skill}</span><span style={{ color: cp.primary }}>{90 - i * 4}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" data-w={90 - i * 4} style={{ width: 0 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {skills.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </section>

        <div className="divider" />

        {/* Agents */}
        <section className="reveal" style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Syne,system-ui', fontSize: 20, fontWeight: 700, color: cp.primary, marginBottom: 6 }}>AI Agent Team</h2>
          <p style={{ fontSize: 12, color: `${cp.text}38`, marginBottom: 20 }}>Powered by Unveils.me · AI Advanced AI</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(165px,1fr))', gap: 12 }}>
            {agents.map(a => (
              <div key={a.id} className="agent-card">
                <div style={{ fontSize: 26, marginBottom: 10 }}>{a.emoji}</div>
                <div style={{ fontFamily: 'Syne,system-ui', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontSize: 11.5, color: `${cp.text}42`, lineHeight: 1.5 }}>{a.role}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* CTA */}
        <section className="reveal" style={{ marginBottom: 60 }}>
          <div className="cta-band">
            <h2 style={{ fontFamily: 'Syne,system-ui', fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Let&apos;s build something great</h2>
            <p style={{ fontSize: 14.5, color: `${cp.text}58`, marginBottom: 24 }}>Open to collaborations, consulting, and interesting conversations.</p>
            <a href={`mailto:hello@${data.subdomain}.unveils.me`} className="btn-cta">Get in touch →</a>
          </div>
        </section>

        <footer style={{ paddingTop: 28, borderTop: `1px solid ${cp.text}08`, textAlign: 'center' }}>
          <span className="powered">Powered by <a href="https://unveils.me" style={{ color: cp.primary, fontWeight: 600 }}>unveils.me</a> · AI Identity OS</span>
        </footer>
      </main>

      <script dangerouslySetInnerHTML={{ __html: `
        var els=document.querySelectorAll('.reveal');
        var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('visible')})},{threshold:.08});
        els.forEach(function(el){io.observe(el)});
        setTimeout(function(){if(els[0])els[0].classList.add('visible')},80);
        var bars=document.querySelectorAll('.skill-fill');
        var bo=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.style.width=x.target.dataset.w+'%'}})},{threshold:.2});
        bars.forEach(function(b){bo.observe(b)});
      `}} />
    </>
  )
}