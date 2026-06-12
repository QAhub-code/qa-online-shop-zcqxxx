const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const users = require('../../data/users');

test('TC002 — Locked out user login fails with error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.locked_out_user.username, users.locked_out_user.password);
  
  // Verify login fails with error message displayed
  await loginPage.expectLoginError();
  
  // Verify user is NOT redirected to inventory (still on login page)
  await expect(page).not.toHaveURL(/inventory/);
  await expect(page).toHaveURL(/login|\/$/);
});
