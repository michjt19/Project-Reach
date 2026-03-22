/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.thereachcommunity.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/'] },
    ],
  },
  generateRobotsTxt: false,
  exclude: ['/api/*', '/donate'],
  // Higher priority for key pages
  transform: async (config, path) => ({
    loc: path,
    changefreq: ['/', '/about', '/get-support', '/resources'].includes(path) ? 'daily' : 'weekly',
    priority: ['/', '/get-support', '/about', '/resources'].includes(path) ? 1.0
      : ['/team', '/impact', '/volunteer', '/intake'].includes(path) ? 0.8
      : 0.7,
  }),
}
