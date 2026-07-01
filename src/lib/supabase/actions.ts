// ═══════════════════════════════════════════════
// MedCore AI — Auth Server Actions
// Copyright © abdoayad
// ═══════════════════════════════════════════════
'use server'

import { createServerClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export type AuthResult = { error: string } | { success: true }

export async function registerAction(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const fullName = String(formData.get('full_name') ?? '').trim()
  const studyYear = formData.get('study_year')

  if (!email || !password || !fullName) {
    return { error: 'من فضلك اكمل كل الحقول' }
  }
  if (password.length < 8) {
    return { error: 'كلمة المرور لازم تكون 8 حروف على الأقل' }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })

  if (error) {
    // Map Supabase's raw errors to Arabic, don't leak internals
    if (error.message.includes('already registered')) {
      return { error: 'البريد الإلكتروني ده مسجل قبل كده' }
    }
    return { error: 'حصل خطأ، حاول تاني' }
  }

  if (!data.user) {
    return { error: 'حصل خطأ في إنشاء الحساب' }
  }

  // Set study_year on the auto-created profile row (from the trigger in Step 1)
  if (studyYear) {
    await supabase
      .from('profiles')
      .update({ study_year: Number(studyYear) })
      .eq('id', data.user.id)
  }

  redirect('/dashboard')
}

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'من فضلك اكمل البريد الإلكتروني وكلمة المرور' }
  }

  const supabase = createServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'البريد الإلكتروني أو كلمة المرور غلط' }
  }

  redirect('/dashboard')
}

export async function logoutAction(): Promise<void> {
  const supabase = createServerClient()
  await supabase.auth.signOut()
  redirect('/')
}
