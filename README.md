# Brooklyn 99 Trivia

An interactive single-page trivia game for fans of Brooklyn Nine-Nine. Test your knowledge of the 99th precinct's finest detectives across 12 questions covering characters, catchphrases, memorable moments, and more.

## Tech Stack SUCCULENT

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Features

- 12 trivia questions with shuffled answer order on every play
- Score tracking with live feedback after each answer
- Streak counter for consecutive correct answers
- End-of-game rank title (from "Detective First Grade" to "Doug Judy")
- Animated transitions and tactile UI feedback
- NYPD precinct-inspired dark aesthetic

## Running Locally

```bash
npm install
npm run dev
```

The app starts at [http://localhost:3000](http://localhost:3000). For full Netlify feature emulation (CDN headers, edge functions, etc.) use:

```bash
netlify dev
```

which serves on [http://localhost:8888](http://localhost:8888).

## Building for Production

```bash
npm run build
```

Output is in `dist/client/` as configured in `netlify.toml`.
