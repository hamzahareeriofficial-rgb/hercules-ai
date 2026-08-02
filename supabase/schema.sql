-- =============================================
-- HERCULES.AI — Supabase Database Schema
-- Production-ready with RLS, indexes, and triggers
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROFILES TABLE
-- =============================================
CREATE TABLE public.profiles (
  user_id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          TEXT NOT NULL,
  avatar_url     TEXT,
  full_name      TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free'
                  CHECK (subscription_tier IN ('free', 'pro', 'business')),
  credits_remaining INTEGER NOT NULL DEFAULT 100,
  stripe_customer_id TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, subscription_tier, credits_remaining)
  VALUES (NEW.id, NEW.email, 'free', 100);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_subscription_tier ON public.profiles(subscription_tier);

-- =============================================
-- 2. PROJECTS TABLE
-- =============================================
CREATE TABLE public.projects (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  project_name  TEXT NOT NULL,
  description   TEXT,
  repo_url      TEXT,
  status        TEXT NOT NULL DEFAULT 'planning'
                CHECK (status IN ('planning', 'generating', 'reviewing', 'deployed', 'archived')),
  tech_stack    TEXT[] DEFAULT '{}',
  file_tree     JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_created_at ON public.projects(created_at DESC);

-- =============================================
-- 3. AGENT LOGS TABLE
-- =============================================
CREATE TABLE public.agent_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  step_name     TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  output_log    TEXT,
  metadata      JSONB DEFAULT '{}',
  timestamp     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agent logs"
  ON public.agent_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = agent_logs.project_id AND projects.user_id = auth.uid()));

CREATE POLICY "Users can insert own agent logs"
  ON public.agent_logs FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = agent_logs.project_id AND projects.user_id = auth.uid()));

CREATE INDEX idx_agent_logs_project_id ON public.agent_logs(project_id);
CREATE INDEX idx_agent_logs_status ON public.agent_logs(status);
CREATE INDEX idx_agent_logs_timestamp ON public.agent_logs(timestamp DESC);

-- =============================================
-- 4. INTEGRATIONS TABLE
-- =============================================
CREATE TABLE public.integrations (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  provider      TEXT NOT NULL CHECK (provider IN ('github', 'stripe', 'supabase', 'vercel', 'slack')),
  access_token  TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  metadata      JSONB DEFAULT '{}',
  is_connected  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own integrations" ON public.integrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own integrations" ON public.integrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own integrations" ON public.integrations FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own integrations" ON public.integrations FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- 5. SUBSCRIPTIONS TABLE
-- =============================================
CREATE TABLE public.subscriptions (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  stripe_subscription_id TEXT,
  stripe_price_id       TEXT,
  tier                  TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'business')),
  status                TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete')),
  current_period_start  TIMESTAMPTZ,
  current_period_end    TIMESTAMPTZ,
  cancel_at_period_end  BOOLEAN DEFAULT false,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- =============================================
-- 6. CREDIT TRANSACTIONS TABLE
-- =============================================
CREATE TABLE public.credit_transactions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  amount          INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('subscription_renewal', 'one_time_purchase', 'usage_deduction', 'bonus', 'refund')),
  description     TEXT,
  stripe_payment_id TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);

CREATE INDEX idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);

-- =============================================
-- 7. UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_projects BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_integrations BEFORE UPDATE ON public.integrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER set_updated_at_subscriptions BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- 8. DEDUCT CREDITS FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION public.deduct_credits(p_user_id UUID, p_amount INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  SELECT credits_remaining INTO current_credits FROM public.profiles WHERE user_id = p_user_id;
  IF current_credits < p_amount THEN RETURN FALSE; END IF;
  UPDATE public.profiles SET credits_remaining = credits_remaining - p_amount WHERE user_id = p_user_id;
  INSERT INTO public.credit_transactions (user_id, amount, transaction_type, description)
  VALUES (p_user_id, -p_amount, 'usage_deduction', 'AI usage deduction');
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
