import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MINISTRY_GROUPS } from '@/lib/ministry-groups-data'
import { GroupCard } from '@/components/ministry-groups/GroupCard'
import { MinistryGroupsHeroGrid } from '@/components/ministry-groups/MinistryGroupsHeroGrid'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

export const metadata: Metadata = {
  title: 'Ministry Groups — The Transformation Camp',
  description: "Find your place and serve your purpose. Join one of TTC's 9 ministry groups.",
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
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Ministry Groups</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase" style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Find Your Group
              </div>
              <h1 className="font-heading font-black text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                Find Your Place.<br />
                <span style={{ color: '#4ea8f9' }}>Serve Your Purpose.</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}>
                Every member of TTC belongs to a group. Your group is your family, your assignment, and your growth community.
              </p>
              <Link href="#groups" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-sm text-white touch-pulse-orange"
                style={{ background: '#f7931e', boxShadow: '0 4px 20px rgba(247,147,30,0.35)' }}>
                Explore All 9 Groups →
              </Link>
            </div>
            {/* RIGHT — 9 group icons cluster */}
            <MinistryGroupsHeroGrid />
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* Groups grid */}
      <section id="groups" className="section-pad bg-white">
        <div className="container-ttc">
          <div className="text-center mb-14">
            <span className="section-label">9 Groups</span>
            <h2 className="section-title">
              Our <span className="text-gradient-blue">Ministry Groups</span>
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Each group has a distinct assignment. Together, they form the full expression of TTC&apos;s mission.
            </p>
          </div>

          {/* Mobile: horizontal swipe */}
          <div className="sm:hidden -mx-4 px-4">
            <div
              className="flex gap-4 pb-4"
              style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {MINISTRY_GROUPS.map((group, i) => (
                <div
                  key={group.slug}
                  style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'calc(82vw - 1rem)' }}
                >
                  <GroupCard group={group} index={i} />
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] font-heading font-bold tracking-widest uppercase mt-1 mb-4" style={{ color: 'var(--text-muted)' }}>
              ← Swipe to explore all 9 groups →
            </p>
          </div>

          {/* Tablet + Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MINISTRY_GROUPS.map((group, i) => (
              <GroupCard key={group.slug} group={group} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
