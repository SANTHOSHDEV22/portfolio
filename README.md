# Portfolio

Personal 3D portfolio of Santhoshkumar D, built with React, TypeScript, Vite, Three.js (via React Three Fiber + drei), and Framer Motion.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Editing content

All text content (profile, experience, education, skills, projects) lives in [`src/data/profile.ts`](src/data/profile.ts).

## Structure

- `src/components/Scene.tsx` – fixed full-screen 3D background (distorted blob, rings, stars) reacting to scroll and pointer
- `src/components/SkillsSphere.tsx` – interactive rotating 3D skills cloud
- `src/components/Reveal.tsx` – scroll-in animation wrapper
