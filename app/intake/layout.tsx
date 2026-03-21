import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Connected | Project Reach',
  description: "Tell us a little about what you're going through, and we'll help connect you with the right support.",
}

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
