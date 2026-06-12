# 🎬 MovieApp — Project Overview

> A React app for browsing movies and TV shows, searching titles, and managing a personal watchlist. Powered by the TMDB API via Vercel serverless functions.
>
> 🚧 **Status:** In progress

---

## 👤 Users

Casual movie and TV watchers who want a quick way to discover trending and popular content and keep track of what they want to watch.

---

## ✨ Features

| Feature | Description | Status |
|---|---|---|
| 🎯 Hero Banner | Top trending movie with star rating, overview, Play + More Info actions | ✅ Done |
| 🎠 Carousels | Trending Movies, Trending TV, Popular Movies, Popular TV | ✅ Done |
| 🃏 Hover Card | Rich overlay on card hover — backdrop, genres, rating, watchlist toggle | ✅ Done |
| 🔍 Live Search | As-you-type search, auto-navigates to `/search`, query persisted in `localStorage` | ✅ Done |
| 🎞️ Detail Modal | Overview, genres, runtime, tagline, rating, year, HD badge | ✅ Done |
| ▶️ Trailers | "Play Trailer" button in modal embeds YouTube player inline | ✅ Done |
| 📋 Watchlist | Add/remove items, persisted to `localStorage`, viewable on `/watchlist` | ✅ Done |
| 🔔 Notifications | Bell icon in navbar | 🚧 Placeholder |
| 👤 Profile | Profile dropdown in navbar | 🚧 Placeholder |
| 👍 Like | Thumbs-up button on hover card | 🚧 Placeholder |
| 🎬 Movies nav | "Movies" navbar link | 🚧 Not wired |
| 📺 TV Shows nav | "TV Shows" navbar link | 🚧 Not wired |
| 🆕 New & Popular nav | "New & Popular" navbar link | 🚧 Not wired |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Routing | React Router v6 |
| Component Library | NextUI v2 |
| Styling | TailwindCSS |
| Animations | Framer Motion |
| Hosting + API | Vercel (serverless functions) |
| Data Source | TMDB API |

---

## 🗂️ Architecture

### Request Flow

```
Browser (React)
      │
      │  fetch("/api/...")
      ▼
Vercel Serverless Function   ──►  TMDB API
      │                             │
      │  JSON response              │
      ◄─────────────────────────────┘
      │
      ▼
src/services/MovieService.js
      │
      ▼
React Component / Context
```

> ⚠️ The browser **never** calls TMDB directly. All requests go through `/api/*` to keep `TMDB_KEY` server-side only.

---

### 🌐 API Endpoints

| Endpoint | Params | Description |
|---|---|---|
| `GET /api/trending` | `type`: `all \| movie \| tv \| person` | Trending content |
| `GET /api/popular` | `type`: `movie \| tv` | Popular content |
| `GET /api/search` | `query`: string | Search by title |
| `GET /api/trailer` | `mediaType`, `mediaId` | Fetch YouTube trailer key |
| `GET /api/details` | `mediaType`, `mediaId` | Full media details (runtime, genres, tagline, etc.) |

---

### 🧠 State Management

| Context | Persistence | Stores | Purpose |
|---|---|---|---|
| `WatchlistContext` | `localStorage` | `watchlist[]` | User's saved items; add/remove/check |
| `MovieSearchContext` | In-memory | `searchedMovies`, `selectedMovie` | Search results + currently selected item for modal |
| Local component state | None | loading, modal open/close, hover state | UI-only ephemeral state |

> 📝 `MovieSearchContext` doubles as both the search results store and the selected movie store (used by `MovieModal` across all pages).

---

### 🗺️ Routing

```
App.js
 └── RouterProvider
      └── MainLayout  (NavBar + Outlet + Footer)
           ├── /           →  Home.jsx
           ├── /search     →  Search.jsx
           ├── /watchlist  →  Watchlist.jsx
           ├── /about      →  About.jsx
           └── *           →  ErrorPage.jsx
```

**Provider order in `App.js`:**
```
WatchlistProvider
  └── MovieSearchProvider
        └── RouterProvider
```

---

### 🧩 Component Tree

```
MainLayout
 ├── NavBar                         (transparent → black on scroll)
 │    └── [search input]            (live, as-you-type, localStorage-persisted)
 │    └── [bell + profile]          (placeholders)
 ├── Pages
 │    ├── Home
 │    │    ├── HeroBanner           (backdrop, star rating, Play + More Info)
 │    │    └── MovieCarousel  (×4)
 │    │         └── MovieCard       (poster → hover overlay via ReactDOM.createPortal)
 │    ├── Search
 │    │    └── MovieCard (flex-wrap grid)
 │    └── Watchlist
 │         └── MovieCarousel        (reuses carousel with watchlist items)
 └── Footer
```

**Modal (rendered inline in each page, not in layout):**
```
MovieModal
 ├── Backdrop image  OR  YouTube iframe (when trailer playing)
 └── MovieDetails
      ├── Title, rating, year, runtime, HD badge
      ├── Genres
      ├── Tagline + overview
      └── [+ Watchlist]  [▶ Play Trailer]  [Close]
```

> 📦 `MovieModal` is instantiated separately on `Home`, `Search`, and `Watchlist` pages — not globally in the layout.

---

### 🃏 MovieCard Hover Overlay

`MovieCard` renders a rich overlay via `ReactDOM.createPortal` into `document.body`, bypassing any `overflow: hidden` containers in the carousel.

| Behavior | Detail |
|---|---|
| Trigger | Mouse enter, 400ms delay |
| Dismiss | Mouse leave or page scroll |
| Position | Centered above card, clamped to viewport edges |
| Contents | Backdrop image, title, watchlist toggle, like button, rating, year, HD badge, genres |
| Genre resolution | Client-side via hardcoded `GENRE_MAP` (TMDB IDs → names) in `MovieCard.jsx` |

---

## ⚠️ Known Incomplete Areas

| Area | Notes |
|---|---|
| Search page | Still contains `"Search Works!!"` placeholder text |
| Watchlist page | Still contains `"Watchlist Page!!"` placeholder text |
| `SearchBar.jsx` | Legacy/unused component (calls OMDB API directly); superseded by the search input built into `NavBar` |
| Navbar links | "Movies", "TV Shows", "New & Popular" all link to `#` |
| Profile dropdown | Shows placeholder entries (`zoey@example.com`, Settings, etc.) — not functional |

---

## 🎨 Design

| Attribute | Detail |
|---|---|
| Theme | Dark |
| Navbar | Transparent at top, fades to solid black on scroll |
| Animation presets | `fadeInUp10` (y:10, 0.5s), `fadeInUp30` (y:30, 1.0s) — Framer Motion |
| Skeleton states | Carousels show 8 skeleton cards while data loads |
| Page transitions | Animated route changes via Framer Motion |
| Card hover | Scale + fade overlay (portal-rendered, 0.15s) |
| Hero rating | 5-star visual display (full / half / empty stars) |
