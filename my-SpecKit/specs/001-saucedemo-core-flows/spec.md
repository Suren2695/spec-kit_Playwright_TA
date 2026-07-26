# Feature Specification: SauceDemo + Public API Core Flows

**Feature Branch**: `001-saucedemo-core-flows`

**Created**: 2026-07-26

**Status**: Draft

**Input**: User description: "Build a test automation framework that validates the core user flows of the SauceDemo e-commerce site (https://www.saucedemo.com) and a public REST API (https://reqres.in).\n\nUI scope:\n- User can log in with valid credentials and reach the inventory page.\n- User cannot log in with invalid credentials and sees an appropriate error message.\n- User can add one or more items to the cart and see the cart badge update.\n- User can proceed through checkout (info entry, overview, confirmation) and see an order completion message.\n\nAPI scope:\n- A test verifies that fetching a list of users returns a valid response with expected fields (id, email, first_name, last_name).\n- A test verifies that fetching a single non-existent user returns a 404.\n\nNon-functional requirements:\n- Smoke tests (login + add to cart) must be runnable separately from full regression via a tag.\n- An HTML report must be generated automatically after every test run.\n- Framework must support running locally and headless in CI without code changes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Verify valid login and inventory access (Priority: P1)

A user with valid SauceDemo credentials should be able to log in and reach the inventory page.

**Why this priority**: Login is the gateway to all UI flows, and successful login validates the core user path.

**Independent Test**: Run the login flow and confirm the inventory page appears without needing any other feature.

**Acceptance Scenarios**:

1. **Given** the SauceDemo login page is open, **When** the user enters valid credentials and submits, **Then** the inventory page is displayed.
2. **Given** the inventory page is displayed, **When** the user inspects the page header or inventory list, **Then** the page shows expected inventory content.

---

### User Story 2 - Reject invalid login attempts (Priority: P1)

A user supplying invalid credentials should see a clear login error message and remain on the login page.

**Why this priority**: It verifies application error handling and prevents false-positive security coverage.

**Independent Test**: Run the invalid-login scenario alone and confirm the page shows an error message.

**Acceptance Scenarios**:

1. **Given** the SauceDemo login page is open, **When** the user enters invalid credentials and submits, **Then** an appropriate error message is shown and login is blocked.

---

### User Story 3 - Add items to cart and verify badge update (Priority: P2)

A logged-in user should be able to add one or more items to the cart and see the cart badge count update.

**Why this priority**: Cart behavior is core to e-commerce flows and directly affects checkout readiness.

**Independent Test**: Start from login, add items, and verify the cart badge independently of checkout.

**Acceptance Scenarios**:

1. **Given** the user is on the inventory page, **When** the user adds one item to the cart, **Then** the cart badge count updates to 1.
2. **Given** the user adds multiple items, **When** the user inspects the cart badge, **Then** the badge count reflects the number of items added.

---

### User Story 4 - Complete checkout flow and confirm order success (Priority: P2)

A logged-in user should be able to complete checkout from cart to order confirmation.

**Why this priority**: Checkout is the end-to-end proof that the e-commerce flow works.

**Independent Test**: Run the checkout flow from inventory through confirmation and validate the final success message.

**Acceptance Scenarios**:

1. **Given** the user has items in the cart, **When** the user proceeds to checkout and enters required information, **Then** the overview page is shown.
2. **Given** the user confirms checkout on the overview page, **When** the order completes, **Then** an order completion message is displayed.

---

### User Story 5 - Validate public API user list response (Priority: P2)

A test verifies that requesting a list of users from reqres.in returns a successful response containing expected user fields.

**Why this priority**: It validates the API assurance scope and establishes a separate API test path.

**Independent Test**: Call the public users endpoint and assert the returned JSON contains the required fields.

**Acceptance Scenarios**:

1. **Given** the API endpoint is reachable, **When** the test fetches the user list, **Then** the response is successful and each user object includes `id`, `email`, `first_name`, and `last_name`.

---

### User Story 6 - Validate 404 for non-existent API user (Priority: P2)

A test verifies that requesting a non-existent user returns a 404 status code.

**Why this priority**: It checks negative API behavior and response correctness for missing resources.

**Independent Test**: Call the non-existent user endpoint and assert the response is 404.

**Acceptance Scenarios**:

1. **Given** a user ID that does not exist, **When** the test requests that user, **Then** the response returns a 404 status code.

---

### Edge Cases

- What happens when the SauceDemo application is unavailable or returns a 500 during login?
- What happens when the API returns an unexpected response structure for the user list?
- How should retry or timeout behavior be handled for remote test targets in CI?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The framework MUST support SauceDemo UI login with valid credentials and confirm inventory page access.
- **FR-002**: The framework MUST verify that invalid SauceDemo credentials produce a login error and prevent access.
- **FR-003**: The framework MUST support adding items to the cart and verifying the cart badge count updates.
- **FR-004**: The framework MUST support completing the checkout process through information entry, overview, and confirmation.
- **FR-005**: The framework MUST include a public API test that validates the user list response contains `id`, `email`, `first_name`, and `last_name`.
- **FR-006**: The framework MUST include a public API test that verifies fetching a non-existent user returns HTTP 404.
- **FR-007**: The framework MUST provide a way to tag smoke tests and run them separately from full regression.
- **FR-008**: The framework MUST generate an HTML report automatically after every test run.
- **FR-009**: The framework MUST run locally and in CI headless without requiring code changes.
- **FR-010**: The framework MUST keep UI and API tests isolated from each other.
- **FR-011**: The framework MUST source base URLs, credentials, and environment settings from environment configuration and not hardcode them.
- **FR-012**: The framework MUST keep test data in JSON fixtures rather than inline within test files.

### Key Entities

- **SauceDemo Login Flow**: The authentication path that accepts credentials and navigates to inventory.
- **Cart State**: The application state representing selected items and badge count.
- **Checkout Flow**: The multi-step purchase flow from information entry to order confirmation.
- **Public API User Resource**: The `reqres.in` user list and single-user endpoints.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Smoke tests run separately from regression using named test tags and the test runner’s grep/filter capability.
- **SC-002**: 100% of the defined SauceDemo UI flows pass in a single regression run.
- **SC-003**: The public API list and 404 tests pass consistently in the API test suite.
- **SC-004**: An HTML report is produced after every execution, both locally and in CI.
- **SC-005**: The framework executes successfully in headless mode without source changes to the tests.

## Assumptions

- SauceDemo valid credentials are available via environment configuration and will remain stable for test execution.
- SauceDemo test flows are based on the standard demo site pages and are not expected to change frequently.
- Public API endpoints on reqres.in are stable and accessible from CI.
- Smoke tests are defined as the login plus add-to-cart flow, while the full regression suite includes checkout and API validation.
