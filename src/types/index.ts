// ═══════════════════════════════════════════════
// MedCore AI — Type Definitions
// Copyright © 2025 abdoayad — All rights reserved
// ═══════════════════════════════════════════════

// ── USER ROLES ────────────────────────────────
export type UserRole = 'student' | 'teacher' | 'admin' | 'super_admin'
export type SubscriptionTier = 'free' | 'basic' | 'ai_agent'
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'trial'

export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: UserRole
  subscription_tier: SubscriptionTier
  subscription_status: SubscriptionStatus
  subscription_expires_at?: string
  university?: string
  study_year?: number
  created_at: string
  updated_at: string
  last_seen_at?: string
  metadata?: Record<string, unknown>
}

// ── CONTENT HIERARCHY ────────────────────────
export interface StudyYear {
  id: string
  year_number: number          // 1-6
  name_ar: string
  name_en: string
  slug: string
  description_ar?: string
  description_en?: string
  is_active: boolean
  order_index: number
  created_at: string
}

export interface Module {
  id: string
  year_id: string
  name_ar: string
  name_en: string
  slug: string
  icon: string
  color_hex: string
  description_ar?: string
  description_en?: string
  is_active: boolean
  order_index: number
  subjects_count?: number
  files_count?: number
  questions_count?: number
  summaries_count?: number
  created_at: string
  updated_at: string
  year?: StudyYear
}

export interface Subject {
  id: string
  module_id: string
  name_ar: string
  name_en: string
  slug: string
  description_ar?: string
  description_en?: string
  icon?: string
  is_active: boolean
  order_index: number
  files_count?: number
  questions_count?: number
  summaries_count?: number
  created_at: string
  updated_at: string
  module?: Module
}

// ── FILES ─────────────────────────────────────
export type FileType = 'pdf' | 'docx' | 'pptx' | 'image' | 'video' | 'other'
export type FileCategory = 'lecture' | 'summary' | 'exam' | 'reference' | 'night_before'

export interface MedFile {
  id: string
  subject_id: string
  uploaded_by: string
  name: string
  name_ar?: string
  file_type: FileType
  category: FileCategory
  storage_path: string
  public_url?: string
  size_bytes: number
  page_count?: number
  is_processed: boolean          // OCR/embedding done
  is_active: boolean
  download_count: number
  metadata?: Record<string, unknown>
  created_at: string
  updated_at: string
  subject?: Subject
  uploader?: Profile
}

// ── SUMMARIES ─────────────────────────────────
export interface Summary {
  id: string
  subject_id: string
  file_id?: string
  created_by: string
  title_ar: string
  title_en?: string
  content_ar: string
  content_en?: string
  is_ai_generated: boolean
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
}

// ── QUESTIONS ─────────────────────────────────
export type QuestionType = 'essay' | 'mcq' | 'true_false' | 'case_study'

export interface Question {
  id: string
  subject_id: string
  file_id?: string
  created_by: string
  type: QuestionType
  question_text_ar: string
  question_text_en?: string
  answer_text_ar: string
  answer_text_en?: string
  options?: string[]             // for MCQ
  correct_option?: number        // for MCQ
  exam_year?: number
  exam_session?: string
  source_page?: number
  source_file_id?: string
  difficulty: 1 | 2 | 3 | 4 | 5
  is_verified: boolean
  is_active: boolean
  tags?: string[]
  created_at: string
}

// ── AI SYSTEM ─────────────────────────────────
export interface AIConversation {
  id: string
  user_id: string
  title: string
  module_id?: string
  subject_id?: string
  message_count: number
  created_at: string
  updated_at: string
}

export interface AIMessage {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  citations?: Citation[]
  tokens_used?: number
  model?: string
  created_at: string
}

export interface Citation {
  file_id: string
  file_name: string
  page_number?: number
  chapter?: string
  relevance_score?: number
  excerpt?: string
}

// ── SUBSCRIPTIONS & PAYMENTS ──────────────────
export interface Subscription {
  id: string
  user_id: string
  tier: SubscriptionTier
  status: SubscriptionStatus
  price_egp: number
  starts_at: string
  expires_at: string
  auto_renew: boolean
  payment_provider?: 'paymob' | 'stripe' | 'manual'
  external_subscription_id?: string
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  subscription_id?: string
  amount_egp: number
  currency: 'EGP' | 'USD'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  provider: 'paymob' | 'stripe' | 'manual'
  provider_transaction_id?: string
  metadata?: Record<string, unknown>
  created_at: string
}

// ── ANALYTICS & TRACKING ──────────────────────
export type EventType =
  | 'page_view' | 'button_click' | 'file_download' | 'file_view'
  | 'ai_message_sent' | 'ai_session_start'
  | 'subscription_started' | 'subscription_expired'
  | 'login' | 'logout' | 'register'
  | 'search' | 'module_view' | 'subject_view'

export interface AnalyticsEvent {
  id: string
  user_id?: string
  session_id: string
  event_type: EventType
  properties?: Record<string, unknown>
  page_path?: string
  referrer?: string
  user_agent?: string
  ip_hash?: string
  created_at: string
}

export interface UserSession {
  id: string
  user_id?: string
  started_at: string
  ended_at?: string
  duration_seconds?: number
  pages_visited: string[]
  events_count: number
  device_type?: 'mobile' | 'tablet' | 'desktop'
  country?: string
}

// ── NOTIFICATIONS ─────────────────────────────
export interface Notification {
  id: string
  user_id: string
  title_ar: string
  title_en?: string
  body_ar: string
  body_en?: string
  type: 'info' | 'success' | 'warning' | 'error' | 'promo'
  is_read: boolean
  action_url?: string
  created_at: string
}

// ── PROGRESS TRACKING ─────────────────────────
export interface StudyProgress {
  id: string
  user_id: string
  subject_id: string
  files_viewed: string[]
  questions_answered: number
  questions_correct: number
  summaries_read: string[]
  completion_pct: number
  last_activity_at: string
  total_time_seconds: number
  created_at: string
  updated_at: string
}

// ── UI TYPES ──────────────────────────────────
export type Lang = 'ar' | 'en'
export type Theme = 'dark' | 'light'

export interface NavItem {
  label_ar: string
  label_en: string
  href: string
  icon?: string
  badge?: string
  children?: NavItem[]
}

// ── API RESPONSES ─────────────────────────────
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// ── PRICING ───────────────────────────────────
export interface PricingPlan {
  id: SubscriptionTier
  name_ar: string
  name_en: string
  price_egp: number
  price_usd?: number
  features_ar: string[]
  features_en: string[]
  is_featured: boolean
  cta_ar: string
  cta_en: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name_ar: 'الباقة الأساسية',
    name_en: 'Basic Plan',
    price_egp: 59,
    features_ar: ['كل الملخصات', 'بنوك الأسئلة', 'PDF تفاعلي', 'شرح كل موديول', 'متابعة التقدم'],
    features_en: ['All summaries', 'Question banks', 'Interactive PDF', 'Module explanations', 'Progress tracking'],
    is_featured: false,
    cta_ar: 'ابدأ الآن',
    cta_en: 'Get Started',
  },
  {
    id: 'ai_agent',
    name_ar: 'باقة AI Agent',
    name_en: 'AI Agent Plan',
    price_egp: 129,
    features_ar: ['كل حاجة في الأساسي', 'AI Agent كامل', 'حل بنوك أسئلة تلقائي', 'هايلايت PDF أوتوماتيك', 'ملخص ليلة الامتحان', 'توليد ملفات PDF/DOCX', 'أولوية في الدعم'],
    features_en: ['Everything in Basic', 'Full AI Agent', 'Auto question solving', 'Auto PDF highlighting', 'Night-before summary', 'PDF/DOCX generation', 'Priority support'],
    is_featured: true,
    cta_ar: 'احصل على AI Agent',
    cta_en: 'Get AI Agent',
  },
]

// ── META ──────────────────────────────────────
export const SITE_META = {
  name: 'MedCore AI',
  tagline_ar: 'ادرس أذكى. اجتاز أسرع.',
  tagline_en: 'Study Smarter. Pass Faster.',
  description_ar: 'أول منصة طبية بـ AI Agent متخصص في امتحانات الأزهر',
  description_en: 'The first medical platform with AI Agent specialized in Al-Azhar exams',
  copyright: '© 2025 MedCore AI — abdoayad — All rights reserved',
  contact_email: 'contact@medcoreai.com',
  social: {
    twitter: '@medcoreai',
    instagram: '@medcoreai',
  },
}
