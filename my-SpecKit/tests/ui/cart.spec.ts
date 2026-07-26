import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { env } from '../../utils/env';

const validUser = {
  username: env.SAUCEDEMO_USER,
  password: env.SAUCEDEMO_PASSWORD,
};

test.describe('SauceDemo Cart Flow', () => {
  test('@smoke should add items to the cart and update the cart badge', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await expect(inventoryPage.getCartCount()).resolves.toBe(1);
  });
});
