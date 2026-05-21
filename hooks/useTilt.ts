'use client'

import { useRef, useState, useCallback } from 'react'

interface TiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
  glare?: boolean
}

interface TiltState {
  rotateX: number
  rotateY: number
  glareX: number
  glareY: number
  isHovered: boolean
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const {
    maxTilt = 12,
    perspective = 800,
    scale = 1.02,
    speed = 400,
    glare = true,
  } = options

  const ref = useRef<T>(null)
  const [state, setState] = useState<TiltState>({
    rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false,
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setState({
      rotateX: -ny * maxTilt * 2,
      rotateY: nx * maxTilt * 2,
      glareX: (nx + 0.5) * 100,
      glareY: (ny + 0.5) * 100,
      isHovered: true,
    })
  }, [maxTilt])

  const handleMouseLeave = useCallback(() => {
    setState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false })
  }, [])

  const cardStyle: React.CSSProperties = {
    transform: `perspective(${perspective}px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale3d(${state.isHovered ? scale : 1},${state.isHovered ? scale : 1},1)`,
    transition: state.isHovered ? `transform ${speed * 0.3}ms ease-out` : `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`,
    willChange: 'transform',
    transformStyle: 'preserve-3d',
  }

  const glareStyle: React.CSSProperties = glare ? {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 'inherit',
    background: `radial-gradient(circle at ${state.glareX}% ${state.glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)`,
    opacity: state.isHovered ? 1 : 0,
    transition: `opacity ${speed}ms ease`,
    zIndex: 10,
  } : {}

  return {
    ref,
    cardStyle,
    glareStyle,
    isHovered: state.isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
