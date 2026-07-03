'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-border text-white text-sm outline-none placeholder:text-g500 focus:border-teal/50 focus:ring-2 focus:ring-teal/10 transition-colors'

export function LoginForm({ notice }: { notice?: string }) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsPending(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = String(formData.get('email') ?? '')
      const password = String(formData.get('password') ?? '')

      if (!email || !password) {
        setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور')
        setIsPending(false)
        return
      }

      const result = await authClient.signIn.email({
        email,
        password,
      })

      if (result.error) {
        setError(result.error.message || 'فشل تسجيل الدخول')
        setIsPending(false)
        return
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('[v0] Login error:', err)
      setError('حدث خطأ أثناء تسجيل الدخول')
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={isPending}>
      {notice ? (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-300 text-sm">
          {notice}
        </div>
      ) : null}

      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">
          البريد الإلكتروني
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          dir="rtl"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">
          كلمة المرور
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          dir="rtl"
          placeholder="اكتب كلمة المرور"
          className={inputClass}
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-xl bg-teal px-4 py-3.5 font-bold text-bg text-sm transition-transform duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
      </button>
    </form>
  )
}
