/**
 * Exercise 03 — Build a full async workflow
 *
 * Build `checkoutOrder(cart)` — a realistic e-commerce checkout flow
 * combining everything in this module: sequential dependency,
 * concurrent independent steps, try/catch/finally, and a return
 * value assembled from multiple async results.
 *
 * Flow requirements:
 *   1. Validate the cart (must have at least 1 item) — throw if
 *      invalid, using the provided `validateCart`.
 *   2. CONCURRENTLY: check inventory for ALL items in the cart AND
 *      calculate shipping cost based on cart weight. These two steps
 *      do NOT depend on each other, so they must run concurrently.
 *      Use the provided `checkInventory` and `calculateShipping`.
 *   3. If ANY item is out of stock (checkInventory tells you), throw
 *      an error listing which items are unavailable — do NOT
 *      proceed to charging.
 *   4. SEQUENTIALLY (this genuinely depends on the previous step):
 *      charge the payment using the total (cart total + shipping
 *      cost from step 2), using the provided `chargePayment`. This
 *      must happen only after step 3 confirms everything is in stock.
 *   5. Whether the checkout succeeds or fails, log
 *      "checkout attempt finished" exactly once, using finally.
 *   6. On full success, return
 *      `{ orderId, total, shippingCost, chargeId }`.
 *   7. On any failure, the error should propagate to the caller
 *      (don't swallow it) — but finally must still run first.
 */

function validateCart(cart) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!cart.items || cart.items.length === 0) {
        reject(new Error('Cart is empty'));
        return;
      }
      resolve(true);
    }, 10);
  });
}

function checkInventory(items) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // items with id 'sold-out' are, unsurprisingly, sold out
      const outOfStock = items.filter((item) => item.id === 'sold-out');
      resolve({ allInStock: outOfStock.length === 0, outOfStock });
    }, 40);
  });
}

function calculateShipping(cart) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const weight = cart.items.reduce((sum, item) => sum + (item.weight || 1), 0);
      resolve(Number((weight * 2.5).toFixed(2)));
    }, 30);
  });
}

function chargePayment(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount <= 0) {
        reject(new Error('Invalid charge amount'));
        return;
      }
      resolve({ chargeId: `ch_${Date.now()}`, amount });
    }, 50);
  });
}

async function checkoutOrder(cart) {
  // your implementation here
}

// --- Tests ---

async function runTests() {
  console.log('--- Test 1: successful checkout ---');
  const cart1 = {
    total: 59.98,
    items: [
      { id: 'item-1', price: 29.99, weight: 2 },
      { id: 'item-2', price: 29.99, weight: 1 },
    ],
  };
  try {
    const order = await checkoutOrder(cart1);
    console.log('Order placed:', order);
  } catch (err) {
    console.log('Unexpected failure:', err.message);
  }

  console.log('\n--- Test 2: out of stock item ---');
  const cart2 = {
    total: 29.99,
    items: [{ id: 'sold-out', price: 29.99, weight: 1 }],
  };
  try {
    await checkoutOrder(cart2);
    console.log('This should not print');
  } catch (err) {
    console.log('Correctly failed:', err.message);
  }

  console.log('\n--- Test 3: empty cart ---');
  const cart3 = { total: 0, items: [] };
  try {
    await checkoutOrder(cart3);
    console.log('This should not print');
  } catch (err) {
    console.log('Correctly failed:', err.message);
  }
}

// runTests();