// ═══════════════════════════════════════════════
// MedCore AI — Login Form (client component)
// Copyright © abdoayad
// ═══════════════════════════════════════════════

'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginAction } from '@/lib/supabase/actions'

const TEAL = '#00B894'

type LoginFormProps = {
  notice?: string
}

export function LoginForm({ notice }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData: FormData) => {
        setError(null)
        startTransition(async () => {
          const result = await loginAction(formData)
          if (result && 'error' in result) {
            setError(result.error)
          }
        })
      }}
      className="space-y-5"
    >
      {notice && (
        <Alert className="border-teal-200 bg-teal-50 rounded-xl">
          <AlertDescription className="text-sm" style={{ color: '#00725b' }}>
            {notice}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50 rounded-xl">
          <AlertDescription className="text-sm text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="h-11 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="h-11 rounded-xl pl-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
            aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 rounded-xl font-semibold text-white"
        style={{ backgroundColor: '#0D1B3D' }}
      >
        {isPending ? 'جاري التحقق...' : 'تسجيل الدخول'}
      </Button>

      <p className="text-center text-sm text-gray-500">
        ليس لديك حساب؟{' '}
        <Link href="/register" className="font-semibold" style={{ color: TEAL }}>
          أنشئ حسابًا
        </Link>
      </p>
    </form>
  )
}
