export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .limit(20)

  if (error) return NextResponse.json({ events: [] })
  return NextResponse.json({ events: data ?? [] })
}
