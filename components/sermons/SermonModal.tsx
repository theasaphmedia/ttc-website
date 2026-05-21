'use client'

import React, { useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'
import type { YouTubeSermon } from '@/types'

interface SermonModalProps {
  sermon: YouTubeSermon | null
  onClose: () => void
}

export function SermonModal({ sermon, onClose }: SermonModalProps) {
  useEffect(() => {
    if (!sermon) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [sermon, onClose])

  if (!sermon) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: '900px', background: '#0d1117' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          aria-label="Close"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Video */}
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${sermon.id}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={sermon.title}
          />
        </div>

        {/* Info bar */}
        <div className="p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-white text-base leading-snug mb-1">{sermon.title}</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-open-sans)' }}>
              {new Date(sermon.publishedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${sermon.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 text-xs font-heading font-bold px-4 py-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
          >
            <ExternalLink size={13} /> YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
