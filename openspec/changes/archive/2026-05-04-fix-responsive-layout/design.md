# Design: Fix Responsive Layout

## Technical Approach

Implement targeted CSS fixes to resolve three responsive layout issues: contact cards alignment using CSS Grid's `justify-items` property, hero section mobile layout with a new 480px breakpoint using vertical flexbox stacking, and button overflow prevention through constrained widths. The approach maintains WCAG 2.2 AA compliance and preserves the bold frontend-design aesthetic.

## Architecture Decisions

### Decision: Contact Cards Centering

**Choice**: Add `justify-items: center` to `.contact__cards` grid container

**Alternatives considered**: Using `margin: 0 auto` on each `.contact__card` — rejected because it's less semantic for grid layout and requires individual card modifications.

**Rationale**: CSS Grid's `justify-items` property controls alignment of grid items within their cells. Currently, `.contact__cards` uses `display: grid` with `grid-template-columns: repeat(3, 1fr)`, and cards have `width: 100%` which makes them stretch to fill cells. However, the flex content inside cards (icon + text) appears left-aligned because the card itself is stretched, not centered. Adding `justify-items: center` will center each card within its grid cell while preserving the card's internal left-aligned content layout.

### Decision: Hero 480px Breakpoint

**Choice**: Add new media query `@media (max-width: 480px)` with vertical flexbox stacking

**Alternatives considered**: Using existing 768px breakpoint with more aggressive changes — rejected because 768px already handles tablet layout and mixing small mobile fixes there would complicate maintenance.

**Rationale**: Current breakpoints (768px, 1024px) don't cover small phones. The 480px threshold is where 3 buttons with `white-space: nowrap` and `padding: 1rem 2rem` (total ~554px with gaps) start to overflow. A dedicated breakpoint allows precise targeting of small mobile devices without affecting tablet layout. Implementation uses `flex-direction: column` on `.hero__actions` with `align-items: center` to stack buttons vertically and center them.

### Decision: Button Layout Strategy

**Choice**: Vertical stacking with `width: 100%; max-width: 280px` on buttons

**Alternatives considered**: Icon-only buttons with tooltips — rejected because WCAG 2.2 AA requires text labels for buttons (icon-only patterns need extensive ARIA labeling and still reduce usability).

**Rationale**: User suggested both options, but vertical stacking maintains text readability and accessibility. The `max-width: 280px` prevents overly wide buttons on small screens while maintaining touch-friendly tap targets (minimum 44px height per WCAG). Buttons keep their `white-space: nowrap` property to prevent text wrapping, which is appropriate for button labels.

### Decision: CSS Cleanup

**Choice**: Remove `!important` from `.contact__card` (line 34: `display: flex !important`)

**Alternatives considered**: Keeping `!important` "just in case" — rejected because defensive CSS with `!important` creates specificity wars and makes future overrides harder.

**Rationale**: Codebase analysis confirms no conflicting `display` property exists for `.contact__card`. The only `display` declaration is on line 34 itself. The `!important` is unnecessary and violates CSS best practices. Removing it improves maintainability and follows the project's clean CSS pattern (no `!important` found elsewhere in Contact.css or Hero.css).

### Decision: Breakpoint Variables (Optional)

**Choice**: Add to `variables.css` for consistency: `--breakpoint-sm: 480px; --breakpoint-md: 768px; --breakpoint-lg: 1024px;`

**Alternatives considered**: Using SCSS/LESS variables or JS-driven breakpoints — rejected because project uses vanilla CSS with custom properties.

**Rationale**: CSS custom properties in `:root` provide a single source of truth for breakpoint values. However, media queries cannot use CSS custom properties directly in standard CSS (they require `env()` or `var()` which aren't supported in `@media` rules). This decision is marked OPTIONAL because the immediate fix doesn't require variables, but they improve long-term maintainability. If implemented, developers must use a preprocessor or PostCSS to enable variable references in media queries.

## Data Flow

No data flow changes. This is a pure CSS layout fix with no JavaScript or data dependencies.

```
Viewport Resize
     │
     ▼
CSS Media Queries Evaluate
     │
     ├─► > 1024px: Default desktop layout
     ├─► 769px - 1024px: Tablet layout (existing)
     ├─► 481px - 768px: Mobile layout (existing)
     └─► ≤ 480px: New small mobile layout (this fix)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `my-app/src/components/sections/Contact.css` | Modify | Add `justify-items: center` to `.contact__cards` (line 28-31), remove `!important` from `.contact__card` (line 34) |
| `my-app/src/components/sections/Hero.css` | Modify | Add new `@media (max-width: 480px)` breakpoint after line 291 with vertical button stacking |
| `my-app/src/styles/variables.css` | Modify (Optional) | Add `--breakpoint-sm: 480px`, `--breakpoint-md: 768px`, `--breakpoint-lg: 1024px` custom properties |

## Interfaces / Contracts

No new interfaces or API contracts. CSS class names remain unchanged:

- `.contact__cards` — grid container (modified: added `justify-items: center`)
- `.contact__card` — individual card (modified: removed `!important`)
- `.hero__actions` — button container (modified: new 480px breakpoint adds `flex-direction: column`)
- `.hero__actions .btn` — buttons (modified: new 480px breakpoint adds `width: 100%; max-width: 280px`)

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | Contact cards centered at all widths | Manual browser testing at 375px, 768px, 1024px, 1440px |
| Visual | No horizontal overflow at 375px | Chrome DevTools device mode, check for scrollbar |
| Visual | Buttons stack vertically at ≤480px | Resize browser window, verify column layout triggers |
| Accessibility | Keyboard navigation works | Tab through contact cards and hero buttons, verify focus styles |
| Accessibility | WCAG 2.2 AA contrast maintained | No color changes, verify existing contrast ratios |
| Responsive | 480px breakpoint precision | Test at exactly 480px and 481px to verify breakpoint triggers correctly |

## Migration / Rollout

No migration required. CSS changes are additive and backward-compatible. The `!important` removal is safe because no conflicting styles exist.

## Open Questions

- [ ] Should the breakpoint variables in `variables.css` be implemented now or deferred? (Current CSS media queries cannot use custom properties directly without a preprocessor)
- [ ] Should `.contact__cards` also get a 2-column layout at intermediate breakpoint (769px-1024px)? Currently jumps from 3-column to 1-column.
