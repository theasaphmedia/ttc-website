import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { QuickLinksHub } from '@/components/forms/QuickLinksHub'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

export const metadata: Metadata = {
  title: 'Quick Links — The Transformation Camp',
  description: 'Connect with TTC — membership, prayer requests, testimonies, counseling, and more.',
}

export default function QuickLinksPage() {
  return (
    <>
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
            <span className="text-white font-heading font-medium">Quick Links</span>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
            style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Get Connected
          </div>
          <h1
            className="font-heading font-black text-white mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Your Connection to <span style={{ color: '#4ea8f9' }}>TTC</span>
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}
          >
            Membership, prayer requests, testimonies, counseling, welfare, volunteering — everything you need is right here.
          </p>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      <section className="section-pad bg-white">
        <div className="container-ttc">
          <QuickLinksHub />
        </div>
      </section>
    </>
  )
}
