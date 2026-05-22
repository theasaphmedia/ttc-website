'use client'

import React, { useState } from 'react'
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useTilt } from '@/hooks/useTilt'

const SUBJECTS = [
  'General Inquiry',
  'Ministry',
  'Media',
  'Partnership',
  'Other',
]

type Status = 'idle' | 'sending' | 'success' | 'error'

function ContactInfoCard({ Icon, label, value, color }: { Icon: React.ElementType; label: string; value: string; color: string }) {
  const { ref, cardStyle, glareStyle, isHovered, handlers } = useTilt({ maxTilt: 7, scale: 1.02, speed: 350, glare: true })
  return (
    <div
      ref={ref}
      {...handlers}
      className="flex items-start gap-4 p-4 rounded-2xl overflow-hidden relative cursor-default"
      style={{
        ...cardStyle,
        background: isHovered ? 'white' : 'var(--off-white)',
        border: `1px solid ${isHovered ? color + '30' : 'var(--gray-200)'}`,
        boxShadow: isHovered ? `0 8px 28px ${color}12` : 'none',
        transition: [cardStyle.transition, 'background 0.3s ease', 'border-color 0.3s ease', 'box-shadow 0.3s ease'].join(', '),
      }}
    >
      <div style={glareStyle} />
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative z-10"
        style={{
          background: `${color}15`,
          color,
          transform: isHovered ? 'translateZ(12px) scale(1.08)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <Icon size={18} />
      </div>
      <div className="relative z-10">
        <p className="font-heading font-bold text-xs uppercase tracking-widest mb-1" style={{ color }}>{label}</p>
        <p
          className="text-sm"
          style={{
            color: 'var(--text-body)',
            fontFamily: 'var(--font-open-sans)',
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

export function ContactSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form_type: 'contact', ...form }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section-pad bg-white">
      <div className="container-ttc">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: contact info + map */}
          <AnimatedSection variant="slideLeft">
            <span className="section-label">Contact Us</span>
            <h2 className="section-title">
              Connect with <span className="text-gradient-blue">TTC</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
              Reach out for any reason — ministry questions, media inquiries, partnerships, or just to say hello.
              We respond to every message.
            </p>

            {/* Contact info cards */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: MapPin, label: 'Address', value: '38A, Ikota Villa, Ikota, Lagos, Nigeria', color: '#153093' },
                { icon: Mail,   label: 'Email',   value: 'hello@ttconline.org',                      color: '#f7931e' },
                { icon: Phone,  label: 'Phone',   value: '+234 905 870 8101',                        color: '#22b573' },
              ].map(({ icon: Icon, label, value, color }) => (
                <ContactInfoCard key={label} Icon={Icon} label={label} value={value} color={color} />
              ))}
            </div>

            {/* Map — OpenStreetMap (no API key needed) + click opens Google Maps / Maps app */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Ikota+Villa+Estate,Ikota,Lagos,Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden relative group"
              style={{
                height: '300px',
                boxShadow: '0 8px 32px rgba(21,48,147,0.12)',
                border: '1px solid var(--gray-200)',
                textDecoration: 'none',
              }}
              title="Open in Maps"
            >
              {/* OpenStreetMap embed — always free, no key required */}
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.5504%2C6.4255%2C3.5704%2C6.4455&layer=mapnik&marker=6.4355%2C3.5604"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                loading="lazy"
                title="The Transformation Camp location"
              />
              {/* Hover overlay — click-to-open hint */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(21,48,147,0.55)', backdropFilter: 'blur(2px)' }}
              >
                <div
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  <MapPin size={15} />
                  Open in Maps
                </div>
              </div>
              {/* Address chip */}
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl pointer-events-none"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(21,48,147,0.1)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(21,48,147,0.1)' }}
                >
                  <MapPin size={14} style={{ color: '#153093' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-xs truncate" style={{ color: 'var(--dark)' }}>
                    The Transformation Camp
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                    38A, Ikota Villa, Ikota, Lagos
                  </p>
                </div>
                <span
                  className="shrink-0 px-3 py-1.5 rounded-lg font-heading font-bold text-xs text-white"
                  style={{ background: '#153093' }}
                >
                  Get Directions
                </span>
              </div>
            </a>
          </AnimatedSection>

          {/* Right: contact form */}
          <AnimatedSection variant="slideRight">
            <div
              className="p-8 md:p-10 rounded-3xl"
              style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(34,181,115,0.15)' }}
                  >
                    <CheckCircle size={32} style={{ color: '#22b573' }} />
                  </div>
                  <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--dark)' }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 font-heading font-bold text-sm underline"
                    style={{ color: '#153093' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-heading font-bold text-xl mb-6" style={{ color: 'var(--dark)' }}>
                    Send a Message
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                        Full Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{ background: '#fff', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{ background: '#fff', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+234 ..."
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{ background: '#fff', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                        Subject *
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={set('subject')}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{
                          background: '#fff',
                          border: '1px solid var(--gray-200)',
                          color: form.subject ? 'var(--dark)' : 'var(--text-muted)',
                          fontFamily: 'var(--font-open-sans)',
                        }}
                      >
                        <option value="">Select subject...</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={set('message')}
                      rows={5}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 resize-none"
                      style={{ background: '#fff', border: '1px solid var(--gray-200)', color: 'var(--dark)', fontFamily: 'var(--font-open-sans)' }}
                    />
                  </div>

                  {status === 'error' && (
                    <div
                      className="flex items-center gap-2 text-sm p-3 rounded-xl"
                      style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}
                    >
                      <AlertCircle size={16} />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                    style={{ background: '#153093', boxShadow: '0 4px 20px rgba(21,48,147,0.3)' }}
                  >
                    {status === 'sending' ? (
                      'Sending...'
                    ) : (
                      <>Send Message <Send size={15} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
