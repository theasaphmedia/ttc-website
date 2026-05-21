'use client'

import React, { useEffect, useRef, useState } from 'react'

interface OrbConfig {
  size: number
  x: string
  y: string
  color: string
  opacity: number
  depth: number
  blur?: number
}

const DEFAULT_ORBS: OrbConfig[] = [
  { size: 400, x: '75%',  y: '10%',  color: '#4ea8f9', opacity: 0.10, depth: 0.05 },
  { size: 280, x: '10%',  y: '65%',  color: '#f7931e', opacity: 0.08, depth: 0.08 },
  { size: 200, x: '55%',  y: '80%',  color: '#22b573', opacity: 0.06, depth: 0.04 },
  { size: 160, x: '25%',  y: '20%',  color: '#4ea8f9', opacity: 0.07, depth: 0.09 },
  { size: 120, x: '88%',  y: '55%',  color: '#f7931e', opacity: 0.07, depth: 0.06 },
]

interface FloatingOrbsProps {
  orbs?: OrbConfig[]
  className?: string
}

/**
 * FloatingOrbs — mouse-parallax glowing orbs for dark hero sections.
 * Drop anywhere inside a `position: relative; overflow: hidden` container.
 */
export function FloatingOrbs({ orbs = DEFAULT_ORBS, className }: FloatingOrbsProps) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      smooth.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      setMouse(prev => ({
        x: prev.x + (smooth.current.x - prev.x) * 0.06,
        y: prev.y + (smooth.current.y - prev.y) * 0.06,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ''}`}
    >
      {orbs.map((orb, i) => {
        const px = (mouse.x - 0.5) * orb.depth * -120
        const py = (mouse.y - 0.5) * orb.depth * -80
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: orb.color,
              opacity: orb.opacity,
              filter: `blur(${orb.blur ?? 60}px)`,
              transform: `translate(-50%, -50%) translate(${px}px, ${py}px)`,
              transition: 'transform 0.06s linear',
              willChange: 'transform',
            }}
          />
        )
      })}
    </div>
  )
}
