import { NextResponse } from 'next/server'
import { fetchMusicVideos } from '@/lib/youtube'

export const revalidate = 21600 // 6 hours

export async function GET() {
  try {
    const data = await fetchMusicVideos()
    return NextResponse.json(data)
  } catch (err) {
    console.error('youtube-music error:', err)
    return NextResponse.json({ error: 'Failed to fetch music videos', videos: [] }, { status: 500 })
  }
}
