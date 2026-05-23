import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Transformation Camp',
    short_name: 'TTC',
    description: 'The Place of Your Making — raising Ministry Leaders through the Word.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#153093',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['lifestyle', 'education', 'religion'],
    lang: 'en',
  }
}
