'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin, Globe, ArrowRight } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { TICForm } from '@/components/forms/TICForm'
import { useTilt } from '@/hooks/useTilt'
import { useMagnetic } from '@/hooks/useMagnetic'
import { AnimatedSection } from '@/components/ui/AnimatedSection'



const STATS = [
  { value: '1M+',    label: 'Believers to Transform', color: '#153093' },
  { value: '3 Yrs',  label: 'Mandate Timeline',       color: '#f7931e' },
  { value: '5+',     label: 'Cities Active',           color: '#22b573' },
  { value: 'Global', label: 'Reach & Vision',          color: '#4ea8f9' },
]

// Hero stat card — dark themed, with tilt + entrance
function HeroStatCard({ s, index, visible }: { s: typeof STATS[0]; index: number; visible: boolean }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: 10, scale: 1.05, speed: 350, glare: true,
  })
  return (
    <div
      ref={ref}
      {...handlers}
      className="p-6 rounded-2xl text-center overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'rgba(255,255,255,0.12)' : `${s.color}18`,
        border: `1px solid ${isHovered ? s.color + '60' : s.color + '30'}`,
        boxShadow: isHovered ? `0 12px 40px ${s.color}35` : 'none',
        opacity: visible ? 1 : 0,
        transitionProperty: 'opacity, transform, background, border-color, box-shadow',
        transitionDuration: '0.7s, 0.7s, 0.3s, 0.3s, 0.3s',
        transitionDelay: `${index * 120 + 200}ms, ${index * 120 + 200}ms, 0ms, 0ms, 0ms`,
        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        transform: visible
          ? (cardStyle.transform || 'none')
          : `${cardStyle.transform ? cardStyle.transform + ' ' : ''}translateY(24px)`,
      }}
    >
      <div style={glareStyle} />
      <p
        className="font-heading font-black text-3xl mb-1 relative z-10"
        style={{
          color: 'white',
          transform: isHovered ? 'translateZ(14px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          textShadow: isHovered ? `0 0 28px ${s.color}` : `0 0 12px ${s.color}60`,
        }}
      >
        {s.value}
      </p>
      <p
        className="text-xs font-heading font-medium relative z-10"
        style={{ color: isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)', transition: 'color 0.3s ease' }}
      >
        {s.label}
      </p>
    </div>
  )
}

// Body stat card — light themed
function StatCard({ s }: { s: typeof STATS[0] }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 10, scale: 1.04, speed: 350, glare: true })
  return (
    <div
      ref={ref}
      {...handlers}
      className="p-6 rounded-2xl text-center overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'white' : `${s.color}0e`,
        border: `1px solid ${isHovered ? s.color + '40' : s.color + '25'}`,
        boxShadow: isHovered ? `0 12px 40px ${s.color}20` : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <p
        className="font-heading font-black text-3xl mb-1 relative z-10"
        style={{
          color: s.color,
          transform: isHovered ? 'translateZ(14px) scale(1.08)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {s.value}
      </p>
      <p className="text-xs font-heading font-medium relative z-10" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
    </div>
  )
}



export default function TICPage() {
  const { ref: btnRef, style: magStyle, handlers: magHandlers } = useMagnetic({ strength: 0.4 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-28 md:pt-52 md:pb-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a1628 0%, #153093 55%, #0f2270 100%)' }}
      >
        <FloatingOrbs />
        <BrandCurves color="#4ea8f9" opacity={0.09} position="top-right" animated />
        <BrandCurves color="#f7931e" opacity={0.06} position="bottom-left" animated />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container-ttc relative z-10">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 mb-8 text-sm"
            style={{
              color: 'rgba(255,255,255,0.5)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.5s ease 0.05s',
            }}
          >
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">TIC</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT — animated reveal */}
            <div>
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
                style={{
                  background: 'rgba(247,147,30,0.2)',
                  color: '#f7931e',
                  border: '1px solid rgba(247,147,30,0.3)',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'all 0.6s ease 0.1s',
                }}
              >
                <Globe size={12} /> Transformation In Your City
              </div>

              {/* Headline */}
              <h1
                className="font-heading font-black text-white mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
                }}
              >
                Transformation{' '}
                <span style={{ color: '#4ea8f9' }}>In Your City</span>
              </h1>

              {/* Accent */}
              <p
                className="font-accent mb-6"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  color: '#f7931e',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s',
                }}
              >
                The mandate is clear.
              </p>

              {/* Body */}
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontFamily: 'var(--font-open-sans)',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 0.7s ease 0.45s',
                }}
              >
                1 million Ministry Leaders. It starts in your city. Are you ready to be
                the catalyst for transformation where you are?
              </p>

              {/* CTA */}
              <div
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.6s ease 0.6s',
                }}
              >
                <span style={magStyle} {...magHandlers}>
                  <a
                    ref={btnRef as React.Ref<HTMLAnchorElement>}
                    href="#tic-form"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm touch-pulse-orange"
                    style={{ background: '#f7931e', boxShadow: '0 4px 28px rgba(247,147,30,0.45)' }}
                  >
                    Apply Now <ArrowRight size={16} />
                  </a>
                </span>
              </div>
            </div>

            {/* RIGHT — tiltable stat cards with staggered entrance */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <HeroStatCard key={s.label} s={s} index={i} visible={loaded} />
              ))}
            </div>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="wave" height={80} />
      </section>

      {/* Vision + Stats */}
      <section className="section-pad bg-white overflow-hidden">
        <div className="container-ttc">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <AnimatedSection variant="slideLeft">
              <span className="section-label">The Vision</span>
              <h2 className="section-title">
                TTC Is Not a <span className="text-gradient-blue">Building</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                <p>The Transformation Camp is any comfortable space where God&apos;s children gather to be transformed by His Word. We are taking this mandate to every city, every nation.</p>
                <p>Whether it is a living room, a university campus, a community centre, or a rented hall — TTC can happen anywhere people are hungry for transformation.</p>
                <p><strong style={{ color: 'var(--dark)' }}>You can be the one who starts it in your city.</strong></p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="slideRight">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(s => <StatCard key={s.label} s={s} />)}
              </div>
            </AnimatedSection>
          </div>

          {/* Global mandate strip */}
          <div className="mb-20">
            <AnimatedSection variant="fadeUp">
              <div
                className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)', border: '1px solid rgba(21,48,147,0.08)' }}
              >
                {/* Decorative orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20 -translate-y-1/3 translate-x-1/3" style={{ background: '#4ea8f9', filter: 'blur(60px)' }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none opacity-20 translate-y-1/3 -translate-x-1/3" style={{ background: '#f7931e', filter: 'blur(50px)' }} />

                <Globe size={40} strokeWidth={1.4} className="mx-auto mb-5 relative z-10" style={{ color: '#153093' }} />
                <h3 className="font-heading font-black text-2xl md:text-3xl mb-3 relative z-10" style={{ color: 'var(--dark)', letterSpacing: '-0.02em' }}>
                  Every City. Every Nation.
                </h3>
                <p className="text-base leading-relaxed max-w-lg mx-auto mb-6 relative z-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                  TTC is not limited by geography. The mandate is wherever there are people hungry for transformation. If you feel the call — your city is already on the list.
                </p>
                <a
                  href="#tic-form"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-heading font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-10"
                  style={{ background: '#153093', boxShadow: '0 4px 20px rgba(21,48,147,0.3)' }}
                >
                  Apply for Your City
                  <ArrowRight size={15} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TIC Form */}
      <section
        id="tic-form"
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #153093 100%)' }}
      >
        <FloatingOrbs orbs={[
          { size: 350, x: '85%', y: '15%', color: '#4ea8f9', opacity: 0.08, depth: 0.05 },
          { size: 250, x: '10%', y: '75%', color: '#f7931e', opacity: 0.07, depth: 0.07 },
        ]} />
        <BrandCurves color="#4ea8f9" opacity={0.07} position="top-right" animated />
        <div className="container-ttc relative z-10 max-w-2xl mx-auto">
          <AnimatedSection variant="fadeUp" className="text-center mb-10">
            <h2
              className="font-heading font-black text-white text-3xl md:text-4xl mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              Bring TTC to <span style={{ color: '#f7931e' }}>Your City</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-open-sans)' }}>
              Fill out the form below. We will reach out to discuss next steps.
            </p>
          </AnimatedSection>
          <div className="bg-white rounded-3xl p-8 md:p-10">
            <TICForm />
          </div>
        </div>
      </section>
    </>
  )
}
