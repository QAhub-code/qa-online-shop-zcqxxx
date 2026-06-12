const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const { Navigation } = require('../../utils/navigation');
const users = require('../../data/users');

test('TC012 — Logout from application', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const navigation = new Navigation(page);

  await loginPage.goto();
  await loginPage.login(users.standard_user.username, users.standard_user.password);
  await loginPage.expectLoginSuccess();

  await inventoryPage.expectVisible();
  await navigation.logout();
  await navigation.expectLoggedOut();
});
