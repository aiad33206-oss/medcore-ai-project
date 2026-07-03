'use server'

import { createServerClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { redirect } from 'next/navigation'

export type AuthResult = { error: string } | { success: true }

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export async function registerAction(formData: FormData): Promise<AuthResult> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')
  const fullName = String(formData.get('full_name') ?? '').trim()
  const university = String(formData.get('university') ?? '').trim()
  const studyYear = Number(formData.get('study_year'))

  if (!email || !password || !fullName || !university || !studyYear) {
    return { error: 'من فضلك اكمل كل الحقول' }
  }

  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, university, study_year: studyYear },
    },
  })

  if (error || !data.user) {
    return { error: 'فشل إنشاء الحساب' }
  }

  const admin = createServiceClient()

  await admin.from('profiles').upsert({
    id: data.user.id,
    email,
    full_name: fullName,
    university,
    study_year: studyYear,
  })

  redirect('/login?registered=1')
}

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')

  const supabase = await createServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'بيانات الدخول غير صحيحة' }
  }

  redirect('/dashboard')
}

export async function logoutAction() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/')
    }  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'من فضلك اكمل البريد الإلكتروني وكلمة المرور' }
  }

  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const msg = error.message.toLowerCase()

    if (msg.includes('email not confirmed')) {
      return { error: 'فعّل البريد الإلكتروني ثم حاول الدخول مرة أخرى' }
    }

    return { error: 'البريد الإلكتروني أو كلمة المرور غلط' }
  }

  redirect('/dashboard')
}

export async function logoutAction(): Promise<void> {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/')
            }}

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'من فضلك اكمل البريد الإلكتروني وكلمة المرور' }
  }

  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const msg = error.message.toLowerCase()

    if (msg.includes('email not confirmed')) {
      return { error: 'فعّل البريد الإلكتروني ثم حاول الدخول مرة أخرى' }
    }

    return { error: 'البريد الإلكتروني أو كلمة المرور غلط' }
  }

  redirect('/dashboard')
}

export async function logoutAction(): Promise<void> {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/')
        }
