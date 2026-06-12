const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const { CartPage } = require('../../pages/cartPage');
const users = require('../../data/users');

test('TC010 — Remove product from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard_user.username, users.standard_user.password);
  await loginPage.expectLoginSuccess();

  await inventoryPage.addFirstProductToCart();
  await inventoryPage.gotoCart();

  await cartPage.expectItemVisible();
  await cartPage.removeFirstItem();
  await cartPage.expectNoItems();
});
