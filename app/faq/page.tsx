import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import FaqContent from './FaqContent'

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions | Project Reach',
  description: 'Answers to common questions about Project Reach — how peer support works, who can use it, privacy, and how to get involved.',
  canonical: 'https://www.thereachcommunity.com/faq',
})

export default function FaqPage() {
  return <FaqContent />
}
