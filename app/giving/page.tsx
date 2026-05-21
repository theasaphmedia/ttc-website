import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { GivingForm } from '@/components/giving/GivingForm'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

export const metadata: Metadata = {
  title: 'Give — The Transformation Camp',
  description: 'Honor God with your substance. Every seed sown is a life transformed.',
}

export default function GivingPage() {
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
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Give</span>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
            style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Giving
          </div>
          <h1
            className="font-heading font-black text-white mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Honor God
            <br />
            <span style={{ color: '#f7931e' }}>With Your Substance</span>
          </h1>
          <p
            className="font-heading font-medium text-base md:text-lg mb-4"
            style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', fontFamily: 'var(--font-open-sans)' }}
          >
            &ldquo;Honour the Lord with your wealth, with the firstfruits of all your crops.&rdquo;
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-open-sans)' }}>
            — Proverbs 3:9
          </p>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      <section className="section-pad bg-white">
        <div className="container-ttc max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label">Give Online</span>
            <h2 className="section-title">
              Every Seed <span className="text-gradient-blue">Transforms a Life</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Your giving fuels the mandate — 1 million believers transformed in 3 years.
            </p>
          </div>
          <GivingForm />
        </div>
      </section>
    </>
  )
}
