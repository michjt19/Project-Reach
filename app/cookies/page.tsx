import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy | Project Reach',
  description: 'Learn how Project Reach uses cookies and similar technologies, which third parties set them, and how to manage your preferences.',
  canonical: 'https://www.thereachcommunity.com/cookies',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Cookie Policy', item: 'https://www.thereachcommunity.com/cookies' },
  ],
}

export default function CookiesPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Cookie Policy</span>
      </nav>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <section className="py-12 border-b border-border mb-10">
          <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Cookie Policy</h1>
          <p className="text-text-muted text-lg">How we use cookies and similar technologies — and how you can control them.</p>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Table of contents */}
          <nav className="lg:w-56 shrink-0" aria-label="Page sections">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-text-base mb-3">On this page</h3>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              {[
                ['#what-are-cookies', '1. What Are Cookies'],
                ['#what-we-use', '2. What We Use'],
                ['#functional', '3. Functional Storage'],
                ['#analytics', '4. Analytics Cookies'],
                ['#chat', '5. Live Chat Cookies'],
                ['#third-parties', '6. Third-Party Summary'],
                ['#managing', '7. Managing Preferences'],
                ['#updates', '8. Updates'],
                ['#contact', '9. Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-text-muted hover:text-primary transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Prose */}
          <div className="prose prose-lg max-w-none flex-1">
            <p className="text-sm text-text-muted mb-8">Effective Date: March 22, 2026 &nbsp;·&nbsp; Last Updated: March 22, 2026</p>

            <h2 id="what-are-cookies">1. What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. Similar technologies include browser localStorage (key/value pairs stored in your browser) and session identifiers. These technologies serve various purposes: remembering your preferences, keeping services functional, and — with your consent — collecting anonymized usage statistics.</p>

            <h2 id="what-we-use">2. What We Use on This Site</h2>
            <p>Project Reach uses a minimal set of cookies and browser storage. We distinguish between:</p>
            <ul>
              <li><strong>Functional storage</strong> — necessary for the site to remember your choices. No consent required.</li>
              <li><strong>Analytics and chat cookies</strong> — set only after you accept via our cookie banner. You can decline these without affecting crisis resources, SMS access, or any other core content.</li>
            </ul>

            <h2 id="functional">3. Functional Storage (No Consent Required)</h2>
            <p>We store one item in your browser&apos;s localStorage:</p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-surface-hover">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Name / Key</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border-b border-border font-mono text-xs text-text-base">reach_cookie_consent</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">localStorage</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">Stores your cookie consent choice (&ldquo;accepted&rdquo; or &ldquo;declined&rdquo;) so we don&apos;t ask again on every visit.</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">Persistent (until you clear browser storage)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>This data is stored locally in your browser only. It is never transmitted to our servers or any third party.</p>

            <h2 id="analytics">4. Analytics Cookies (Opt-In)</h2>
            <p>With your consent, we use <strong>Google Analytics 4 (GA4)</strong>, operated by Google LLC, to collect anonymized information about how visitors use this site — such as which pages are visited and how users navigate between them. No personally identifiable information is included in these reports.</p>
            <p>GA4 is <strong>disabled by default</strong>. It activates only after you click &ldquo;Accept&rdquo; on the cookie banner. If you decline, no GA4 cookies are set and no data is sent to Google.</p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-surface-hover">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Service</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Set by</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border-b border-border text-text-base">Google Analytics 4</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">Google LLC (third party)</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">Anonymized page view tracking</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">14 months (GA4 default)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>Google&apos;s data practices are governed by the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>

            <h2 id="chat">5. Live Chat Cookies — Tawk.to (Opt-In)</h2>
            <p>Our live chat feature is powered by <strong>Tawk.to Limited</strong>. When you accept cookies, the Tawk.to widget loads and Tawk.to sets cookies on your device. These cookies assign you a persistent visitor identifier so that chat sessions can be associated with your browser across visits.</p>
            <p>Tawk.to automatically collects your <strong>IP address</strong>, browser type, operating system, and — if you initiate a chat session — the <strong>full content of that conversation</strong>. This data is transmitted to and stored on Tawk.to&apos;s servers. We have access to conversation records through the Tawk.to operator dashboard. We do not control Tawk.to&apos;s data retention schedule.</p>
            <p>If you <strong>decline</strong> cookies, the Tawk.to widget does not load, no Tawk.to cookies are set, and live chat is unavailable. You can still reach us via SMS at <a href="sms:+19014921712">+1 (901) 492-1712</a>, or access crisis resources at any time.</p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-surface-hover">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Service</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Set by</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border-b border-border text-text-base">Tawk.to</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">Tawk.to Limited (third party)</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">Visitor identification, chat session continuity, conversation storage</td>
                    <td className="px-4 py-3 border-b border-border text-text-muted">Per <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer">Tawk.to&apos;s policy</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="third-parties">6. Third-Party Summary</h2>
            <p>The following third parties may set cookies or collect data on this site. All require your explicit consent (except Vercel infrastructure logging, which is outside our control at the browser level):</p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-surface-hover">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Third Party</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Consent Required</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Google Analytics 4', 'Yes — opt-in only', 'https://policies.google.com/privacy', 'Google Privacy Policy'],
                    ['Tawk.to', 'Yes — opt-in only', 'https://www.tawk.to/privacy-policy/', 'Tawk.to Privacy Policy'],
                    ['Vercel (hosting)', 'No (infrastructure only)', 'https://vercel.com/legal/privacy-policy', 'Vercel Privacy Policy'],
                  ].map(([name, consent, href, label]) => (
                    <tr key={name}>
                      <td className="px-4 py-3 border-b border-border text-text-base">{name}</td>
                      <td className="px-4 py-3 border-b border-border text-text-muted">{consent}</td>
                      <td className="px-4 py-3 border-b border-border text-text-muted">
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{label}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="managing">7. Managing Your Cookie Preferences</h2>
            <p>You have several options to control cookies on this site:</p>
            <ul>
              <li>
                <strong>Cookie banner:</strong> When you first visit, a banner appears at the bottom of the screen. Click <em>Accept</em> to enable analytics and live chat cookies, or <em>Decline</em> to block them. If you have already made a choice and want to change it, clear your browser&apos;s localStorage for this site (see your browser settings) and reload the page — the banner will reappear.
              </li>
              <li>
                <strong>Browser settings:</strong> Most browsers allow you to block or delete cookies directly. Refer to your browser&apos;s help documentation for instructions. Note that blocking all cookies may affect functionality on this and other sites.
              </li>
              <li>
                <strong>Opt out of Google Analytics:</strong> You can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a> to prevent GA4 from collecting data regardless of your consent choice on this site.
              </li>
              <li>
                <strong>Tawk.to:</strong> If you have accepted cookies and wish to opt out of Tawk.to tracking specifically, block third-party cookies from <code>tawk.to</code> in your browser settings or use a browser extension that blocks tracking scripts.
              </li>
            </ul>

            <h2 id="updates">8. Updates to This Policy</h2>
            <p>We may update this Cookie Policy from time to time. The updated version will be posted here with a revised effective date. Continued use of the site after changes constitutes acceptance of the updated policy.</p>

            <h2 id="contact">9. Contact</h2>
            <p>Questions about our use of cookies? Email us at <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>.</p>


            <a href="#main-content" className="inline-block mt-4 text-sm text-text-muted hover:text-primary transition-colors">↑ Back to top</a>
          </div>
        </div>
      </main>
    </>
  )
}
