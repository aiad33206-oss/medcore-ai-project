// ═══════════════════════════════════════════════
// MedCore AI — Auth Server Actions
// Copyright © abdoayad
// ═══════════════════════════════════════════════

'use server'

import { createServerClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export type AuthResult = { error: string } | { success: true }

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function mapAuthError(message: string) {
  const msg = message.toLowerCase()

  if (
    msg.includes('already registered') ||
    msg.includes('already been registered') ||
    msg.includes('user already exists')
  ) {
    return 'البريد الإلكتروني ده مسجل قبل كده'
  }

  if (msg.includes('email') && msg.includes('invalid')) {
    return 'البريد الإلكتروني غير صحيح'
  }

  if (msg.includes('password') && msg.includes('short')) {
    return 'كلمة المرور قصيرة جدًا'
  }

  return 'حصل خطأ، حاول تاني'
}

export async function registerAction(formData: FormData): Promise<AuthResult> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')
  const fullName = String(formData.get('full_name') ?? '').trim()
  const studyYearRaw = String(formData.get('study_year') ?? '').trim()
  const universityRaw = String(formData.get('university') ?? '').trim()

  const studyYear = Number(studyYearRaw)
  const university = universityRaw || 'Al-Azhar University'

  if (!email || !password || !fullName || !studyYearRaw) {
    return { error: 'من فضلك اكمل كل الحقول' }
  }

  if (password.length < 8) {
    return { error: 'كلمة المرور لازم تكون 8 حروف على الأقل' }
  }

  if (!Number.isInteger(studyYear) || studyYear < 1 || studyYear > 6) {
    return { error: 'اختر سنة دراسية صحيحة' }
  }

  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        university,
        study_year: studyYear,
      },
    },
  })

  if (error) {
    return { error: mapAuthError(error.message) }
  }

  if (!data.user) {
    return { error: 'حصل خطأ في إنشاء الحساب' }
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(
      {
        id: data.user.id,
        email: data.user.email ?? email,
        full_name: fullName,
        university,
        study_year: studyYear,
        metadata: {
          source: 'registerAction',
        },
      },
      { onConflict: 'id' }
    )

  if (profileError) {
    console.error('Profile upsert error:', profileError)
  }

  if (data.session) {
    redirect('/dashboard')
  }

  redirect('/login?registered=1')
}

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
