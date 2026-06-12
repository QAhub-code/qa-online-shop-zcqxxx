const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  async textContent(selector) {
    return this.page.locator(selector).textContent();
  }

  async getLocator(selector) {
    return this.page.locator(selector);
  }

  async expectLocatorVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async expectSelectorVisible(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectSelectorExists(selector) {
    const locator = this.page.locator(selector);
    await expect(locator).toHaveCount(1);
  }
}

module.exports = { BasePage };
