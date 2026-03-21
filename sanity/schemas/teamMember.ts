// sanity/schemas/teamMember.ts
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (r: any) => r.required() },
    { name: 'role', title: 'Role / Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'bio', title: 'Bio', type: 'text', rows: 4 },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number', description: 'Lower numbers appear first' },
    { name: 'group', title: 'Group', type: 'string', options: { list: ['Leadership','Volunteer Coordinator','Advisor','Board'] } },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
}
