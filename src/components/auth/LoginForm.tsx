// ═══════════════════════════════════════════════
// MedCore AI — Login Form (client component)
// Copyright © abdoayad
// ═══════════════════════════════════════════════

'use client'

import { useState } from 'react'
import { loginAction } from '@/lib/supabase/actions'

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-border text-white text-sm outline-none placeholder:text-g500 focus:border-teal/50 focus:ring-2 focus:ring-teal/10 transition-colors'

export function LoginForm({ notice }: { notice?: string }) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setIsPending(true)

    try {
      const result = await loginAction(formData)

      if (result && 'error' in result) {
        setError(result.error)
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4" aria-busy={isPending}>
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
