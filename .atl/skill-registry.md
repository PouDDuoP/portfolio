# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | C:/Users/kevin/.config/opencode/skills/issue-creation/SKILL.md |
| creating a pull request, opening a PR, or preparing changes for review | branch-pr | C:/Users/kevin/.config/opencode/skills/branch-pr/SKILL.md |
| create a new skill, add agent instructions, or document patterns for AI | skill-creator | C:/Users/kevin/.config/opencode/skills/skill-creator/SKILL.md |
| writing Go tests, using teatest, or adding test coverage | go-testing | C:/Users/kevin/.config/opencode/skills/go-testing/SKILL.md |
| judgment day, judgment-day, review adversarial, dual review, doble review, juzgar, que lo juzguen | judgment-day | C:/Users/kevin/.config/opencode/skills/judgment-day/SKILL.md |

## Project Skills

| Trigger | Skill | Path |
|---------|-------|------|
| working with Vite projects, vite.config.ts, Vite plugins, or building libraries/SSR apps with Vite | vite | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/vite/SKILL.md |
| improve accessibility, a11y audit, WCAG compliance, screen reader support, keyboard navigation, or make accessible | accessibility | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/accessibility/SKILL.md |
| build web components, pages, artifacts, posters, or applications | frontend-design | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/frontend-design/SKILL.md |
| improve SEO, optimize for search, fix meta tags, add structured data, sitemap optimization, or search engine optimization | seo | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/seo/SKILL.md |
| creating Node.js servers, REST APIs, GraphQL backends, or microservices architectures | nodejs-backend-patterns | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/nodejs-backend-patterns/SKILL.md |
| Node.js development principles and decision-making | nodejs-best-practices | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/nodejs-best-practices/SKILL.md |
| React Best Practices (performance optimization) | react-best-practices | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/react-best-practices/AGENTS.md |
| React Composition Patterns | composition-patterns | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/composition-patterns/AGENTS.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### issue-creation
- Blank issues disabled — MUST use bug report or feature request template
- Every issue gets `status:needs-review` automatically on creation
- Maintainer MUST add `status:approved` before any PR can be opened
- Questions go to Discussions, not issues
- Search existing issues for duplicates before creating new ones

### branch-pr
- Every PR MUST link an approved issue — no exceptions
- Every PR MUST have exactly one `type:*` label
- Automated checks must pass before merge is possible
- Branch naming: `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)/[a-z0-9._-]+$`
- Use conventional commits for all PR changes

### skill-creator
- Create skill when patterns repeat, conventions differ from generic, or workflows need steps
- Don't create for trivial patterns, one-off tasks, or existing documentation
- Structure: `SKILL.md` (required), `assets/` (optional), `references/` (optional)
- Frontmatter: name, description with Trigger, license, metadata (author, version)
- Allowed tools in frontmatter restrict what sub-agents can use

### go-testing
- Use table-driven tests for multiple test cases with shared logic
- Bubbletea TUI testing: use `teatest` package with `teatest.WithInitialTermSize`
- Golden file testing: compare output against `.golden` files for complex outputs
- Test naming: `TestFunctionName_Scenario` for clarity
- Use `t.Parallel()` for independent tests to speed up execution

### judgment-day
- Launch TWO blind sub-agents in parallel via `delegate` — never sequential
- Neither agent knows about the other — no cross-contamination
- Synthesize findings from both judges, apply fixes, re-judge until both pass
- Escalates after 2 iterations if judges can't agree
- Resolve skills via Skill Resolver Protocol before launching judges

### vite
- Use TypeScript: prefer `vite.config.ts` over .js
- Always use ESM, avoid CommonJS
- Common plugins: `@vitejs/plugin-react` (React with Oxc/Babel), `@vitejs/plugin-vue` (Vue 3)
- Vite 8+ uses Rolldown bundler and Oxc transformer (not Rollup + esbuild)
- Use `import.meta.glob` for dynamic imports, `import.meta.env` for env variables

### accessibility
- WCAG 2.2 AA is minimum target (legal requirement in many jurisdictions)
- All images need alt text; decorative images use `alt="" role="presentation"`
- Color contrast: 4.5:1 for normal text, 3:1 for large text (18px+)
- All functionality must be keyboard accessible (Tab, Enter, Space)
- Respect `prefers-reduced-motion`: set `animation-duration: 0.01ms !important`
- Use `:focus-visible` for keyboard-only focus styles, never `outline: none`

### frontend-design
- Choose a BOLD aesthetic direction: minimal, maximalist, retro-futuristic, brutalist, etc.
- Avoid generic fonts (Inter, Roboto, Arial) — use distinctive, characterful choices
- Commit to cohesive color theme with dominant colors and sharp accents
- Use animations for high-impact moments: scroll-triggered, hover states, staggered reveals
- Spatial composition: asymmetry, overlap, diagonal flow, generous negative space
- Create atmosphere with backgrounds: gradient meshes, noise textures, geometric patterns

### seo
- Title tags: 50-60 chars, primary keyword near beginning, unique per page
- Meta descriptions: 150-160 chars, compelling CTA, include keyword naturally
- Single `<h1>` per page, logical heading hierarchy (don't skip levels)
- Image SEO: descriptive filenames, alt text, WebP/AVIF with fallbacks, lazy loading
- Use `rel="canonical"` to prevent duplicate content issues
- Structured data (JSON-LD): Organization, Article, Product, FAQ, Breadcrumbs

### nodejs-backend-patterns
- Use layered architecture: Controllers (HTTP) → Services (business logic) → Repositories (data access)
- Custom error classes extend AppError with statusCode and isOperational
- Global error handler catches all errors, don't leak details in production
- Validation at boundaries: use Zod schemas, validate body/query/params
- Authentication middleware: verify JWT, attach user to req.user
- Rate limiting with Redis for production (express-rate-limit + rate-limit-redis)

### nodejs-best-practices
- Framework selection: Hono (edge/serverless), Fastify (performance), Express (legacy/ecosystem)
- Use ESM (import/export) for new projects — better tree-shaking
- Validate at boundaries: all inputs, parameters, headers, cookies, external API responses
- Never use sync methods in production (fs.readFileSync blocks event loop)
- Security: parameterized queries (no string concatenation), bcrypt/argon2 for passwords
- Error response: appropriate HTTP status, error code for programmatic handling, NO internal details

### react-best-practices
- Eliminate waterfalls: use `Promise.all()` for independent async operations
- Avoid barrel file imports — import directly from source to prevent loading 1000+ modules
- Use `React.cache()` for server-side request deduplication (per-request, not cross-request)
- Parallel data fetching: restructure with composition so RSC don't block each other
- Minimize serialization at RSC boundary — only pass fields the client actually uses
- Dynamic imports for heavy components: `const Component = lazy(() => import('./Component'))`

### composition-patterns
- Avoid boolean prop proliferation — use compound components instead
- Define generic context interfaces: state, actions, meta for dependency injection
- Lift state into provider components — children outside Frame can still access context
- Use `children` for static composition, render props when parent needs to pass data
- React 19: ref is regular prop (no forwardRef), use `use()` instead of `useContext()`
- Create explicit component variants (ChannelComposer, ThreadComposer) instead of boolean props

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| react-best-practices | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/react-best-practices/AGENTS.md | React performance optimization (40+ rules, Vercel Engineering) |
| composition-patterns | C:/Users/kevin/Desktop/proyects/portfolio/my-app/.agents/skills/composition-patterns/AGENTS.md | React composition patterns (compound components, state lifting) |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
