# Test Invocation Contract

## Purpose

This contract describes how consumers and CI should invoke the SauceDemo + reqres.in automation framework, what environment inputs are required, and what outputs are produced.

## Test Suite Commands

- `npm test`
  - Runs the full test suite using Playwright Test.
  - Includes both `/tests/ui` and `/tests/api` coverage.

- `npm run test:smoke`
  - Runs only smoke-critical tests tagged with `@smoke` in their titles.
  - Example: login + add-to-cart flows.

- `npm run test:regression`
  - Runs the full regression suite headless.
  - Includes checkout and API validation.

- `npm run report`
  - Opens or surfaces the generated Playwright HTML report for the last run.

## Environment Contract

The framework requires these environment variables:

- `BASE_URL` — Base URL for SauceDemo, typically `https://www.saucedemo.com`
- `SAUCEDEMO_USER` — Valid SauceDemo username
- `SAUCEDEMO_PASSWORD` — Valid SauceDemo password
- `REQRES_BASE_URL` — Base URL for the public API, typically `https://reqres.in`

These values must be loaded from a `.env` file or the executing environment. No hardcoded secrets or URLs are allowed in tests.

## Project Layout Contract

The framework is expected to follow this structural contract:

- `/pages` — Page Object Model classes for SauceDemo UI flows
- `/tests/ui` — UI feature tests for SauceDemo
- `/tests/api` — API tests for reqres.in
- `/fixtures` — JSON fixture data consumed by tests
- `/utils` — helper utilities such as environment configuration loader

## Reporting Contract

- Every test run must generate an HTML report via Playwright's native reporter.
- Reports should be saved in the Playwright report directory and made available in CI artifact uploads.
- The HTML report is the authoritative runtime output for test result review.

## CI Contract

- The GitHub Actions workflow `.github/workflows/tests.yml` must run `npm run test:regression` on push.
- The workflow must execute headless and upload the generated HTML report as an artifact.
- CI must be able to run the suite without modifying test source files.
