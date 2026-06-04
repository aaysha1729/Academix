# Academix — Next-Gen Learning Dashboard

A premium, dark-mode student dashboard prototype built with **Next.js App Router**, **Supabase**, **Tailwind CSS**, and **Framer Motion**. Features a Bento Grid layout with real-time data fetching, buttery-smooth animations, and responsive design.

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework with Server/Client Component architecture |
| **Supabase** | PostgreSQL database + BaaS for course data |
| **Tailwind CSS** | Utility-first styling with dark theme |
| **Motion** (Framer Motion) | Spring-physics animations, layout transitions |
| **Lucide React** | Lightweight, tree-shakeable icon library |
| **TypeScript** | Type safety for data payloads and components |

## 🏗️ Architecture

### Server vs Client Component Split

The app follows a deliberate Server/Client boundary strategy:

**Server Components (data + layout):**
- `app/layout.tsx` — Root layout with font loading and semantic structure
- `app/dashboard/page.tsx` — Fetches courses from Supabase, passes to client
- `app/courses/page.tsx` — Fetches all courses, renders grid
- `app/settings/page.tsx` — Client component with staggered motion container

**Client Components (interactivity + animations):**
- `components/layout/Sidebar.tsx` — Active nav highlight with `layoutId`
- `components/dashboard/BentoGrid.tsx` — Staggered entrance container
- `components/dashboard/CourseTileSmall.tsx` — Hover scale + progress animation
- `components/ui/ProgressBar.tsx` — GPU-accelerated `scaleX` animation
- `components/ui/Toggle.tsx` — Animated switch with spring physics

### Data Flow

```
Supabase (PostgreSQL)
    ↓ fetch via @supabase/ssr (server-side)
Server Component (page.tsx)
    ↓ pass as props
Client Component (BentoGrid → CourseTile)
    ↓ render with animations
Browser (GPU-accelerated transforms)
```

### Key Design Decisions

1. **`scaleX` instead of `width` for progress bars** — Uses GPU compositor thread, avoids layout reflows
2. **`layoutId` for nav highlights** — Framer Motion automatically animates position changes between nav items using transforms
3. **Spring physics everywhere** — `{ type: "spring", stiffness: 300, damping: 20 }` for natural, non-linear motion
4. **Deterministic activity graph** — Uses `Math.sin` seeded patterns instead of `Math.random` to avoid hydration mismatches
5. **Dynamic icon mapping** — Maps `icon_name` strings from the database to Lucide components via a typed record, avoiding bundling all icons

## 🗄️ Database Schema

### `courses` table

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary key (auto-generated) |
| `title` | TEXT | Course name |
| `description` | TEXT | Course description |
| `progress` | INTEGER | Completion percentage (0-100) |
| `icon_name` | TEXT | Lucide icon component name |
| `level` | TEXT | Badge label (ADVANCED, NEW, etc.) |
| `last_accessed` | TEXT | Human-readable timestamp |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

## ⚡ Animation Strategy

All animations use **only `transform` and `opacity`** — GPU-accelerated properties that never trigger browser layout/paint:

| Animation | Property | Config |
|---|---|---|
| Staggered entrance | `y` + `opacity` | `staggerChildren: 0.08` |
| Card hover | `scale` | Spring: stiffness 300, damping 20 |
| Nav highlight | `layoutId` (auto transform) | Spring: stiffness 350, damping 30 |
| Progress bar | `scaleX` | Duration 1.2s, easeOut |
| Activity cells | `scale` + `opacity` | Staggered by position |

## 📱 Responsive Breakpoints

| Viewport | Sidebar | Grid | Navigation |
|---|---|---|---|
| Desktop (>=1024px) | Full with labels | 3 columns | Sidebar |
| Tablet (768-1023px) | Icons only | 2 columns | Sidebar (collapsed) |
| Mobile (<768px) | Hidden | 1 column | Bottom nav bar |

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaysha1729/Academix.git
   cd Academix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials.

4. **Set up the database:**
   Run the following SQL in the Supabase SQL Editor:

   ```sql
   -- Create courses table
   CREATE TABLE courses (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     progress INTEGER NOT NULL DEFAULT 0,
     icon_name TEXT NOT NULL,
     level TEXT DEFAULT 'IN PROGRESS',
     last_accessed TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable Row Level Security with public read access
   ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow public read" ON courses FOR SELECT USING (true);

   -- Grant read permission to the anon role
   GRANT SELECT ON public.courses TO anon;

   -- Seed courses
   INSERT INTO courses (title, description, progress, icon_name, level, last_accessed, created_at) VALUES
     ('Advanced React Patterns', 'Master compound components, HOCs, and render props for scalable...', 75, 'Braces', 'ADVANCED', 'Accessed 2h ago', NOW() - INTERVAL '2 days'),
     ('System Design Fundamentals', 'Learn to architect large-scale distributed systems, load balancing,...', 42, 'Monitor', 'INTERMEDIATE', 'Accessed yesterday', NOW() - INTERVAL '5 days'),
     ('Machine Learning Basics', 'Introduction to supervised learning, neural networks, and data...', 0, 'Brain', 'NEW', NULL, NOW() - INTERVAL '1 day'),
     ('Data Structures & Algorithms', 'Essential problem-solving techniques covering trees, graphs, and dynamic...', 100, 'GitMerge', 'ALMOST DONE', 'Finished 3 days ago', NOW() - INTERVAL '14 days'),
     ('Database Systems', 'Deep dive into SQL, NoSQL architectures, and database...', 12, 'Database', 'IN PROGRESS', 'Accessed 5h ago', NOW() - INTERVAL '7 days'),
     ('Operating Systems', 'Understand process scheduling, memory management, and file...', 88, 'Cpu', 'IN PROGRESS', 'Accessed yesterday', NOW() - INTERVAL '10 days');
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter font, sidebar, dark theme)
│   ├── page.tsx                # Redirects to /dashboard
│   ├── globals.css             # Base styles + custom scrollbar
│   ├── dashboard/
│   │   ├── page.tsx            # Server Component - Supabase fetch
│   │   └── loading.tsx         # Skeleton loaders
│   ├── courses/
│   │   ├── page.tsx            # Server Component - all courses
│   │   └── loading.tsx         # Skeleton loaders
│   └── settings/
│       ├── page.tsx            # Settings layout
│       └── loading.tsx         # Skeleton loaders
├── components/
│   ├── layout/                 # Sidebar, TopBar, MobileNav
│   ├── dashboard/              # HeroTile, CourseTileSmall, ActivityTile, BentoGrid
│   ├── courses/                # CourseCard, CourseGrid
│   ├── settings/               # ProfileCard, AccountPrefs, AppearanceCard, LearningPrefs
│   └── ui/                     # ProgressBar, Badge, Toggle, SkeletonCard, DynamicIcon
├── lib/supabase/               # Server + browser Supabase clients
└── types/                      # TypeScript interfaces
```

## 🚢 Deployment

Deploy to [Vercel](https://vercel.com):
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## 📝 Challenges and Notes

- **Hydration safety**: Activity graph uses Math.sin-based deterministic patterns instead of Math.random to prevent server/client mismatches
- **Next.js 15+ async cookies**: The Supabase server client uses the new async cookies() API
- **Motion package rename**: Using the motion package (successor to framer-motion) with motion/react imports
- **Bundle optimization**: Dynamic icon mapping avoids importing all 1000+ Lucide icons
