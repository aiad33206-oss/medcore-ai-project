import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const PUBLIC_ROUTES = [
  '/',
  '/sign-in',
  '/sign-up',
  '/login',
  '/register',
]

const AUTH_ROUTES = [
  '/sign-in',
  '/sign-up',
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
  const pathname = request.nextUrl.pathname

  // تجاهل ملفات Next والملفات الثابتة
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next()
  }

  // التحقق من الجلسة باستخدام Better Auth
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isProtectedRoute = PROTECTED_PREFIXES.some(prefix =>
    pathname.startsWith(prefix)
  )

  // غير مسجل ويحاول يدخل صفحة محمية
  if (!session?.user && isProtectedRoute) {
    const loginUrl = new URL('/sign-in', request.url)
    loginUrl.searchParams.set('next', pathname + request.nextUrl.search)
    return NextResponse.redirect(loginUrl)
  }

  // مسجل بالفعل ويحاول يدخل Login أو Register
  if (session?.user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
