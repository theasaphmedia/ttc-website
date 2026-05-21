'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Target, Eye, Zap } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { useTilt } from '@/hooks/useTilt'

const CARDS = [
  {
    icon: Target,
    label: 'Mission',
    color: '#4ea8f9',
    heading: 'What We Do',
    body: 'To deliver teachings that are Love-centered, Word-compliant, Spirit-empowered — to help you walk in purpose and apply kingdom principles for your advancement.',
  },
  {
    icon: Eye,
    label: 'Vision',
    color: '#f7931e',
    heading: 'Where We\'re Going',
    body: 'To raise a people who are saved, purpose-driven, growing in devotion, and living a life of fulfillment.',
  },
  {
    icon: Zap,
    label: 'Strategy',
    color: '#22b573',
    heading: 'How We Get There',
    body: 'Find the unsaved → Fold them in → Feed them the Word → Field them for service. Every step intentional. Every life transformed.',
  },
]

function MVCard({ card }: { card: typeof CARDS[0] }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 8, scale: 1.02, speed: 400, glare: true })
  const Icon = card.icon
  return (
    <div
      ref={ref}
      {...handlers}
      className="relative p-8 rounded-3xl flex flex-col overflow-hidden cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isHovered ? card.color + '40' : 'rgba(255,255,255,0.1)'}`,
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative z-10"
        style={{
          background: `${card.color}20`,
          color: card.color,
          transform: isHovered ? 'translateZ(18px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
          boxShadow: isHovered ? `0 4px 20px ${card.color}40` : 'none',
        }}
      >
        <Icon size={22} />
      </div>
      <span
        className="text-[10px] font-heading font-black tracking-[0.3em] uppercase mb-2 relative z-10"
        style={{ color: card.color, opacity: 0.8 }}
      >
        {card.label}
      </span>
      <h3
        className="font-heading font-bold text-xl text-white mb-3 relative z-10"
        style={{
          transform: isHovered ? 'translateZ(10px) translateX(4px)' : 'translateZ(0)',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {card.heading}
      </h3>
      <div className="w-8 h-px mb-4 relative z-10" style={{ background: `${card.color}60`, width: isHovered ? '3rem' : '2rem', transition: 'width 0.4s ease' }} />
      <p
        className="text-sm leading-relaxed relative z-10"
        style={{ color: isHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-open-sans)', transition: 'color 0.3s ease' }}
      >
        {card.body}
      </p>
      <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none" style={{ background: card.color, opacity: isHovered ? 0.15 : 0.07, transition: 'opacity 0.4s ease' }} />
    </div>
  )
}

export function MissionVisionBlock() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const smoothSpot = useRef({ x: 50, y: 50 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = sectionRef.current
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
      setSpot(p => ({ x: p.x + (smoothSpot.current.x - p.x) * 0.07, y: p.y + (smoothSpot.current.y - p.y) * 0.07 }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { el.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <section className="relative overflow-hidden" ref={sectionRef}>
      <WaveDivider fillColor="#153093" variant="tilt" height={60} />
      <div className="py-20 md:py-28 relative" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #153093 60%, #0f2270 100%)' }}>
        {/* Mouse following spotlight */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600, height: 600, borderRadius: '50%',
            left: `${spot.x}%`, top: `${spot.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(78,168,249,0.1) 0%, rgba(247,147,30,0.05) 40%, transparent 70%)',
            transition: 'left 0.05s linear, top 0.05s linear',
            willChange: 'left, top',
          }}
        />
        {/* Animated background blobs */}
        <div className="absolute top-1/2 right-0 w-96 h-96 opacity-10 translate-x-1/3 -translate-y-1/2 pointer-events-none animate-blob-mv"
          style={{ background: '#4ea8f9', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
        <div className="container-ttc relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-heading font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
              Our Foundation
            </span>
            <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
              Mission. Vision.{' '}
              <span className="font-accent" style={{ color: '#f7931e', fontSize: '1.1em', display: 'block' }}>Strategy.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CARDS.map(card => <MVCard key={card.label} card={card} />)}
          </div>
        </div>
      </div>
      <WaveDivider fillColor="#ffffff" variant="organic" flip height={60} />
      <style>{`
        @keyframes blobMV {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; transform: translate(33%, -50%) scale(1.06); }
        }
        .animate-blob-mv { animation: blobMV 10s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
