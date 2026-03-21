import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Volunteer Code of Conduct | Project Reach',
  description: 'Project Reach volunteer code of conduct. Our shared commitment to safe, respectful, and compassionate peer support — guidelines every volunteer follows.',
  canonical: 'https://www.thereachcommunity.com/code-of-conduct',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Code of Conduct', item: 'https://www.thereachcommunity.com/code-of-conduct' },
  ],
}

export default function CodeOfConductPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Code of Conduct</span>
      </nav>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <section className="py-12 border-b border-border mb-10">
          <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Volunteer Code of Conduct</h1>
          <p className="text-text-muted text-lg">Our shared commitment to safe, respectful, and compassionate support.</p>
        </section>

        <div className="prose prose-lg max-w-3xl">
          <p className="text-text-muted leading-relaxed mb-8">
            Volunteering with Project Reach is meaningful work — and sometimes challenging work. The people who reach out to us are trusting us with their most vulnerable moments. This Code of Conduct exists not to restrict you, but to protect them, protect you, and protect the integrity of the space we&apos;re building together. Thank you for taking it seriously.
          </p>

          <h2>Our Core Commitments</h2>
          <ul>
            <li><strong>Treat every person with respect and empathy.</strong> Everyone who reaches out deserves to feel heard and valued.</li>
            <li><strong>Maintain confidentiality.</strong> What is shared in conversation stays in conversation. Never disclose personal information without consent.</li>
            <li><strong>Avoid giving medical or legal advice.</strong> You are a peer listener, not a therapist or counselor. Stay in your lane — and that&apos;s enough.</li>
            <li><strong>Refer to crisis services when needed.</strong> If someone expresses immediate danger or thoughts of self-harm, direct them to <a href="tel:988">988</a> or <a href="tel:911">911</a> right away.</li>
            <li><strong>Commit to nonjudgmental, inclusive support.</strong> Welcome everyone, regardless of background, identity, or circumstances.</li>
          </ul>

          <h2>What We Expect</h2>
          <p>As a volunteer, you represent Project Reach and the values of compassionate peer support. We ask that you:</p>
          <ul>
            <li>Show up consistently and reliably when you are scheduled</li>
            <li>Reach out to the team if you are struggling or need support yourself</li>
            <li>Complete any onboarding or training provided before beginning conversations</li>
            <li>Never engage in romantic or inappropriate communication with users</li>
            <li>Report any safety concerns to the team promptly</li>
          </ul>

          <h2>What Is Not Tolerated</h2>
          <ul>
            <li>Harassment, discrimination, or disrespectful communication in any form</li>
            <li>Sharing or distributing user information</li>
            <li>Using your volunteer position for personal gain</li>
            <li>Ignoring or minimizing expressions of distress or harm</li>
          </ul>

          <h2>Your Well-being Matters Too</h2>
          <p>Peer support work can be emotionally demanding. We encourage you to practice self-care, maintain healthy boundaries, and reach out to the team if you ever feel overwhelmed. You cannot pour from an empty cup.</p>

          <p>By volunteering with Project Reach, you agree to uphold these standards and help create a safe, welcoming space for everyone who reaches out.</p>

          <div className="mt-8 p-4 rounded-lg bg-surface border border-border">
            <strong>Questions about this Code of Conduct?</strong> Email us at{' '}
            <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>{' '}
            — we&apos;re always happy to clarify or discuss.
          </div>
        </div>
      </main>
    </>
  )
}
