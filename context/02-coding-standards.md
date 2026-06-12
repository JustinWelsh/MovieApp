# Coding Standards

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.

```
<type>: <short description>
```

| Type | When to use |
|---|---|
| `feat` | A new feature or user-facing capability |
| `fix` | A bug fix |
| `refactor` | Code change that is not a feature or bug fix (restructuring, renaming, cleanup) |
| `test` | Adding or updating tests |
| `docs` | Documentation changes only |
| `chore` | Tooling, config, dependencies, build scripts — no production code change |

**Examples:**

```
feat: add trailer playback to movie modal
fix: correct hover overlay position at viewport edges
refactor: extract GENRE_MAP to shared constants file
test: add unit tests for WatchlistContext
docs: update project overview with routing diagram
chore: upgrade NextUI to v2.4
```
