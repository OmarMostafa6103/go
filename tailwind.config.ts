/**
 * @file tailwind.config.ts
 * @description Tailwind CSS configuration for styling and layout
 * @version 1.0.0
 *
 * === FEATURES ===
 * - PurgeCSS optimized with content paths
 * - Theme customization ready
 * - Plugin system enabled
 * - Multiple entry points support
 *
 * === CONTENT PATHS ===
 *
 * Tailwind scans these files for class names:
 * - All HTML files (*.html)
 * - All TypeScript files in src (*.ts)
 * - Ensures unused styles are pruned
 *
 * === CUSTOMIZATION ===
 *
 * Add custom colors, fonts, spacing in theme.extend:
 *
 * ```typescript
 * theme: {
 *   extend: {
 *     colors: {
 *       'brand': '#00FF00',
 *     },
 *     spacing: {
 *       '128': '32rem',
 *     },
 *   },
 * },
 * ```
 *
 * === PLUGINS ===
 *
 * Add Tailwind plugins for extended functionality:
 *
 * ```typescript
 * plugins: [
 *   require('@tailwindcss/forms'),
 *   require('@tailwindcss/typography'),
 * ],
 * ```
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./shipper.html",
    "./customer.html",
    "./src/**/*.{ts,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
