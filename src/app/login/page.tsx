// ═══════════════════════════════════════════════
// MedCore AI — Login Page
// Copyright © abdoayad
// ═══════════════════════════════════════════════

import { LoginForm } from '@/components/auth/LoginForm'
import { Card } from '@/components/ui/card'

export const metadata = { title: 'تسجيل الدخول' }

const NAVY = '#0D1B3D'
const TEAL = '#00B894'

type LoginPageProps = {
  searchParams?: {
    registered?: string
  }
}

function LogoMark({ light }: { light?: boolean }) {
  return (
    <span className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <span style={{ color: light ? '#fff' : NAVY }}>Med</span>
      <span style={{ color: TEAL }}>Core</span>
    </span>
  )
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const notice =
    searchParams?.registered === '1'
      ? 'تم إنشاء الحساب بنجاح. الآن سجّل دخولك للمتابعة.'
      : undefined

  return (
    <main className="min-h-screen w-full flex" dir="rtl" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Branding panel — hidden below lg, per the approved brief */}
      <div
        className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: `linear-gradient(150deg, ${NAVY} 0%, #123a63 45%, ${TEAL} 135%)` }}
      >
        <div
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: TEAL, top: '-10%', left: '-15%' }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{ background: '#4dd4ac', bottom: '-5%', right: '-10%' }}
        />

        <LogoMark light />

        <div className="relative z-10 space-y-6 mt-10">
          <h1 className="text-3xl font-bold text-white leading-snug">
            تعلم بعمق.
            <br />
            طبّق بثقة.
            <br />
            <span style={{ color: '#8ff5d6' }}>انقذ حياة.</span>
          </h1>
        </div>

        <p className="relative z-10 text-xs" style={{ color: '#bcd4d0' }}>
          © 2026 MedCore
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex lg:hidden justify-center mb-8">
            <LogoMark />
          </div>

          <Card className="border-none shadow-none lg:border lg:shadow-sm lg:p-8 lg:rounded-3xl p-0">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
                تسجيل الدخول
              </h2>
              <p className="mt-2 text-sm text-gray-500">استخدم بريدك الإلكتروني وكلمة المرور</p>
            </div>

            <LoginForm notice={notice} />
          </Card>
        </div>
      </div>
    </main>
  )
}
