import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata = {
  title: 'تسجيل الدخول - MedCore AI',
}

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/')

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">تسجيل الدخول</h1>
          <p className="text-g400">أهلاً بعودتك إلى MedCore AI</p>
        </div>

        <LoginForm />

        <p className="text-center text-g400 text-sm mt-6">
          ليس لديك حساب؟{' '}
          <Link href="/sign-up" className="text-teal hover:underline font-medium">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  )
}
