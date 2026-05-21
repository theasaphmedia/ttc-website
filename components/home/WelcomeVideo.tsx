'use client'

import React, { useState } from 'react'
import { Play, Youtube } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

// PLACEHOLDER — swap this with the real video ID when client supplies the URL
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  videoId = 'dQw4w9WgXcQ'
const VIDEO_ID = process.env.NEXT_PUBLIC_WELCOME_VIDEO_ID ?? 'PLACEHOLDER'

export function WelcomeVideo() {
  const isPlaceholder = VIDEO_ID === 'PLACEHOLDER'
  const [started, setStarted] = useState(false)

  return (
    <section className="section-pad" style={{ background: 'var(--off-white)' }}>
      <div className="container-ttc">
        <AnimatedSection variant="fadeUp" className="max-w-3xl mx-auto text-center mb-12">
          <SectionHeading
            label="Welcome"
            title={
              <>
                A Word of{' '}
                <span className="text-gradient-blue">Welcome</span>
              </>
            }
            subtitle="From the heart of The Transformation Camp — hear from Pastor Daniel about our vision, mission, and what God is doing through this ministry."
            align="center"
          />
        </AnimatedSection>

        {/* Video container */}
        <AnimatedSection variant="scaleUp" delay={100}>
          <div className="max-w-4xl mx-auto">
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                paddingBottom: isPlaceholder ? undefined : '56.25%',
                aspectRatio: isPlaceholder ? '16 / 9' : undefined,
                background: 'linear-gradient(135deg, #153093 0%, #0d1117 100%)',
                boxShadow: '0 30px 80px rgba(21,48,147,0.25)',
              }}
            >
              {isPlaceholder ? (
                /* ── Placeholder ── */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                  {/* Background texture */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  {/* Animated blobs */}
                  <div
                    className="absolute top-0 right-0 w-72 h-72 opacity-10 pointer-events-none"
                    style={{
                      background: '#4ea8f9',
                      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                      transform: 'translate(30%, -30%)',
                      animation: 'blobPulse 7s ease-in-out infinite',
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none"
                    style={{
                      background: '#f7931e',
                      borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
                      transform: 'translate(-20%, 20%)',
                      animation: 'blobPulse 9s ease-in-out infinite reverse',
                    }}
                  />

                  {/* Play button */}
                  <div
                    className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(247,147,30,0.15)',
                      border: '2px solid rgba(247,147,30,0.3)',
                      animation: 'ringPulse 2.5s ease-in-out infinite',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(247,147,30,0.25)', border: '2px solid rgba(247,147,30,0.5)' }}
                    >
                      <Play size={28} fill="#f7931e" color="#f7931e" className="translate-x-0.5" />
                    </div>
                  </div>

                  <div className="text-center z-10">
                    <p className="font-heading font-bold text-white text-xl mb-2">
                      Welcome video coming soon
                    </p>
                    <p className="text-sm max-w-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-open-sans)' }}>
                      Pastor Daniel's personal welcome message will be embedded here once provided
                    </p>
                  </div>

                  <a
                    href="https://www.youtube.com/@jointtc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white transition-all duration-200 hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    <Youtube size={16} />
                    Watch on YouTube
                  </a>

                  <style>{`
                    @keyframes blobPulse {
                      0%, 100% { transform: translate(30%, -30%) scale(1); }
                      50% { transform: translate(30%, -30%) scale(1.08) rotate(10deg); }
                    }
                    @keyframes ringPulse {
                      0%, 100% { box-shadow: 0 0 0 0 rgba(247,147,30,0.4); }
                      50% { box-shadow: 0 0 0 16px rgba(247,147,30,0); }
                    }
                  `}</style>
                </div>
              ) : !started ? (
                /* ── Click-to-play thumbnail ── */
                <button
                  className="absolute inset-0 w-full h-full group"
                  onClick={() => setStarted(true)}
                  aria-label="Play welcome video"
                >
                  {/* YouTube thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt="Welcome video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 transition-colors duration-300"
                    style={{ background: 'rgba(0,0,0,0.3)' }}
                  />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(247,147,30,0.9)',
                        boxShadow: '0 8px 32px rgba(247,147,30,0.5)',
                      }}
                    >
                      <Play size={28} fill="white" color="white" className="translate-x-0.5" />
                    </div>
                  </div>
                </button>
              ) : (
                /* ── Live embed ── */
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="Welcome to The Transformation Camp"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Below video */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
              <p
                className="text-sm text-center sm:text-left"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}
              >
                More messages on our{' '}
                <a
                  href="https://www.youtube.com/@jointtc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition-colors hover:underline"
                  style={{ color: 'var(--egyptian-blue)' }}
                >
                  YouTube channel →
                </a>
              </p>
              <a href="/sermons" className="btn-primary text-sm">
                Browse All Sermons
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
