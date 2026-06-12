const { expect } = require('@playwright/test');
const { BasePage } = require('./basePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('button:has-text("Remove")');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
  }

  async expectItemVisible() {
    await expect(this.cartItems).toBeVisible();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async expectNoItems() {
    await expect(this.cartItems).not.toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
