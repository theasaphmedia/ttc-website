import React from 'react'
import Link from 'next/link'
import { MapPin, Mail, Phone, Youtube, Instagram, Facebook, Twitter } from 'lucide-react'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { TTCLogo } from '@/components/ui/TTCLogo'

const QUICK_LINKS = [
  { label: 'Quick Links Hub', href: '/quick-links' },
  { label: 'Membership', href: '/quick-links' },
  { label: 'Prayer Request', href: '/quick-links' },
  { label: 'First Timer', href: '/quick-links' },
  { label: 'Testimony', href: '/quick-links' },
  { label: 'Volunteer', href: '/quick-links' },
]

const MINISTRY_LINKS = [
  { label: 'Ministry Groups', href: '/ministry-groups' },
  { label: 'Circle Groups', href: '/circle-groups' },
  { label: 'TIC — Transform Your City', href: '/tic' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Programs', href: '/programs' },
  { label: 'Giving', href: '/giving' },
]

const SOCIAL_LINKS = [
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@jointtc' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
]


export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative" style={{ background: '#0d1117' }}>
      {/* CSS for footer hover states */}
      <style>{`
        .footer-link { color: rgba(255,255,255,0.5); transition: color 0.15s ease; }
        .footer-link:hover { color: #4ea8f9; }
        .footer-social { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.55); transition: background 0.2s ease, color 0.2s ease; }
        .footer-social:hover { background: #153093; color: #fff; }
      `}</style>

      {/* Top wave — wraps into the section above */}
      <WaveDivider fillColor="#0d1117" className="relative -mt-1" variant="organic" />

      <div className="container-ttc pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <TTCLogo variant="white" size={44} />
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-open-sans)' }}
            >
              The Place of Your Making. Where God's children are transformed into the image of
              Jesus — through love-centred, Word-compliant, Spirit-empowered teaching.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social flex items-center justify-center w-9 h-9 rounded-full"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-heading font-bold text-sm tracking-widest uppercase mb-5"
              style={{ color: '#f7931e' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link text-sm" style={{ fontFamily: 'var(--font-open-sans)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry */}
          <div>
            <h4
              className="font-heading font-bold text-sm tracking-widest uppercase mb-5"
              style={{ color: '#f7931e' }}
            >
              Ministry
            </h4>
            <ul className="space-y-3">
              {MINISTRY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link text-sm" style={{ fontFamily: 'var(--font-open-sans)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4
              className="font-heading font-bold text-sm tracking-widest uppercase mb-5"
              style={{ color: '#f7931e' }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: '#4ea8f9' }} />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-open-sans)' }}
                >
                  38A, Ikota Villa<br />Ikota, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: '#4ea8f9' }} />
                <span
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-open-sans)' }}
                >
                  [Email — coming soon]
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: '#4ea8f9' }} />
                <span
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-open-sans)' }}
                >
                  [Phone — coming soon]
                </span>
              </li>
            </ul>

            {/* YouTube CTA */}
            <a
              href="https://www.youtube.com/@jointtc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-full text-xs font-heading font-bold text-white transition-all duration-200 hover:opacity-85"
              style={{ background: '#ff0000' }}
            >
              <Youtube size={14} />
              Watch on YouTube
            </a>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          className="mt-14 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-xs text-center md:text-left"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-open-sans)' }}
            >
              © {year} The Transformation Camp ·{' '}
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>
                An expression of Binah Church International
              </span>
            </p>
            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-open-sans)' }}
            >
              Built with ♥ by{' '}
              <a
                href="https://theasaphmedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                TAI Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
