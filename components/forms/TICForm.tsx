'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Field, TextInput, Textarea, Select } from './FormField'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function TICForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', state: '', country: '',
    ttc_member: '', how_long: '', team: '', why_needed: '', venue: '', vision: '', other: '',
  })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form_type: 'tic_city', ...form }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-12 gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,181,115,0.12)' }}>
          <CheckCircle size={30} style={{ color: '#22b573' }} />
        </div>
        <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--dark)' }}>Application Received!</h3>
        <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
          Thank you for your heart for transformation. We will be in touch with you shortly to discuss next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required><TextInput required value={form.name} onChange={set('name')} placeholder="Your name" /></Field>
        <Field label="Email" required><TextInput type="email" required value={form.email} onChange={set('email')} placeholder="your@email.com" /></Field>
        <Field label="Phone" required><TextInput type="tel" required value={form.phone} onChange={set('phone')} placeholder="+234 ..." /></Field>
        <Field label="City" required><TextInput required value={form.city} onChange={set('city')} placeholder="Your city" /></Field>
        <Field label="State / Province" required><TextInput required value={form.state} onChange={set('state')} placeholder="State" /></Field>
        <Field label="Country" required><TextInput required value={form.country} onChange={set('country')} placeholder="Country" /></Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Are you a TTC member?" required>
          <Select required value={form.ttc_member} onChange={set('ttc_member')} options={['Yes', 'No']} placeholder="Select" />
        </Field>
        <Field label="How long with TTC?">
          <Select value={form.how_long} onChange={set('how_long')} options={['Less than 6 months', '6–12 months', '1–2 years', '2+ years', 'Not a member yet']} placeholder="Select" />
        </Field>
        <Field label="Starting alone or with a team?">
          <Select value={form.team} onChange={set('team')} options={['I have a team', 'I will be starting alone', 'I am still building a team']} placeholder="Select" />
        </Field>
        <Field label="Do you have a venue in mind?">
          <Select value={form.venue} onChange={set('venue')} options={['Yes', 'No', 'Not yet — still looking']} placeholder="Select" />
        </Field>
      </div>

      <Field label="Tell us about your city and why TTC is needed there" required>
        <Textarea required rows={4} value={form.why_needed} onChange={set('why_needed')} placeholder="Share your heart for your city..." />
      </Field>

      <Field label="What is your vision for TTC in your city?" required>
        <Textarea required rows={4} value={form.vision} onChange={set('vision')} placeholder="Describe the impact you want to see..." />
      </Field>

      <Field label="Anything else you'd like to share?">
        <Textarea rows={3} value={form.other} onChange={set('other')} placeholder="Optional..." />
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
        {status === 'sending' ? 'Submitting...' : <><Send size={15} /> Submit Application</>}
      </button>
    </form>
  )
}
