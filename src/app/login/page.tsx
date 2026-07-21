
import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'تسجيل الدخول',
  description: 'سجّل دخولك إلى MedCore AI',
}

type LoginPageProps = {
  searchParams?: {
    registered?: string
  }
}

function LogoMark() {
  return (
    <div className="text-3xl font-semibold tracking-tight">
      <span className="text-foreground">Med</span>
      <span className="text-primary">Core</span>
    </div>
  )
}

function SideCard({
  title,
  value,
  caption,
}: {
  title: string
  value: string
  caption: string
}) {
  return (
    <div className="rounded-[24px] border border-border/70 bg-card/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{caption}</p>
    </div>
  )
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const notice =
    searchParams?.registered === '1'
      ? 'تم إنشاء الحساب بنجاح. الآن سجّل دخولك للمتابعة.'
      : undefined

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="grid min-h-screen md:grid-cols-[1fr_1fr] xl:grid-cols-[1.06fr_0.94fr]">
        <section className="relative hidden overflow-hidden border-l border-border/60 md:flex md:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.10),transparent_28%),radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.12),transparent_34%),linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--background))_58%,hsl(var(--card))_100%)]" />
          <div className="absolute -left-28 top-14 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-[-5rem] right-[-7rem] h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <span className="text-lg font-semibold">M</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">MedCore AI</p>
                <h1 className="text-xl font-semibold tracking-tight">مساحة هادئة للمذاكرة</h1>
              </div>
            </div>

            <div className="max-w-2xl space-y-6">
              <p className="text-5xl font-semibold leading-[1.04] tracking-tight xl:text-6xl">
                هدوء.
                <span className="block text-primary">قوة.</span>
                <span className="block text-muted-foreground">تركيز.</span>
              </p>

              <p className="max-w-lg text-base leading-7 text-muted-foreground">
                واجهة بسيطة ومريحة على العين، بتشتغل تلقائي مع Light وDark mode حسب الجهاز،
                وبتحافظ على إحساس Premium من غير زحمة.
              </p>
            </div>

            <div className="grid max-w-2xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <SideCard
                title="ملخصات"
                value="سريعة وواضحة"
                caption="عرض نظيف يساعدك تبدأ من غير تشتيت."
              />
              <SideCard
                title="تقدم"
                value="82%"
                caption="مؤشر هادئ يوضح المسار بشكل بسيط."
              />
              <SideCard
                title="AI"
                value="جاهز"
                caption="مساعد ذكي يدعم الفهم والمراجعة."
                // لو حبيت تخلي الكارت الأخير بعرض مناسب على الشاشات الصغيرة:
              />
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.06),transparent_35%),radial-gradient(circle_at_bottom,hsl(var(--secondary)/0.08),transparent_30%)]" />

          <div className="relative z-10 w-full max-w-[34rem]">
            <div className="mb-6 flex justify-center md:hidden">
              <LogoMark />
            </div>

            <Card className="relative overflow-hidden rounded-[30px] border border-border/70 bg-card/80 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="mb-8 space-y-3 text-center">
                <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                  Welcome back
                </span>
                <h2 className="text-2xl font-semibold tracking-tight">تسجيل الدخول</h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  سجل دخولك للوصول إلى حسابك.
                </p>
              </div>

              <LoginForm notice={notice} />
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
