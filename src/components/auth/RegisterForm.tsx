// ═══════════════════════════════════════════════
// MedCore AI — Register Form (client component)
// Copyright © abdoayad
// ═══════════════════════════════════════════════

'use client'

import { useState, useTransition } from 'react'
import { registerAction } from '@/lib/supabase/actions'

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-border text-white text-sm outline-none placeholder:text-g500 focus:border-teal/50'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData: FormData) => {
        setError(null)

        startTransition(async () => {
          const result = await registerAction(formData)

          if (result && 'error' in result) {
            setError(result.error)
          }
        })
      }}
      className="flex flex-col gap-4"
    >

      <input name="full_name" placeholder="الاسم الكامل" required className={inputClass} />

      <input
        name="university"
        defaultValue="Al-Azhar University"
        placeholder="الجامعة"
        required
        className={inputClass}
      />

      <select name="study_year" required className={inputClass}>
        <option value="">اختر السنة</option>
        <option value="1">الأولى</option>
        <option value="2">الثانية</option>
        <option value="3">الثالثة</option>
        <option value="4">الرابعة</option>
        <option value="5">الخامسة</option>
        <option value="6">السادسة</option>
      </select>

      <input name="email" type="email" placeholder="البريد الإلكتروني" required className={inputClass} />

      <input name="password" type="password" placeholder="كلمة المرور" minLength={8} required className={inputClass} />

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        disabled={isPending}
        className="w-full bg-teal text-bg font-bold py-3 rounded-xl disabled:opacity-60"
      >
        {isPending ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
      </button>

    </form>
  )
}
