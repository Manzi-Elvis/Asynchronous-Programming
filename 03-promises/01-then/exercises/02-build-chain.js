/**
 * Exercise 02 — Build a data-processing chain
 *
 * Starting from Promise.resolve(rawOrder), build a .then() CHAIN
 * (no nesting) that:
 *   1. Validates the order (items.length > 0, total > 0) — throw a
 *      descriptive Error if invalid
 *   2. Applies a 10% discount if total > 100
 *   3. Adds a flat $5 shipping fee
 *   4. Rounds the final total to 2 decimal places
 *   5. Returns a new object: { ...originalOrder, finalTotal }
 *
 * Attach a single .catch() at the end that logs any validation
 * failure. Test with at least one valid and one invalid order.
 */

const rawOrder = { items: ['keyboard', 'mouse'], total: 150 };
const invalidOrder = { items: [], total: 0 };

// your chain here, for rawOrder
Promise.resolve(rawOrder);
// ...

// your chain here, for invalidOrder
Promise.resolve(invalidOrder);
// ...