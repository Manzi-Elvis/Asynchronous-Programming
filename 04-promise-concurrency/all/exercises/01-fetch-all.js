/**
 * Exercise 01 — Fetch all
 *
 * Write a function `fetchAllUsers(ids)` that takes an array of user
 * IDs and returns a Promise resolving to an array of user objects,
 * using Promise.all internally.
 *
 * Use the provided `fetchUser(id)` mock (simulates a network call
 * with random-ish latency and an occasional failure for a specific
 * "poison" ID so you can test the fail-fast behavior).
 *
 * Requirements:
 *   1. `fetchAllUsers([1, 2, 3])` should resolve to an array of 3
 *      user objects, IN ORDER matching the input IDs.
 *   2. `fetchAllUsers([1, 999, 3])` (999 is the poison ID that always
 *      rejects) should REJECT with the specific error from fetching
 *      999 — write a try/catch around your call to prove this.
 *   3. Log how long each call took, to confirm concurrent (not
 *      sequential) execution — should take roughly as long as the
 *      SLOWEST individual fetch, not the sum of all of them.
 */

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    const delayMs = 50 + Math.random() * 100;
    setTimeout(() => {
      if (id === 999) {
        reject(new Error(`User ${id} not found`));
        return;
      }
      resolve({ id, name: `User ${id}` });
    }, delayMs);
  });
}

function fetchAllUsers(ids) {
  // your implementation here
}

async function runTests() {
  console.log('--- Test 1: all valid IDs ---');
  const start1 = Date.now();
  const users = await fetchAllUsers([1, 2, 3]);
  console.log(`Got ${users.length} users in ${Date.now() - start1}ms:`, users);

  console.log('\n--- Test 2: one poison ID, should reject ---');
  try {
    await fetchAllUsers([1, 999, 3]);
    console.log('This should not print');
  } catch (err) {
    console.log('Correctly rejected with:', err.message);
  }
}

// runTests();