'use client'

import React, { useRef, useState, useCallback } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number
  as?: 'button' | 'a' | 'div'
  href?: string
  onClick?: () => void
  [key: string]: unknown
}

/**
 * MagneticButton — wraps any element and gives it a magnetic pull toward the cursor.
 * Usage: <MagneticButton as="a" href="...">Click me</MagneticButton>
 */
export function MagneticButton({
  children,
  className,
  style,
  strength = 0.4,
  as: Tag = 'div',
  href,
  onClick,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const radius = Math.max(rect.width, rect.height) * 1.2
    if (dist < radius) {
      const pull = (1 - dist / radius) * strength
      setOffset({ x: dx * pull, y: dy * pull })
    }
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  const isMoving = offset.x !== 0 || offset.y !== 0

  const combinedStyle: React.CSSProperties = {
    ...style,
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: isMoving
      ? 'transform 0.1s ease-out'
      : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    display: 'inline-flex',
    cursor: 'pointer',
  }

  const props = {
    ref,
    className,
    style: combinedStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(Tag === 'a' ? { href } : {}),
    ...rest,
  }

  return React.createElement(Tag, props as React.HTMLAttributes<HTMLElement>, children)
}
