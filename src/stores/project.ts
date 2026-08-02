import { create } from 'zustand'
import type { Project, AgentLog, Integration } from '../lib/supabase'

type ProjectStore = {
  projects: Project[]
  activeProject: Project | null
  agentLogs: AgentLog[]
  integrations: Integration[]
  setProjects: (projects: Project[]) => void
  setActiveProject: (project: Project | null) => void
  addProject: (project: Project) => void
  setAgentLogs: (logs: AgentLog[]) => void
  setIntegrations: (integrations: Integration[]) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  activeProject: null,
  agentLogs: [],
  integrations: [],
  setProjects: (projects) => set({ projects }),
  setActiveProject: (activeProject) => set({ activeProject }),
  addProject: (project) => set((s) => ({ projects: [project, ...s.projects] })),
  setAgentLogs: (agentLogs) => set({ agentLogs }),
  setIntegrations: (integrations) => set({ integrations }),
}))
