import { useState } from 'react'
import { GitBranch, Database, CircleDollarSign, Link, Unlink, RefreshCw, Shield, Check, Settings } from 'lucide-react'
import { cn } from '../../lib/utils'

type IntegrationItem = { id: string; name: string; description: string; icon: any; connected: boolean; required: boolean; scopes: string[] }

const INTEGRATIONS: IntegrationItem[] = [
  { id: 'github', name: 'GitHub', description: 'Auto-create repositories, push commits, and manage branches directly from Hercules.ai.', icon: GitBranch, connected: true, required: true, scopes: ['repo', 'user:email', 'workflow'] },
  { id: 'supabase', name: 'Supabase', description: 'Automatic database schema generation, migrations, and API route creation.', icon: Database, connected: true, required: true, scopes: ['read', 'write', 'admin'] },
  { id: 'stripe', name: 'Stripe', description: 'Subscription management, payment processing, credit top-ups, and webhook integration.', icon: CircleDollarSign, connected: true, required: false, scopes: ['read_write', 'webhooks'] },
  { id: 'vercel', name: 'Vercel', description: 'Auto-deploy apps to Vercel with one click. Environment variables configured automatically.', icon: ({ className }: any) => <span className={cn(className, 'text-lg font-bold')}>▲</span>, connected: false, required: false, scopes: ['read', 'write', 'deployments'] },
  { id: 'slack', name: 'Slack', description: 'Build notifications, deployment alerts, and agent status updates in Slack.', icon: ({ className }: any) => <span className={cn(className, 'text-lg font-bold')}>#</span>, connected: false, required: false, scopes: ['chat:write', 'channels:read'] },
]

export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS)
  const [connecting, setConnecting] = useState<string | null>(null)

  const toggleConnection = (id: string) => { if (connecting) return; setConnecting(id); setTimeout(() => { setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))); setConnecting(null) }, 1500) }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Integrations</h1><p className="text-sm text-[var(--text-secondary)] mt-1">Connect external services to power your AI workflow</p></div>
      <div className="space-y-4">
        {integrations.map((integ) => {
          const Icon = integ.icon
          return (<div key={integ.id} className="glass-card p-5 hover:border-[var(--gold-500)]/20 transition-all"><div className="flex items-start gap-4"><div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', integ.connected ? 'bg-[var(--gold-500)]/10' : 'bg-[var(--dark-surface-3)]')}><Icon className={cn('w-6 h-6', integ.connected ? 'text-[var(--gold-500)]' : 'text-[var(--text-muted)]')} /></div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><h3 className="font-semibold text-white">{integ.name}</h3>{integ.connected ? <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><Check className="w-2.5 h-2.5" /> Connected</span> : <span className="text-[10px] bg-[var(--dark-surface-3)] text-[var(--text-muted)] px-2 py-0.5 rounded-full font-medium">Not Connected</span>}{integ.required && <span className="text-[10px] bg-[var(--rose-500)]/10 text-[var(--rose-500)] px-2 py-0.5 rounded-full font-medium">Required</span>}</div><p className="text-sm text-[var(--text-secondary)] mb-3">{integ.description}</p><div className="flex flex-wrap items-center gap-4"><div className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[var(--text-muted)]" /><span className="text-xs text-[var(--text-muted)]">Scopes:</span>{integ.scopes.map((scope) => (<span key={scope} className="text-[10px] bg-[var(--dark-surface-2)] text-[var(--text-secondary)] px-1.5 py-0.5 rounded font-mono">{scope}</span>))}</div></div></div><div className="flex items-center gap-2 flex-shrink-0">{integ.connected && <button className="p-2 rounded-lg hover:bg-[var(--dark-surface-2)] text-[var(--text-muted)] hover:text-white transition-colors"><Settings className="w-4 h-4" /></button>}<button onClick={() => toggleConnection(integ.id)} disabled={connecting === integ.id} className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all', integ.connected ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10' : 'btn-gold text-xs', connecting === integ.id && 'opacity-60 cursor-not-allowed')}>{connecting === integ.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : integ.connected ? <><Unlink className="w-4 h-4" /> Disconnect</> : <><Link className="w-4 h-4" /> Connect</>}</button></div></div>{integ.connected && <div className="mt-4 pt-4 border-t border-[var(--dark-border)] grid grid-cols-3 gap-3"><div><p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Status</p><p className="text-xs text-green-400 font-mono mt-0.5">Connected</p></div><div><p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Last Synced</p><p className="text-xs text-white font-mono mt-0.5">2 min ago</p></div><div><p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Provider</p><p className="text-xs text-white font-mono mt-0.5 capitalize">{integ.id}</p></div></div>}</div>)
        })}
      </div>
    </div>
  )
}
