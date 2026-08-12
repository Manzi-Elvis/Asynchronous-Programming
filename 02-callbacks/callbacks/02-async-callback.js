/**
 * 02-async-callback.js
 *
 * Goal: the same callback pattern from 01, now genuinely
 * asynchronous — the callback is invoked from within a setTimeout,
 * so it fires after the outer function has already returned.
 */

function fetchUserById(id, callback) {
  console.log(`  starting lookup for user ${id}...`);
  setTimeout(() => {
    // This runs LATER, as a task-queue callback, well after
    // fetchUserById() itself has already returned to its caller.
    const user = { id, name: 'Elvis', role: 'engineer' };
    callback(user);
  }, 100);
}

console.log('Calling fetchUserById...');
fetchUserById(1, (user) => {
  console.log('Callback invoked with user:', user);
});
console.log('fetchUserById already returned — this logs BEFORE the callback fires');

/**
 * Output order:
 *   Calling fetchUserById...
 *     starting lookup for user 1...
 *   fetchUserById already returned...
 *   Callback invoked with user: { id: 1, name: 'Elvis', role: 'engineer' }
 *
 * fetchUserById() itself finished executing (returned undefined,
 * nothing captured) LONG before the callback actually runs. This is
 * the crucial mental shift from 01: you cannot "get the result" as a
 * return value from an async function — the ONLY way to receive the
 * result is through the callback, whenever it eventually fires.
 */

// --- Chaining a SINGLE async step off another (previewing callback hell) ---

function fetchOrdersForUser(userId, callback) {
  console.log(`  fetching orders for user ${userId}...`);
  setTimeout(() => {
    callback([
      { id: 1, total: 42.5 },
      { id: 2, total: 15.0 },
    ]);
  }, 80);
}

fetchUserById(2, (user) => {
  console.log('Got user:', user.name);
  // To use the result of ANOTHER async operation, we have to call it
  // FROM INSIDE this callback — there's no other way to sequence
  // dependent async steps with plain callbacks. This nesting is
  // exactly what callback-hell/ names and addresses directly.
  fetchOrdersForUser(user.id, (orders) => {
    console.log('Got orders:', orders);
  });
});