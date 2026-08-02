import { create } from 'zustand'

type AppStore = {
  sidebarOpen: boolean
  activeView: 'chat' | 'projects' | 'database' | 'integrations' | 'billing' | 'preview'
  toggleSidebar: () => void
  setSidebarOpen: (v: boolean) => void
  setActiveView: (v: AppStore['activeView']) => void
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarOpen: true,
  activeView: 'chat',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setActiveView: (activeView) => set({ activeView }),
}))
