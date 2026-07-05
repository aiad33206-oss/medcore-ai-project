'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-border text-white text-sm outline-none placeholder:text-g500 focus:border-teal/50'

const buttonClass =
  'w-full px-4 py-3 rounded-xl bg-teal text-bg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === 'sign-up'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = isSignUp
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password })

      const error = response?.error
      setLoading(false)

      if (error) {
        setError((error as any)?.message ?? 'Something went wrong')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setLoading(false)
      setError((err as any)?.message ?? 'Something went wrong')
    }
  }

  return (
    <div className="min-h-svh bg-bg flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card/95 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">
              {isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </h1>
            <p className="text-sm text-g300 mt-2">
              {isSignUp
                ? 'انضم إلى منصتنا الآن'
                : 'رحباً بعودتك'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className={inputClass}
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={inputClass}
                placeholder="example@email.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={buttonClass}>
              {loading
                ? 'جاري المعالجة...'
                : isSignUp
                  ? 'إنشاء حساب'
                  : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="text-sm text-g300 text-center mt-6">
            {isSignUp ? 'لديك حساب بالفعل؟ ' : 'ليس لديك حساب؟ '}
            <Link
              href={isSignUp ? '/sign-in' : '/sign-up'}
              className="text-teal font-semibold hover:underline"
            >
              {isSignUp ? 'سجل دخول' : 'أنشئ حسابًا'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
