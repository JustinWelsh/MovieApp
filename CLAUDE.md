# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**MovieApp** — A React app for browsing movies, searching, and managing a watchlist. Uses TMDB API via Vercel serverless functions.

## Context Files

Read the following to get the full context of the project.

- @context/01-project-overview.md
- @context/02-coding-standards.md
- @context/03-ai-interaction.md
- @context/current-todos.md

## Commands

```bash
npm run serve
 | vercel dev   # Local development (required — runs React app + API serverless functions)
npm run build
npm test
npm test -- --testPathPattern=MyComponent  # Run a single test file
```

> Do NOT use `npm start`. The app depends on `/api/*` serverless proxy routes that only work via `vercel dev`.


