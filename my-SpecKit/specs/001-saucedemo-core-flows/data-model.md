# Data Model: SauceDemo + Public API Core Flows

## Entities

### LoginPage
- Represents the SauceDemo login screen.
- Fields: `usernameInput`, `passwordInput`, `loginButton`, `errorMessage`.
- Actions: `navigate()`, `login(username, password)`, `getErrorMessage()`.

### InventoryPage
- Represents the SauceDemo inventory listing screen.
- Fields: `inventoryHeader`, `itemCards`, `addToCartButtons`, `cartBadge`.
- Actions: `addItemToCart(itemName)`, `getCartCount()`, `goToCart()`.

### CartPage
- Represents the SauceDemo cart overview screen.
- Fields: `cartItems`, `checkoutButton`, `removeButtons`.
- Actions: `verifyItemCount(expectedCount)`, `proceedToCheckout()`.

### CheckoutPage
- Represents the SauceDemo checkout process.
- Fields: `firstNameInput`, `lastNameInput`, `postalCodeInput`, `continueButton`, `finishButton`, `orderCompleteMessage`.
- Actions: `enterInfo(info)`, `continue()`, `finish()`, `getConfirmationMessage()`.

### Public API User Resource
- Represents the reqres.in user collection and single-user resources.
- Fields: `id`, `email`, `first_name`, `last_name`, `avatar`.
- Validation: Response objects must contain `id`, `email`, `first_name`, and `last_name`.

## Relationships

- UI tests consume page object actions in sequence: `LoginPage -> InventoryPage -> CartPage -> CheckoutPage`.
- Fixtures provide test data for login and checkout information.
- Environment configuration maps to runtime target URLs and credentials.
- API tests drive `request`-context calls to public endpoint resources independently of UI page navigation.

## Validation Rules

- Environment variables must be present for `BASE_URL`, `SAUCEDEMO_USER`, `SAUCEDEMO_PASSWORD`, and `REQRES_BASE_URL`.
- Test titles should include `@smoke` for critical flows and plain behavior-driven descriptions.
- UI tests must not use raw locators in the spec files; selectors are owned by page object classes.
- API tests must assert both HTTP status and response body schema.

## State Transitions

1. `LoginPage` -> valid login -> `InventoryPage`
2. `InventoryPage` -> add items -> cart badge count changes
3. `InventoryPage` -> go to `CartPage`
4. `CartPage` -> proceed -> `CheckoutPage`
5. `CheckoutPage` -> enter info -> overview -> finish -> completion confirmation
6. API tests remain in isolated request state and do not follow UI page transitions
