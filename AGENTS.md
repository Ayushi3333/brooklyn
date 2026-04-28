# AGENTS.md

## Project Overview

Brooklyn 99 Trivia — a single-page interactive trivia game themed around the TV show Brooklyn Nine-Nine. Built with TanStack Start and deployed on Netlify.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR/SPA hybrid) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + handwritten CSS in `styles.css` |
| Language | TypeScript 5.7 strict mode |
| Deployment | Netlify |

## Directory Structure

```
src/
  components/
    B99Trivia.tsx   # Entire trivia game: intro, quiz, and result screens
    SurveyForm.tsx  # Legacy survey form (unused, can be removed)
  routes/
    __root.tsx      # HTML shell, head metadata, global styles
    index.tsx       # Mounts B99Trivia at /
  styles.css        # Tailwind + all custom CSS for the trivia UI
  router.tsx        # TanStack Router setup
public/
  favicon.ico
  form-survey.html  # Legacy Netlify Forms declaration (unused)
netlify.toml        # Build + dev server config
vite.config.ts      # Vite plugins
```

## Architecture Notes

- All trivia state (current question, score, streak, phase) lives in `B99Trivia.tsx` using `useState`/`useCallback`.
- Questions are defined as a static array in the component file. Answers are shuffled at component mount time via `prepareQuestions()` using Fisher-Yates.
- The UI has three "phases": `intro`, `playing`, `result`. Each renders a distinct sub-component (`IntroScreen`, inline quiz, `ResultScreen`).
- No external state management — local component state is sufficient for this single-page app.
- All styling is in `src/styles.css` using named CSS classes (not Tailwind utility classes for the game UI). This keeps the trivia-specific styles easy to read and modify.
- Fonts are loaded from Google Fonts: **Bebas Neue** (display), **DM Mono** (monospace metadata), **DM Sans** (body).

## Coding Conventions

- Components: PascalCase
- Route files: kebab-case
- Styles: BEM-inspired class names (`.quiz-card`, `.option-btn`, `.result-stat`)
- TypeScript strict mode — use `type` keyword for type-only imports
- `@/` path alias maps to `src/`

## Non-obvious Decisions

- Answer shuffling happens once at mount via `useState(() => prepareQuestions())` — the initializer function ensures it only runs once per game session, not on every render.
- The `shake` and `celebrate` CSS animation classes are applied then removed via `setTimeout` to allow re-triggering on subsequent wrong/right answers (adding and re-adding the class).
- All game CSS is hand-authored in `styles.css` rather than using Tailwind utilities, for easier visual iteration on a themed design.

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
netlify dev      # Start with Netlify emulation (port 8888)
npm run build    # Production build → dist/client/
```
