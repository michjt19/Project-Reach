// sanity/schemas/siteStats.ts
export default {
  name: 'siteStats',
  title: 'Site Statistics',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'peopleSupported', title: 'People Supported', type: 'number', initialValue: 1200 },
    { name: 'volunteerHours', title: 'Volunteer Hours', type: 'number', initialValue: 3400 },
    { name: 'communityMembers', title: 'Community Members', type: 'number', initialValue: 850 },
    { name: 'blogReaders', title: 'Blog Readers', type: 'number', initialValue: 15000 },
  ],
  preview: { select: { title: 'peopleSupported' }, prepare: ({ title }: any) => ({ title: 'Site Statistics', subtitle: `${title} people supported` }) },
}
