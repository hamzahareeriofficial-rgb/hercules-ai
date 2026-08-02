import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/Landing'
import { LoginPage, SignupPage } from './pages/Auth'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { AIChatWorkspace } from './components/chat/AIChatWorkspace'
import { ProjectsPage } from './components/projects/ProjectsPage'
import { DatabaseManagerPage } from './components/database/DatabaseManager'
import { PreviewPage } from './components/preview/PreviewPage'
import { BillingPage } from './components/billing/BillingPage'
import { IntegrationsPage } from './components/settings/IntegrationsPage'
import { AnalyticsPage } from './components/dashboard/AnalyticsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout><AIChatWorkspace /></DashboardLayout>} />
        <Route path="/dashboard/projects" element={<DashboardLayout><ProjectsPage /></DashboardLayout>} />
        <Route path="/dashboard/database" element={<DashboardLayout><DatabaseManagerPage /></DashboardLayout>} />
        <Route path="/dashboard/preview" element={<DashboardLayout><PreviewPage /></DashboardLayout>} />
        <Route path="/dashboard/billing" element={<DashboardLayout><BillingPage /></DashboardLayout>} />
        <Route path="/dashboard/integrations" element={<DashboardLayout><IntegrationsPage /></DashboardLayout>} />
        <Route path="/dashboard/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
