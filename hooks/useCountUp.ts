'use client'

import { useEffect, useRef, useState } from 'react'

export function useCountUp(
  end: number,
  duration: number = 2000,
  start: number = 0,
  trigger: boolean = true
) {
  const [count, setCount] = useState(start)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) return
    const startTime = performance.now()
    const range = end - start

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + range * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [end, start, duration, trigger])

  return count
}
