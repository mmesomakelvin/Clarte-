# Clarté - Dental Billing Management System

A modern, multi-tenant web application for dental office billing management. Replaces Google Sheets with dashboards, CSV import workflows, and historical trend analytics.

## Tech Stack

### Frontend (What Users See)
- **Next.js 15** - Framework for building the website with React (App Router)
- **React 19** - Library for building reusable UI components
- **TypeScript** - JavaScript with type safety (catches errors before runtime)
- **Tailwind CSS** - Utility-first CSS for styling
- **shadcn/ui** - Pre-built, beautiful UI components
- **Recharts** - Charting library for data visualization

### Backend (Behind the Scenes)
- **Supabase** - Backend-as-a-service providing:
  - PostgreSQL database
  - User authentication
  - Row Level Security (multi-tenant data isolation)
- **Vercel** - Hosting platform for deployment (planned)

## Current Status

### Completed
- [x] **Project Setup** - Next.js 15 with App Router, TypeScript, Tailwind CSS
- [x] **UI Components** - shadcn/ui library (button, card, input, select, table, tabs, badge, dialog, dropdown-menu, sheet)
- [x] **Database Schema** - 9 tables with Row Level Security policies
  - `offices` - Dental practices (tenant boundary)
  - `profiles` - User accounts linked to Supabase Auth
  - `office_memberships` - Links users to offices with roles
  - `claims` - Insurance claims
  - `ar_records` - Accounts receivable
  - `credits` - Patient credit balances
  - `wallets` - Prepaid patient balances
  - `monthly_snapshots` - Historical metrics
  - `import_history` - CSV import audit trail
- [x] **Authentication** - Login/signup pages with Supabase Auth
- [x] **Route Protection** - Middleware redirects unauthenticated users
- [x] **Dashboard** - Real data from Supabase (claims, AR, credits, wallets stats)
- [x] **User Profile** - Header shows logged-in user info with sign out

### In Progress / Next Steps
- [ ] **Claims Page** - Connect to real Supabase data
- [ ] **AR Page** - Connect to real Supabase data
- [ ] **Credits & Wallets Page** - Connect to real Supabase data
- [ ] **CSV Import** - Drag-and-drop file upload with validation
- [ ] **Detail Panels** - Click row to see full details in slide-out panel
- [ ] **Settings Page** - Carrier rules, auto-flagging configuration
- [ ] **Monthly Snapshots** - Automatic historical data capture
- [ ] **Vercel Deployment** - Production hosting

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/mmesomakelvin/Clarte-.git
cd Clarte-

# Install dependencies
npm install

# Set up environment variables
# Create .env.local with your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Clarte-/
├── app/
│   ├── (auth)/                 # Auth pages (no sidebar)
│   │   ├── login/page.tsx      # Login page
│   │   ├── signup/page.tsx     # Signup page
│   │   └── auth/callback/      # OAuth callback
│   ├── (dashboard)/            # Dashboard pages (with sidebar)
│   │   ├── page.tsx            # Dashboard (/)
│   │   ├── claims/page.tsx     # Claims (/claims)
│   │   ├── ar/page.tsx         # AR (/ar)
│   │   ├── credits/page.tsx    # Credits (/credits)
│   │   └── settings/page.tsx   # Settings (/settings)
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── shared/                 # Reusable components (Card, Table, Tabs)
│   ├── Dashboard.tsx           # Dashboard with Supabase data
│   ├── Sidebar.tsx             # Navigation sidebar
│   └── Header.tsx              # Header with user info
├── lib/
│   ├── utils.ts                # Utility functions (cn)
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server Supabase client
│       └── queries.ts          # Data fetching functions
├── data/
│   └── mockData.ts             # Sample data (being replaced)
├── middleware.ts               # Route protection
├── tailwind.config.ts          # Custom theme
└── .env.local                  # Environment variables (not in git)
```

## App Sections

| Section | Route | Description | Status |
|---------|-------|-------------|--------|
| Dashboard | `/` | KPIs, AR aging, trends | Connected to Supabase |
| Claims | `/claims` | Insurance claim tracking | Mock data |
| Accounts Receivable | `/ar` | Patient balance aging | Mock data |
| Credits & Wallets | `/credits` | Overpayments & prepaid | Mock data |
| Settings | `/settings` | Configuration & admin | UI only |

## Database Schema

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│   offices   │────<│ office_memberships│>────│  profiles   │
└─────────────┘     └──────────────────┘     └─────────────┘
       │                                            │
       │                                            │
       ├──────────────┬──────────────┬─────────────┤
       │              │              │             │
       ▼              ▼              ▼             ▼
┌─────────────┐ ┌───────────┐ ┌──────────┐ ┌─────────────┐
│   claims    │ │ ar_records│ │ credits  │ │   wallets   │
└─────────────┘ └───────────┘ └──────────┘ └─────────────┘
       │
       ▼
┌──────────────────┐     ┌────────────────┐
│ monthly_snapshots│     │ import_history │
└──────────────────┘     └────────────────┘
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Orange 500 | `#F97316` | Primary accent, buttons |
| Orange 600 | `#EA580C` | Primary hover |
| Gray 50-900 | Various | Text, backgrounds, borders |

## Contributing

This project is being developed as part of a dental billing modernization initiative.

## License

Private - All rights reserved.
