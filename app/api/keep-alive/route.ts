export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    // Lightweight query — just fetches 1 row to wake the DB
    const { error } = await supabase
      .from('giving_transactions')
      .select('id')
      .limit(1)

    if (error) {
      console.error('[keep-alive] Supabase ping error:', error.message)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    console.log('[keep-alive] Supabase ping successful at', new Date().toISOString())
    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() })
  } catch (err) {
    console.error('[keep-alive] Unexpected error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
