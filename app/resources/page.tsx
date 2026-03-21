import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/layout/JsonLd'
import { buildMetadata } from '@/lib/seo'
import ResourceDirectory from '@/components/ui/ResourceDirectory'
import resourcesData from '@/content/resources.json'

export const metadata: Metadata = buildMetadata({
  title: 'Mental Health Resources | Free Support Directory | Project Reach',
  description: 'A curated directory of free and low-cost mental health resources — hotlines, crisis support, anxiety, depression, substance use, and more.',
  canonical: 'https://www.thereachcommunity.com/resources',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thereachcommunity.com/' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.thereachcommunity.com/resources' },
  ],
}

export default function ResourcesPage() {
  return (
    <>
      <JsonLd schema={schema} />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-sm text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true" className="mx-2">›</span>
        <span>Resources</span>
      </nav>

      <main id="main-content">
        <section className="py-12 px-4 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl font-bold text-text-base mb-3">Mental Health Resources</h1>
            <p className="text-text-muted text-lg max-w-2xl">
              A curated list of trusted resources — hotlines, crisis support, peer communities, and tools for anxiety, depression, substance use, and more.
            </p>
            <p className="mt-3 text-sm text-text-muted">
              If you&apos;re in crisis, call or text{' '}
              <a href="tel:988" className="text-primary font-semibold hover:underline">988</a>{' '}
              or text <strong>HOME</strong> to <strong>741741</strong> now.
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ResourceDirectory resources={resourcesData} />
          </div>
        </section>
      </main>
    </>
  )
}
