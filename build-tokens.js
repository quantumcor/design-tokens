#!/usr/bin/env node
/**
 * QuantumCor Design Token Builder
 * ================================
 * Reads tokens.json → Outputs:
 *   1. tokens.css          — CSS custom properties (Webflow, Cloudflare Pages, any web)
 *   2. client-first.css    — Client-First compatible variables for Webflow
 *   3. tailwind.config.js  — Tailwind CSS config (Claude Code, Cursor, Vercel)
 *   4. retool-theme.json   — Retool app theming
 *   5. tokens.scss         — SCSS variables (legacy)
 *   6. warp-theme.yaml     — Warp terminal theme
 *   7. github-theme.json   — GitHub Primer-compatible theme
 *
 * Usage: node build-tokens.js
 */

const fs = require('fs');
const path = require('path');

const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens.json'), 'utf8'));
const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

// ─────────────────────────────────────────────
// HELPER: Extract flat value from token
// ─────────────────────────────────────────────
function val(token) {
  return typeof token === 'object' && token.value !== undefined ? token.value : token;
}

// ─────────────────────────────────────────────
// 1. CSS CUSTOM PROPERTIES (Universal)
// ─────────────────────────────────────────────
function buildCSS() {
  const lines = [
    '/* ═══════════════════════════════════════════════════',
    '   QuantumCor Design Tokens — CSS Custom Properties',
    '   Generated from tokens.json — DO NOT EDIT DIRECTLY',
    '   ═══════════════════════════════════════════════════ */',
    '',
    '@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inconsolata:wght@400;500;600;700&display=swap");',
    '',
    ':root {',
    '  /* ── Brand Colors ── */',
  ];

  // Brand colors
  for (const [key, token] of Object.entries(tokens.color.brand)) {
    lines.push(`  --color-brand-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Neutral Scale ── */');
  for (const [key, token] of Object.entries(tokens.color.neutral)) {
    lines.push(`  --color-neutral-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Semantic Colors ── */');
  for (const [key, token] of Object.entries(tokens.color.semantic)) {
    lines.push(`  --color-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Surface Colors ── */');
  for (const [key, token] of Object.entries(tokens.color.surface)) {
    lines.push(`  --surface-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Text Colors ── */');
  for (const [key, token] of Object.entries(tokens.color.text)) {
    lines.push(`  --text-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Border Colors ── */');
  for (const [key, token] of Object.entries(tokens.color.border)) {
    lines.push(`  --border-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Typography ── */');
  for (const [key, token] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --font-${key}: ${val(token)};`);
  }
  lines.push('');
  for (const [key, token] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  --text-${key}: ${val(token)};`);
  }
  lines.push('');
  for (const [key, token] of Object.entries(tokens.typography.fontWeight)) {
    lines.push(`  --weight-${key}: ${val(token)};`);
  }
  lines.push('');
  for (const [key, token] of Object.entries(tokens.typography.lineHeight)) {
    lines.push(`  --leading-${key}: ${val(token)};`);
  }
  lines.push('');
  for (const [key, token] of Object.entries(tokens.typography.letterSpacing)) {
    lines.push(`  --tracking-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Spacing ── */');
  for (const [key, token] of Object.entries(tokens.spacing)) {
    lines.push(`  --space-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Border Radius ── */');
  for (const [key, token] of Object.entries(tokens.radius)) {
    lines.push(`  --radius-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Shadows ── */');
  for (const [key, token] of Object.entries(tokens.shadow)) {
    lines.push(`  --shadow-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Gradients ── */');
  for (const [key, token] of Object.entries(tokens.gradient)) {
    lines.push(`  --gradient-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Transitions ── */');
  for (const [key, token] of Object.entries(tokens.transition)) {
    lines.push(`  --transition-${key}: ${val(token)};`);
  }

  lines.push('', '  /* ── Breakpoints ── */');
  for (const [key, token] of Object.entries(tokens.breakpoint)) {
    lines.push(`  --breakpoint-${key}: ${val(token)};`);
  }

  lines.push('}', '');

  // Base styles
  lines.push(
    '/* ── Base Styles ── */',
    'body {',
    '  background-color: var(--surface-page);',
    '  color: var(--text-secondary);',
    '  font-family: var(--font-primary);',
    '  font-size: var(--text-base);',
    '  line-height: var(--leading-normal);',
    '}',
    '',
    'h1, h2, h3, h4, h5, h6 {',
    '  color: var(--text-primary);',
    '  font-weight: var(--weight-semibold);',
    '  line-height: var(--leading-tight);',
    '}',
    '',
    'a { color: var(--text-link); text-decoration: none; }',
    'a:hover { color: var(--color-brand-primary-hover); }',
    '',
    'code, pre { font-family: var(--font-mono); }',
    ''
  );

  fs.writeFileSync(path.join(dist, 'tokens.css'), lines.join('\n'));
  console.log('  ✓ dist/tokens.css');
}


// ─────────────────────────────────────────────
// 2. CLIENT-FIRST CSS (Webflow-specific)
// ─────────────────────────────────────────────
function buildClientFirst() {
  const lines = [
    '/* ═══════════════════════════════════════════════════',
    '   QuantumCor — Client-First Variables for Webflow',
    '   Compatible with Finsweet Client-First style system',
    '   Generated from tokens.json — DO NOT EDIT DIRECTLY',
    '   ═══════════════════════════════════════════════════ */',
    '',
    '@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inconsolata:wght@400;500;600;700&display=swap");',
    '',
    ':root {',
    '  /* ── Client-First Color Variables ── */',
    '  /* Naming: --color--{category}--{shade} */',
    '',
    '  /* Brand */',
    `  --color--brand--primary: ${val(tokens.color.brand.primary)};`,
    `  --color--brand--primary-hover: ${val(tokens.color.brand['primary-hover'])};`,
    `  --color--brand--primary-muted: ${val(tokens.color.brand['primary-muted'])};`,
    `  --color--brand--primary-wash: ${val(tokens.color.brand['primary-wash'])};`,
    '',
    '  /* Neutral */',
  ];

  for (const [key, token] of Object.entries(tokens.color.neutral)) {
    lines.push(`  --color--neutral--${key}: ${val(token)};`);
  }

  lines.push(
    '',
    '  /* Semantic */',
    `  --color--success--default: ${val(tokens.color.semantic.success)};`,
    `  --color--success--light: ${val(tokens.color.semantic['success-light'])};`,
    `  --color--success--dark: ${val(tokens.color.semantic['success-dark'])};`,
    `  --color--warning--default: ${val(tokens.color.semantic.warning)};`,
    `  --color--warning--light: ${val(tokens.color.semantic['warning-light'])};`,
    `  --color--warning--dark: ${val(tokens.color.semantic['warning-dark'])};`,
    `  --color--error--default: ${val(tokens.color.semantic.error)};`,
    `  --color--error--light: ${val(tokens.color.semantic['error-light'])};`,
    `  --color--error--dark: ${val(tokens.color.semantic['error-dark'])};`,
    '',
    '  /* Surfaces */',
  );

  for (const [key, token] of Object.entries(tokens.color.surface)) {
    lines.push(`  --color--surface--${key}: ${val(token)};`);
  }

  lines.push(
    '',
    '  /* Text */',
  );
  for (const [key, token] of Object.entries(tokens.color.text)) {
    lines.push(`  --color--text--${key}: ${val(token)};`);
  }

  lines.push(
    '',
    '  /* ── Client-First Typography Variables ── */',
    `  --font--primary: ${val(tokens.typography.fontFamily.primary)};`,
    `  --font--mono: ${val(tokens.typography.fontFamily.mono)};`,
    '',
  );

  // Font sizes with Client-First naming
  const cfSizeMap = {
    'hero': 'display-xl',
    'display': 'display-lg',
    'h1': 'display',
    'h2': 'xl',
    'h3': 'lg',
    'lg': 'md',
    'base': 'default',
    'sm': 'sm',
    'xs': 'xs',
    'xxs': 'xxs'
  };

  for (const [key, cfName] of Object.entries(cfSizeMap)) {
    lines.push(`  --font-size--${cfName}: ${val(tokens.typography.fontSize[key])};`);
  }

  lines.push(
    '',
    '  /* ── Client-First Spacing Variables ── */',
    '  /* Used in padding/margin utility classes */',
  );

  const cfSpaceMap = { '1': 'xxs', '2': 'xs', '3': 'sm', '4': 'md', '6': 'lg', '8': 'xl', '12': 'xxl' };
  for (const [key, cfName] of Object.entries(cfSpaceMap)) {
    lines.push(`  --space--${cfName}: ${val(tokens.spacing[key])};`);
  }
  lines.push(`  --space--section: ${val(tokens.spacing.section)};`);
  lines.push(`  --space--container: ${val(tokens.spacing.container)};`);

  lines.push(
    '',
    '  /* ── Radius ── */',
    `  --radius--sm: ${val(tokens.radius.sm)};`,
    `  --radius--md: ${val(tokens.radius.md)};`,
    `  --radius--lg: ${val(tokens.radius.lg)};`,
    `  --radius--pill: ${val(tokens.radius.pill)};`,
    '',
    '  /* ── Shadows ── */',
    `  --shadow--sm: ${val(tokens.shadow.sm)};`,
    `  --shadow--md: ${val(tokens.shadow.md)};`,
    `  --shadow--lg: ${val(tokens.shadow.lg)};`,
    `  --shadow--glow: ${val(tokens.shadow['glow-blue'])};`,
    '',
    '  /* ── Transitions ── */',
    `  --transition--fast: ${val(tokens.transition.fast)};`,
    `  --transition--base: ${val(tokens.transition.base)};`,
    `  --transition--slow: ${val(tokens.transition.slow)};`,
    '}',
    '',
    '/* ── Client-First Base Overrides ── */',
    'body {',
    '  background-color: var(--color--surface--page);',
    '  color: var(--color--text--secondary);',
    '  font-family: var(--font--primary);',
    '}',
    ''
  );

  fs.writeFileSync(path.join(dist, 'client-first.css'), lines.join('\n'));
  console.log('  ✓ dist/client-first.css');
}


// ─────────────────────────────────────────────
// 3. TAILWIND CONFIG
// ─────────────────────────────────────────────
function buildTailwind() {
  const config = `// ═══════════════════════════════════════════════════
// QuantumCor Tailwind Config
// Generated from tokens.json — DO NOT EDIT DIRECTLY
// ═══════════════════════════════════════════════════

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '${val(tokens.color.brand.primary)}',
          hover: '${val(tokens.color.brand['primary-hover'])}',
          muted: '${val(tokens.color.brand['primary-muted'])}',
          wash: '${val(tokens.color.brand['primary-wash'])}',
        },
        neutral: {
${Object.entries(tokens.color.neutral).map(([k, t]) => `          '${k}': '${val(t)}',`).join('\n')}
        },
        surface: {
${Object.entries(tokens.color.surface).map(([k, t]) => `          '${k}': '${val(t)}',`).join('\n')}
        },
        semantic: {
          success: '${val(tokens.color.semantic.success)}',
          'success-light': '${val(tokens.color.semantic['success-light'])}',
          'success-dark': '${val(tokens.color.semantic['success-dark'])}',
          warning: '${val(tokens.color.semantic.warning)}',
          'warning-light': '${val(tokens.color.semantic['warning-light'])}',
          'warning-dark': '${val(tokens.color.semantic['warning-dark'])}',
          error: '${val(tokens.color.semantic.error)}',
          'error-light': '${val(tokens.color.semantic['error-light'])}',
          'error-dark': '${val(tokens.color.semantic['error-dark'])}',
        },
      },

      fontFamily: {
        primary: [${val(tokens.typography.fontFamily.primary).split(',').map(f => `'${f.trim().replace(/'/g, '')}'`).join(', ')}],
        mono: [${val(tokens.typography.fontFamily.mono).split(',').map(f => `'${f.trim().replace(/'/g, '')}'`).join(', ')}],
      },

      fontSize: {
${Object.entries(tokens.typography.fontSize).map(([k, t]) => `        '${k}': '${val(t)}',`).join('\n')}
      },

      borderRadius: {
        card: '${val(tokens.radius.lg)}',
        pill: '${val(tokens.radius.pill)}',
      },

      boxShadow: {
        'glow': '${val(tokens.shadow['glow-blue'])}',
        'glow-strong': '${val(tokens.shadow['glow-blue-strong'])}',
      },

      backgroundImage: {
        'hero-orb': '${val(tokens.gradient['hero-orb'])}',
        'card-accent': '${val(tokens.gradient['card-accent'])}',
        'subtle-glow': '${val(tokens.gradient['subtle-glow'])}',
      },

      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },

      screens: {
${Object.entries(tokens.breakpoint).map(([k, t]) => `        '${k}': '${val(t)}',`).join('\n')}
      },
    },
  },
  plugins: [],
};
`;

  fs.writeFileSync(path.join(dist, 'tailwind.config.js'), config);
  console.log('  ✓ dist/tailwind.config.js');
}


// ─────────────────────────────────────────────
// 4. RETOOL THEME
// ─────────────────────────────────────────────
function buildRetool() {
  const theme = {
    name: "QuantumCor Dark",
    version: "1.0.0",
    colors: {
      primary: val(tokens.color.brand.primary),
      primaryHover: val(tokens.color.brand['primary-hover']),
      background: val(tokens.color.surface.page),
      surface: val(tokens.color.surface.card),
      surfaceHover: val(tokens.color.surface['card-hover']),
      border: val(tokens.color.border.default),
      borderSubtle: val(tokens.color.border.subtle),
      textPrimary: val(tokens.color.text.primary),
      textSecondary: val(tokens.color.text.secondary),
      textTertiary: val(tokens.color.text.tertiary),
      textDisabled: val(tokens.color.text.disabled),
      textLink: val(tokens.color.text.link),
      textOnPrimary: val(tokens.color.text['on-primary']),
      success: val(tokens.color.semantic.success),
      successLight: val(tokens.color.semantic['success-light']),
      warning: val(tokens.color.semantic.warning),
      warningLight: val(tokens.color.semantic['warning-light']),
      error: val(tokens.color.semantic.error),
      errorLight: val(tokens.color.semantic['error-light']),
      overlay: val(tokens.color.surface.overlay),
    },
    typography: {
      fontFamily: val(tokens.typography.fontFamily.primary),
      monoFontFamily: val(tokens.typography.fontFamily.mono),
      sizes: Object.fromEntries(
        Object.entries(tokens.typography.fontSize).map(([k, t]) => [k, val(t)])
      ),
    },
    spacing: Object.fromEntries(
      Object.entries(tokens.spacing).map(([k, t]) => [k, val(t)])
    ),
    borderRadius: {
      sm: val(tokens.radius.sm),
      md: val(tokens.radius.md),
      lg: val(tokens.radius.lg),
      pill: val(tokens.radius.pill),
    },
    shadows: Object.fromEntries(
      Object.entries(tokens.shadow).map(([k, t]) => [k, val(t)])
    ),
    components: {
      button: tokens.component.button,
      card: tokens.component.card,
      input: tokens.component.input,
      nav: tokens.component.nav,
      badge: tokens.component.badge,
    },
    _retoolCustomCSS: `
/* Paste into Retool > Settings > Custom CSS */
:root {
  --retool-primary: ${val(tokens.color.brand.primary)};
  --retool-bg: ${val(tokens.color.surface.page)};
  --retool-surface: ${val(tokens.color.surface.card)};
  --retool-border: ${val(tokens.color.border.default)};
  --retool-text: ${val(tokens.color.text.primary)};
  --retool-text-secondary: ${val(tokens.color.text.secondary)};
}
.retool-canvas { background: var(--retool-bg) !important; }
.retool-widget-container { 
  background: var(--retool-surface) !important; 
  border-color: var(--retool-border) !important;
  border-radius: ${val(tokens.radius.lg)} !important;
}
    `.trim()
  };

  fs.writeFileSync(path.join(dist, 'retool-theme.json'), JSON.stringify(theme, null, 2));
  console.log('  ✓ dist/retool-theme.json');
}


// ─────────────────────────────────────────────
// 5. SCSS VARIABLES
// ─────────────────────────────────────────────
function buildSCSS() {
  const lines = [
    '// ═══════════════════════════════════════════════════',
    '// QuantumCor Design Tokens — SCSS Variables',
    '// Generated from tokens.json — DO NOT EDIT DIRECTLY',
    '// ═══════════════════════════════════════════════════',
    '',
    '// Brand Colors',
  ];

  for (const [key, token] of Object.entries(tokens.color.brand)) {
    lines.push(`$color-brand-${key}: ${val(token)};`);
  }
  lines.push('', '// Neutral Scale');
  for (const [key, token] of Object.entries(tokens.color.neutral)) {
    lines.push(`$color-neutral-${key}: ${val(token)};`);
  }
  lines.push('', '// Semantic');
  for (const [key, token] of Object.entries(tokens.color.semantic)) {
    lines.push(`$color-${key}: ${val(token)};`);
  }
  lines.push('', '// Typography');
  for (const [key, token] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`$font-${key}: ${val(token)};`);
  }
  for (const [key, token] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`$text-${key}: ${val(token)};`);
  }
  lines.push('', '// Spacing');
  for (const [key, token] of Object.entries(tokens.spacing)) {
    lines.push(`$space-${key}: ${val(token)};`);
  }
  lines.push('', '// Radius');
  for (const [key, token] of Object.entries(tokens.radius)) {
    lines.push(`$radius-${key}: ${val(token)};`);
  }

  fs.writeFileSync(path.join(dist, 'tokens.scss'), lines.join('\n'));
  console.log('  ✓ dist/tokens.scss');
}


// ─────────────────────────────────────────────
// 6. WARP TERMINAL THEME
// ─────────────────────────────────────────────
function buildWarp() {
  const theme = {
    name: 'QuantumCor',
    accent: val(tokens.color.brand.primary),
    background: val(tokens.color.surface.page),
    foreground: val(tokens.color.text.secondary),
    details: 'darker',
    terminal_colors: {
      normal: {
        black: val(tokens.color.neutral['900']),
        red: val(tokens.color.semantic.error),
        green: val(tokens.color.semantic.success),
        yellow: val(tokens.color.semantic.warning),
        blue: val(tokens.color.brand.primary),
        magenta: '#A855F7',
        cyan: '#22D3EE',
        white: val(tokens.color.neutral['100']),
      },
      bright: {
        black: val(tokens.color.neutral['400']),
        red: '#EF4444',
        green: '#34D399',
        yellow: '#FBBF24',
        blue: val(tokens.color.brand['primary-hover']),
        magenta: '#C084FC',
        cyan: '#67E8F9',
        white: val(tokens.color.neutral.white),
      }
    }
  };

  fs.writeFileSync(path.join(dist, 'warp-theme.yaml'),
    `# QuantumCor Warp Terminal Theme\n# Place in ~/.warp/themes/\n${yamlFromObj(theme)}`
  );
  console.log('  ✓ dist/warp-theme.yaml');
}

function yamlFromObj(obj, indent = 0) {
  let out = '';
  const pad = '  '.repeat(indent);
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) {
      out += `${pad}${k}:\n${yamlFromObj(v, indent + 1)}`;
    } else {
      out += `${pad}${k}: "${v}"\n`;
    }
  }
  return out;
}


// ─────────────────────────────────────────────
// 7. FLAT JSON EXPORT (for any tool)
// ─────────────────────────────────────────────
function buildFlatJSON() {
  const flat = {};

  function flatten(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !value.value) {
        flatten(value, path);
      } else {
        flat[path] = val(value);
      }
    }
  }

  flatten(tokens.color, 'color');
  flatten(tokens.typography, 'typography');
  flatten(tokens.spacing, 'spacing');
  flatten(tokens.radius, 'radius');
  flatten(tokens.shadow, 'shadow');
  flatten(tokens.gradient, 'gradient');

  fs.writeFileSync(path.join(dist, 'tokens-flat.json'), JSON.stringify(flat, null, 2));
  console.log('  ✓ dist/tokens-flat.json');
}


// ─────────────────────────────────────────────
// BUILD ALL
// ─────────────────────────────────────────────
console.log('\n🔨 Building QuantumCor Design Tokens...\n');
buildCSS();
buildClientFirst();
buildTailwind();
buildRetool();
buildSCSS();
buildWarp();
buildFlatJSON();
console.log('\n✅ All tokens built to ./dist/\n');
