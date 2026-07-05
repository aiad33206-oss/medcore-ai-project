'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-border text-white text-sm outline-none placeholder:text-g500 focus:border-teal/50'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsPending(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = String(formData.get('email') ?? '').trim().toLowerCase()
      const password = String(formData.get('password') ?? '')
      const name = String(formData.get('full_name') ?? '').trim()
      const university = String(formData.get('university') ?? '').trim()
      const study_year = String(formData.get('study_year') ?? '')

      if (!email || !password || !name || !university || !study_year) {
        setError('من فضلك اكمل كل الحقول')
        setIsPending(false)
        return
      }

      if (password.length < 8) {
        setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
        setIsPending(false)
        return
      }

      const result = await authClient.signUp.email({
        email,
        password,
        name,
        university,
        study_year,
      } as any)

      if (result.error) {
        setError(result.error.message || 'فشل إنشاء الحساب')
        setIsPending(false)
        return
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('[v0] Registration error:', err)
      setError('حدث خطأ أثناء إنشاء الحساب')
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="full_name"
        placeholder="الاسم الكامل"
        required
        className={inputClass}
      />

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

      <input
        name="email"
        type="email"
        placeholder="البريد الإلكتروني"
        required
        className={inputClass}
      />

      <input
        name="password"
        type="password"
        placeholder="كلمة المرور (8 أحرف على الأقل)"
        minLength={8}
        required
        className={inputClass}
      />

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-teal text-bg font-bold py-3 rounded-xl disabled:opacity-60"
      >
        {isPending ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
      </button>
    </form>
  )
}
