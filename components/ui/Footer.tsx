// ============================================
// UNVEILS.ME — Shared Footer Component
// Used across all public pages
// ============================================
import Link from 'next/link'

export default function Footer({ maxWidth = 920 }: { maxWidth?: number }) {
  const year = new Date().getFullYear()

  const cols: [string, [string, string][]][] = [
    ['Product',  [['Features','/features'],['Pricing','/pricing'],['Blog','/blog'],['FAQ','/faq']]],
    ['Company',  [['About','/about'],['Team','/team'],['Careers','/careers'],['Press','/press'],['Partners','/partners'],['Contact','/contact']]],
    ['Legal',    [['Privacy Policy','/legal/privacy'],['Terms of Service','/legal/terms'],['Cookie Policy','/legal/cookie-policy'],['Refund Policy','/legal/refund'],['GDPR','/legal/gdpr'],['Disclaimer','/legal/disclaimer']]],
  ]

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,.055)',
      padding: '52px 28px 36px',
      maxWidth,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr repeat(3, 1fr)',
        gap: '40px 32px',
        marginBottom: 40,
        flexWrap: 'wrap',
      }}>
        {/* Brand */}
        <div>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', marginBottom:12 }}>
            <div style={{ width:26, height:26, borderRadius:7, background:'linear-gradient(135deg,#6c5ff4,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#fff', flexShrink:0 }}>✦</div>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:'rgba(255,255,255,.85)', letterSpacing:'-.02em' }}>unveils.me</span>
          </Link>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.3)', lineHeight:1.7, maxWidth:190, margin:'0 0 20px' }}>
            The AI identity infrastructure of the future internet.
          </p>
          <div style={{ display:'flex', gap:12 }}>
            <a href="https://twitter.com/unveils_me" target="_blank" rel="noopener noreferrer"
              style={{ width:32, height:32, borderRadius:8, border:'1px solid rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, textDecoration:'none' }}>𝕏</a>
            <a href="https://github.com/unveils-me" target="_blank" rel="noopener noreferrer"
              style={{ width:32, height:32, borderRadius:8, border:'1px solid rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, textDecoration:'none' }}>⌥</a>
          </div>
        </div>

        {/* Link columns */}
        {cols.map(([heading, links]) => (
          <div key={heading}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:'.08em', color:'rgba(255,255,255,.28)', textTransform:'uppercase', marginBottom:14 }}>{heading}</div>
            {links.map(([label, href]) => (
              <div key={label} style={{ marginBottom:9 }}>
                <Link href={href} style={{ fontSize:13, color:'rgba(255,255,255,.38)', textDecoration:'none' }}>{label}</Link>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ paddingTop:20, borderTop:'1px solid rgba(255,255,255,.045)', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
        <span style={{ fontSize:12, color:'rgba(255,255,255,.18)' }}>© {year} Unveils.me · Unveils Technologies Pvt. Ltd. · Built in India 🇮🇳 by Preet Yadav</span>
        <span style={{ fontSize:12, color:'rgba(255,255,255,.18)' }}>Built with ❤️ for humanity</span>
      </div>
    </footer>
  )
}

