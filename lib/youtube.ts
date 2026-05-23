import type { YouTubeSermon } from '@/types'

const CHANNEL_HANDLE = 'jointtc' // without @ for API
const API_KEY = process.env.YOUTUBE_API_KEY ?? ''
const MAX_RESULTS = 20

/* ─── Music detection ─────────────────────────────────────────────── */
const MUSIC_KEYWORDS = [
  'worship', 'praise', 'lift', 'power praise',
  'official video', 'official audio', 'music video', 'lyric video',
  'worship song', 'praise song', 'ft.', 'feat.', 'prod.', '(audio)',
  '(video)', 'sounds of transformation', 'ambience',
]

export function isMusicVideo(title: string, description: string): boolean {
  const text = (title + ' ' + (description ?? '')).toLowerCase()
  return MUSIC_KEYWORDS.some(k => text.includes(k))
}

/* ─── Duration parser ─────────────────────────────────────────────── */
function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ''
  const h = parseInt(match[1] ?? '0')
  const m = parseInt(match[2] ?? '0')
  const s = parseInt(match[3] ?? '0')
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

/* ─── Channel ID resolver ─────────────────────────────────────────── */
async function resolveChannelId(): Promise<string | null> {
  if (!API_KEY) return null
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    return (data.items?.[0]?.id as string) ?? null
  } catch {
    return null
  }
}

/* ─── Shared video fetcher ────────────────────────────────────────── */
type RawItem = {
  id: { videoId: string }
  snippet: {
    title: string
    description: string
    publishedAt: string
    thumbnails: { medium?: { url: string }; high?: { url: string } }
  }
}

async function fetchChannelVideos(
  channelId: string,
  pageToken?: string,
): Promise<{ items: RawItem[]; nextPageToken?: string }> {
  const searchParams = new URLSearchParams({
    part: 'snippet',
    channelId,
    type: 'video',
    order: 'date',
    maxResults: String(MAX_RESULTS),
    key: API_KEY,
    ...(pageToken ? { pageToken } : {}),
  })
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${searchParams}`,
    { next: { revalidate: 21600 } },
  )
  if (!res.ok) throw new Error('YouTube search API error')
  const data = await res.json()
  return { items: data.items ?? [], nextPageToken: data.nextPageToken }
}

async function enrichWithDetails(
  items: RawItem[],
): Promise<YouTubeSermon[]> {
  if (!items.length) return []
  const videoIds = items.map(i => i.id.videoId)
  const detailsParams = new URLSearchParams({
    part: 'contentDetails,statistics',
    id: videoIds.join(','),
    key: API_KEY,
  })
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?${detailsParams}`,
    { next: { revalidate: 21600 } },
  )
  const detailsData = await detailsRes.json()
  const detailsMap: Record<string, { duration: string; viewCount: string }> = {}
  for (const item of detailsData.items ?? []) {
    detailsMap[item.id] = {
      duration: parseDuration(item.contentDetails?.duration ?? ''),
      viewCount: item.statistics?.viewCount ?? '0',
    }
  }
  return items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail:
      item.snippet.thumbnails?.high?.url ??
      item.snippet.thumbnails?.medium?.url ??
      '',
    publishedAt: item.snippet.publishedAt,
    duration: detailsMap[item.id.videoId]?.duration ?? '',
    viewCount: detailsMap[item.id.videoId]?.viewCount ?? '0',
    videoType: isMusicVideo(item.snippet.title, item.snippet.description)
      ? ('music' as const)
      : ('sermon' as const),
  }))
}

/* ─── Purpose sermon search ───────────────────────────────────────
   Searches the TTC channel specifically for "purpose"-themed videos
   and returns up to 2 that aren't already in the main results set.
──────────────────────────────────────────────────────────────────── */
async function fetchPurposeSupplements(
  channelId: string,
  existingIds: Set<string>,
): Promise<YouTubeSermon[]> {
  try {
    const params = new URLSearchParams({
      part: 'snippet',
      channelId,
      q: 'purpose',
      type: 'video',
      order: 'relevance',
      maxResults: '6',
      key: API_KEY,
    })
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params}`,
      { next: { revalidate: 21600 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    const newItems: RawItem[] = (data.items ?? []).filter(
      (item: RawItem) =>
        !existingIds.has(item.id.videoId) &&
        !isMusicVideo(item.snippet.title, item.snippet.description),
    )
    const enriched = await enrichWithDetails(newItems.slice(0, 2))
    return enriched
  } catch {
    return []
  }
}

/* ─── Public API ──────────────────────────────────────────────────── */

/** Fetch sermon videos (non-music) from the TTC channel */
export async function fetchSermons(pageToken?: string): Promise<{
  sermons: YouTubeSermon[]
  nextPageToken?: string
}> {
  if (!API_KEY) {
    console.warn('YOUTUBE_API_KEY not set — returning empty sermon list')
    return { sermons: [] }
  }
  const channelId = await resolveChannelId()
  if (!channelId) {
    console.warn('Could not resolve TTC YouTube channel ID')
    return { sermons: [] }
  }
  const { items, nextPageToken } = await fetchChannelVideos(channelId, pageToken)
  const allVideos = await enrichWithDetails(items)

  // On the first page only, supplement with up to 2 purpose-themed sermons
  // so the grid is always complete (they are deduped against the main results)
  if (!pageToken) {
    const existingIds = new Set(allVideos.map(v => v.id))
    const purposeVideos = await fetchPurposeSupplements(channelId, existingIds)
    return { sermons: [...allVideos, ...purposeVideos], nextPageToken }
  }

  return { sermons: allVideos, nextPageToken }
}

/** Fetch music/worship videos from the TTC channel */
export async function fetchMusicVideos(): Promise<{ videos: YouTubeSermon[] }> {
  if (!API_KEY) {
    console.warn('YOUTUBE_API_KEY not set — returning empty music list')
    return { videos: [] }
  }
  const channelId = await resolveChannelId()
  if (!channelId) return { videos: [] }

  // Fetch a larger set to find music among them
  const searchParams = new URLSearchParams({
    part: 'snippet',
    channelId,
    type: 'video',
    order: 'date',
    maxResults: '50',
    key: API_KEY,
  })
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${searchParams}`,
    { next: { revalidate: 21600 } },
  )
  if (!res.ok) return { videos: [] }
  const data = await res.json()
  const musicItems: RawItem[] = (data.items ?? []).filter((item: RawItem) =>
    isMusicVideo(item.snippet.title, item.snippet.description),
  )
  const videos = await enrichWithDetails(musicItems.slice(0, 12))
  return { videos }
}
