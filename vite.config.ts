/**
 * @file vite.config.ts
 * @description Vite build configuration with Tailwind CSS integration
 * @version 1.0.0
 *
 * === CONFIGURATION ===
 * - Tailwind CSS plugin for instant styling
 * - TypeScript path aliases for clean imports
 * - Multi-page app setup with multiple HTML entries
 *
 * === PATH ALIASES ===
 *
 * Use these aliases in imports for cleaner code:
 *
 * ```typescript
 * import { initAnimations } from '@animations/fade';
 * import { changeLanguage } from '@js/utils/i18n';
 * import { initGlobe } from '@utils/map';
 * ```
 *
 * Instead of:
 *
 * ```typescript
 * import { initAnimations } from '../../../js/animations/fade';
 * import { changeLanguage } from '../../utils/i18n';
 * ```
 *
 * === BUILD TARGETS ===
 *
 * Multiple entry points:
 * - index.html (Home page)
 * - shipper.html (Shipper page)
 * - carrier.html (Carrier page)
 */

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/go/",
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@js": path.resolve(__dirname, "./src/js"),
      "@css": path.resolve(__dirname, "./src/css"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@i18n": path.resolve(__dirname, "./src/js/i18n"),
      "@pages": path.resolve(__dirname, "./src/js/pages"),
      "@animations": path.resolve(__dirname, "./src/js/animations"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        shipper: path.resolve(__dirname, "shipper.html"),
        carrier: path.resolve(__dirname, "carrier.html"),
        about: path.resolve(__dirname, "about.html"),
        faq: path.resolve(__dirname, "faq.html"),
      },
    },
  },
});
