/**
 * Exercise 01 — Build a small callback-based API
 *
 * Build a function `processOrder(order, callback)` that:
 *   1. Validates the order (must have `items` array with length > 0,
 *      and a numeric `total` > 0). If invalid, call
 *      `callback(new Error('...'))` with a descriptive message,
 *      SYNCHRONOUSLY is fine here since validation is cheap and
 *      doesn't involve any real waiting — but see the note below.
 *   2. If valid, simulate "charging a card" asynchronously via
 *      setTimeout (~50ms), then call `callback(null, receipt)` where
 *      `receipt` is an object like:
 *        { orderId: <generate any string/number>, charged: order.total, status: 'success' }
 *
 * This is the error-first shape: callback(err, result) — err is null
 * on success. You'll formalize this convention properly in the next
 * sub-topic (error-first-callbacks/), this exercise just previews it.
 *
 * Requirements:
 *   - Test your function with at least one valid order and at least
 *     two invalid orders (empty items, non-numeric total).
 *   - For each test, log either the error message or the receipt.
 *
 * BONUS (optional): make the validation path ALSO asynchronous
 * (deferred via queueMicrotask), so callback timing is consistent
 * regardless of success/failure — apply the lesson from
 * 03-callback-as-argument.js.
 */

function processOrder(order, callback) {
  // your implementation here
}

// --- Your tests below ---

processOrder({ items: ['book'], total: 25.99 }, (err, receipt) => {
  if (err) {
    console.log('Error:', err.message);
  } else {
    console.log('Receipt:', receipt);
  }
});

processOrder({ items: [], total: 25.99 }, (err, receipt) => {
  // expect an error here
});

processOrder({ items: ['book'], total: 'not-a-number' }, (err, receipt) => {
  // expect an error here
});