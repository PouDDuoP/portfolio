# Responsive Layout Specification

## Purpose

Defines responsive behavior for portfolio sections including contact cards centering, hero section mobile layout, and button stacking on small screens. Ensures WCAG 2.2 AA compliance and maintains the bold frontend-design aesthetic across all viewport sizes.

## Requirements

### Requirement: Contact Cards Centering

The contact cards MUST be visually centered within their grid cells on all viewport widths. Card content (icon + text) MUST remain left-aligned within each card.

#### Scenario: Contact cards centered on desktop

- GIVEN contact section is rendered
- WHEN viewport width is greater than 768px
- THEN contact cards MUST be centered horizontally within their grid cells
- AND card content MUST be left-aligned (icon + text)

#### Scenario: Contact cards centered on tablet

- GIVEN contact section is rendered
- WHEN viewport width is between 481px and 768px
- THEN contact cards MUST be centered horizontally within their grid cells
- AND there MUST be no horizontal overflow

#### Scenario: Contact cards centered on mobile

- GIVEN contact section is rendered
- WHEN viewport width is 768px or less
- THEN contact cards MUST stack in a single column
- AND the single column MUST be centered within the container

### Requirement: Hero Section Mobile Breakpoint

The hero section MUST have a dedicated breakpoint at 480px for small mobile devices. At 480px or less, hero actions MUST stack vertically.

#### Scenario: Hero layout on small mobile (≤480px)

- GIVEN hero section is rendered with action buttons
- WHEN viewport width is 480px or less
- THEN `.hero__actions` MUST use `flex-direction: column`
- AND buttons MUST be centered or full-width
- AND there MUST be no horizontal overflow

#### Scenario: Hero layout on larger screens (>480px)

- GIVEN hero section is rendered
- WHEN viewport width is greater than 480px
- THEN `.hero__actions` MUST use `flex-direction: row` (default)
- AND buttons MUST be displayed horizontally

### Requirement: Button Layout on Small Screens

Hero buttons MUST NOT cause horizontal overflow on screens smaller than 554px (button total width). Buttons MUST stack vertically when viewport is less than 554px.

#### Scenario: Buttons stack on very small screens

- GIVEN hero section is rendered with 3 action buttons
- WHEN viewport width is less than 554px
- THEN buttons MUST stack vertically using `flex-direction: column`
- AND there MUST be no horizontal scrollbar

#### Scenario: Buttons fit horizontally on larger screens

- GIVEN hero section is rendered with 3 action buttons
- WHEN viewport width is 554px or greater
- THEN buttons MAY be displayed horizontally
- AND button text MUST NOT wrap unexpectedly

### Requirement: Clean CSS Without !important

Contact.css MUST NOT contain unnecessary `!important` declarations. The `!important` on `.contact__card` (line 34) MUST be removed as it is not needed.

#### Scenario: No !important in Contact.css

- GIVEN Contact.css is reviewed
- WHEN checking `.contact__card` rule (line 34)
- THEN `display: flex` MUST NOT have `!important`
- AND the layout MUST work correctly without `!important`

#### Scenario: No conflicting display properties

- GIVEN Contact.css is reviewed
- WHEN searching for all `display` properties on `.contact__card`
- THEN there MUST be only one `display` declaration
- AND no `!important` needed for specificity

### Requirement: CSS Breakpoint Variables (Optional)

CSS breakpoint values SHOULD be defined as custom properties in variables.css for consistency and maintainability.

#### Scenario: Breakpoint variables defined

- GIVEN variables.css is the source of truth for CSS variables
- WHEN new breakpoints are needed
- THEN `--breakpoint-sm: 480px` SHOULD be defined
- AND `--breakpoint-md: 768px` SHOULD be defined
- AND `--breakpoint-lg: 1024px` SHOULD be defined

#### Scenario: Breakpoint variables used in components

- GIVEN breakpoint variables are defined in variables.css
- WHEN Hero.css or Contact.css use media queries
- THEN they SHOULD reference the breakpoint variables
- AND hardcoded pixel values SHOULD be avoided
