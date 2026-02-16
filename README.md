# Ankon Projects Universe

Cinematic portfolio site built with Next.js 14 App Router, TypeScript, TailwindCSS, Framer Motion, and react-tsparticles.

## Tech

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- react-tsparticles + tsparticles-slim

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Open http://localhost:3000

## Build and Start

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Keep default framework detection (`Next.js`).
4. Deploy.

## Customization

- Update project items in `data/projects.json`.
- Replace hero image with your own file in `public/` and update `components/home/HeroSection.tsx`.
- Replace `public/Ankon-Resume.pdf` with your real resume.
- Particle defaults and storage key are in `lib/particleConfig.ts`.

## Accessibility and Performance

- Uses semantic sections and labeled controls.
- Motion effects are reduced on small screens.
- Control Room settings persist via `localStorage`.