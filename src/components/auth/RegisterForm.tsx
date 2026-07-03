// ═══════════════════════════════════════════════
// MedCore AI — Register Form (client component)
// Copyright © abdoayad
// ═══════════════════════════════════════════════

'use client'

import { useState } from 'react'
import { registerAction } from '@/lib/supabase/actions'

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-border text-white text-sm outline-none placeholder:text-g500 focus:border-teal/50 focus:ring-2 focus:ring-teal/10 transition-colors'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setIsPending(true)

    try {
      const result = await registerAction(formData)

      if (result && 'error' in result) {
        setError(result.error)
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4" aria-busy={isPending}>
      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">
          الاسم كامل
        </label>
        <input
          name="full_name"
          type="text"
          required
          autoComplete="name"
          dir="rtl"
          placeholder="اسمك بالكامل"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">
          الجامعة
        </label>
        <input
          name="university"
          type="text"
          required
          autoComplete="organization"
          dir="rtl"
          defaultValue="Al-Azhar University"
          placeholder="مثال: Al-Azhar University"
          className={inputClass}
        />
        <p className="mt-2 text-xs text-g500">
          سيظهر هذا الاسم داخل الملف الشخصي والداشبورد.
        </p>
      </div>

      <div>
        <label className="block text-sm text-g300 mb-2 font-medium">
          السنة الدراسية
        </label>
        <select
          name="study_year"
          required
          defaultValue=""
          dir="rtl"
          className={inputClass}
        >
          <option value="" className="bg-card">
            اختر السنة
          </option>
          <option value="1" className="bg-card">السنة الأولى</option>
          <option value="2" className="bg-card">السنة الثانية</option>
          <option value="3" className="bg-card">السنة الثالثة</option>
          <option value="4" className="bg-card">السنة الرابعة</option>
          <option value="5" className="bg-card">السنة الخامسة</option>
          <option value="6" className="bg-card">السنة السادسة</option>
        </select>
      </div>

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
          minLength={8}
          autoComplete="new-password"
          dir="rtl"
          placeholder="8 حروف على الأقل"
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
        {isPending ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
      </button>
    </form>
  )
}
