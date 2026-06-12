# Current TODOs

Code quality and structural improvements identified during review.

---

## Fix Now

- [ ] **Extract `GENRE_MAP` to a shared constants file** — currently hardcoded in `src/components/card/MovieCard.jsx:8-28`. Move to `src/_config/genres.js` or `src/constants/genres.js` so it can be reused in the modal and elsewhere.
- [ ] **Move router outside `App` component render** — `createBrowserRouter(...)` is called inside the component body in `src/App.js:13`, causing it to be recreated every render. Move it above the component or into a `useMemo`.
- [ ] **Delete `src/components/SearchBar.jsx`** — legacy/unused component that calls OMDB directly. Superseded by the search input in `NavBar`.
- [ ] **Fix stale copy-paste comments** — both `src/context/MovieSearchContext.js` and `src/context/WatchlistContext.js` have `// contexts/ThemeContext.js` at the top.

---

## Consider (Not Urgent)

- [ ] **Split `MovieSearchContext` into two concerns** — it currently holds both search results and the selected modal movie. The `selectedMovie` / `updateSelectedMovie` slice could be local state in each page since the modal is already instantiated per-page.
- [ ] **Extract data-fetching from page components into custom hooks** — `Home.jsx` has multiple `useEffect` + `useState` pairs for fetching. A `src/hooks/` directory with hooks like `useHomeData()` would keep pages clean and make fetching logic testable.
- [ ] **Clarify `MovieCarouselAnimated.jsx`** — two carousel files exist in `src/components/carousel/`. Determine if one is deprecated and either remove it or document the distinction.
