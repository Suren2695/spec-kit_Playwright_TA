# SauceDemo + Reqres Playwright Test Framework

This repository contains a Playwright Test + TypeScript automation framework for:

- SauceDemo UI flows (`https://www.saucedemo.com`)
- Reqres public API validation (`https://reqres.in`)

The framework is designed to run locally and headless in CI without code changes.

## Project Structure

- `pages/`
  - Page Object Model classes for SauceDemo UI flows.
  - Includes `LoginPage.ts`, `InventoryPage.ts`, `CartPage.ts`, and `CheckoutPage.ts`.

- `tests/ui/`
  - UI test files for SauceDemo flows.
  - Includes login, cart, and checkout scenarios.

- `tests/api/`
  - API test files for reqres.in.
  - Includes user list validation and 404 validation.

- `fixtures/`
  - JSON test data such as checkout details and SauceDemo user scenarios.

- `utils/`
  - Helper utilities such as environment configuration.

- `playwright.config.ts`
  - Playwright configuration file with separate UI and API projects.

- `package.json`
  - Node scripts, dependencies, and project metadata.

- `.github/workflows/tests.yml`
  - GitHub Actions workflow to run the regression suite headless on push.

- `specs/001-saucedemo-core-flows/`
  - Design and planning documents for the feature.
  - Includes `spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, and contract details.

- `.specify/`
  - Spec Kit metadata and templates used for feature planning.

- `.github/agents/` and `.github/prompts/`
  - Local integration hooks for Spec Kit commands such as `speckit.specify`, `speckit.plan`, `speckit.tasks`, and `speckit.implement`.

## Spec Kit (speckit)

This repository uses GitHub Spec Kit (also called `speckit`) for structured feature planning and implementation.

- `speckit` is a workflow tool for generating and managing feature documents like `spec.md`, `plan.md`, `tasks.md`, and implementation artifacts.
- It is configured in this repo under `.specify/`.
- The repo specifically records `speckit_version: 0.13.0` in `.specify/init-options.json`.
- The `.specify/workflows/speckit/workflow.yml` file defines the Spec Kit lifecycle for `specify`, `plan`, `tasks`, and `implement`.

Using Spec Kit is useful because it:

- enforces a consistent project structure for feature design, planning, and execution
- makes it easier to keep requirements, implementation plans, and tasks aligned
- provides repeatable commands and templates for new features
- helps teams separate discovery, design, and implementation work with clear artifacts

While this repository does not include the external Spec Kit installer, it references the local `.specify/` metadata and workflow files created when Spec Kit was initialized.

For the official Spec Kit source and documentation, see:

- https://github.com/github/speckit

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add a `.env` file in the repository root with values similar to:

```env
BASE_URL=https://www.saucedemo.com
SAUCEDEMO_USER=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
REQRES_BASE_URL=https://reqres.in
```

3. Make sure your Node.js version is compatible with Playwright and TypeScript.

## Available Scripts

- `npm test`
  - Run all Playwright tests.

- `npm run test:smoke`
  - Run only tests tagged with `@smoke`.

- `npm run test:regression`
  - Run the full regression suite.

- `npm run report`
  - Open the generated Playwright HTML report.

## Test Details

### UI tests

The UI tests cover:

- Successful login to SauceDemo and inventory page access.
- Invalid login error validation.
- Adding items to the cart and verifying badge updates.
- Completing checkout and confirming the order success message.

### API tests

The API tests cover:

- Fetching a list of users and validating expected fields: `id`, `email`, `first_name`, `last_name`.
- Verifying a request for a non-existent user returns HTTP 404.

## How It Works

- UI tests use Playwright with page objects in `pages/`.
- API tests use Playwright's built-in `request` context.
- Environment values are loaded with `dotenv` from `.env`.
- The HTML report is generated automatically after each test run.

## CI Workflow

The GitHub workflow in `.github/workflows/tests.yml` runs the `test:regression` script on push and uploads the HTML report as an artifact.

## Notes

- Do not hardcode credentials or URLs in tests.
- Keep test data in `fixtures/`, not inline in test files.
- UI and API tests are intentionally separated into `tests/ui/` and `tests/api/`.
- Smoke tests are identified by the `@smoke` tag in test titles.
