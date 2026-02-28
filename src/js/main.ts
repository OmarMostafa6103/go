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

import { changeLanguage, t } from "@/js/utils/i18n";
import { initAnimations } from "@/js/animations/fade";
import { initCounters } from "./animations/counter";
import { initFAQ } from "./utils/faq";
import { initGlobe } from "./utils/map";
import { initCorridorMap } from "./utils/corridorMap";
import { initTabs } from "./utils/tabs";
import { initMobileMenu } from "./utils/mobile-menu";

// Expose t function to window for use in carousel and other dynamic contexts
(window as any).t = t;

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
      changeLanguage(target.value as "en" | "de");
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
   * Initialize features carousel
   * Manual carousel with next/prev buttons and dot navigation
   */
  const carousels = document.querySelectorAll<HTMLElement>(
    "[data-carousel], .features-carousel",
  );
  carousels.forEach((carousel) => {
    const carouselId =
      carousel.getAttribute("data-carousel") ||
      carousel.classList.contains("features-carousel")
        ? "features-carousel"
        : carousel.className;
    const inner = carousel.querySelector<HTMLElement>(
      ".features-carousel-inner",
    );
    if (!inner) return;

    // Get parent container that has the heading/description
    const parentContainer = carousel.parentElement;
    const headingElement = parentContainer?.querySelector(
      ".features-carousel-heading",
    ) as HTMLElement | null;
    const descriptionElement = parentContainer?.querySelector(
      ".features-carousel-description",
    ) as HTMLElement | null;

    const slides = Array.from(
      inner.querySelectorAll<HTMLElement>(".features-carousel-slide"),
    );
    let currentSlide = 0;

    const updateCarousel = async () => {
      const translateX = -currentSlide * 100;
      inner.style.transform = `translateX(${translateX}%)`;

      // Update dots
      const allDots = document.querySelectorAll<HTMLElement>(
        `.carousel-dot[data-carousel="${carouselId}"]`,
      );
      allDots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add("active");
          dot.classList.remove("bg-primary-200");
          dot.classList.add("bg-primary");
        } else {
          dot.classList.remove("active");
          dot.classList.remove("bg-primary");
          dot.classList.add("bg-primary-200");
        }
      });

      // Update toggle buttons
      const toggleButtons = document.querySelectorAll<HTMLElement>(
        `.features-toggle-btn[data-carousel="${carouselId}"]`,
      );
      toggleButtons.forEach((btn, index) => {
        if (index === currentSlide) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Update heading and description based on current slide
      if (headingElement && descriptionElement) {
        let headingKey = "";
        let descriptionKey = "";

        if (currentSlide === 0) {
          headingKey =
            headingElement.getAttribute("data-heading-individuals") || "";
          descriptionKey =
            descriptionElement.getAttribute("data-description-individuals") ||
            "";
        } else if (currentSlide === 1) {
          headingKey = headingElement.getAttribute("data-heading-fleets") || "";
          descriptionKey =
            descriptionElement.getAttribute("data-description-fleets") || "";
        }

        // Use the t function to get translations
        if (
          typeof window !== "undefined" &&
          (window as any).t &&
          headingKey &&
          descriptionKey
        ) {
          try {
            const headingText = await (window as any).t(headingKey);
            const descriptionText = await (window as any).t(descriptionKey);

            if (headingText) {
              headingElement.textContent = headingText;
            }
            if (descriptionText) {
              descriptionElement.textContent = descriptionText;
            }
          } catch (error) {
            console.error("Error translating carousel text:", error);
          }
        }
      }
    };

    // Toggle button click handlers
    const toggleButtons = document.querySelectorAll<HTMLElement>(
      `.features-toggle-btn[data-carousel="${carouselId}"]`,
    );
    toggleButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const slideIndex = parseInt(
          btn.getAttribute("data-toggle-slide") || "0",
        );
        currentSlide = slideIndex;
        await updateCarousel();
      });
    });

    // Next button
    const nextButtons = document.querySelectorAll<HTMLElement>(
      `.carousel-next[data-carousel="${carouselId}"]`,
    );
    nextButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        currentSlide = (currentSlide + 1) % slides.length;
        await updateCarousel();
      });
    });

    // Prev button
    const prevButtons = document.querySelectorAll<HTMLElement>(
      `.carousel-prev[data-carousel="${carouselId}"]`,
    );
    prevButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        await updateCarousel();
      });
    });

    // Dot navigation
    const dots = document.querySelectorAll<HTMLElement>(
      `.carousel-dot[data-carousel="${carouselId}"]`,
    );
    dots.forEach((dot) => {
      dot.addEventListener("click", async () => {
        const slideIndex = parseInt(dot.getAttribute("data-slide") || "0");
        currentSlide = slideIndex;
        await updateCarousel();
      });
    });

    // Initialize carousel with proper await
    updateCarousel().catch((error) => {
      console.error("Error initializing carousel:", error);
    });
  });

  /**
   * Initialize interactive globe map
   */
  initGlobe();

  /**
   * Initialize Germany corridor map (corridor.html and investor.html)
   * Longer delay ensures amCharts scripts are fully loaded and parsed
   */
  setTimeout(() => {
    initCorridorMap();
  }, 500);
});
