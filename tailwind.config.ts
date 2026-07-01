import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        teal:   { DEFAULT: '#00F5D4', dim: '#00C4AA', glow: 'rgba(0,245,212,0.15)' },
        violet: { DEFAULT: '#8B5CF6', dim: '#6D3FD4', glow: 'rgba(139,92,246,0.15)' },
        gold:   { DEFAULT: '#FBBF24', dim: '#D97706', glow: 'rgba(251,191,36,0.12)' },
        // Dark surfaces
        bg:      '#04060D',
        surface: '#080C18',
        card:    '#0C1022',
        // Light surfaces
        'bg-light':      '#F8FAFC',
        'surface-light': '#FFFFFF',
        'card-light':    '#F1F5F9',
        // Borders
        border:       'rgba(255,255,255,0.07)',
        'border-light': 'rgba(0,0,0,0.08)',
      },
      fontFamily: {
        ar: ['IBM Plex Sans Arabic', 'sans-serif'],
        en: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(0,245,212,0.10) 0%, transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer':  'shimmer 1.5s infinite',
        'fade-up':  'fadeUp 0.5s ease-out forwards',
        'orb':      'orbFloat 14s ease-in-out infinite',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeUp:   { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'none' } },
        orbFloat: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(20px,-15px) scale(1.05)' }, '66%': { transform: 'translate(-10px,10px) scale(0.97)' } },
      },
      boxShadow: {
        'teal':   '0 0 60px rgba(0,245,212,0.1), 0 0 120px rgba(0,245,212,0.05)',
        'violet': '0 0 60px rgba(139,92,246,0.1), 0 0 120px rgba(139,92,246,0.05)',
        'card':   '0 4px 24px rgba(0,0,0,0.4)',
        'card-lg':'0 20px 60px rgba(0,0,0,0.5)',
        'glow-teal':   '0 0 40px rgba(0,245,212,0.2)',
        'glow-violet': '0 0 40px rgba(139,92,246,0.2)',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
