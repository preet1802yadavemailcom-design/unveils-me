// app/not-found.tsx — Premium animated 404 page
import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 — Page not found · Unveils.me</title>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#050508;color:#fff;font-family:'DM Sans',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
          .orb{position:fixed;border-radius:50%;filter:blur(90px);opacity:.22;pointer-events:none}
          .num{font-family:'Syne',sans-serif;font-size:clamp(100px,20vw,200px);font-weight:800;letter-spacing:-.06em;line-height:1;background:linear-gradient(135deg,rgba(108,95,244,.35),rgba(108,95,244,.06));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:24px;user-select:none}
          h1{font-family:'Syne',sans-serif;font-size:clamp(22px,3vw,32px);font-weight:700;letter-spacing:-.03em;margin-bottom:14px}
          p{font-size:16px;color:rgba(255,255,255,.45);max-width:380px;line-height:1.7;margin-bottom:36px;text-align:center}
          .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;background:#6c5ff4;color:#fff;border-radius:9999px;font-size:14px;font-weight:500;text-decoration:none;transition:opacity .2s}
          .btn:hover{opacity:.85}
          .ghost{background:transparent;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.6)}
          .ghost:hover{background:rgba(255,255,255,.06);color:#fff}
          .wrap{text-align:center;position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
          .links{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
          .grid{position:fixed;inset:0;background-image:radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
        `}</style>
      </head>
      <body>
        <div className="grid" />
        <div className="orb" style={{ width: "500px", height: "500px", background: "#6c5ff4", left: "-10%", top: "-10%" }} />
        <div className="orb" style={{ width: "400px", height: "400px", background: "#38bdf8", right: "-5%", bottom: "-5%" }} />
        <div className="wrap">
          <div className="num">404</div>
          <h1>Page not found</h1>
          <p>The page you're looking for doesn't exist, has been moved, or the subdomain hasn't been claimed yet.</p>
          <div className="links">
            <a href="/" className="btn">← Back to home</a>
            <a href="/auth?mode=register" className="btn ghost">Claim this subdomain</a>
          </div>
        </div>
      </body>
    </html>
  )
}

