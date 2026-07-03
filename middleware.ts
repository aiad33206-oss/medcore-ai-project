import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/client'

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
]

const AUTH_ROUTES = [
  '/login',
  '/register',
]

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/student',
  '/teacher',
  '/admin',
  '/profile',
  '/settings',
]

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)

  // مهم لتحديث الـ session والكوكيز
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // تجاهل ملفات Next والملفات الثابتة
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.match(/\.(.*)$/)
  ) {
    return response
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  const isProtectedRoute = PROTECTED_PREFIXES.some(prefix =>
    pathname.startsWith(prefix)
  )

  // غير مسجل ويحاول يدخل صفحة محمية
  if (!user && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url)

    loginUrl.searchParams.set(
      'next',
      pathname + request.nextUrl.search
    )

    return NextResponse.redirect(loginUrl)
  }

  // مسجل بالفعل ويحاول يدخل Login أو Register
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // صفحات عامة
  if (isPublicRoute) {
    return response
  }

  // أى Route جديد هيعدى عادى حالياً
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
