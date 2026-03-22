import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import VolunteerContent from './VolunteerContent'

export const metadata: Metadata = buildMetadata({
  title: 'Volunteer as a Peer Listener | Project Reach',
  description: 'Become a volunteer peer listener with Project Reach. No clinical experience needed — just empathy, time, and a willingness to listen.',
  canonical: 'https://www.thereachcommunity.com/volunteer',
})

export default function VolunteerPage() {
  return <VolunteerContent />
}
