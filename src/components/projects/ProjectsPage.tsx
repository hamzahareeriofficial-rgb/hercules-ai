import { useState } from 'react'
import { Plus, Search, GitBranch, ExternalLink, MoreVertical, Clock, CheckCircle, Loader2, Play, Archive, Sparkles, ArrowUpRight } from 'lucide-react'
import { cn, timeAgo } from '../../lib/utils'

type MockProject = { id: string; name: string; description: string; status: 'planning' | 'generating' | 'reviewing' | 'deployed' | 'archived'; repoUrl: string | null; tech: string[]; createdAt: string }

const MOCK_PROJECTS: MockProject[] = [
  { id: '1', name: 'SaaS Dashboard', description: 'Real-time analytics dashboard with Stripe billing', status: 'deployed', repoUrl: 'https://github.com/user/saas-dashboard', tech: ['React', 'Tailwind', 'Supabase'], createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '2', name: 'Social Scheduler', description: 'Social media post scheduler with calendar view', status: 'generating', repoUrl: null, tech: ['Next.js', 'Prisma', 'PostgreSQL'], createdAt: new Date(Date.now() - 21600000).toISOString() },
  { id: '3', name: 'E-Commerce Store', description: 'Full-stack store with cart and checkout', status: 'planning', repoUrl: null, tech: ['Vite', 'React', 'Stripe'], createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', name: 'Blog Platform', description: 'MDX-based blog with CMS and SEO', status: 'deployed', repoUrl: 'https://github.com/user/blog-platform', tech: ['Astro', 'MDX', 'Supabase'], createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '5', name: 'API Gateway', description: 'Rate-limited API gateway with auth', status: 'reviewing', repoUrl: null, tech: ['Hono', 'Cloudflare', 'Drizzle'], createdAt: new Date(Date.now() - 43200000).toISOString() },
  { id: '6', name: 'Task Manager', description: 'Collaborative task board with real-time sync', status: 'archived', repoUrl: 'https://github.com/user/task-manager', tech: ['React', 'Supabase', 'Realtime'], createdAt: new Date(Date.now() - 432000000).toISOString() },
]

const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  planning: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Planning' },
  generating: { icon: Loader2, color: 'text-[var(--gold-500)]', bg: 'bg-[var(--gold-500)]/10', label: 'Generating' },
  reviewing: { icon: CheckCircle, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Reviewing' },
  deployed: { icon: Play, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Deployed' },
  archived: { icon: Archive, color: 'text-[var(--text-muted)]', bg: 'bg-[var(--dark-surface-3)]', label: 'Archived' },
}

export function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const filtered = MOCK_PROJECTS.filter((p) => { if (filter !== 'all' && p.status !== filter) return false; if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false; return true })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"><div><h1 className="text-2xl font-bold text-white">Projects</h1><p className="text-sm text-[var(--text-secondary)] mt-1">Manage your AI-generated applications</p></div><button className="btn-gold flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> New Project</button></div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" /><input value={search} onChange={(e) => setSearch(e.target.value)} className="input-dark pl-10" placeholder="Search projects..." /></div>
        <div className="flex gap-2 flex-wrap">{['all', 'planning', 'generating', 'reviewing', 'deployed'].map((f) => (<button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize', filter === f ? 'bg-[var(--gold-500)]/20 text-[var(--gold-500)] border border-[var(--gold-500)]/30' : 'bg-[var(--dark-surface-2)] text-[var(--text-secondary)] border border-[var(--dark-border)] hover:border-[var(--dark-border-hover)]')}>{f}</button>))}</div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => {
          const status = statusConfig[project.status]; const StatusIcon = status.icon
          return (
            <div key={project.id} className="glass-card p-5 hover:border-[var(--gold-500)]/30 transition-all duration-300 group cursor-pointer">
              <div className="flex items-start justify-between mb-3"><div className={cn('flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium', status.bg, status.color)}><StatusIcon className={cn('w-3 h-3', project.status === 'generating' && 'animate-spin')} />{status.label}</div><button className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-white"><MoreVertical className="w-4 h-4" /></button></div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-[var(--gold-500)] transition-colors">{project.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">{project.tech.map((t) => (<span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--dark-surface-3)] text-[var(--text-muted)] font-medium">{t}</span>))}</div>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--dark-border)]"><span className="text-xs text-[var(--text-muted)]">{timeAgo(project.createdAt)}</span><div className="flex items-center gap-2">{project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener" className="p-1.5 rounded-lg hover:bg-[var(--dark-surface-2)] text-[var(--text-muted)] hover:text-white transition-colors"><GitBranch className="w-3.5 h-3.5" /></a>)}<button className="p-1.5 rounded-lg hover:bg-[var(--dark-surface-2)] text-[var(--text-muted)] hover:text-white transition-colors"><ArrowUpRight className="w-3.5 h-3.5" /></button></div></div>
            </div>
          )
        })}
      </div>
      {filtered.length === 0 && (<div className="text-center py-20"><Sparkles className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" /><p className="text-[var(--text-secondary)]">No projects found</p><button className="btn-gold mt-4 text-sm">Create Your First Project</button></div>)}
    </div>
  )
}
