-- =============================================================
--  TTC WEBSITE — Supabase Database Setup
--  Run this entire file once in:
--  Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- =============================================================


-- ── 1. FORM SUBMISSIONS TABLE ────────────────────────────────

CREATE TABLE IF NOT EXISTS public.form_submissions (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at   TIMESTAMPTZ DEFAULT now() NOT NULL,
  form_type    TEXT NOT NULL,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  data         JSONB DEFAULT '{}'::jsonb NOT NULL
);

-- Index for fast filtering by form type and date
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type  ON public.form_submissions (form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email      ON public.form_submissions (email);

-- Comment describing the table
COMMENT ON TABLE public.form_submissions IS
  'All form submissions from the TTC website — 18 form types stored here with flexible JSONB data column.';

COMMENT ON COLUMN public.form_submissions.form_type IS
  'One of: membership | counseling | feedback | first_timer | second_timer | volunteer | membership_class | ministry_group_class | online_community | premarital_counseling | postmarital_counseling | prayer_request | testimony | welfare | tic_city | transformation_kids | elders_forum | circle_group | ministry_group_music | ministry_group_locomotive | ministry_group_twg | ministry_group_tpg | ministry_group_gip | ministry_group_media | ministry_group_admin | tic_campus | contact';

COMMENT ON COLUMN public.form_submissions.data IS
  'All form-specific fields stored as JSON. Core fields (name, email, phone) are top-level columns; everything else goes here.';


-- ── 2. GIVING TRANSACTIONS TABLE ─────────────────────────────

CREATE TABLE IF NOT EXISTS public.giving_transactions (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at           TIMESTAMPTZ DEFAULT now() NOT NULL,
  name                 TEXT NOT NULL,
  email                TEXT NOT NULL,
  phone                TEXT,
  amount               INTEGER NOT NULL,  -- Amount in kobo (NGN × 100)
  category             TEXT NOT NULL CHECK (category IN ('offering', 'tithe', 'building', 'special')),
  paystack_reference   TEXT UNIQUE,
  status               TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  metadata             JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_giving_status        ON public.giving_transactions (status);
CREATE INDEX IF NOT EXISTS idx_giving_category      ON public.giving_transactions (category);
CREATE INDEX IF NOT EXISTS idx_giving_created_at    ON public.giving_transactions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_giving_paystack_ref  ON public.giving_transactions (paystack_reference);

COMMENT ON TABLE public.giving_transactions IS
  'All giving/donation transactions processed through Paystack.';

COMMENT ON COLUMN public.giving_transactions.amount IS
  'Amount in kobo (smallest NGN unit). Divide by 100 to get Naira. e.g. 500000 = ₦5,000';


-- ── 3. ROW LEVEL SECURITY (RLS) ──────────────────────────────
-- Public users can INSERT (submit forms) but cannot SELECT (read) data.
-- Only your service role key (server-side) can read everything.

-- Form submissions
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a form"
  ON public.form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all submissions"
  ON public.form_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Giving transactions
ALTER TABLE public.giving_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a giving transaction"
  ON public.giving_transactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read and update giving transactions"
  ON public.giving_transactions
  FOR ALL
  TO service_role
  USING (true);

-- Allow the API to update payment status (Paystack webhook)
CREATE POLICY "Service role can update giving status"
  ON public.giving_transactions
  FOR UPDATE
  TO service_role
  USING (true);


-- ── 4. VERIFICATION ──────────────────────────────────────────
-- Run these SELECT statements to confirm everything was created:

SELECT table_name, row_security
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('form_submissions', 'giving_transactions');

-- You should see both tables with row_security = YES
