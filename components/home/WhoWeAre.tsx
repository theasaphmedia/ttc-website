'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useTilt } from '@/hooks/useTilt'

const STEPS = [
  { number: '01', word: 'Find',  verb: 'Find the unsaved',    description: 'We actively seek those who have not yet encountered the transforming power of Christ — meeting people exactly where they are.',       color: '#153093', accent: '#4ea8f9' },
  { number: '02', word: 'Fold',  verb: 'Fold them in',        description: 'We welcome new believers into a warm, purposeful community — a place of belonging, family, and genuine connection.',                   color: '#22b573', accent: '#22b573' },
  { number: '03', word: 'Feed',  verb: 'Feed them the Word',  description: 'We nourish every believer with rich, practical, Spirit-empowered Bible teaching that creates lasting transformation.',                  color: '#f7931e', accent: '#f7931e' },
  { number: '04', word: 'Field', verb: 'Field them for service', description: 'We equip and deploy purpose-driven believers to transform their cities, nations, and every sphere of influence.',                color: '#153093', accent: '#4ea8f9' },
]

const GALLERY = [
  '/images/events/worship-1.jpg',
  '/images/gallery/gallery-5.jpeg',
  '/images/gallery/gallery-13.jpg',
  '/images/events/service-3.jpg',
  '/images/gallery/gallery-7.jpeg',
]

// Parallax depths for each photo
const PHOTO_DEPTHS = [0.04, 0.07, 0.03, 0.06, 0.05]

function StepCard({ step, index, visible }: { step: typeof STEPS[0], index: number, visible: boolean }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: 8,
    scale: 1.02,
    speed: 350,
    glare: true,
  })

  return (
    <div
      ref={ref}
      {...handlers}
      className="flex flex-col items-center text-center px-6 pt-4 pb-8 rounded-2xl cursor-default"
      style={{
        ...cardStyle,
        opacity: visible ? 1 : 0,
        transform: `${cardStyle.transform || ''} ${visible ? '' : 'translateY(50px)'}`.trim(),
        transition: [
          cardStyle.transition,
          `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 120 + 200}ms`,
        ].join(', '),
        background: isHovered ? `${step.color}05` : 'transparent',
        borderRadius: '1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glare */}
      <div style={{ ...glareStyle, borderRadius: '1rem' }} />

      {/* Step node */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-black text-xs text-white relative z-10 mb-6 shrink-0"
        style={{
          background: step.color,
          boxShadow: isHovered
            ? `0 0 0 6px white, 0 0 0 7px ${step.color}50, 0 4px 20px ${step.color}40`
            : `0 0 0 6px white, 0 0 0 7px ${step.color}30`,
          transform: isHovered ? 'translateZ(20px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Giant outline word */}
      <div
        className="font-heading font-black leading-none mb-4 select-none"
        style={{
          fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
          WebkitTextStroke: `2px ${step.color}`,
          color: isHovered ? step.color : 'transparent',
          letterSpacing: '-0.04em',
          transform: isHovered ? 'translateZ(12px) scale(1.05)' : 'translateZ(0) scale(1)',
          transition: 'color 0.3s ease, transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {step.word}
      </div>

      {/* Verb */}
      <p
        className="font-heading font-bold text-xs tracking-widest uppercase mb-3"
        style={{
          color: step.accent,
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        {step.verb}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
        {step.description}
      </p>
    </div>
  )
}

export function WhoWeAre() {
  const [trackVisible, setTrackVisible] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const collageRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTrackVisible(true) }, { threshold: 0.1 })
    if (trackRef.current) obs.observe(trackRef.current)
    return () => obs.disconnect()
  }, [])

  // Mouse parallax on the collage
  useEffect(() => {
    const el = collageRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      smoothMouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      setMouse(prev => ({
        x: prev.x + (smoothMouse.current.x - prev.x) * 0.06,
        y: prev.y + (smoothMouse.current.y - prev.y) * 0.06,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const POSITIONS = [
    { top: '0%',  left: '0%',  w: '55%', h: '65%', rotate: '-2deg',  zIndex: 1 },
    { top: '5%',  left: '48%', w: '52%', h: '58%', rotate: '2.5deg', zIndex: 2 },
    { top: '55%', left: '4%',  w: '42%', h: '48%', rotate: '1.5deg', zIndex: 3 },
    { top: '52%', left: '40%', w: '38%', h: '46%', rotate: '-1deg',  zIndex: 4 },
    { top: '30%', left: '20%', w: '32%', h: '38%', rotate: '-3deg',  zIndex: 5 },
  ]

  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-ttc">

        {/* Intro block */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-28">

          {/* Left: text */}
          <AnimatedSection variant="slideLeft">
            <span className="section-label">Who We Are</span>
            <h2
              className="font-heading font-black leading-tight mt-3 mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--dark)', letterSpacing: '-0.03em' }}
            >
              A Ministry Built for{' '}
              <span className="text-gradient-blue">Your Transformation</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              The Transformation Camp is a love-centred, Word-compliant, Spirit-empowered ministry
              operating under Binah Church International. We exist to help you walk in purpose and
              apply kingdom principles for your advancement.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Our mandate is clear: to transform{' '}
              <strong style={{ color: 'var(--egyptian-blue)' }}>1 million Ministry Leaders</strong>
              years through campus meetings online and across Nigeria, Canada, the US, the UK/EU,
              and beyond.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 font-heading font-bold text-sm tracking-wide group transition-all duration-200 hover:gap-3"
              style={{ color: 'var(--egyptian-blue)' }}
            >
              Our Full Story
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>

          {/* Right: parallax photo collage */}
          <AnimatedSection variant="slideRight">
            <div ref={collageRef} className="relative h-72 md:h-80">
              {GALLERY.map((src, i) => {
                const pos = POSITIONS[i]
                const depth = PHOTO_DEPTHS[i]
                const px = (mouse.x - 0.5) * depth * -80
                const py = (mouse.y - 0.5) * depth * -60
                return (
                  <div
                    key={src}
                    className="absolute rounded-2xl overflow-hidden shadow-lg group/photo"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: pos.w,
                      height: pos.h,
                      transform: `rotate(${pos.rotate}) translate(${px}px, ${py}px)`,
                      zIndex: pos.zIndex,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      transition: 'transform 0.08s linear',
                      willChange: 'transform',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`TTC moment ${i + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover/photo:scale-110"
                      sizes="200px"
                    />
                    {/* Tint overlay fades out on hover */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300 group-hover/photo:opacity-0"
                      style={{ background: 'rgba(21,48,147,0.08)' }}
                    />
                  </div>
                )
              })}

              {/* Badge */}
              <div
                className="absolute bottom-2 right-2 z-10 px-4 py-2 rounded-full font-heading font-black text-white text-sm shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ background: '#153093' }}
              >
                100+ Photos
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Strategy track */}
        <div ref={trackRef}>
          {/* Label */}
          <div
            className="text-center mb-12"
            style={{
              opacity: trackVisible ? 1 : 0,
              transform: trackVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
            }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-heading font-bold tracking-[0.3em] uppercase px-5 py-2 rounded-full"
              style={{ background: 'rgba(21,48,147,0.07)', color: '#153093', border: '1px solid rgba(21,48,147,0.15)' }}
            >
              Our Strategy
            </span>
          </div>

          {/* Desktop: 4-column track */}
          <div className="hidden md:grid md:grid-cols-4 relative">
            {/* Horizontal connector */}
            <div
              className="absolute top-[4.5rem] left-0 right-0 h-px pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent 5%, rgba(21,48,147,0.15) 15%, rgba(21,48,147,0.15) 85%, transparent 95%)',
                transform: trackVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left center',
                transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            />
            {STEPS.map((step, i) => (
              <StepCard key={step.word} step={step} index={i} visible={trackVisible} />
            ))}
          </div>

          {/* Mobile: vertical strips */}
          <div className="md:hidden space-y-0">
            {STEPS.map((step, i) => (
              <div
                key={step.word}
                className="relative flex gap-5 py-7"
                style={{
                  borderBottom: i < STEPS.length - 1 ? '1px solid rgba(21,48,147,0.08)' : 'none',
                  opacity: trackVisible ? 1 : 0,
                  transform: trackVisible ? 'translateX(0)' : `translateX(${i % 2 === 0 ? '-40px' : '40px'})`,
                  transition: `opacity 0.8s ease ${i * 100 + 150}ms, transform 0.8s ease ${i * 100 + 150}ms`,
                }}
              >
                <div className="flex flex-col items-center shrink-0" style={{ width: '2.5rem' }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-black text-xs text-white shrink-0"
                    style={{ background: step.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 w-px mt-3" style={{ background: `${step.color}25` }} />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div
                    className="font-heading font-black leading-none mb-3"
                    style={{ fontSize: 'clamp(3rem, 12vw, 4rem)', WebkitTextStroke: `2px ${step.color}`, color: 'transparent', letterSpacing: '-0.04em' }}
                  >
                    {step.word}
                  </div>
                  <p className="font-heading font-bold text-xs tracking-widest uppercase mb-2" style={{ color: step.accent }}>
                    {step.verb}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .text-gradient-blue {
          background: linear-gradient(135deg, #153093, #4ea8f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  )
}
