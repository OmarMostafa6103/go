/**
 * @file tabs.ts
 * @description Tab handler for managing tab switching with URL parameters
 * @version 1.0.0
 *
 * === FEATURES ===
 * - Tab switching with smooth animations
 * - URL query parameter support for bookmarking
 * - Active tab styling management
 * - Content animation with stagger support
 * - Responsive tab behavior
 *
 * === USAGE ===
 *
 * See TabConfig interface and initTabs function for detailed usage.
 *
 * @example
 * ```typescript
 * import { initTabs } from '@/utils/tabs';
 *
 * initTabs({
 *   tabSelector: '.tech-tab',
 *   contentSelector: '.tech-content',
 *   tabAttribute: 'data-tab',
 *   contentAttribute: 'data-tech',
 *   queryParam: 'tech',
 *   defaultTab: 'ai-matching',
 *   animationType: 'fade-left',
 *   animationDuration: 600,
 * });
 * ```
 */

/**
 * Configuration interface for tab system
 * @interface TabConfig
 */
export interface TabConfig {
  /** CSS selector for tab buttons */
  tabSelector: string;
  /** CSS selector for tab content containers */
  contentSelector: string;
  /** Data attribute name for tabs (e.g., "data-tab") */
  tabAttribute: string;
  /** Data attribute name for content (e.g., "data-content") */
  contentAttribute: string;
  /** URL query parameter name for bookmarking */
  queryParam: string;
  /** Default tab to show on initial load */
  defaultTab: string;
  /** Show all content instead of switching tabs */
  showAll?: boolean;
  /** Animation type (e.g., "fade-left", "fade-up") */
  animationType?: string;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Stagger delay between items in ms */
  staggerDelay?: number;
  /** Enable auto-rotation of tabs */
  autoRotate?: boolean;
  /** Auto-rotation interval in ms (default: 5000) */
  autoRotateInterval?: number;
}

/**
 * Initialize tabbed content system
 * Manages tab switching, URL state, and animations
 *
 * @param {TabConfig} config - Tab configuration
 * @returns {void}
 *
 * @example
 * ```html
 * <!-- Tab buttons -->
 * <button class="tech-tab active" data-tab="ai-matching">
 *   AI Matching
 * </button>
 * <button class="tech-tab" data-tab="real-time">
 *   Real-time Tracking
 * </button>
 *
 * <!-- Tab content -->
 * <div class="tech-content" data-tech="ai-matching">
 *   AI Matching content
 * </div>
 * <div class="tech-content" data-tech="real-time" style="display: none;">
 *   Real-time Tracking content
 * </div>
 * ```
 *
 * === URL BOOKMARKING ===
 *
 * When user switches tabs, URL updates to:
 * - mypage.html?tech=ai-matching
 * - mypage.html?tech=real-time
 *
 * Direct links with ?tech=real-time will open the specific tab.
 */
export const initTabs = (config: TabConfig): void => {
  const {
    tabSelector,
    contentSelector,
    tabAttribute,
    contentAttribute,
    queryParam,
    defaultTab,
    showAll = false,
    animationType = "fade-left",
    animationDuration = 400,
    staggerDelay = 0,
    autoRotate = false,
    autoRotateInterval = 5000,
  } = config;

  const tabs = document.querySelectorAll<HTMLElement>(tabSelector);
  const contents = document.querySelectorAll<HTMLElement>(contentSelector);

  if (tabs.length === 0 || contents.length === 0) return;

  // Get wrapper element
  const wrapper = contents[0].parentElement as HTMLElement;

  // Get initial tab from URL or default
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get(queryParam) || defaultTab;

  // Track current tab index for auto-rotation
  let currentTabIndex = Array.from(tabs).findIndex(
    (tab) => tab.getAttribute(tabAttribute) === initialTab,
  );
  if (currentTabIndex === -1) currentTabIndex = 0;

  let autoRotateInterval_id: ReturnType<typeof setInterval> | null = null;

  /**
   * Update active tab styles
   * @param {HTMLElement} activeTab - Tab element to mark as active
   */
  const updateActiveTab = (activeTab: HTMLElement): void => {
    tabs.forEach((tab) => {
      if (tab === activeTab) {
        tab.classList.add("active", "text-primary", "bg-primary-bg");
        tab.classList.remove("text-text-secondary");
      } else {
        tab.classList.remove("active", "text-primary", "bg-primary-bg");
        tab.classList.add("text-text-secondary");
      }
    });
  };

  /**
   * Update URL query parameter without page reload
   * @param {string} tabValue - Tab value to set in URL
   */
  const updateURL = (tabValue: string): void => {
    const url = new URL(window.location.href);
    if (tabValue === defaultTab) {
      url.searchParams.delete(queryParam);
    } else {
      url.searchParams.set(queryParam, tabValue);
    }
    window.history.pushState({}, "", url);
  };

  /**
   * Switch tab content with smooth animation
   * Preserves wrapper height to prevent layout shift
   *
   * @param {string} tabValue - Content identifier to show
   * @param {boolean} animate - Whether to animate the transition
   */
  const switchContent = (tabValue: string, animate: boolean = true): void => {
    const itemsToHide: HTMLElement[] = [];
    const itemsToShow: HTMLElement[] = [];

    contents.forEach((content) => {
      const contentValue = content.getAttribute(contentAttribute);
      const shouldShow = showAll
        ? tabValue === "all" || contentValue === tabValue
        : contentValue === tabValue;

      if (shouldShow) {
        itemsToShow.push(content);
      } else {
        itemsToHide.push(content);
      }
    });

    // IMPORTANT: Set min-height to the height of items that will be hidden
    // This prevents wrapper from collapsing when we hide them
    if (wrapper && !showAll && itemsToHide.length > 0) {
      // Get the actual height of content being hidden (currently visible)
      const hidingContentHeight = itemsToHide.reduce((total, item) => {
        return total + item.offsetHeight;
      }, 0);

      if (hidingContentHeight > 0) {
        wrapper.style.minHeight = hidingContentHeight + "px";
      }
    }

    const hideDuration = 200;

    // Hide items first
    itemsToHide.forEach((item, index) => {
      if (animate) {
        item.style.setProperty("--delay", `${index * 30}ms`);
        item.style.setProperty("--duration", `${hideDuration}ms`);
        item.classList.remove("is-visible");

        setTimeout(
          () => {
            item.style.display = "none";
          },
          hideDuration + index * 30,
        );
      } else {
        item.style.display = "none";
        item.classList.remove("is-visible");
      }
    });

    // Calculate when all hide animations complete
    const hideCompleteDelay = animate
      ? hideDuration + (itemsToHide.length - 1) * 30
      : 0;

    // WAIT for hide to complete, THEN show new content
    setTimeout(() => {
      itemsToShow.forEach((item, index) => {
        item.style.display = "block";
        item.classList.remove("is-visible");
        item.setAttribute("data-animate", animationType);

        void item.offsetWidth; // Force reflow

        const itemDelay = index * staggerDelay;
        item.style.setProperty("--delay", `${itemDelay}ms`);
        item.style.setProperty("--duration", `${animationDuration}ms`);

        requestAnimationFrame(() => {
          item.classList.add("is-visible");
        });
      });

      // After showing new content, update min-height to new content height
      if (wrapper && !showAll) {
        wrapper.style.transition = `min-height ${animationDuration}ms ease-in-out`;
        setTimeout(
          () => {
            const newHeight = wrapper.offsetHeight;
            if (newHeight > 0) {
              wrapper.style.minHeight = newHeight + "px";
            }
          },
          animationDuration + staggerDelay * itemsToShow.length,
        );
        setTimeout(
          () => {
            wrapper.style.minHeight = "unset";
          },
          animationDuration + staggerDelay * itemsToShow.length + 50,
        );
      }
    }, hideCompleteDelay);
  };

  /**
   * Start auto-rotation of tabs
   */
  const startAutoRotation = (): void => {
    if (autoRotateInterval_id) {
      clearInterval(autoRotateInterval_id);
    }

    autoRotateInterval_id = setInterval(() => {
      // Move to next tab
      currentTabIndex = (currentTabIndex + 1) % tabs.length;
      const nextTab = tabs[currentTabIndex];
      const tabValue = nextTab.getAttribute(tabAttribute);

      if (tabValue) {
        updateActiveTab(nextTab);
        updateURL(tabValue);
        switchContent(tabValue, true);
      }
    }, autoRotateInterval);
  };

  /**
   * Handle tab click
   */
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabValue = tab.getAttribute(tabAttribute);
      if (!tabValue) return;

      // Stop auto-rotation on manual click
      if (autoRotateInterval_id) {
        clearInterval(autoRotateInterval_id);
        autoRotateInterval_id = null;
      }

      // Update current tab index
      currentTabIndex = Array.from(tabs).indexOf(tab);

      updateActiveTab(tab);
      updateURL(tabValue);
      switchContent(tabValue, true);

      // Restart auto-rotation after a delay
      if (autoRotate) {
        setTimeout(() => {
          startAutoRotation();
        }, autoRotateInterval);
      }
    });
  });

  /**
   * Initialize on page load
   */
  const initialTabElement = Array.from(tabs).find(
    (tab) => tab.getAttribute(tabAttribute) === initialTab,
  ) as HTMLElement;

  if (initialTabElement) {
    updateActiveTab(initialTabElement);
  }

  switchContent(initialTab, false);

  // Set initial min-height after first render
  if (wrapper) {
    setTimeout(() => {
      const initialHeight = wrapper.offsetHeight;
      if (initialHeight > 0) {
        wrapper.style.minHeight = initialHeight + "px";
      }
    }, 100);
  }

  /**
   * Handle browser back/forward
   */
  window.addEventListener("popstate", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabValue = urlParams.get(queryParam) || defaultTab;
    const tab = Array.from(tabs).find(
      (t) => t.getAttribute(tabAttribute) === tabValue,
    ) as HTMLElement;

    if (tab) {
      updateActiveTab(tab);
      switchContent(tabValue, true);
      currentTabIndex = Array.from(tabs).indexOf(tab);
    }
  });

  /**
   * Start auto-rotation if enabled
   */
  if (autoRotate) {
    setTimeout(() => {
      startAutoRotation();
    }, autoRotateInterval);
  }
};
