export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('ttc_admin')?.value
  return token === process.env.ADMIN_PASSWORD
}

const BREVO_API = 'https://api.brevo.com/v3'

function brevoHeaders() {
  return {
    'accept': 'application/json',
    'api-key': process.env.BREVO_API_KEY ?? '',
    'content-type': 'application/json',
  }
}

// GET — fetch all subscribers from list #2
export async function GET() {
  if (!await isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const listId = process.env.BREVO_LIST_ID ?? '2'
  const res = await fetch(
    `${BREVO_API}/contacts/lists/${listId}/contacts?limit=500&offset=0`,
    { headers: brevoHeaders() }
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('Brevo fetch error:', err)
    return NextResponse.json({ subscribers: [] })
  }

  const data = await res.json()
  const subscribers = (data.contacts ?? []).map((c: Record<string, unknown>) => ({
    email: c.email,
    name: (c.attributes as Record<string, string>)?.FIRSTNAME ?? '',
    createdAt: c.createdAt,
    emailBlacklisted: c.emailBlacklisted,
  }))

  return NextResponse.json({ subscribers, total: data.count ?? subscribers.length })
}

// DELETE — remove a subscriber from Brevo
export async function DELETE(req: NextRequest) {
  if (!await isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const listId = process.env.BREVO_LIST_ID ?? '2'

  // Remove from list
  const res = await fetch(`${BREVO_API}/contacts/lists/${listId}/contacts/remove`, {
    method: 'POST',
    headers: brevoHeaders(),
    body: JSON.stringify({ emails: [email] }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
