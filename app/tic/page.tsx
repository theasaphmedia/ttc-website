'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin, Globe, Users, ArrowRight } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { TICForm } from '@/components/forms/TICForm'
import { useTilt } from '@/hooks/useTilt'
import { useMagnetic } from '@/hooks/useMagnetic'

const CITIES = [
  { name: 'Lagos',         country: 'Nigeria', flag: '🇳🇬' },
  { name: 'Abuja',         country: 'Nigeria', flag: '🇳🇬' },
  { name: 'Port Harcourt', country: 'Nigeria', flag: '🇳🇬' },
  { name: 'Toronto',       country: 'Canada',  flag: '🇨🇦' },
  { name: 'London',        country: 'UK',      flag: '🇬🇧' },
]

const STATS = [
  { value: '1M+',    label: 'Believers to Transform', color: '#153093' },
  { value: '3 Yrs',  label: 'Mandate Timeline',       color: '#f7931e' },
  { value: '5+',     label: 'Cities Active',           color: '#22b573' },
  { value: 'Global', label: 'Reach & Vision',          color: '#4ea8f9' },
]

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

function CityCard({ city }: { city: typeof CITIES[0] }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 8, scale: 1.04, speed: 300, glare: true })
  return (
    <div
      ref={ref}
      {...handlers}
      className="flex items-center gap-3 px-5 py-3 rounded-full overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'white' : 'var(--off-white)',
        border: `1px solid ${isHovered ? 'rgba(21,48,147,0.25)' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? '0 8px 28px rgba(21,48,147,0.12)' : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <span className="text-2xl relative z-10">{city.flag}</span>
      <div className="relative z-10">
        <p className="font-heading font-bold text-sm" style={{ color: 'var(--dark)' }}>{city.name}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{city.country}</p>
      </div>
      <MapPin
        size={14}
        style={{
          color: '#153093',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
        }}
      />
    </div>
  )
}

export default function TICPage() {
  const { ref: btnRef, style: magStyle, handlers: magHandlers } = useMagnetic({ strength: 0.4 })

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-28 md:pt-52 md:pb-36 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #153093 55%, #0f2270 100%)' }}>
        <FloatingOrbs />
        <BrandCurves color="#4ea8f9" opacity={0.09} position="top-right" animated />
        <BrandCurves color="#f7931e" opacity={0.06} position="bottom-left" animated />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="container-ttc relative z-10">
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">TIC</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase" style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
            <Globe size={12} /> Transformation In Your City
          </div>
          <h1 className="font-heading font-black text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Transformation <span style={{ color: '#4ea8f9' }}>In Your City</span>
          </h1>
          <p className="font-accent mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#f7931e' }}>The mandate is clear.</p>
          <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}>
            1 million believers in 3 years. It starts in your city. Are you ready to be the catalyst for transformation where you are?
          </p>
          <div className="mt-8">
            <span style={magStyle} {...magHandlers}>
              <a
                ref={btnRef as React.Ref<HTMLAnchorElement>}
                href="#tic-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ background: '#f7931e', boxShadow: '0 4px 28px rgba(247,147,30,0.45)' }}
              >
                Apply Now <ArrowRight size={16} />
              </a>
            </span>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="wave" height={80} />
      </section>

      {/* Vision + Stats */}
      <section className="section-pad bg-white overflow-hidden">
        <div className="container-ttc">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="section-label">The Vision</span>
              <h2 className="section-title">TTC Is Not a <span className="text-gradient-blue">Building</span></h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                <p>The Transformation Camp is any comfortable space where God's children gather to be transformed by His Word. We are taking this mandate to every city, every nation.</p>
                <p>Whether it is a living room, a university campus, a community centre, or a rented hall — TTC can happen anywhere people are hungry for transformation.</p>
                <p><strong style={{ color: 'var(--dark)' }}>You can be the one who starts it in your city.</strong></p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(s => <StatCard key={s.label} s={s} />)}
            </div>
          </div>

          {/* Existing cities */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="section-label">Already Active</span>
              <h2 className="section-title">TTC Is In <span className="text-gradient-blue">These Cities</span></h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {CITIES.map(city => <CityCard key={`${city.name}-${city.country}`} city={city} />)}
            </div>
            <p className="text-center text-sm mt-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              More cities coming — yours could be next.
            </p>
          </div>
        </div>
      </section>

      {/* TIC Form */}
      <section id="tic-form" className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #153093 100%)' }}>
        <FloatingOrbs orbs={[
          { size: 350, x: '85%', y: '15%', color: '#4ea8f9', opacity: 0.08, depth: 0.05 },
          { size: 250, x: '10%', y: '75%', color: '#f7931e', opacity: 0.07, depth: 0.07 },
        ]} />
        <BrandCurves color="#4ea8f9" opacity={0.07} position="top-right" animated />
        <div className="container-ttc relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading font-black text-white text-3xl md:text-4xl mb-3" style={{ letterSpacing: '-0.02em' }}>
              Bring TTC to <span style={{ color: '#f7931e' }}>Your City</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-open-sans)' }}>
              Fill out the form below. We will reach out to discuss next steps.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-10">
            <TICForm />
          </div>
        </div>
      </section>
    </>
  )
}
