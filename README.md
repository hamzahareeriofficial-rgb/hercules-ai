# 🏗️ Hercules.ai — AI App Builder & Workspace Automation

A production-ready full-stack AI App Builder platform inspired by Hercules.ai. Describe your app idea in natural language and let AI agents plan, code, review, and deploy.

## 🎨 Design System — Pink & Gold Theme

- **Primary**: Elegant Soft Pink / Rose Pink (`#F06292`) + Luxe Gold (`#D4AF37` / `#FFD700`)
- **Components**: Glassmorphism cards, gold glow effects, smooth rounded corners (`rounded-2xl`)
- **Typography**: Inter font family, dark background (`#0A0A0F`), clean hierarchy

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 19 + Vite 8 + TypeScript |
| Styling | Tailwind CSS 4 + Custom CSS Variables |
| Icons | Lucide React |
| State | Zustand 5 |
| Routing | React Router 7 |
| Charts | Recharts |
| Backend | Supabase (Auth + Database + RLS) |
| Payments | Stripe (Subscriptions + Credit Top-ups) |
| CI/CD | GitHub |

## 📁 Project Structure

```
hercules-ai/
├── supabase/
│   └── schema.sql              # Production DB schema (7 tables, RLS, triggers)
├── src/
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # Router (10 routes)
│   ├── styles/
│   │   └── globals.css         # Pink & Gold theme system
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client + types
│   │   ├── stripe.ts           # Stripe loader + price IDs
│   │   └── utils.ts            # cn(), formatCredits(), TIERS, CREDIT_PACKS
│   ├── stores/                 # Zustand state management
│   │   ├── auth.ts             # User authentication
│   │   ├── app.ts              # App UI state
│   │   ├── chat.ts             # Chat messages + agent steps
│   │   └── project.ts          # Projects + integrations
│   ├── pages/
│   │   ├── Landing.tsx         # Hero, features grid, CTA
│   │   └── Auth.tsx            # Login + Signup
│   └── components/
│       ├── layout/
│       │   └── DashboardLayout.tsx  # Sidebar, header, credit badge
│       ├── chat/
│       │   └── AIChatWorkspace.tsx  # Multi-modal prompt + agent workflow
│       ├── projects/
│       │   └── ProjectsPage.tsx     # Filterable project grid
│       ├── database/
│       │   └── DatabaseManager.tsx  # Schema visualizer + SQL editor
│       ├── preview/
│       │   └── PreviewPage.tsx      # Split-screen live preview
│       ├── billing/
│       │   └── BillingPage.tsx      # Stripe plans + credits
│       ├── settings/
│       │   └── IntegrationsPage.tsx # Service connections
│       └── dashboard/
│           └── AnalyticsPage.tsx    # Charts + usage metrics
├── package.json
├── tsconfig.json
├── vite.config.js
└── index.html
```

## 🔧 Getting Started

```bash
# Clone
gh repo clone hamzahareeriofficial-rgb/hercules-ai
cd hercules-ai

# Install
npm install

# Environment
cp .env.example .env
# Fill in: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_STRIPE_PUBLISHABLE_KEY

# Develop
npm run dev

# Build
npm run build
```

## 🗄️ Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Enable Auth providers (Email, Google, GitHub)
4. Copy the project URL and anon key to `.env`

## 💳 Stripe Setup

1. Create products/prices for Pro ($29/mo) and Business ($99/mo)
2. Create one-time payment products for credit packs
3. Set up webhook endpoint for `checkout.session.completed`
4. Copy publishable key and price IDs to `.env`

## 📄 License

MIT
