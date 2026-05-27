'use client'

import React, { useState, useRef } from 'react'
import Script from 'next/script'
import { HandHeart, Coins, Building2, Sprout, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Field, TextInput } from '../forms/FormField'
import { useTilt } from '@/hooks/useTilt'

type Category = 'offering' | 'tithe' | 'building' | 'special'
type Status = 'idle' | 'loading' | 'success' | 'error'

const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? 'pk_live_4e3ee3bdb2155fe4e576e74444639de79b24a573'

const CATEGORIES: { key: Category; icon: React.ElementType; label: string; desc: string; color: string }[] = [
  { key: 'offering', icon: HandHeart,  label: 'Offering', desc: 'Your weekly act of worship',          color: '#f7931e' },
  { key: 'tithe',    icon: Coins,      label: 'Tithe',    desc: 'Returning the first tenth to God',    color: '#153093' },
  { key: 'building', icon: Building2,  label: 'Building', desc: 'Investing in the house of God',       color: '#22b573' },
  { key: 'special',  icon: Sprout,     label: 'Special',  desc: 'Seeds sown for specific causes',      color: '#4ea8f9' },
]

function CategoryCard({
  cat,
  selected,
  onClick,
}: {
  cat: typeof CATEGORIES[0]
  selected: boolean
  onClick: () => void
}) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt<HTMLButtonElement>({ maxTilt: 10, scale: 1.04, speed: 300, glare: true })
  const Icon = cat.icon

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center overflow-hidden relative"
      style={{
        ...(cardStyle as React.CSSProperties),
        background: selected ? `${cat.color}12` : isHovered ? 'white' : 'var(--off-white)',
        border: `2px solid ${selected ? cat.color : isHovered ? cat.color + '40' : 'var(--gray-200)'}`,
        boxShadow: selected ? `0 8px 28px ${cat.color}25` : isHovered ? `0 8px 24px ${cat.color}15` : 'none',
        transition: [(cardStyle as React.CSSProperties).transition, 'background 0.2s ease', 'border-color 0.2s ease', 'box-shadow 0.2s ease'].join(', '),
      }}
      {...handlers}
    >
      <div style={glareStyle} />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center relative z-10"
        style={{
          background: `${cat.color}18`,
          color: cat.color,
          transform: isHovered || selected ? 'translateZ(14px) scale(1.1)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={18} />
      </div>
      <p
        className="font-heading font-bold text-sm relative z-10"
        style={{ color: selected ? cat.color : 'var(--dark)' }}
      >
        {cat.label}
      </p>
      <p className="text-[10px] leading-tight relative z-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
        {cat.desc}
      </p>
    </button>
  )
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void }
    }
  }
}

export function GivingForm() {
  const [category, setCategory] = useState<Category>('offering')
  const [form, setForm] = useState({ name: '', email: '', phone: '', amount: '', note: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const paystackReady = useRef(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const selectedCat = CATEGORIES.find(c => c.key === category)!

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (!form.name.trim()) return setErrorMsg('Please enter your full name.')
    if (!form.email.trim()) return setErrorMsg('Please enter your email address.')
    const amountNGN = parseFloat(form.amount)
    if (!amountNGN || amountNGN < 100) return setErrorMsg('Minimum giving amount is ₦100.')
    if (!paystackReady.current || !window.PaystackPop) return setErrorMsg('Payment is loading — please try again in a moment.')

    setStatus('loading')

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email.trim(),
      amount: Math.round(amountNGN * 100), // kobo
      currency: 'NGN',
      firstname: form.name.trim().split(' ')[0],
      lastname: form.name.trim().split(' ').slice(1).join(' ') || '',
      phone: form.phone.trim() || undefined,
      metadata: {
        category,
        categoryLabel: selectedCat.label,
        note: form.note.trim() || undefined,
        custom_fields: [
          { display_name: 'Giving Category', variable_name: 'category', value: selectedCat.label },
          ...(form.note ? [{ display_name: 'Note', variable_name: 'note', value: form.note }] : []),
        ],
      },
      label: `TTC ${selectedCat.label}`,
      callback: async (response: { reference: string }) => {
        try {
          const res = await fetch('/api/submit-giving', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: response.reference }),
          })
          if (!res.ok) throw new Error('Recording failed')
          setStatus('success')
          setForm({ name: '', email: '', phone: '', amount: '', note: '' })
        } catch {
          // Payment succeeded even if recording fails — still show success
          setStatus('success')
        }
      },
      onClose: () => {
        setStatus('idle')
      },
    })

    handler.openIframe()
  }

  if (status === 'success') {
    return (
      <div className="space-y-8">
        <Script
          src="https://js.paystack.co/v1/inline.js"
          onLoad={() => { paystackReady.current = true }}
        />
        <div className="rounded-3xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #153093 0%, #1e40af 100%)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <CheckCircle2 size={32} className="text-white" />
          </div>
          <h3 className="font-heading font-black text-2xl text-white mb-3">Thank You!</h3>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-open-sans)' }}>
            Your {selectedCat.label.toLowerCase()} has been received. God bless your giving!
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{ background: '#f7931e', color: 'white' }}
          >
            Give Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Script
        src="https://js.paystack.co/v1/inline.js"
        onLoad={() => { paystackReady.current = true }}
      />

      {/* Category selector */}
      <div>
        <p className="text-xs font-heading font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
          Giving Category
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              selected={category === cat.key}
              onClick={() => setCategory(cat.key)}
            />
          ))}
        </div>
      </div>

      {/* Payment form */}
      <form onSubmit={handlePay} className="space-y-4 p-6 rounded-2xl" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" required>
            <TextInput
              placeholder="Your name"
              value={form.name}
              onChange={set('name')}
              required
            />
          </Field>
          <Field label="Email Address" required>
            <TextInput
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={set('email')}
              required
            />
          </Field>
          <Field label="Phone Number">
            <TextInput
              type="tel"
              placeholder="+234 ..."
              value={form.phone}
              onChange={set('phone')}
            />
          </Field>
          <Field label="Amount (NGN)" required>
            <TextInput
              type="number"
              placeholder="e.g. 5000"
              min="100"
              step="50"
              value={form.amount}
              onChange={set('amount')}
              required
            />
          </Field>
        </div>

        <Field label="Note (optional)">
          <TextInput
            placeholder="Add a note or dedication..."
            value={form.note}
            onChange={set('note')}
          />
        </Field>

        {errorMsg && (
          <div className="flex items-start gap-2 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', fontFamily: 'var(--font-open-sans)' }}>
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 rounded-full font-heading font-bold text-white text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background: selectedCat.color }}
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Opening secure payment...
            </>
          ) : (
            <>
              Give {form.amount ? `₦${parseFloat(form.amount || '0').toLocaleString()}` : 'Now'} — {selectedCat.label}
            </>
          )}
        </button>

        <p className="text-center text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          🔒 Secured by Paystack · SSL encrypted · Your card details are never stored
        </p>
      </form>
    </div>
  )
}
