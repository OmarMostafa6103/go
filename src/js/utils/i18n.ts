/**
 * @file i18n.ts
 * @description Internationalization (i18n) system with dynamic locale file loading
 * @version 2.4.0
 *
 * === FEATURES ===
 * - Automatic language detection from multiple sources (URL, localStorage, HTML, browser)
 * - Dynamic translation file loading (namespaced JSON)
 * - Translation caching for performance
 * - Variable replacement in translation strings
 * - Language selector UI support
 * - URL query parameter support for bookmarking
 * - localStorage persistence
 *
 * === LANGUAGE DETECTION PRIORITY ===
 * 1. URL parameter (?lang=de)
 * 2. localStorage
 * 3. HTML lang attribute (<html lang="de">)
 * 4. Browser language (navigator.language)
 * 5. Default language (en)
 *
 * === SUPPORTED LANGUAGES ===
 * - en: English
 * - de: Deutsch
 * - fr: Français
 * - nl: Nederlands
 *
 * === HTML USAGE ===
 *
 * Mark elements for translation:
 * ```html
 * <h1 data-i18n="home.hero.heading"></h1>
 * <p data-i18n="home.hero.description"></p>
 * ```
 *
 * With variable replacement:
 * ```html
 * <p data-i18n="welcome" data-name="John"></p>
 * <!-- Translation: "Hello, {name}!" -->
 * <!-- Result: "Hello, John!" -->
 * ```
 *
 * Language selector:
 * ```html
 * <select id="language-selector">
 *   <option value="en">English</option>
 *   <option value="de">Deutsch</option>
 * </select>
 * ```
 *
 * === TYPESCRIPT USAGE ===
 *
 * Basic translation:
 * ```typescript
 * import { changeLanguage, pageLanguage } from '@/utils/i18n';
 *
 * // Get current language
 * console.log(pageLanguage); // 'en'
 *
 * // Change language
 * changeLanguage('de');
 * ```
 *
 * Load specific locale:
 * ```typescript
 * import { loadLocaleFile } from '@/utils/i18n';
 *
 * const translations = await loadLocaleFile('fr');
 * console.log(translations.home.hero.heading);
 * ```
 *
 * Get translation programmatically:
 * ```typescript
 * import { t } from '@/utils/i18n';
 *
 * const greeting = await t('welcome', { name: 'Alice' });
 * console.log(greeting); // "Hello, Alice!"
 * ```
 *
 * === FOLDER STRUCTURE ===
 *
 * Translations organized by namespace:
 * ```
 * src/locales/
 * ├── en/
 * │   ├── common.json   (header, footer, shared terms)
 * │   ├── home.json     (home page)
 * │   ├── shipper.json  (shipper page)
 * │   └── carrier.json  (carrier page)
 * ├── de/
 * ├── fr/
 * └── nl/
 * ```
 *
 * === EXAMPLE TRANSLATION FILE ===
 *
 * en/home.json:
 * ```json
 * {
 *   "hero": {
 *     "heading": "Welcome to GoLynk",
 *     "description": "Ship smarter, earn more"
 *   },
 *   "features": [
 *     "Real-time tracking",
 *     "AI-powered matching",
 *     "Secure payments"
 *   ]
 * }
 * ```
 *
 * Language Detection Priority (highest to lowest):
 * 1. URL parameter (?lang=de)
 * 2. localStorage
 * 3. HTML lang attribute (<html lang="de">)
 * 4. Browser language (navigator.language)
 * 5. Default language (en)
 *
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Supported locale codes
 * @type {LocaleCode}
 */
type LocaleCode = "en" | "de" | "fr" | "nl";

/**
 * Translation namespaces
 * @type {Namespace}
 */
type Namespace = "common" | "home" | "shipper" | "carrier";

/**
 * Source of language detection
 * @type {LanguageSource}
 */
type LanguageSource =
  | "url"
  | "localStorage"
  | "html"
  | "browser"
  | "default"
  | "manual";

/**
 * Translation object structure (can be nested)
 * @interface TranslationObject
 */
interface TranslationObject {
  [key: string]: string | string[] | TranslationObject;
}

/**
 * Collection of translations organized by namespace
 * @interface NamespacedTranslations
 */
interface NamespacedTranslations {
  [namespace: string]: TranslationObject;
}

// ============================================================================
// Configuration
// ============================================================================

const availableLocales: LocaleCode[] = ["en", "de", "fr", "nl"];
const localeNames: Record<LocaleCode, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  nl: "Nederlands",
};
const translationNamespaces: Namespace[] = [
  "common",
  "home",
  "shipper",
  "carrier",
];
const defaultLanguage: LocaleCode = "en";
const translationCache: Map<LocaleCode, NamespacedTranslations> = new Map();
const STORAGE_KEY = "preferred_language";

// ============================================================================
// Language Detection
// ============================================================================

/**
 * Detects the appropriate language based on multiple sources
 * @returns {Object} Detected language and detection source
 * @returns {LocaleCode} returns.language - The detected language code
 * @returns {LanguageSource} returns.source - Where the language was detected from
 */
function detectLanguage(): { language: LocaleCode; source: LanguageSource } {
  // Priority 1: URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get("lang") as LocaleCode | null;
  if (langFromUrl && availableLocales.includes(langFromUrl)) {
    return { language: langFromUrl, source: "url" };
  }

  // Priority 2: localStorage
  const langFromStorage = localStorage.getItem(
    STORAGE_KEY,
  ) as LocaleCode | null;
  if (langFromStorage && availableLocales.includes(langFromStorage)) {
    return { language: langFromStorage, source: "localStorage" };
  }

  // Priority 3: HTML lang attribute
  const htmlElement = document.documentElement;
  const langFromHtml = htmlElement.getAttribute("lang");
  if (langFromHtml) {
    const normalizedLang = langFromHtml
      .substring(0, 2)
      .toLowerCase() as LocaleCode;
    if (availableLocales.includes(normalizedLang)) {
      return { language: normalizedLang, source: "html" };
    }
  }

  // Priority 4: Browser language
  const browserLang = (
    (window.navigator as Navigator & { userLanguage?: string }).userLanguage ||
    window.navigator.language
  )
    .substring(0, 2)
    .toLowerCase() as LocaleCode;
  if (availableLocales.includes(browserLang)) {
    return { language: browserLang, source: "browser" };
  }

  // Priority 5: Default
  return { language: defaultLanguage, source: "default" };
}

const detectedLanguage = detectLanguage();
let pageLanguage: LocaleCode = detectedLanguage.language;
let languageSource: LanguageSource = detectedLanguage.source;

// ============================================================================
// URL & Storage Management
// ============================================================================

/**
 * Updates the URL with the current language without page reload
 */
/**
 * Updates the URL with the current language without page reload
 * @param {LocaleCode} language - Language code to set in URL
 * @returns {void}
 */
function updateUrlLanguage(language: LocaleCode): void {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url.toString());
  console.log("✅ URL updated with lang:", language);
}

/**
 * Saves language preference to localStorage for persistence
 * @param {LocaleCode} language - Language code to save
 * @returns {void}
 */
function saveLanguagePreference(language: LocaleCode): void {
  localStorage.setItem(STORAGE_KEY, language);
  console.log("✅ Language saved to localStorage:", language);
}

/**
 * Removes language from URL and localStorage
 * Reverts to automatic language detection
 * @returns {void}
 */
function clearLanguagePreference(): void {
  localStorage.removeItem(STORAGE_KEY);
  const url = new URL(window.location.href);
  url.searchParams.delete("lang");
  window.history.replaceState({}, "", url.toString());
}

// ============================================================================
// Dynamic Import Map for JSON Files
// ============================================================================

const localeImportMap: Record<
  LocaleCode,
  Record<Namespace, () => Promise<{ default: unknown }>>
> = {
  en: {
    common: () => import("@locales/en/common.json"),
    home: () => import("@locales/en/home.json"),
    shipper: () => import("@locales/en/shipper.json"),
    carrier: () => import("@locales/en/carrier.json"),
  },
  de: {
    common: () => import("@locales/de/common.json"),
    home: () => import("@locales/de/home.json"),
    shipper: () => import("@locales/de/shipper.json"),
    carrier: () => import("@locales/de/carrier.json"),
  },
  fr: {
    common: () => import("@locales/fr/common.json"),
    home: () => import("@locales/fr/home.json"),
    shipper: () => import("@locales/fr/shipper.json"),
    carrier: () => import("@locales/fr/carrier.json"),
  },
  nl: {
    common: () => import("@locales/nl/common.json"),
    home: () => import("@locales/nl/home.json"),
    shipper: () => import("@locales/nl/shipper.json"),
    carrier: () => import("@locales/nl/carrier.json"),
  },
};

// ============================================================================
// Core Functions
// ============================================================================

async function loadNamespace(
  locale: LocaleCode,
  namespace: Namespace,
): Promise<TranslationObject> {
  try {
    const importFn = localeImportMap[locale]?.[namespace];
    if (!importFn) {
      throw new Error(`No import function for ${locale}/${namespace}`);
    }
    const module = await importFn();
    return (module.default || module) as TranslationObject;
  } catch (err) {
    console.warn(
      `Failed to load namespace ${namespace} for locale ${locale}:`,
      err,
    );

    if (locale !== defaultLanguage) {
      return loadNamespace(defaultLanguage, namespace);
    }
    return {} as TranslationObject;
  }
}

async function loadLocaleFile(
  locale: LocaleCode,
  useCache: boolean = true,
): Promise<NamespacedTranslations> {
  if (useCache && translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    const namespacePromises = translationNamespaces.map(async (namespace) => {
      const translations = await loadNamespace(locale, namespace);
      return { namespace, translations };
    });

    const results = await Promise.all(namespacePromises);

    const combinedTranslations: NamespacedTranslations = {};
    results.forEach(({ namespace, translations }) => {
      combinedTranslations[namespace] = translations;
    });

    translationCache.set(locale, combinedTranslations);
    return combinedTranslations;
  } catch (err) {
    console.error(`Error loading locale ${locale}:`, err);
    if (locale !== defaultLanguage) {
      return loadLocaleFile(defaultLanguage, useCache);
    }
    throw err;
  }
}

async function loadSingleNamespace(
  locale: LocaleCode,
  namespace: Namespace,
): Promise<TranslationObject> {
  if (translationCache.has(locale)) {
    const cached = translationCache.get(locale)!;
    if (cached[namespace]) {
      return cached[namespace];
    }
  }

  const translations = await loadNamespace(locale, namespace);

  if (!translationCache.has(locale)) {
    translationCache.set(locale, {});
  }
  translationCache.get(locale)![namespace] = translations;

  return translations;
}

function getNestedTranslation(
  key: string,
  json: NamespacedTranslations,
): string | null {
  let result: unknown = json;
  const keys = key.split(".");

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return null;
    }
  }

  return typeof result === "string" ? result : null;
}

function processVariables(text: string, element: HTMLElement): string {
  const variables = text.match(/{(.*?)}/g);
  if (!variables) return text;

  let processedText = text;

  variables.forEach((variable) => {
    const varName = variable.slice(1, -1);

    Object.entries(element.dataset).forEach(([key, value]) => {
      if (key === varName && value) {
        try {
          processedText = processedText.replace(
            variable,
            new Function(`return (${value})`)() as string,
          );
        } catch {
          processedText = processedText.replace(variable, value);
        }
      }
    });
  });

  return processedText;
}

async function translatePage(): Promise<void> {
  try {
    const json = await loadLocaleFile(pageLanguage);
    const elements = document.querySelectorAll<HTMLElement>("[data-i18n]");

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (!key) return;

      let text = getNestedTranslation(key, json);
      if (!text) {
        console.warn(`Translation key not found: ${key}`);
        return;
      }

      text = processVariables(text, element);
      element.innerHTML = text;
    });

    document.documentElement.setAttribute("lang", pageLanguage);
    updateLanguageSelectors();

    console.log(
      `✅ Page translated to: ${pageLanguage} (source: ${languageSource})`,
    );
  } catch (error) {
    console.error("❌ Translation error:", error);
  }
}

async function changeLanguage(
  newLanguage: LocaleCode,
  updateUrl: boolean = true,
  savePreference: boolean = true,
): Promise<void> {
  if (!availableLocales.includes(newLanguage)) {
    console.error(`Language ${newLanguage} is not supported`);
    return;
  }

  console.log(`🔄 Changing language to: ${newLanguage}`);

  pageLanguage = newLanguage;
  languageSource = "manual";

  if (updateUrl) {
    updateUrlLanguage(newLanguage);
  }

  if (savePreference) {
    saveLanguagePreference(newLanguage);
  }

  await translatePage();
}

async function redetectLanguage(): Promise<void> {
  const detected = detectLanguage();
  pageLanguage = detected.language;
  languageSource = detected.source;
  await translatePage();
}

function getLanguageInfo(): { language: LocaleCode; source: LanguageSource } {
  return { language: pageLanguage, source: languageSource };
}

function clearCache(locale?: LocaleCode): void {
  if (locale) {
    translationCache.delete(locale);
  } else {
    translationCache.clear();
  }
}

async function t(
  key: string,
  variables?: Record<string, string>,
): Promise<string> {
  const json = await loadLocaleFile(pageLanguage);
  let text = getNestedTranslation(key, json);

  if (!text) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  if (variables) {
    Object.entries(variables).forEach(([varKey, value]) => {
      text = text!.replace(new RegExp(`{${varKey}}`, "g"), value);
    });
  }

  return text;
}

// ============================================================================
// Language Selector
// ============================================================================

function createLanguageSelector(
  container: HTMLElement | string,
  options?: {
    showFlags?: boolean;
    className?: string;
  },
): HTMLSelectElement {
  const containerEl =
    typeof container === "string"
      ? document.querySelector<HTMLElement>(container)
      : container;

  if (!containerEl) {
    throw new Error("Container element not found");
  }

  const select = document.createElement("select");
  select.className = options?.className || "language-selector";

  availableLocales.forEach((locale) => {
    const option = document.createElement("option");
    option.value = locale;
    option.textContent = localeNames[locale];
    if (locale === pageLanguage) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    changeLanguage(target.value as LocaleCode);
  });

  containerEl.appendChild(select);
  return select;
}

function updateLanguageSelectors(): void {
  const selectors = document.querySelectorAll<HTMLSelectElement>(
    ".language-selector, [data-language-selector]",
  );

  console.log(`🔄 Updating ${selectors.length} language selector(s)`);

  selectors.forEach((selector) => {
    if (selector.value !== pageLanguage) {
      selector.value = pageLanguage;
    }
  });
}

/**
 * Attaches event listeners to all language selectors
 */
function attachLanguageSelectorListeners(): void {
  const selectors =
    document.querySelectorAll<HTMLSelectElement>(".language-selector");

  console.log(`🔗 Attaching listeners to ${selectors.length} selector(s)`);

  selectors.forEach((selector) => {
    // Remove existing listener if any
    const newSelector = selector.cloneNode(true) as HTMLSelectElement;
    selector.parentNode?.replaceChild(newSelector, selector);

    // Add fresh listener
    newSelector.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      console.log(`📍 Selector changed to: ${target.value}`);
      changeLanguage(target.value as LocaleCode);
    });

    // Set current value
    newSelector.value = pageLanguage;
  });
}

function initLanguageSelectors(): void {
  const containers = document.querySelectorAll<HTMLElement>(
    "[data-language-selector]",
  );

  containers.forEach((container) => {
    if (!container.querySelector("select")) {
      const className =
        container.dataset.languageSelector || "language-selector";
      createLanguageSelector(container, { className });
    }
  });

  // Attach listeners to all selectors (including manually created ones)
  attachLanguageSelectorListeners();
}

// ============================================================================
// Initialization
// ============================================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    translatePage();
    initLanguageSelectors();
  });
} else {
  translatePage();
  initLanguageSelectors();
}

// ============================================================================
// Exports
// ============================================================================

export {
  translatePage,
  loadLocaleFile,
  loadSingleNamespace,
  changeLanguage,
  redetectLanguage,
  getLanguageInfo,
  clearCache,
  detectLanguage,
  t,
  createLanguageSelector,
  updateLanguageSelectors,
  initLanguageSelectors,
  attachLanguageSelectorListeners,
  updateUrlLanguage,
  saveLanguagePreference,
  clearLanguagePreference,
  pageLanguage,
  languageSource,
  availableLocales,
  localeNames,
  translationNamespaces,
};

export type {
  LocaleCode,
  Namespace,
  TranslationObject,
  NamespacedTranslations,
  LanguageSource,
};
