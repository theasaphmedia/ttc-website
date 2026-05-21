'use client'

import React, { useRef, useEffect, useState, ElementType } from 'react'
import { cn } from '@/lib/utils'

type AnimationVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'none'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
  as?: ElementType
}

const VARIANTS: Record<AnimationVariant, { hidden: string; visible: string }> = {
  fadeUp: {
    hidden: 'opacity-0 translate-y-10',
    visible: 'opacity-100 translate-y-0',
  },
  fadeIn: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  slideLeft: {
    hidden: 'opacity-0 -translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  slideRight: {
    hidden: 'opacity-0 translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  scaleUp: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
  none: {
    hidden: '',
    visible: '',
  },
}

export function AnimatedSection({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  once = true,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  const { hidden, visible: visibleClass } = VARIANTS[variant]

  return (
    <div
      ref={ref}
      className={cn(hidden, visible && visibleClass, className)}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
