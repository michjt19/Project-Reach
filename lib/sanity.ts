import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return null
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  const client = getSanityClient()
  if (!client) return { url: () => '' }
  return imageUrlBuilder(client).image(source)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  categories: string[]
  body: PortableTextBlock[]
  estimatedReadingTime: number
}

export interface BlogPostSummary {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  categories: string[]
  estimatedReadingTime: number
}

// Portable Text block type (minimal — full type lives in @portabletext/react)
export interface PortableTextBlock {
  _type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// ─── Queries ──────────────────────────────────────────────────────────────────

const postSummaryFields = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  categories,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
`

/** All posts for blog index, newest first */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const client = getSanityClient()
  if (!client) return []
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postSummaryFields} }`
  )
}

/** Single post by slug */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const client = getSanityClient()
  if (!client) return null
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postSummaryFields},
      body
    }`,
    { slug }
  )
}

/** All slugs — used by generateStaticParams */
export async function getAllPostSlugs(): Promise<string[]> {
  const client = getSanityClient()
  if (!client) return []
  const results: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "post"] { slug }`
  )
  return results.map((r) => r.slug.current)
}

/** Related posts by shared category, excluding current slug, max 3 */
export async function getRelatedPosts(slug: string, categories: string[]): Promise<BlogPostSummary[]> {
  const client = getSanityClient()
  if (!client || categories.length === 0) return []
  return client.fetch(
    `*[_type == "post" && slug.current != $slug && count(categories[@ in $categories]) > 0]
    | order(publishedAt desc)[0..2] { ${postSummaryFields} }`,
    { slug, categories }
  )
}

// ─── Site Stats ────────────────────────────────────────────────────────────

export interface SiteStats {
  peopleSupported: number
  volunteerHours: number
  communityMembers: number
  blogReaders: number
}

const DEFAULT_STATS: SiteStats = {
  peopleSupported: 1200,
  volunteerHours: 3400,
  communityMembers: 850,
  blogReaders: 15000,
}

/** Singleton site-wide stats — falls back to defaults if Sanity not configured */
export async function getSiteStats(): Promise<SiteStats> {
  const client = getSanityClient()
  if (!client) return DEFAULT_STATS
  try {
    const stats = await client.fetch<SiteStats | null>(
      `*[_type == "siteStats"][0] { peopleSupported, volunteerHours, communityMembers, blogReaders }`
    )
    return stats ?? DEFAULT_STATS
  } catch {
    return DEFAULT_STATS
  }
}

// ─── Team Members ───────────────────────────────────────────────────────────

export interface TeamMember {
  _id?: string  // optional — static fallback data has no Sanity _id
  name: string
  role: string
  bio?: string
  group?: string
  photo?: { asset: { _ref: string }; hotspot?: object }
}

/** All team members ordered by display order field */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = getSanityClient()
  if (!client) return []
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) { _id, name, role, bio, group, photo }`
  )
}
