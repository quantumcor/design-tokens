# QuantumCor Design Tokens

> Single source of truth → every platform stays on brand.

## Architecture

```
tokens.json                  ← THE SOURCE OF TRUTH (edit only this)
  │
  ├── build-tokens.js        ← Run this to regenerate all outputs
  │
  └── dist/
      ├── tokens.css          → Webflow, Cloudflare Pages, any web
      ├── client-first.css    → Webflow (Client-First naming)
      ├── tailwind.config.js  → Claude Code, Cursor, Vercel, Next.js
      ├── retool-theme.json   → Retool app theming
      ├── tokens.scss         → Legacy SCSS projects
      ├── warp-theme.yaml     → Warp terminal
      └── tokens-flat.json    → Universal JSON (any tool)
```

## Quick Start

```bash
# Edit tokens.json, then:
node build-tokens.js

# All outputs regenerated in dist/
```

## Integration Guide

### Webflow (Client-First)
1. Open your Webflow project
2. Go to **Project Settings → Custom Code → Head**
3. Paste the contents of `dist/client-first.css` inside `<style>` tags
4. Reference variables in Webflow custom CSS: `var(--color--brand--primary)`

**Client-First naming convention:**
- Colors: `--color--{category}--{shade}` (e.g., `--color--neutral--800`)
- Fonts: `--font--primary`, `--font--mono`
- Sizes: `--font-size--{size}` (e.g., `--font-size--display`)
- Spacing: `--space--{size}` (e.g., `--space--lg`)

### Vercel / Next.js / Claude Code / Cursor
1. Copy `dist/tailwind.config.js` into your project root
2. Use Tailwind classes: `bg-brand`, `text-neutral-50`, `bg-surface-card`, `rounded-pill`
3. Import the font in your layout: already included via the CSS import

```jsx
// Example usage
<button className="bg-brand hover:bg-brand-hover text-white rounded-pill px-5 py-2.5 font-primary">
  Get Started
</button>
```

### Retool
1. Open `dist/retool-theme.json`
2. Copy the `_retoolCustomCSS` value
3. Go to **Retool → Settings → Custom CSS**
4. Paste the CSS
5. Use the color values in the JSON for widget-level theming

### Cloudflare Pages
1. Include `dist/tokens.css` in your build
2. Reference via `var(--color-brand-primary)`, `var(--surface-card)`, etc.

### Warp Terminal
1. Copy `dist/warp-theme.yaml` to `~/.warp/themes/quantumcor.yaml`
2. Open Warp → Settings → Appearance → Select "QuantumCor"

### GitHub (Actions CI check)
Use `dist/tokens-flat.json` to build a lint rule that validates color/font values in PRs.

### Any Other Tool
`dist/tokens-flat.json` is a flat key-value map of every token. Parse it in any language.

## Changing the Brand

**To change a color, font, or any value:**
1. Edit `tokens.json` (the ONLY file you edit)
2. Run `node build-tokens.js`
3. All 7 output files update simultaneously
4. Deploy to each platform

**Example — switching primary accent from blue to teal:**
```json
// In tokens.json, change:
"primary": { "value": "#2369FE" }
// To:
"primary": { "value": "#0F766E" }
```
Then `node build-tokens.js` → every platform updates.

## Token Categories

| Category | What it controls |
|----------|-----------------|
| `color.brand` | Primary accent, hover, muted, wash |
| `color.neutral` | Grayscale spectrum 950→white |
| `color.semantic` | Success, warning, error states |
| `color.surface` | Page, card, input, overlay backgrounds |
| `color.text` | Primary, secondary, tertiary, disabled, link |
| `color.border` | Default, subtle, strong, focus |
| `typography` | Font families, sizes, weights, line-heights |
| `spacing` | 4px→96px scale + section/container |
| `radius` | none→pill→full |
| `shadow` | Subtle shadows + blue glow accents |
| `gradient` | Hero orb, card accent, subtle glow |
| `transition` | Fast/base/slow/spring timing |
| `breakpoint` | Responsive breakpoints |
| `component` | Button, card, input, nav, badge specs |
