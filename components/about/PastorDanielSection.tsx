'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Music, Cpu, BookOpen, Heart, Globe } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useTilt } from '@/hooks/useTilt'

const HIGHLIGHTS = [
  { icon: BookOpen, label: 'Ministerial Journey',     text: 'Began in 2010 as a Youth Pastor & Sunday School Teacher at RCCG',                       color: '#153093' },
  { icon: Music,    label: 'Ambience Global Network', text: 'Founder of a music label dedicated to anointed ministry sounds',                           color: '#f7931e' },
  { icon: Cpu,      label: 'Tech Entrepreneur',       text: 'Co-founder of tech startups across Nigeria, North America & Europe',                       color: '#22b573' },
  { icon: BookOpen, label: 'Daily Transformation',    text: 'Authors a daily devotional reaching thousands with Word-based encouragement',               color: '#4ea8f9' },
  { icon: Globe,    label: 'Global Impact',           text: 'Dedicated to raising leaders who influence every sphere of society',                        color: '#153093' },
  { icon: Heart,    label: 'Family',                  text: "Married to Goodness Odinaka, his co-labourer in God's vineyard",                           color: '#f7931e' },
]

const EVENT_PHOTOS = [
  '/images/events/worship-1.jpg',   '/images/events/worship-2.jpg',
  '/images/events/worship-3.jpg',   '/images/events/service-1.jpg',
  '/images/events/service-2.jpg',   '/images/events/service-3.jpg',
  '/images/gallery/gallery-18.jpg', '/images/gallery/gallery-19.jpg',
  '/images/gallery/gallery-20.jpg', '/images/gallery/gallery-21.jpg',
  '/images/gallery/gallery-22.jpg', '/images/gallery/gallery-23.jpg',
]

function HighlightCard({ item }: { item: typeof HIGHLIGHTS[0] }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 9, scale: 1.03, speed: 350, glare: true })
  const Icon = item.icon
  return (
    <div
      ref={ref}
      {...handlers}
      className="flex gap-4 p-5 rounded-2xl h-full overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'white' : 'var(--off-white)',
        border: `1px solid ${isHovered ? item.color + '30' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? `0 12px 40px ${item.color}14` : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 relative z-10"
        style={{
          background: `${item.color}18`,
          color: item.color,
          transform: isHovered ? 'translateZ(14px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={16} />
      </div>
      <div className="relative z-10">
        <p className="font-heading font-bold text-xs uppercase tracking-wide mb-1" style={{ color: item.color }}>
          {item.label}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          {item.text}
        </p>
      </div>
    </div>
  )
}

function PhotoCard() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      smooth.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    const animate = () => {
      setMouse(p => ({ x: p.x + (smooth.current.x - p.x) * 0.06, y: p.y + (smooth.current.y - p.y) * 0.06 }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  const px = (mouse.x - 0.5) * -12
  const py = (mouse.y - 0.5) * -8

  return (
    <div ref={containerRef} className="lg:sticky lg:top-28">
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl group/photo"
        style={{ aspectRatio: '3/4', maxHeight: '600px', transform: `translate(${px}px, ${py}px)`, transition: 'transform 0.08s linear', willChange: 'transform' }}
      >
        <Image src="/images/pastor/pastor-daniel-pulpit.jpeg" alt="Pastor Daniel Odinaka" fill className="object-cover object-top transition-transform duration-700 group-hover/photo:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.1) 50%, transparent 100%)' }} />
        <div className="absolute top-0 left-0 w-48 h-48 opacity-20 transition-opacity duration-300 group-hover/photo:opacity-30" style={{ background: '#153093', borderRadius: '0 0 100% 0' }} />
        {/* Hover shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(78,168,249,0.08) 0%, transparent 50%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <p className="font-accent text-4xl" style={{ color: '#f7931e' }}>Pastor Daniel</p>
          <p className="font-heading font-bold text-white text-xl leading-tight">Daniel Odinaka</p>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-open-sans)' }}>Lead Pastor & Facilitator — The Transformation Camp</p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all duration-300 hover:scale-105" style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
            <span>✦</span> Also known as P.Dee
          </div>
        </div>
      </div>
      <div
        className="relative mt-4 ml-auto w-2/3 rounded-2xl overflow-hidden shadow-xl group/photo2"
        style={{ height: '200px', transform: `translate(${px * 0.5}px, ${py * 0.5}px)`, transition: 'transform 0.08s linear', willChange: 'transform' }}
      >
        <Image src="/images/pastor/pastor-daniel-full.jpeg" alt="Pastor Daniel Odinaka full" fill className="object-cover object-top transition-transform duration-700 group-hover/photo2:scale-105" sizes="33vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(21,48,147,0.3) 0%, transparent 60%)' }} />
      </div>
    </div>
  )
}

export function PastorDanielSection() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-ttc">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <span className="section-label">Leadership</span>
          <h2 className="section-title">Meet Our <span className="text-gradient-blue">Lead Pastor</span></h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <AnimatedSection variant="slideLeft">
            <PhotoCard />
          </AnimatedSection>

          <AnimatedSection variant="slideRight">
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl mb-6 leading-tight" style={{ color: 'var(--dark)' }}>
              A Dynamic Preacher, Teacher,<br />
              <span className="text-gradient-blue">&amp; Gospel Songwriter</span>
            </h3>
            <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              <p>Daniel Odinaka — often referred to as <strong style={{ color: 'var(--egyptian-blue)' }}>P.Dee</strong> — is a dynamic preacher, teacher, and gospel songwriter known for his passion to see people encounter Christ and walk boldly in their God-given purpose.</p>
              <p>Through the transformative power of God's Word, he helps believers discover who they are, grow in devotion, and live out their assignment with confidence.</p>
              <p>He is the founder of <strong style={{ color: 'var(--text-body)' }}>Ambience Global Network</strong>, a music label dedicated to promoting anointed ministers and blessing lives through worship.</p>
              <p>Beyond the pulpit, Pst. Daniel is a <strong style={{ color: 'var(--text-body)' }}>tech entrepreneur</strong> and co-founder of several tech startups across Nigeria, North America, and Europe.</p>
              <p>He began his ministerial journey in <strong style={{ color: 'var(--text-body)' }}>2010</strong> as a youth pastor in RCCG, and is married to <strong style={{ color: 'var(--text-body)' }}>Goodness Odinaka</strong>, his co-labourer in God's vineyard.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {HIGHLIGHTS.map((item, i) => (
                <AnimatedSection key={item.label} variant="fadeUp" delay={i * 60}>
                  <HighlightCard item={item} />
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Gallery strip */}
        <AnimatedSection variant="fadeUp" delay={200} className="mt-20">
          <div className="text-center mb-8">
            <span className="section-label">Gallery</span>
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl" style={{ color: 'var(--dark)' }}>
              Moments of <span className="text-gradient-blue">Transformation</span>
            </h3>
          </div>
          <div className="relative overflow-hidden rounded-2xl" style={{ height: '220px' }}>
            <div className="flex gap-3 absolute" style={{ animation: 'galleryScroll 35s linear infinite', width: 'max-content' }}>
              {[...EVENT_PHOTOS, ...EVENT_PHOTOS].map((src, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden shrink-0 shadow-md group/gal cursor-pointer" style={{ width: '320px', height: '220px' }}>
                  <Image src={src} alt={`TTC event ${i + 1}`} fill className="object-cover object-top transition-transform duration-700 group-hover/gal:scale-110" sizes="320px" />
                  <div className="absolute inset-0 opacity-0 group-hover/gal:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(21,48,147,0.25) 0%, transparent 60%)' }} />
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />
          </div>
        </AnimatedSection>
      </div>
      <style>{`
        @keyframes galleryScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  )
}
