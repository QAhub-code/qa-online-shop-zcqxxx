const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const users = require('../../data/users');

test('TC005 — Error user login succeeds', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.error_user.username, users.error_user.password);
  
  // Verify login succeeds
  await loginPage.expectLoginSuccess();
  await expect(page).toHaveURL(/inventory/);
  
  // Verify inventory page is accessible
  await inventoryPage.expectVisible();
});
