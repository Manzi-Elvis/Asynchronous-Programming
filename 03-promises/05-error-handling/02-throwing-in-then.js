/**
 * 02-throwing-in-then.js
 *
 * Goal: dig into the "throw inside a handler" case specifically —
 * including throwing inside an ASYNC .then() handler's own nested
 * work (not just synchronously at the top), and confirming both
 * are caught identically.
 */

console.log('--- Synchronous throw at the top of a .then() handler ---');

Promise.resolve(5)
  .then((n) => {
    if (n > 0) {
      throw new Error(`${n} is positive, rejecting`);
    }
    return n;
  })
  .catch((err) => console.log('  caught:', err.message));

console.log('\n--- Throw AFTER some synchronous work inside the handler ---');

Promise.resolve({ items: [] })
  .then((data) => {
    const processed = data.items.map((x) => x * 2); // runs fine, empty array
    if (processed.length === 0) {
      throw new Error('no items to process');
    }
    return processed;
  })
  .catch((err) => console.log('  caught:', err.message));

console.log('\n--- Throw inside a NESTED async operation within .then() ---');

function riskyAsyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // A throw here is fine — we're still inside a Promise
      // executor's synchronous body (the setTimeout callback IS
      // synchronous relative to itself), so this either needs to be
      // wrapped in try/catch and passed to reject(), OR we rely on
      // it happening synchronously within an executor for the
      // auto-conversion to kick in. Here it's inside a nested
      // setTimeout, which is its OWN separate call stack — see the
      // important caveat below.
      try {
        throw new Error('deliberate internal failure');
      } catch (err) {
        reject(err); // MUST manually convert — see the caveat
      }
    }, 20);
  });
}

Promise.resolve('start')
  .then(() => riskyAsyncOperation())
  .catch((err) => console.log('  caught (via manual reject):', err.message));

/**
 * IMPORTANT CAVEAT, revisited from creating-promises/04-executor.js:
 * the automatic throw-to-rejection conversion ONLY applies to
 * SYNCHRONOUS code directly inside an executor or a .then() handler
 * body. The moment you're inside a NESTED callback (a setTimeout, a
 * raw callback-based API, an event handler) within that handler,
 * you're back to manual try/catch + reject(), exactly as shown in
 * riskyAsyncOperation() above. Forgetting this is a common source of
 * "why didn't my .catch() fire" bugs — the answer is usually "the
 * throw happened one async hop too deep for automatic conversion."
 */
