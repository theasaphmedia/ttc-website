export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { sendNotificationEmail } from '@/lib/resend'

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

  // Notify client of new subscriber
  await sendNotificationEmail(
    `New TTC Newsletter Subscriber: ${name || email}`,
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#153093;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="color:white;margin:0;font-size:18px">New Newsletter Subscriber</h2>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">TTC Website</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <tr><td style="padding:8px 14px;font-weight:600;color:#6b7280">Name</td><td style="padding:8px 14px;color:#0d1117">${name || '(not provided)'}</td></tr>
        <tr style="border-top:1px solid #eee"><td style="padding:8px 14px;font-weight:600;color:#6b7280">Email</td><td style="padding:8px 14px;color:#0d1117"><a href="mailto:${email}" style="color:#153093">${email}</a></td></tr>
      </table>
      <p style="color:#9ca3af;font-size:11px;margin-top:12px;text-align:center">Sent from ttconline.org — The Transformation Camp</p>
    </div>
    `,
  )

  return NextResponse.json({ success: true })
}
