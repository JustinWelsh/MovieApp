# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**MovieApp** — A React app for browsing movies, searching, and managing a watchlist. Uses TMDB API via Vercel serverless functions.

## Commands

```bash
vercel dev   # Local development (required — runs React app + API serverless functions)
npm run build
npm test
npm test -- --testPathPattern=MyComponent  # Run a single test file
```

> Do NOT use `npm start`. The app depends on `/api/*` serverless proxy routes that only work via `vercel dev`.

## Architecture

**API Layer:** All TMDB calls go through Vercel serverless functions in `/api/`. `src/services/MovieService.js` calls these internal routes — never TMDB directly. This keeps `TMDB_KEY` server-side only.

**State:**
- `WatchlistContext` — watchlist persisted to localStorage
- `MovieSearchContext` — in-memory search results (non-persistent)
- Local component state for UI (modals, loading, selected item)

**Routing:** React Router v6 with a `MainLayout` wrapper (NavBar + Outlet + Footer) around all routes. Providers wrap the router in `App.js` order: `WatchlistProvider` → `MovieSearchProvider` → `RouterProvider`.

**Animations:** Centralized presets in `src/_config/animations.js` (`fadeInUp10`, `fadeInUp30`). Spread onto `<motion.X>` elements via `{...fadeInUp30}`.

**UI:** NextUI components + TailwindCSS. NextUI plugin is registered in `tailwind.config.js`.

## Key Conventions

- JSDoc `@typedef` for component prop shapes to enable IntelliSense in `.jsx` files (no TypeScript)
- `console.warn` is safe — ESLint config (`react-app`) treats `no-console` as a warning, not an error
