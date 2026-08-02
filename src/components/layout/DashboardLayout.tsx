import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sparkles, MessageSquare, FolderGit2, Database, Settings, CreditCard,
  BarChart3, ChevronLeft, ChevronRight, GitBranch, Zap, CircleDollarSign, User,
  LogOut, Bell, ExternalLink
} from 'lucide-react'
import { useAppStore } from '../../stores/app'
import { useAuthStore } from '../../stores/auth'
import { cn, formatCredits } from '../../lib/utils'

const NAV_ITEMS = [
  { id: 'chat', label: 'AI Studio', icon: MessageSquare, path: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, path: '/dashboard/projects' },
  { id: 'database', label: 'Database', icon: Database, path: '/dashboard/database' },
  { id: 'preview', label: 'Preview', icon: ExternalLink, path: '/dashboard/preview' },
  { id: 'billing', label: 'Billing', icon: CreditCard, path: '/dashboard/billing' },
  { id: 'integrations', label: 'Integrations', icon: Settings, path: '/dashboard/integrations' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { sidebarOpen, toggleSidebar, setActiveView } = useAppStore()
  const { user, logout } = useAuthStore()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const activeItem = NAV_ITEMS.find((item) => location.pathname === item.path)?.id || 'chat'

  return (
    <div className="h-screen flex flex-col bg-[var(--dark-bg)] overflow-hidden">
      <header className="h-14 min-h-[56px] border-b border-[var(--dark-border)] bg-[var(--dark-surface)]/80 backdrop-blur-xl flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-[var(--dark-surface-2)] transition-colors text-[var(--text-secondary)] hover:text-white">{sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</button>
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gold-500)] to-[var(--rose-500)] flex items-center justify-center shadow-[var(--gold-glow)]"><Sparkles className="w-4 h-4 text-white" /></div>
            <span className="text-lg font-bold hidden sm:block"><span className="text-white">Hercules</span><span className="pink-gold-text">.ai</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <IntegrationBadge provider="github" connected />
            <IntegrationBadge provider="supabase" connected />
            <IntegrationBadge provider="stripe" connected />
          </div>
          <div className="credit-badge pulse-glow"><CircleDollarSign className="w-3.5 h-3.5" /><span>{formatCredits(user?.credits_remaining || 4750)} credits</span></div>
          <button className="relative p-1.5 rounded-lg hover:bg-[var(--dark-surface-2)] transition-colors text-[var(--text-secondary)] hover:text-white"><Bell className="w-4 h-4" /><span className="absolute top-1 right-1 w-2 h-2 bg-[var(--rose-500)] rounded-full" /></button>
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-[var(--dark-surface-2)] transition-colors"><div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--gold-500)] to-[var(--rose-500)] flex items-center justify-center text-xs font-bold text-white">{user?.email?.charAt(0).toUpperCase() || 'U'}</div></button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 glass-card p-2 shadow-lg z-50">
                <div className="px-3 py-2 border-b border-[var(--dark-border)] mb-1"><p className="text-sm font-medium text-white truncate">{user?.email || 'user@example.com'}</p><p className="text-xs text-[var(--text-muted)] capitalize">{user?.subscription_tier || 'free'} plan</p></div>
                <button className="nav-link w-full"><User className="w-4 h-4" /> Profile</button>
                <button className="nav-link w-full"><Settings className="w-4 h-4" /> Settings</button>
                <button onClick={logout} className="nav-link w-full text-red-400 hover:text-red-300"><LogOut className="w-4 h-4" /> Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className={cn('border-r border-[var(--dark-border)] bg-[var(--dark-surface)]/60 backdrop-blur-xl transition-all duration-300 flex flex-col', sidebarOpen ? 'w-56 min-w-[224px]' : 'w-0 min-w-0 overflow-hidden border-r-0')}>
          <div className="flex-1 py-4 px-3 space-y-1">
            {NAV_ITEMS.map((item) => (<Link key={item.id} to={item.path} onClick={() => setActiveView(item.id as any)} className={cn('nav-link', activeItem === item.id && 'active')}><item.icon className="w-4 h-4" /><span>{item.label}</span></Link>))}
          </div>
          <div className="p-3 border-t border-[var(--dark-border)]"><div className="text-xs text-[var(--text-muted)] text-center">Hercules.ai v1.0</div></div>
        </aside>
        <main className="flex-1 overflow-auto bg-[var(--dark-bg)] bg-grid">{children}</main>
      </div>
    </div>
  )
}

function IntegrationBadge({ provider, connected }: { provider: string; connected: boolean }) {
  const labels: Record<string, string> = { github: 'GitHub', supabase: 'Supabase', stripe: 'Stripe' }
  const icons: Record<string, any> = { github: GitBranch, supabase: Database, stripe: CircleDollarSign }
  const Icon = icons[provider]
  return (
    <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all', connected ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-[var(--dark-border)] text-[var(--text-muted)] bg-transparent')}>
      <Icon className="w-3 h-3" /><span className="hidden lg:inline">{labels[provider]}</span><span className={cn('status-dot', connected ? 'connected' : 'disconnected')} />
    </div>
  )
}
