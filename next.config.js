/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000','unveils.me','*.unveils.me'] },
  },
  images: {
    remotePatterns: [
      { protocol:'https', hostname:'*.supabase.co' },
      { protocol:'https', hostname:'avatars.githubusercontent.com' },
      { protocol:'https', hostname:'lh3.googleusercontent.com' },
    ],
    formats: ['image/avif','image/webp'],
  },
  redirects: async () => [
    { source:'/login',  destination:'/auth',               permanent:false },
    { source:'/signup', destination:'/auth?mode=register', permanent:false },
    { source:'/home',   destination:'/',                   permanent:true  },
  ],
}
module.exports = nextConfig

