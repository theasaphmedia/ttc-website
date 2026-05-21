'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, HandHeart, Coins, Building2, Sprout } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { useTilt } from '@/hooks/useTilt'

const CATEGORIES = [
  { Icon: HandHeart,  label: 'Offering',  sub: 'Your weekly act of worship',     color: '#f7931e' },
  { Icon: Coins,      label: 'Tithe',     sub: 'Return the first tenth to God',  color: '#4ea8f9' },
  { Icon: Building2,  label: 'Building',  sub: 'Invest in the house of God',     color: '#22b573' },
  { Icon: Sprout,     label: 'Special',   sub: 'Seeds sown for specific causes', color: '#153093' },
]

function HeroCategoryCard({
  item,
  index,
  visible,
}: {
  item: typeof CATEGORIES[0]
  index: number
  visible: boolean
}) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: 9, scale: 1.04, speed: 350, glare: true,
  })

  return (
    <div
      ref={ref}
      {...handlers}
      className="flex items-center gap-4 p-4 rounded-2xl overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'rgba(255,255,255,0.14)' : `${item.color}18`,
        border: `1px solid ${isHovered ? item.color + '70' : item.color + '35'}`,
        boxShadow: isHovered ? `0 10px 32px ${item.color}30` : 'none',
        opacity: visible ? 1 : 0,
        transitionProperty: 'opacity, transform, background, border-color, box-shadow',
        transitionDuration: '0.65s, 0.65s, 0.3s, 0.3s, 0.3s',
        transitionDelay: `${index * 110 + 350}ms, ${index * 110 + 350}ms, 0ms, 0ms, 0ms`,
        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        transform: visible
          ? (cardStyle.transform || 'none')
          : `${cardStyle.transform ? cardStyle.transform + ' ' : ''}translateX(30px)`,
      }}
    >
      <div style={glareStyle} />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative z-10"
        style={{
          background: `${item.color}25`,
          transform: isHovered ? 'translateZ(16px) scale(1.12)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          boxShadow: isHovered ? `0 4px 16px ${item.color}40` : 'none',
        }}
      >
        <item.Icon
          size={20}
          strokeWidth={1.7}
          style={{
            color: isHovered ? 'white' : item.color,
            transition: 'color 0.25s ease',
          }}
        />
      </div>

      {/* Text */}
      <div className="relative z-10">
        <p
          className="font-heading font-black text-sm"
          style={{
            color: 'white',
            transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {item.label}
        </p>
        <p className="text-xs font-heading" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {item.sub}
        </p>
      </div>

      {/* Right glow dot */}
      <div
        className="ml-auto w-2 h-2 rounded-full shrink-0 relative z-10"
        style={{
          background: item.color,
          boxShadow: isHovered ? `0 0 8px ${item.color}` : 'none',
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
        }}
      />
    </div>
  )
}

export function GivingHero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="relative pt-40 pb-24 md:pt-48 md:pb-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}
    >
      <BrandCurves color="#4ea8f9" opacity={0.08} position="top-right" animated />
      <FloatingOrbs />
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
          className="flex items-center gap-2 mb-6 text-sm"
          style={{
            color: 'rgba(255,255,255,0.5)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 0.05s',
          }}
        >
          <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white font-heading font-medium">Give</span>
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
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Giving
            </div>

            {/* Headline */}
            <h1
              className="font-heading font-black text-white mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            >
              Honor God<br />
              <span style={{ color: '#f7931e' }}>With Your Substance</span>
            </h1>

            {/* Scripture */}
            <p
              className="font-heading font-medium text-base md:text-lg mb-2"
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-open-sans)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s ease 0.35s',
              }}
            >
              &ldquo;Honour the Lord with your wealth, with the firstfruits of all your crops.&rdquo;
            </p>
            <p
              className="text-sm mb-8"
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-open-sans)',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.6s ease 0.45s',
              }}
            >
              — Proverbs 3:9
            </p>

            {/* Scroll down nudge */}
            <a
              href="#give-form"
              className="inline-flex items-center gap-2 font-heading font-bold text-sm transition-all duration-300 hover:gap-3"
              style={{
                color: '#f7931e',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s, gap 0.2s ease',
              }}
            >
              Give Now
              <ChevronRight size={16} />
            </a>
          </div>

          {/* RIGHT — tiltable category cards */}
          <div className="hidden lg:flex flex-col gap-4">
            {CATEGORIES.map((item, i) => (
              <HeroCategoryCard key={item.label} item={item} index={i} visible={loaded} />
            ))}
          </div>
        </div>
      </div>

      <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
    </section>
  )
}
