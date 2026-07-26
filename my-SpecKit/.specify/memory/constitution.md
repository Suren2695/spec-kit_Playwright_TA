# Playwright + TypeScript Test Framework Constitution

## Core Principles

### I. Page Object Model First
Every web view, page, and reusable UI flow is represented by a dedicated class in `/pages`. Page objects own selectors, actions, and assertions. Test files must not contain raw selectors or duplicate locator logic.

### II. Independent Feature Tests
UI tests live under `/tests/ui` and API tests under `/tests/api`. Each feature gets one spec file (for example `login.spec.ts`, `cart.spec.ts`). Tests must run independently and cannot rely on order or state left by other tests.

### III. Behavior-Driven Naming and Tagging
`describe` blocks must name the feature and test titles must express user-observable behavior, e.g. `should reject login with invalid password`. Tests must include tag markers such as `@smoke` and `@regression` in titles so subsets can be executed via `--grep`.

### IV. Environment-Driven Configuration and Fixture Data
Base URLs, credentials, and environment-dependent values must come from `.env` variables, not hardcoded values. Test data belongs in JSON fixtures under `/fixtures`; inline data in test files is prohibited. Assertions must include clear, descriptive failure messages.

### V. CI Headless Execution and Report Generation
The framework must execute headless in CI and produce an HTML report after every run. API tests must remain isolated from UI tests, and API validation must never reuse browser context from UI execution.

## Additional Constraints
- `/pages` is the only authorized location for page classes and locator definitions.
- `/tests/ui` and `/tests/api` must be configured as separate test roots or projects in `playwright.config.ts` to prevent shared browser state.
- `.env` files or environment variables are the single source for URLs and credentials. Secrets must never be stored in repository code.
- Fixtures live under `/fixtures` and are consumed by test files via explicit loading.
- HTML report artifacts must be generated consistently in CI and attached to pipeline runs when available.

## Development Workflow
- All new tests and page objects are reviewed for architecture, maintainability, and selector reuse.
- Every test file must be independently runnable with `npx playwright test <file>`, and CI must be able to run feature subsets with grep tags.
- PRs must verify that UI and API tests remain separated, no new raw selectors are introduced in tests, and `.env` usage is preserved.
- Failures must be actionable: assertions should explain the expected result and what went wrong.

## Governance
This constitution defines the mandatory framework practices for the Playwright + TypeScript test automation project. It supersedes informal or legacy conventions for test structure, naming, data handling, environment configuration, and CI reporting.

- All test framework changes must be proposed by updating this constitution and validating the new behavior in CI.
- Every PR that modifies test structure or Playwright configuration must include evidence that new tests run headless and that an HTML report is produced.
- Compliance is verified by reviewers and automated checks; non-compliant test changes must be remediated before merge.
- Amendments require a documented rationale, a corresponding version bump, and a review note in the PR description.

**Version**: 1.0.0 | **Ratified**: 2026-07-26 | **Last Amended**: 2026-07-26
