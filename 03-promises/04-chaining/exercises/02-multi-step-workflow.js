/**
 * Exercise 02 — Multi-step workflow with conditional branching
 *
 * Build a chain for an "order fulfillment" workflow:
 *   1. checkInventory(order) -> resolves with { order, inStock: bool }
 *   2. If inStock is false: recover in a .catch()-like way (you'll
 *      need a .then() with a conditional, since this isn't a
 *      rejection — it's a successful check that just says "no stock")
 *      by calling backorderItem(order) instead of shipping
 *   3. If inStock is true: call chargePayment(order) then
 *      shipOrder(order)
 *   4. Either path should end with a single final .then() that logs
 *      the outcome, and a single .catch() for actual failures
 *      (payment failures, etc.)
 *
 * This exercise is about handling BRANCHING logic inside a chain
 * cleanly — a common real need that's easy to make messy.
 */

function checkInventory(order) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ order, inStock: order.item !== 'rare-item' }), 15);
  });
}

function chargePayment(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.total <= 0) {
        reject(new Error('Invalid payment amount'));
        return;
      }
      resolve({ order, charged: order.total });
    }, 15);
  });
}

function shipOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ order, shipped: true, trackingId: 'TRACK123' }), 15);
  });
}

function backorderItem(order) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ order, backordered: true }), 15);
  });
}

function fulfillOrder(order) {
  // your implementation here — build the chain
}

// --- Your tests below ---

fulfillOrder({ item: 'widget', total: 29.99 })
  .then((result) => console.log('in-stock order result:', result))
  .catch((err) => console.log('unexpected failure:', err.message));

fulfillOrder({ item: 'rare-item', total: 199.99 })
  .then((result) => console.log('rare-item order result:', result))
  .catch((err) => console.log('unexpected failure:', err.message));

fulfillOrder({ item: 'widget', total: 0 })
  .then((result) => console.log('unexpected success:', result))
  .catch((err) => console.log('expected payment failure:', err.message));
