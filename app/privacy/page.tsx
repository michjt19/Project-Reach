import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | How We Protect Your Data | Project Reach',
  description: 'Learn how Project Reach protects your privacy. We collect minimal data, never sell your information, and keep all peer support conversations confidential.',
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
          <p className="text-text-muted text-lg">Your privacy is important to us. Here&apos;s how we handle your information.</p>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Table of contents */}
          <nav className="lg:w-56 shrink-0" aria-label="Page sections">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-text-base mb-3">On this page</h3>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              {[
                ['#privacy-matters', '1. Your Privacy'],
                ['#what-we-collect', '2. What We Collect'],
                ['#how-we-use', '3. How We Use It'],
                ['#anonymity', '4. Anonymity'],
                ['#storage', '5. Storage'],
                ['#third-party', '6. Third Parties'],
                ['#your-rights', '7. Your Rights'],
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
            <p className="text-sm text-text-muted mb-8">Effective Date: June 6th, 2025</p>

            <h2 id="privacy-matters">1. Your Privacy Matters</h2>
            <p>Reach Collective is committed to protecting your privacy. We offer anonymous, peer-based support — without requiring personal information or account creation.</p>

            <h2 id="what-we-collect">2. What We Collect</h2>
            <p>We collect as little as possible. No personal identifying information is required to use our site or chat. However, to operate the service, we may capture:</p>
            <ul>
              <li><strong>Chat conversations</strong> (via Tawk.to or SMS), stored temporarily for safety and training</li>
              <li><strong>Basic technical info</strong> (e.g., browser type or screen size) to improve usability</li>
              <li><strong>Phone number</strong> (for SMS users only)</li>
            </ul>

            <h2 id="how-we-use">3. How We Use This Information</h2>
            <ul>
              <li>To ensure safety and quality of support interactions</li>
              <li>To train volunteer listeners and improve service delivery</li>
              <li>To detect patterns of misuse or crisis escalation</li>
            </ul>
            <p>We do <strong>not</strong> sell, rent, or share your data with third parties for advertising or marketing.</p>

            <h2 id="anonymity">4. Anonymity and Responsibility</h2>
            <p>You are responsible for what you choose to share. We encourage using a nickname and avoiding sensitive details. If you provide identifiable information during a high-risk situation, we may escalate appropriately.</p>

            <h2 id="storage">5. Storage and Retention</h2>
            <p>Conversations may be retained securely for up to 12 months for audit and training. You can request deletion by emailing us at <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>.</p>

            <h2 id="third-party">6. Third-Party Services</h2>
            <p>We use <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer">Tawk.to</a> to power our live chat. Your use of the chat widget is also subject to their privacy terms.</p>

            <h2 id="your-rights">7. Your Rights</h2>
            <ul>
              <li>You can use the service without identifying yourself.</li>
              <li>You can request that your chat logs be deleted.</li>
              <li>You can contact us anytime with questions or concerns.</li>
            </ul>

            <h2 id="updates">8. Updates to This Policy</h2>
            <p>This Privacy Policy may change. The most current version will always be posted here.</p>

            <h2 id="contact">9. Contact</h2>
            <p>Questions? Email us at <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>.</p>

            <a href="#main-content" className="inline-block mt-8 text-sm text-text-muted hover:text-primary transition-colors">↑ Back to top</a>
          </div>
        </div>
      </main>
    </>
  )
}
