const { expect } = require('@playwright/test');
const { BasePage } = require('./basePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('input#continue, button:has-text("Continue")');
    this.finishButton = page.locator('button:has-text("Finish")');
    this.completeHeader = page.locator('.complete-header, .pony_express');
  }

  async fillCheckoutInformation({ firstName, lastName, postalCode }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectComplete() {
    await expect(this.completeHeader).toBeVisible();
  }
}

module.exports = { CheckoutPage };
