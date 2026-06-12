const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const users = require('../../data/users');

test('TC009 — Add product to cart updates badge', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard_user.username, users.standard_user.password);
  await loginPage.expectLoginSuccess();

  await inventoryPage.addFirstProductToCart();
  await inventoryPage.expectCartBadgeText('1');
});
