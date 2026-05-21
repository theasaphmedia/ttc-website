'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Music2, ExternalLink, Play, X, Youtube } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useTilt } from '@/hooks/useTilt'
import type { YouTubeSermon } from '@/types'

/* ─── YouTube music video card ────────────────────────────────────── */
function MusicVideoCard({
  video,
  index,
  onPlay,
}: {
  video: YouTubeSermon
  index: number
  onPlay: (v: YouTubeSermon) => void
}) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt<HTMLButtonElement>({
    maxTilt: 6,
    scale: 1.03,
    speed: 400,
    glare: true,
  })

  return (
    <AnimatedSection variant="fadeUp" delay={index * 80}>
      <button
        ref={ref}
        {...handlers}
        onClick={() => onPlay(video)}
        className="w-full text-left rounded-2xl overflow-hidden relative cursor-pointer group"
        style={{
          ...cardStyle,
          border: `1px solid ${isHovered ? 'rgba(21,48,147,0.2)' : 'var(--gray-200)'}`,
          boxShadow: isHovered ? '0 16px 48px rgba(21,48,147,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
          transition: [cardStyle.transition, 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
        }}
      >
        <div style={glareStyle} />

        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail || '/images/fallback-thumb.jpg'}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
          {/* Play overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: isHovered ? 'rgba(21,48,147,0.55)' : 'rgba(0,0,0,0.25)',
              transition: 'background 0.3s ease',
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: isHovered ? '#f7931e' : 'rgba(255,255,255,0.9)',
                transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), background 0.3s ease',
                boxShadow: isHovered ? '0 6px 24px rgba(247,147,30,0.5)' : 'none',
              }}
            >
              <Play
                size={20}
                fill={isHovered ? 'white' : '#153093'}
                color={isHovered ? 'white' : '#153093'}
                className="translate-x-0.5"
              />
            </div>
          </div>
          {/* Duration badge */}
          {video.duration && (
            <span
              className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-heading font-bold text-white"
              style={{ background: 'rgba(0,0,0,0.7)' }}
            >
              {video.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="p-4 bg-white">
          <p
            className="font-heading font-bold text-sm leading-snug line-clamp-2"
            style={{ color: 'var(--dark)' }}
          >
            {video.title}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            {new Date(video.publishedAt).toLocaleDateString('en-NG', {
              year: 'numeric', month: 'short', day: 'numeric',
            })}
          </p>
        </div>
      </button>
    </AnimatedSection>
  )
}

/* ─── Video modal ─────────────────────────────────────────────────── */
function VideoModal({ video, onClose }: { video: YouTubeSermon | null; onClose: () => void }) {
  useEffect(() => {
    if (!video) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [video, onClose])

  if (!video) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: '860px', background: '#0d1117' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          aria-label="Close"
        >
          <X size={18} className="text-white" />
        </button>
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>
        <div className="p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-white text-base leading-snug mb-1">{video.title}</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-open-sans)' }}>
              {new Date(video.publishedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 text-xs font-heading font-bold px-4 py-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)' }}
          >
            <ExternalLink size={13} /> YouTube
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── MusicSection ────────────────────────────────────────────────── */
type Tab = 'spotify' | 'youtube'

export function MusicSection() {
  const [tab, setTab] = useState<Tab>('spotify')
  const [musicVideos, setMusicVideos] = useState<YouTubeSermon[]>([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [playing, setPlaying] = useState<YouTubeSermon | null>(null)

  const spotifyEmbedUrl =
    'https://open.spotify.com/embed/search/Daniel%20Odinaka?utm_source=generator&theme=0'

  useEffect(() => {
    if (tab === 'youtube' && musicVideos.length === 0) {
      setLoadingVideos(true)
      fetch('/api/youtube-music')
        .then(r => r.json())
        .then(data => setMusicVideos(data.videos ?? []))
        .catch(() => {})
        .finally(() => setLoadingVideos(false))
    }
  }, [tab, musicVideos.length])

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'spotify',
      label: 'Spotify',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
    },
    {
      key: 'youtube',
      label: 'YouTube',
      icon: <Youtube size={16} />,
    },
  ]

  return (
    <section id="music" className="section-pad bg-white">
      <div className="container-ttc">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection variant="fadeUp" className="text-center mb-10">
            <SectionHeading
              label="Sounds of Transformation"
              title={
                <>
                  Music That Moves{' '}
                  <span className="text-gradient-blue">Your Spirit</span>
                </>
              }
              subtitle="Anointed worship and ministry music by Pastor Daniel Odinaka — sounds that usher you into deeper fellowship with God."
              align="center"
            />
          </AnimatedSection>

          {/* Tab switcher */}
          <AnimatedSection variant="fadeUp" delay={100}>
            <div className="flex items-center justify-center mb-8">
              <div
                className="flex items-center gap-1 p-1 rounded-full"
                style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}
              >
                {tabs.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all duration-200"
                    style={{
                      background: tab === t.key ? (t.key === 'spotify' ? '#1DB954' : '#ff0000') : 'transparent',
                      color: tab === t.key ? 'white' : 'var(--text-muted)',
                      boxShadow: tab === t.key ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
                      transform: tab === t.key ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Spotify tab */}
          {tab === 'spotify' && (
            <AnimatedSection variant="fadeIn">
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  border: '1px solid var(--gray-200)',
                }}
              >
                <iframe
                  src={spotifyEmbedUrl}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Daniel Odinaka on Spotify"
                  className="block"
                />
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a
                  href="https://open.spotify.com/search/Daniel%20Odinaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: '#1DB954' }}
                >
                  <Music2 size={15} />
                  Open on Spotify
                  <ExternalLink size={12} />
                </a>
              </div>
            </AnimatedSection>
          )}

          {/* YouTube tab */}
          {tab === 'youtube' && (
            <AnimatedSection variant="fadeIn">
              {loadingVideos ? (
                <div className="py-16 flex flex-col items-center gap-4" style={{ color: 'var(--text-muted)' }}>
                  <div
                    className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: '#153093', borderTopColor: 'transparent' }}
                  />
                  <p className="font-heading font-medium text-sm">Loading music videos...</p>
                </div>
              ) : musicVideos.length === 0 ? (
                <div
                  className="py-16 rounded-3xl text-center"
                  style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}
                >
                  <Youtube size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                  <p className="font-heading font-bold text-base mb-2" style={{ color: 'var(--dark)' }}>
                    Music videos coming soon
                  </p>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                    When the YouTube API key is configured, music videos from the TTC channel will appear here.
                  </p>
                  <a
                    href="https://www.youtube.com/@jointtc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white"
                    style={{ background: '#ff0000' }}
                  >
                    <Youtube size={15} />
                    Visit YouTube Channel
                  </a>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {musicVideos.map((v, i) => (
                      <MusicVideoCard key={v.id} video={v} index={i} onPlay={setPlaying} />
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    <a
                      href="https://www.youtube.com/@jointtc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: '#ff0000', boxShadow: '0 4px 20px rgba(255,0,0,0.25)' }}
                    >
                      <Youtube size={16} />
                      More on YouTube
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </>
              )}
            </AnimatedSection>
          )}
        </div>
      </div>

      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </section>
  )
}
