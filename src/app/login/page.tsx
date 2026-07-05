// ═══════════════════════════════════════════════
// MedCore AI — Login Page
// Copyright © abdoayad
// ═══════════════════════════════════════════════

import { redirect } from 'next/navigation'

export const metadata = { title: 'تسجيل الدخول' }

export default function LoginPage() {
  redirect('/sign-in')
}
