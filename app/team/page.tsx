import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { getTeamMembers, urlFor, type TeamMember } from '@/lib/sanity'
import teamJson from '@/content/team.json'

export const metadata: Metadata = buildMetadata({
  title: 'Our Team | Project Reach',
  description: 'Meet the volunteers and team behind Project Reach — people who show up because they care.',
  canonical: 'https://www.thereachcommunity.com/team',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Our Team', item: 'https://www.thereachcommunity.com/team' },
  ],
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key] ?? 'Team')
    return { ...acc, [k]: [...(acc[k] ?? []), item] }
  }, {} as Record<string, T[]>)
}

function getInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).map(w => w.charAt(0)).slice(0, 2).join('')
}

export default async function TeamPage() {
  let members: TeamMember[] = []
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try { members = await getTeamMembers() } catch { /* use fallback */ }
  }
  const displayData: TeamMember[] = members.length > 0 ? members : (teamJson as unknown as TeamMember[])
  const groups = groupBy(displayData, 'group')

  return (
    <>
      <JsonLd schema={schema} />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Our Team</span>
      </nav>

      <main id="main-content">
        <section className="bg-primary text-white py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-lg opacity-90">
              Real people who show up because they care — trained volunteers and coordinators committed to free peer support.
            </p>
          </div>
        </section>

        {Object.entries(groups).map(([groupName, groupMembers]) => (
          <section key={groupName} className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-text-base mb-8 text-center">{groupName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupMembers.map((member) => (
                  <div key={member._id ?? member.name} className="bg-surface border border-border rounded-xl p-6 text-center">
                    {/* Photo or initials avatar */}
                    {member.photo ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                        <Image
                          src={(urlFor(member.photo) as ReturnType<typeof import('@sanity/image-url').default>).width(160).height(160).url()}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="font-heading text-xl font-bold text-primary">{getInitials(member.name)}</span>
                      </div>
                    )}
                    <h3 className="font-heading text-lg font-bold text-text-base mb-1">{member.name}</h3>
                    <p className="text-sm text-accent font-semibold mb-3">{member.role}</p>
                    {member.bio && <p className="text-sm text-text-muted leading-relaxed">{member.bio}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-16 px-4 bg-background border-t border-border text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-text-base mb-4">Want to join the team?</h2>
            <p className="text-text-muted mb-6">We&apos;re always looking for compassionate listeners to volunteer with us.</p>
            <Link
              href="/volunteer"
              className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Become a Volunteer
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
