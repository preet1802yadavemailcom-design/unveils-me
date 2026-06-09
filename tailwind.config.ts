import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-body)',    'system-ui','sans-serif'],
        display: ['var(--font-display)', 'system-ui','sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      colors: {
        brand: { DEFAULT:'#6c5ff4', light:'#a29afb', dark:'#4f3de8', glow:'rgba(108,95,244,0.4)' },
        surface: { 0:'#050508', 1:'#08080d', 2:'#0d0d14', 3:'#131320', 4:'#1a1a2a', 5:'#222235', 6:'#2d2d45' },
      },
      borderColor: { DEFAULT:'rgba(255,255,255,0.065)' },
      animation: {
        'slide-up':   'slideUp 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fadeIn 0.4s ease both',
        'scale-in':   'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':    'shimmer 1.7s ease infinite',
        'dot-bounce': 'dotBounce 1.3s ease-in-out infinite',
        'marquee':    'marquee 24s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'orb-float':  'orbFloat 10s ease-in-out infinite',
        'live-ping':  'livePing 1.8s ease-in-out infinite',
      },
      keyframes: {
        slideUp:   { from:{opacity:'0',transform:'translateY(22px)'}, to:{opacity:'1',transform:'translateY(0)'} },
        fadeIn:    { from:{opacity:'0'}, to:{opacity:'1'} },
        scaleIn:   { from:{opacity:'0',transform:'scale(0.93)'}, to:{opacity:'1',transform:'scale(1)'} },
        shimmer:   { '0%':{backgroundPosition:'200% 0'}, '100%':{backgroundPosition:'-200% 0'} },
        dotBounce: { '0%,80%,100%':{transform:'scale(0.6)',opacity:'0.35'}, '40%':{transform:'scale(1)',opacity:'1'} },
        marquee:   { from:{transform:'translateX(0)'}, to:{transform:'translateX(-50%)'} },
        glowPulse: { '0%,100%':{boxShadow:'0 0 18px rgba(108,95,244,0.25)'}, '50%':{boxShadow:'0 0 48px rgba(108,95,244,0.6)'} },
        orbFloat:  { '0%,100%':{transform:'translate(0,0) scale(1)'}, '33%':{transform:'translate(24px,-18px) scale(1.07)'}, '66%':{transform:'translate(-16px,22px) scale(0.95)'} },
        livePing:  { '0%,100%':{opacity:'1'}, '50%':{opacity:'0.3'} },
      },
    },
  },
  plugins: [],
}
export default config

