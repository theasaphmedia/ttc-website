'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, MapPin, Wifi, ChevronRight } from 'lucide-react'
import { getNextServiceDates, formatServiceDate, getCountdown } from '@/lib/schedule'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { useTilt } from '@/hooks/useTilt'
import { useMagnetic } from '@/hooks/useMagnetic'

function SchedulePreviewCard({ item }: { item: { label: string; detail: string; color: string } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-5 rounded-2xl cursor-default active:scale-[0.97]"
      style={{
        background: hovered ? `${item.color}22` : 'rgba(255,255,255,0.07)',
        border: `1px solid ${hovered ? item.color + '70' : 'rgba(255,255,255,0.12)'}`,
        transform: hovered ? 'translateX(8px)' : 'translateX(0)',
        boxShadow: hovered ? `0 8px 28px ${item.color}30` : 'none',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <div
        className="w-2 rounded-full shrink-0"
        style={{
          background: item.color,
          height: hovered ? '48px' : '40px',
          transition: 'height 0.3s ease',
        }}
      />
      <div>
        <p
          className="font-heading font-black text-white text-base leading-none mb-1"
          style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
        >
          {item.label}
        </p>
        <p className="text-sm font-heading" style={{ color: item.color }}>{item.detail}</p>
      </div>
    </div>
  )
}

const PROGRAM_NOTES = [
  { icon: Calendar, title: '1st Friday of Every Month', detail: '12:00 PM (Noon)', sub: 'Monthly Transformation Service',  color: '#153093' },
  { icon: Calendar, title: '3rd Friday of Every Month', detail: '12:00 PM (Noon)', sub: 'Monthly Transformation Service',  color: '#22b573' },
  { icon: Calendar, title: 'Quarterly Ingathering',     detail: 'Once every quarter', sub: 'All ministry groups assemble', color: '#f7931e' },
]

function NoteCard({ item }: { item: typeof PROGRAM_NOTES[0] }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 9, scale: 1.02, speed: 350, glare: true })
  const Icon = item.icon
  return (
    <div
      ref={ref}
      {...handlers}
      className="flex gap-4 p-7 rounded-3xl overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'white' : 'var(--off-white)',
        border: `1px solid ${isHovered ? item.color + '35' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? `0 16px 48px ${item.color}14` : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
        style={{
          background: `${item.color}15`,
          color: item.color,
          transform: isHovered ? 'translateZ(14px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={22} />
      </div>
      <div className="relative z-10">
        <p className="font-heading font-bold text-base mb-1" style={{ color: 'var(--dark)' }}>{item.title}</p>
        <p className="font-heading font-black text-xl mb-0.5" style={{ color: item.color }}>{item.detail}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>{item.sub}</p>
      </div>
    </div>
  )
}

function UpcomingRow({ svc, isNext, index }: { svc: ReturnType<typeof getNextServiceDates>[0]; isNext: boolean; index: number }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 4, scale: 1.01, speed: 400, glare: isNext })
  const countdown = getCountdown(svc.date)

  return (
    <div
      ref={ref}
      {...handlers}
      className="flex items-center gap-5 p-6 rounded-2xl overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isNext ? '#153093' : (isHovered ? 'white' : 'var(--off-white)'),
        border: `1px solid ${isNext ? 'transparent' : isHovered ? 'rgba(21,48,147,0.2)' : 'var(--gray-200)'}`,
        boxShadow: isNext
          ? isHovered ? '0 16px 48px rgba(21,48,147,0.4)' : '0 8px 32px rgba(21,48,147,0.25)'
          : isHovered ? '0 12px 40px rgba(0,0,0,0.08)' : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div
        className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 font-heading font-black leading-none relative z-10"
        style={{
          background: isNext ? 'rgba(255,255,255,0.15)' : `rgba(21,48,147,0.1)`,
          color: isNext ? '#fff' : '#153093',
          transform: isHovered ? 'translateZ(16px) scale(1.05)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <span className="text-xl">{svc.date.getDate()}</span>
        <span className="text-[10px] uppercase tracking-wide opacity-70">{svc.date.toLocaleDateString('en', { month: 'short' })}</span>
      </div>
      <div className="flex-1 min-w-0 relative z-10">
        <p
          className="font-heading font-bold text-base mb-0.5 truncate"
          style={{
            color: isNext ? '#fff' : 'var(--dark)',
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {svc.label}
        </p>
        <p className="text-sm flex items-center gap-1.5" style={{ color: isNext ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          <Clock size={13} />
          {formatServiceDate(svc.date)} · 12:00 PM
        </p>
      </div>
      <div
        className="shrink-0 px-3 py-1.5 rounded-full text-xs font-heading font-bold relative z-10 transition-all duration-300"
        style={{
          background: isNext ? 'rgba(247,147,30,0.25)' : `rgba(21,48,147,0.08)`,
          color: isNext ? '#f7931e' : '#153093',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {countdown}
      </div>
    </div>
  )
}

function MagneticCTA({ href, style, className, children, external }: { href: string; style?: React.CSSProperties; className?: string; children: React.ReactNode; external?: boolean }) {
  const { ref, style: magStyle, handlers } = useMagnetic({ strength: 0.4 })
  return (
    <span style={magStyle} {...handlers}>
      {external ? (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>{children}</a>
      ) : (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={className} style={style}>{children}</Link>
      )}
    </span>
  )
}

export default function ProgramsPage() {
  const upcomingDates = getNextServiceDates(6)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}>
        <FloatingOrbs />
        <BrandCurves color="#4ea8f9" opacity={0.08} position="top-right" animated />
        <BrandCurves color="#f7931e" opacity={0.06} position="bottom-left" animated />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="container-ttc relative z-10">
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Programs</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT — headline */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase" style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Schedule
              </div>
              <h1 className="font-heading font-black text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>Come as You Are.</h1>
              <p className="font-accent mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#f7931e' }}>Leave Transformed.</p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}>
                TTC gathers every 1st and 3rd Friday of the month for Spirit-empowered, Word-based teaching. Online and in-person.
              </p>
            </div>
            {/* RIGHT — schedule preview */}
            <div className="hidden lg:flex flex-col gap-4">
              {[
                { label: '1st Friday', detail: 'Every Month — 12:00 PM', color: '#4ea8f9' },
                { label: '3rd Friday', detail: 'Every Month — 12:00 PM', color: '#f7931e' },
                { label: 'Quarterly Ingathering', detail: 'All Ministry Groups Assemble', color: '#22b573' },
              ].map((item) => (
                <SchedulePreviewCard key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* Schedule */}
      <section className="section-pad bg-white">
        <div className="container-ttc">
          <div className="text-center mb-14">
            <span className="section-label">Regular Services</span>
            <h2 className="section-title">Our <span className="text-gradient-blue">Schedule</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {PROGRAM_NOTES.map(item => <NoteCard key={item.title} item={item} />)}
          </div>

          {/* Location strips */}
          <div className="grid sm:grid-cols-2 gap-4 mb-20">
            {/* In-Person */}
            <a
              href="https://maps.google.com/?q=38A+Ikota+Villa,+Ikota,+Lagos,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              style={{ background: 'rgba(21,48,147,0.04)', border: '1px solid rgba(21,48,147,0.12)' }}
            >
              <MapPin size={20} className="shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#153093' }} />
              <div>
                <p className="font-heading font-bold text-sm mb-1" style={{ color: '#153093' }}>In-Person</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                  38A, Ikota Villa, Ikota<br />Lagos, Nigeria
                </p>
                <p className="text-xs mt-2 font-heading font-semibold" style={{ color: '#153093' }}>
                  Get directions →
                </p>
              </div>
            </a>

            {/* Live Online */}
            <a
              href="https://www.youtube.com/@jointtc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              style={{ background: 'rgba(34,181,115,0.05)', border: '1px solid rgba(34,181,115,0.18)' }}
            >
              <Wifi size={20} className="shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#22b573' }} />
              <div>
                <p className="font-heading font-bold text-sm mb-1" style={{ color: '#22b573' }}>Live Online</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                  Stream link shared before each service.
                </p>
                <p className="text-xs mt-2 font-heading font-semibold" style={{ color: '#22b573' }}>
                  Subscribe on YouTube @jointtc →
                </p>
              </div>
            </a>
          </div>

          {/* Upcoming dates */}
          <div className="text-center mb-10">
            <span className="section-label">Upcoming</span>
            <h2 className="section-title">Next <span className="text-gradient-blue">Services</span></h2>
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            {upcomingDates.map((svc, i) => (
              <UpcomingRow key={svc.date.toISOString()} svc={svc} isNext={i === 0} index={i} />
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            Watch this space for special programs and announcements.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 100%)' }}>
        <FloatingOrbs orbs={[
          { size: 300, x: '80%', y: '20%', color: '#4ea8f9', opacity: 0.09, depth: 0.05 },
          { size: 200, x: '15%', y: '70%', color: '#f7931e', opacity: 0.07, depth: 0.07 },
        ]} />
        <div className="container-ttc text-center relative z-10">
          <h2 className="font-heading font-black text-white text-3xl md:text-4xl mb-4">
            Ready to Experience <span className="font-accent" style={{ color: '#f7931e' }}>Transformation</span>?
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-open-sans)' }}>
            Subscribe on YouTube so you never miss a service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticCTA
              href="https://www.youtube.com/@jointtc"
              external
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 touch-pulse-orange"
              style={{ background: '#f7931e', boxShadow: '0 4px 24px rgba(247,147,30,0.4)' }}
            >
              Subscribe on YouTube <ArrowRight size={16} />
            </MagneticCTA>
            <MagneticCTA
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm border border-white/20 transition-all duration-300 hover:bg-white/10"
            >
              Get Directions
            </MagneticCTA>
          </div>
        </div>
      </section>
    </>
  )
}
