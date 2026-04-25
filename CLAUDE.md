# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run ESLint to check for linting issues
npm run lint
```

## Project Overview

**Software Architecture Lab** is a Next.js application designed as a visual and practical laboratory for learning software architecture concepts.

- **Framework**: Next.js 16.1.6 with App Router
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4 with CSS variables
- **Component System**: shadcn/ui with Base UI
- **Icons**: lucide-react
- **Language**: TypeScript (strict mode)

## Architecture

### Directory Structure

```
src/
├── app/              # Next.js App Router
│   ├── page.tsx      # Home page
│   ├── layout.tsx    # Root layout with fonts and theme setup
│   └── globals.css   # Global Tailwind styles
├── components/       # Reusable React components
│   ├── ui/          # shadcn/ui components
│   └── theme-toggle.tsx  # Dark/light theme switcher
└── lib/
    └── utils.ts     # Helper functions (cn() for class merging)
```

### Key Architectural Decisions

**Theme System**: Dark/light mode is implemented using CSS classes (`dark` class on `<html>`) combined with Tailwind's dark mode utilities. The theme preference is persisted in localStorage and respects system preferences as fallback.

- Theme initialization happens via inline script in `layout.tsx` (runs before hydration to prevent flash)
- The `ThemeToggle` component manages theme switching and persistence
- All colors use CSS variables defined in Tailwind config for consistency

**Typography**: The app uses three Google Fonts configured as CSS variables:
- `--font-montserrat` (sans-serif, primary)
- `--font-merriweather` (serif, display)
- `--font-ubuntu-mono` (monospace, code)

**Component Library**: shadcn/ui components are configured to use the `base-nova` style with neutral colors and CSS variables. Import alias: `@/components/ui`.

**Styling Approach**: Pure Tailwind CSS with `tailwind-merge` and `clsx` for conditional classes. The `cn()` utility function in `src/lib/utils.ts` merges classes while avoiding conflicts.

## TypeScript & Path Aliases

- `@/*` resolves to `./src/*`
- Strict mode enabled (`"strict": true`)
- Target: ES2017

## Theme Configuration

Theme colors are defined via Tailwind CSS variables (see `components.json` for aliases). Common colors include `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`, `border`, `card`, etc. These map to CSS variables in the theme layer.

## Development Notes

- Hot reload works automatically when editing files in `src/`
- shadcn/ui components can be added with `npx shadcn-ui@latest add <component-name>`
- Use the `ThemeToggle` component or modify `theme-toggle.tsx` to adjust theme behavior
- All new pages should be created in `src/app/` following Next.js conventions
- Client-side components must include `"use client"` directive
