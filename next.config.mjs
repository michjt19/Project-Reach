/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            // 'unsafe-inline' for script-src is required by Next.js App Router hydration scripts.
            // Nonce-based CSP (stronger) would require middleware and is a future improvement.
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://embed.tawk.to https://cdn.ywxi.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com https://*.tawk.to",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://va.tawk.to wss://ws.tawk.to https://*.sanity.io https://thereachcommunity.discourse.group",
              "frame-src https://*.tawk.to",
              "worker-src blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', port: '', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      // .html extension redirects — preserve SEO for old GitHub Pages URLs
      { source: '/index.html',          destination: '/',               permanent: true },
      { source: '/about.html',          destination: '/about',          permanent: true },
      { source: '/get-support.html',    destination: '/get-support',    permanent: true },
      { source: '/volunteer.html',      destination: '/volunteer',      permanent: true },
      { source: '/community.html',      destination: '/community',      permanent: true },
      { source: '/faq.html',            destination: '/faq',            permanent: true },
      { source: '/blog.html',           destination: '/blog',           permanent: true },
      { source: '/code-of-conduct.html',destination: '/code-of-conduct',permanent: true },
      { source: '/privacy.html',        destination: '/privacy',        permanent: true },
      { source: '/terms.html',          destination: '/terms',          permanent: true },
      // Old blog post URLs
      { source: '/blog/what-is-peer-support.html',                         destination: '/blog/what-is-peer-support',                         permanent: true },
      { source: '/blog/free-mental-health-resources-without-insurance.html',destination: '/blog/free-mental-health-resources-without-insurance',permanent: true },
      { source: '/blog/how-to-talk-about-mental-health.html',              destination: '/blog/how-to-talk-about-mental-health',              permanent: true },
      { source: '/blog/signs-you-need-someone-to-talk-to.html',            destination: '/blog/signs-you-need-someone-to-talk-to',            permanent: true },
      { source: '/blog/what-to-expect-from-online-peer-support.html',      destination: '/blog/what-to-expect-from-online-peer-support',      permanent: true },
      { source: '/donate',                                                   destination: '/get-support',                                        permanent: true },
    ]
  },
}

export default nextConfig
