'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginAction } from '@/lib/supabase/actions'

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
        <Alert className="rounded-xl border-primary/20 bg-primary/5">
          <AlertDescription className="text-sm text-foreground">
            {notice}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="rounded-xl border-destructive/20 bg-destructive/5">
          <AlertDescription className="text-sm text-destructive">
            {error}
          </AlertDescription>
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
          className="h-11 rounded-xl border-border/70 bg-background/70 focus-visible:ring-2 focus-visible:ring-primary/20"
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
            className="h-11 rounded-xl border-border/70 bg-background/70 pl-10 focus-visible:ring-2 focus-visible:ring-primary/20"
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary/90"
      >
        {isPending ? 'جاري التحقق...' : 'تسجيل الدخول'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        ليس لديك حساب؟{' '}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          أنشئ حسابًا
        </Link>
      </p>
    </form>
  )
}
