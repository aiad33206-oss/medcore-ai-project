import { LoginForm } from '@/components/auth/LoginForm'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'تسجيل الدخول',
}

function LogoMark() {
  return (
    <div className="text-3xl font-bold tracking-tight">
      <span className="text-foreground">Med</span>
      <span className="text-teal">Core</span>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-background relative overflow-hidden"
    >

      <div className="absolute top-[-200px] right-[-150px] w-[500px] h-[500px] rounded-full bg-teal/20 blur-[120px]" />

      <div className="absolute bottom-[-200px] left-[-150px] w-[450px] h-[450px] rounded-full bg-violet/20 blur-[120px]" />


      <div className="relative z-10 w-full max-w-md">

        <div className="flex justify-center mb-10">
          <LogoMark />
        </div>


        <Card className="p-8 rounded-3xl border-border/50 bg-card/70 backdrop-blur-xl shadow-xl">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold text-foreground">
              أهلاً بك
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              سجّل دخولك للوصول إلى مساحة التعلم الخاصة بك
            </p>

          </div>


          <LoginForm />

        </Card>


        <p className="mt-8 text-center text-xs text-muted-foreground">
          © 2026 MedCore
        </p>


      </div>

    </main>
  )
}
