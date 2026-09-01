# EYFI Challenge Leaderboard

An interactive, student-focused leaderboard experience designed for the EYFI Challenge, helping participants track earnings, rankings, campus competition, milestones, and hustle progress.

## 🚀 Live Demo

**[View the live EYFI Challenge Leaderboard](https://eyfi-challenge-leaderboard-5.onrender.com)**

The deployed application is publicly accessible at the link above.

---

## 1. Project Overview

The **EYFI Challenge** is an income-earning competition aimed at college students, encouraging participants to build real-world skills, launch hustles, and generate income while in school.

The **EYFI Challenge Leaderboard** ([Live Demo](https://eyfi-challenge-leaderboard-5.onrender.com)) serves as the central motivation engine and rank-tracking hub for the challenge. Built specifically for college students, the application turns income tracking into an engaging, gamified experience. It fosters healthy rivalry between individual hustlers, teams, and university campuses.

### Primary Goals
- **Student Engagement**: Motivate students through real-time rank updates, streaks, and milestone achievements.
- **Transparency & Trust**: Highlight verification statuses for reported student earnings.
- **Campus Pride**: Benchmark performance across colleges through a dedicated Campus Wars leaderboard.
- **Peer Inspiration**: Showcase real student hustle case studies and actionable playbooks.

---

## 2. Key Features

The repository contains a fully functional interactive frontend with the following verified features:

- **Interactive Leaderboard**: Toggle between **Individual**, **Team**, and **Campus** rankings.
- **Podium Display**: Dynamic top-3 podium highlighting leading hustlers and teams.
- **Search & Filtering**: Real-time filtering by category (*Freelancing, Building, Content, Tutoring, Selling, Other*), custom filters (*My College, Top 10, Rising Fast*), and instant search across names, colleges, and hustle titles.
- **Multi-Period Rankings**: Switch income views across **Overall**, **Weekly**, and **Today** metrics.
- **Earnings & Rank Tracking**: Real-time rank calculation, rank change indicators (climb/drop position counts), and income velocity sparklines.
- **Earnings Submission System**: Modal interface allowing users to submit new earnings, automatically updating local rank, college contribution totals, and streak counters.
- **Verification Status Indicators**: Visual badges indicating whether earnings are `verified`, `pending`, or `under_review`, along with a proof submission modal.
- **Campus Wars**: Aggregated college leaderboard displaying total campus income, participant volume, and top contributor spotlights.
- **Race to Top 10 & Gap Tracker**: Personal rank card showing the exact rupee gap to pass the next rival and the cutoff to reach the Top 10.
- **Bounty Board**: Browse and claim active income bounties filterable by category and difficulty.
- **Milestone Rewards**: Track unlocked milestone tiers (e.g., ₹10K Club, ₹50K Club, ₹100K Club) and claim rewards.
- **Hustle Case Studies ("How I Earned It")**: Detailed breakdowns of real student income stories, tools used, and client acquisition tactics.
- **Hall of Fame & Past Waves**: Historic records of previous challenge waves and overall top champions.
- **"While You Were Away" Recap**: Automated summary overlay showing position changes, new verified volume, and campus movements during inactive sessions.
- **WhatsApp Sharing**: Generate customized pre-formatted WhatsApp text links (`wa.me` / `api.whatsapp.com`) to share ranks, rank climbs, and challenge friends.
- **Privacy Settings**: Custom privacy options allowing participants to display full name, short name, or remain anonymous, with optional earnings concealment.
- **Sticky Rank Footer**: Mobile and desktop sticky rank bar that remains visible as users scroll through the leaderboard table.
- **Responsive Layout**: Desktop table layout with mobile-optimized cards and touch-friendly controls.

---

## 3. Product / Design Approach

The interface is engineered to evoke excitement, competition, and energy tailored to Gen-Z student hustlers.

### Visual Identity
- **Foundation**: Deep slate / near-black background (`#0B0F17`) creating a sleek, high-contrast dark theme.
- **Accents**: Electric lime / acid-green accents (`#CCFF00`) highlighting active states, top ranks, and positive rank climbs.
- **Currency Motifs**: Prominent Rupee (`₹`) styling across cards, badges, and progress meters.
- **Typography**: Modern, clean sans-serif typography with strong contrast hierarchy.

### Leaderboard Psychology
- **Competitive Momentum**: Live calculation of rank movement (+/- positions) and gap-to-next-rank indicators spark friendly rivalry.
- **Social Proof**: Case studies, verified badges, and campus aggregates inspire confidence and peer learning.
- **Gamification**: Badges (*TOP EARNER*, *ON FIRE*, *FASTEST RISER*, *CONSISTENT HUSTLER*), streaks, and milestone tiers reward sustained effort.

---

## 4. Live Leaderboard Experience

### Current Architecture

The application is built as a responsive Single Page Application (SPA) driven by client-side state management.

```
[ User Interaction ] 
       │
       ▼
[ React State Management (App.tsx) ] ◄──► [ Dynamic URL Parameters (URLSearchParams) ]
       │
       ▼
[ Client-Side Filtering, Sorting & Rank Recalculation ]
       │
       ▼
[ UI Components (Leaderboard, Campus Wars, Modals, Sticky Rank Bar) ]
```

- **URL Synchronization**: Active filters, sorting preferences, category selections, and search queries automatically sync with browser URL parameters (`?type=...&period=...&category=...`), enabling shareable leaderboard states.
- **In-Memory State Mutability**: Submitting new earnings or claiming bounties updates the local React state in real-time, instantly recalculating leaderboard ranks, college aggregates, and user streak meters for the session.

---

## 5. Technology Stack

### Core Technologies
- **Frontend Library**: React 19 (`react` ^19.0.1, `react-dom` ^19.0.1)
- **Build Tool / Bundler**: Vite 6 (`vite` ^6.2.3, `@vitejs/plugin-react` ^5.0.4)
- **Language**: TypeScript 5 (`typescript` ~5.8.2)
- **Styling**: Tailwind CSS v4 (`tailwindcss` ^4.1.14, `@tailwindcss/vite` ^4.1.14)
- **Icons**: Lucide React (`lucide-react` ^0.546.0)
- **Animations**: Motion / Framer Motion (`motion` ^12.23.24)

### Development & Configuration Dependencies
- **Type Definitions**: `@types/node`, `@types/express`
- **Build Engine**: `esbuild` ^0.25.0, `tsx` ^4.21.0
- **AI Dependencies (Remnant)**: `@google/genai` ^2.4.0

---

## 6. AI-Assisted Development

### Google AI Studio Origin

Initial project generation was done using Google AI Studio, followed by customization, feature development, testing, and deployment.

Evidence in the repository confirming AI Studio bootstrapping includes:
- **`metadata.json`**: Contains Google AI Studio configuration (`"majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]`).
- **`.env.example`**: Includes AI Studio secret injection directives (`# AI Studio automatically injects this at runtime...`).
- **`vite.config.ts`**: Contains AI Studio specific environment configurations (`// HMR is disabled in AI Studio via DISABLE_HMR env var.`).
- **`package.json`**: Includes default project scaffolding metadata (`"name": "react-example"`) and `@google/genai` package dependency.

### Subsequent Development & Enhancements
Following initial scaffolding, substantial manual development, refinement, and validation were performed on the repository:
- Implementation of full student leaderboard UI, podium design, and mobile-responsive cards.
- Development of the dynamic URL query parameter synchronization logic.
- Implementation of modal workflows (Earnings Submission, Case Studies, Bounty Board, Hall of Fame, Privacy Settings).
- Real-time in-memory rank recalculation and college points aggregation algorithms.
- Production build verification (`vite build`) and TypeScript type-checking (`tsc --noEmit`).
- Render Static Site deployment configuration (`render.yaml`).

### Runtime AI Dependencies
The `@google/genai` package is present in `package.json` as part of the initial AI Studio template, but **is not invoked in client runtime code**. All leaderboard functionality currently operates cleanly without requiring active external Gemini API calls.

---

## 7. Project Structure

```
eyfi-challenge-leaderboard/
├── public/                     # Static public assets
├── src/
│   ├── components/             # UI Components
│   │   ├── BountyBoard.tsx             # Interactive bounty listings
│   │   ├── CampusWars.tsx              # University campus leaderboard
│   │   ├── CategoryFilter.tsx          # Hustle category filter buttons
│   │   ├── ChallengeFriendModal.tsx    # WhatsApp peer challenge modal
│   │   ├── FastestRisers.tsx           # Spotlight on highest rank gains
│   │   ├── FilterBar.tsx               # Search, period & sort controls
│   │   ├── Footer.tsx                  # App footer and quick links
│   │   ├── HallOfFameModal.tsx         # Historic wave winners
│   │   ├── Header.tsx                  # Top navigation & total volume counter
│   │   ├── Hero.tsx                    # Banner & primary call-to-action
│   │   ├── HowIEarnedItModal.tsx       # Hustle case study detailed view
│   │   ├── LeaderboardMobileCard.tsx   # Mobile-optimized participant card
│   │   ├── LeaderboardModeToggle.tsx   # Individual / Team / College tabs
│   │   ├── LeaderboardRow.tsx          # Desktop table row item
│   │   ├── LeaderboardTable.tsx        # Leaderboard container table
│   │   ├── LiveSimulationBar.tsx       # Live activity toast notification ticker
│   │   ├── MilestoneRewardsDrawer.tsx  # Unlocked reward tiers drawer
│   │   ├── NotificationToast.tsx       # Toast notification alert component
│   │   ├── ParticipantDetailModal.tsx  # Detailed student profile view
│   │   ├── Podium.tsx                  # Top 3 student/team podium view
│   │   ├── PrivacySettingsModal.tsx    # Anonymity & privacy controls
│   │   ├── RaceToTop10.tsx             # Gap to next rank & Top 10 tracker
│   │   ├── RankingInfo.tsx             # Challenge rules & criteria explanation
│   │   ├── ShareRankModal.tsx          # Social share modal with custom text
│   │   ├── StickyRankBar.tsx           # Floating rank bar on scroll
│   │   ├── SubmitEarningModal.tsx      # Earnings submission modal
│   │   ├── VerificationBadge.tsx       # Proof verification badge component
│   │   ├── VerificationModal.tsx       # Document proof submission modal
│   │   ├── WhatsAppNotificationModal.tsx # WhatsApp notification preferences modal
│   │   ├── WhileYouWereAwayModal.tsx   # Inactive session recap overlay
│   │   └── YourRank.tsx                # Personal rank hero summary card
│   ├── data/
│   │   └── mockData.ts         # Initial participant, college & bounty data
│   ├── utils/
│   │   └── formatters.ts       # Rupee formatting & date utilities
│   ├── App.tsx                 # Main application state & layout assembly
│   ├── index.css               # Global CSS & Tailwind imports
│   ├── main.tsx                # React root entrypoint
│   └── types.ts                # TypeScript data interfaces
├── .env.example                # Environment variable documentation
├── index.html                  # HTML template
├── metadata.json               # Project capability metadata
├── package.json                # Project dependencies & scripts
├── render.yaml                 # Render static site deployment config
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite bundler configuration
```

---

## 8. Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ganesh-123-maker/eyfi-challenge-leaderboard.git
   cd eyfi-challenge-leaderboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Run TypeScript type verification**:
   ```bash
   npm run lint
   ```

---

## 9. Production Build

To build the static production bundle:

```bash
npm run build
```

- **Output Directory**: `dist/`
- **Output Artifacts**: Production-ready compiled HTML, optimized CSS, and minified JavaScript bundles (`dist/index.html`, `dist/assets/index-*.css`, `dist/assets/index-*.js`).

To preview the production build locally:
```bash
npm run preview
```

---

## 10. Render Deployment

The repository includes a ready-to-use `render.yaml` specification for zero-config deployment on Render as a Static Site.

### Deployment Parameters

| Setting | Value | Explanation |
|---|---|---|
| **Service Type** | Static Site | Serves pre-compiled HTML/JS assets from Vite build. |
| **Build Command** | `npm install && npm run build` | Installs project dependencies and compiles static assets into `dist/`. |
| **Publish Directory** | `dist` | Contains compiled bundle generated by Vite. |
| **Rewrite Rules** | `/*` → `/index.html` | Redirects all client routes to `index.html` for single-page routing support. |

*Note: No Start Command is required because the application is deployed as a static web site.*

---

## 11. Environment Variables

Environment configuration settings supported by the project:

| Variable | Purpose | Required | Default / Notes |
|---|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for server-side or client-side GenAI integrations. | Optional | Managed via secrets panel when deployed in AI Studio environments. |
| `APP_URL` | Application root URL for external link generation or OAuth callbacks. | Optional | Injected automatically in Cloud Run or custom environments. |
| `DISABLE_HMR` | Disables Vite Hot Module Replacement to prevent unnecessary refreshes during automated editing. | Optional | Set to `true` during automated agent development. |

---

## 12. WhatsApp Integration

### WhatsApp Sharing
**Status: Functional**
- Users can click **Share Rank** or **Challenge Friend** to generate formatted WhatsApp messages containing their current rank, total earnings, and personal challenge text.
- Formatted links utilize `https://api.whatsapp.com/send` and `https://wa.me/` endpoints to automatically open WhatsApp on mobile or web browsers.

### WhatsApp Notifications
**Status: UI / Preference Mockup**
- The WhatsApp Notification modal (`WhatsAppNotificationModal.tsx`) allows users to toggle alert preferences (instant rank changes, daily recap, weekly digest) and input their phone number into local state.
- *Note*: Sending actual automated WhatsApp push notifications requires a connected backend service utilizing the WhatsApp Cloud API, Twilio API, or an equivalent message gateway provider.

---

## 13. Data & Demo Mode

The leaderboard currently runs in **Demo Mode**:
- **Dataset**: Initialized with demonstration data (`MOCK_PARTICIPANTS`, `MOCK_TEAMS`, `MOCK_COLLEGES`) located in `src/data/mockData.ts`.
- **Interactive State**: Submitting earnings or claiming bounties updates in-memory React state, allowing users to experience live rank shifting, milestone unlocking, and college total updates during their session.
- **Disclaimer**: All participant profiles, college scores, and income amounts in demo mode are sample records created for demonstration purposes and do not represent actual EYFI participants.

---

## 14. Responsive Design

The application is designed for seamless interaction across device sizes:

- **Desktop (1024px+)**: Comprehensive multi-column table displaying velocity sparklines, category tags, proof counts, rank change indicators, and action buttons.
- **Tablet (768px - 1023px)**: Adaptive header layout, grid-based podium, and compact filter bars.
- **Mobile (< 768px)**: Table rows automatically transform into touch-friendly cards (`LeaderboardMobileCard.tsx`). A persistent bottom sticky bar (`StickyRankBar.tsx`) ensures users always see their personal rank and income gap while scrolling.

---

## 15. Testing & Quality Verification

All quality checks supported by the codebase have been empirically verified:

- **TypeScript Type Checking (`npm run lint`)**: Passed cleanly (`tsc --noEmit` exited with code 0, 0 type errors).
- **Production Build (`npm run build`)**: Passed cleanly (`vite build` compiled 1700+ modules into `dist/` in 5.2 seconds).
- **Dependencies**: Verified lockfile compatibility and dependency trees via `npm install`.

---

## 16. Known Limitations

- **Client-Side State Persistence**: Newly submitted earnings, privacy changes, and claimed bounties are stored in memory and reset upon page refresh.
- **No Persistence Backend**: Currently lacks a backend database (e.g., PostgreSQL, Supabase) or REST/GraphQL API for permanent data storage.
- **Authentication**: No user authentication system (OAuth/JWT) is currently wired up; switching user profiles is handled via local state.
- **Notification Delivery**: Automated WhatsApp/SMS alerts are UI-only and require backend integration with WhatsApp Cloud API.
- **Manual Verification Pipeline**: Earning proof uploads modify status in local state without server-side image auditing.

---

## 17. Roadmap

- [ ] **Persistent Database Backend**: Connect PostgreSQL / Supabase for persistent live earnings storage.
- [ ] **User Authentication**: Implement phone number OTP / Google OAuth login for verified student profiles.
- [ ] **WhatsApp Cloud API Integration**: Automated dispatch of instant rank change notifications and weekly digests.
- [ ] **AI Proof Auditing**: Use Gemini 2.5 Flash Vision to automatically inspect submitted earnings receipts and payment screenshots.
- [ ] **Admin Verification Dashboard**: Interface for EYFI challenge administrators to review pending submissions and approve bounty payouts.
- [ ] **Real-Time WebSockets**: Live leaderboard updates as rival participants log new income.

---

## 18. Contributing

Contributions to improve the EYFI Challenge Leaderboard are welcome!

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request.

---

## 19. License

License: Not currently specified.

---

## 20. Author & Project Links

- **Project**: EYFI Challenge Leaderboard
- **Live Demo**: [https://eyfi-challenge-leaderboard-5.onrender.com](https://eyfi-challenge-leaderboard-5.onrender.com)
- **Repository**: [https://github.com/Ganesh-123-maker/eyfi-challenge-leaderboard](https://github.com/Ganesh-123-maker/eyfi-challenge-leaderboard)
