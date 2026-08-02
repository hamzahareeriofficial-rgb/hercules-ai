import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  user_id: string
  email: string
  avatar_url: string | null
  subscription_tier: 'free' | 'pro' | 'business'
  credits_remaining: number
  created_at: string
}

export type Project = {
  id: string
  user_id: string
  project_name: string
  description: string
  repo_url: string | null
  status: 'planning' | 'generating' | 'reviewing' | 'deployed' | 'archived'
  created_at: string
  updated_at: string
}

export type AgentLog = {
  id: string
  project_id: string
  step_name: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  output_log: string
  timestamp: string
}

export type Integration = {
  user_id: string
  provider: 'github' | 'stripe' | 'supabase'
  access_token: string
  is_connected: boolean
}
