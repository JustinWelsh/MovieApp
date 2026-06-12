# Current TODOs

Code quality and structural improvements identified during review.

---

## Fix Now

- [x] **Extract `GENRE_MAP` to a shared constants file** — moved to `src/_config/genres.js`.
- [x] **Move router outside `App` component render** — `createBrowserRouter(...)` moved above the component in `src/App.js`.
- [x] **Delete `src/components/SearchBar.jsx`** — legacy/unused component that calls OMDB directly. Superseded by the search input in `NavBar`.
- [ ] **Fix stale copy-paste comments** — both `src/context/MovieSearchContext.js` and `src/context/WatchlistContext.js` have `// contexts/ThemeContext.js` at the top.

---

## Consider (Not Urgent)

- [ ] **Split `MovieSearchContext` into two concerns** — it currently holds both search results and the selected modal movie. The `selectedMovie` / `updateSelectedMovie` slice could be local state in each page since the modal is already instantiated per-page.
- [ ] **Extract data-fetching from page components into custom hooks** — `Home.jsx` has multiple `useEffect` + `useState` pairs for fetching. A `src/hooks/` directory with hooks like `useHomeData()` would keep pages clean and make fetching logic testable.
- [ ] **Clarify `MovieCarouselAnimated.jsx`** — two carousel files exist in `src/components/carousel/`. Determine if one is deprecated and either remove it or document the distinction.
