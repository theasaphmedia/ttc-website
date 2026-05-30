export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

function isAuthorized(): boolean {
  const cookieStore = cookies()
  const token = cookieStore.get('ttc_admin')?.value
  return token === process.env.ADMIN_PASSWORD
}

export async function GET() {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('devotionals')
    .select('*')
    .order('published_date', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ devotionals: data })
}

export async function POST(req: NextRequest) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { title, scripture, body: content, author, published_date } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'title and body are required' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('devotionals')
    .insert({ title, scripture, body: content, author, published_date, published: true })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ devotional: data })
}
