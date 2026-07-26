# Test Automation Framework — Built with Spec Kit

This project uses [GitHub Spec Kit](https://github.com/github/spec-kit) to drive development through **Spec-Driven Development (SDD)** — writing structured specs, plans, and tasks *before* letting an AI coding agent (GitHub Copilot) generate the actual test automation code.

This README documents how Spec Kit was installed and used on this project. It does not cover the application-under-test itself — only the Spec Kit workflow.

---

## What is Spec-Driven Development?

Spec-Driven Development flips the usual order of building software. Instead of writing code first and documentation later (if ever), you write the specification first, and it becomes the source of truth that drives implementation — not throwaway scaffolding you discard once "real" coding starts.

For a test automation framework, this matters because a lot of design decisions (folder structure, naming conventions, test isolation rules, reporting strategy) usually only live in one person's head. Spec Kit forces those decisions to be written down once, then keeps every future feature Copilot generates consistent with them.

---

## Installation

### Prerequisites

| Tool | Purpose |
|---|---|
| [uv](https://docs.astral.sh/uv/) | Installs and runs the Specify CLI |
| Python 3.11+ | Required by the Specify CLI |
| Git | Version control |
| Node.js | Required for Playwright |
| GitHub Copilot | AI coding agent used for this project |

### Install the Specify CLI

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
```

Replace `vX.Y.Z` with the latest release tag from the [Spec Kit Releases page](https://github.com/github/spec-kit/releases) (keep the leading `v`).

Alternatively, install from PyPI:

```bash
uv tool install specify-cli
```

### Initialize the project

```bash
specify init test-automation-framework --integration copilot
cd test-automation-framework
```

This scaffolds a `.specify/` directory containing templates, and installs Copilot-specific slash commands for the SDD workflow.

### Keeping the CLI up to date

```bash
specify self check              # check for a newer release (read-only)
specify self upgrade --dry-run  # preview what an upgrade would do
specify self upgrade            # upgrade in place
```

---

## The Spec Kit Workflow

Once initialized, Spec Kit exposes a set of `/speckit.*` slash commands inside Copilot. Each command produces an artifact that feeds into the next step.

### 1. `/speckit.constitution` — Project principles

Establishes the non-negotiable ground rules the AI agent must follow for **every** feature it builds afterward — coding conventions, structure, testing standards. This is run once, early, and updated only when the rules themselves change.

**Used in this project to lock in:**
- Page Object Model structure (`/pages`)
- Test file organization (`/tests/ui`, `/tests/api`)
- Naming conventions for describe blocks and test titles
- Test independence (no shared state between tests)
- Tagging convention (`@smoke`, `@regression`)
- Isolation between UI and API tests
- Environment-variable-driven config (no hardcoded secrets/URLs)
- Mandatory descriptive assertion messages
- Headless CI execution with automatic HTML reporting
- JSON fixtures for test data (no inline data)

### 2. `/speckit.specify` — What to build

Describes **what** the framework should do and **why**, deliberately leaving out tech-stack details. This becomes the functional spec.

**Used in this project to define:**
- UI flows to cover: login (valid/invalid), add-to-cart, checkout
- API flows to cover: list users, fetch non-existent user (404 check)
- Non-functional requirements: separate smoke vs. regression runs, automatic HTML reporting, CI-compatible headless execution

### 3. `/speckit.clarify` — Resolve ambiguity (optional, run before plan)

Scans the spec for underspecified areas and asks clarifying questions before implementation details get locked in. Recommended whenever the spec could be read more than one way. Run **before** `/speckit.plan`.

### 4. `/speckit.plan` — How to build it

Takes the spec and adds the technical decisions: language, framework, architecture, folder layout.

**Used in this project to define:**
- Playwright Test with TypeScript
- Built-in Playwright test runner and native HTML reporter
- Folder structure: `/pages`, `/tests/ui`, `/tests/api`, `/fixtures`, `/utils`
- `.env`-based configuration via `dotenv`
- Playwright's built-in `request` context for API tests (no extra HTTP library)
- npm scripts: `test`, `test:smoke`, `test:regression`, `report`
- GitHub Actions workflow for headless CI runs with report artifact upload

### 5. `/speckit.tasks` — Break the plan into actionable steps

Converts the plan into an ordered, concrete checklist that can be executed one item at a time.

**Order used in this project:**
```
Config setup → Page Object Model → First test (login/smoke) → CI integration
```

### 6. `/speckit.analyze` — Consistency check (optional, run after tasks, before implement)

Cross-checks the spec, plan, and task list against each other to catch gaps or contradictions before any code is generated. Cheap insurance against scope drift.

### 7. `/speckit.implement` — Generate the code

Executes the task list and has Copilot write the actual framework code according to everything defined in the previous steps.

> **Note:** Generated code should always be reviewed like a pull request. Spec Kit makes output more structured and consistent, but it cannot verify that a locator targets the right element or that an assertion checks the correct condition — that judgment remains with the developer.

---

## Command Reference Used in This Project

| Command | Purpose | When it ran |
|---|---|---|
| `/speckit.constitution` | Set framework-wide conventions | Once, at project start |
| `/speckit.specify` | Define UI/API test scope | After constitution |
| `/speckit.clarify` | Resolve spec ambiguity | Before plan (if needed) |
| `/speckit.plan` | Define tech stack & structure | After specify |
| `/speckit.tasks` | Generate ordered task checklist | After plan |
| `/speckit.analyze` | Validate consistency across artifacts | After tasks, before implement |
| `/speckit.implement` | Generate the framework code | Last step |

---

## Conclusion

Spec Kit was used to drive this test automation framework from a written specification all the way to working Playwright + TypeScript code, rather than generating tests ad hoc. The **constitution** locked in structural and quality conventions up front, the **specify** step captured what needed to be tested (SauceDemo UI flows + a public REST API) without prematurely deciding on tooling, the **plan** step then fixed the technical approach (Playwright, TypeScript, POM, `.env` config), and **tasks** turned that plan into an ordered build sequence: configuration → Page Object Model → first test → CI integration. The optional **clarify** and **analyze** steps acted as checkpoints to catch ambiguity and inconsistency before code was generated, and **implement** produced the final framework.

The result is a framework where every design decision is traceable back to a written artifact (spec → plan → tasks → code), making it easier to review, hand off, or extend — new test cases can be added by extending the spec and re-running the relevant Spec Kit steps rather than editing framework internals directly.

---

## References

- [Spec Kit repository](https://github.com/github/spec-kit)
- [Spec Kit documentation site](https://github.github.io/spec-kit/)
- [Spec-Driven Development methodology (deep dive)](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- [Spec Kit Quick Start Guide](https://github.github.io/spec-kit/quickstart.html)
- [Spec Kit Releases](https://github.com/github/spec-kit/releases)
- [uv installation guide](https://docs.astral.sh/uv/)
- [Supported AI coding agent integrations](https://github.github.io/spec-kit/reference/integrations.html)
- [Playwright documentation](https://playwright.dev/)
