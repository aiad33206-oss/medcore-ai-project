// ═══════════════════════════════════════════════
// MedCore AI — Supabase Client
// Copyright © 2025 abdoayad
// ═══════════════════════════════════════════════

import { createBrowserClient } from '@supabase/ssr'
import { createServerClient as createSSRClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createSupabaseServiceClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ── BROWSER CLIENT ────────────────────────────
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

// ── SERVER CLIENT (App Router) ────────────────
export function createServerClient() {
  const cookieStore = cookies()
  return createSSRClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value },
      set(name: string, value: string, options: CookieOptions) {
        try { cookieStore.set({ name, value, ...options }) } catch {}
      },
      remove(name: string, options: CookieOptions) {
        try { cookieStore.set({ name, value: '', ...options }) } catch {}
      },
    },
  })
}

// ── MIDDLEWARE CLIENT ─────────────────────────
export function createMiddlewareClient(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })
  const supabase = createSSRClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) { return request.cookies.get(name)?.value },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options })
        response = NextResponse.next({ request: { headers: request.headers } })
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options })
        response = NextResponse.next({ request: { headers: request.headers } })
        response.cookies.set({ name, value: '', ...options })
      },
    },
  })
  return { supabase, response }
}

// ── SERVICE ROLE CLIENT (Server only) ─────────
export function createServiceClient() {
  return createSupabaseServiceClient(
    SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
