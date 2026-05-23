import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Circle Groups',
  description:
    'Join a Circle Group at The Transformation Camp — intimate communities of 5 to 20 people built for fellowship, accountability, prayer, and growth.',
  openGraph: {
    title: 'Circle Groups — The Transformation Camp',
    description:
      'Small circles. Big transformation. Find your community at TTC.',
  },
}

export default function CircleGroupsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
