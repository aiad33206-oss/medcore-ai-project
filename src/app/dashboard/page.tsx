import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/client'
import { logoutAction } from '@/lib/supabase/actions'

const yearLabel: Record<number, string> = {
  1: 'الأولى',
  2: 'الثانية',
  3: 'الثالثة',
  4: 'الرابعة',
  5: 'الخامسة',
  6: 'السادسة',
}

const tierLabel: Record<string, string> = {
  free: 'مجانية',
  basic: 'أساسية',
  ai_agent: 'AI Agent',
}

const statusLabel: Record<string, string> = {
  active: 'نشط',
  expired: 'منتهي',
  cancelled: 'ملغي',
  trial: 'تجريبي',
}

function formatDate(value?: string | null) {
  if (!value) return 'غير متاح'

  return new Intl.DateTimeFormat('ar-EG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default async function DashboardPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, study_year, subscription_tier, subscription_status, university, last_seen_at')
    .eq('id', user.id)
    .maybeSingle()

  const studyYear = profile?.study_year ?? null
  const subscriptionTier = profile?.subscription_tier ?? 'free'
  const subscriptionStatus = profile?.subscription_status ?? 'active'

  return (
    <main className="min-h-screen bg-bg px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-g300">لوحة التحكم</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">
              أهلاً {profile?.full_name ?? 'بك'}
            </h1>
            <p className="mt-3 max-w-2xl text-g300">
              هنا هتتابع بياناتك الأساسية، والحالة الحالية للحساب، وتمهيد
              المسارات اللي هتتفتح بعدين.
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:bg-white/[0.06]"
            >
              تسجيل الخروج
            </button>
          </form>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">الاسم</p>
            <p className="mt-3 text-xl font-semibold">
              {profile?.full_name ?? 'غير محدد'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">السنة الدراسية</p>
            <p className="mt-3 text-xl font-semibold">
              {studyYear ? `السنة ${yearLabel[studyYear]}` : 'لم تُحدد'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">الجامعة</p>
            <p className="mt-3 text-xl font-semibold">
              {profile?.university ?? 'غير محددة'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">الخطة</p>
            <p className="mt-3 text-xl font-semibold">
              {tierLabel[subscriptionTier] ?? subscriptionTier}
            </p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">حالة الاشتراك</p>
            <p className="mt-3 text-xl font-semibold">
              {statusLabel[subscriptionStatus] ?? subscriptionStatus}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">الدور</p>
            <p className="mt-3 text-xl font-semibold">
              {profile?.role ?? 'student'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">آخر دخول</p>
            <p className="mt-3 text-xl font-semibold">
              {formatDate(profile?.last_seen_at)}
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-border bg-card/95 p-6">
            <p className="text-sm text-g300">الخطوة التالية</p>
            <h2 className="mt-2 text-2xl font-bold">
              الداشبورد ده جاهز للتوسعة
            </h2>
            <p className="mt-3 max-w-2xl text-g300">
              بعد ما تثبّت التسجيل والدخول، تقدر تضيف هنا الأسئلة، الملخصات،
              المحادثات مع الـ AI Agent، والاشتراكات.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-xl bg-teal px-5 py-3 text-sm font-bold text-bg transition-transform hover:scale-[1.01]"
              >
                الرجوع للرئيسية
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-sm font-medium transition-colors hover:bg-white/[0.06]"
              >
                إنشاء حساب آخر
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white/[0.03] p-6">
            <p className="text-sm text-g300">معلومة سريعة</p>
            <ul className="mt-4 space-y-3 text-sm text-g300">
              <li>• بياناتك الأساسية محفوظة داخل جدول profiles.</li>
              <li>• السنة والجامعة متسجلين من أول التسجيل.</li>
              <li>• الصفحة دي آمنة وتتحقق من الجلسة قبل العرض.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
      }
