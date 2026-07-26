import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { env } from '../../utils/env';
import checkoutInfo from '../../fixtures/checkout-info.json';

const validUser = {
  username: env.SAUCEDEMO_USER,
  password: env.SAUCEDEMO_PASSWORD,
};

test.describe('SauceDemo Checkout Flow', () => {
  test('should complete checkout and display the order confirmation message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await expect(cartPage.getItemCount()).resolves.toBe(1);

    await cartPage.proceedToCheckout();
    await checkoutPage.enterCustomerInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(checkoutPage.getOrderConfirmation()).resolves.toContain('THANK YOU FOR YOUR ORDER');
  });
});
