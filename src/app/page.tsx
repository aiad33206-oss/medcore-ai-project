// ═══════════════════════════════════════════════
// MedCore AI — Home Page
// Copyright © abdoayad
// ═══════════════════════════════════════════════

import Link from 'next/link'

const stats = [
  { value: '6', label: 'سنوات دراسية' },
  { value: 'AI', label: 'Agent جاهز للتوسعة' },
  { value: 'AR', label: 'واجهة عربية كاملة' },
]

const features = [
  'تجربة تسجيل واضحة وسريعة',
  'ملائم لطلاب الأزهر والطب',
  'قاعدة جاهزة للداشبورد والـ AI',
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-white">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet text-xs font-bold text-white font-en">
              AI
            </div>
            <div className="font-en text-2xl font-bold">
              <span className="text-white">Med</span>
              <span className="text-teal">Core</span>
            </div>
          </div>

          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-border bg-white/[0.03] px-4 py-2 text-xs text-g300">
              أول منصة طبية عربية بـ AI Agent متخصص في امتحانات الأزهر
            </span>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight">
              ادرس <span className="text-teal">أذكى.</span>
              <br />
              اجتاز <span className="text-violet">أسرع.</span>
            </h1>

            <p className="max-w-xl text-base md:text-lg leading-relaxed text-g300">
              منصة مذاكرة متقدمة تجهّز ملفك من البداية، وتبني الأساس لداشبورد
              ذكي، ملخصات، بنوك أسئلة، وAI Agent متخصص لاحقًا.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="rounded-xl bg-teal px-6 py-3.5 text-sm font-bold text-bg transition-transform hover:scale-[1.01]"
            >
              ابدأ تجربتك المجانية
            </Link>
            <Link
              href="/sign-in"
              className="rounded-xl border border-border bg-white/[0.03] px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
            >
              سجل دخول
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-white/[0.03] p-5"
              >
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-g300">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(0,245,212,0.12)_0%,transparent_70%)] blur-3xl" />
          <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white/[0.03] p-5">
                <p className="text-sm text-g300">مذاكرة منظمة</p>
                <p className="mt-3 text-xl font-semibold">ملف شخصي واضح</p>
                <p className="mt-2 text-sm leading-relaxed text-g300">
                  السنة الدراسية والجامعة محفوظين من أول التسجيل.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white/[0.03] p-5">
                <p className="text-sm text-g300">جاهزية للتوسعة</p>
                <p className="mt-3 text-xl font-semibold">Base نظيف</p>
                <p className="mt-2 text-sm leading-relaxed text-g300">
                  مناسب لإضافة الامتحانات، الملخصات، والـ AI Agent.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white/[0.03] p-5 md:col-span-2">
                <p className="text-sm text-g300">مميزات أساسية</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-xl border border-border bg-black/10 px-4 py-3 text-sm text-g300"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
                      }
