'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}
    >
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{ background: '#4ea8f9', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[350px] opacity-10 pointer-events-none"
        style={{ background: '#f7931e', borderRadius: '40% 60% 70% 30%', transform: 'translate(-30%, 30%)' }}
      />

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
          style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}
        >
          Something went wrong
        </div>

        <h1
          className="font-heading font-black text-white mb-4"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          An unexpected error occurred
        </h1>

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-open-sans)' }}
        >
          Don&apos;t worry — our team has been notified. Please try again or go back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm"
            style={{ background: '#f7931e', boxShadow: '0 4px 24px rgba(247,147,30,0.4)' }}
          >
            <RefreshCw size={16} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>

        <p className="mt-12 text-xs font-heading font-medium" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          THE TRANSFORMATION CAMP — THE PLACE OF YOUR MAKING
        </p>
      </div>
    </main>
  )
}
