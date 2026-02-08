/**
 * @file main.ts
 * @description Application entry point - orchestrates initialization of all major features
 * @version 1.0.0
 *
 * === KEY FEATURES ===
 * - Internationalization (i18n) with automatic language detection
 * - Scroll animations (fade-up, fade-down, fade-left, fade-right)
 * - Counter animations for statistics
 * - Infinite carousel
 * - FAQ accordion
 * - Tech tabs with URL query parameter support
 * - Interactive globe map
 * - Mobile menu with overlay
 *
 * === INITIALIZATION FLOW ===
 * 1. Wait for DOM to be ready (DOMContentLoaded)
 * 2. Setup language selector
 * 3. Initialize animations (fade effects)
 * 4. Initialize mobile menu
 * 5. Setup carousel
 * 6. Initialize counter animations
 * 7. Initialize FAQ accordion
 * 8. Initialize tech tabs
 * 9. Initialize feature tabs
 * 10. Initialize interactive globe
 *
 * === EXAMPLE HTML USAGE ===
 *
 * <!-- Language Selector -->
 * <select id="language-selector">
 *   <option value="en">English</option>
 *   <option value="de">Deutsch</option>
 *   <option value="fr">Français</option>
 *   <option value="nl">Nederlands</option>
 * </select>
 *
 * <!-- Animations -->
 * <section data-animate="fade-up" data-delay="200" data-duration="400">Content</section>
 *
 * <!-- Counter -->
 * <span data-counter="1000" data-duration="2000">0</span>
 *
 * <!-- Carousel -->
 * <div class="carousel">
 *   <div class="carousel-track">
 *     <div class="item">Item 1</div>
 *     <div class="item">Item 2</div>
 *   </div>
 * </div>
 */

import { changeLanguage } from "@/js/utils/i18n";
import { initAnimations } from "@/js/animations/fade";
import { initCounters } from "./animations/counter";
import { initFAQ } from "./utils/faq";
import { initGlobe } from "./utils/map";
import { initTabs } from "./utils/tabs";
import { initMobileMenu } from "./utils/mobile-menu";

/**
 * Main initialization handler
 * Waits for DOM to be fully loaded, then initializes all features
 *
 * @fires DOMContentLoaded
 * @listens DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Language is auto-detected from URL → localStorage → HTML lang → browser → default
  // The i18n module calls translatePage() automatically

  /**
   * Setup language selector event listener
   * Allows users to manually change language
   */
  const languageSelector =
    document.querySelector<HTMLSelectElement>("#language-selector");
  if (languageSelector) {
    languageSelector.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      changeLanguage(target.value as "en" | "de" | "fr" | "nl");
    });
  }

  // Initialize scroll animations
  initAnimations();

  /**
   * Initialize mobile menu
   * Handles overlay toggle, scroll lock, and navigation
   */
  initMobileMenu();

  /**
   * Setup infinite carousel
   * Clones carousel items to create seamless looping effect
   * Uses CSS custom property --scroll-width for animation
   */
  const carousel = document.querySelector<HTMLElement>(".carousel");
  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    if (!track) return;
    const originals = Array.from(track.children);
    const itemWidth = (originals[0] as HTMLElement).offsetWidth;
    const scrollWidth = itemWidth * originals.length;

    // Clone all items to create seamless loop
    originals.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });

    // Set CSS variable for animation
    carousel.style.setProperty("--scroll-width", `${scrollWidth}px`);
  }

  /**
   * Initialize counter animations
   * Animates number values when they come into viewport
   */
  initCounters();

  /**
   * Initialize FAQ accordion
   */
  initFAQ();

  /**
   * Initialize tech tabs
   * Supports URL query parameter for bookmarkable tabs
   * Example: ?tech=ai-matching
   */
  initTabs({
    tabSelector: ".tech-tab",
    contentSelector: ".tech-content",
    tabAttribute: "data-tab",
    contentAttribute: "data-tech",
    queryParam: "tech",
    defaultTab: "ai-matching",
    showAll: false,
    animationType: "fade-left",
    animationDuration: 600,
    staggerDelay: 1000,
    autoRotate: true,
    autoRotateInterval: 5000,
  });

  /**
   * Initialize feature tabs
   * Supports URL query parameter for bookmarkable tabs
   * Example: ?feature=individuals
   */
  initTabs({
    tabSelector: ".feature-tab",
    contentSelector: ".feature-content",
    tabAttribute: "data-tab",
    contentAttribute: "data-feature",
    queryParam: "feature",
    defaultTab: "individuals",
    showAll: false,
    animationType: "fade-up",
    animationDuration: 600,
    staggerDelay: 0,
  });

  /**
   * Initialize interactive globe map
   */
  initGlobe();
});
