# Tasks: fix-responsive-layout

## Task 1: Fix Contact Cards Centering
**File**: `my-app/src/components/sections/Contact.css`
**Action**: Add `justify-items: center;` to `.contact__cards` rule (currently line 28-31)
**Verification**: Visual check - cards should be centered in their grid cells
**Status**: completed

## Task 2: Add Hero 480px Breakpoint
**File**: `my-app/src/components/sections/Hero.css`
**Action**: Add new media query after line 291:
```css
@media (max-width: 480px) {
  .hero__actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero__actions .btn {
    width: 100%;
    max-width: 280px;
  }
}
```
**Verification**: Test at 375px viewport - buttons stack vertically, no horizontal scroll
**Status**: completed

## Task 3: Remove Unnecessary !important
**File**: `my-app/src/components/sections/Contact.css`
**Action**: Change line 34 from `display: flex !important;` to `display: flex;`
**Verification**: Visual check - cards render identically
**Status**: completed

## Task 4: (Optional) Add Breakpoint Variables
**File**: `my-app/src/styles/variables.css`
**Action**: Add after existing variables:
```css
/* Breakpoints */
--breakpoint-sm: 480px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
```
**Note**: These variables document breakpoints but can't be used directly in @media queries without a preprocessor
**Status**: completed
