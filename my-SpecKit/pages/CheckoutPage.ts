import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput = '[data-test="firstName"]';
  readonly lastNameInput = '[data-test="lastName"]';
  readonly postalCodeInput = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly finishButton = '[data-test="finish"]';
  readonly completionMessage = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  async enterCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async continue() {
    await this.page.click(this.continueButton);
  }

  async finish() {
    await this.page.click(this.finishButton);
  }

  async getOrderConfirmation() {
    return this.page.textContent(this.completionMessage);
  }
}
