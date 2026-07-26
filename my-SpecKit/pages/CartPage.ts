import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItem = '.cart_item';
  readonly checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async getItemCount() {
    return (await this.page.locator(this.cartItem).count());
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}
