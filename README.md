# Fraxses Design Guide

Fraxses Design Guide and UI Kit is a React, Vite and TypeScript documentation site for Fraxses foundations, themes, components and product patterns.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- lucide-react

## Local Development

```bash
npm install
npm run dev
```

The local dev server will print a URL, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Project Structure

- `src/content/navigation.ts` defines the docs navigation and active route structure.
- `src/content/tokens.ts` defines theme, spacing, radius and shadow tokens.
- `src/content/componentDocs.tsx` defines the component catalogue pages.
- `src/content/patterns.tsx` defines reusable product pattern pages.
- `src/components/ui-kit.tsx` contains the current live preview primitives.
- `src/pages/DocPage.tsx` renders docs, theme, foundation, component, pattern and resource pages.

## Themes

The default theme is `Intenda Light - Green`. `Midnight` is available through the header switcher. `Intenda Light - Blue` has a placeholder route and token entry, but final values are intentionally not invented yet.

## Deployment

The project is prepared for Vercel with `vercel.json`.

Recommended Vercel settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Figma Source

Reference file:

https://www.figma.com/design/swjGUNj0dztirocm1n5e7j/Design-Guide?node-id=36-2&p=f&t=R74OpPXpqIYKdHuZ-0
