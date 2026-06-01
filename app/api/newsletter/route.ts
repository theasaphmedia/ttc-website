export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, name } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

  // Add contact to Brevo
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      attributes: { FIRSTNAME: name?.trim() ?? '' },
      listIds: process.env.BREVO_LIST_ID ? [parseInt(process.env.BREVO_LIST_ID)] : [],
      updateEnabled: true,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    // 400 with code DUPLICATE_PARAMETER means already subscribed — treat as success
    if (err?.code === 'DUPLICATE_PARAMETER') {
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }
    console.error('Brevo subscribe error:', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
