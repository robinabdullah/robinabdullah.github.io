# robinabdullah.github.io

My portfolio site — experience, projects, skills and contact details. Live at
**[robinabdullah.github.io](https://robinabdullah.github.io/)**.

## How it works

All content lives in one file, **`src/data/portfolio.json`** — personal details, statistics, skills,
experience, education and projects. The components under `src/components/sections` render it, so
updating the site means editing that file, not the components.

`src/app/page.tsx` holds a small `defaultData` object used only for the pre-hydration paint. Keep it
consistent with `portfolio.json` or the first frame shows stale values.

## Built with

Next.js · TypeScript · Tailwind CSS · Framer Motion · React Icons

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
