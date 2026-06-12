const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../../pages/inventoryPage');
const { login } = require('../../utils/auth');
const { sortOptions, parsePrices, isSortedAsc, isSortedDesc, isAlphabetical, isReverseAlphabetical } = require('../../utils/sort');
const users = require('../../data/users');

// ============= STANDARD USER TESTS =============

// TC007.1 — Standard user: Verify product list loads
test('TC007.1 — Standard User: Verify product list loads correctly', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();
  const itemCount = await inventoryPage.getItemCount();
  expect(itemCount).toBeGreaterThan(0);
});

// TC007.1a — Locked out user: Verify login fails for locked out account
test('TC007.1a — Locked Out User: Verify locked out user cannot log in', async ({ page }) => {
  await login(page, users.locked_out_user.username, users.locked_out_user.password, { expectSuccess: false });

  await expect(page).not.toHaveURL(/inventory/);
  await expect(page.locator('.error-message-container, [data-test="error"]').first()).toBeVisible();
});

// TC007.2 — Standard user: Verify all product images load correctly
test('TC007.2 — Standard User: Verify all product images load correctly', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();

  const totalImages = await inventoryPage.getImageCount();
  const errorImages = await inventoryPage.getErrorImageCount();

  expect(totalImages).toBeGreaterThan(0);
  expect(errorImages).toBe(0);
});

// TC007.3 — Standard user: Verify product details are complete
test('TC007.3 — Standard User: Verify product details displayed correctly', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();

  const detailsVisible = await inventoryPage.verifyProductDetails();
  expect(detailsVisible).toBe(true);

  const names = await inventoryPage.getProductNames();
  const prices = await inventoryPage.getProductPrices();
  const descriptions = await inventoryPage.getProductDescriptions();

  expect(names.length).toBeGreaterThan(0);
  expect(prices.length).toBeGreaterThan(0);
  expect(descriptions.length).toBeGreaterThan(0);

  names.forEach(name => {
    expect(name.trim().length).toBeGreaterThan(0);
  });
});

// TC007.4 — Standard user: Verify sorting A to Z
test('TC007.4 — Standard User: Verify sorting by Name (A to Z)', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();
  await inventoryPage.sortBy(sortOptions.nameAZ);
  const sortedAtoZ = await inventoryPage.getProductNames();

  expect(sortedAtoZ.length).toBeGreaterThan(0);
  expect(isAlphabetical(sortedAtoZ)).toBe(true);
});

// TC007.5 — Standard user: Verify sorting Z to A
test('TC007.5 — Standard User: Verify sorting by Name (Z to A)', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();
  await inventoryPage.sortBy(sortOptions.nameZA);
  const sortedZtoA = await inventoryPage.getProductNames();

  expect(sortedZtoA.length).toBeGreaterThan(0);
  expect(isReverseAlphabetical(sortedZtoA)).toBe(true);
});

// TC007.6 — Standard user: Verify sorting by Price (low to high)
test('TC007.6 — Standard User: Verify sorting by Price (low to high)', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();
  await inventoryPage.sortBy(sortOptions.priceLowHigh);
  const prices = await inventoryPage.getProductPrices();
  const numericPrices = parsePrices(prices);

  expect(numericPrices.length).toBeGreaterThan(0);
  expect(isSortedAsc(numericPrices)).toBe(true);
});

// TC007.7 — Standard user: Verify sorting by Price (high to low)
test('TC007.7 — Standard User: Verify sorting by Price (high to low)', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();
  await inventoryPage.sortBy(sortOptions.priceHighLow);
  const prices = await inventoryPage.getProductPrices();
  const numericPrices = parsePrices(prices);

  expect(numericPrices.length).toBeGreaterThan(0);
  expect(isSortedDesc(numericPrices)).toBe(true);
});

// TC007.8 — Standard user: Verify product consistency (images match items)
test('TC007.8 — Standard User: Verify product list consistency', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.standard_user.username, users.standard_user.password);

  await inventoryPage.expectVisible();
  const imageCount = await inventoryPage.getImageCount();
  const itemCount = await inventoryPage.getItemCount();

  expect(imageCount).toBe(itemCount);
  expect(itemCount).toBeGreaterThan(0);
});

// ============= PROBLEM USER TESTS =============

// TC007.9 — Problem user: Verify inventory loads despite image errors
test('TC007.9 — Problem User: Verify inventory page loads despite image errors', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.problem_user.username, users.problem_user.password);

  await inventoryPage.expectVisible();
  const itemCount = await inventoryPage.getItemCount();
  expect(itemCount).toBeGreaterThan(0);
});

// TC007.10 — Problem user: Verify images show 404 error
test('TC007.10 — Problem User: Verify product images show 404 error', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.problem_user.username, users.problem_user.password);

  await inventoryPage.expectVisible();
  const showsErrorImages = await inventoryPage.checkImagesShow404Error();
  expect(showsErrorImages).toBe(true);
});

// TC007.11 — Problem user: Verify product details still visible despite image errors
test('TC007.11 — Problem User: Verify product details visible despite image errors', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.problem_user.username, users.problem_user.password);

  await inventoryPage.expectVisible();
  const names = await inventoryPage.getProductNames();
  const prices = await inventoryPage.getProductPrices();
  const descriptions = await inventoryPage.getProductDescriptions();

  expect(names.length).toBeGreaterThan(0);
  expect(prices.length).toBeGreaterThan(0);
  expect(descriptions.length).toBeGreaterThan(0);
});

// TC007.12 — Problem user: Verify sorting dropdown is present
test('TC007.12 — Problem User: Verify sorting dropdown is present', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.problem_user.username, users.problem_user.password);

  await inventoryPage.expectVisible();
  await inventoryPage.expectSortVisible();

  const sortValue = await inventoryPage.getSortDropdownValue();
  expect(sortValue).toBeTruthy();

  await inventoryPage.sortBy(sortOptions.nameAZ);
  expect(await inventoryPage.getSortDropdownValue()).toBe(sortOptions.nameAZ);
});

// TC007.13 — Problem user: Verify product list consistency
test('TC007.13 — Problem User: Verify product count matches items displayed', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await login(page, users.problem_user.username, users.problem_user.password);

  await inventoryPage.expectVisible();
  const itemCount = await inventoryPage.getItemCount();
  const imageCount = await inventoryPage.getImageCount();

  expect(imageCount).toBe(itemCount);
  expect(itemCount).toBeGreaterThan(0);
});
