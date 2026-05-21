'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useMagnetic } from '@/hooks/useMagnetic'

const MARQUEE_IMAGES = [
  '/images/gallery/gallery-1.jpeg',  '/images/gallery/gallery-2.jpeg',
  '/images/gallery/gallery-3.jpeg',  '/images/gallery/gallery-4.jpeg',
  '/images/gallery/gallery-5.jpeg',  '/images/gallery/gallery-6.jpeg',
  '/images/gallery/gallery-7.jpeg',  '/images/gallery/gallery-8.jpeg',
  '/images/gallery/gallery-9.jpeg',  '/images/gallery/gallery-10.jpeg',
  '/images/gallery/gallery-11.jpeg', '/images/gallery/gallery-12.jpeg',
]

function MagneticLink({
  href,
  className,
  style,
  children,
}: {
  href: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const { ref, style: magStyle, handlers } = useMagnetic({ strength: 0.45 })
  return (
    <span style={magStyle} {...handlers}>
      <Link
        href={href}
        className={className}
        style={style}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    </span>
  )
}

export function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })
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
      setSpotlight(prev => ({
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0d1117 100%)' }}
    >
      {/* Mouse-following spotlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          left: `${spotlight.x}%`,
          top: `${spotlight.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(78,168,249,0.12) 0%, rgba(21,48,147,0.06) 40%, transparent 70%)',
          willChange: 'left, top',
          transition: 'left 0.05s linear, top 0.05s linear',
        }}
      />

      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 translate-x-1/3 -translate-y-1/3 pointer-events-none animate-blob"
        style={{ background: '#4ea8f9', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 -translate-x-1/4 translate-y-1/4 pointer-events-none animate-blob-reverse"
        style={{ background: '#f7931e', borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Top marquee strip */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden opacity-20">
        <div className="flex gap-2 h-full" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
            <div key={i} className="relative w-32 h-full shrink-0 rounded overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" sizes="128px" />
            </div>
          ))}
        </div>
      </div>
      {/* Bottom marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden opacity-20">
        <div className="flex gap-2 h-full" style={{ animation: 'marquee 22s linear infinite reverse' }}>
          {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
            <div key={i} className="relative w-32 h-full shrink-0 rounded overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" sizes="128px" />
            </div>
          ))}
        </div>
      </div>

      <div className="container-ttc relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          <AnimatedSection variant="scaleUp">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 mx-auto transition-all duration-300 hover:scale-110 hover:rotate-12 touch-float"
              style={{ background: 'rgba(247,147,30,0.2)', border: '1px solid rgba(247,147,30,0.3)' }}
            >
              <Sparkles size={28} style={{ color: '#f7931e' }} />
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={100}>
            <p className="font-accent text-4xl md:text-5xl mb-4" style={{ color: '#f7931e' }}>
              Ready to be transformed?
            </p>
            <h2 className="font-heading font-black text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              Join thousands finding{' '}
              <span style={{ color: '#4ea8f9' }}>purpose</span>{' '}at TTC
            </h2>
            <p
              className="text-lg leading-relaxed mb-10 mx-auto max-w-xl"
              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-open-sans)' }}
            >
              Whether you&#39;re new to faith, returning to God, or ready to serve — there is a place
              for you at The Transformation Camp.
            </p>
          </AnimatedSection>

          {/* Magnetic CTA buttons */}
          <AnimatedSection variant="fadeUp" delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticLink
                href="/quick-links"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-heading font-bold text-white text-base tracking-wide transition-all duration-300 hover:shadow-2xl group touch-pulse-orange"
                style={{ background: '#f7931e', boxShadow: '0 6px 30px rgba(247,147,30,0.4)' }}
              >
                Get Connected
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </MagneticLink>
              <MagneticLink
                href="/programs"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-heading font-bold text-white text-base border-2 border-white/30 transition-all duration-300 hover:bg-white/10"
              >
                See Programs
              </MagneticLink>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(33%, -33%) scale(1); }
          50%       { transform: translate(33%, -33%) scale(1.07) rotate(8deg); }
        }
        @keyframes blobFloatReverse {
          0%, 100% { transform: translate(-25%, 25%) scale(1); }
          50%       { transform: translate(-25%, 25%) scale(1.05) rotate(-6deg); }
        }
        .animate-blob         { animation: blobFloat 9s ease-in-out infinite; }
        .animate-blob-reverse { animation: blobFloatReverse 11s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
