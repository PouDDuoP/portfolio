# Proposal: Fix Responsive Layout V2

## Intent

Fix two remaining responsive issues: hero buttons not stacking at 585px (large mobile/tablet portrait), and contact cards misaligned on desktop due to incorrect grid alignment properties.

## Scope

### In Scope
- Hero.css: Change 480px breakpoint to 640px for proper button stacking
- Contact.css: Fix card alignment by removing useless `justify-items: center`, add `align-items: start`

### Out of Scope
- Other CSS files not related to these issues
- Visual design changes or color scheme modifications
- Adding new breakpoints beyond 640px fix

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `responsive-layout`: Update hero breakpoint requirement from 480px to 640px, fix contact card alignment specification

## Approach

1. **Hero Breakpoint**: Change `@media (max-width: 480px)` to `@media (max-width: 640px)` in Hero.css line 293. This ensures buttons stack vertically before 585px (large mobile/tablet portrait).

2. **Contact Card Alignment**: 
   - Remove `justify-items: center` from `.contact__cards` (line 31) — it's nullified by `width: 100%` on `.contact__card`
   - Add `align-items: start` to `.contact__cards` grid for proper vertical alignment across cards with different content heights

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `my-app/src/components/sections/Hero.css` | Modified | Change 480px breakpoint to 640px (line 293) |
| `my-app/src/components/sections/Contact.css` | Modified | Remove `justify-items: center`, add `align-items: start` to grid |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Buttons stack too early at 640px on tablet landscape | Low | 640px is appropriate for tablet portrait; landscape tablets have ≥768px |
| `align-items: start` causes visual inconsistency | Low | Cards align to top; content variance (copy button) won't affect grid alignment |

## Rollback Plan

1. Revert Hero.css: Change 640px breakpoint back to 480px
2. Revert Contact.css: Restore `justify-items: center`, remove `align-items: start`

## Dependencies

- None (pure CSS changes, no new libraries)

## Success Criteria

- [ ] Hero buttons stack vertically at 585px and below
- [ ] Contact cards properly aligned on desktop (no cards outside established level)
- [ ] No horizontal overflow on any screen size ≥ 375px
- [ ] Existing 768px breakpoint behavior unchanged
- [ ] WCAG 2.2 AA compliance maintained
