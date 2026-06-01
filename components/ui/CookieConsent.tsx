'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('ttc_cookie_consent')
    if (!accepted) {
      // Small delay so it doesn't flash immediately on page load
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem('ttc_cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('ttc_cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: 'white',
          border: '1px solid var(--gray-200)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.12)',
          pointerEvents: 'all',
        }}
      >
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-sm mb-1" style={{ color: 'var(--dark)' }}>
            🍪 We use cookies
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
            We use essential cookies to keep the site running and anonymous analytics to understand how it's used. No advertising cookies, ever.{' '}
            <Link href="/privacy" className="font-bold underline" style={{ color: '#153093' }}>
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-full text-xs font-heading font-bold transition-all hover:opacity-75"
            style={{ color: 'var(--text-muted)', border: '1.5px solid var(--gray-200)' }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-full text-xs font-heading font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#153093' }}
          >
            Accept All
          </button>
          <button
            onClick={accept}
            className="p-1.5 rounded-full transition-colors hover:bg-gray-100"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
