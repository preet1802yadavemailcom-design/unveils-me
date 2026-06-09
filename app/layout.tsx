import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import CookieBanner from '@/components/ui/CookieBanner'
import '@/styles/globals.css'

const syne   = Syne({ subsets:['latin'], variable:'--font-syne', weight:['400','500','600','700','800'], display:'swap' })
const dmSans = DM_Sans({ subsets:['latin'], variable:'--font-dm', weight:['300','400','500','600'], display:'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://unveils.me'),
  title: { default:'Unveils.me — AI Identity Operating System', template:'%s · Unveils.me' },
  description: 'The AI-native digital identity platform. Create your intelligent website, AI agents, and digital universe in seconds.',
  keywords: ['AI identity','digital identity','AI website builder','personal brand','AI agents','creator platform','AI','Advanced AI'],
  authors: [{ name:'Unveils.me' }],
  creator: 'Unveils.me',
  publisher: 'Unveils Technologies Pvt. Ltd.',
  openGraph: {
    type:'website', locale:'en_IN', url:'https://unveils.me', siteName:'Unveils.me',
    title:'Unveils.me — AI Identity Operating System',
    description:'The AI-native digital identity platform for humanity.',
    images:[{ url:'/api/og?title=Unveils.me&subtitle=AI%20Identity%20Operating%20System', width:1200, height:630 }],
  },
  twitter: {
    card:'summary_large_image', site:'@unveils_me', creator:'@unveils_me',
    title:'Unveils.me — AI Identity OS',
    description:'AI identity, website, and agents live in 30 seconds.',
  },
  robots: { index:true, follow:true, googleBot:{ index:true, follow:true, 'max-image-preview':'large' } },
  icons: {
    icon:[{ url:'/favicon.ico', sizes:'any' }, { url:'/icon.svg', type:'image/svg+xml' }],
    apple:[{ url:'/apple-icon.png', sizes:'180x180' }],
  },
  manifest: '/manifest.json',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? '',
    other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION ?? '' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media:'(prefers-color-scheme: dark)',  color:'#050508' },
    { media:'(prefers-color-scheme: light)', color:'#6c5ff4' },
  ],
  colorScheme: 'dark', width:'device-width', initialScale:1, maximumScale:5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'SoftwareApplication',
          name:'Unveils.me', applicationCategory:'ProductivityApplication',
          description:'AI-native digital identity platform', url:'https://unveils.me',
          operatingSystem:'Web',
          offers:{ '@type':'Offer', price:'0', priceCurrency:'USD' },
          author:{ '@type':'Organization', name:'Unveils Technologies Pvt. Ltd.', url:'https://unveils.me' },
        }) }} />
      </head>
      <body className="font-sans antialiased" style={{ background:'var(--s0)', color:'var(--t1)' }}>
        {children}
        <CookieBanner />
        <Toaster position="bottom-right" toastOptions={{
          style:{ background:'#0d0d14', color:'#fff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', fontSize:'14px', maxWidth:'380px' },
          success:{ iconTheme:{ primary:'#34d399', secondary:'#fff' }, duration:3000 },
          error:{ iconTheme:{ primary:'#f87171', secondary:'#fff' }, duration:4000 },
        }} />
      </body>
    </html>
  )
}

