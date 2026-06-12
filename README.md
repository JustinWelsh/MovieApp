# MovieApp

A React app for browsing movies, watching trailers, and managing a personal watchlist — powered by the TMDB API.

## Features

- **Home** — Browse popular and trending movies in an animated horizontal carousel
- **Search** — Search movies by title with live results
- **Movie Modal** — Click any movie to view details and play the official YouTube trailer via `<iframe>`
- **Watchlist** — Save and manage movies you want to watch (persisted via context)
- **About** — Project info page

## Tech Stack

- [React 18](https://react.dev/) with React Router v6
- [NextUI v2](https://nextui.org/) for UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [TMDB API](https://developer.themoviedb.org/) for movie data and trailers
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions) for API proxying

## Getting Started

### Prerequisites

- Node 20.x (use `nvm use` in the project root — an `.nvmrc` is included)
- [Vercel CLI](https://vercel.com/docs/cli) installed globally
- A [TMDB API key](https://developer.themoviedb.org/docs/getting-started)

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Install the Vercel CLI and link the project:

```bash
npm i -g vercel
vercel login
vercel link
```

3. Create a `.env` file in the project root:

```
TMDB_KEY=your_tmdb_api_key_here
```

4. Start the dev server: ( `vercel dev` will be executed in the following command)
```bash
npm run serve
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Development: `vercel dev` vs `npm start`

This project uses Vercel Serverless Functions to proxy requests to the TMDB API. The API key lives server-side and is never exposed to the browser.

| Command | Use case |
|---|---|
| `vercel dev` | Full local dev — runs both the React app and the serverless API functions |
| `npm start` | Runs the React app only — API calls will fail since the `/api/` routes won't exist |

**Always use `vercel dev` for local development.** `npm start` is not sufficient because the app depends on the `/api/*` proxy routes to fetch movie data.

## API Proxy

All TMDB requests are routed through serverless functions in the `api/` directory:

| Route | TMDB Endpoint |
|---|---|
| `/api/popular-movies` | `/3/movie/popular` |
| `/api/trending` | `/3/trending/all/day` |
| `/api/search?query=...` | `/3/search/movie` |
| `/api/trailer?movieId=...` | `/3/movie/:id/videos` |

The `TMDB_KEY` environment variable is read server-side only — it is never bundled into the frontend JS or visible in the browser network tab.

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `TMDB_KEY` as an environment variable in your Vercel project settings
4. Deploy

## Changelog

### 2026-06-11

- **Extracted `GENRE_MAP` to `src/_config/genres.js`** — shared constant, importable anywhere instead of hardcoded in `MovieCard`
- **Moved `createBrowserRouter` outside `App` component** — prevents the router from being recreated on every render
- **Deleted `src/components/SearchBar.jsx`** — legacy component that called OMDB directly; superseded by the NavBar search
- **Fixed stale copy-paste comments in context files** — removed `// contexts/ThemeContext.js` header from `MovieSearchContext` and `WatchlistContext`; also removed unused `React` imports
- **Split `MovieSearchContext`** — `selectedMovie` moved to local `useState` in each page; context now only owns `searchedMovies`
- **Extracted `useHomeData` hook** — all data-fetching logic moved from `Home.jsx` into `src/hooks/useHomeData.js`

---

## Available Scripts

| Command | Description |
|---|---|
| `vercel dev` | Start the full dev server (React + API functions) |
| `npm run build` | Build for production |
| `npm test` | Run tests |
