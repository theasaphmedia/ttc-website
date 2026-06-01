import React from 'react'
import Link from 'next/link'
import { ChevronRight, Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — The Transformation Camp',
  description: 'Privacy Policy for The Transformation Camp (ttconline.org). Learn how we collect, use and protect your personal information.',
}

const SECTIONS = [
  {
    title: '1. Who We Are',
    body: `The Transformation Camp (TTC) is a ministry operating under Binah Church International, located at 38A, Ikota Villa, Ikota, Lagos, Nigeria. Our website is ttconline.org. When we refer to "TTC", "we", "us" or "our" in this policy, we mean The Transformation Camp and its administrative team.`,
  },
  {
    title: '2. What Information We Collect',
    body: `We collect personal information that you voluntarily provide when using our website. This includes:

• Full name, email address and phone number — when you submit any form on the site (membership, first timer, prayer request, testimony, counselling, volunteering, giving, ministry group applications, etc.)
• Giving and payment information — when you make a donation through our giving page. Card details are processed securely by Paystack and are never stored on our servers.
• Location information — city and country, when provided in forms such as the TIC (Transformation In Your City) application.
• Messages and prayer requests — any content you voluntarily share through our contact or prayer request forms.
• Usage data — basic analytics about how visitors use our website (pages visited, time spent), collected through Vercel Analytics. This data is anonymised and not linked to individuals.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We use the information you provide for the following purposes:

• To respond to your enquiries, prayer requests, counselling requests or form submissions.
• To process and record your giving transactions.
• To connect you with the appropriate ministry group, programme or team.
• To send you follow-up communications related to your request or application.
• To improve our website and ministry services.

We do not use your information for automated decision-making or profiling.`,
  },
  {
    title: '4. How We Store Your Information',
    body: `Your form submission data is stored securely in our database managed by Supabase, a trusted cloud infrastructure provider. Giving transaction records are stored separately and linked to Paystack transaction references.

We take reasonable technical and organisational precautions to protect your personal data against loss, theft and unauthorised access.`,
  },
  {
    title: '5. Payment Processing',
    body: `All online payments on ttconline.org are processed by Paystack (paystack.com), a PCI DSS-compliant payment processor. TTC does not store, process or transmit your card details. When you make a payment, you are subject to Paystack's own privacy policy and terms of service in addition to this policy.`,
  },
  {
    title: '6. Sharing Your Information',
    body: `We do not sell, rent or trade your personal information to third parties. We may share information only in the following circumstances:

• With ministry team members who need it to respond to your request or application.
• With our service providers (Supabase for data storage, Paystack for payment processing, Brevo for email delivery) solely for the purpose of delivering our services.
• Where required by law or to protect the rights and safety of our community.`,
  },
  {
    title: '7. Testimonies and Prayer Requests',
    body: `When you submit a testimony or prayer request, you may choose whether you want it shared publicly. We will only share your testimony or prayer request publicly if you explicitly give permission in the form. Your name may be withheld if you request anonymity.`,
  },
  {
    title: '8. Your Rights',
    body: `You have the right to:

• Request access to the personal information we hold about you.
• Request correction of any inaccurate information.
• Request deletion of your personal information from our records.
• Withdraw consent to communications from us at any time.

To exercise any of these rights, please contact us using the details in Section 10.`,
  },
  {
    title: '9. Cookies and Analytics',
    body: `Our website uses minimal cookies necessary for the site to function correctly (such as session cookies for our admin panel). We use Vercel Analytics to understand how our site is used. This service collects anonymised, aggregated data and does not track individual users or use advertising cookies.`,
  },
  {
    title: '10. Contact Us',
    body: `If you have any questions about this Privacy Policy or how we handle your data, please contact us:

The Transformation Camp
38A, Ikota Villa, Ikota, Lagos, Nigeria
Email: hello@ttconline.org
Website: ttconline.org/contact`,
  },
  {
    title: '11. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage you to review this policy periodically.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #153093 0%, #0f2270 60%, #0a1628 100%)' }}
      >
        <div className="container-ttc relative z-10">
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors font-heading font-medium">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-heading font-medium">Privacy Policy</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Shield size={22} className="text-white" />
            </div>
            <h1 className="font-heading font-black text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
              Privacy Policy
            </h1>
          </div>
          <p className="text-base mt-4" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-open-sans)' }}>
            Effective date: June 2025 &nbsp;·&nbsp; Last updated: June 2025
          </p>
          <p className="text-base mt-3 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-open-sans)' }}>
            At The Transformation Camp, we are committed to protecting your privacy and handling your personal information with care and integrity. This policy explains what we collect, why we collect it and how we use it.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad bg-white">
        <div className="container-ttc">
          <div className="max-w-3xl mx-auto">

            {/* Table of contents */}
            <div
              className="p-6 rounded-2xl mb-12"
              style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)' }}
            >
              <p className="font-heading font-bold text-sm uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                Contents
              </p>
              <div className="grid sm:grid-cols-2 gap-1">
                {SECTIONS.map((s) => (
                  <a
                    key={s.title}
                    href={`#${s.title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-sm py-1 transition-colors hover:opacity-70"
                    style={{ color: '#153093', fontFamily: 'var(--font-open-sans)' }}
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {SECTIONS.map((s) => (
                <div key={s.title} id={s.title.replace(/\s+/g, '-').toLowerCase()}>
                  <h2 className="font-heading font-black text-xl mb-4" style={{ color: 'var(--dark)' }}>
                    {s.title}
                  </h2>
                  <div
                    className="text-base leading-relaxed whitespace-pre-line"
                    style={{ color: 'var(--text-body)', fontFamily: 'var(--font-open-sans)' }}
                  >
                    {s.body}
                  </div>
                  <div className="mt-8 h-px" style={{ background: 'var(--gray-200)' }} />
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div
              className="mt-10 p-6 rounded-2xl text-center"
              style={{ background: 'rgba(21,48,147,0.04)', border: '1px solid rgba(21,48,147,0.1)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-open-sans)' }}>
                Questions about this policy? Reach us at{' '}
                <a href="mailto:hello@ttconline.org" className="font-bold" style={{ color: '#153093' }}>
                  hello@ttconline.org
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" className="font-bold" style={{ color: '#153093' }}>
                  contact page
                </Link>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
