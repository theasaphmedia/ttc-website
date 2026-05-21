import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendNotificationEmail } from '@/lib/resend'
import type { FormType } from '@/types'

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
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    // Fire-and-forget notification email
    await sendNotificationEmail(
      `New TTC Form: ${form_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} from ${name}`,
      `
        <h2 style="font-family:sans-serif">New submission: ${form_type}</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          <tr><td style="padding:6px 12px;font-weight:bold">Name</td><td style="padding:6px 12px">${name}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px">${email}</td></tr>
          ${phone ? `<tr><td style="padding:6px 12px;font-weight:bold">Phone</td><td style="padding:6px 12px">${phone}</td></tr>` : ''}
          ${Object.entries(rest)
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 12px;font-weight:bold">${k}</td><td style="padding:6px 12px">${String(v)}</td></tr>`,
            )
            .join('')}
        </table>
      `,
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('submit-form error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
