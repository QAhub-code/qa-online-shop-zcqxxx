const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const { CartPage } = require('../../pages/cartPage');
const { CheckoutPage } = require('../../pages/checkoutPage');
const users = require('../../data/users');
const testData = require('../../data/testData');

test('TC011 — Checkout with valid information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard_user.username, users.standard_user.password);
  await loginPage.expectLoginSuccess();

  await inventoryPage.addFirstProductToCart();
  await inventoryPage.gotoCart();

  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInformation(testData.validCheckout);
  await checkoutPage.continue();
  await checkoutPage.finish();
  await checkoutPage.expectComplete();
});
