import { NextRequest, NextResponse } from 'next/server'

type AgeGroup = 'under13' | 'minor' | 'adult'

export async function POST(req: NextRequest) {
  let body: { dob?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { dob } = body

  // Expect ISO date string YYYY-MM-DD — nothing else is accepted
  if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
  }

  const today = new Date()
  // Append time to avoid timezone ambiguity
  const birthDate = new Date(dob + 'T00:00:00')

  if (isNaN(birthDate.getTime()) || birthDate >= today) {
    return NextResponse.json({ error: 'Invalid date of birth' }, { status: 400 })
  }

  // Server-side age calculation — DOB is never logged
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  // Sanity check — no one older than 130
  if (age > 130) {
    return NextResponse.json({ error: 'Invalid date of birth' }, { status: 400 })
  }

  let ageGroup: AgeGroup
  if (age < 13) {
    ageGroup = 'under13'
  } else if (age < 18) {
    ageGroup = 'minor'
  } else {
    ageGroup = 'adult'
  }

  // Return classification only — DOB is not stored, logged, or forwarded
  return NextResponse.json({ ageGroup })
}
