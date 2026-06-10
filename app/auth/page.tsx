import { useRef, useEffect } from 'react'

export default function AuthPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animId: number
    const resize = () => { 
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight 
    }
    resize()
    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      <div className="z-10">Auth Content</div>
    </div>
  )
}
