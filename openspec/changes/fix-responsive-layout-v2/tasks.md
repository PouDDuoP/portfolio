# Tasks: Fix Responsive Layout V2

## Phase 1: Core Implementation

- [x] 1.1 **Hero.css**: Delete lines 293-303 (old `@media (max-width: 480px)` block)
- [x] 1.2 **Hero.css**: Add new `@media (max-width: 640px)` breakpoint after line 291 with `.hero__actions { flex-direction: column; align-items: center; }` and `.hero__actions .btn { width: 100%; max-width: 280px; }`
- [x] 1.3 **Contact.css**: Remove `justify-items: center;` from `.contact__cards` (line 31)
- [x] 1.4 **Contact.css**: Add `align-items: start;` to `.contact__cards` rule after `margin-bottom: var(--space-2xl);`

## Phase 2: Verification

- [ ] 2.1 **Visual test**: Verify hero buttons stack vertically at 585px viewport width
- [ ] 2.2 **Visual test**: Verify contact cards align to top of grid at 1024px+ regardless of content height
- [ ] 2.3 **Regression test**: Verify existing 768px breakpoint still switches layout to 1-column at 767px
- [ ] 2.4 **Accessibility**: Run axe DevTools to confirm WCAG 2.2 AA compliance maintained
- [ ] 2.5 **Regression**: Verify no horizontal overflow on screen sizes ≥ 375px
