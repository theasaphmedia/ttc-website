import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Users } from 'lucide-react'
import { MINISTRY_GROUPS, getGroupBySlug } from '@/lib/ministry-groups-data'
import { GroupForm } from '@/components/ministry-groups/GroupForm'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

export function generateStaticParams() {
  return MINISTRY_GROUPS.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const group = getGroupBySlug(slug)
  if (!group) return { title: 'Not Found' }
  return {
    title: `${group.name} — The Transformation Camp`,
    description: group.description,
  }
}

export default async function GroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const group = getGroupBySlug(slug)
  if (!group) notFound()

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 md:pt-48 md:pb-28 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${group.color} 0%, #0a1628 100%)` }}
      >
        <BrandCurves color="#4ea8f9" opacity={0.08} position="top-right" animated />
        <FloatingOrbs />
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
            <Link href="/ministry-groups" className="hover:text-white transition-colors font-heading font-medium">Ministry Groups</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">{group.name}</span>
          </div>

          <div className="text-5xl mb-6">{group.icon}</div>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <Users size={12} />
            Ministry Group
          </div>

          <h1
            className="font-heading font-black text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {group.name}
          </h1>
          {group.subtitle && (
            <p className="font-heading font-bold text-base mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {group.subtitle}
            </p>
          )}
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-open-sans)' }}
          >
            {group.description}
          </p>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* Join form */}
      <section className="section-pad bg-white">
        <div className="container-ttc max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label">{group.intent === 'learn' ? 'Enroll Now' : 'Apply Now'}</span>
            <h2 className="section-title">
              {group.intent === 'learn' ? 'Enroll in the' : 'Join the'}{' '}
              <span className="text-gradient-blue">{group.name}</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              {group.intent === 'learn'
                ? 'Fill out the form below and we\'ll get you started on the next session.'
                : 'Fill out the form below and a member of our team will reach out to welcome you in.'}
            </p>
          </div>

          <div
            className="p-8 md:p-10 rounded-3xl"
            style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}
          >
            <GroupForm group={group} />
          </div>
        </div>
      </section>
    </>
  )
}
