# Proposal: Fix Responsive Layout

## Intent

Fix responsive layout issues reported by user: contact cards not centered, hero section broken on small mobile screens (< 480px), and "Descargar CV" button causing horizontal overflow. Ensure WCAG 2.2 AA compliance and maintain the bold frontend-design aesthetic.

## Scope

### In Scope
- Add `justify-items: center` to `.contact__cards` grid to center contact cards
- Add new 480px breakpoint for hero section with `flex-direction: column`
- Stack hero buttons vertically on screens < 480px using `flex-wrap` or column layout
- Remove unnecessary `!important` in Contact.css line 34
- Define CSS breakpoint variables in variables.css for consistency

### Out of Scope
- Redesigning the hero section layout for larger screens
- Adding new breakpoints for tablet or desktop (1024px and 768px are sufficient)
- Refactoring other CSS files not related to the identified issues
- Changing the visual design or color scheme

## Capabilities

### New Capabilities
- `responsive-layout`: Defines responsive behavior for portfolio sections (contact cards centering, hero mobile layout, button stacking on small screens)

### Modified Capabilities
- None (no existing spec covers responsive layout behavior)

## Approach

1. **Contact Cards**: Add `justify-items: center` to `.contact__cards` grid in Contact.css to properly center cards horizontally
2. **Hero Mobile Breakpoint**: Add a new 480px breakpoint in Hero.css where `.hero__actions` switches to `flex-direction: column` with full-width buttons
3. **Button Layout**: Add `flex-wrap: wrap` to `.hero__actions` and ensure buttons stack vertically on small screens
4. **CSS Cleanup**: Remove `!important` from Contact.css line 34; define breakpoint variables (--bp-mobile: 480px, --bp-tablet: 768px, --bp-desktop: 1024px) in variables.css
5. **Testing**: Verify layout at 375px, 414px (common small phones), 768px, and 1024px

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `my-app/src/components/sections/Contact.css` | Modified | Add `justify-items: center`, remove `!important` |
| `my-app/src/components/sections/Hero.css` | Modified | Add 480px breakpoint, stack buttons vertically |
| `my-app/src/styles/variables.css` | Modified | Define CSS breakpoint variables |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Vertical button stack looks unbalanced on mobile | Low | Use consistent spacing and full-width buttons |
| New breakpoint conflicts with existing 768px rules | Low | Test both breakpoints independently |
| `justify-items: center` affects other grid items unexpectedly | Low | Review Contact.css grid structure before applying |

## Rollback Plan

1. Revert Contact.css: Remove `justify-items: center`, restore `!important` if needed
2. Revert Hero.css: Remove 480px breakpoint block
3. Revert variables.css: Remove breakpoint variables

## Dependencies

- None (pure CSS changes, no new libraries)

## Success Criteria

- [ ] Contact cards centered horizontally on all screen sizes
- [ ] Hero section displays correctly on 375px-480px screens (buttons stacked vertically)
- [ ] No horizontal overflow on any screen size ≥ 375px
- [ ] Three buttons in hero fit without `white-space: nowrap` causing overflow
- [ ] CSS breakpoint variables defined and used in Hero.css and Contact.css
- [ ] No `!important` in Contact.css
- [ ] WCAG 2.2 AA compliance maintained (contrast, focus-visible, prefers-reduced-motion)
