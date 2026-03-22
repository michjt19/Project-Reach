import { Rule } from 'sanity'

// sanity/schemas/post.ts
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: Rule) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r: Rule) => r.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (r: Rule) => r.required().max(200) },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }], options: { list: ['Guide','Resources','Advice','Wellness','Community'] } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
  ],
  orderings: [{ title: 'Published At, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'excerpt' } },
}
