'use client'

import { useEffect, useRef } from 'react'

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number; age: number }[]>([])
  const animFrameRef = useRef<number>(0)

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

    const handleMouseMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 })
      // Keep max 50 trail points
      if (points.current.length > 50) {
        points.current.shift()
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pts = points.current

      // Age and remove old points
      for (let i = pts.length - 1; i >= 0; i--) {
        pts[i].age += 1
        if (pts[i].age > 30) {
          pts.splice(i, 1)
        }
      }

      // Draw trail
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const opacity = Math.max(0, 1 - p.age / 30)
        const radius = Math.max(1, (1 - p.age / 30) * 6)

        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249, 115, 22, ${opacity * 0.6})`
        ctx.fill()
      }

      // Draw main cursor dot
      if (pts.length > 0) {
        const last = pts[pts.length - 1]
        ctx.beginPath()
        ctx.arc(last.x, last.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(249, 115, 22, 0.9)'
        ctx.fill()

        // Glow effect
        ctx.beginPath()
        ctx.arc(last.x, last.y, 10, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(last.x, last.y, 2, last.x, last.y, 10)
        gradient.addColorStop(0, 'rgba(249, 115, 22, 0.3)')
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)')
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  )
}

export default CursorTrail
