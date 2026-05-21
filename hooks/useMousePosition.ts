'use client'

import { useEffect, useRef, useState } from 'react'

export interface MousePosition {
  x: number // 0..1 across window width
  y: number // 0..1 across window height
  rawX: number
  rawY: number
}

export function useMousePosition(smooth = false): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0.5, y: 0.5, rawX: 0, rawY: 0 })
  const rafRef = useRef<number>(0)
  const targetRef = useRef({ x: 0.5, y: 0.5, rawX: 0, rawY: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      targetRef.current = { x, y, rawX: e.clientX, rawY: e.clientY }
      if (!smooth) setPos({ x, y, rawX: e.clientX, rawY: e.clientY })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })

    if (smooth) {
      let current = { x: 0.5, y: 0.5 }
      const animate = () => {
        current.x += (targetRef.current.x - current.x) * 0.08
        current.y += (targetRef.current.y - current.y) * 0.08
        setPos({
          x: current.x,
          y: current.y,
          rawX: targetRef.current.rawX,
          rawY: targetRef.current.rawY,
        })
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [smooth])

  return pos
}
