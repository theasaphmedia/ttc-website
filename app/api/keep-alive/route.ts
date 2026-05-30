export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/**
 * Keep-alive endpoint — called by Vercel Cron every 3 days
 * to prevent Supabase free-tier project from auto-pausing.
 */
export async function GET() {
  try {
    const supabase = createServerClient()
    // Lightweight query — just checks the connection is alive
    const { error } = await supabase
      .from('form_submissions')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Keep-alive Supabase error:', error.message)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    console.log('Keep-alive ping: Supabase is active')
    return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
  } catch (err) {
    console.error('Keep-alive error:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
