import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Volunteer Listener Agreement | Project Reach',
  description: 'Volunteer Listener Agreement for Project Reach peer support volunteers. Covers scope of role, confidentiality, crisis protocol, Alaska mandatory reporting, and Good Samaritan liability protection.',
  canonical: 'https://www.thereachcommunity.com/volunteer-agreement',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Volunteer', item: 'https://www.thereachcommunity.com/volunteer' },
    { '@type': 'ListItem', position: 3, name: 'Volunteer Listener Agreement', item: 'https://www.thereachcommunity.com/volunteer-agreement' },
  ],
}

export default function VolunteerAgreementPage() {
  return (
    <>
      <JsonLd schema={schema} />
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <Link href="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Volunteer Listener Agreement</span>
      </nav>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <section className="py-12 border-b border-border mb-10">
          <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Volunteer Listener Agreement</h1>
          <p className="text-text-muted text-lg">Please read this agreement carefully before submitting your volunteer application.</p>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          <nav className="lg:w-56 shrink-0" aria-label="Page sections">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-text-base mb-3">On this page</h3>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              {[
                ['#relationship', '1. Volunteer Relationship'],
                ['#scope', '2. Scope of Role'],
                ['#crisis', '3. Crisis Protocol'],
                ['#confidentiality', '4. Confidentiality'],
                ['#data', '5. Data Access and Use'],
                ['#reporting', '6. Mandatory Reporting — Alaska Law'],
                ['#good-samaritan', '7. Liability Protection'],
                ['#training', '8. Training and Conduct'],
                ['#representations', '9. Representations'],
                ['#liability', '10. Limitation of Liability'],
                ['#termination', '11. Termination'],
                ['#governing-law', '12. Governing Law'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-text-muted hover:text-primary transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-lg max-w-none flex-1">
            <p className="text-sm text-text-muted mb-8">Effective Date: March 22, 2026 &nbsp;·&nbsp; Last Updated: March 22, 2026</p>

            <p>This Volunteer Listener Agreement (&ldquo;Agreement&rdquo;) governs your participation as a volunteer listener (&ldquo;Volunteer&rdquo;) with ReachCommunity. By submitting a volunteer application and, upon acceptance, engaging in any volunteer listener activity, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement.</p>

            <h2 id="relationship">1. Nature of the Volunteer Relationship</h2>
            <p>You are a volunteer, not an employee, contractor, or agent of ReachCommunity. You are not entitled to compensation for volunteer listener services. Nothing in this Agreement shall be construed to create an employment relationship, partnership, or joint venture between you and ReachCommunity.</p>

            <h2 id="scope">2. Scope of Role</h2>
            <p>Your role as a Volunteer is limited to providing empathetic, non-judgmental peer emotional support to individuals who contact ReachCommunity for assistance. <strong>Volunteer listeners are unpaid, unlicensed laypersons and are not practitioners of the healing arts as defined under Alaska Stat. § 47.17.290.</strong> This distinction is material to the legal obligations described in Section 6.</p>
            <p>You are explicitly prohibited from:</p>
            <ul>
              <li>Providing mental health counseling, therapy, or clinical advice of any kind;</li>
              <li>Offering a diagnosis, prognosis, or treatment recommendation for any mental health or medical condition;</li>
              <li>Attempting to assess, diagnose, or clinically evaluate a user&apos;s mental health condition — your role is to listen and offer human connection, not clinical evaluation;</li>
              <li>Prescribing or recommending specific medications;</li>
              <li>Providing legal, financial, or medical advice;</li>
              <li>Making promises regarding outcomes, confidentiality, or follow-up that ReachCommunity cannot fulfill;</li>
              <li>Establishing personal relationships with individuals you have supported through the platform, or soliciting off-platform contact;</li>
              <li>Disclosing to any third party the content of any conversation conducted through the platform, except as required by applicable law or as directed by authorized ReachCommunity personnel in response to a safety emergency.</li>
            </ul>

            <h2 id="crisis">3. Crisis Protocol</h2>
            <p>If a user communicates imminent risk of harm to themselves or others, you shall:</p>
            <ul>
              <li>Promptly direct the user to emergency services: call or text <strong>988</strong> (Suicide and Crisis Lifeline), text HOME to <strong>741741</strong> (Crisis Text Line), or call <strong>911</strong> for immediate emergencies;</li>
              <li>Not represent yourself as trained crisis intervention personnel unless you hold independent certification in crisis intervention;</li>
              <li>Immediately notify ReachCommunity staff or administration through the designated internal escalation pathway.</li>
            </ul>
            <p>You acknowledge that ReachCommunity&apos;s platform does not include automated crisis detection or escalation. Crisis referral is your responsibility as the volunteer listener in the conversation. Do not attempt to manage a crisis situation through extended conversation alone — your primary responsibility is prompt referral to appropriate emergency resources.</p>

            <h2 id="confidentiality">4. Confidentiality</h2>
            <p>You agree to maintain strict confidentiality regarding all information shared by users through the platform. You shall not disclose, share, or publish — in any form, including on social media, in personal conversation, or in any professional context — any information that could identify an individual you have supported, or the substance of any support conversation.</p>
            <p>This confidentiality obligation survives termination of your volunteer relationship with ReachCommunity.</p>
            <p>Notwithstanding the above, you are not restricted from: (a) complying with lawful court orders; (b) making disclosures necessary to prevent imminent harm in accordance with Section 6 of this Agreement; or (c) disclosures expressly authorized by ReachCommunity administration.</p>

            <h2 id="data">5. Data Access and Use</h2>
            <p>In the course of your volunteer activities, you will have access to chat platform records maintained by Tawk.to. You agree to:</p>
            <ul>
              <li>Access only information necessary to conduct your volunteer listener activities;</li>
              <li>Not download, export, screenshot, or retain copies of user conversations beyond the Tawk.to platform interface;</li>
              <li>Promptly report any unauthorized access, data breach, or security incident to ReachCommunity administration.</li>
            </ul>

            <h2 id="reporting">6. Mandatory Reporting — Alaska Law</h2>
            <p>Volunteer listeners are not mandatory reporters under Alaska&apos;s child abuse and neglect reporting statute (Alaska Stat. § 47.17.020) by virtue of their role on this platform. The mandatory reporting obligation under that statute applies to licensed practitioners of the healing arts, paid employees of crisis programs, and other designated professional categories — not to unpaid peer support volunteers who are not practitioners of the healing arts as defined under Alaska Stat. § 47.17.290.</p>
            <p>Notwithstanding the foregoing, <strong>if a Volunteer becomes aware of what appears to be imminent danger to a child or to any user</strong>, the Volunteer should:</p>
            <ul>
              <li>Encourage the user to contact emergency services (911) or the 988 Suicide and Crisis Lifeline immediately;</li>
              <li>Report the concern through ReachCommunity&apos;s internal escalation pathway so that administration can assess whether further action is warranted.</li>
            </ul>
            <p>If you hold a professional license in any jurisdiction that independently creates mandatory reporting obligations (for example, a licensed social worker, teacher, or healthcare provider), those obligations are not waived or diminished by this Agreement or by your participation as a volunteer. ReachCommunity makes no representation regarding the applicability or scope of mandatory reporting laws to volunteers who hold independent professional licensure.</p>
            <p className="text-sm text-text-muted border-l-4 border-border pl-4">This section reflects the current state of Alaska law as understood at the time of drafting. Volunteers with specific legal questions regarding their reporting obligations should consult a licensed Alaska attorney.</p>

            <h2 id="good-samaritan">7. Liability Protection — Alaska Good Samaritan Statute</h2>
            <p>Under Alaska Stat. § 09.65.090, a person at any location who renders emergency care or emergency counseling to an emotionally distraught person who reasonably appears to be in immediate need of emergency aid in order to avoid serious harm or death is not liable for civil damages resulting from an act or omission in rendering that aid, unless the act or omission constitutes gross negligence or willful misconduct.</p>
            <p>Volunteer listeners who provide good-faith peer emotional support to users in apparent distress may be protected under this statute. This protection is not unlimited — it does not apply to acts or omissions that constitute gross negligence or willful misconduct, and it does not shield conduct that falls outside the scope of peer support as defined in Section 2 of this Agreement.</p>
            <p><strong>This provision does not constitute legal advice.</strong> The applicability of Alaska Stat. § 09.65.090 to digital peer support interactions has not been definitively determined by Alaska courts. Volunteers with specific legal concerns about their liability exposure should consult a licensed Alaska attorney.</p>

            <h2 id="training">8. Training and Conduct Standards</h2>
            <p>You agree to complete any orientation or training required by ReachCommunity before engaging in live listener sessions, and to adhere to all conduct standards communicated by ReachCommunity. ReachCommunity reserves the right to suspend or terminate your volunteer status at any time, for any reason, with or without notice.</p>

            <h2 id="representations">9. Representations and Warranties</h2>
            <p>You represent and warrant that:</p>
            <ul>
              <li>You are at least 18 years of age;</li>
              <li>You are not currently subject to any criminal conviction, civil judgment, or professional sanction that would impair your ability to provide peer support safely;</li>
              <li>You will perform your volunteer activities in good faith and in accordance with this Agreement.</li>
            </ul>

            <h2 id="liability">10. Limitation of Liability</h2>
            <p><strong>To the fullest extent permitted by law, ReachCommunity shall not be liable to you for any damages arising from your volunteer activities, including vicarious or secondary trauma, burnout, or psychological distress resulting from exposure to user disclosures, except where such limitation is prohibited by applicable law.</strong></p>

            <h2 id="termination">11. Termination</h2>
            <p>Either party may terminate this Agreement at any time upon notice. Termination does not relieve you of your confidentiality obligations under Section 4 of this Agreement, which survive termination indefinitely.</p>

            <h2 id="governing-law">12. Governing Law</h2>
            <p>This Agreement is governed by and construed in accordance with the laws of the State of Alaska, without regard to its conflict of law provisions.</p>

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
