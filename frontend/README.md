# ⚔ DSA Quest – Gamified DSA Learning

A React frontend for the DSA Quest hackathon project. Dark fantasy theme, animated castle that builds as you solve problems.

## Setup

```bash
npm install
npm run dev
```

## File Structure

```
src/
├── App.jsx                  # Main router (auth → connect → dashboard)
├── main.jsx                 # Entry point
├── styles/
│   └── global.css           # CSS variables, animations, global styles
├── data/
│   └── mockData.js          # All hardcoded mock data (stats, roadmap, castle)
├── pages/
│   ├── AuthPage.jsx         # Sign up + Login with validation
│   ├── ConnectPage.jsx      # Link LeetCode / Codeforces account
│   └── DashboardPage.jsx    # Main dashboard with stats + roadmap
└── components/
    ├── CastleMap.jsx        # Animated SVG castle (builds with progress)
    └── GoalModal.jsx        # 3-step goal setting modal
```

## What's Wired

- ✅ Signup: username (5-10 chars), email (pattern check), password + confirm with eye toggle
- ✅ Login: username + password with eye toggle; proceeds even without backend
- ✅ Axios calls to `/api/signup`, `/api/login`, `/api/connect-platform`, `/api/set-goal` 
- ✅ Platform connect (LeetCode / Codeforces) with user ID input
- ✅ Stats display: rank, total solved, category breakdown bars
- ✅ 3-step goal modal: aim → problem count → days
- ✅ Day-wise roadmap with toggle-solved checkboxes
- ✅ Animated SVG castle that builds layer by layer as problems are solved
- ✅ Achievements panel, XP bar, streak tracker

## Backend Integration Points

Replace mock data in `src/data/mockData.js` with real API responses.
All axios calls are already in place — just remove the `.catch(() => {})` suppression.

## Theme

Dark fantasy — Cinzel Decorative titles, Rajdhani UI font, Orbitron monospace.  
Gold (#f0a500) + Cyan (#00e5ff) + Purple (#9b4dff) accent palette.
