Enter// ═══════════════════════════════════════════════
// MedCore AI — Login Page
// Copyright © abdoayad
// ═══════════════════════════════════════════════

import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata = { title: 'تسجيل الدخول' }

type LoginPageProps = {
  searchParams?: {
    registered?: string
  }
}

const benefits = [
  'ادخل على داشبوردك مباشرة',
  'راجع تقدمك الدراسي من مكان واحد',
  'استعد لإضافة الـ AI Agent لاحقًا',
]

export default function LoginPage({ searchParams }: LoginPageProps) {
  const notice =
    searchParams?.registered === '1'
      ? 'تم إنشاء الحساب بنجاح. الآن سجّل دخولك للمتابعة.'
      : undefined

  return (
    <main className="min-h-screen bg-bg px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet text-xs font-bold text-white font-en">
              AI
            </div>
            <span className="font-en text-2xl font-bold">
              <span className="text-white">Med</span>
              <span className="text-teal">Core</span>
            </span>
          </Link>

          <div className="max-w-xl space-y-4">
            <span className="inline-flex rounded-full border border-border bg-white/[0.03] px-4 py-2 text-xs text-g300">
              تسجيل الدخول • MedCore AI
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              أكمل دخولك
              <br />
              وواصل من حيث توقفت.
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-g300">
              ادخل للحساب لمراجعة بياناتك، والانتقال للداشبورد بشكل مباشر.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-white/[0.03] p-4 text-sm text-g300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card/95 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">تسجيل الدخول</h2>
            <p className="mt-2 text-sm text-g300">
              استخدم البريد الإلكتروني وكلمة المرور
            </p>
          </div>

          <LoginForm notice={notice} />

          <p className="mt-6 text-center text-sm text-g500">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="font-semibold text-teal">
              أنشئ حسابًا
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
