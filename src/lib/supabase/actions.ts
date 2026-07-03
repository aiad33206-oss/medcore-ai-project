'use server'

import { createServerClient } from './client'
import { redirect } from 'next/navigation'

export type AuthResult = { error: string } | { success: true }

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export async function registerAction(formData: FormData): Promise<AuthResult> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')
  const full_name = String(formData.get('full_name') ?? '').trim()
  const university = String(formData.get('university') ?? '').trim()
  const study_year = Number(formData.get('study_year'))

  if (!email || !password || !full_name || !university || !study_year) {
    return { error: 'من فضلك اكمل كل الحقول' }
  }

  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        university,
        study_year,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error || !data.user) {
    return { error: error?.message || 'فشل إنشاء الحساب' }
  }

  // Automatically sign in the user after registration
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return { error: 'تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول يدوياً' }
  }

  redirect('/dashboard')
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
}
