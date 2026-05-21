'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Field, TextInput, Textarea, Select } from './FormField'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function CircleGroupForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', size: '', interests: '', lead: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form_type: 'circle_group', ...form }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-12 gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,181,115,0.12)' }}>
          <CheckCircle size={30} style={{ color: '#22b573' }} />
        </div>
        <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--dark)' }}>You're In!</h3>
        <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          We will connect you with the right circle shortly. Welcome to the community!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required><TextInput required value={form.name} onChange={set('name')} placeholder="Your name" /></Field>
        <Field label="Email" required><TextInput type="email" required value={form.email} onChange={set('email')} placeholder="your@email.com" /></Field>
        <Field label="Phone"><TextInput type="tel" value={form.phone} onChange={set('phone')} placeholder="+234 ..." /></Field>
        <Field label="City" required><TextInput required value={form.city} onChange={set('city')} placeholder="Your city" /></Field>
      </div>
      <Field label="Preferred Group Size">
        <Select value={form.size} onChange={set('size')} options={['5–8 people', '9–15 people', '16–20 people', 'No preference']} placeholder="Select" />
      </Field>
      <Field label="Interest Areas">
        <Textarea rows={3} value={form.interests} onChange={set('interests')} placeholder="E.g. Prayer, Bible Study, Mentorship, Business..." />
      </Field>
      <Field label="Are you willing to lead a circle?">
        <Select value={form.lead} onChange={set('lead')} options={['Yes', 'Maybe', 'No']} placeholder="Select" />
      </Field>
      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
          <AlertCircle size={16} /> Something went wrong. Please try again.
        </div>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: '#153093', boxShadow: '0 4px 20px rgba(21,48,147,0.3)' }}
      >
        {status === 'sending' ? 'Submitting...' : <><Send size={15} /> Join a Circle</>}
      </button>
    </form>
  )
}
