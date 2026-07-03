import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata = {
  title: 'إنشاء حساب - MedCore AI',
}

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/')

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">إنشاء حساب</h1>
          <p className="text-g400">انضم إلى مجتمع MedCore AI</p>
        </div>

        <RegisterForm />

        <p className="text-center text-g400 text-sm mt-6">
          هل لديك حساب بالفعل؟{' '}
          <Link href="/sign-in" className="text-teal hover:underline font-medium">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}
