import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | Project Reach',
  description: 'Learn how Project Reach collects, uses, and protects your information. We collect minimal data, never sell your information, and keep peer support conversations confidential.',
  canonical: 'https://www.thereachcommunity.com/privacy',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://www.thereachcommunity.com/privacy' },
  ],
}

export default function PrivacyPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Privacy Policy</span>
      </nav>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <section className="py-12 border-b border-border mb-10">
          <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Privacy Policy</h1>
          <p className="text-text-muted text-lg">How we collect, use, and protect your information.</p>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          <nav className="lg:w-56 shrink-0" aria-label="Page sections">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-text-base mb-3">On this page</h3>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              {[
                ['#who-we-are', '1. Who We Are'],
                ['#scope', '2. Scope'],
                ['#what-we-collect', '3. Information We Collect'],
                ['#how-we-use', '4. How We Use It'],
                ['#disclosure', '5. Disclosure'],
                ['#sensitive', '6. Sensitive Information'],
                ['#children', '7. Children\'s Privacy'],
                ['#retention', '8. Data Retention'],
                ['#your-rights', '9. Your Rights'],
                ['#security', '10. Security'],
                ['#updates', '11. Updates'],
                ['#contact', '12. Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-text-muted hover:text-primary transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-lg max-w-none flex-1">
            <p className="text-sm text-text-muted mb-8">Effective Date: March 22, 2026 &nbsp;·&nbsp; Last Updated: March 22, 2026</p>

            <h2 id="who-we-are">1. Who We Are</h2>
            <p>ReachCommunity (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website located at thereachcommunity.com (the &ldquo;Site&rdquo;). We are a peer support organization providing free, anonymous emotional support services. Questions regarding this Privacy Policy may be directed to: <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>.</p>

            <h2 id="scope">2. Scope of This Policy</h2>
            <p>This Policy describes how we collect, use, disclose, and retain information about individuals who visit the Site, use our services, or apply to volunteer. It does not govern the data practices of third-party services we link to or embed — those are governed by their respective privacy policies, which are referenced where applicable below.</p>

            <h2 id="what-we-collect">3. Information We Collect</h2>

            <h3>3.1 Information You Provide Directly</h3>
            <p><strong>Volunteer Applications.</strong> If you submit a volunteer application, we collect your full name, email address, availability preferences, motivation statement, and any relevant experience you choose to share. Submission of this form constitutes agreement to our Volunteer Listener Agreement.</p>
            <p><strong>Live Chat.</strong> If you initiate a live chat session, you may optionally provide a first name or nickname and a brief description of what you would like to discuss. You are not required to provide your real name. All chat content is transmitted to and stored by our third-party chat provider, Tawk.to (see Section 3.2).</p>

            <h3>3.2 Information Collected by Third Parties With Your Consent</h3>
            <p>The following third-party services are <strong>disabled by default</strong> and activate only after you affirmatively accept cookies via the banner displayed on your first visit. If you decline, neither service collects any data.</p>
            <p><strong>Tawk.to (Live Chat).</strong> Our live chat is provided by Tawk.to Limited. When you accept cookies and the Tawk.to widget loads, Tawk.to automatically collects your IP address, browser type, and operating system, and assigns you a persistent visitor identifier via cookie. If you engage in a chat session, the full content of that conversation is transmitted to and stored on Tawk.to&apos;s servers. We have access to conversation records through the Tawk.to operator dashboard. We have executed a Data Processing Addendum with Tawk.to satisfying GDPR Article 28 requirements. Tawk.to&apos;s data practices are further governed by the <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer">Tawk.to Privacy Policy</a>.</p>
            <p><strong>Google Analytics 4 (GA4).</strong> With your consent, we use GA4, operated by Google LLC, to collect anonymized information about how visitors use our Site, including pages visited and navigation paths. GA4 is disabled by default and activates only upon acceptance. Data collected via GA4 is subject to the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>

            <h3>3.3 Locally Stored Data</h3>
            <p>We store a single preference in your browser&apos;s localStorage under the key <code>reach_cookie_consent</code>, which records your cookie consent choice. This data does not leave your device and is not transmitted to any server.</p>

            <h2 id="how-we-use">4. How We Use Your Information</h2>
            <p>We use collected information solely for the following purposes:</p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-surface-hover">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Data Used</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-base border-b border-border">Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Processing volunteer applications', 'Name, email, availability, motivation, experience', 'Contractual necessity / Legitimate interest'],
                    ['Facilitating peer support chat', 'Optional name, topic, chat content (via Tawk.to)', 'Consent (implied by initiating chat after accepting cookies)'],
                    ['Improving Site usability', 'Anonymized page views via GA4', 'Consent (explicit via cookie banner)'],
                    ['Persisting your cookie preference', 'localStorage consent flag', 'Legitimate interest'],
                  ].map(([purpose, data, basis]) => (
                    <tr key={purpose}>
                      <td className="px-4 py-3 border-b border-border text-text-base">{purpose}</td>
                      <td className="px-4 py-3 border-b border-border text-text-muted">{data}</td>
                      <td className="px-4 py-3 border-b border-border text-text-muted">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>We do not use your information for advertising, profiling, automated decision-making, or sale to third parties.</p>

            <h2 id="disclosure">5. Disclosure of Your Information</h2>
            <p>We do not sell, rent, or trade your personal information. We disclose information only in the following circumstances:</p>
            <ul>
              <li><strong>Tawk.to</strong> — Chat content and visitor data are transmitted to Tawk.to as a necessary function of the chat service. A Data Processing Addendum is in place.</li>
              <li><strong>Resend, Inc.</strong> — Volunteer application data is transmitted to Resend for email delivery. Resend processes this data solely as our data processor. A Data Processing Addendum is in place.</li>
              <li><strong>Google LLC</strong> — Anonymized usage data is transmitted to Google Analytics, subject to your prior consent.</li>
              <li><strong>Vercel, Inc.</strong> — Our Site is hosted on Vercel. Vercel may retain server-side infrastructure logs as part of standard hosting operations. Vercel&apos;s data practices are governed by the <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.</li>
              <li><strong>Legal Obligations</strong> — We may disclose information if required by law, court order, or to protect the safety of any individual.</li>
            </ul>

            <h2 id="sensitive">6. Sensitive Information</h2>
            <p>Our platform is designed for mental health support. Information you share in chat sessions may constitute sensitive personal data under applicable law. We do not use chat content for any purpose other than facilitating your support session. We strongly discourage sharing sensitive personal identifiers — such as Social Security numbers, financial account numbers, or government-issued ID information — through our chat service.</p>

            <h2 id="children">7. Children&apos;s Privacy</h2>
            <p><strong>Our services are not directed to children under the age of 13.</strong> Use of this platform by anyone under 13 is strictly prohibited. We require users to provide a date of birth during the support intake process. Age is calculated server-side at the time of intake. Users identified as under 13 are blocked from proceeding, and no personal data from that session — including the date of birth entered — is stored, logged, or transmitted to any third party.</p>
            <p>We do not knowingly collect personal information from users under 13. If we become aware that personal information has been submitted by a user later identified as under 13, we will take prompt steps to delete that information.</p>
            <p>Users aged 13–17 are classified as minor accounts. Third-party data sharing via the Tawk.to live chat service is restricted for minor-flagged sessions — live chat is not available to users under 18 through the intake flow. Minor users may still access SMS support and the community forum. Users aged 13–17 may use the platform only with parental or guardian awareness, as described in our <Link href="/terms">Terms of Service</Link>.</p>
            <p>Parents or guardians who believe their child under 13 has provided information through this platform may contact us at <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a> to request deletion.</p>

            <h2 id="retention">8. Data Retention</h2>
            <ul>
              <li><strong>Volunteer Applications</strong> — Application data (name, email, motivation, experience) is retained in our email inbox until manually deleted. We will delete application data upon written request.</li>
              <li><strong>Chat Data</strong> — Chat transcripts are retained by Tawk.to in accordance with their data retention policy. We do not independently set or control that retention period. Contact Tawk.to directly to request deletion of records associated with your visitor session.</li>
              <li><strong>Resend Email Logs</strong> — Resend retains email delivery logs for 30 days on standard plans, after which they are automatically deleted. Application content in our email inbox is not subject to this limit.</li>
              <li><strong>Google Analytics</strong> — GA4 data is retained for 14 months by default, after which it is automatically deleted by Google.</li>
              <li><strong>Cookie Preference</strong> — Stored locally in your browser until you clear browser storage or modify your consent.</li>
            </ul>

            <h2 id="your-rights">9. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access</strong> — Request a copy of personal data we hold about you.</li>
              <li><strong>Deletion</strong> — Request deletion of personal data we hold. Note that chat log deletion must be requested directly from Tawk.to.</li>
              <li><strong>Correction</strong> — Request correction of inaccurate data.</li>
              <li><strong>Opt-Out of Analytics</strong> — Decline or withdraw cookie consent at any time by clearing your browser&apos;s localStorage for this site and reloading — the consent banner will reappear.</li>
              <li><strong>Data Portability</strong> — Where technically feasible, receive your data in a portable format.</li>
            </ul>
            <p>To exercise any right, contact us at <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>. We will respond within 30 days.</p>
            <p><strong>California Residents.</strong> Under CCPA/CPRA, California residents have the right to know, delete, correct, and opt out of the sale of personal information. We do not sell personal information.</p>
            <p><strong>EU/EEA/UK Residents.</strong> Where GDPR applies, the legal bases for processing are set forth in Section 4. You have the right to lodge a complaint with your national data protection authority.</p>

            <h2 id="security">10. Security</h2>
            <p>We implement reasonable technical measures to protect information in transit and at rest, including HTTPS/TLS encryption for all Site communications, security response headers, and a Content Security Policy restricting which external scripts may execute on the Site. However, no transmission over the internet is completely secure. We cannot guarantee the security of information transmitted via the Tawk.to chat widget, which is subject to Tawk.to&apos;s own security infrastructure.</p>

            <h2 id="updates">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will post the updated policy with a revised effective date. Continued use of the Site after changes constitutes acceptance of the updated policy.</p>

            <h2 id="contact">12. Contact</h2>
            <p><strong>ReachCommunity</strong><br />
            Email: <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a><br />
            Website: <a href="https://www.thereachcommunity.com">thereachcommunity.com</a></p>


            <a href="#main-content" className="inline-block mt-4 text-sm text-text-muted hover:text-primary transition-colors">↑ Back to top</a>
          </div>
        </div>
      </main>
    </>
  )
}
