export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('devotionals')
    .select('*')
    .eq('published', true)
    .order('published_date', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ devotionals: [] })
  return NextResponse.json({ devotionals: data ?? [] })
}
