import { createClient } from '@supabase/supabase-js'

/** Browser / client-side Supabase client (lazy — safe for client components) */
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

/** Server-side Supabase client (uses service role key — never expose to client) */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key)
}
