/**
 * @file faq.ts
 * @description FAQ accordion and tab system manager
 * @version 1.0.0
 *
 * === FEATURES ===
 * - Accordion expand/collapse with smooth height transitions
 * - Single-open behavior (closing other items when one opens)
 * - Tab-based FAQ categorization with "show all" capability
 * - URL query parameter support for bookmarking (?category=all)
 * - Tab switching closes open accordions
 * - Animated content transitions with stagger effects
 *
 * === HTML STRUCTURE ===
 * ```html
 * <div class="faq-container">
 *   <div class="faq-tabs">
 *     <button class="faq-tab" data-tab="all">All</button>
 *     <button class="faq-tab" data-tab="general">General</button>
 *     <button class="faq-tab" data-tab="technical">Technical</button>
 *   </div>
 *   <div class="faq-items">
 *     <div class="faq-item" data-category="general">
 *       <div class="faq-question">
 *         <h3>Question Title?</h3>
 *         <svg class="faq-icon"><!-- chevron icon --></svg>
 *       </div>
 *       <div class="faq-answer">
 *         <p>Answer content here...</p>
 *       </div>
 *     </div>
 *     <!-- More faq-item elements -->
 *   </div>
 * </div>
 * ```
 *
 * === CSS INTEGRATION ===
 * ```css
 * .faq-item {
 *   border: 1px solid var(--color-border);
 *   border-radius: 8px;
 *   margin-bottom: 12px;
 * }
 * .faq-question {
 *   cursor: pointer;
 *   padding: 16px;
 *   display: flex;
 *   justify-content: space-between;
 *   align-items: center;
 * }
 * .faq-answer {
 *   overflow: hidden;
 *   max-height: 0;
 *   transition: max-height 0.3s ease-in-out;
 *   padding: 0 16px;
 * }
 * .faq-item.open .faq-answer {
 *   padding: 0 16px 16px 16px;
 * }
 * .faq-icon {
 *   transition: all 0.3s ease;
 *   border-radius: 50%;
 *   padding: 8px;
 * }
 * ```
 *
 * === TYPESCRIPT USAGE ===
 * ```typescript
 * import { initFAQ } from '@js/utils/faq';
 *
 * // Initialize FAQ when DOM is ready
 * initFAQ();
 * ```
 *
 * === INITIALIZATION ===
 * Called from src/js/main.ts during DOMContentLoaded event
 */

import { initTabs } from "./tabs";

/**
 * Initialize FAQ accordion and tab system
 *
 * Manages accordion expand/collapse behavior with smooth height transitions,
 * integrates with tab system for category filtering, and supports URL
 * bookmarking via query parameters.
 *
 * @function initFAQ
 * @returns {void}
 *
 * @example
 * // Initialize FAQ system when page loads
 * import { initFAQ } from '@js/utils/faq';
 * document.addEventListener('DOMContentLoaded', () => {
 *   initFAQ();
 * });
 *
 * @example
 * // User can navigate to specific category via URL
 * // /page?category=general -> Shows FAQ filtered to general category
 * // /page?category=all -> Shows all FAQ items (default)
 */
export const initFAQ = (): void => {
  const faqItems = document.querySelectorAll<HTMLElement>(".faq-item");
  const faqQuestions = document.querySelectorAll<HTMLElement>(".faq-question");
  const tabs = document.querySelectorAll<HTMLElement>(".faq-tab");

  /**
   * Toggle accordion item open/closed state
   *
   * Closes all other accordion items, then toggles current item's open state.
   * Updates icon rotation and background color with smooth transitions.
   *
   * @function toggleAccordion
   * @param {HTMLElement} button - The question button element that was clicked
   * @returns {void}
   */
  const toggleAccordion = (button: HTMLElement): void => {
    const item = button.closest(".faq-item") as HTMLElement;
    const answer = item.querySelector(".faq-answer") as HTMLElement;
    const icon = item.querySelector(".faq-icon") as SVGElement;
    const isOpen = item.classList.contains("open");

    // Close all other items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("open")) {
        const otherAnswer = otherItem.querySelector(
          ".faq-answer",
        ) as HTMLElement;
        const otherIcon = otherItem.querySelector(".faq-icon") as SVGElement;

        otherItem.classList.remove("open");
        otherAnswer.style.maxHeight = "0";
        otherIcon.style.backgroundColor = "";
        otherIcon.style.borderColor = "";
        otherIcon.style.transform = "rotate(0deg)";
      }
    });

    // Toggle current item
    if (isOpen) {
      item.classList.remove("open");
      answer.style.maxHeight = "0";
      icon.style.backgroundColor = "";
      icon.style.borderColor = "";
      icon.style.transform = "rotate(0deg)";
    } else {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.style.backgroundColor = "var(--color-primary-lightest)";
      icon.style.borderColor = "var(--color-primary)";
      icon.style.color = "var(--color-primary)";
      icon.style.transform = "rotate(45deg)";
    }
  };

  /**
   * Close all open accordions
   *
   * Resets all accordion items to closed state, collapsing their answers
   * and resetting icon styling. Called when switching tabs to show fresh
   * content without lingering open accordions.
   *
   * @function closeAllAccordions
   * @returns {void}
   */
  const closeAllAccordions = (): void => {
    faqItems.forEach((item) => {
      if (item.classList.contains("open")) {
        const answer = item.querySelector(".faq-answer") as HTMLElement;
        const icon = item.querySelector(".faq-icon") as SVGElement;

        item.classList.remove("open");
        answer.style.maxHeight = "0";
        icon.style.backgroundColor = "";
        icon.style.borderColor = "";
        icon.style.transform = "rotate(0deg)";
      }
    });
  };

  // Accordion click handlers
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      toggleAccordion(question);
    });
  });

  // Close accordions when switching tabs to show fresh content
  tabs.forEach((tab) => {
    tab.addEventListener("click", closeAllAccordions);
  });

  // Initialize reusable tab handler for FAQ with "show all" capability
  // Supports category filtering, URL bookmarking, and animated transitions
  initTabs({
    tabSelector: ".faq-tab",
    contentSelector: ".faq-item",
    tabAttribute: "data-tab",
    contentAttribute: "data-category",
    queryParam: "category",
    defaultTab: "all",
    showAll: true,
    animationType: "fade-left",
    animationDuration: 400,
    staggerDelay: 80,
  });
};
