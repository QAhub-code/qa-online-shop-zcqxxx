const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const users = require('../../data/users');

test('TC004 — Performance glitch user login succeeds despite slow loading', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.performance_glitch_user.username, users.performance_glitch_user.password);
  
  // Verify login succeeds despite slow page load times
  await loginPage.expectLoginSuccess();
  await expect(page).toHaveURL(/inventory/);
  
  // Verify inventory page loads and is accessible
  await inventoryPage.expectVisible();
});
