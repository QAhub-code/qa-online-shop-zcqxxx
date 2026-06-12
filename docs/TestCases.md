# Test Cases

## Test Design Approach

This automation suite focuses on the most critical business flows of the Online Shop application:

1. Authentication
2. Product browsing
3. Shopping cart management
4. Checkout process
5. Logout

Additional user profiles (`error_user` and `visual_user`) were also validated to increase confidence in application stability.

---

## Login Scenarios

| ID    | Test Case                     | Expected Result                        |
|-------|-------------------------------|----------------------------------------|
| TC001 | Standard user login           | Login successful                       |
| TC002 | Locked user login             | Login denied with error message        |
| TC003 | Problem user login            | Login successful                       |
| TC004 | Performance glitch user login | Login successful despite slow response |
| TC005 | Error user login              | Login successful                       |
| TC006 | Visual user login             | Login successful                       |

---

## Inventory Scenarios

| ID    | Test Case            | Expected Result                    |
|-------|----------------------|------------------------------------|
| TC007 | Display product list | Product list is visible            |
| TC008 | Verify product count | Product count is greater than zero |

---

## Cart Scenarios

| ID    | Test Case                | Expected Result           |
|-------|--------------------------|---------------------------|
| TC009 | Add product to cart      | Cart badge updated        |
| TC010 | Remove product from cart | Product removed from cart |

---

## Checkout Scenarios

| ID    | Test Case                       | Expected Result                 |
|-------|---------------------------------|---------------------------------|
| TC011 | Checkout with valid information | Checkout completed successfully |

---

## Logout Scenarios

| ID    | Test Case               | Expected Result               |
|-------|-------------------------|-------------------------------|
| TC012 | Logout from application | User redirected to login page |