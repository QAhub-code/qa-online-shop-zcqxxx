const { expect } = require('@playwright/test');
const { BasePage } = require('./basePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('button:has-text("Add to cart")');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.productDescriptions = page.locator('.inventory_item_desc');
  }

  async expectVisible() {
    await expect(this.inventoryList).toBeVisible();
  }

  async getItemCount() {
    return this.inventoryItems.count();
  }

  async getImageCount() {
    return this.page.locator('.inventory_item img').count();
  }

  async getErrorImageCount() {
    // Count images showing the 404 error image (sl-404.jpg)
    return this.page.locator('.inventory_item img[src*="sl-404"]').count();
  }

  async checkImagesShow404Error() {
    // For problem_user: all product images should show the 404 error image
    const totalImages = await this.getImageCount();
    const errorImages = await this.getErrorImageCount();
    
    // If all images are showing 404 error, images failed to load properly
    return totalImages > 0 && totalImages === errorImages;
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async expectCartBadgeText(expectedText) {
    await expect(this.cartBadge).toHaveText(expectedText);
  }

  async getCartBadgeText() {
    return this.cartBadge.textContent();
  }

  async gotoCart() {
    await this.cartLink.click();
  }

  async getProductNames() {
    // Get all product names
    return this.productNames.allTextContents();
  }

  async getProductPrices() {
    // Get all product prices
    return this.productPrices.allTextContents();
  }

  async getProductDescriptions() {
    // Get all product descriptions
    return this.productDescriptions.allTextContents();
  }

  async verifyProductDetails() {
    // Verify all products have name, price, and description
    const names = await this.getProductNames();
    const prices = await this.getProductPrices();
    const descriptions = await this.getProductDescriptions();
    
    return names.length > 0 && 
           prices.length > 0 && 
           descriptions.length > 0 &&
           names.length === prices.length &&
           prices.length === descriptions.length;
  }

  async sortBy(sortOption) {
    // Sort products by the specified option
    // Options: 'az' (A to Z), 'za' (Z to A), 'lohi' (low to high), 'hilo' (high to low)
    await this.sortDropdown.selectOption(sortOption);
  }

  async getSortDropdownValue() {
    // Get current sort option
    return this.sortDropdown.inputValue();
  }

  async expectSortVisible() {
    await this.expectSelectorExists('.product_sort_container');
  }
}

module.exports = { InventoryPage };
