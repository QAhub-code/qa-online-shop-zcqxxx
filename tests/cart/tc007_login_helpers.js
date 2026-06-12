const { login } = require('../../utils/auth');

async function signIn(page, username, password, expectSuccess = true) {
  await page.goto('/');
  await login(page, username, password, { expectSuccess });
}

module.exports = { signIn };