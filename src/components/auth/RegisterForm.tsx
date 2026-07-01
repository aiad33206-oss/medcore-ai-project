// ═══════════════════════════════════════════════
// MedCore AI — Register Form (client component)
// Copyright © abdoayad
// ═══════════════════════════════════════════════
'use client'

import { useState, useTransition } from 'react'
import { registerAction } from '@/lib/supabase/actions'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await registerAction(formData)
      if (result && 'error' in result) {
        setError(result.error)
      }
      // On success, registerAction redirects server-side — no client code runs after
    })
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">الاسم كامل</label>
        <input
          name="full_name"
          type="text"
          required
          dir="rtl"
          placeholder="اسمك بالكامل"
          className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-border text-white text-sm outline-none focus:border-teal/40 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">البريد الإلكتروني</label>
        <input
          name="email"
          type="email"
          required
          dir="rtl"
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-border text-white text-sm outline-none focus:border-teal/40 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">كلمة المرور</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          dir="rtl"
          placeholder="8 حروف على الأقل"
          className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-border text-white text-sm outline-none focus:border-teal/40 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">السنة الدراسية</label>
        <select
          name="study_year"
          required
          dir="rtl"
          className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-border text-white text-sm outline-none focus:border-teal/40 transition-colors"
        >
          <option value="">اختر السنة</option>
          {[1, 2, 3, 4, 5, 6].map(y => (
            <option key={y} value={y}>السنة {y === 1 ? 'الأولى' : y === 2 ? 'الثانية' : y === 3 ? 'الثالثة' : y === 4 ? 'الرابعة' : y === 5 ? 'الخامسة' : 'السادسة'}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 rounded-lg bg-teal text-bg font-bold text-sm mt-2 disabled:opacity-50 transition-opacity"
      >
        {isPending ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
      </button>
    </form>
  )
}
