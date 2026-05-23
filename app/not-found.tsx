import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}
    >
      {/* Background orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{ background: '#4ea8f9', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[350px] opacity-10 pointer-events-none"
        style={{ background: '#f7931e', borderRadius: '40% 60% 70% 30%', transform: 'translate(-30%, 30%)' }}
      />

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        {/* 404 number */}
        <p
          className="font-heading font-black mb-2"
          style={{ fontSize: 'clamp(5rem, 20vw, 10rem)', lineHeight: 1, color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.04em' }}
        >
          404
        </p>

        {/* Icon + heading */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-heading font-bold tracking-widest uppercase"
          style={{ background: 'rgba(247,147,30,0.2)', color: '#f7931e', border: '1px solid rgba(247,147,30,0.3)', marginTop: '-3rem', position: 'relative' }}>
          Page Not Found
        </div>

        <h1
          className="font-heading font-black text-white mb-4"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          This page doesn&apos;t exist — yet.
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-open-sans)' }}
        >
          The page you&apos;re looking for may have moved or the link may be wrong.
          But your transformation journey doesn&apos;t stop here.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm"
            style={{ background: '#f7931e', boxShadow: '0 4px 24px rgba(247,147,30,0.4)' }}
          >
            <Home size={16} /> Back to Home
          </Link>
          <Link
            href="/quick-links"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            Get Connected <ArrowRight size={16} />
          </Link>
        </div>

        <p className="mt-12 text-xs font-heading font-medium" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          THE TRANSFORMATION CAMP — THE PLACE OF YOUR MAKING
        </p>
      </div>
    </main>
  )
}
