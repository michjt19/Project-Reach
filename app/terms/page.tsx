import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service | Project Reach',
  description: 'Terms of Service for Project Reach. Understand your rights, our responsibilities, eligibility requirements, and the guidelines for using our free peer support platform.',
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
          <p className="text-text-muted text-lg">Please read these terms carefully before using Project Reach.</p>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
          <nav className="lg:w-56 shrink-0" aria-label="Page sections">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-text-base mb-3">On this page</h3>
            <ul className="space-y-1 text-sm list-none p-0 m-0">
              {[
                ['#acceptance', '1. Acceptance'],
                ['#services', '2. Description of Services'],
                ['#no-professional', '3. No Professional Services'],
                ['#eligibility', '4. Eligibility'],
                ['#acceptable-use', '5. Acceptable Use'],
                ['#volunteers', '6. Volunteer Listeners'],
                ['#third-party', '7. Third-Party Services'],
                ['#ip', '8. Intellectual Property'],
                ['#warranties', '9. Disclaimer of Warranties'],
                ['#liability', '10. Limitation of Liability'],
                ['#indemnification', '11. Indemnification'],
                ['#governing-law', '12. Governing Law'],
                ['#changes', '13. Changes to Terms'],
                ['#severability', '14. Severability'],
                ['#contact', '15. Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-text-muted hover:text-primary transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-lg max-w-none flex-1">
            <p className="text-sm text-text-muted mb-8">Effective Date: March 22, 2026 &nbsp;·&nbsp; Last Updated: March 22, 2026</p>

            <h2 id="acceptance">1. Acceptance of Terms</h2>
            <p>By accessing or using the website located at thereachcommunity.com (the &ldquo;Site&rdquo;) or any services offered through the Site (collectively, the &ldquo;Services&rdquo;), you (&ldquo;User&rdquo;) agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms in their entirety, you must discontinue use of the Site immediately.</p>
            <p>These Terms constitute a legally binding agreement between you and ReachCommunity (&ldquo;ReachCommunity,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a nonprofit peer support organization.</p>

            <h2 id="services">2. Description of Services</h2>
            <p>ReachCommunity provides the following services through the Site:</p>
            <ul>
              <li><strong>Peer Support Chat</strong> — A live text-based chat service connecting users with trained volunteer listeners. Volunteer listeners are not licensed mental health professionals, therapists, counselors, social workers, or medical providers of any kind.</li>
              <li><strong>SMS Support</strong> — Users may initiate text-based support by contacting our SMS line at +1 (901) 492-1712. This is a separate channel from live chat and is not managed through this website.</li>
              <li><strong>Crisis Resource Referrals</strong> — Links to and information about crisis support services operated by third parties, including the 988 Suicide and Crisis Lifeline and Crisis Text Line. These are independently operated services. ReachCommunity has no affiliation, endorsement relationship, or control over them.</li>
              <li><strong>Volunteer Application</strong> — An application mechanism for individuals wishing to serve as volunteer listeners.</li>
              <li><strong>Mental Health Resource Directory</strong> — A curated list of links to third-party mental health resources. We do not independently vet, endorse, or maintain any listed resource.</li>
              <li><strong>Community Forum</strong> — A link to an externally hosted community discussion forum at thereachcommunity.discourse.group. The forum is a separate platform governed by its own terms of service.</li>
            </ul>

            <h2 id="no-professional">3. No Professional Services</h2>
            <p><strong>The Services are not a substitute for professional mental health care, medical care, or crisis intervention.</strong></p>
            <p>Volunteer listeners are laypersons providing peer emotional support only. Nothing provided through the Services constitutes mental health counseling or therapy, psychiatric diagnosis or treatment, medical advice, social work services, legal advice, or crisis intervention by trained crisis counselors.</p>
            <p>If you are experiencing a mental health emergency, suicidal ideation, or risk of harm to yourself or others, contact emergency services immediately:</p>
            <ul>
              <li><strong>Call or text 988</strong> — Suicide and Crisis Lifeline</li>
              <li><strong>Text HOME to 741741</strong> — Crisis Text Line</li>
              <li><strong>Call 911</strong> or go to your nearest emergency room</li>
            </ul>

            <h2 id="eligibility">4. Eligibility</h2>
            <p><strong>You must be at least 13 years of age to use this platform.</strong> Use by anyone under the age of 13 is strictly prohibited. If you are under 13, do not use our chat service or submit any information through this Site. We require an affirmative age confirmation during the support intake process.</p>
            <p>If you are between 13 and 17 years of age, you may use this platform only with the knowledge and awareness of a parent or legal guardian. By using this Site, users aged 13–17 represent that a parent or guardian is aware of their use.</p>

            <h2 id="acceptable-use">5. Acceptable Use</h2>
            <p>You agree not to use the Site or Services to:</p>
            <ul>
              <li>Harass, threaten, intimidate, or harm volunteer listeners or other users;</li>
              <li>Impersonate any person or entity;</li>
              <li>Transmit spam, malware, or other harmful content;</li>
              <li>Solicit volunteer listeners for personal relationships, commercial services, or off-platform contact;</li>
              <li>Attempt to extract personally identifiable information from volunteer listeners;</li>
              <li>Use the Services for any commercial purpose without our written consent;</li>
              <li>Post or transmit content that promotes violence or discrimination on the basis of race, ethnicity, religion, gender, sexual orientation, disability, or any other protected characteristic;</li>
              <li>Transmit any content that sexualizes minors, in any form;</li>
              <li>Circumvent, disable, or interfere with security-related features of the Site;</li>
              <li>Use automated scripts, bots, or scraping tools to access the Site.</li>
            </ul>
            <p>Violations of this section may result in termination of chat access, reporting to applicable law enforcement, and civil or criminal liability where applicable. ReachCommunity reserves the right to take any action it deems appropriate in response to a violation, without prior notice.</p>

            <h2 id="volunteers">6. Volunteer Listeners</h2>
            <p>Volunteer listeners are independent volunteers, not employees or agents of ReachCommunity. We do not warrant the accuracy, completeness, or fitness of any information communicated by volunteer listeners. ReachCommunity is not responsible for the conduct of volunteer listeners outside the scope of their peer support role.</p>

            <h2 id="third-party">7. Third-Party Services and Links</h2>
            <p>The Site integrates third-party services including Tawk.to (chat infrastructure), Google Analytics (usage analytics, subject to your consent), and Resend (email delivery for volunteer applications). The Site also links to external mental health resources, crisis services, and a community forum. Your use of those services and links is subject to their respective terms and privacy policies. We have no control over and assume no responsibility for the content, practices, or availability of any third-party service.</p>

            <h2 id="ip">8. Intellectual Property</h2>
            <p>All content on the Site, including text, graphics, logos, and code, is owned by or licensed to ReachCommunity and is protected by applicable copyright and intellectual property law. You may not reproduce, distribute, or create derivative works from Site content without our prior written permission.</p>

            <h2 id="warranties">9. Disclaimer of Warranties</h2>
            <p><strong>The Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty of any kind, express or implied. To the fullest extent permitted by law, ReachCommunity disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted or error-free operation.</strong></p>
            <p>We do not warrant that the Site will be available at any particular time, that volunteer listeners will respond within any particular timeframe, that the Services will meet your mental health needs, or that information provided by volunteer listeners will be accurate or appropriate for your situation.</p>

            <h2 id="liability">10. Limitation of Liability</h2>
            <p><strong>To the fullest extent permitted by applicable law, ReachCommunity, its officers, directors, employees, and volunteers shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages arising out of or related to your use of the Services, including but not limited to damages for emotional distress, loss of data, or personal injury, even if we have been advised of the possibility of such damages.</strong></p>
            <p><strong>Our total cumulative liability to you for any claim arising out of these Terms or the Services shall not exceed one hundred dollars ($100.00).</strong></p>
            <p>Some jurisdictions do not permit the exclusion or limitation of certain damages. In such jurisdictions, our liability is limited to the greatest extent permitted by law.</p>

            <h2 id="indemnification">11. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless ReachCommunity and its officers, directors, employees, and volunteers from and against any claims, liabilities, damages, losses, and expenses — including reasonable legal fees — arising from your use of the Services, your violation of these Terms, or your violation of any third-party right.</p>

            <h2 id="governing-law">12. Governing Law &amp; Jurisdiction</h2>
            <p>These Terms are governed by and construed in accordance with the laws of the State of Alaska, without regard to its conflict of law provisions. Any dispute arising from or relating to these Terms or your use of this platform shall be resolved exclusively in the state or federal courts located in Alaska, and you consent to the personal jurisdiction of those courts.</p>

            <h2 id="changes">13. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will post the revised Terms with an updated effective date. Continued use of the Site after changes constitutes acceptance of the revised Terms.</p>

            <h2 id="severability">14. Severability</h2>
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect. These Terms, together with our <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookies">Cookie Policy</Link>, constitute the entire agreement between you and ReachCommunity with respect to the Services.</p>

            <h2 id="contact">15. Contact</h2>
            <p>Questions or concerns? Email us at <a href="mailto:projectreachplatform@gmail.com">projectreachplatform@gmail.com</a>.</p>

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
