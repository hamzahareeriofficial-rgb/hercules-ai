import { ArrowRight, Sparkles, GitBranch, Database, Zap, Code, Layers, Shield, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--dark-bg)] overflow-hidden">
      <nav className="relative z-10 border-b border-[var(--dark-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--gold-500)] to-[var(--rose-500)] flex items-center justify-center shadow-[var(--gold-glow)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Hercules<span className="pink-gold-text">.ai</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium">Sign In</Link>
            <Link to="/signup" className="btn-gold text-sm py-2 px-4">Get Started Free</Link>
          </div>
        </div>
      </nav>
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--rose-500)] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[var(--gold-500)] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[var(--dark-surface-2)] border border-[var(--dark-border)] rounded-full px-4 py-1.5 text-xs text-[var(--text-secondary)] mb-8">
            <Star className="w-3.5 h-3.5 text-[var(--gold-500)] fill-[var(--gold-500)]" />
            Now with Stripe billing & GitHub sync
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto">
            <span className="text-white">Build Production Apps</span><br />
            <span className="pink-gold-text">With AI Command</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Describe your app idea in natural language. Our AI agents plan, code, review, and deploy full-stack applications with real-time preview, database generation, and one-click GitHub deployment.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/signup" className="btn-gold text-lg py-3.5 px-8 flex items-center gap-2">Start Building <ArrowRight className="w-5 h-5" /></Link>
            <Link to="/login" className="btn-outline-gold text-lg py-3.5 px-8">View Demo</Link>
          </div>
          <p className="mt-4 text-xs text-[var(--text-muted)]">Free tier available • No credit card required</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12"><h2 className="text-3xl font-bold text-white">Everything You Need</h2><p className="mt-3 text-[var(--text-secondary)]">A complete AI-powered development platform</p></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Zap, title: 'AI Code Generation', desc: 'Describe your app and get production-ready code with full-stack architecture, type safety, and best practices.' },
            { icon: Database, title: 'Auto Database Setup', desc: 'Backend schemas, migrations, and API endpoints generated and deployed to Supabase automatically.' },
            { icon: GitBranch, title: 'GitHub Integration', desc: 'One-click repo creation, automated commits, and branch management synced with your GitHub account.' },
            { icon: Layers, title: 'Live Preview', desc: 'Split-screen workspace with real-time app preview and full file tree explorer as the AI builds.' },
            { icon: Shield, title: 'Production Ready', desc: 'Security best practices, RLS policies, type-safe APIs, and optimized builds out of the box.' },
            { icon: Code, title: 'Multi-Framework', desc: 'Support for React, Next.js, Vite, Tailwind, and more — choose your stack or let AI decide.' },
            { icon: Sparkles, title: 'Agent Workflow', desc: 'Watch AI agents plan, generate, review, and deploy — each step visible in real-time.' },
            { icon: Star, title: 'Premium Support', desc: 'Priority assistance, custom integrations, and dedicated resources on Pro & Business plans.' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass-card p-6 hover:border-[var(--gold-500)] transition-all duration-300 group cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gold-500)]/20 to-[var(--rose-500)]/20 flex items-center justify-center mb-4 group-hover:shadow-[var(--gold-glow)] transition-shadow"><Icon className="w-5 h-5 text-[var(--gold-500)]" /></div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="glass-card p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--gold-500)] opacity-[0.05] blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--rose-500)] opacity-[0.05] blur-[100px] rounded-full" />
          <div className="relative z-10"><h2 className="text-3xl font-bold text-white">Ready to Build Something Amazing?</h2><p className="mt-3 text-[var(--text-secondary)] max-w-xl mx-auto">Join thousands of developers using Hercules.ai to ship production apps 10x faster.</p><Link to="/signup" className="btn-gold inline-flex items-center gap-2 mt-8 text-lg py-3.5 px-8">Get Started Free <ArrowRight className="w-5 h-5" /></Link></div>
        </div>
      </section>
      <footer className="border-t border-[var(--dark-border)] py-8 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"><div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[var(--gold-500)]" /><span className="text-sm text-[var(--text-muted)]">© 2026 Hercules.ai — Built with AI</span></div><div className="flex items-center gap-6 text-sm text-[var(--text-muted)]"><a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Privacy</a><a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Terms</a><a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Docs</a><a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Status</a></div></div></footer>
    </div>
  )
}
