'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TTCLogo } from '@/components/ui/TTCLogo'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Ministry Groups', href: '/ministry-groups' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Programs', href: '/programs' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Circle Groups', href: '/circle-groups' },
      { label: 'Transformation In Your City', href: '/tic' },
      { label: 'Quick Links', href: '/quick-links' },
    ],
  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const solidBg = scrolled || !isHome

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          solidBg
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
            : 'bg-transparent'
        )}
      >
        <div className="container-ttc">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* Logo */}
            <Link
              href="/"
              className="relative flex items-center shrink-0 rounded-xl px-2 py-1 transition-all duration-300"
              style={{ background: solidBg ? 'transparent' : 'rgba(255,255,255,0.12)', backdropFilter: solidBg ? 'none' : 'blur(8px)' }}
            >
              <TTCLogo
                variant={solidBg ? 'dark' : 'white'}
                size={68}
                className="transition-opacity duration-300"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className={cn(
                        'inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200',
                        solidBg
                          ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn('transition-transform duration-200', dropdownOpen && 'rotate-180')}
                      />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2.5 text-sm font-heading font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200',
                      pathname === link.href
                        ? solidBg
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-white bg-white/15'
                        : solidBg
                        ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/giving"
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-heading font-bold transition-all duration-200 border-2',
                  solidBg
                    ? 'border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white'
                    : 'border-white/40 text-white hover:bg-white/15'
                )}
              >
                Give
              </Link>
              <Link
                href="/quick-links"
                className="px-5 py-2.5 rounded-full text-sm font-heading font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: '#f7931e', boxShadow: '0 2px 15px rgba(247,147,30,0.35)' }}
              >
                Get Connected
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-xl transition-colors',
                solidBg ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/15'
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: '#0d1117' }}>
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
              <TTCLogo variant="white" size={48} />
            </Link>
            <button
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 pt-6 pb-10">
            <div className="space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p
                      className="px-4 py-2 text-xs font-heading font-bold uppercase tracking-widest mt-4 mb-1"
                      style={{ color: '#f7931e' }}
                    >
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 rounded-xl text-base font-heading font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-lg font-heading font-bold transition-all',
                      pathname === link.href
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/giving"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-3.5 rounded-full font-heading font-bold text-white border-2 border-white/20 hover:border-white/40 transition-colors"
              >
                Give
              </Link>
              <Link
                href="/quick-links"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-3.5 rounded-full font-heading font-bold text-white"
                style={{ background: '#f7931e' }}
              >
                Get Connected
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
