import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TTCStory } from '@/components/about/TTCStory'
import { MissionVisionBlock } from '@/components/about/MissionVisionBlock'
import { PastorDanielSection } from '@/components/about/PastorDanielSection'
import { CTABanner } from '@/components/home/CTABanner'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about The Transformation Camp — our story, mission, vision, and the ministry of Pastor Daniel Odinaka.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0d1117 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 translate-x-1/3 -translate-y-1/4 pointer-events-none"
          style={{ background: '#4ea8f9', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 -translate-x-1/4 translate-y-1/3 pointer-events-none"
          style={{ background: '#f7931e', borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }}
        />
        <FloatingOrbs />
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="container-ttc relative z-10">
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <span>/</span>
            <span className="font-heading font-medium text-white">About</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT — text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
                style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                About TTC
              </div>
              <h1
                className="font-heading font-black text-white mb-4"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.05', letterSpacing: '-0.02em' }}
              >
                About The<br />
                <span style={{ color: '#4ea8f9' }}>Transformation Camp</span>
              </h1>
              <p className="font-accent text-3xl md:text-4xl mt-2 mb-6" style={{ color: '#f7931e' }}>
                The Place of Your Making
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-open-sans)' }}>
                Discover who we are, what we believe, and the purpose that drives every gathering,
                every message, and every life we touch.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/programs" className="btn-orange touch-pulse-orange inline-flex items-center gap-2">
                  Join Us <ArrowRight size={16} />
                </Link>
                <Link href="/quick-links" className="btn-outline-white">
                  Get Connected
                </Link>
              </div>
            </div>
            {/* RIGHT — key stats panel */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: '1M+',    label: 'Believers to Transform', color: '#4ea8f9' },
                { value: '3 Yrs',  label: 'Mandate Timeline',       color: '#f7931e' },
                { value: '2010',   label: 'Ministry Founded',        color: '#22b573' },
                { value: 'Global', label: 'Reach & Impact',          color: '#4ea8f9' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-center p-6 rounded-2xl touch-card-glow"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <span className="font-heading font-black text-4xl leading-none mb-2" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="text-xs font-heading font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* TTC Story */}
      <TTCStory />

      {/* Mission & Vision */}
      <MissionVisionBlock />

      {/* Pastor Daniel */}
      <PastorDanielSection />

      {/* CTA Banner */}
      <CTABanner />
    </>
  )
}
