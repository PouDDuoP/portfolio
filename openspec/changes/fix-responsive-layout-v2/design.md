# Design: Fix Responsive Layout V2

## Technical Approach

Precision CSS-only fixes for two responsive issues: (1) hero button stacking breakpoint moved from 480px to 640px to cover large mobile and small tablet portrait views, (2) contact card vertical alignment fixed by replacing ineffective `justify-items: center` with `align-items: start`.

## Architecture Decisions

| Decision | Option | Tradeoff | Decision |
|----------|--------|----------|----------|
| Hero breakpoint | 480px (current) | Buttons don't stack at 585px where horizontal layout fails | |
| | **640px** | Covers large mobile + small tablet portrait; landscape tablets at 768px+ | ✅ |
| Contact grid alignment | `justify-items: center` (current) | Nullified by `width: 100%` on cards; vertical misalignment | |
| | `align-items: start` | Cards align to top regardless of content height variance | ✅ |

### Decision 1: Breakpoint Change (Hero.css)

**Choice**: Replace `@media (max-width: 480px)` with `@media (max-width: 640px)`
**Alternatives considered**: Keep 480px (buttons break at 585px), use 585px (non-standard), use 768px (affects tablet landscape unnecessarily)
**Rationale**: 640px covers "large mobile" (414px-480px) and "small tablet portrait" (600px-640px) where horizontal button layout fails. The 480px breakpoint was insufficient—devices at 585px still show broken horizontal buttons.

### Decision 2: Contact Grid Alignment (Contact.css)

**Choice**: Remove `justify-items: center`, add `align-items: start` to `.contact__cards`
**Alternatives considered**: Keep `justify-items: center` (ineffective with `width: 100%`), `align-items: stretch` (doesn't fix content misalignment), JavaScript equal-height (overkill)
**Rationale**: `justify-items: center` is nullified by `width: 100%` on `.contact__card` (line 46). `align-items: start` aligns cards to top of grid cells, fixing visual inconsistency when cards have different content heights (email has copy button, GitHub/LinkedIn don't).

## Data Flow

No data flow changes. CSS presentation layer only.

```
Browser Viewport ──→ CSS Media Queries ──→ Layout Applied
                    (640px, 768px, 1024px)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `my-app/src/components/sections/Hero.css` | Modify | Delete lines 293-303 (old 480px media query), add new `@media (max-width: 640px)` block with same button styling |
| `my-app/src/components/sections/Contact.css` | Modify | Line 31: Remove `justify-items: center;`, add `align-items: start;` to `.contact__cards` rule |

## Interfaces / Contracts

No interface changes. CSS-only modifications.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | Hero buttons stack vertically at 585px and below | DevTools responsive mode at 375px, 414px, 585px, 640px |
| Visual | Contact cards align to top on desktop (1024px+) | Visual inspection at 1024px, 1280px |
| Accessibility | WCAG 2.2 AA compliance maintained | axe DevTools / WAVE evaluation |
| Regression | Existing 768px breakpoint behavior unchanged | Compare rendering at 768px, 1024px before/after |

## Migration / Rollout

No migration required. CSS changes take effect immediately upon deployment.

## Open Questions

- [ ] Consider adding a comment at 640px breakpoint explaining rationale for future maintainability
