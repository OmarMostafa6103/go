/**
 * @file counter.ts
 * @description Counter animation system - animates numbers from 0 to target value
 * @version 1.0.0
 *
 * === FEATURES ===
 * - Smooth easing animation (ease-out-quart)
 * - Decimal place handling
 * - Viewport trigger (Intersection Observer)
 * - Customizable duration and delay
 * - One-time animation per element
 *
 * === HTML USAGE ===
 *
 * Basic counter:
 * ```html
 * <span data-counter="1000">0</span>
 * ```
 *
 * With custom duration and delay:
 * ```html
 * <span data-counter="500.25" data-duration="2000" data-delay="300">0</span>
 * ```
 *
 * === ATTRIBUTES ===
 * - data-counter: Target number to animate to (required)
 * - data-duration: Animation duration in ms (default: 400)
 * - data-delay: Delay before animation starts in ms (default: 0)
 *
 * === INITIALIZATION ===
 *
 * ```typescript
 * import { initCounters } from '@/animations/counter';
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   initCounters();
 * });
 * ```
 */

/**
 * Easing function for counter animation (ease-out-quart)
 * Creates smooth deceleration effect
 *
 * @param {number} t - Progress value from 0 to 1
 * @returns {number} Eased progress value
 *
 * @example
 * easeOutQuart(0.5) // Returns ~0.93 (curve up)
 */
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

/**
 * Get number of decimal places in a number
 * Handles scientific notation
 *
 * @param {number} num - Number to analyze
 * @returns {number} Number of decimal places
 *
 * @example
 * getDecimalPlaces(123.456) // Returns 3
 * getDecimalPlaces(100.5) // Returns 1
 * getDecimalPlaces(1000) // Returns 0
 */
const getDecimalPlaces = (num: number): number => {
  const match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) return 0;
  return Math.max(
    0,
    (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0),
  );
};

/**
 * Animate counter for a specific element
 * Updates element text from 0 to target value using requestAnimationFrame
 *
 * @param {HTMLElement} element - Element with data-counter attribute
 *
 * @example
 * const element = document.querySelector('[data-counter="1000"]');
 * animateCounter(element as HTMLElement);
 */
const animateCounter = (element: HTMLElement): void => {
  const target = parseFloat(element.getAttribute("data-counter") || "0");
  const duration = parseInt(element.getAttribute("data-duration") || "400", 10);
  const delay = parseInt(element.getAttribute("data-delay") || "0", 10);

  const startAnimation = () => {
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing
      const easedProgress = easeOutQuart(progress);
      const current = target * easedProgress;

      // Format number based on target value
      let displayValue: string;
      if (target >= 1000) {
        // For large numbers, no decimals
        displayValue = Math.floor(current).toString();
      } else if (target >= 100) {
        // For medium numbers, no decimals
        displayValue = Math.floor(current).toString();
      } else {
        // For smaller numbers, show decimals if original has them
        const decimals = getDecimalPlaces(target);
        displayValue = current.toFixed(decimals);
      }

      element.textContent = displayValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        element.textContent = target.toString();
      }
    };

    requestAnimationFrame(animate);
  };

  // Apply delay if specified, otherwise start immediately
  if (delay > 0) {
    setTimeout(startAnimation, delay);
  } else {
    startAnimation();
  }
};

/**
 * Handle intersection observer callback
 * Triggers animation when element enters viewport
 *
 * @param {IntersectionObserverEntry[]} entries - Intersection observer entries
 * @param {Set<Element>} animatedElements - Set to track already animated elements
 */
const handleIntersection = (
  entries: IntersectionObserverEntry[],
  animatedElements: Set<Element>,
): void => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !animatedElements.has(entry.target)) {
      animatedElements.add(entry.target);
      animateCounter(entry.target as HTMLElement);
    }
  });
};

/**
 * Initialize counter animation for all elements with data-counter attribute
 * Sets up Intersection Observer to trigger animations on viewport entry
 *
 * @returns {void}
 *
 * @example
 * // In main.ts
 * import { initCounters } from '@/animations/counter';
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   initCounters(); // Finds all [data-counter] elements and observes them
 * });
 */
export const initCounters = (): void => {
  const animatedElements = new Set<Element>();

  const observer = new IntersectionObserver(
    (entries) => handleIntersection(entries, animatedElements),
    {
      threshold: 0.5, // Trigger when 50% of element is visible
      rootMargin: "0px",
    },
  );

  const counterElements = document.querySelectorAll("[data-counter]");
  counterElements.forEach((el) => {
    observer.observe(el);
  });
};
