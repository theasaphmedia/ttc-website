'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * CursorGlow — a soft radial gradient that follows the mouse.
 * Rendered as a fixed overlay; pointer-events: none.
 * Only shows on non-touch devices.
 */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 })
  const [visible, setVisible] = useState(false)
  const smoothPos = useRef({ x: -300, y: -300 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      smoothPos.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // Smooth follow via rAF
    const animate = () => {
      setPos(prev => ({
        x: prev.x + (smoothPos.current.x - prev.x) * 0.12,
        y: prev.y + (smoothPos.current.y - prev.y) * 0.12,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      {/* Main glow */}
      <div
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          width: 500,
          height: 500,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(21,48,147,0.08) 0%, rgba(78,168,249,0.06) 35%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Sharp inner dot */}
      <div
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          width: 8,
          height: 8,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(78,168,249,0.5)',
          boxShadow: '0 0 0 1px rgba(78,168,249,0.25)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
