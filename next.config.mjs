/** @type {import('next').NextConfig} */
const nextConfig = {
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
