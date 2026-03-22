import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Crisis Services Disclaimer | Project Reach',
  description: 'Important information about the scope and limitations of Project Reach peer support services. Includes crisis resource contact information.',
  canonical: 'https://www.thereachcommunity.com/crisis-disclaimer',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Crisis Disclaimer', item: 'https://www.thereachcommunity.com/crisis-disclaimer' },
  ],
}

export default function CrisisDisclaimerPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Crisis Services Disclaimer</span>
      </nav>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <section className="py-12 border-b border-border mb-10">
          <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Crisis Services Disclaimer</h1>
          <p className="text-text-muted text-lg">Important information about what this platform can and cannot provide.</p>
        </section>

        {/* Prominent crisis resources — always visible before legal text */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-10">
          <p className="font-semibold text-text-base mb-4">If you are in immediate danger, do not rely on this platform. Contact emergency services now:</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:988" className="flex items-center gap-3 flex-1 p-4 rounded-lg border border-border hover:bg-surface-hover transition-colors">
              <span aria-hidden="true" className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-text-base text-sm">988 Lifeline</p>
                <p className="text-xs text-text-muted">Call or text 988</p>
              </div>
            </a>
            <a href="sms:741741?&body=HOME" className="flex items-center gap-3 flex-1 p-4 rounded-lg border border-border hover:bg-surface-hover transition-colors">
              <span aria-hidden="true" className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-text-base text-sm">Crisis Text Line</p>
                <p className="text-xs text-text-muted">Text HOME to 741741</p>
              </div>
            </a>
            <a href="tel:911" className="flex items-center gap-3 flex-1 p-4 rounded-lg border border-border hover:bg-surface-hover transition-colors">
              <span aria-hidden="true" className="text-2xl">🚨</span>
              <div>
                <p className="font-semibold text-text-base text-sm">Emergency Services</p>
                <p className="text-xs text-text-muted">Call 911</p>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <nav className="lg:w-56 shrink-0" aria-label="Page sections">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-text-base mb-3">On this page</h3>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              {[
                ['#peer-support-only', '1. Peer Support Only'],
                ['#not-emergency', '2. Not an Emergency Service'],
                ['#scope', '3. Scope of Peer Support'],
                ['#crisis-resources', '4. Crisis Resources'],
                ['#technology', '5. Technology Limitations'],
                ['#external', '6. External Resources'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-text-muted hover:text-primary transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-lg max-w-none flex-1">
            <p className="text-sm text-text-muted mb-8">Effective Date: March 22, 2026</p>

            <h2 id="peer-support-only">1. Peer Support Only — Not Clinical Mental Health Services</h2>
            <p><strong>ReachCommunity provides peer emotional support only.</strong> This platform does not provide, and is not a substitute for, clinical mental health services, psychiatric care, psychological treatment, medical advice, or crisis intervention by trained crisis counselors.</p>
            <p>All support provided through ReachCommunity is delivered by unpaid volunteer listeners who are laypersons. Volunteer listeners are not licensed therapists, licensed counselors, licensed clinical social workers, psychologists, psychiatrists, medical doctors, or any other regulated health care or mental health care provider. Nothing communicated by a volunteer listener constitutes a therapeutic relationship, clinical opinion, diagnosis, prognosis, or treatment recommendation.</p>

            <h2 id="not-emergency">2. Not an Emergency Service</h2>
            <p>ReachCommunity is <strong>not an emergency service</strong>. The platform cannot dispatch emergency responders, contact law enforcement, or guarantee that a volunteer listener will be available at any given time. Response times are not guaranteed. The chat service may be unavailable due to technical outages, volunteer availability, or other factors outside our control.</p>
            <p><strong>If you are in immediate danger — including imminent risk of harm to yourself or others — do not rely on this platform. Contact emergency services immediately.</strong></p>

            <h2 id="scope">3. Scope of Peer Support</h2>
            <p>Peer support through ReachCommunity means empathetic listening, emotional presence, and human connection. It does not include:</p>
            <ul>
              <li>Clinical crisis intervention or de-escalation by trained crisis counselors;</li>
              <li>Diagnosis or treatment of any mental health condition;</li>
              <li>Prescription or recommendation of medication;</li>
              <li>Mandatory reporting to authorities — volunteer listeners are not mandatory reporters under Alaska law by virtue of their role on this platform (see <Link href="/volunteer-agreement#reporting">Volunteer Listener Agreement, Section 6</Link>);</li>
              <li>Any guarantee of confidentiality beyond the technical constraints of our third-party chat provider, Tawk.to.</li>
            </ul>
            <p>You are responsible for your own safety. ReachCommunity encourages all users who are experiencing a mental health crisis to contact the resources listed in Section 4 of this disclaimer.</p>

            <h2 id="crisis-resources">4. Crisis Resources</h2>
            <p>If you or someone you know is experiencing a mental health emergency, suicidal ideation, or risk of harm, please contact one of the following services immediately. These services are available 24 hours a day, 7 days a week, and are independent of ReachCommunity:</p>

            <div className="not-prose my-6 space-y-3">
              {[
                { label: '988 Suicide & Crisis Lifeline', how: 'Call or text 988', href: 'tel:988', note: 'Free, confidential, 24/7 — connects you with a trained crisis counselor' },
                { label: 'Crisis Text Line', how: 'Text HOME to 741741', href: 'sms:741741?&body=HOME', note: 'Free, confidential text-based crisis support' },
                { label: 'Emergency Services', how: 'Call 911', href: 'tel:911', note: 'For immediate danger to life — dispatches emergency responders' },
                { label: 'Veterans Crisis Line', how: 'Call 988, then press 1', href: 'tel:988', note: 'Dedicated support for veterans, service members, and their families' },
              ].map(({ label, how, href, note }) => (
                <a key={label} href={href} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors block no-underline">
                  <div className="flex-1">
                    <p className="font-semibold text-text-base">{label}</p>
                    <p className="text-sm font-medium text-primary">{how}</p>
                    <p className="text-sm text-text-muted mt-0.5">{note}</p>
                  </div>
                </a>
              ))}
            </div>

            <h2 id="technology">5. Technology Limitations</h2>
            <p>Live chat is provided through Tawk.to, a third-party service. Technical failures, internet outages, server errors, or service unavailability at Tawk.to may interrupt or prevent access to volunteer listener support at any time, without notice. Do not rely on this platform as your sole or primary source of crisis support. SMS support (+1 (901) 492-1712) provides an alternative channel when live chat is unavailable, but is also subject to its own service limitations.</p>

            <h2 id="external">6. External Resources</h2>
            <p>Links to external organizations on this Site — including the 988 Lifeline, Crisis Text Line, The Trevor Project, Trans Lifeline, Veterans Crisis Line, NAMI, and others — are provided for informational purposes only. ReachCommunity is not affiliated with, endorsed by, sponsored by, or responsible for the content, availability, or services provided by any external organization. Use of those services is subject to their own terms and privacy policies.</p>

            <p className="text-xs text-text-muted mt-8 pt-6 border-t border-border">
              This document was drafted with AI assistance and should be reviewed by a licensed attorney before deployment.
            </p>

            <a href="#main-content" className="inline-block mt-4 text-sm text-text-muted hover:text-primary transition-colors">↑ Back to top</a>
          </div>
        </div>
      </main>
    </>
  )
}
