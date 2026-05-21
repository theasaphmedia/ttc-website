'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { TTCLogo } from '@/components/ui/TTCLogo'

const MOSAIC = [
  { src: '/images/hero/hero-1.jpg',       alt: 'TTC Inaugural Service',  className: 'col-span-2 row-span-2' },
  { src: '/images/hero/hero-worship.jpg', alt: 'TTC Worship team',       className: 'col-span-1 row-span-1' },
  { src: '/images/hero/hero-2.jpg',       alt: 'TTC community',          className: 'col-span-1 row-span-1' },
  { src: '/images/hero/hero-crowd1.jpg',  alt: 'TTC gathering',          className: 'col-span-1 row-span-1' },
  { src: '/images/hero/hero-quest.jpg',   alt: 'The Quest event',        className: 'col-span-1 row-span-1' },
]

const WORDS = ['The', 'Place', 'of']

// Floating orb definitions
const ORBS = [
  { size: 320, x: '15%',  y: '20%',  color: '#4ea8f9', opacity: 0.07, depth: 0.04 },
  { size: 200, x: '75%',  y: '60%',  color: '#f7931e', opacity: 0.06, depth: 0.07 },
  { size: 160, x: '55%',  y: '15%',  color: '#22b573', opacity: 0.05, depth: 0.05 },
  { size: 120, x: '85%',  y: '25%',  color: '#4ea8f9', opacity: 0.08, depth: 0.09 },
  { size: 100, x: '30%',  y: '80%',  color: '#f7931e', opacity: 0.06, depth: 0.06 },
]

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [wordVisible, setWordVisible] = useState([false, false, false])
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)

  // Boot animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Word stagger
  useEffect(() => {
    if (!loaded) return
    WORDS.forEach((_, i) => {
      setTimeout(() => {
        setWordVisible(prev => { const next = [...prev]; next[i] = true; return next })
      }, 300 + i * 160)
    })
  }, [loaded])

  // Smooth mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      smoothMouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      setMouse(prev => ({
        x: prev.x + (smoothMouse.current.x - prev.x) * 0.05,
        y: prev.y + (smoothMouse.current.y - prev.y) * 0.05,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const parallax = (depth: number) => ({
    transform: `translate(${(mouse.x - 0.5) * depth * -120}px, ${(mouse.y - 0.5) * depth * -80}px)`,
    transition: 'transform 0.05s linear',
  })

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #153093 45%, #0f2270 100%)' }}
    >
      {/* Parallax orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            opacity: orb.opacity,
            ...parallax(orb.depth),
            willChange: 'transform',
          }}
        />
      ))}

      {/* Brand curves — also parallax */}
      <div style={{ ...parallax(0.02), position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <BrandCurves color="#4ea8f9" opacity={0.12} position="top-right" animated />
      </div>
      <div style={{ ...parallax(0.03), position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <BrandCurves color="#f7931e" opacity={0.08} position="bottom-left" animated />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Main content */}
      <div className="container-ttc relative z-10 flex-1 flex items-center pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* LEFT — Typography */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full mb-8 text-xs font-heading font-bold tracking-widest uppercase"
              style={{
                background: 'rgba(247,147,30,0.18)',
                color: '#f7931e',
                border: '1px solid rgba(247,147,30,0.35)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                transition: 'all 0.6s ease 0.1s',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#f7931e' }} />
              Welcome to TTC
            </div>

            {/* Headline word by word */}
            <h1
              className="font-heading font-black text-white leading-none mb-3"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
            >
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  className="inline-block mr-[0.22em]"
                  style={{
                    opacity: wordVisible[i] ? 1 : 0,
                    transform: wordVisible[i] ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Mr Dafoe accent */}
            <div
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s',
              }}
            >
              <span
                className="font-accent block leading-none"
                style={{
                  color: '#f7931e',
                  fontSize: 'clamp(4rem, 9vw, 8rem)',
                  textShadow: '0 0 60px rgba(247,147,30,0.35)',
                }}
              >
                Your Making
              </span>
            </div>

            {/* Subheadline */}
            <p
              className="mt-6 text-base md:text-lg leading-relaxed max-w-lg"
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontFamily: 'var(--font-open-sans)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.8s ease 1s',
              }}
            >
              A community of believers being transformed into the image of Jesus —
              through love-centred, Word-compliant, Spirit-empowered teaching.
            </p>

            {/* CTAs — with magnetic feel via CSS */}
            <div
              className="flex flex-col sm:flex-row gap-3 mt-9"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                transition: 'all 0.75s ease 1.15s',
              }}
            >
              <Link
                href="/programs"
                className="hero-btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm tracking-wide group"
                style={{ background: '#f7931e', boxShadow: '0 4px 28px rgba(247,147,30,0.45)' }}
              >
                Join Us
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sermons"
                className="hero-btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm tracking-wide border border-white/20 backdrop-blur-sm"
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.18)' }}
                >
                  <Play size={11} fill="white" />
                </span>
                Watch a Sermon
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex gap-8 mt-12 pt-8 border-t border-white/10"
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1.4s' }}
            >
              {[
                { value: '1M+', label: 'Believers to Transform' },
                { value: '3 Yrs', label: 'Mandate Timeline' },
                { value: 'Global', label: 'Reach & Impact' },
              ].map(({ value, label }, i) => (
                <div
                  key={label}
                  className="stat-item flex flex-col cursor-default"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 0.6s ease ${1.5 + i * 0.1}s`,
                  }}
                >
                  <span className="font-heading font-black text-3xl leading-none" style={{ color: '#4ea8f9' }}>
                    {value}
                  </span>
                  <span className="text-xs font-heading font-medium tracking-wide mt-1 uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Parallax photo mosaic */}
          <div
            className="hidden lg:grid grid-cols-3 grid-rows-3 gap-3 h-[600px]"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.97)',
              transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.3s',
            }}
          >
            {MOSAIC.map((photo, i) => (
              <div
                key={photo.src}
                className={`relative rounded-2xl overflow-hidden ${photo.className}`}
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  opacity: loaded ? 1 : 0,
                  transform: loaded
                    ? `translateY(${(mouse.y - 0.5) * (i % 2 === 0 ? -8 : -5)}px) translateX(${(mouse.x - 0.5) * (i % 2 === 0 ? -6 : 6)}px)`
                    : 'translateY(20px)',
                  transition: loaded
                    ? `opacity 0.7s ease ${0.5 + i * 0.1}s, transform 0.08s linear`
                    : `opacity 0.7s ease ${0.5 + i * 0.1}s, transform 0.7s ease ${0.5 + i * 0.1}s`,
                  willChange: 'transform',
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1280px) 33vw, 25vw"
                  priority={i === 0}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(21,48,147,0.2) 0%, transparent 60%)' }}
                />
                {/* Hover shimmer */}
                <div className="mosaic-shimmer absolute inset-0 opacity-0 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)' }} />
              </div>
            ))}
          </div>

          {/* Mobile: single hero image */}
          <div
            className="lg:hidden relative h-72 rounded-3xl overflow-hidden"
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}
          >
            <Image
              src="/images/hero/hero-1.jpg"
              alt="The Transformation Camp"
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(21,48,147,0.35) 0%, transparent 70%)' }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        style={{ opacity: loaded ? 0.45 : 0, transition: 'opacity 1s ease 1.8s' }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-heading font-bold tracking-[0.25em] uppercase text-white">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.25)' }}>
          <div className="absolute top-0 w-full" style={{ background: 'white', height: '40%', animation: 'scrollDot 2s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative z-10 -mb-1">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0 80 C360 20 1080 20 1440 80 L1440 80 L0 80 Z" fill="white" />
        </svg>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(-100%); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }

        .hero-btn-primary {
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease;
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 40px rgba(247,147,30,0.6) !important;
        }
        .hero-btn-primary:active { transform: translateY(0) scale(0.99); }

        .hero-btn-outline {
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), background 0.2s ease;
        }
        .hero-btn-outline:hover {
          transform: translateY(-3px) scale(1.03);
          background: rgba(255,255,255,0.1);
        }

        .stat-item {
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .stat-item:hover { transform: translateY(-4px); }

        .mosaic-shimmer { pointer-events: none; }
        .group:hover .mosaic-shimmer { opacity: 1; }
      `}</style>
    </section>
  )
}
