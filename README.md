# Clarté - Dental Billing Management System

A modern, multi-tenant web application for dental office billing management. Replaces Google Sheets with dashboards, CSV import workflows, and historical trend analytics.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Database**: Supabase (PostgreSQL) - *coming soon*
- **Auth**: Supabase Auth - *coming soon*

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

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
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (sidebar + header)
│   ├── page.tsx            # Dashboard (/)
│   ├── globals.css         # Tailwind + global styles
│   ├── claims/page.tsx     # Claims management (/claims)
│   ├── ar/page.tsx         # Accounts Receivable (/ar)
│   ├── credits/page.tsx    # Credits & Wallets (/credits)
│   └── settings/page.tsx   # Settings (/settings)
├── components/             # React components
│   ├── Dashboard.tsx       # KPI cards, charts, alerts
│   ├── Claims.tsx          # Claims table with tabs
│   ├── AccountsReceivable.tsx  # AR aging buckets
│   ├── CreditsWallets.tsx  # Credits & wallets tabs
│   ├── Settings.tsx        # Configuration panels
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Header.tsx          # Top header with office selector
│   └── shared/             # Reusable UI components
│       ├── Card.tsx        # Stat card
│       ├── Table.tsx       # Generic data table
│       └── Tabs.tsx        # Tab navigation
├── data/
│   └── mockData.ts         # Sample data for development
├── types.ts                # TypeScript interfaces & enums
├── tailwind.config.ts      # Custom theme (clarte colors)
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## Features

### Current (MVP)
- [x] Dashboard with KPI cards and trend charts
- [x] Claims management with OI 0-30 / OI 30+ tabs
- [x] Accounts Receivable with 5 aging buckets
- [x] Credits & Wallets tracking
- [x] Settings page structure
- [x] Responsive sidebar navigation
- [x] Office selector in header

### Roadmap
- [ ] Supabase integration (database + auth)
- [ ] CSV import with drag-and-drop
- [ ] Row-Level Security (multi-tenant)
- [ ] Real data persistence
- [ ] Monthly snapshots
- [ ] Carrier auto-flagging rules
- [ ] Bulk actions
- [ ] Detail slide-out panels
- [ ] Export functionality

## App Sections

| Section | Route | Description |
|---------|-------|-------------|
| Dashboard | `/` | KPIs, trends, alerts |
| Claims | `/claims` | Insurance claim tracking |
| Accounts Receivable | `/ar` | Patient balance aging |
| Credits & Wallets | `/credits` | Overpayments & prepaid balances |
| Settings | `/settings` | Configuration & admin |

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Orange 500 | `#F97316` | Primary accent |
| Orange 600 | `#EA580C` | Primary hover |
| Gray 50-900 | Various | Text, backgrounds, borders |

## Contributing

This project is being developed as part of a dental billing modernization initiative.

## License

Private - All rights reserved.
