import { staticBlogPosts, type StaticPost } from '@/content/blog/posts'

export type { StaticPost }

export function getStaticPost(slug: string): StaticPost | null {
  return staticBlogPosts.find((p) => p.slug === slug) ?? null
}

export function getStaticPosts(): StaticPost[] {
  return staticBlogPosts
}
