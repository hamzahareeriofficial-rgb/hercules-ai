import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Code, Wand2, CheckCircle, Loader2, XCircle, Clock, Sparkles, Image } from 'lucide-react'
import { useChatStore, type AgentStep, type ChatMessage } from '../../stores/chat'
import { cn } from '../../lib/utils'

const DEFAULT_STEPS: AgentStep[] = [
  { id: 'plan', name: 'Planning Architecture', status: 'completed', output: 'Selected Vite + React + Tailwind stack. Designed component tree.' },
  { id: 'schema', name: 'Generating Database Schema', status: 'completed', output: 'Created users, posts, and comments tables with RLS policies.' },
  { id: 'code', name: 'Writing Application Code', status: 'running', output: 'Generating React components, API routes, and Supabase client...' },
  { id: 'review', name: 'Code Review & Security Audit', status: 'pending', output: '' },
  { id: 'deploy', name: 'Deploying to Production', status: 'pending', output: '' },
]

export function AIChatWorkspace() {
  const { messages, isStreaming, addMessage, updateMessage, setStreaming } = useChatStore()
  const [prompt, setPrompt] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({ id: 'welcome', role: 'assistant', content: "👋 Hi! I'm your Hercules AI agent. Describe the app you want to build.\n\nTry something like:\n• \"Build a SaaS dashboard with user auth, Stripe payments, and a real-time data table\"\n• \"Create a social media scheduling app with a calendar view and analytics\"\n• \"Generate a full-stack e-commerce store with cart, checkout, and admin panel\"", timestamp: new Date().toISOString() })
    }
  }, [])

  const handleSend = () => {
    if (!prompt.trim() || isStreaming) return
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: prompt, timestamp: new Date().toISOString() }
    const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', timestamp: new Date().toISOString(), steps: DEFAULT_STEPS.map((s) => ({ ...s, status: 'pending' as const, output: '' })), isStreaming: true }
    addMessage(userMsg); addMessage(assistantMsg); setPrompt(''); setStreaming(true)
    simulateAgentSteps(assistantMsg.id)
  }

  const simulateAgentSteps = (msgId: string) => {
    const steps = [...DEFAULT_STEPS]; let stepIdx = 0
    const advanceStep = () => {
      if (stepIdx > 0) updateMessage(msgId, { steps: steps.map((s, i) => i < stepIdx ? { ...s, status: 'completed' as const, output: s.output || 'Done' } : s) })
      if (stepIdx >= steps.length) {
        updateMessage(msgId, { isStreaming: false, content: "✅ **Your app has been built successfully!**\n\n📁 **Project Structure**\n• `/src/components/` — React components with TypeScript\n• `/src/pages/` — Route pages with proper layouts\n• `/src/lib/` — Supabase client, Stripe, and utility modules\n🔗 **GitHub**: Repository created\n🗄️ **Supabase**: Tables and API routes configured\n💳 **Stripe**: Checkout flow and webhook handler added\n\nPreview the app in the **Preview** tab or continue refining!", steps: steps.map((s) => ({ ...s, status: 'completed' as const })) })
        setStreaming(false); return
      }
      updateMessage(msgId, { steps: steps.map((s, i) => i < stepIdx ? { ...s, status: 'completed' as const, output: s.output || 'Done' } : i === stepIdx ? { ...s, status: 'running' as const } : s) })
      setTimeout(advanceStep, 1200 + Math.random() * 800); stepIdx++
    }
    setTimeout(advanceStep, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('max-w-3xl mx-auto w-full', msg.role === 'user' ? 'flex justify-end' : '')}>
            {msg.role === 'user' ? (
              <div className="bg-gradient-to-br from-[var(--rose-500)]/20 to-[var(--gold-500)]/10 border border-[var(--rose-500)]/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]"><p className="text-white text-sm whitespace-pre-wrap">{msg.content}</p></div>
            ) : (
              <div className="space-y-3">
                {msg.steps && msg.steps.length > 0 && (
                  <div className="glass-card p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] mb-2"><Wand2 className="w-3.5 h-3.5 text-[var(--gold-500)]" />AGENT WORKFLOW</div>
                    {msg.steps.map((step) => (
                      <div key={step.id} className={cn('flex items-center gap-3 py-1.5 px-2 rounded-lg transition-all', step.status === 'running' && 'bg-[var(--gold-500)]/5')}>
                        <StepIcon status={step.status} />
                        <span className={cn('text-sm flex-1', step.status === 'completed' && 'text-[var(--text-secondary)]', step.status === 'running' && 'text-white font-medium', step.status === 'failed' && 'text-red-400', step.status === 'pending' && 'text-[var(--text-muted)]')}>{step.name}</span>
                        {step.output && step.status === 'completed' && <span className="text-xs text-[var(--text-muted)] truncate max-w-[200px] hidden sm:inline">{step.output.slice(0, 40)}...</span>}
                      </div>
                    ))}
                  </div>
                )}
                {msg.content && <div className="message-content text-[var(--text-secondary)] text-sm leading-relaxed">{msg.content}</div>}
                {msg.isStreaming && !msg.content && <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm"><div className="flex gap-1"><span className="w-2 h-2 bg-[var(--gold-500)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-2 h-2 bg-[var(--gold-500)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 bg-[var(--gold-500)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div><span>AI agents working...</span></div>}
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t border-[var(--dark-border)] bg-[var(--dark-surface)]/80 backdrop-blur-xl p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-[var(--dark-surface-2)] border border-[var(--dark-border)] rounded-2xl p-2 focus-within:border-[var(--gold-500)] focus-within:shadow-[var(--gold-glow)] transition-all">
            <div className="flex gap-1 pl-2 pb-2">
              <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--dark-surface-3)] transition-colors"><Paperclip className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--dark-surface-3)] transition-colors"><Code className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--dark-surface-3)] transition-colors"><Image className="w-4 h-4" /></button>
            </div>
            <textarea ref={inputRef} value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={handleKeyDown} placeholder="Describe the app you want to build..." rows={2} className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-white placeholder-[var(--text-muted)] py-2 px-1" />
            <button onClick={handleSend} disabled={!prompt.trim() || isStreaming} className={cn('p-2.5 rounded-xl transition-all flex-shrink-0', prompt.trim() && !isStreaming ? 'bg-gradient-to-br from-[var(--gold-500)] to-[var(--rose-500)] text-white shadow-[var(--gold-glow)] hover:shadow-[var(--gold-glow-strong)]' : 'bg-[var(--dark-surface-3)] text-[var(--text-muted)] cursor-not-allowed')}>{isStreaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}</button>
          </div>
          <div className="flex items-center gap-4 mt-2 px-2"><span className="text-xs text-[var(--text-muted)]">Press Enter to send, Shift+Enter for new line</span><span className="text-xs text-[var(--text-muted)]">|</span><button className="text-xs text-[var(--gold-500)] hover:underline">Clear chat</button></div>
        </div>
      </div>
    </div>
  )
}

function StepIcon({ status }: { status: AgentStep['status'] }) {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
    case 'running': return <Loader2 className="w-4 h-4 text-[var(--gold-500)] animate-spin flex-shrink-0" />
    case 'failed': return <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
    default: return <Clock className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
  }
}
