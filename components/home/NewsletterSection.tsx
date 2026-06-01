'use client'

import React, { useState } from 'react'
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')

      if (data.alreadySubscribed) {
        setMsg("You're already on our list — God bless you!")
      } else {
        setMsg("You're in! Welcome to the TTC family.")
      }
      setStatus('success')
      setEmail('')
      setName('')
    } catch {
      setMsg('Something went wrong. Please try again.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'var(--off-white)' }}>
      <div className="container-ttc">
        <AnimatedSection variant="fadeUp">
          <div
            className="max-w-2xl mx-auto rounded-3xl p-8 md:p-12 text-center"
            style={{ background: 'white', border: '1px solid var(--gray-200)', boxShadow: '0 8px 40px rgba(21,48,147,0.06)' }}
          >
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(21,48,147,0.08)' }}
            >
              <Mail size={24} style={{ color: '#153093' }} />
            </div>

            {/* Heading */}
            <span className="section-label">Stay Connected</span>
            <h2 className="section-title mt-2">
              Get TTC <span className="text-gradient-blue">Updates</span>
            </h2>
            <p className="text-base leading-relaxed mt-3 mb-8 max-w-md mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Devotionals, event announcements and Word-based encouragement — delivered straight to your inbox.
            </p>

            {status === 'success' ? (
              <div
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl"
                style={{ background: 'rgba(34,181,115,0.08)', border: '1px solid rgba(34,181,115,0.2)' }}
              >
                <CheckCircle2 size={20} style={{ color: '#22b573' }} />
                <p className="font-heading font-bold text-sm" style={{ color: '#22b573' }}>{msg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your first name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid var(--gray-200)',
                      fontFamily: 'var(--font-open-sans)',
                      color: 'var(--dark)',
                      background: 'var(--off-white)',
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid var(--gray-200)',
                      fontFamily: 'var(--font-open-sans)',
                      color: 'var(--dark)',
                      background: 'var(--off-white)',
                    }}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#dc2626' }}>
                    <AlertCircle size={13} /> {msg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl font-heading font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                  style={{ background: '#153093' }}
                >
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Subscribing...</>
                  ) : (
                    <><Mail size={16} /> Subscribe — It&apos;s Free</>
                  )}
                </button>

                <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
