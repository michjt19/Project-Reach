import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service | Project Reach',
  description: 'Terms of Service for Project Reach free peer support platform. Understand your rights, our responsibilities, and the guidelines for using our service.',
  canonical: 'https://www.thereachcommunity.com/terms',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://www.thereachcommunity.com/terms' },
  ],
}

export default function TermsPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Terms of Service</span>
      </nav>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <section className="py-12 border-b border-border mb-10">
          <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Terms of Service</h1>
          <p className="text-text-muted text-lg">Please read these terms before using Project Reach.</p>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          <nav className="lg:w-56 shrink-0" aria-label="Page sections">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-text-base mb-3">On this page</h3>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              {[
                ['#introduction', '1. Introduction'],
                ['#what-we-offer', '2. What We Offer'],
                ['#who-can-use', '3. Who Can Use'],
                ['#privacy', '4. Privacy'],
                ['#community', '5. Community'],
                ['#availability', '6. Availability'],
                ['#no-guarantees', '7. No Guarantees'],
                ['#updates', '8. Updates'],
                ['#contact', '9. Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-text-muted hover:text-primary transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-lg max-w-none flex-1">
            <p className="text-sm text-text-muted mb-8">Effective Date: June 6th, 2025</p>

            <h2 id="introduction">1. Introduction</h2>
            <p>Project Reach is a peer-powered emotional support space. By using our website, chat widget, or SMS line, you agree to these Terms. Please read them carefully.</p>

            <h2 id="what-we-offer">2. What We Offer</h2>
            <p>We provide non-clinical, anonymous peer support. Volunteers are trained listeners — not licensed therapists or emergency responders. If you are in immediate danger or need clinical help, please call <a href="tel:988">988</a> or <a href="tel:911">911</a>.</p>

            <h2 id="who-can-use">3. Who Can Use This Site</h2>
            <ul>
              <li>Users must be at least 13 years old.</li>
              <li>You may not impersonate others or use the site to cause harm.</li>
              <li>You agree to follow respectful conduct toward volunteers and other users.</li>
            </ul>

            <h2 id="privacy">4. Privacy &amp; Anonymity</h2>
            <p>We don&apos;t collect identifying information. Conversations may be logged anonymously for training and safety. Full details are in our <Link href="/privacy">Privacy Policy</Link>.</p>

            <h2 id="community">5. Community Standards</h2>
            <ul>
              <li>Be kind and respectful in all interactions.</li>
              <li>Do not use this platform to harass, threaten, or exploit others.</li>
              <li>Inappropriate behavior may result in access being blocked.</li>
            </ul>

            <h2 id="availability">6. Availability &amp; Changes</h2>
            <p>This service is volunteer-led and may not always be available. We reserve the right to modify, pause, or terminate any part of the platform at any time.</p>

            <h2 id="no-guarantees">7. No Guarantees</h2>
            <p>Project Reach is provided &quot;as is.&quot; We make no warranties regarding availability, outcomes, or accuracy. We are not liable for any harm resulting from use.</p>

            <h2 id="updates">8. Updates to This Policy</h2>
            <p>These Terms may change. Continued use of the site means you agree to the latest version.</p>

            <h2 id="contact">9. Contact Us</h2>
            <p>Questions or concerns? Email us at <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>.</p>

            <a href="#main-content" className="inline-block mt-8 text-sm text-text-muted hover:text-primary transition-colors">↑ Back to top</a>
          </div>
        </div>
      </main>
    </>
  )
}
