import type { Metadata } from 'next'
import { ContactSection } from '@/components/contact/ContactSection'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { BrandCurves } from '@/components/ui/BrandCurves'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — The Transformation Camp',
  description: "Get in touch with The Transformation Camp. We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 md:pt-48 md:pb-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}
      >
        <BrandCurves color="#4ea8f9" opacity={0.08} position="top-right" animated />
        <FloatingOrbs />
        <BrandCurves color="#f7931e" opacity={0.06} position="bottom-left" animated />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="container-ttc relative z-10">
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Contact</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
                style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Get In Touch
              </div>
              <h1 className="font-heading font-black text-white mb-4"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                {"We'd Love to"}<br />
                <span style={{ color: '#4ea8f9' }}>Hear From You</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-open-sans)' }}>
                Whether you have a question, a testimony, or just want to say hello — our team is here.
              </p>
              <a href="#contact-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-white text-sm touch-pulse-orange"
                style={{ background: '#f7931e', boxShadow: '0 4px 20px rgba(247,147,30,0.35)' }}>
                Send a Message →
              </a>
            </div>
            <div className="hidden lg:flex flex-col gap-4">
              {[
                { icon: '📍', label: '38A Ikota Villa', sub: 'Ikota, Lagos, Nigeria',       color: '#4ea8f9' },
                { icon: '📧', label: 'Email Us',        sub: 'Contact info coming soon',    color: '#f7931e' },
                { icon: '📱', label: 'Phone',           sub: 'Details coming soon',         color: '#22b573' },
                { icon: '🌐', label: 'Social Media',    sub: 'Follow @jointtc on YouTube',  color: '#153093' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                  <span className="text-2xl shrink-0 touch-float-sm">{item.icon}</span>
                  <div>
                    <p className="font-heading font-black text-white text-sm">{item.label}</p>
                    <p className="text-xs font-heading" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider fillColor="#ffffff" variant="curve" height={80} />
      </section>

      <ContactSection />
    </>
  )
}
