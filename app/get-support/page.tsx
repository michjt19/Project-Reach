import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import GetSupportContent from './GetSupportContent'

export const metadata: Metadata = buildMetadata({
  title: 'Get Free Peer Support | Chat & Text | Project Reach',
  description: 'Connect with a caring volunteer listener — no cost, no waitlist, completely anonymous. Live chat and SMS support available 24/7.',
  canonical: 'https://www.thereachcommunity.com/get-support',
})

export default function GetSupportPage() {
  return <GetSupportContent />
}
