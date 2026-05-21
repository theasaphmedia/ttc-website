import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SermonGrid } from '@/components/sermons/SermonGrid'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

export const metadata: Metadata = {
  title: 'Sermons — The Transformation Camp',
  description: 'Watch transforming sermons from Pastor Daniel Odinaka and The Transformation Camp.',
}

export default function SermonsPage() {
  return (
    <>
      {/* Hero */}
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
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Sermons</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase" style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Watch & Listen
              </div>
              <h1 className="font-heading font-black text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                The Word That <span style={{ color: '#4ea8f9' }}>Transforms</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}>
                Spirit-empowered, Word-based teaching from Pastor Daniel Odinaka and the TTC pulpit.
                Every message designed to help you walk in purpose.
              </p>
              <a href="https://www.youtube.com/@jointtc" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-sm text-white touch-pulse-orange"
                style={{ background: '#f7931e', boxShadow: '0 4px 20px rgba(247,147,30,0.35)' }}>
                Subscribe on YouTube &rarr;
              </a>
            </div>
            {/* RIGHT — feature highlights */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: '🎙️', label: 'Fresh Sermons',  sub: 'New messages weekly',    color: '#4ea8f9' },
                { icon: '📖', label: 'Word-Based',     sub: 'Deep Bible teaching',     color: '#f7931e' },
                { icon: '🔥', label: 'Spirit-Led',     sub: 'Anointed ministry',       color: '#22b573' },
                { icon: '🌍', label: 'Watch Anywhere', sub: 'Online & on YouTube',     color: '#4ea8f9' },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-2xl flex flex-col gap-3 touch-card-glow" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-3xl touch-float">{item.icon}</span>
                  <div>
                    <p className="font-heading font-black text-white text-sm mb-0.5">{item.label}</p>
                    <p className="text-xs font-heading" style={{ color: item.color }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* Sermon Grid */}
      <section className="section-pad bg-white">
        <div className="container-ttc">
          <SermonGrid />
        </div>
      </section>
    </>
  )
}
