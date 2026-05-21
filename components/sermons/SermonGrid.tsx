'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, RefreshCw, Music2 } from 'lucide-react'
import { SermonCard } from './SermonCard'
import { SermonModal } from './SermonModal'
import type { YouTubeSermon, SermonCategory } from '@/types'

const CATEGORIES: SermonCategory[] = [
  'All',
  'Purpose & Calling',
  'Prayer & Worship',
  'Grace & Faith',
  'Life & Relationships',
  'Special Series',
]

function matchCategory(title: string, cat: SermonCategory): boolean {
  if (cat === 'All') return true
  const t = title.toLowerCase()
  if (cat === 'Purpose & Calling')    return t.includes('purpose') || t.includes('calling') || t.includes('marketplace') || t.includes('identity') || t.includes('destiny') || t.includes('search') || t.includes('invitation')
  if (cat === 'Prayer & Worship')     return t.includes('prayer') || t.includes('worship') || t.includes('praise') || t.includes('devotion') || t.includes('rooted') || t.includes('abba') || t.includes('energeo') || t.includes('intercession')
  if (cat === 'Grace & Faith')        return t.includes('grace') || t.includes('faith') || t.includes('unbroken') || t.includes('abundant') || t.includes('miracle') || t.includes('possibilities') || t.includes('saving') || t.includes('shades')
  if (cat === 'Life & Relationships') return t.includes('marriage') || t.includes('dating') || t.includes('relationship') || t.includes('family') || t.includes('love') || t.includes('new age')
  if (cat === 'Special Series')       return t.includes('quest') || t.includes('lift') || t.includes('conference') || t.includes('ingather') || t.includes('inaugural') || t.includes('highlights') || t.includes('kingdom') || t.includes('anointing') || t.includes('economic')
  return false
}

export function SermonGrid() {
  const [sermons, setSermons] = useState<YouTubeSermon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<SermonCategory>('All')
  const [playing, setPlaying] = useState<YouTubeSermon | null>(null)
  const [nextPageToken, setNextPageToken] = useState<string | undefined>()
  const [loadingMore, setLoadingMore] = useState(false)

  const load = useCallback(async (pageToken?: string) => {
    try {
      const url = pageToken ? `/api/youtube-sermons?pageToken=${pageToken}` : '/api/youtube-sermons'
      const res = await fetch(url)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSermons(prev => pageToken ? [...prev, ...data.sermons] : data.sermons)
      setNextPageToken(data.nextPageToken)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = sermons.filter(s => {
    const matchesCat = matchCategory(s.title, category)
    const matchesSearch = !search || s.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const [featured, ...rest] = filtered

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center gap-4" style={{ color: 'var(--text-muted)' }}>
        <RefreshCw size={32} className="animate-spin" style={{ color: '#153093' }} />
        <p className="font-heading font-medium text-sm">Loading sermons...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--dark)' }}>Could not load sermons</p>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>Please check back later or visit our YouTube channel.</p>
        <a
          href="https://www.youtube.com/@jointtc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-white text-sm"
          style={{ background: '#153093' }}
        >
          View on YouTube
        </a>
      </div>
    )
  }

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search sermons..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-heading font-bold transition-all duration-200"
              style={{
                background: category === cat ? '#153093' : 'var(--off-white)',
                color: category === cat ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${category === cat ? '#153093' : 'var(--gray-200)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Music video routing banner — appears when any videos are music type */}
      {filtered.some(s => s.videoType === 'music') && (
        <div
          className="flex items-center justify-between gap-4 p-4 rounded-2xl mb-8"
          style={{ background: 'linear-gradient(135deg, rgba(247,147,30,0.08) 0%, rgba(247,147,30,0.04) 100%)', border: '1px solid rgba(247,147,30,0.2)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(247,147,30,0.15)' }}
            >
              <Music2 size={16} style={{ color: '#f7931e' }} />
            </div>
            <p className="text-sm font-heading font-bold" style={{ color: 'var(--dark)' }}>
              Some videos are worship music —{' '}
              <span style={{ color: '#f7931e' }}>music videos have been moved to the Music section</span>
            </p>
          </div>
          <Link
            href="/#music"
            className="shrink-0 px-4 py-2 rounded-full font-heading font-bold text-xs text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: '#f7931e', boxShadow: '0 3px 12px rgba(247,147,30,0.3)' }}
          >
            Go to Music
          </Link>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center py-20 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          No sermons found for this search.
        </p>
      ) : (
        <>
          {/* Featured sermon */}
          {featured && (
            <div className="mb-10">
              <SermonCard sermon={featured} onPlay={setPlaying} featured />
            </div>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(sermon => (
              <SermonCard key={sermon.id} sermon={sermon} onPlay={setPlaying} />
            ))}
          </div>

          {/* Load more */}
          {nextPageToken && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => { setLoadingMore(true); load(nextPageToken) }}
                disabled={loadingMore}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-heading font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--dark)' }}
              >
                {loadingMore ? <RefreshCw size={15} className="animate-spin" /> : null}
                {loadingMore ? 'Loading...' : 'Load More Sermons'}
              </button>
            </div>
          )}
        </>
      )}

      <SermonModal sermon={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
