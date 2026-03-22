import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const NOTIFY_EMAIL = process.env.VOLUNTEER_NOTIFY_EMAIL ?? 'projectreachplatform@gmail.com'

interface VolunteerPayload {
  name: string
  email: string
  why: string
  experience?: string
  availability: string
  website?: string  // honeypot — must be empty for real submissions
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: VolunteerPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, why, experience, availability, website } = body

  // Honeypot — bots fill hidden fields; real users leave them empty
  if (website) {
    return NextResponse.json({ ok: true })
  }

  if (!name?.trim() || !email?.trim() || !why?.trim() || !availability?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    // Dev mode: log and return success so form works without credentials
    console.log('[volunteer form] RESEND_API_KEY not set — would have sent:', { name, email })
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    // Notify the team
    await resend.emails.send({
      from: 'Project Reach <noreply@thereachcommunity.com>',
      to: NOTIFY_EMAIL,
      subject: `New volunteer application — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Availability: ${availability}`,
        '',
        `Why they want to volunteer:`,
        why,
        experience ? `\nRelevant experience:\n${experience}` : '',
      ].join('\n'),
    })

    // Confirmation to applicant
    await resend.emails.send({
      from: 'Project Reach <noreply@thereachcommunity.com>',
      to: email,
      subject: 'We received your volunteer application — Project Reach',
      text: `Hi ${name},\n\nThank you for applying to volunteer with Project Reach! We've received your application and will be in touch soon.\n\nWith gratitude,\nThe Project Reach Team`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[volunteer form] Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
