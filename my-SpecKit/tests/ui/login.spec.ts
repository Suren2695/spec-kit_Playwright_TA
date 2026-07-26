import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { env } from '../../utils/env';

const validUser = {
  username: env.SAUCEDEMO_USER,
  password: env.SAUCEDEMO_PASSWORD,
};

const invalidUser = {
  username: 'invalid_user',
  password: 'bad_password',
};

test.describe('SauceDemo Login Flow', () => {
  test('@smoke should log in with valid credentials and show inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 10000 });
  });

  test('should display an error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(invalidUser.username, invalidUser.password);
    await expect(loginPage.getErrorMessage()).resolves.toContain('Username and password do not match any user in this service');
  });
});
