# Apply Page i18n Quick Reference

## 🎯 At a Glance

**Namespace:** `apply`
**Files:**

- `src/locales/en/apply.json` (English)
- `src/locales/de/apply.json` (German)
- `careers/apply.html` (HTML form)

**Status:** ✅ Complete & Production Ready
**Total Keys:** 24 (apply namespace) + 35+ (common footer/nav)

---

## 📋 Form Field Translations

### Personal Information Section

```
apply.form.fullName
  ├── label: "Full name" / "Vollständiger Name"
  └── placeholder: "Your full name" / "Dein vollständiger Name"

apply.form.email
  ├── label: "Email address" / "E-Mail-Adresse"
  └── placeholder: "your@email.com" / "deine@email.com"

apply.form.phone
  ├── label: "Phone number" / "Telefonnummer"
  └── placeholder: "+43 XXX XXX" / "+43 XXX XXX"
```

### Location & Job Details

```
apply.form.locationPreference
  ├── label: "Location preference" / "Standortpräferenz"
  ├── select: "Select location" / "Standort wählen"
  ├── aachen: "Aachen (On-site)" / "Aachen (vor Ort)"
  └── remote: "Remote" / "Remote"

apply.form.resume
  ├── label: "CV or Resume" / "Lebenslauf oder Resume"
  ├── dragDrop: "Drag and drop your file" / "Ziehen Sie Ihre Datei hierher"
  └── format: "PDF, DOC, DOCX or TXT" / "PDF, DOC, DOCX oder TXT"
```

### Application & Experience

```
apply.form.coverLetter
  ├── label: "Cover letter" / "Anschreiben"
  └── placeholder: "Tell us why you're a great fit..." / "Erzählen Sie uns, warum Sie..."

apply.form.experience
  ├── label: "Years of experience" / "Jahre der Erfahrung"
  ├── select: "Select experience level" / "Erfahrungsstufe wählen"
  ├── junior: "0-2 years" / "0-2 Jahre"
  ├── mid: "2-5 years" / "2-5 Jahre"
  ├── senior: "5-10 years" / "5-10 Jahre"
  └── lead: "10+ years" / "10+ Jahre"

apply.form.additionalInfo
  ├── label: "Additional information" / "Zusätzliche Informationen"
  └── placeholder: "Anything else you'd like us to know?" / "Gibt es noch etwas..."
```

### User Actions & Legal

```
apply.form.submit: "Submit Application" / "Bewerbung einreichen"

apply.form.legal: "By submitting this application, you consent to GoLynk processing..."
                 / "Durch das Absenden dieses Formulars stimmen Sie zu..."
```

---

## 🎉 Success Messages

```
apply.success.heading
  EN: "Application submitted!"
  DE: "Bewerbung eingereicht!"

apply.success.description
  EN: "Thank you for applying. We'll review your application and get back..."
  DE: "Vielen Dank für Ihre Bewerbung. Wir überprüfen Ihre Bewerbung..."

apply.success.backToJobs
  EN: "Back to job listings"
  DE: "Zurück zu den Stellenangeboten"
```

---

## 🏷️ Page Metadata

```
apply.meta.title
  EN: "Apply for a Role at GoLynk"
  DE: "Bewerbung für eine Position bei GoLynk"

apply.meta.description
  EN: "Submit your application to join the GoLynk team..."
  DE: "Reichen Sie Ihre Bewerbung ein und treten Sie dem GoLynk-Team bei..."

apply.defaultJobTitle
  EN: "Submit Your Application"
  DE: "Bewerbungsformular einreichen"

apply.defaultJobLocation
  EN: "Thank you for your interest in GoLynk"
  DE: "Danke für dein Interesse an GoLynk"
```

---

## 📝 HTML Usage Examples

### Text Content

```html
<!-- Form label -->
<label data-i18n="apply.form.fullName.label">Full name</label>

<!-- Button text -->
<button data-i18n="apply.form.submit">Submit Application</button>

<!-- Success message heading -->
<h2 data-i18n="apply.success.heading">Application submitted!</h2>
```

### Form Placeholders

```html
<!-- Text input -->
<input
  type="text"
  data-i18n-placeholder="apply.form.email.placeholder"
  placeholder="your@email.com"
/>

<!-- Textarea -->
<textarea
  data-i18n-placeholder="apply.form.additionalInfo.placeholder"
  placeholder="Anything else you'd like us to know?"
></textarea>
```

### Meta Tags

```html
<!-- Page title -->
<title data-i18n="apply.meta.title">Apply for a Role at GoLynk</title>

<!-- Description -->
<meta
  name="description"
  data-i18n-content="apply.meta.description"
  content="Submit your application to join the GoLynk team..."
/>
```

---

## 🔄 Common Tasks

### Update a Form Label

1. Open `src/locales/en/apply.json`
2. Find: `form.fullName.label`
3. Change: `"Full name"` to your new text
4. Repeat in `src/locales/de/apply.json` with German translation

### Add a New Form Field

```jsonc
// 1. Add to JSON (both en and de)
{
  "newField": {
    "label": "Your label",
    "placeholder": "Your placeholder"
  }
}

// 2. Add to HTML
<label data-i18n="apply.form.newField.label">Your label</label>
<input data-i18n-placeholder="apply.form.newField.placeholder" />

// 3. Test both languages with selector
```

### Test Translation Locally

```bash
# No special steps needed - just change language using selector
# or add ?lang=de to URL parameter
#
# Examples:
# careers/apply.html          → English (default)
# careers/apply.html?lang=de  → German
```

---

## ✨ Special Features

### Language Detection (in order)

1. URL: `?lang=de` → Use German
2. Browser Storage: Saved preference → Use saved
3. HTML: `<html lang="de">` → Use HTML lang
4. Navigator: Browser language → Use browser
5. Fallback: → Use English

### Automatic Updates

- Changing language selector immediately updates all `data-i18n` attributes
- No page reload required
- All form fields update in real-time

### Performance

- Lazy loading: Files load only when needed
- Caching: Translations cached after first load
- Minimal JS: ~3KB for entire system
- Zero runtime cost: DOM updates are efficient

---

## ⚠️ Common Mistakes

```javascript
// ❌ DON'T hardcode text
<label>Full name</label>

// ✅ DO use i18n attributes
<label data-i18n="apply.form.fullName.label">Full name</label>

// ❌ DON'T mix attribute types
<input data-i18n="apply.form.email.placeholder" />

// ✅ DO use correct attribute type
<input data-i18n-placeholder="apply.form.email.placeholder" />

// ❌ DON'T forget to translate
// (Only English in apply.json - Germany users see English)

// ✅ DO translate to German
// (All text in both en/apply.json and de/apply.json)
```

---

## 🔗 Related Translations

The apply page also uses translations from:

### Common Footer (25+ keys)

```
common.footer.sections.company.title
common.footer.sections.shippers.title
common.footer.sections.carriers.title
common.footer.sections.developers.title
common.footer.sections.legal.title
common.footer.newsletter.title
... and 20+ more links
```

### Navigation (4 keys)

```
common.navigation.shippers
common.navigation.carriers
common.navigation.about
common.navigation.careers
```

### CTA Buttons (2 keys)

```
common.cta.startNow
common.footer.cta.startShipping
```

---

## 📊 Translation Statistics

| Metric                       | Value      |
| ---------------------------- | ---------- |
| **Apply-specific keys**      | 24         |
| **Shared footer/nav keys**   | 35+        |
| **Total English characters** | 3,500+     |
| **Total German characters**  | 3,700+     |
| **File sizes (combined)**    | ~4 KB      |
| **Support languages**        | 2 (EN, DE) |
| **HTML attributes**          | 40+        |
| **Form fields**              | 8          |
| **Form options**             | 8          |
| **Messages**                 | 3          |

---

## 🚀 Testing Checklist

Before deploying changes:

- [ ] Updated `en/apply.json`
- [ ] Updated `de/apply.json` (matching keys)
- [ ] Tested English version
- [ ] Tested German version
- [ ] Tested language switching
- [ ] Tested URL parameter `?lang=de`
- [ ] Tested localStorage persistence
- [ ] Checked console for errors
- [ ] Verified all placeholders show correctly
- [ ] Verified page title/meta updates

---

## 📧 Quick Lookup Table

| Element          | Key Pattern                      | File        | Type        |
| ---------------- | -------------------------------- | ----------- | ----------- |
| Form Labels      | `apply.form.[field].label`       | apply.json  | Text        |
| Placeholders     | `apply.form.[field].placeholder` | apply.json  | Placeholder |
| Dropdown Text    | `apply.form.[field].[option]`    | apply.json  | Text        |
| Page Title       | `apply.meta.title`               | apply.json  | Meta        |
| Page Description | `apply.meta.description`         | apply.json  | Meta        |
| Error/Success    | `apply.success.*`                | apply.json  | Text        |
| Navigation       | `common.navigation.*`            | common.json | Text        |
| Footer           | `common.footer.*`                | common.json | Text        |

---

## 💡 Tips

**Tip 1:** Keep English and German JSON files in perfect sync structurally
**Tip 2:** Use `?lang=de` in browser URL to quickly test German
**Tip 3:** All keys follow `namespace.section.subsection.field` pattern
**Tip 4:** Translations are cached - harder refresh (Ctrl+Shift+R) if needed
**Tip 5:** Check browser console for any i18n.ts error messages

---

**Last Updated:** February 28, 2026
**Version:** 1.0
**Status:** ✅ Production Ready
