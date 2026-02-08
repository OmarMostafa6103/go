/**
 * @file fade.ts
 * @description Intersection Observer animation engine with stagger and direction support
 * @version 1.0.0
 *
 * === FEATURES ===
 * - 4 directions: fade-up, fade-down, fade-left, fade-right
 * - Individual element animations with delay and duration control
 * - Stagger groups for sequential child animations
 * - Custom selectors for stagger targets
 * - URL-based bookmarking for animation states
 *
 * === INDIVIDUAL ELEMENT USAGE ===
 *
 * Basic animation:
 * ```html
 * <section data-animate="fade-up">Content animates when entering viewport</section>
 * ```
 *
 * With custom duration and delay:
 * ```html
 * <div data-animate="fade-left" data-delay="200" data-duration="600">
 *   Content
 * </div>
 * ```
 *
 * === STAGGER GROUP USAGE ===
 *
 * Stagger all children with 100ms interval:
 * ```html
 * <div data-stagger="100" data-delay="400" data-duration="200" data-animate="fade-up">
 *   <div>Child 1 - animated with 400ms delay</div>
 *   <div>Child 2 - animated with 500ms delay</div>
 *   <div>Child 3 - animated with 600ms delay</div>
 * </div>
 * ```
 *
 * Stagger with custom selector:
 * ```html
 * <div data-stagger="100" data-target=".card">
 *   <div class="card">Card 1</div>
 *   <div class="card">Card 2</div>
 * </div>
 * ```
 *
 * === ATTRIBUTE REFERENCE ===
 *
 * Individual Elements:
 * - data-animate: "fade-up" | "fade-down" | "fade-left" | "fade-right" (required)
 * - data-delay: Delay in ms (default: 0)
 * - data-duration: Animation duration in ms (default: 600)
 *
 * Stagger Groups (parent):
 * - data-stagger: Interval between children in ms (required, default: 100)
 * - data-delay: Base delay before first child (default: 0)
 * - data-duration: Shared duration for all children
 * - data-animate: Shared animation for all children
 * - data-target: Custom CSS selector for children
 * - data-stagger-all: Target all descendants, not just [data-animate] elements
 *
 * === INITIALIZATION ===
 *
 * ```typescript
 * import { initAnimations } from '@/animations/fade';
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   initAnimations();
 * });
 * ```
 *
 * === CSS INTEGRATION ===
 *
 * The module sets CSS custom properties that can be used in CSS:
 * - --duration: Animation duration in ms
 * - --delay: Animation delay in ms
 *
 * Example CSS:
 * ```css
 * [data-animate] {
 *   opacity: 0;
 *   transition: opacity var(--duration, 600ms) ease-out var(--delay, 0ms);
 * }
 *
 * [data-animate].is-visible {
 *   opacity: 1;
 * }
 * ```
 */

/**
 * Configuration options for AnimateObserver
 * @interface AnimateOptions
 */
interface AnimateOptions {
  /** Intersection threshold (0 = small part visible, 1 = fully visible) */
  threshold?: number;
  /** Root margin for observer (e.g., "0px 0px -100px 0px") */
  rootMargin?: string;
}

const defaultOptions: AnimateOptions = {
  threshold: 0.2,
  rootMargin: "0px",
};

/**
 * AnimateObserver class - manages intersection observation and animation triggers
 * @class AnimateObserver
 *
 * @example
 * ```typescript
 * const animator = new AnimateObserver({ threshold: 0.3 });
 * const element = document.querySelector('[data-animate]');
 * animator.observe(element);
 * ```
 */
export class AnimateObserver {
  private observer: IntersectionObserver;

  /**
   * Create an AnimateObserver instance
   * @param {AnimateOptions} options - Observer configuration
   */
  constructor(options: AnimateOptions = {}) {
    const config = { ...defaultOptions, ...options };

    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this),
      config,
    );
  }

  /**
   * Start observing an element
   * Sets CSS properties based on data attributes
   *
   * @param {HTMLElement} element - Element to observe and animate
   *
   * @example
   * const el = document.querySelector('[data-animate="fade-up"]');
   * animator.observe(el as HTMLElement);
   */
  observe(element: HTMLElement): void {
    const duration = element.dataset.duration;
    const delay = element.dataset.delay;

    if (duration) {
      element.style.setProperty("--duration", `${duration}ms`);
    }

    if (delay) {
      element.style.setProperty("--delay", `${delay}ms`);
    }

    this.observer.observe(element);
  }

  /**
   * Handle intersection observer events
   * Triggers when element enters viewport
   *
   * @private
   * @param {IntersectionObserverEntry[]} entries - Intersection observer entries
   */
  private handleIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        el.classList.add("is-visible");
        this.observer.unobserve(el);
      }
    });
  }

  /**
   * Stop observing all elements
   */
  disconnect(): void {
    this.observer.disconnect();
  }
}

/**
 * Process stagger groups and apply calculated delays/durations/animations to children
 * Handles data-stagger parent elements and applies animation properties to children
 *
 * @private
 * @returns {void}
 *
 * @example
 * <!-- HTML -->
 * <div data-stagger="100">
 *   <div data-animate="fade-up">Item 1</div>
 *   <div data-animate="fade-up">Item 2</div>
 * </div>
 *
 * <!-- After processStagger:
 *      Item 1: data-delay="0"
 *      Item 2: data-delay="100"
 * -->
 */
function processStagger(): void {
  const groups = document.querySelectorAll<HTMLElement>("[data-stagger]");

  groups.forEach((parent) => {
    const stagger = parseInt(parent.dataset.stagger || "100", 10);
    const baseDelay = parseInt(parent.dataset.delay || "0", 10);
    const sharedDuration = parent.dataset.duration;
    const sharedAnimation = parent.dataset.animate;
    const customTarget = parent.dataset.target;
    const targetAll = parent.hasAttribute("data-stagger-all");

    // Determine which children to target
    let children: HTMLElement[] = [];

    if (customTarget) {
      // Use custom selector
      children = Array.from(parent.querySelectorAll<HTMLElement>(customTarget));
    } else if (targetAll) {
      // Target all descendants with data-animate, or all descendants if parent has animation
      if (sharedAnimation) {
        children = Array.from(parent.querySelectorAll<HTMLElement>("*")).filter(
          (el) => el.parentElement !== null,
        );
      } else {
        children = Array.from(
          parent.querySelectorAll<HTMLElement>("[data-animate]"),
        );
      }
    } else {
      // Direct children only
      // Get all direct children, not just those with specific classes
      children = Array.from(parent.children).filter(
        (child): child is HTMLElement => {
          return (
            child instanceof HTMLElement &&
            (child.hasAttribute("data-animate") ||
              sharedAnimation !== undefined)
          );
        },
      );
    }

    // Apply stagger delay, shared duration, and shared animation
    children.forEach((child, index) => {
      // Apply shared animation first (child's own animation takes priority)
      if (sharedAnimation && !child.dataset.animate) {
        child.dataset.animate = sharedAnimation;
      }

      // Apply stagger delay (child's own delay takes priority)
      if (!child.dataset.delay) {
        child.dataset.delay = String(baseDelay + index * stagger);
      }

      // Apply shared duration (child's own duration takes priority)
      if (sharedDuration && !child.dataset.duration) {
        child.dataset.duration = sharedDuration;
      }
    });
  });
}

/**
 * Initialize animations on the page
 * Sets up intersection observers for all [data-animate] elements
 * Processes stagger groups and manages animation triggers
 *
 * @param {AnimateOptions} [options] - Observer options (threshold, rootMargin)
 * @returns {void}
 *
 * @example
 * ```typescript
 * // Basic usage
 * import { initAnimations } from '@/animations/fade';
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   initAnimations();
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With custom threshold
 * document.addEventListener('DOMContentLoaded', () => {
 *   initAnimations({ threshold: 0.5 });
 * });
 * ```
 */
export function initAnimations(options?: AnimateOptions): void {
  document.documentElement.classList.remove("no-js");

  processStagger();

  const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
  const animator = new AnimateObserver(options);

  elements.forEach((el) => animator.observe(el));
}
