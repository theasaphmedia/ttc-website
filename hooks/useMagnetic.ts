'use client'

import { useRef, useState, useCallback } from 'react'

interface MagneticOptions {
  strength?: number   // 0..1, how much it pulls. Default 0.35
  radius?: number     // px within which magnetism activates. Default 80
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { strength = 0.35, radius = 80 } = options
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const animRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < radius) {
      const pull = (1 - dist / radius) * strength
      setOffset({ x: dx * pull, y: dy * pull })
    }
  }, [strength, radius])

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  const style: React.CSSProperties = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0
      ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
      : 'transform 0.1s ease-out',
    display: 'inline-flex',
  }

  return {
    ref,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
