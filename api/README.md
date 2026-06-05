# api/

Vercel Serverless Functions that proxy requests to the TMDB API. These run server-side on Vercel's infrastructure — the `TMDB_KEY` environment variable is never exposed to the browser.

## Why this exists

Making TMDB requests directly from the frontend exposes the API key in the browser's network tab. These functions act as a middleman: the React app calls these routes, and the functions call TMDB with the secret key on the server.

```
Browser → /api/* → TMDB API (key never reaches browser)
```

## Functions

| File | Route | Description |
|---|---|---|
| `popular.js` | `GET /api/popular` | Fetches the current popular movies list |
| `trending.js` | `GET /api/trending` | Fetches today's trending movies and TV |
| `search.js` | `GET /api/search?query=...` | Searches movies by title |
| `trailer.js` | `GET /api/trailer?movieId=...` | Fetches the official YouTube trailer for a movie |

## Environment Variables

| Variable | Description |
|---|---|
| `TMDB_KEY` | Your TMDB API key — set in `.env` locally, and in Vercel project settings for production |

`TMDB_KEY` needs to be defined in **TWO** places because *local* and *production* environments are completely separate:

- **`.env`** — used by `vercel dev` on your machine. Vercel reads this file and injects the variable into your serverless functions at runtime locally. This file is gitignored and never leaves your machine.
- **Vercel project settings** — used when your app is deployed. Vercel's servers have no knowledge of your local `.env` file, so the key must be explicitly added in the dashboard under Settings → Environment Variables. Vercel injects it into the functions at deploy time.

If `TMDB_KEY` is missing from either place, the functions will have access to `undefined` and all API calls will fail with a 401 from TMDB.

## Local Development

These functions only run when using `vercel dev` (npm run serve). They will not work with `npm start`.

## References

- [Vercel Serverless Functions](https://vercel.com/docs/functions) — overview of how functions work, runtimes, and limits
- [Vercel CLI](https://vercel.com/docs/cli) — full CLI reference including `vercel dev`, `vercel link`, and `vercel deploy`
- [vercel dev](https://vercel.com/docs/cli/dev) — how the local dev server works and how it serves functions alongside your frontend
- [Environment Variables](https://vercel.com/docs/environment-variables) — how to set and manage env vars for local, preview, and production environments
- [Functions Quickstart](https://vercel.com/docs/functions/quickstart) — step-by-step guide to creating your first serverless function
