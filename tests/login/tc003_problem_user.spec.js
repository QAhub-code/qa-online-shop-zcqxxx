const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const users = require('../../data/users');

test('TC003 — Problem user login succeeds but product images fail to load', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.problem_user.username, users.problem_user.password);
  
  // Verify login succeeds
  await loginPage.expectLoginSuccess();
  await expect(page).toHaveURL(/inventory/);

  // Verify inventory page loads
  await inventoryPage.expectVisible();
  
  // Verify images are showing the 404 error image (sl-404.jpg) instead of real product images
  const totalImages = await inventoryPage.getImageCount();
  expect(totalImages).toBeGreaterThan(0); // Images should exist in the page
  
  // Check that all images are showing the 404 error image
  const showsErrorImages = await inventoryPage.checkImagesShow404Error();
  expect(showsErrorImages).toBe(true); // All images should show 404 error
});
