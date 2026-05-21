'use client'

import React from 'react'
import Image from 'next/image'
import { Play, Clock, Eye } from 'lucide-react'
import { useTilt } from '@/hooks/useTilt'
import type { YouTubeSermon } from '@/types'

interface SermonCardProps {
  sermon: YouTubeSermon
  onPlay: (sermon: YouTubeSermon) => void
  featured?: boolean
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })
}
function formatViews(count?: string) {
  if (!count) return ''
  const n = parseInt(count)
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K views`
  return `${n} views`
}

export function SermonCard({ sermon, onPlay, featured = false }: SermonCardProps) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({
    maxTilt: featured ? 4 : 9,
    scale: featured ? 1.01 : 1.03,
    speed: 400,
    glare: true,
  })

  if (featured) {
    return (
      <div
        ref={ref}
        {...handlers}
        className="relative rounded-3xl overflow-hidden cursor-pointer group"
        style={{ ...cardStyle, aspectRatio: '16/7' }}
        onClick={() => onPlay(sermon)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onPlay(sermon) }}
        aria-label={`Play: ${sermon.title}`}
      >
        <div style={glareStyle} />
        <Image src={sermon.thumbnail} alt={sermon.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold tracking-widest uppercase mb-3 self-start px-3 py-1.5 rounded-full" style={{ background: 'rgba(247,147,30,0.25)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.4)' }}>
            Latest Sermon
          </span>
          <h2 className="font-heading font-black text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.4s ease' }}>
            {sermon.title}
          </h2>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-open-sans)' }}>
            <span>{formatDate(sermon.publishedAt)}</span>
            {sermon.duration && <span className="flex items-center gap-1"><Clock size={13} />{sermon.duration}</span>}
            {sermon.viewCount && <span className="flex items-center gap-1"><Eye size={13} />{formatViews(sermon.viewCount)}</span>}
          </div>
          <button
            className="mt-6 self-start flex items-center gap-3 px-6 py-3 rounded-full font-heading font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group/btn touch-pulse-orange"
            style={{ background: '#f7931e', boxShadow: '0 4px 20px rgba(247,147,30,0.4)' }}
          >
            <Play size={16} fill="white" className="transition-transform duration-200 group-hover/btn:scale-110" />
            Watch Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      {...handlers}
      className="group cursor-pointer rounded-2xl overflow-hidden relative"
      style={{
        ...cardStyle,
        background: isHovered ? 'white' : 'var(--off-white)',
        border: `1px solid ${isHovered ? 'rgba(21,48,147,0.2)' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? '0 16px 48px rgba(21,48,147,0.1)' : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
      onClick={() => onPlay(sermon)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onPlay(sermon) }}
      aria-label={`Play: ${sermon.title}`}
    >
      <div style={glareStyle} />
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image src={sermon.thumbnail} alt={sermon.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: 'rgba(0,0,0,0.35)', opacity: isHovered ? 1 : 0 }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: '#f7931e',
              transform: isHovered ? 'scale(1) translateZ(20px)' : 'scale(0.8)',
              boxShadow: isHovered ? '0 8px 32px rgba(247,147,30,0.5)' : 'none',
            }}
          >
            <Play size={20} fill="white" className="ml-0.5" />
          </div>
        </div>
        {sermon.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-heading font-bold text-white" style={{ background: 'rgba(0,0,0,0.75)' }}>
            {sermon.duration}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-5">
        <h3
          className="font-heading font-bold text-base leading-snug mb-2 line-clamp-2"
          style={{ color: 'var(--dark)', transform: isHovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
        >
          {sermon.title}
        </h3>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          <span>{formatDate(sermon.publishedAt)}</span>
          {sermon.viewCount && <span className="flex items-center gap-0.5"><Eye size={11} />{formatViews(sermon.viewCount)}</span>}
        </div>
      </div>
    </div>
  )
}
