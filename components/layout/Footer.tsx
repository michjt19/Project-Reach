import Link from 'next/link'
import Image from 'next/image'

const navColumns = [
  {
    heading: 'Navigate',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/get-support', label: 'Get Support' },
      { href: '/resources', label: 'Resources' },
      { href: '/volunteer', label: 'Volunteer' },
      { href: '/blog', label: 'Blog' },
      { href: '/impact', label: 'Our Impact' },
      { href: '/faq', label: 'FAQ' },
      { href: '/community', label: 'Community' },
      { href: '/team', label: 'Our Team' },
    ],
  },
  {
    heading: 'Legal & Conduct',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/code-of-conduct', label: 'Code of Conduct' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-surface border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Project Reach Home" className="inline-block mb-4">
              <Image
                src="/assets/reach-logo.png"
                alt="Project Reach logo"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              A quiet place to be heard. Peer support for emotional well-being —
              no judgment, no waitlists.
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.tiktok.com/@thereachcommunity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok — @thereachcommunity"
                className="text-text-muted hover:text-primary transition-colors duration-150 text-sm"
              >
                TikTok
              </a>
              <a
                href="https://www.facebook.com/people/The-Reach-Community/61580683322402/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook — The Reach Community"
                className="text-text-muted hover:text-primary transition-colors duration-150 text-sm"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/the_reach_community/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — @the_reach_community"
                className="text-text-muted hover:text-primary transition-colors duration-150 text-sm"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-heading text-sm font-semibold text-text-base uppercase tracking-wide mb-3">
                {col.heading}
              </h4>
              <ul className="space-y-2 list-none m-0 p-0">
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-muted hover:text-primary transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow Us column */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-text-base uppercase tracking-wide mb-3">
              Follow Us
            </h4>
            <p className="text-sm text-text-muted mb-3 leading-relaxed">
              Stay connected with the Project Reach community.
            </p>
            <ul className="space-y-2 list-none m-0 p-0">
              <li>
                <a href="https://www.tiktok.com/@thereachcommunity" target="_blank" rel="noopener noreferrer"
                   className="text-sm text-text-muted hover:text-primary transition-colors duration-150">
                  TikTok — @thereachcommunity
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/people/The-Reach-Community/61580683322402/" target="_blank" rel="noopener noreferrer"
                   className="text-sm text-text-muted hover:text-primary transition-colors duration-150">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/the_reach_community/" target="_blank" rel="noopener noreferrer"
                   className="text-sm text-text-muted hover:text-primary transition-colors duration-150">
                  Instagram — @the_reach_community
                </a>
              </li>
            </ul>
          </div>

          {/* Crisis & Contact column */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-text-base uppercase tracking-wide mb-3">
              Crisis &amp; Support
            </h4>

            {/* Phone */}
            <a
              href="sms:+19014921712"
              className="block text-primary font-semibold text-sm mb-3 hover:underline"
              title="Text from your phone"
            >
              +1 (901) 492-1712
            </a>

            {/* Crisis resources — mandatory */}
            <div
              className="rounded-md bg-warning-bg border border-warning-border p-3 text-xs text-warning-text leading-relaxed"
              role="note"
              aria-label="Crisis resources"
            >
              <p className="font-semibold mb-1">If you&apos;re in crisis:</p>
              <ul className="list-none m-0 p-0 space-y-1">
                <li>
                  <a
                    href="tel:988"
                    className="hover:underline font-medium"
                  >
                    Call or Text 988
                  </a>
                </li>
                <li>
                  Text <strong>HOME</strong> to{' '}
                  <a
                    href="sms:741741?&body=HOME"
                    className="hover:underline font-medium"
                  >
                    741741
                  </a>
                </li>
                <li>
                  <a href="tel:911" className="hover:underline font-medium">
                    Call 911
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-text-muted">
          <span>&copy; 2026 Project Reach. All rights reserved.</span>
          <span>Peer support only — not a substitute for professional care.</span>
        </div>
      </div>
    </footer>
  )
}
