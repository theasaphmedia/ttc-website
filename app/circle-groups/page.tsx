'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Users, Heart, BookOpen, Shield, Zap } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { CircleGroupForm } from '@/components/forms/CircleGroupForm'
import { useTilt } from '@/hooks/useTilt'

const HOW_IT_WORKS = [
  { step: '01', icon: Users,    title: 'Discover', desc: 'Find or start a circle group in your area — groups of 5 to 20 people.',                  color: '#153093' },
  { step: '02', icon: Heart,    title: 'Connect',  desc: 'Meet regularly with your circle for fellowship, prayer, and real conversation.',          color: '#f7931e' },
  { step: '03', icon: BookOpen, title: 'Grow',     desc: 'Study the Word together, hold each other accountable, and deepen your faith.',            color: '#22b573' },
  { step: '04', icon: Zap,      title: 'Impact',   desc: 'Go beyond your circle — serve your community and transform your world.',                  color: '#4ea8f9' },
]

const BENEFITS = [
  { icon: Shield,   label: 'Accountability', desc: 'People who genuinely walk with you',           color: '#153093' },
  { icon: Heart,    label: 'Fellowship',     desc: 'Authentic Christian community',                 color: '#f7931e' },
  { icon: Users,    label: 'Prayer',         desc: 'Consistent, fervent intercession',              color: '#22b573' },
  { icon: BookOpen, label: 'Growth',         desc: 'Bible-centred discussions that transform',      color: '#4ea8f9' },
  { icon: Zap,      label: 'Service',        desc: 'Finding your place in the body',               color: '#153093' },
]

function StepCard({ item, index }: { item: typeof HOW_IT_WORKS[0]; index: number }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 10, scale: 1.03, speed: 350, glare: true })
  const Icon = item.icon
  return (
    <div
      ref={ref}
      {...handlers}
      className="relative p-7 rounded-3xl flex flex-col overflow-hidden cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'white' : 'var(--off-white)',
        border: `1px solid ${isHovered ? item.color + '35' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? `0 16px 48px ${item.color}14` : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10"
          style={{
            background: `${item.color}18`,
            color: item.color,
            transform: isHovered ? 'translateZ(14px) scale(1.1)' : 'translateZ(0) scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
            boxShadow: isHovered ? `0 4px 16px ${item.color}30` : 'none',
          }}
        >
          <Icon size={20} />
        </div>
        <span
          className="font-heading font-black text-4xl select-none leading-none"
          style={{
            WebkitTextStroke: `1.5px ${item.color}`,
            color: isHovered ? item.color : 'transparent',
            transition: 'color 0.3s ease',
            letterSpacing: '-0.04em',
          }}
        >
          {item.step}
        </span>
      </div>
      <h3
        className="font-heading font-bold text-lg mb-2 relative z-10"
        style={{
          color: isHovered ? item.color : 'var(--dark)',
          transition: 'color 0.3s ease',
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
        }}
      >
        {item.title}
      </h3>
      <div className="h-px mb-3 relative z-10" style={{ background: item.color, width: isHovered ? '2.5rem' : '1.5rem', opacity: 0.5, transition: 'width 0.4s ease' }} />
      <p className="text-sm leading-relaxed relative z-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>{item.desc}</p>
    </div>
  )
}

function BenefitCard({ item }: { item: typeof BENEFITS[0] }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 9, scale: 1.03, speed: 350, glare: true })
  const Icon = item.icon
  return (
    <div
      ref={ref}
      {...handlers}
      className="flex flex-col items-center text-center p-6 rounded-2xl overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? `${item.color}08` : 'var(--off-white)',
        border: `1px solid ${isHovered ? item.color + '30' : 'var(--gray-200)'}`,
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 relative z-10"
        style={{
          background: `${item.color}18`,
          color: item.color,
          transform: isHovered ? 'translateZ(16px) scale(1.12)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={20} />
      </div>
      <p className="font-heading font-bold text-sm mb-1 relative z-10" style={{ color: 'var(--dark)' }}>{item.label}</p>
      <p className="text-xs leading-relaxed relative z-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>{item.desc}</p>
    </div>
  )
}

export default function CircleGroupsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}>
        <FloatingOrbs />
        <BrandCurves color="#4ea8f9" opacity={0.08} position="top-right" animated />
        <BrandCurves color="#f7931e" opacity={0.06} position="bottom-left" animated />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="container-ttc relative z-10">
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Circle Groups</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase" style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
                <Users size={12} /> Community
              </div>
              <h1 className="font-heading font-black text-white mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>Circle Groups</h1>
              <p className="font-accent mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#f7931e' }}>Small circles. Big transformation.</p>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}>
                An initiative to foster fellowship amongst small groups of 5–20 people. Intimate. Intentional. Community-driven.
              </p>
              <a href="#join-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-white text-sm touch-pulse-orange"
                style={{ background: '#f7931e', boxShadow: '0 4px 20px rgba(247,147,30,0.35)' }}>
                Join a Circle Group →
              </a>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: '🤝', label: 'Accountability',  sub: 'Grow together',         color: '#153093' },
                { icon: '🙏', label: 'Prayer',          sub: 'Intercede for each other', color: '#f7931e' },
                { icon: '📈', label: 'Growth',          sub: 'Deepen your faith',      color: '#22b573' },
                { icon: '❤️', label: 'Fellowship',      sub: '5–20 people per group',  color: '#4ea8f9' },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-2xl flex flex-col gap-2 touch-card-glow"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                  <span className="text-2xl touch-float-sm">{item.icon}</span>
                  <p className="font-heading font-black text-white text-sm">{item.label}</p>
                  <p className="text-xs font-heading" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* How it works */}
      <section className="section-pad bg-white">
        <div className="container-ttc">
          <div className="text-center mb-14">
            <span className="section-label">The Process</span>
            <h2 className="section-title">How It <span className="text-gradient-blue">Works</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {HOW_IT_WORKS.map((item, i) => <StepCard key={item.step} item={item} index={i} />)}
          </div>

          {/* Benefits */}
          <div className="text-center mb-12">
            <span className="section-label">Why Join</span>
            <h2 className="section-title">The <span className="text-gradient-blue">Benefits</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BENEFITS.map(item => <BenefitCard key={item.label} item={item} />)}
          </div>
        </div>
      </section>

      {/* Join form */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'var(--off-white)' }}>
        <div className="container-ttc max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <span className="section-label">Get Started</span>
            <h2 className="section-title">Join a <span className="text-gradient-blue">Circle Group</span></h2>
            <p className="mt-3 text-base" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Fill out the form and we will connect you with a circle near you — or help you start one.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
            <CircleGroupForm />
          </div>
        </div>
      </section>
    </>
  )
}
