'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { useTilt } from '@/hooks/useTilt'

const BG = '#0a1628'

const PILLARS = [
  { index: '01', word: 'Love',  accent: 'Centered',  color: '#4ea8f9', desc: 'Every message, every moment rooted in the love of Christ — meeting people exactly where they are.',                         fromX: '-60px', fromY: '0px',  delay: 0   },
  { index: '02', word: 'Word',  accent: 'Compliant', color: '#ffffff', desc: 'The Bible is our unchanging anchor — truth that shapes identity and transforms how we live.',                              fromX: '0px',   fromY: '60px', delay: 140 },
  { index: '03', word: 'Spirit',accent: 'Empowered', color: '#f7931e', desc: 'Moving in the power of the Holy Spirit — where the presence of God is tangible and alive.',                               fromX: '60px',  fromY: '0px',  delay: 280 },
]

function PillarCard({ p, i, visible }: { p: typeof PILLARS[0], i: number, visible: boolean }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: 8,
    scale: 1.02,
    speed: 400,
    glare: true,
  })

  return (
    <div
      ref={ref}
      {...handlers}
      className="relative p-7 md:p-10 lg:p-12 flex flex-col overflow-hidden cursor-default"
      style={{
        ...cardStyle,
        background: i === 1
          ? (isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)')
          : (isHovered ? 'rgba(255,255,255,0.03)' : 'transparent'),
        opacity: visible ? 1 : 0,
        transform: [
          cardStyle.transform || '',
          visible ? 'translate(0,0)' : `translate(${p.fromX}, ${p.fromY})`,
        ].filter(Boolean).join(' '),
        transition: [
          cardStyle.transition,
          `opacity 0.95s cubic-bezier(0.16,1,0.3,1) ${p.delay}ms`,
          `background 0.3s ease`,
        ].join(', '),
        
      }}
    >
      {/* Tilt glare */}
      <div style={{ ...glareStyle, background: 'radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.06) 0%, transparent 60%)' }} />

      {/* Index chip */}
      <span className="font-heading font-black text-[10px] tracking-[0.3em] uppercase mb-5 block" style={{ color: 'rgba(247,147,30,0.55)' }}>
        {p.index}
      </span>

      {/* Giant split word */}
      <div className="mb-7 leading-none select-none">
        <span
          className="font-heading font-black block"
          style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 4.2rem)',
            color: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            transition: 'color 0.3s ease',
          }}
        >
          {p.word}
        </span>
        <span
          className="font-heading font-black block -mt-1"
          style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 4.2rem)',
            color: p.color,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
            textShadow: isHovered ? `0 0 30px ${p.color}60` : 'none',
          }}
        >
          {p.accent}
        </span>
      </div>

      {/* Rule — expands on hover */}
      <div
        className="h-px mb-6"
        style={{
          background: `${p.color}55`,
          width: isHovered ? '3rem' : '2.5rem',
          transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: isHovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-open-sans)', transition: 'color 0.3s ease' }}>
        {p.desc}
      </p>

      {/* Glow spot */}
      <div
        className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full pointer-events-none blur-2xl"
        style={{
          background: p.color,
          opacity: isHovered ? 0.12 : 0.06,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  )
}

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, target, duration])
  return count
}

export function MissionVision() {
  const [pillarsVisible, setPillarsVisible] = useState(false)
  const [visionVisible, setVisionVisible] = useState(false)
  const [mandateVisible, setMandateVisible] = useState(false)

  const pillarsRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const mandateRef = useRef<HTMLDivElement>(null)

  // Cursor glow inside mandate counter
  const [mandateSpot, setMandateSpot] = useState({ x: 50, y: 50 })
  const smoothSpot = useRef({ x: 50, y: 50 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === pillarsRef.current && e.isIntersecting) setPillarsVisible(true)
          if (e.target === visionRef.current && e.isIntersecting) setVisionVisible(true)
          if (e.target === mandateRef.current && e.isIntersecting) setMandateVisible(true)
        })
      },
      { threshold: 0.18 }
    )
    if (pillarsRef.current) obs.observe(pillarsRef.current)
    if (visionRef.current) obs.observe(visionRef.current)
    if (mandateRef.current) obs.observe(mandateRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = mandateRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      smoothSpot.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      }
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    const animate = () => {
      setMandateSpot(prev => ({
        x: prev.x + (smoothSpot.current.x - prev.x) * 0.07,
        y: prev.y + (smoothSpot.current.y - prev.y) * 0.07,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      el.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const count = useCountUp(1000000, 2600, mandateVisible)

  return (
    <section className="relative overflow-hidden" style={{ background: BG }}>
      <WaveDivider fillColor={BG} variant="wave" height={70} />
      <BrandCurves color="#4ea8f9" opacity={0.07} position="top-right" animated />
      <BrandCurves color="#f7931e" opacity={0.05} position="bottom-left" animated />

      <div className="relative z-10 pb-28 md:pb-36">
        <div className="container-ttc">

          {/* Eyebrow */}
          <div ref={pillarsRef} className="text-center mb-20">
            <span
              className="inline-flex items-center gap-2 text-xs font-heading font-bold tracking-[0.3em] uppercase px-5 py-2 rounded-full"
              style={{
                background: 'rgba(247,147,30,0.14)',
                color: '#f7931e',
                border: '1px solid rgba(247,147,30,0.28)',
                opacity: pillarsVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 0.1s',
              }}
            >
              <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
              Our Foundation
            </span>
          </div>

          {/* Three pillars — compact vertical on mobile, side-by-side on desktop */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 mb-20 md:mb-24 lg:mb-32 rounded-3xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {PILLARS.map((p, i) => (
              <div
                key={p.word}
                style={{
                  borderBottom: i < PILLARS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
                className="md:border-b-0"
              >
                <PillarCard p={p} i={i} visible={pillarsVisible} />
              </div>
            ))}
          </div>

          {/* Vision statement */}
          <div
            ref={visionRef}
            className="max-w-3xl mx-auto text-center mb-24 md:mb-32"
            style={{
              opacity: visionVisible ? 1 : 0,
              transform: visionVisible ? 'translateY(0)' : 'translateY(44px)',
              transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="flex justify-center mb-6" aria-hidden="true">
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
                <path d="M0 36 Q7 0 19 0 Q12 12 14 22 Q9 22 9 36 Z" fill="rgba(247,147,30,0.3)" />
                <path d="M24 36 Q31 0 43 0 Q36 12 38 22 Q33 22 33 36 Z" fill="rgba(247,147,30,0.3)" />
              </svg>
            </div>
            <p
              className="font-heading font-black leading-snug mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)', color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}
            >
              To raise a people who are{' '}
              <span style={{ color: '#4ea8f9' }}>saved</span> &amp;{' '}
              <span style={{ color: '#4ea8f9' }}>purpose-driven</span>,
              <br className="hidden sm:block" />
              {' '}growing in{' '}
              <span style={{ color: '#f7931e' }}>devotion</span>, and living a life of{' '}
              <span style={{ color: '#f7931e' }}>fulfillment</span>.
            </p>
            <span
              className="inline-block text-[10px] font-heading font-bold tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mt-2"
              style={{ color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Our Vision
            </span>
          </div>

          {/* Mandate counter with cursor glow */}
          <div
            ref={mandateRef}
            className="relative rounded-3xl overflow-hidden text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Cursor-following glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 500,
                height: 500,
                borderRadius: '50%',
                left: `${mandateSpot.x}%`,
                top: `${mandateSpot.y}%`,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(78,168,249,0.12) 0%, rgba(247,147,30,0.06) 40%, transparent 70%)',
                transition: 'left 0.05s linear, top 0.05s linear',
                willChange: 'left, top',
                zIndex: 1,
              }}
            />

            <BrandCurves color="#4ea8f9" opacity={0.07} position="top-right" animated={false} />
            <BrandCurves color="#f7931e" opacity={0.05} position="bottom-left" animated={false} />

            <div
              className="relative z-10 py-16 md:py-20 px-6"
              style={{
                opacity: mandateVisible ? 1 : 0,
                transform: mandateVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 1s ease, transform 1s ease',
              }}
            >
              <p
                className="font-accent block mb-4"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#f7931e' }}
              >
                The Mandate
              </p>

              {/* Counter */}
              <div
                className="font-heading font-black leading-none mb-5 tabular-nums transition-all duration-150"
                style={{
                  fontSize: 'clamp(4.5rem, 13vw, 10rem)',
                  color: '#ffffff',
                  letterSpacing: '-0.04em',
                  textShadow: '0 0 100px rgba(78,168,249,0.22)',
                }}
              >
                {count.toLocaleString()}
              </div>

              <p
                className="font-heading font-bold mb-8"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.6)' }}
              >
                believers transformed in{' '}
                <span style={{ color: '#4ea8f9' }}>3 years</span>
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {['Nigeria', 'Canada', 'USA', 'UK / EU', '& beyond'].map((loc) => (
                  <span
                    key={loc}
                    className="px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-wide transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <WaveDivider fillColor="#ffffff" variant="organic" flip height={70} />
    </section>
  )
}
