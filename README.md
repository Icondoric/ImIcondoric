# ImIcondoric

Personal portfolio of Ivan Condori Choquehuanca (Icondoric), built with Vue 3, TypeScript, Vite, and Tailwind CSS v4. Deployed on Vercel with serverless functions for the contact form.

Live: https://icondoric.vercel.app

## Tech Stack

- **Frontend**: Vue 3 (Composition API, `<script setup>`)
- **Language**: TypeScript
- **Bundler**: Vite 8
- **Styles**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Email**: Resend API (serverless function on Vercel)
- **Validation**: Zod
- **Testing**: Vitest (unit), Playwright (e2e)
- **CI**: GitHub Actions

## Project Structure

```
src/
  app/          Global styles, root component
  pages/        Page-level compositions
  widgets/      Layout sections (Header, Hero, Portfolio, Footer)
  features/     Interactive features (constellation background)
  entities/     Domain models and UI components (ProjectCard)
  shared/       Reusable utilities, validators, UI primitives

api/
  contact.ts    POST /api/contact — sends email via Resend
  projects.ts   GET  /api/projects — returns project list
```

## Local Development

**Requirements**: Node.js 20+

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values

# Start development server
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from resend.com (required for contact form) |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |

Both variables must be configured in Vercel's project settings before deploying.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint across `.vue`, `.ts`, `.tsx` files |
| `npm run format` | Format source files with Prettier |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |

## Deployment

The project is configured for Vercel via `vercel.json`. Deployment is automatic on every push to `main`.

**Required configuration in Vercel dashboard**:
1. Framework Preset: `Vite`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Environment Variables: `RESEND_API_KEY` and `CONTACT_EMAIL`

## License

All rights reserved. Ivan Condori Choquehuanca, 2026.
