import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

// Set initial auth state
import { useAuthStore } from './stores/auth'
useAuthStore.getState().setUser({
  user_id: 'demo-user-1',
  email: 'demo@hercules.ai',
  avatar_url: null,
  subscription_tier: 'pro',
  credits_remaining: 4750,
  created_at: new Date().toISOString(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
