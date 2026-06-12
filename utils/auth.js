const { expect } = require('@playwright/test');

async function login(page, username = 'standard_user', password = 'secret_sauce', options = {}) {
  const { expectSuccess = true, timeout = 10000 } = options;
  await page.goto('/');
  await page.locator('#user-name').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('#login-button').click();

  if (expectSuccess) {
    await expect(page).toHaveURL(/inventory/, { timeout });
  } else {
    await expect(page.locator('.error-message-container, [data-test="error"]').first()).toBeVisible({ timeout });
  }
}

module.exports = { login };
