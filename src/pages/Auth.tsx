import { useState } from 'react'
import { Mail, Lock, GitBranch, Globe, Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px`,
          background: i % 3 === 0 ? '#D4AF37' : '#F06292',
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.4 + 0.1,
          animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}
    </div>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setIsLoading(true); setTimeout(() => { setIsLoading(false); navigate('/dashboard') }, 1500) }

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] flex items-center justify-center relative overflow-hidden p-4">
      <FloatingParticles />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--rose-500)] opacity-[0.04] blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--gold-500)] opacity-[0.04] blur-[100px] rounded-full" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold-500)] to-[var(--rose-500)] flex items-center justify-center shadow-[var(--gold-glow)]"><Sparkles className="w-5 h-5 text-white" /></div>
            <span className="text-2xl font-bold"><span className="text-white">Hercules</span><span className="pink-gold-text">.ai</span></span>
          </Link>
          <p className="text-[var(--text-secondary)] mt-3 text-sm">Welcome back — continue building with AI</p>
        </div>
        <div className="glass-card p-8">
          <h1 className="text-xl font-semibold text-white mb-6">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-dark pl-10" placeholder="you@example.com" required /></div>
            </div>
            <div><label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Password</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" /><input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-dark pl-10 pr-10" placeholder="••••••••" required /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
            </div>
            <button type="submit" disabled={isLoading} className={cn('btn-gold w-full flex items-center justify-center gap-2 py-3', isLoading && 'opacity-60 cursor-not-allowed')}>{isLoading ? (<div className="w-5 h-5 border-2 border-[var(--dark-bg)] border-t-transparent rounded-full animate-spin" />) : (<>Sign In <ArrowRight className="w-4 h-4" /></>)}</button>
          </form>
          <div className="my-6 flex items-center gap-3"><div className="flex-1 h-px bg-[var(--dark-border)]" /><span className="text-xs text-[var(--text-muted)]">or continue with</span><div className="flex-1 h-px bg-[var(--dark-border)]" /></div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--dark-border)] text-[var(--text-secondary)] hover:bg-[var(--dark-surface-2)] transition-colors text-sm"><GitBranch className="w-4 h-4" />GitHub</button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--dark-border)] text-[var(--text-secondary)] hover:bg-[var(--dark-surface-2)] transition-colors text-sm"><Globe className="w-4 h-4" />Google</button>
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">Don't have an account? <Link to="/signup" className="text-[var(--gold-500)] hover:underline font-medium">Create one</Link></p>
      </div>
    </div>
  )
}

export function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setIsLoading(true); setTimeout(() => { setIsLoading(false); navigate('/dashboard') }, 1500) }

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] flex items-center justify-center relative overflow-hidden p-4">
      <FloatingParticles />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--rose-500)] opacity-[0.04] blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--gold-500)] opacity-[0.04] blur-[100px] rounded-full" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold-500)] to-[var(--rose-500)] flex items-center justify-center shadow-[var(--gold-glow)]"><Sparkles className="w-5 h-5 text-white" /></div>
            <span className="text-2xl font-bold"><span className="text-white">Hercules</span><span className="pink-gold-text">.ai</span></span>
          </Link>
          <p className="text-[var(--text-secondary)] mt-3 text-sm">Start building production apps with AI</p>
        </div>
        <div className="glass-card p-8">
          <h1 className="text-xl font-semibold text-white mb-6">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-dark" placeholder="John Doe" required /></div>
            <div><label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-dark pl-10" placeholder="you@example.com" required /></div></div>
            <div><label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" /><input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-dark pl-10 pr-10" placeholder="Min. 8 characters" required minLength={8} /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
            <button type="submit" disabled={isLoading} className={cn('btn-gold w-full flex items-center justify-center gap-2 py-3', isLoading && 'opacity-60 cursor-not-allowed')}>{isLoading ? (<div className="w-5 h-5 border-2 border-[var(--dark-bg)] border-t-transparent rounded-full animate-spin" />) : (<>Create Account <ArrowRight className="w-4 h-4" /></>)}</button>
          </form>
          <div className="my-6 flex items-center gap-3"><div className="flex-1 h-px bg-[var(--dark-border)]" /><span className="text-xs text-[var(--text-muted)]">or continue with</span><div className="flex-1 h-px bg-[var(--dark-border)]" /></div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--dark-border)] text-[var(--text-secondary)] hover:bg-[var(--dark-surface-2)] transition-colors text-sm"><GitBranch className="w-4 h-4" />GitHub</button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--dark-border)] text-[var(--text-secondary)] hover:bg-[var(--dark-surface-2)] transition-colors text-sm"><Globe className="w-4 h-4" />Google</button>
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">Already have an account? <Link to="/login" className="text-[var(--gold-500)] hover:underline font-medium">Sign In</Link></p>
      </div>
    </div>
  )
}
