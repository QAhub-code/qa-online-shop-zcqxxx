const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const users = require('../../data/users');

test('TC001 — Standard user login succeeds with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard_user.username, users.standard_user.password);
  
  // Verify login success and redirection to products page
  await loginPage.expectLoginSuccess();
  await expect(page).toHaveURL(/inventory/);
  
  // Verify products page loads and contains items
  await inventoryPage.expectVisible();
  const itemCount = await inventoryPage.getItemCount();
  expect(itemCount).toBeGreaterThan(0);
});
