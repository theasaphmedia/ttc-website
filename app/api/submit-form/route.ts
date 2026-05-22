export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendNotificationEmail } from '@/lib/resend'
import type { FormType } from '@/types'

/** Format a field key like "prayer_request" → "Prayer Request" */
function formatKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { form_type, name, email, phone, ...rest } = body as {
      form_type: FormType
      name: string
      email: string
      phone?: string
      [key: string]: unknown
    }

    if (!form_type || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: form_type, name, email' },
        { status: 400 },
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: `Missing env vars — URL: ${!!supabaseUrl}, KEY: ${!!serviceKey}` },
        { status: 500 },
      )
    }

    const supabase = createServerClient()
    const { error } = await supabase.from('form_submissions').insert({
      form_type,
      name,
      email,
      phone: phone ?? null,
      data: rest,
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: `Supabase error: ${error.message}` }, { status: 500 })
    }

    // Build extra rows from remaining fields (subject, message, etc.)
    const extraRows = Object.entries(rest)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => {
        const val = typeof v === 'object' ? JSON.stringify(v) : String(v)
        return `<tr style="border-top:1px solid #eee">
          <td style="padding:8px 14px;font-weight:600;color:#6b7280;white-space:nowrap;vertical-align:top">${formatKey(k)}</td>
          <td style="padding:8px 14px;color:#0d1117;white-space:pre-wrap">${val}</td>
        </tr>`
      })
      .join('')

    await sendNotificationEmail(
      `New TTC Form: ${formatKey(form_type)} from ${name}`,
      `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#153093;padding:20px 24px;border-radius:8px 8px 0 0">
          <h2 style="color:white;margin:0;font-size:18px">New Form Submission</h2>
          <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">${formatKey(form_type)}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
          <tr><td style="padding:8px 14px;font-weight:600;color:#6b7280;white-space:nowrap">Name</td><td style="padding:8px 14px;color:#0d1117">${name}</td></tr>
          <tr style="border-top:1px solid #eee"><td style="padding:8px 14px;font-weight:600;color:#6b7280;white-space:nowrap">Email</td><td style="padding:8px 14px;color:#0d1117"><a href="mailto:${email}" style="color:#153093">${email}</a></td></tr>
          ${phone ? `<tr style="border-top:1px solid #eee"><td style="padding:8px 14px;font-weight:600;color:#6b7280;white-space:nowrap">Phone</td><td style="padding:8px 14px;color:#0d1117">${phone}</td></tr>` : ''}
          ${extraRows}
        </table>
        <p style="color:#9ca3af;font-size:11px;margin-top:12px;text-align:center">Sent from ttconline.org — The Transformation Camp</p>
      </div>
      `,
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('submit-form error:', err)
    return NextResponse.json({ error: `Internal error: ${String(err)}` }, { status: 500 })
  }
}
