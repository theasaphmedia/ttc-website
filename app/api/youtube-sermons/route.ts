export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { fetchSermons } from '@/lib/youtube'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const pageToken = searchParams.get('pageToken') ?? undefined
    const data = await fetchSermons(pageToken)
    return NextResponse.json(data)
  } catch (err) {
    console.error('youtube-sermons error:', err)
    return NextResponse.json({ error: 'Failed to fetch sermons', sermons: [] }, { status: 500 })
  }
}
