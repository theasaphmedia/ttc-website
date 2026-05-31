'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronRight, Calendar, User, Search, Share2 } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface Devotional {
  id: string
  title: string
  scripture?: string
  body: string
  author: string
  published_date: string
}

function DevotionalCard({ dv, featured = false }: { dv: Devotional; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const date = new Date(dv.published_date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const preview = dv.body.slice(0, 220)
  const hasMore = dv.body.length > 220

  if (featured) {
    return (
      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 100%)', border: '1px solid rgba(255,255,255,0.1)' }}
      >

        <div className="p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest"
              style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
            >
              <BookOpen size={11} /> Latest Devotional
            </span>
          </div>
          {dv.scripture && (
            <p className="font-heading font-bold text-sm mb-3" style={{ color: '#f7931e' }}>
              📖 {dv.scripture}
            </p>
          )}
          <h2 className="font-heading font-black text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.1 }}>
            {dv.title}
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'var(--font-open-sans)' }}>
            {expanded ? dv.body : preview}{!expanded && hasMore ? '...' : ''}
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href={`/devotionals/${dv.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: '#f7931e', color: 'white' }}
            >
              Read Full Devotional →
            </Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`📖 ${dv.title} — The Transformation Camp\n\n${typeof window !== 'undefined' ? window.location.origin : 'https://ttconline.org'}/devotionals/${dv.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-heading font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <Share2 size={14} /> Share
            </a>
          </div>
          <div className="flex items-center gap-4 mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-open-sans)' }}>
              <User size={12} />{dv.author}
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-open-sans)' }}>
              <Calendar size={12} />{date}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'white', border: '1px solid var(--gray-200)' }}
    >
      {dv.scripture && (
        <p className="text-xs font-heading font-bold mb-2" style={{ color: '#f7931e' }}>
          📖 {dv.scripture}
        </p>
      )}
      <h3 className="font-heading font-black text-base mb-3" style={{ color: 'var(--dark)', lineHeight: 1.2 }}>
        {dv.title}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
        {expanded ? dv.body : preview}{!expanded && hasMore ? '...' : ''}
      </p>
      <Link
        href={`/devotionals/${dv.id}`}
        className="text-xs font-heading font-bold transition-opacity hover:opacity-70"
        style={{ color: '#153093' }}
      >
        Read Full →
      </Link>
      <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--gray-100)' }}>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          <User size={11} />{dv.author}
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          <Calendar size={11} />{date}
        </div>
      </div>
    </div>
  )
}

export default function DevotionalsPage() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/devotionals')
      .then(r => r.json())
      .then(d => setDevotionals(d.devotionals ?? []))
      .finally(() => setLoading(false))
  }, [])

  const filtered = devotionals.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.body.toLowerCase().includes(search.toLowerCase()) ||
    (d.scripture ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 md:pt-48 md:pb-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}
      >
        <FloatingOrbs />
        <BrandCurves color="#4ea8f9" opacity={0.08} position="top-right" animated />
        <BrandCurves color="#f7931e" opacity={0.06} position="bottom-left" animated />
        <div className="container-ttc relative z-10">
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Blog & Devotionals</span>
          </div>
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
              style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
            >
              <BookOpen size={12} /> Blog & Devotionals
            </div>
            <h1
              className="font-heading font-black text-white mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              Blog & Devotionals
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-open-sans)' }}>
              Devotionals, updates, announcements and Word-based encouragement from Pastor Daniel Odinaka and the TTC team.
            </p>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      {/* Content */}
      <section className="section-pad bg-white">
        <div className="container-ttc">

          {/* Search */}
          <AnimatedSection variant="fadeUp" className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search devotionals..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none"
                style={{
                  border: '1.5px solid var(--gray-200)',
                  fontFamily: 'var(--font-open-sans)',
                  color: 'var(--dark)',
                  background: 'var(--off-white)',
                }}
              />
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#153093', borderTopColor: 'transparent' }} />
              <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>Loading devotionals...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto mb-4 opacity-20" style={{ color: '#153093' }} />
              <h3 className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--dark)' }}>
                {search ? 'No results found' : 'No devotionals yet'}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                {search ? 'Try a different search term.' : 'Check back soon — new devotionals are added regularly.'}
              </p>
            </div>
          ) : (
            <>
              {/* Featured — latest */}
              {featured && !search && (
                <AnimatedSection variant="fadeUp" className="mb-12">
                  <DevotionalCard dv={featured} featured />
                </AnimatedSection>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <>
                  {!search && (
                    <h2 className="font-heading font-black text-xl mb-6" style={{ color: 'var(--dark)' }}>
                      Previous Devotionals
                    </h2>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(search ? filtered : rest).map(dv => (
                      <AnimatedSection key={dv.id} variant="fadeUp">
                        <DevotionalCard dv={dv} />
                      </AnimatedSection>
                    ))}
                  </div>
                </>
              )}

              {/* If search returns results, show all in grid */}
              {search && filtered.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map(dv => (
                    <AnimatedSection key={dv.id} variant="fadeUp">
                      <DevotionalCard dv={dv} />
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--off-white)' }}>
        <div className="container-ttc text-center">
          <h2 className="font-heading font-black text-2xl md:text-3xl mb-3" style={{ color: 'var(--dark)' }}>
            Want more Word-based content?
          </h2>
          <p className="text-base mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            Watch our sermons or join a ministry group to go deeper.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: '#153093' }}
            >
              Watch Sermons
            </Link>
            <Link
              href="/ministry-groups"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'white', color: '#153093', border: '2px solid #153093' }}
            >
              Join a Group
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
