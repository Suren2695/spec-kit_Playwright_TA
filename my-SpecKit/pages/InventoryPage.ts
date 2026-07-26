import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer = '.inventory_list';
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartLink = '.shopping_cart_link';

  constructor(page: Page) {
    this.page = page;
  }

  async isVisible() {
    return this.page.isVisible(this.inventoryContainer);
  }

  async addItemToCart(itemName: string) {
    const addButton = `button[data-test="add-to-cart-${itemName}"]`;
    await this.page.click(addButton);
  }

  async getCartCount() {
    if (await this.page.isVisible(this.cartBadge)) {
      return parseInt(await this.page.textContent(this.cartBadge) || '0', 10);
    }
    return 0;
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }
}
