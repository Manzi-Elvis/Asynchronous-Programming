/**
 * Exercise 01 — Resource cleanup with .finally()
 *
 * Build `withLock(resourceName, operation)`:
 *   - "Acquires a lock" (just log `Lock acquired: <resourceName>`)
 *   - Runs `operation()` (a function returning a Promise)
 *   - "Releases the lock" (log `Lock released: <resourceName>`) in a
 *     .finally(), guaranteeing it happens whether operation()
 *     succeeds or fails
 *   - Propagates operation()'s result/error to the caller unchanged
 *
 * Then write a small in-memory "lock tracker" (a Set of currently
 * locked resource names) and use withLock to guarantee a resource
 * is ALWAYS removed from the set when the operation finishes, no
 * matter what. Test with both a succeeding and a failing operation,
 * and assert (via console.log) that the lock set is empty after
 * each one completes.
 */

const lockedResources = new Set();

function withLock(resourceName, operation) {
  // your implementation here
}

// --- Your tests below ---

function fakeSucceedingWrite() {
  return new Promise((resolve) => setTimeout(() => resolve('write ok'), 20));
}

function fakeFailingWrite() {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('disk full')), 20));
}

async function main() {
  await withLock('users.db', fakeSucceedingWrite).then((r) => console.log('result:', r));
  console.log('locked resources after success:', lockedResources); // should be empty

  await withLock('users.db', fakeFailingWrite).catch((err) => console.log('error:', err.message));
  console.log('locked resources after failure:', lockedResources); // should be empty too
}

// main();