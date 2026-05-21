export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? ''
export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY ?? ''

/** Verify a Paystack transaction server-side */
export async function verifyPaystackTransaction(reference: string) {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )
  if (!res.ok) throw new Error(`Paystack verify failed: ${res.statusText}`)
  const json = await res.json()
  return json.data as {
    status: string
    amount: number
    currency: string
    reference: string
    customer: { email: string; first_name: string; last_name: string }
    metadata: Record<string, unknown>
  }
}
