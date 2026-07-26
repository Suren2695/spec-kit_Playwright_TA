# Quickstart: SauceDemo + Public API Core Flows

## Prerequisites

- Node.js 18.x or later installed
- npm available in the shell
- A copy of project sources checked out in the repository root

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the repository root with values similar to:

```env
BASE_URL=https://www.saucedemo.com
SAUCEDEMO_USER=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
REQRES_BASE_URL=https://reqres.in
```

3. Add any additional environment-specific settings as needed.

## Run the full suite locally

```bash
npm run test
```

Expected outcome:
- Playwright executes UI and API tests
- A native HTML report is generated automatically
- The command exits with a success status when all tests pass

## Run smoke tests

```bash
npm run test:smoke
```

Expected outcome:
- Only smoke-critical tests tagged with `@smoke` execute
- The run completes quickly and still produces an HTML report

## Run regression tests

```bash
npm run test:regression
```

Expected outcome:
- Full regression test set executes headless in the same environment
- HTML report is generated and available in the configured report directory

## Generate or view the report

```bash
npm run report
```

Expected outcome:
- The test report opens or the artifact path is shown for inspection
- Report output is available after every run, including CI executions

## CI behavior

- The workflow defined in `.github/workflows/tests.yml` runs the full regression suite headless on push.
- The HTML report is uploaded as a workflow artifact for review.
