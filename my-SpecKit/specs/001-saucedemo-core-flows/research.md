# Research: SauceDemo + Public API Core Flows

## Decision: Playwright Test with TypeScript

- Chosen because it provides a built-in test runner, native HTML reporting, page object compatibility, and a `request` API context for REST validation.
- Playwright supports headless execution in CI without code changes and enables reuse of the same test definitions locally.
- TypeScript delivers type safety for page objects, fixture loading, and environment configuration.

## Rationale

- The built-in HTML reporter makes it easy to satisfy the requirement that every run generates a report.
- `@playwright/test` supports `--grep` and test title tags natively, which fits smoke/regression separation.
- Playwright’s `request` context means API tests do not need a separate HTTP library and can coexist with UI tests in the same framework.

## Alternatives Considered

- Cypress: good for UI but less ideal for public API tests and headless CI HTML reporting without additional plugins.
- Jest + Playwright: more setup required and no direct Playwright reporter integration.
- Webdriver-based runner: unnecessary complexity compared to Playwright’s built-in features.

## Fixture and Environment Strategy

- Use JSON fixtures under `/fixtures` to hold user credentials and checkout payloads.
- Use `.env` plus `dotenv` in `/utils/env.ts` to load the base URLs and credentials.
- Keep secrets out of source control by referencing `.env` values in test code.

## Test Separation Strategy

- UI tests are grouped under `/tests/ui`, with page object classes in `/pages` to eliminate raw selectors in spec files.
- API tests are grouped under `/tests/api` and use Playwright `request` context exclusively.
- This separation ensures API tests cannot accidentally reuse browser context from UI flows.

## Reporting and CI

- Configure Playwright native HTML reporter in `playwright.config.ts`.
- Add npm scripts for smoke and regression subsets via tagged test titles.
- Create a GitHub Actions workflow that runs the regression suite headless on push and uploads the report artifact.

## Outcome

This design resolves all specified functional and non-functional requirements with minimal custom tooling and maximizes reuse of Playwright’s native capabilities.
