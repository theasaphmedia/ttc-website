import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MINISTRY_GROUPS } from '@/lib/ministry-groups-data'
import { GroupCard } from '@/components/ministry-groups/GroupCard'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

export const metadata: Metadata = {
  title: 'Ministry Groups — The Transformation Camp',
  description: 'Find your place and serve your purpose. Join one of TTC\'s 7 ministry groups.',
}

export default function MinistryGroupsPage() {
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
            <span className="text-white font-heading font-medium">Ministry Groups</span>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
            style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Find Your Group
          </div>
          <h1
            className="font-heading font-black text-white mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Find Your Place.
            <br />
            <span style={{ color: '#4ea8f9' }}>Serve Your Purpose.</span>
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}
          >
            Every member of TTC belongs to a group. Your group is your family, your assignment, and your growth community.
          </p>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* Groups grid */}
      <section className="section-pad bg-white">
        <div className="container-ttc">
          <div className="text-center mb-14">
            <span className="section-label">7 Groups</span>
            <h2 className="section-title">
              Our <span className="text-gradient-blue">Ministry Groups</span>
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Each group has a distinct assignment. Together, they form the full expression of TTC's mission.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MINISTRY_GROUPS.map((group, i) => (
              <GroupCard key={group.slug} group={group} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
