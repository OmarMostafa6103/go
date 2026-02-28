# Translation Guide for GoLynk Website

This document explains the i18n (internationalization) system and how to add or update translations.

## Project Structure

```
src/locales/
├── en/              # English translations
│   ├── common.json
│   ├── home.json
│   ├── shipper.json
│   ├── carrier.json
│   ├── faq.json
│   ├── about.json
│   ├── footer.json
│   ├── get-started.json
│   ├── corridor.json
│   ├── privacy.json
│   ├── cookies.json
│   ├── terms.json
│   ├── imprint.json
│   ├── investor.json
│   ├── careers.json
│   ├── jobs.json
│   └── apply.json
└── de/              # German (Deutsch) translations
    ├── common.json
    ├── home.json
    ├── shipper.json
    ├── carrier.json
    ├── faq.json
    ├── about.json
    ├── footer.json
    ├── get-started.json
    ├── corridor.json
    ├── privacy.json
    ├── cookies.json
    ├── terms.json
    ├── imprint.json
    ├── investor.json
    ├── careers.json
    ├── jobs.json
    └── apply.json
```

## Available Namespaces

| Namespace       | Purpose                                                | Files                |
| --------------- | ------------------------------------------------------ | -------------------- |
| **common**      | Global UI elements (navigation, footer, CTAs, buttons) | Used by: All pages   |
| **home**        | Homepage specific content                              | `index.html`         |
| **shipper**     | Shipper/e-commerce features                            | `shipper.html`       |
| **carrier**     | Carrier/logistics features                             | `carrier.html`       |
| **faq**         | Frequently asked questions                             | `faq.html`           |
| **about**       | About page content                                     | `about.html`         |
| **footer**      | Footer sections (legacy)                               | Footer in all pages  |
| **get-started** | Get started page                                       | `get-started.html`   |
| **corridor**    | Corridor features                                      | `corridor.html`      |
| **privacy**     | Privacy policy                                         | `privacy.html`       |
| **cookies**     | Cookie policy                                          | `cookies.html`       |
| **terms**       | Terms of service                                       | `terms.html`         |
| **imprint**     | Legal imprint/company info                             | `imprint.html`       |
| **investor**    | Investor relations                                     | Investor pages       |
| **careers**     | Careers page content                                   | `careers.html`       |
| **jobs**        | Job listings                                           | Job listing pages    |
| **apply**       | Job application form                                   | `careers/apply.html` |

## Using i18n in HTML

### Basic Text Translation

```html
<!-- Simple text element -->
<h1 data-i18n="common.footer.sections.company.title">Company</h1>
```

### Form Placeholders

```html
<!-- Input placeholder -->
<input
  placeholder="Enter your email"
  data-i18n-placeholder="common.footer.newsletter.placeholder"
/>

<!-- Textarea placeholder -->
<textarea
  placeholder="Your message..."
  data-i18n-placeholder="apply.form.additionalInfo.placeholder"
></textarea>
```

### Meta Tags (Page Title & Description)

```html
<!-- Page title in <head> -->
<title data-i18n="apply.meta.title">Apply for a Role at GoLynk</title>

<!-- Page description in <head> -->
<meta
  name="description"
  data-i18n-content="apply.meta.description"
  content="Default description text"
/>
```

### Image Alt Text (for accessibility)

```html
<img src="image.svg" data-i18n-alt="common.footer.logo" alt="GoLynk Logo" />
```

## Apply Page Translation Structure

The apply page uses the `apply` namespace with the following structure:

### Metadata

```json
{
  "meta": {
    "title": "Apply for a Role at GoLynk",
    "description": "Submit your application..."
  }
}
```

### Default Placeholders

```json
{
  "defaultJobTitle": "Submit Your Application",
  "defaultJobLocation": "Thank you for your interest in GoLynk"
}
```

### Form Fields

```json
{
  "form": {
    "fullName": {
      "label": "Full name",
      "placeholder": "Your full name"
    },
    "email": {
      "label": "Email address",
      "placeholder": "your@email.com"
    },
    "phone": {
      "label": "Phone number",
      "placeholder": "+43 XXX XXX"
    },
    "locationPreference": {
      "label": "Location preference",
      "select": "Select location",
      "aachen": "Aachen (On-site)",
      "remote": "Remote"
    },
    "resume": {
      "label": "CV or Resume",
      "dragDrop": "Drag and drop your file",
      "format": "PDF, DOC, DOCX or TXT"
    },
    "coverLetter": {
      "label": "Cover letter",
      "placeholder": "Tell us why you're a great fit..."
    },
    "experience": {
      "label": "Years of experience",
      "select": "Select experience level",
      "junior": "0-2 years",
      "mid": "2-5 years",
      "senior": "5-10 years",
      "lead": "10+ years"
    },
    "additionalInfo": {
      "label": "Additional information",
      "placeholder": "Anything else you'd like us to know?"
    },
    "submit": "Submit Application",
    "legal": "By submitting this application, you consent to..."
  }
}
```

### Success Messages

```json
{
  "success": {
    "heading": "Application submitted!",
    "description": "Thank you for applying...",
    "backToJobs": "Back to job listings"
  }
}
```

## Translation Checklist

When translating the apply page:

### Form Labels (8 fields)

- [ ] Full name label
- [ ] Email address label
- [ ] Phone number label
- [ ] Location preference label
- [ ] Resume/CV label
- [ ] Cover letter label
- [ ] Years of experience label
- [ ] Additional information label

### Form Placeholders (6 fields)

- [ ] Full name placeholder
- [ ] Email placeholder
- [ ] Phone placeholder
- [ ] Cover letter placeholder
- [ ] Additional info placeholder
- [ ] Newsletter email placeholder (in common.json)

### Form Selectors (10 options)

- [ ] Location preference: "Select location"
- [ ] Location: "Aachen (On-site)"
- [ ] Location: "Remote"
- [ ] Experience: "Select experience level"
- [ ] Experience: "0-2 years"
- [ ] Experience: "2-5 years"
- [ ] Experience: "5-10 years"
- [ ] Experience: "10+ years"
- [ ] Resume format text
- [ ] Resume drag-drop text

### Buttons & Messages (5 items)

- [ ] Submit button text
- [ ] Legal consent text
- [ ] Success heading
- [ ] Success description
- [ ] Back to jobs link

### Meta Tags (2 items)

- [ ] Page title
- [ ] Page description

### Footer (uses common.json - 25+ items across footer sections)

- [ ] Company section (6 links)
- [ ] Shippers section (4 links)
- [ ] Carriers section (3 links)
- [ ] Developers section (2 links)
- [ ] Legal section (4 links)
- [ ] Newsletter section
- [ ] CTAs section
- [ ] Navigation items
- [ ] Tagline & copyright

## Common Patterns

### Nested Keys

Keys can be nested multiple levels deep. Access them with dot notation:

```
apply.form.locationPreference.aachen
common.footer.sections.company.links.about
```

### Array Values

Use array indices when needed:

```json
"items": [
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." }
]
```

### Variable Replacement

Some strings may include variables (these are handled in JavaScript):

```json
{
  "greeting": "Welcome, {name}!"
}
```

## Adding New Translations

1. **Create/Update JSON File**
   - Add or modify `src/locales/en/[namespace].json`
   - Add corresponding keys to `src/locales/de/[namespace].json`

2. **Update i18n TypeScript**
   - If creating a new namespace, add it to the `Namespace` type in `src/js/utils/i18n.ts`
   - Add the namespace to the `translationNamespaces` array
   - Add dynamic imports to `localeImportMap` for both en and de

3. **Add to HTML**
   - Use `data-i18n="namespace.key"` for text content
   - Use `data-i18n-placeholder="namespace.key"` for input placeholders
   - Use `data-i18n-content="namespace.key"` for attribute values
   - Use `data-i18n-alt="namespace.key"` for image alt text

4. **Test**
   - Test with language switcher
   - Verify both English and German display correctly
   - Check that placeholders and labels update properly

## Language Support

Currently supported languages:

- **English (en)** - Default language
- **Deutsch (de)** - German

Language detection priority:

1. URL parameter: `?lang=de`
2. localStorage: Saved user preference
3. HTML `lang` attribute
4. Browser language
5. Default (English)

## JavaScript i18n System

The i18n system is defined in `src/js/utils/i18n.ts` and provides:

### Key Functions

```typescript
// Get translated string
const text = window.i18n?.t?.("common.footer.copyright");

// Get available locales
const locales = window.i18n?.availableLocales;

// Change language
window.i18n?.setLanguage("de");

// Get current language
const current = window.i18n?.currentLanguage;
```

### Automatic DOM Updates

The system automatically handles:

- `data-i18n` attributes: Sets `textContent`
- `data-i18n-placeholder` attributes: Sets `placeholder`
- `data-i18n-content` attributes: Sets attribute content (meta, etc.)
- `data-i18n-alt` attributes: Sets `alt` text

## Common Mistakes to Avoid

❌ **Don't:**

- Use hardcoded text in HTML instead of i18n keys
- Create new namespaces without registering them in i18n.ts
- Forget to add translations to both en and de JSON files
- Use inconsistent key naming (use camelCase)
- Mix translation systems (stick to data-i18n attributes)

✅ **Do:**

- Use consistent key structure across all translations
- Keep English and German key structures identical
- Test with both languages
- Document new namespaces in this guide
- Use meaningful, descriptive key names

## File Size References

- `common.json`: ~4-5 KB (used by all pages)
- `apply.json`: ~2 KB (job application form)
- All JSON files combined: ~50-60 KB
- Compressed (gzip): ~15-20 KB (for modern browsers)

## Support & Updates

To update this guide:

1. Edit this file when adding new namespaces
2. Update the structure section when adding translations
3. Keep the checklist current with new features
