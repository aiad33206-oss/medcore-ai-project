-- ═══════════════════════════════════════════════════════════════
-- MedCore AI — Database Schema
-- Copyright © 2025 abdoayad — All rights reserved
-- ═══════════════════════════════════════════════════════════════

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";
create extension if not exists "pg_trgm";

-- ── ENUMS ─────────────────────────────────────────────────────
create type user_role as enum ('student', 'teacher', 'admin', 'super_admin');
create type subscription_tier as enum ('free', 'basic', 'ai_agent');
create type subscription_status as enum ('active', 'expired', 'cancelled', 'trial');
create type file_type as enum ('pdf', 'docx', 'pptx', 'image', 'video', 'other');
create type file_category as enum ('lecture', 'summary', 'exam', 'reference', 'night_before');
create type question_type as enum ('essay', 'mcq', 'true_false', 'case_study');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');
create type payment_provider as enum ('paymob', 'stripe', 'manual');
create type event_type as enum (
  'page_view', 'button_click', 'file_download', 'file_view',
  'ai_message_sent', 'ai_session_start',
  'subscription_started', 'subscription_expired',
  'login', 'logout', 'register',
  'search', 'module_view', 'subject_view'
);

-- ── PROFILES ──────────────────────────────────────────────────
create table profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  email                 text not null unique,
  full_name             text not null,
  avatar_url            text,
  role                  user_role not null default 'student',
  subscription_tier     subscription_tier not null default 'free',
  subscription_status   subscription_status not null default 'active',
  subscription_expires_at timestamptz,
  university            text default 'Al-Azhar University',
  study_year            smallint check (study_year between 1 and 6),
  last_seen_at          timestamptz,
  metadata              jsonb default '{}',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- ── STUDY YEARS ───────────────────────────────────────────────
create table study_years (
  id              uuid primary key default uuid_generate_v4(),
  year_number     smallint not null unique check (year_number between 1 and 6),
  name_ar         text not null,
  name_en         text not null,
  slug            text not null unique,
  description_ar  text,
  description_en  text,
  is_active       boolean not null default true,
  order_index     smallint not null default 0,
  created_at      timestamptz not null default now()
);

-- ── MODULES ───────────────────────────────────────────────────
create table modules (
  id              uuid primary key default uuid_generate_v4(),
  year_id         uuid not null references study_years(id) on delete cascade,
  name_ar         text not null,
  name_en         text not null,
  slug            text not null unique,
  icon            text not null default '📚',
  color_hex       text not null default '#00F5D4',
  description_ar  text,
  description_en  text,
  is_active       boolean not null default true,
  order_index     smallint not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── SUBJECTS ──────────────────────────────────────────────────
create table subjects (
  id              uuid primary key default uuid_generate_v4(),
  module_id       uuid not null references modules(id) on delete cascade,
  name_ar         text not null,
  name_en         text not null,
  slug            text not null,
  description_ar  text,
  description_en  text,
  icon            text,
  is_active       boolean not null default true,
  order_index     smallint not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (module_id, slug)
);

-- ── FILES ─────────────────────────────────────────────────────
create table med_files (
  id              uuid primary key default uuid_generate_v4(),
  subject_id      uuid not null references subjects(id) on delete cascade,
  uploaded_by     uuid not null references profiles(id),
  name            text not null,
  name_ar         text,
  file_type       file_type not null,
  category        file_category not null default 'lecture',
  storage_path    text not null,
  public_url      text,
  size_bytes      bigint not null default 0,
  page_count      int,
  is_processed    boolean not null default false,
  is_active       boolean not null default true,
  download_count  int not null default 0,
  metadata        jsonb default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── FILE CHUNKS (for RAG) ─────────────────────────────────────
create table file_chunks (
  id              uuid primary key default uuid_generate_v4(),
  file_id         uuid not null references med_files(id) on delete cascade,
  chunk_index     int not null,
  content         text not null,
  page_number     int,
  embedding       vector(1536),
  metadata        jsonb default '{}',
  created_at      timestamptz not null default now(),
  unique (file_id, chunk_index)
);

create index file_chunks_embedding_idx on file_chunks
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- ── SUMMARIES ─────────────────────────────────────────────────
create table summaries (
  id                uuid primary key default uuid_generate_v4(),
  subject_id        uuid not null references subjects(id) on delete cascade,
  file_id           uuid references med_files(id),
  created_by        uuid not null references profiles(id),
  title_ar          text not null,
  title_en          text,
  content_ar        text not null,
  content_en        text,
  is_ai_generated   boolean not null default false,
  is_published      boolean not null default false,
  view_count        int not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ── QUESTIONS ─────────────────────────────────────────────────
create table questions (
  id                    uuid primary key default uuid_generate_v4(),
  subject_id            uuid not null references subjects(id) on delete cascade,
  file_id               uuid references med_files(id),
  created_by            uuid not null references profiles(id),
  type                  question_type not null default 'essay',
  question_text_ar      text not null,
  question_text_en      text,
  answer_text_ar        text not null,
  answer_text_en        text,
  options               jsonb,
  correct_option        smallint,
  exam_year             smallint,
  exam_session          text,
  source_page           int,
  source_file_id        uuid references med_files(id),
  difficulty            smallint not null default 3 check (difficulty between 1 and 5),
  is_verified           boolean not null default false,
  is_active             boolean not null default true,
  tags                  text[],
  created_at            timestamptz not null default now()
);

-- ── AI CONVERSATIONS ──────────────────────────────────────────
create table ai_conversations (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  title         text not null default 'محادثة جديدة',
  module_id     uuid references modules(id),
  subject_id    uuid references subjects(id),
  message_count int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table ai_messages (
  id                uuid primary key default uuid_generate_v4(),
  conversation_id   uuid not null references ai_conversations(id) on delete cascade,
  role              text not null check (role in ('user', 'assistant', 'system')),
  content           text not null,
  citations         jsonb default '[]',
  tokens_used       int,
  model             text,
  created_at        timestamptz not null default now()
);

-- ── SUBSCRIPTIONS ─────────────────────────────────────────────
create table subscriptions (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references profiles(id) on delete cascade,
  tier                        subscription_tier not null,
  status                      subscription_status not null default 'active',
  price_egp                   numeric(10,2) not null,
  starts_at                   timestamptz not null default now(),
  expires_at                  timestamptz not null,
  auto_renew                  boolean not null default true,
  payment_provider            payment_provider,
  external_subscription_id    text,
  created_at                  timestamptz not null default now()
);

-- ── PAYMENTS ──────────────────────────────────────────────────
create table payments (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references profiles(id),
  subscription_id             uuid references subscriptions(id),
  amount_egp                  numeric(10,2) not null,
  currency                    text not null default 'EGP',
  status                      payment_status not null default 'pending',
  provider                    payment_provider not null,
  provider_transaction_id     text unique,
  metadata                    jsonb default '{}',
  created_at                  timestamptz not null default now()
);

-- ── ANALYTICS EVENTS ──────────────────────────────────────────
create table analytics_events (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references profiles(id),
  session_id  text not null,
  event_type  event_type not null,
  properties  jsonb default '{}',
  page_path   text,
  referrer    text,
  user_agent  text,
  ip_hash     text,
  created_at  timestamptz not null default now()
);

create index analytics_events_user_idx on analytics_events(user_id, created_at desc);
create index analytics_events_type_idx on analytics_events(event_type, created_at desc);
create index analytics_events_session_idx on analytics_events(session_id);

-- ── USER SESSIONS ─────────────────────────────────────────────
create table user_sessions (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references profiles(id),
  session_id        text not null unique,
  started_at        timestamptz not null default now(),
  ended_at          timestamptz,
  duration_seconds  int,
  pages_visited     text[] default '{}',
  events_count      int not null default 0,
  device_type       text,
  country           text
);

-- ── STUDY PROGRESS ────────────────────────────────────────────
create table study_progress (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid not null references profiles(id) on delete cascade,
  subject_id            uuid not null references subjects(id) on delete cascade,
  files_viewed          uuid[] default '{}',
  questions_answered    int not null default 0,
  questions_correct     int not null default 0,
  summaries_read        uuid[] default '{}',
  completion_pct        numeric(5,2) not null default 0,
  last_activity_at      timestamptz not null default now(),
  total_time_seconds    int not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique (user_id, subject_id)
);

-- ── NOTIFICATIONS ─────────────────────────────────────────────
create table notifications (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  title_ar      text not null,
  title_en      text,
  body_ar       text not null,
  body_en       text,
  type          text not null default 'info',
  is_read       boolean not null default false,
  action_url    text,
  created_at    timestamptz not null default now()
);

-- ── AUDIT LOGS ────────────────────────────────────────────────
create table audit_logs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references profiles(id),
  action        text not null,
  resource_type text,
  resource_id   uuid,
  old_data      jsonb,
  new_data      jsonb,
  ip_hash       text,
  created_at    timestamptz not null default now()
);

-- ── RLS POLICIES ──────────────────────────────────────────────
alter table profiles enable row level security;
alter table study_years enable row level security;
alter table modules enable row level security;
alter table subjects enable row level security;
alter table med_files enable row level security;
alter table summaries enable row level security;
alter table questions enable row level security;
alter table ai_conversations enable row level security;
alter table ai_messages enable row level security;
alter table subscriptions enable row level security;
alter table payments enable row level security;
alter table study_progress enable row level security;
alter table notifications enable row level security;

-- Profiles: users can read/update their own
create policy "profiles_select" on profiles for select using (auth.uid() = id or exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','super_admin')));
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- Public content: any authenticated user can read active content
create policy "study_years_select" on study_years for select using (is_active = true or exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','super_admin','teacher')));
create policy "modules_select" on modules for select using (is_active = true or exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','super_admin','teacher')));
create policy "subjects_select" on subjects for select using (is_active = true or exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','super_admin','teacher')));
create policy "files_select" on med_files for select using (is_active = true or exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','super_admin','teacher')));
create policy "summaries_select" on summaries for select using (is_published = true or exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','super_admin','teacher')));
create policy "questions_select" on questions for select using (is_active = true or exists(select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','super_admin','teacher')));

-- AI: users can only see their own conversations
create policy "ai_conversations_select" on ai_conversations for select using (auth.uid() = user_id);
create policy "ai_conversations_insert" on ai_conversations for insert with check (auth.uid() = user_id);
create policy "ai_messages_select" on ai_messages for select using (exists(select 1 from ai_conversations c where c.id = conversation_id and c.user_id = auth.uid()));
create policy "ai_messages_insert" on ai_messages for insert with check (exists(select 1 from ai_conversations c where c.id = conversation_id and c.user_id = auth.uid()));

-- Subscriptions: own only
create policy "subscriptions_select" on subscriptions for select using (auth.uid() = user_id);
create policy "payments_select" on payments for select using (auth.uid() = user_id);

-- Progress: own only
create policy "progress_select" on study_progress for select using (auth.uid() = user_id);
create policy "progress_upsert" on study_progress for all using (auth.uid() = user_id);

-- Notifications: own only
create policy "notifications_select" on notifications for select using (auth.uid() = user_id);
create policy "notifications_update" on notifications for update using (auth.uid() = user_id);

-- ── SEED DATA ──────────────────────────────────────────────────
insert into study_years (year_number, name_ar, name_en, slug, order_index) values
  (1, 'السنة الأولى', 'First Year',  'year-1', 1),
  (2, 'السنة الثانية','Second Year', 'year-2', 2),
  (3, 'السنة الثالثة','Third Year',  'year-3', 3),
  (4, 'السنة الرابعة','Fourth Year', 'year-4', 4),
  (5, 'السنة الخامسة','Fifth Year',  'year-5', 5),
  (6, 'السنة السادسة','Sixth Year',  'year-6', 6);

-- Modules for Year 2
insert into modules (year_id, name_ar, name_en, slug, icon, color_hex, order_index)
select id, name_ar, name_en, slug, icon, color, ord from study_years y
cross join (values
  ('الباثولوجي',    'Pathology',     'pathology',     '🧬', '#00F5D4', 1),
  ('الهستولوجي',   'Histology',     'histology',     '🔬', '#8B5CF6', 2),
  ('الفارماكولوجي','Pharmacology',   'pharmacology',  '💊', '#FBBF24', 3)
) as m(name_ar, name_en, slug, icon, color, ord)
where y.year_number = 2;

-- Modules for Year 4
insert into modules (year_id, name_ar, name_en, slug, icon, color_hex, order_index)
select id, name_ar, name_en, slug, icon, color, ord from study_years y
cross join (values
  ('الباطنة',    'Internal Medicine','medicine',    '🩺', '#F472B6', 1),
  ('الجراحة',   'Surgery',           'surgery',     '🔪', '#34D399', 2)
) as m(name_ar, name_en, slug, icon, color, ord)
where y.year_number = 4;

-- Subjects for Pathology
insert into subjects (module_id, name_ar, name_en, slug, order_index)
select m.id, s.name_ar, s.name_en, s.slug, s.ord
from modules m
cross join (values
  ('أمراض الجهاز الهضمي',          'GIT Pathology',    'git',          1),
  ('أمراض الكبد والبنكرياس',        'Liver & Pancreas', 'liver',        2),
  ('الأمراض الالتهابية للأمعاء',   'IBD',              'ibd',          3),
  ('الأورام - المبادئ العامة',      'Neoplasia',        'neoplasia',    4),
  ('أمراض القلب والأوعية',          'Cardiovascular',   'cvs',          5),
  ('أمراض الكلى',                   'Renal Pathology',  'renal',        6)
) as s(name_ar, name_en, slug, ord)
where m.slug = 'pathology';
