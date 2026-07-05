// ═══════════════════════════════════════════════
// MedCore AI — Register Page
// Copyright © abdoayad
// ═══════════════════════════════════════════════

import { redirect } from 'next/navigation'

export const metadata = {
  title: 'إنشاء حساب',
}

export default function RegisterPage() {
  redirect('/sign-up')
}
