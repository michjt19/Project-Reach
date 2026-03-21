import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Donate | Support Free Peer Support | Project Reach',
  description: 'Your donation keeps peer support free for everyone. 100% of contributions fund volunteer training and platform operations.',
  canonical: 'https://www.thereachcommunity.com/donate',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Donate', item: 'https://www.thereachcommunity.com/donate' },
  ],
}

export default function DonatePage() {
  return (
    <>
      <JsonLd schema={schema} />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Donate</span>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-primary text-white py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Keep Support Free</h1>
            <p className="text-lg opacity-90">
              Project Reach is 100% free for everyone who needs it — no fees, no insurance, no waitlists.
              Your donation makes that possible.
            </p>
          </div>
        </section>

        {/* Impact tiers */}
        <section className="py-16 px-4 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-text-base text-center mb-10">Your Gift in Action</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { amount: '$10', impact: 'Covers one peer support session for someone in need' },
                { amount: '$25', impact: 'Supports a volunteer through a full week of training materials' },
                { amount: '$50', impact: 'Keeps our platform running for one month, serving hundreds of people' },
              ].map((tier) => (
                <div key={tier.amount} className="bg-surface border border-border rounded-xl p-6 text-center">
                  <p className="font-heading text-3xl font-bold text-primary mb-3">{tier.amount}</p>
                  <p className="text-sm text-text-muted">{tier.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Give Lively embed */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-text-base text-center mb-8">Make a Donation</h2>
            {/* TODO: Replace GIVE_LIVELY_CAMPAIGN_ID with the actual campaign ID from givelively.org */}
            <div
              data-gl-widget
              data-campaign-id="GIVE_LIVELY_CAMPAIGN_ID"
              className="min-h-[300px] flex items-center justify-center border border-dashed border-border rounded-xl text-text-muted text-sm"
            >
              Donation widget loading…
              <noscript>Please enable JavaScript to make a donation.</noscript>
            </div>
            {/* Give Lively script — loads after page is interactive */}
            <Script
              src="https://secure.givelively.org/widgets/branded_campaign/project-reach.js"
              strategy="afterInteractive"
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-background border-t border-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-text-base mb-8 text-center">Donation FAQ</h2>
            <dl className="space-y-6">
              {[
                {
                  q: 'Is my donation tax-deductible?',
                  a: 'Project Reach is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent permitted by law. You will receive a receipt by email.',
                },
                {
                  q: 'How are donations used?',
                  a: 'Your contribution directly supports volunteer training, platform operations, and outreach — so more people can access free peer support.',
                },
                {
                  q: 'Can I donate anonymously?',
                  a: 'Yes. Give Lively supports anonymous donations. Just leave the name fields blank when completing your gift.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-semibold text-text-base mb-1">{q}</dt>
                  <dd className="text-sm text-text-muted leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </>
  )
}
