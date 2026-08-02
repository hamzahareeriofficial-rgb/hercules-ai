import { useState } from 'react'
import { BarChart3, TrendingUp, GitBranch, Zap, Clock, Activity, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const DAILY_STATS = [
  { day: 'Mon', prompts: 45, projects: 8, credits: 420 },
  { day: 'Tue', prompts: 62, projects: 12, credits: 580 },
  { day: 'Wed', prompts: 38, projects: 6, credits: 350 },
  { day: 'Thu', prompts: 78, projects: 15, credits: 720 },
  { day: 'Fri', prompts: 55, projects: 10, credits: 510 },
  { day: 'Sat', prompts: 28, projects: 4, credits: 260 },
  { day: 'Sun', prompts: 32, projects: 5, credits: 300 },
]

const USAGE_BREAKDOWN = [
  { name: 'AI Chat', value: 45, color: 'var(--gold-500)' },
  { name: 'Code Gen', value: 30, color: 'var(--rose-500)' },
  { name: 'DB Schema', value: 15, color: '#A78BFA' },
  { name: 'Deploy', value: 10, color: '#22C55E' },
]

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8"><div><h1 className="text-2xl font-bold text-white">Analytics</h1><p className="text-sm text-[var(--text-secondary)] mt-1">Track your AI usage and project metrics</p></div><div className="flex gap-1 bg-[var(--dark-surface-2)] rounded-xl p-1">{(['7d', '30d', '90d'] as const).map((range) => (<button key={range} onClick={() => setTimeRange(range)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', timeRange === range ? 'bg-[var(--dark-bg)] text-white' : 'text-[var(--text-secondary)] hover:text-white')}>{range}</button>))}</div></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[{ label: 'Total Prompts', value: '338', change: '+12.5%', up: true, icon: Zap, color: 'text-[var(--gold-500)]' },{ label: 'Projects Built', value: '60', change: '+8.2%', up: true, icon: GitBranch, color: 'text-blue-400' },{ label: 'Credits Used', value: '2,140', change: '-3.1%', up: false, icon: TrendingUp, color: 'text-green-400' },{ label: 'Avg Response', value: '2.4s', change: '+15%', up: true, icon: Clock, color: 'text-purple-400' }].map((stat, i) => (<div key={i} className="glass-card p-4"><div className="flex items-center justify-between mb-3"><stat.icon className={cn('w-5 h-5', stat.color)} /><span className={cn('flex items-center gap-0.5 text-xs font-medium', stat.up ? 'text-green-400' : 'text-red-400')}>{stat.up ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}{stat.change}</span></div><p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p></div>))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-5"><h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-[var(--gold-500)]" />Daily Prompts</h3><ResponsiveContainer width="100%" height={240}><AreaChart data={DAILY_STATS}><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} /><stop offset="100%" stopColor="#D4AF37" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="var(--dark-border)" /><XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: 'var(--dark-surface-2)', border: '1px solid var(--dark-border)', borderRadius: '8px', color: 'white', fontSize: '12px' }} /><Area type="monotone" dataKey="prompts" stroke="#D4AF37" strokeWidth={2} fill="url(#pg)" /></AreaChart></ResponsiveContainer></div>
        <div className="glass-card p-5"><h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[var(--rose-500)]" />Projects & Credits</h3><ResponsiveContainer width="100%" height={240}><BarChart data={DAILY_STATS}><CartesianGrid strokeDasharray="3 3" stroke="var(--dark-border)" /><XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: 'var(--dark-surface-2)', border: '1px solid var(--dark-border)', borderRadius: '8px', color: 'white', fontSize: '12px' }} /><Bar dataKey="projects" fill="#F06292" radius={[4, 4, 0, 0]} /><Bar dataKey="credits" fill="#D4AF37" radius={[4, 4, 0, 0]} opacity={0.6} /></BarChart></ResponsiveContainer></div>
      </div>
      <div className="glass-card p-5"><h3 className="text-sm font-semibold text-white mb-4">Usage Breakdown</h3><div className="space-y-3">{USAGE_BREAKDOWN.map((item) => (<div key={item.name}><div className="flex items-center justify-between mb-1"><span className="text-xs text-[var(--text-secondary)]">{item.name}</span><span className="text-xs text-white font-medium">{item.value}%</span></div><div className="h-2 bg-[var(--dark-surface-3)] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${item.value}%`, background: item.color }} /></div></div>))}</div></div>
    </div>
  )
}
