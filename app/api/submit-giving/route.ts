export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { verifyPaystackTransaction } from '@/lib/paystack'

export async function POST(req: NextRequest) {
  try {
    const { reference } = (await req.json()) as { reference: string }

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
    }

    const tx = await verifyPaystackTransaction(reference)

    if (tx.status !== 'success') {
      return NextResponse.json({ error: 'Transaction not successful' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: existing } = await supabase
      .from('giving_transactions')
      .select('id')
      .eq('paystack_reference', reference)
      .single()

    if (existing) {
      return NextResponse.json({ success: true, message: 'Already recorded' })
    }

    const { error } = await supabase.from('giving_transactions').insert({
      name: `${tx.customer.first_name} ${tx.customer.last_name}`.trim() || tx.customer.email,
      email: tx.customer.email,
      amount: tx.amount, // store in kobo as INTEGER
      category: (tx.metadata?.category as string) ?? 'offering',
      paystack_reference: reference,
      status: 'success',
    })

    if (error) {
      console.error('Supabase giving insert error:', error)
      return NextResponse.json({ error: 'Failed to record giving' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('submit-giving error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
