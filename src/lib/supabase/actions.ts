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

  try {
    const supabase = await createServerClient()

    // First, try to sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          university,
          study_year,
        },
      },
    })

    if (signUpError) {
      return { error: signUpError.message || 'فشل إنشاء الحساب' }
    }

    if (!signUpData.user) {
      return { error: 'فشل إنشاء الحساب' }
    }

    // Then try to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return { error: 'تم إنشاء الحساب. الرجاء إعادة محاولة تسجيل الدخول.' }
    }

    redirect('/dashboard')
  } catch (error) {
    console.error('[v0] Registration error:', error)
    return { error: 'حدث خطأ أثناء إنشاء الحساب' }
  }
}

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const email = normalizeEmail(String(formData.get('email') ?? ''))
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' }
  }

  try {
    const supabase = await createServerClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // More specific error messages
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }
      }
      if (error.message.includes('Email not confirmed')) {
        return { error: 'يرجى تأكيد بريدك الإلكتروني أولاً' }
      }
      return { error: error.message || 'فشل تسجيل الدخول' }
    }

    redirect('/dashboard')
  } catch (error) {
    console.error('[v0] Login error:', error)
    return { error: 'حدث خطأ أثناء تسجيل الدخول' }
  }
}

export async function logoutAction() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/')
}
