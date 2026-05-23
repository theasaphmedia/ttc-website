import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transformation In Your City',
  description:
    'Bring The Transformation Camp to your city. Our mandate: 1 million Ministry Leaders across Nigeria and beyond. Apply to host TTC where you are.',
  openGraph: {
    title: 'Transformation In Your City — The Transformation Camp',
    description:
      'The mandate is clear. 1 million Ministry Leaders. It starts in your city.',
  },
}

export default function TICLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
