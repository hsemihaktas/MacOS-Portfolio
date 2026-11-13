# macOS Portfolio — Hasan Semih Aktaş

A personal portfolio website built as a macOS desktop experience — complete with a dock, windows, Spotlight search, boot screen, Terminal, and more.

**Live:** [hsemihaktas.vercel.app](https://hsemihaktas.vercel.app)

---

## Tech Stack

| Layer     | Tech                    |
| --------- | ----------------------- |
| Framework | Next.js 16 (App Router) |
| UI        | React 19 + TypeScript 5 |
| Styling   | Tailwind CSS 4          |
| Database  | Supabase (PostgreSQL)   |
| Storage   | Supabase Storage        |
| Analytics | Firebase Analytics      |
| Email     | Resend                  |
| Deploy    | Vercel                  |

---

## Features

- **macOS desktop UI** — Dock, Menu Bar, draggable & resizable Windows, Spotlight (⌘K)
- **Boot screen** — S logo + progress bar on first visit
- **Terminal** — 14 commands: `whoami`, `ls`, `cat`, `open`, `cd`, `neofetch`, `github`, `linkedin`, `help`, and more
- **Projects** — 22+ projects with gallery, store screenshots, App Store links
- **App Store** — macOS App Store UI for mobile apps
- **Activity Monitor** — tech stack visualised as live processes
- **About** — GitHub contribution calendar (live), CV download, experience timeline
- **Settings** — Appearance, Display, Wi-Fi, Language, About This Portfolio
- **Notification Center** — portfolio news and live GitHub commit count
- **404 page** — macOS-style frosted glass dialog

---

## Architecture

All dynamic data (projects, about, skills) is stored in **Supabase** and fetched at runtime via `DataContext`. Static assets (wallpaper, icons, covers, screenshots) live in **Supabase Storage**.

```
lib/
  supabase.ts          — Supabase client + Storage helpers
  database.types.ts    — Generated TypeScript types
  queries/index.ts     — Supabase query functions
  context/
    DataContext.tsx    — App-wide data provider (fetches from Supabase)
  data/
    common.ts          — UI labels (menu, settings)
    contact.ts         — Mail form labels
    index.ts           — DATA skeleton (filled by DataContext)
```

---

## Environment Variables

```env
# Resend (contact form)
RESEND_API_KEY=

# Firebase Analytics
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

---

## Supabase Schema

Tables: `projects`, `about`, `experience`, `skill_categories`, `skills`

Storage buckets:

- `images` — project covers, galleries, app screenshots
- `assets` — wallpaper, profile picture, OG image, dock icons, CV

Run schema: `supabase db query --remote --file supabase/schema.sql --yes`

---

## Getting Started

```bash
npm install
npm run dev
```

---

© 2026 Hasan Semih Aktaş
