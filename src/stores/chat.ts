import { create } from 'zustand'

export type AgentStep = {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  output?: string
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  steps?: AgentStep[]
  isStreaming?: boolean
}

type ChatStore = {
  messages: ChatMessage[]
  isStreaming: boolean
  addMessage: (msg: ChatMessage) => void
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void
  setStreaming: (v: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isStreaming: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  updateMessage: (id, updates) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
  setStreaming: (isStreaming) => set({ isStreaming }),
  clearMessages: () => set({ messages: [], isStreaming: false }),
}))
