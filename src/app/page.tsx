// ═══════════════════════════════════════════════
// MedCore AI — Home Page (minimal, verified build)
// Copyright © abdoayad
// ═══════════════════════════════════════════════

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-bg">
      <div className="mb-6 flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-violet flex items-center justify-center text-xs font-bold text-white font-en">
          AI
        </div>
        <span className="font-en font-bold text-2xl">
          <span className="text-white">Med</span>
          <span className="text-teal">Core</span>
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        ادرس <span className="text-teal">أذكى.</span>
        <br />
        اجتاز <span className="text-violet">أسرع.</span>
      </h1>

      <p className="text-g300 max-w-md mb-8 text-base leading-relaxed">
        أول منصة طبية بـ AI Agent متخصص في امتحانات الأزهر
      </p>

      <Link
        href="/register"
        className="px-8 py-3.5 rounded-lg bg-teal text-bg font-bold text-sm"
      >
        ابدأ تجربتك المجانية
      </Link>
    </main>
  )
}
