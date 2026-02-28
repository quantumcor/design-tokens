#!/usr/bin/env node
/**
 * QuantumCor Design Token Builder — Sentinel v2
 * ==============================================
 * Reads files/tokens.json + files/tokens.css → Outputs:
 *   1. tokens.css          — CSS custom properties
 *   2. client-first.css    — Client-First compatible variables for Webflow
 *   3. tailwind.config.js  — Tailwind CSS config
 *   4. retool-theme.json   — Retool app theming
 *   5. tokens.scss         — SCSS variables
 *   6. warp-theme.yaml     — Warp terminal theme
 *   7. tokens-flat.json    — Flat key-value export
 *
 * Usage: node build-tokens.js
 */

const fs = require('fs');
const path = require('path');

const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'files', 'tokens.json'), 'utf8'));
const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

// ─────────────────────────────────────────────
// HELPER: Resolve token value
// ─────────────────────────────────────────────
function val(token) {
  if (token === undefined || token === null) return '';
  return typeof token === 'object' && token.value !== undefined ? token.value : token;
}

// ─────────────────────────────────────────────
// 1. CSS CUSTOM PROPERTIES
// ─────────────────────────────────────────────
function buildCSS() {
  const lines = [
    '/* ═══════════════════════════════════════════════════',
    '   QuantumCor Design Tokens — CSS Custom Properties',
    '   Generated from files/tokens.json — DO NOT EDIT',
    '   ═══════════════════════════════════════════════════ */',
    '',
    ':root {',
    '  /* ── Brand Colors ── */',
    `  --brand-blue-light: ${tokens.brand.blue.light};`,
    `  --brand-blue: ${tokens.brand.blue.DEFAULT};`,
    `  --brand-blue-dark: ${tokens.brand.blue.dark};`,
    `  --brand-pink-light: ${tokens.brand.pink.light};`,
    `  --brand-pink: ${tokens.brand.pink.DEFAULT};`,
    `  --brand-pink-dark: ${tokens.brand.pink.dark};`,
    '',
    '  /* ── Neutrals ── */',
  ];

  for (const [key, value] of Object.entries(tokens.neutral)) {
    const suffix = key === 'DEFAULT' ? '' : `-${key}`;
    lines.push(`  --neutral${suffix}: ${value};`);
  }

  lines.push(
    '',
    '  /* ── System Colors ── */',
    `  --success-green: ${tokens.system.success.light};`,
    `  --success-green-dark: ${tokens.system.success.dark};`,
    `  --warning-yellow: ${tokens.system.warning.light};`,
    `  --warning-yellow-dark: ${tokens.system.warning.dark};`,
    `  --error-red: ${tokens.system.error.light};`,
    `  --error-red-dark: ${tokens.system.error.dark};`,
    `  --focus-state: ${tokens.system.focus};`,
  );

  lines.push(
    '',
    '  /* ── Semantic: Background ── */',
  );
  for (const [key, value] of Object.entries(tokens.semantic.background)) {
    lines.push(`  --bg-${key}: ${value};`);
  }

  lines.push('', '  /* ── Semantic: Text ── */');
  for (const [key, value] of Object.entries(tokens.semantic.text)) {
    lines.push(`  --text-${key}: ${value};`);
  }

  lines.push('', '  /* ── Semantic: Border ── */');
  for (const [key, value] of Object.entries(tokens.semantic.border)) {
    lines.push(`  --border-${key}: ${value};`);
  }

  lines.push('', '  /* ── Semantic: Link ── */');
  for (const [key, value] of Object.entries(tokens.semantic.link)) {
    lines.push(`  --link-${key}: ${value};`);
  }

  lines.push(
    '',
    '  /* ── Typography ── */',
    `  --font-body: ${tokens.typography.fontFamily};`,
    `  --text-base: ${tokens.typography.fontSize.base};`,
    `  --line-height-base: ${tokens.typography.lineHeight.base};`,
  );

  lines.push('');
  for (const [key, heading] of Object.entries(tokens.typography.headings)) {
    lines.push(`  --${key}: ${heading.size};`);
  }

  lines.push('');
  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    if (key !== 'base') {
      lines.push(`  --text-${key}: ${value};`);
    }
  }

  lines.push('', '  /* ── Spacing ── */');
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --space-${key}: ${value};`);
  }

  lines.push('', '  /* ── Layout ── */');
  for (const [key, value] of Object.entries(tokens.layout.section)) {
    lines.push(`  --section-${key}: ${value};`);
  }
  lines.push(`  --padding-global: ${tokens.layout.paddingGlobal};`);
  for (const [key, value] of Object.entries(tokens.layout.container)) {
    lines.push(`  --container-${key}: ${value};`);
  }

  lines.push(
    '',
    '  /* ── Radii ── */',
  );
  for (const [key, value] of Object.entries(tokens.radii)) {
    lines.push(`  --radius-${key}: ${value};`);
  }

  lines.push('}', '');

  fs.writeFileSync(path.join(dist, 'tokens.css'), lines.join('\n'));
  console.log('  ✓ dist/tokens.css');
}


// ─────────────────────────────────────────────
// 2. CLIENT-FIRST CSS (Webflow)
// ─────────────────────────────────────────────
function buildClientFirst() {
  const lines = [
    '/* ═══════════════════════════════════════════════════',
    '   QuantumCor — Client-First Variables for Webflow',
    '   Compatible with Finsweet Client-First v2.1',
    '   Generated from files/tokens.json — DO NOT EDIT',
    '   ═══════════════════════════════════════════════════ */',
    '',
    ':root {',
    '  /* ── Brand ── */',
    `  --color--brand--blue: ${tokens.brand.blue.DEFAULT};`,
    `  --color--brand--blue-light: ${tokens.brand.blue.light};`,
    `  --color--brand--blue-dark: ${tokens.brand.blue.dark};`,
    `  --color--brand--pink: ${tokens.brand.pink.DEFAULT};`,
    `  --color--brand--pink-light: ${tokens.brand.pink.light};`,
    `  --color--brand--pink-dark: ${tokens.brand.pink.dark};`,
    '',
    '  /* ── Neutral ── */',
  ];

  for (const [key, value] of Object.entries(tokens.neutral)) {
    lines.push(`  --color--neutral--${key.toLowerCase()}: ${value};`);
  }

  lines.push(
    '',
    '  /* ── System ── */',
    `  --color--success: ${tokens.system.success.light};`,
    `  --color--success-dark: ${tokens.system.success.dark};`,
    `  --color--warning: ${tokens.system.warning.light};`,
    `  --color--warning-dark: ${tokens.system.warning.dark};`,
    `  --color--error: ${tokens.system.error.light};`,
    `  --color--error-dark: ${tokens.system.error.dark};`,
    '',
    '  /* ── Background ── */',
  );
  for (const [key, value] of Object.entries(tokens.semantic.background)) {
    lines.push(`  --color--bg--${key}: ${value};`);
  }

  lines.push('', '  /* ── Text ── */');
  for (const [key, value] of Object.entries(tokens.semantic.text)) {
    lines.push(`  --color--text--${key}: ${value};`);
  }

  lines.push('', '  /* ── Border ── */');
  for (const [key, value] of Object.entries(tokens.semantic.border)) {
    lines.push(`  --color--border--${key}: ${value};`);
  }

  lines.push(
    '',
    '  /* ── Typography ── */',
    `  --font--body: ${tokens.typography.fontFamily};`,
  );
  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  --font-size--${key}: ${value};`);
  }
  for (const [key, heading] of Object.entries(tokens.typography.headings)) {
    lines.push(`  --font-size--${key}: ${heading.size};`);
  }

  lines.push('', '  /* ── Spacing ── */');
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --space--${key}: ${value};`);
  }

  lines.push('', '  /* ── Layout ── */');
  for (const [key, value] of Object.entries(tokens.layout.section)) {
    lines.push(`  --section--${key}: ${value};`);
  }
  lines.push(`  --padding--global: ${tokens.layout.paddingGlobal};`);
  for (const [key, value] of Object.entries(tokens.layout.container)) {
    lines.push(`  --container--${key}: ${value};`);
  }

  lines.push(
    '',
    '  /* ── Radii ── */',
  );
  for (const [key, value] of Object.entries(tokens.radii)) {
    lines.push(`  --radius--${key}: ${value};`);
  }

  lines.push(
    '}',
    '',
    '/* ── Base Overrides ── */',
    'body {',
    '  background-color: var(--color--bg--primary);',
    '  color: var(--color--text--alternate);',
    `  font-family: var(--font--body);`,
    `  font-size: var(--font-size--base);`,
    `  line-height: ${tokens.typography.lineHeight.base};`,
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
  const fontList = tokens.typography.fontFamily
    .split(',')
    .map(f => `'${f.trim().replace(/'/g, '')}'`)
    .join(', ');

  const config = `// ═══════════════════════════════════════════════════
// QuantumCor Tailwind Config — Sentinel v2
// Generated from files/tokens.json — DO NOT EDIT
// ═══════════════════════════════════════════════════

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html,astro}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            light: '${tokens.brand.blue.light}',
            DEFAULT: '${tokens.brand.blue.DEFAULT}',
            dark: '${tokens.brand.blue.dark}',
          },
          pink: {
            light: '${tokens.brand.pink.light}',
            DEFAULT: '${tokens.brand.pink.DEFAULT}',
            dark: '${tokens.brand.pink.dark}',
          },
        },
        neutral: {
${Object.entries(tokens.neutral).map(([k, v]) => `          '${k.toLowerCase()}': '${v}',`).join('\n')}
        },
      },

      fontFamily: {
        body: [${fontList}],
      },

      fontSize: {
${Object.entries(tokens.typography.fontSize).map(([k, v]) => `        '${k}': '${v}',`).join('\n')}
${Object.entries(tokens.typography.headings).map(([k, h]) => `        '${k}': ['${h.size}', { lineHeight: '${h.lineHeight}', fontWeight: '${h.weight}' }],`).join('\n')}
      },

      spacing: {
${Object.entries(tokens.spacing).map(([k, v]) => `        '${k}': '${v}',`).join('\n')}
        'section-sm': '${tokens.layout.section.small}',
        'section-md': '${tokens.layout.section.medium}',
        'section-lg': '${tokens.layout.section.large}',
        'global': '${tokens.layout.paddingGlobal}',
      },

      maxWidth: {
        'container-sm': '${tokens.layout.container.small}',
        'container-md': '${tokens.layout.container.medium}',
        'container-lg': '${tokens.layout.container.large}',
      },

      borderRadius: {
${Object.entries(tokens.radii).map(([k, v]) => `        '${k}': '${v}',`).join('\n')}
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
    name: "QuantumCor Sentinel",
    version: "2.0.0",
    colors: {
      primary: tokens.brand.blue.DEFAULT,
      primaryLight: tokens.brand.blue.light,
      primaryDark: tokens.brand.blue.dark,
      secondary: tokens.brand.pink.DEFAULT,
      background: tokens.neutral.black,
      surface: tokens.neutral.darkest,
      border: tokens.neutral.darker,
      textPrimary: tokens.neutral.white,
      textSecondary: tokens.neutral.lighter,
      textMuted: tokens.neutral.light,
      success: tokens.system.success.light,
      successDark: tokens.system.success.dark,
      warning: tokens.system.warning.light,
      warningDark: tokens.system.warning.dark,
      error: tokens.system.error.light,
      errorDark: tokens.system.error.dark,
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
      sizes: tokens.typography.fontSize,
      headings: tokens.typography.headings,
    },
    spacing: tokens.spacing,
    borderRadius: tokens.radii,
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
    '// Generated from files/tokens.json — DO NOT EDIT',
    '// ═══════════════════════════════════════════════════',
    '',
    '// Brand',
    `$brand-blue-light: ${tokens.brand.blue.light};`,
    `$brand-blue: ${tokens.brand.blue.DEFAULT};`,
    `$brand-blue-dark: ${tokens.brand.blue.dark};`,
    `$brand-pink-light: ${tokens.brand.pink.light};`,
    `$brand-pink: ${tokens.brand.pink.DEFAULT};`,
    `$brand-pink-dark: ${tokens.brand.pink.dark};`,
    '',
    '// Neutrals',
  ];

  for (const [key, value] of Object.entries(tokens.neutral)) {
    const suffix = key === 'DEFAULT' ? '' : `-${key}`;
    lines.push(`$neutral${suffix}: ${value};`);
  }

  lines.push(
    '',
    '// System',
    `$success-green: ${tokens.system.success.light};`,
    `$success-green-dark: ${tokens.system.success.dark};`,
    `$warning-yellow: ${tokens.system.warning.light};`,
    `$warning-yellow-dark: ${tokens.system.warning.dark};`,
    `$error-red: ${tokens.system.error.light};`,
    `$error-red-dark: ${tokens.system.error.dark};`,
    '',
    '// Typography',
    `$font-body: ${tokens.typography.fontFamily};`,
  );

  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`$text-${key}: ${value};`);
  }
  for (const [key, heading] of Object.entries(tokens.typography.headings)) {
    lines.push(`$${key}-size: ${heading.size};`);
    lines.push(`$${key}-line-height: ${heading.lineHeight};`);
    lines.push(`$${key}-weight: ${heading.weight};`);
  }

  lines.push('', '// Spacing');
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`$space-${key}: ${value};`);
  }

  lines.push('', '// Layout');
  for (const [key, value] of Object.entries(tokens.layout.section)) {
    lines.push(`$section-${key}: ${value};`);
  }
  lines.push(`$padding-global: ${tokens.layout.paddingGlobal};`);
  for (const [key, value] of Object.entries(tokens.layout.container)) {
    lines.push(`$container-${key}: ${value};`);
  }

  lines.push('', '// Radii');
  for (const [key, value] of Object.entries(tokens.radii)) {
    lines.push(`$radius-${key}: ${value};`);
  }

  fs.writeFileSync(path.join(dist, 'tokens.scss'), lines.join('\n'));
  console.log('  ✓ dist/tokens.scss');
}


// ─────────────────────────────────────────────
// 6. WARP TERMINAL THEME
// ─────────────────────────────────────────────
function buildWarp() {
  const yaml = `# QuantumCor Warp Terminal Theme — Sentinel v2
# Place in ~/.warp/themes/quantumcor.yaml
name: "QuantumCor"
accent: "${tokens.brand.blue.DEFAULT}"
background: "${tokens.neutral.black}"
foreground: "${tokens.neutral.lighter}"
details: "darker"
terminal_colors:
  normal:
    black: "${tokens.neutral.darkest}"
    red: "${tokens.system.error.dark}"
    green: "${tokens.system.success.dark}"
    yellow: "${tokens.system.warning.dark}"
    blue: "${tokens.brand.blue.DEFAULT}"
    magenta: "${tokens.brand.pink.DEFAULT}"
    cyan: "#22D3EE"
    white: "${tokens.neutral.lightest}"
  bright:
    black: "${tokens.neutral.dark}"
    red: "${tokens.system.error.light}"
    green: "${tokens.system.success.light}"
    yellow: "${tokens.system.warning.light}"
    blue: "${tokens.brand.blue.light}"
    magenta: "${tokens.brand.pink.light}"
    cyan: "#67E8F9"
    white: "${tokens.neutral.white}"
`;

  fs.writeFileSync(path.join(dist, 'warp-theme.yaml'), yaml);
  console.log('  ✓ dist/warp-theme.yaml');
}


// ─────────────────────────────────────────────
// 7. FLAT JSON EXPORT
// ─────────────────────────────────────────────
function buildFlatJSON() {
  const flat = {};

  function flatten(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const p = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        flatten(value, p);
      } else {
        flat[p] = value;
      }
    }
  }

  flatten(tokens);

  fs.writeFileSync(path.join(dist, 'tokens-flat.json'), JSON.stringify(flat, null, 2));
  console.log('  ✓ dist/tokens-flat.json');
}


// ─────────────────────────────────────────────
// BUILD ALL
// ─────────────────────────────────────────────
console.log('\n🔨 Building QuantumCor Design Tokens (Sentinel v2)...\n');
buildCSS();
buildClientFirst();
buildTailwind();
buildRetool();
buildSCSS();
buildWarp();
buildFlatJSON();
console.log('\n✅ All tokens built to ./dist/\n');
