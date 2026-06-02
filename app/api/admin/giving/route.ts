export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('ttc_admin')?.value
  return token === process.env.ADMIN_PASSWORD
}

export async function GET() {
  if (!await isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('giving_transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  console.log('[admin/giving] data count:', data?.length, 'error:', JSON.stringify(error))
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Totals per category
  const totals: Record<string, number> = {}
  let grandTotal = 0
  for (const tx of data ?? []) {
    totals[tx.category] = (totals[tx.category] ?? 0) + Number(tx.amount)
    grandTotal += Number(tx.amount)
  }

  return NextResponse.json({ transactions: data ?? [], totals, grandTotal })
}
