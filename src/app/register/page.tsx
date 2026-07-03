// ═══════════════════════════════════════════════
// MedCore AI — Register Page
// Copyright © abdoayad
// ═══════════════════════════════════════════════

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-bg px-6 flex items-center justify-center text-white">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">إنشاء حساب</h1>
          <p className="text-sm text-g300 mt-2">
            أدخل بياناتك للبدء
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <RegisterForm />
        </div>

        <p className="mt-4 text-center text-sm text-g500">
          عندك حساب؟{' '}
          <Link href="/login" className="text-teal font-semibold">
            تسجيل الدخول
          </Link>
        </p>

      </div>
    </main>
  )
}
