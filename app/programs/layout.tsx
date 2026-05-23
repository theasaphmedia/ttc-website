import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Join The Transformation Camp for bi-weekly campus meetings — every 1st and 3rd Saturday of the month, online and onsite in Lagos, Nigeria.',
  openGraph: {
    title: 'Programs — The Transformation Camp',
    description:
      'Bi-weekly campus meetings every 1st & 3rd Saturday. Come as you are. Leave transformed.',
  },
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
