// ═══════════════════════════════════════════════
// MedCore AI — Register Page
// Copyright © abdoayad
// ═══════════════════════════════════════════════

import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata = { title: 'إنشاء حساب' }

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-bg relative overflow-hidden">
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          top: '50%', left: '50%', transform: 'translate(-60%,-50%)',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-violet flex items-center justify-center text-xs font-bold text-white font-en">
              AI
            </div>
            <span className="font-en font-bold text-xl">
              <span className="text-white">Med</span>
              <span className="text-teal">Core</span>
            </span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-10">
          <h1 className="text-2xl font-bold text-center mb-2">أنشئ حسابك</h1>
          <p className="text-g300 text-sm text-center mb-8">
            انضم لطلاب الأزهر على MedCore AI
          </p>

          <RegisterForm />

          <p className="text-center text-g500 text-sm mt-6">
            عندك حساب؟{' '}
            <Link href="/login" className="text-teal font-semibold">
              سجل دخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
