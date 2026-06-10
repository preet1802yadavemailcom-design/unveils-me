```tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'

const POSTS: Record<string, any> = {
  'groq-fastest-ai-inference': {
    title:'Why Groq is the fastest AI inference on the planet',
    author:'Arjun Mehta',
    date:'June 10, 2025',
    readTime:'6 min',
    tag:'AI',
    color:'#6c5ff4',
    content:'Groq LPU delivers 200+ tokens per second.'
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = POSTS[slug]

  if (!post) return { title: 'Not Found' }

  return {
    title: post.title + ' — Unveils.me',
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = POSTS[slug]

  if (!post) notFound()

  return (
    <main
      style={{
        background: '#050508',
        color: '#fff',
        minHeight: '100vh',
        padding: '40px',
      }}
    >
      <Link href="/">Home</Link>

      <h1>{post.title}</h1>

      <p>{post.content}</p>
    </main>
  )
}
```
