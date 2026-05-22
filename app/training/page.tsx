import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { TrainingClassesSection } from '@/components/training/TrainingClassesSection'

export const metadata: Metadata = {
  title: 'Training & Empowerment — The Transformation Camp',
  description:
    'Grow in faith and ministry through TTC structured training: Foundation Class, Discipleship Class, and Transformation Ministry School.',
}

export default function TrainingPage() {
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Training & Empowerment</span>
          </div>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
              style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Grow. Be Equipped. Go Further.
            </div>
            <h1
              className="font-heading font-black text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              Training &{' '}
              <span style={{ color: '#4ea8f9' }}>Empowerment</span>
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}
            >
              Transformation is not a moment — it is a journey. TTC&apos;s structured training programmes are
              designed to take you from conversion all the way to ministry leadership, equipping you at every
              stage with the Word, the character, and the competence to fulfil your God-given assignment.
            </p>
            <a
              href="#classes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-white text-sm"
              style={{ background: '#f7931e', boxShadow: '0 4px 20px rgba(247,147,30,0.35)' }}
            >
              Explore Classes →
            </a>
          </div>
        </div>
        <WaveDivider fillColor="#f8f9ff" variant="curve" height={80} />
      </section>

      {/* Classes */}
      <TrainingClassesSection />
    </>
  )
}
