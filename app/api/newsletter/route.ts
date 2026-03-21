import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email } = body
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  const listId = process.env.MAILCHIMP_LIST_ID
  const server = process.env.MAILCHIMP_API_SERVER

  if (!apiKey || !listId || !server) {
    // Dev mode: log and return success
    console.log('[newsletter] Mailchimp not configured — would have subscribed:', email)
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
        body: JSON.stringify({ email_address: email, status: 'subscribed' }),
      }
    )

    if (res.status === 400) {
      const data = await res.json()
      // Already subscribed is fine
      if (data.title === 'Member Exists') return NextResponse.json({ ok: true })
      return NextResponse.json({ error: 'Unable to subscribe. Please try again.' }, { status: 400 })
    }

    if (!res.ok) {
      return NextResponse.json({ error: 'Unable to subscribe. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter] Mailchimp error:', err)
    return NextResponse.json({ error: 'Unable to subscribe. Please try again.' }, { status: 500 })
  }
}
