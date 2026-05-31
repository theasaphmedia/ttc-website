'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BookOpen, ChevronRight, Calendar, User, Copy, Check, ArrowLeft } from 'lucide-react'
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

// ─── Share Buttons ────────────────────────────────────────────────────────────
function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(`📖 ${title} — The Transformation Camp`)

  const shares = [
    {
      label: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedUrl}`,
      bg: '#25D366',
    },
    {
      label: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: '#1877F2',
    },
    {
      label: 'X (Twitter)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      bg: '#000000',
    },
  ]

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-heading font-bold" style={{ color: 'var(--text-muted)' }}>Share:</span>
      {shares.map(s => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-heading font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          style={{ background: s.bg }}
          title={`Share on ${s.label}`}
        >
          {s.icon}
          {s.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-bold transition-all hover:-translate-y-0.5 active:scale-95"
        style={{
          background: copied ? '#22b573' : 'var(--off-white)',
          color: copied ? 'white' : 'var(--dark)',
          border: '1.5px solid var(--gray-200)',
        }}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DevotionalPage() {
  const { id } = useParams<{ id: string }>()
  const [devotional, setDevotional] = useState<Devotional | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [siteUrl, setSiteUrl] = useState('')

  useEffect(() => {
    setSiteUrl(window.location.origin)
    fetch(`/api/devotionals/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setDevotional(d.devotional))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  const shareUrl = `${siteUrl}/devotionals/${id}`

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: '#153093', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (notFound || !devotional) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <BookOpen size={48} className="opacity-20" style={{ color: '#153093' }} />
        <h1 className="font-heading font-black text-2xl" style={{ color: 'var(--dark)' }}>Devotional not found</h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>This devotional may have been removed.</p>
        <Link href="/devotionals" className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-white" style={{ background: '#153093' }}>
          <ArrowLeft size={16} /> Back to Devotionals
        </Link>
      </div>
    )
  }

  const date = new Date(devotional.published_date).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}
      >
        <FloatingOrbs />
        <BrandCurves color="#4ea8f9" opacity={0.08} position="top-right" animated />
        <div className="container-ttc relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm flex-wrap" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <Link href="/devotionals" className="hover:text-white transition-colors font-heading font-medium">Blog & Devotionals</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium line-clamp-1">{devotional.title}</span>
          </div>

          {/* Label */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
            style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
          >
            <BookOpen size={12} /> Devotional
          </div>

          {/* Title */}
          <h1
            className="font-heading font-black text-white mb-4 max-w-3xl"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            {devotional.title}
          </h1>

          {/* Scripture */}
          {devotional.scripture && (
            <p className="font-heading font-bold text-lg mb-5" style={{ color: '#f7931e' }}>
              📖 {devotional.scripture}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-open-sans)' }}>
              <User size={14} /> {devotional.author}
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-open-sans)' }}>
              <Calendar size={14} /> {date}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-pad bg-white">
        <div className="container-ttc max-w-3xl mx-auto">
          <AnimatedSection variant="fadeUp">
            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-10 leading-relaxed text-lg"
              style={{ color: 'var(--text-body)', fontFamily: 'var(--font-open-sans)', whiteSpace: 'pre-wrap', lineHeight: '1.9' }}
            >
              {devotional.body}
            </div>

            {/* Divider */}
            <div className="my-10 h-px" style={{ background: 'var(--gray-200)' }} />

            {/* Share */}
            <ShareButtons title={devotional.title} url={shareUrl} />

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/devotionals"
                className="inline-flex items-center gap-2 text-sm font-heading font-bold transition-opacity hover:opacity-70"
                style={{ color: '#153093' }}
              >
                <ArrowLeft size={15} /> Back to all devotionals
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--off-white)' }}>
        <div className="container-ttc text-center">
          <h2 className="font-heading font-black text-2xl mb-3" style={{ color: 'var(--dark)' }}>
            Blessed by this devotional?
          </h2>
          <p className="text-base mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            Share it with someone who needs it today.
          </p>
          <ShareButtons title={devotional.title} url={shareUrl} />
        </div>
      </section>
    </>
  )
}
