# UI components — `src/components/ui`

This folder contains the project's UI primitives that are wired to the project's design tokens (`design-tokens.ts` / `design-tokens.json`) and CSS variables in `src/app/globals.css`.

Quick facts
- Location: `src/components/ui`
- Barrel export: `src/components/ui/index.ts`
- Token source: `design-tokens.ts` and `design-tokens.json` in project root
- CSS variables: `src/app/globals.css` (shadcn-friendly HSL variables like `--primary`, `--background`, `--radius`, etc.)

Available components (exported from `src/components/ui`)
- `Button` — primary / secondary / destructive variants (uses `bg-primary`, `bg-accent`, `bg-destructive`)
- `Card` — uses `bg-card`, `border-border`, rounded corners per `--radius`
- `Input` — form input styled to use `border-input`, `placeholder:text-muted-foreground`, and `ring` tokens
- `Popover`, `Dialog` — Radix primitives with token-based backgrounds (`bg-popover`, `bg-background`)
- `Avatar`, `Badge` — small identity/status UI elements

Usage

Import components:

```tsx
import { Button, Card, Input } from '@/components/ui'

export default function Example() {
  return (
    <Card>
      <h3 className="text-base-heading">Title</h3>
      <p className="text-base-text">Description goes here.</p>
      <div className="mt-4">
        <Input placeholder="Type..." />
        <Button className="ml-2">Primary</Button>
      </div>
    </Card>
  )
}
```

Design token mapping notes
- Colors: Use Tailwind classes that map to CSS variables — e.g. `bg-primary` -> `hsl(var(--primary))`, `text-primary-foreground` -> `hsl(var(--primary-foreground))`, `bg-card`, `border-border`, `bg-accent`, `bg-genesis`, etc.
- Radius: `rounded-lg` in components maps to `var(--radius)` via `tailwind.config.ts` (so corners = 0.75rem as defined in the design system).
- Typography: `font-sans` is backed by `--font-sans` which is populated by the font loader in `app/layout.tsx`.
- Icons: Use `lucide-react` for icons (components may import icons from `lucide-react`).

Development notes
- The components are intended to use token names (primary, accent, card, border, etc.) so updates to `design-tokens.ts` / `globals.css` propagate across the UI.
- If you add or regenerate components with the shadcn CLI, ensure `components.json` points to `src/components` and `cssVariables` is enabled (it already is).

If you want, I can add example pages or Storybook stories that render every component and token swatch — say the word and I’ll scaffold it.
