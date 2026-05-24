/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Prevent clickjacking — no one can embed TTC in an iframe on another site
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing attacks
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Limit referrer info sent to third-party sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Force HTTPS for 1 year
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Restrict browser feature access
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Basic XSS protection for older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
]

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
    // Serve modern AVIF/WebP formats automatically — smaller files, faster loads
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  // Gzip/Brotli compression
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
