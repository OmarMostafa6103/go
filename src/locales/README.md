# i18n Documentation Index

## 📚 Documentation Files Created for Apply Page Internationalization

All files are located in: `src/locales/`

---

## 1. **TRANSLATION_GUIDE.md** - Comprehensive Translation Guide

**Best for:** Developers and translators setting up new translations

**Contains:**

- Project structure overview
- Complete namespace reference table
- How to use i18n in HTML (data-i18n attributes)
- Apply page translation structure breakdown
- Full translation checklist (25+ items)
- Common patterns and anti-patterns
- Step-by-step guide for adding new translations
- Language support & priority detection
- JavaScript i18n system API reference

**Key Sections:**

- Supported Namespaces (17 total)
- Using i18n in HTML (4 attribute types)
- Apply Page Translation Structure
- Translation Checklist
- Adding New Translations
- Support & Updates

**When to Use:**

- Setting up translations for a new page
- Understanding the full i18n system
- Training new team members
- Adding a new language

---

## 2. **APPLY_PAGE_STRUCTURE.json** - Technical Reference Document

**Best for:** Quick technical lookup and reference

**Contains:**

- Namespace overview for apply
- Section breakdown with descriptions
- Usage examples in JSON format
- Sections breakdown (form labels, placeholders, etc.)
- Quality checklist for translations
- Integration points with other namespaces
- Performance metrics
- File size references

**Format:** JSON with detailed metadata and comments

**When to Use:**

- Understanding apply namespace structure
- Verifying key names
- Performance planning
- Code review of translations

---

## 3. **APPLY_IMPLEMENTATION.md** - Status & Verification Checklist

**Best for:** Project managers and QA teams

**Contains:**

- Complete implementation status ✅
- File structure diagram with checkmarks
- Detailed translations audit (57 keys listed)
- Language support matrix
- i18n system setup verification
- All attribute types used (data-i18n variations)
- Browser language detection priority
- Testing checklist (15+ items)
- Performance metrics
- Common issues & solutions
- Sign-off and production readiness status

**Key Sections:**

- ✅ Implementation Status: COMPLETE
- File Structure Checklist
- Translations Audit
- Testing Checklist (functionality, forms, edge cases)
- Future Enhancements
- Support & Maintenance

**When to Use:**

- Before deploying to production
- During QA testing
- Reporting project status
- Troubleshooting issues

---

## 4. **APPLY_QUICK_REFERENCE.md** - Cheat Sheet for Developers

**Best for:** Daily development and quick lookups

**Contains:**

- At-a-glance status and file locations
- Form field translations organized by section
- Success messages
- Page metadata
- HTML usage examples
- Common tasks with code snippets
- Quick lookup table
- Translation statistics
- Testing checklist (10 items)
- Tips and tricks

**Format:** Concise with tables and organized sections

**When to Use:**

- While coding the apply form
- Quick translation reference
- Updating specific fields
- Copy-pasting examples

---

## 5. **TRANSLATION_EN_DE_COMPARISON.md** - Side-by-Side Translation View

**Best for:** Translation review and quality assurance

**Contains:**

- Every English → German translation pair
- Translation notes explaining decisions
- Character count comparison (EN vs DE)
- Cultural/linguistic considerations
- Quality checklist for reviewers
- Common terms reference table
- Language-specific guidance

**Format:** Highly readable side-by-side comparison with context

**When to Use:**

- Reviewing translations for accuracy
- Hiring/training translators
- Translation validation
- Adding new languages
- Understanding translation decisions

---

## 6. **APPLY_IMPLEMENTATION.md** (This File) - Navigation Index

**Best for:** Understanding what documentation exists\*\*

**Contains:**

- All 6 documentation files listed
- Purpose and use case for each
- Key sections in each document
- Recommendation on when to use each

---

## Documentation Usage Guide

### For Project Managers

1. **First:** Read APPLY_IMPLEMENTATION.md (status & checklist)
2. **Then:** Use testing checklist before deployment
3. **Reference:** Return to TRANSLATION_GUIDE.md when adding features

### For Developers Adding Features

1. **First:** Read APPLY_QUICK_REFERENCE.md (quick lookup)
2. **Then:** Check TRANSLATION_EN_DE_COMPARISON.md (translation examples)
3. **Reference:** Return to TRANSLATION_GUIDE.md when stuck

### For Translators (New Language)

1. **First:** Read TRANSLATION_GUIDE.md (complete overview)
2. **Then:** Study TRANSLATION_EN_DE_COMPARISON.md (patterns)
3. **Reference:** Follow APPLY_PAGE_STRUCTURE.json (exact keys needed)

### For QA/Testing

1. **First:** Read APPLY_IMPLEMENTATION.md (status overview)
2. **Then:** Use testing checklist section
3. **Reference:** Check APPLY_QUICK_REFERENCE.md during testing

### For New Team Members

1. **First:** Read TRANSLATION_GUIDE.md (complete system overview)
2. **Then:** Review APPLY_PAGE_STRUCTURE.json (apply page details)
3. **Then:** Read APPLY_QUICK_REFERENCE.md (daily reference)
4. **Reference:** Keep TRANSLATION_EN_DE_COMPARISON.md handy

---

## Quick Navigation

### By File Type

- **Guides:** TRANSLATION_GUIDE.md, APPLY_QUICK_REFERENCE.md
- **Reference:** APPLY_PAGE_STRUCTURE.json, TRANSLATION_EN_DE_COMPARISON.md
- **Checklists:** APPLY_IMPLEMENTATION.md
- **Examples:** TRANSLATION_GUIDE.md, APPLY_QUICK_REFERENCE.md

### By Topic

- **How to use i18n:** TRANSLATION_GUIDE.md
- **Apply page structure:** APPLY_PAGE_STRUCTURE.json
- **Translations status:** APPLY_IMPLEMENTATION.md
- **Daily coding:** APPLY_QUICK_REFERENCE.md
- **Translation pairs:** TRANSLATION_EN_DE_COMPARISON.md

### By Role

| Role       | Primary Doc     | Secondary Doc   | Reference       |
| ---------- | --------------- | --------------- | --------------- |
| Developer  | QUICK_REFERENCE | GUIDE           | COMPARISON      |
| Translator | COMPARISON      | GUIDE           | STRUCTURE       |
| PM/QA      | IMPLEMENTATION  | GUIDE           | QUICK_REFERENCE |
| New hire   | GUIDE           | QUICK_REFERENCE | COMPARISON      |

---

## File Locations in Project

```
src/locales/
│
├── en/
│   ├── apply.json (English translations)
│   ├── common.json (updated with developers section)
│   └── [14 other locale files]
│
├── de/
│   ├── apply.json (German translations)
│   ├── common.json (updated with developers section)
│   └── [14 other locale files]
│
├── 📄 TRANSLATION_GUIDE.md ........................ Comprehensive guide
├── 📋 APPLY_PAGE_STRUCTURE.json .................. Technical reference
├── ✅ APPLY_IMPLEMENTATION.md .................... Status & checklist
├── 🚀 APPLY_QUICK_REFERENCE.md .................. Daily cheat sheet
├── 🔄 TRANSLATION_EN_DE_COMPARISON.md .......... Side-by-side view
└── 📑 README.md ................................ This index
```

---

## Key Facts About Apply Page i18n

| Aspect            | Details                              |
| ----------------- | ------------------------------------ |
| **Namespace**     | `apply` + `common` (footer/nav)      |
| **Total Keys**    | 57 (24 apply + 33+ common)           |
| **Languages**     | English (en), German (de)            |
| **Files**         | 4 JSON files + 1 HTML file + i18n.ts |
| **Status**        | ✅ Complete & Production Ready       |
| **File Size**     | ~4KB (uncompressed), ~1KB (gzipped)  |
| **Last Updated**  | February 28, 2026                    |
| **Documentation** | 6 comprehensive guides               |

---

## Documentation Statistics

| Document                        | Type        | Length     | Key Sections      |
| ------------------------------- | ----------- | ---------- | ----------------- |
| TRANSLATION_GUIDE.md            | Guide       | 500+ lines | 10 major sections |
| APPLY_PAGE_STRUCTURE.json       | Reference   | 200+ lines | 8 sections        |
| APPLY_IMPLEMENTATION.md         | Checklist   | 400+ lines | 12 sections       |
| APPLY_QUICK_REFERENCE.md        | Cheat Sheet | 300+ lines | 15 sections       |
| TRANSLATION_EN_DE_COMPARISON.md | Comparison  | 350+ lines | 6 sections        |

---

## Getting Started Paths

### Path 1: I just want to add a new form field

```
1. Read: APPLY_QUICK_REFERENCE.md (10 min)
2. Find: The field structure example
3. Copy: The JSON structure
4. Add: To both en/apply.json and de/apply.json
5. Test: Using ?lang=de in URL
```

### Path 2: I need to understand the whole i18n system

```
1. Read: TRANSLATION_GUIDE.md (30 min)
2. Review: APPLY_PAGE_STRUCTURE.json (10 min)
3. Check: src/js/utils/i18n.ts (15 min)
4. Practice: Adding a test field (20 min)
```

### Path 3: I'm translating to a new language

```
1. Study: TRANSLATION_EN_DE_COMPARISON.md (20 min)
2. Review: TRANSLATION_GUIDE.md - "Adding New Translations" (15 min)
3. Create: New locale files following structure
4. Register: In i18n.ts
5. Test: With language selector
```

### Path 4: I'm reviewing for production

```
1. Check: APPLY_IMPLEMENTATION.md status (5 min)
2. Run: Testing checklist section (30 min)
3. Verify: All 57 keys exist in both languages (15 min)
4. Sign-off: Production ready ✅
```

---

## Troubleshooting Guide

**Q: Where do I find the apply form translations?**
A: `src/locales/en/apply.json` and `src/locales/de/apply.json`

**Q: How do I add a new language?**
A: See TRANSLATION_GUIDE.md → "Adding New Translations" section

**Q: What's the difference between data-i18n and data-i18n-placeholder?**
A: See TRANSLATION_GUIDE.md → "Using i18n in HTML" section

**Q: Why isn't my translation showing?**
A: See APPLY_IMPLEMENTATION.md → "Support & Maintenance" → "Common Issues"

**Q: What keys do I need to translate?**
A: See APPLY_PAGE_STRUCTURE.json or APPLY_QUICK_REFERENCE.md

**Q: How do I verify translations are complete?**
A: See APPLY_IMPLEMENTATION.md → "Translations Audit" section

---

## License & Maintenance

- **Created:** February 28, 2026
- **Maintained by:** GoLynk Development Team
- **Next Review:** When adding new language or major features
- **Update Frequency:** As new translations are added

---

## Additional Resources

- **Main i18n system:** `src/js/utils/i18n.ts`
- **Apply form HTML:** `careers/apply.html`
- **Project config:** `vite.config.ts` (build setup)
- **Navigation:** Look at `index.html` for more examples

---

**Navigation:** This index file helps you find the right documentation.
**Start here first**, then jump to specific documents based on your role.

✅ All documentation created and ready for use!
