import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Devotionals — The Transformation Camp',
  description: 'Devotionals, updates and Word-based encouragement from Pastor Daniel Odinaka and the TTC team.',
  openGraph: {
    title: 'Blog & Devotionals — The Transformation Camp',
    description: 'Devotionals, updates and encouragement from The Transformation Camp.',
  },
}

export default function DevotionalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
