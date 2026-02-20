-- ═══════════════════════════════════════════════════════════
-- MyMedic — Supabase Schema (Safe to run multiple times)
-- Paste this ENTIRE file into Supabase SQL Editor and click Run
-- ═══════════════════════════════════════════════════════════

-- ── 1. TABLES ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public."user" (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'patient',
    is_active BOOLEAN NOT NULL DEFAULT true,
    phone_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.professionalprofile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE UNIQUE,
    bio TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL,
    years_experience INTEGER NOT NULL DEFAULT 0,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    rating FLOAT NOT NULL DEFAULT 0.0,
    consultation_fee FLOAT NOT NULL DEFAULT 0.0
);

CREATE TABLE IF NOT EXISTS public.appointment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.professionalprofile(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chatmessage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
    thread_id UUID NOT NULL,
    content TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
    is_read BOOLEAN NOT NULL DEFAULT false
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON public."user"(email);
CREATE INDEX IF NOT EXISTS idx_prof_specialty ON public.professionalprofile(specialty);
CREATE INDEX IF NOT EXISTS idx_chat_thread ON public.chatmessage(thread_id);

-- ── 2. ROW LEVEL SECURITY ──────────────────────────────────

ALTER TABLE public."user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionalprofile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatmessage ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first (safe to re-run)
DO $$ BEGIN
  -- user policies
  DROP POLICY IF EXISTS "users_select_own" ON public."user";
  DROP POLICY IF EXISTS "users_update_own" ON public."user";
  DROP POLICY IF EXISTS "users_insert_own" ON public."user";
  -- professional policies
  DROP POLICY IF EXISTS "prof_select_all" ON public.professionalprofile;
  DROP POLICY IF EXISTS "prof_manage_own" ON public.professionalprofile;
  -- appointment policies
  DROP POLICY IF EXISTS "appt_patient_select" ON public.appointment;
  DROP POLICY IF EXISTS "appt_prof_select" ON public.appointment;
  DROP POLICY IF EXISTS "appt_patient_insert" ON public.appointment;
  -- chat policies
  DROP POLICY IF EXISTS "chat_select_auth" ON public.chatmessage;
  DROP POLICY IF EXISTS "chat_insert_own" ON public.chatmessage;
END $$;

-- User policies
CREATE POLICY "users_select_own" ON public."user" FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public."user" FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public."user" FOR INSERT WITH CHECK (auth.uid() = id);

-- Professional profile policies
CREATE POLICY "prof_select_all" ON public.professionalprofile FOR SELECT USING (true);
CREATE POLICY "prof_manage_own" ON public.professionalprofile FOR ALL USING (auth.uid() = user_id);

-- Appointment policies
CREATE POLICY "appt_patient_select" ON public.appointment FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "appt_prof_select" ON public.appointment FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.professionalprofile p
    WHERE p.id = professional_id AND p.user_id = auth.uid()
  ));
CREATE POLICY "appt_patient_insert" ON public.appointment FOR INSERT WITH CHECK (auth.uid() = patient_id);

-- Chat policies
CREATE POLICY "chat_select_auth" ON public.chatmessage FOR SELECT USING (true);
CREATE POLICY "chat_insert_own" ON public.chatmessage FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ── 3. REALTIME ────────────────────────────────────────────

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.chatmessage;
EXCEPTION WHEN duplicate_object THEN
  NULL; -- already added
END $$;

-- ── 4. AUTO-PROFILE TRIGGER ───────────────────────────────
-- Automatically creates a user profile when someone signs up

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public."user" (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
