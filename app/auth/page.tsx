'use client'

import { useRef, useEffect } from 'react'

export default function AuthPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      <div className="z-10 text-white text-2xl">
        Auth Content
      </div>
    </div>
  )
}
