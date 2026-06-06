# Seller Landing

React landing page built with Vite, TypeScript, Tailwind CSS, and shadcn/ui.

## Getting started

```bash
npm install
npm run start
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components
├── lib/
│   └── utils.ts     # shared utilities (cn helper)
├── pages/
│   └── landing-page.tsx
├── App.tsx
├── main.tsx
└── index.css        # Tailwind + shadcn theme
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Add shadcn components

```bash
npx shadcn@latest add button
```
