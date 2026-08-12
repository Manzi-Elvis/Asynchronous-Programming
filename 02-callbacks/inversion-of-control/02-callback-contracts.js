/**
 * 02-callback-contracts.js
 *
 * Goal: write a callback-based API that DOCUMENTS its contract in
 * comments and actively DEFENDS a few of the guarantees a Promise
 * would give you for free — to feel exactly how much manual
 * discipline is required to approximate what Promises do
 * automatically.
 */

/**
 * Contract for `safeAsyncOperation(input, callback)`:
 *   - callback will be invoked EXACTLY ONCE, always asynchronously
 *     (never synchronously, even on validation failure)
 *   - callback(err, result) — error-first convention
 *   - if `input` is invalid, err will be an Error with a descriptive
 *     message and result will be undefined
 *   - if the internal work throws unexpectedly, that will ALSO be
 *     delivered as `err`, never as an uncaught exception
 */
function safeAsyncOperation(input, callback) {
  let hasCalledBack = false;

  function safeCallback(err, result) {
    if (hasCalledBack) {
      // Enforce "exactly once" ourselves — nothing in plain JS does
      // this for us the way a Promise's internal state machine would.
      console.warn('  [contract violation prevented] callback already fired, ignoring extra call');
      return;
    }
    hasCalledBack = true;
    callback(err, result);
  }

  // Force asynchronicity even on the validation fast-path, so timing
  // is ALWAYS consistent for callers (see callbacks/03-callback-as-argument.js).
  queueMicrotask(() => {
    try {
      if (typeof input !== 'number') {
        safeCallback(new Error('input must be a number'));
        return;
      }
      if (input < 0) {
        safeCallback(new Error('input must be non-negative'));
        return;
      }

      // Simulate real async work.
      setTimeout(() => {
        try {
          if (input === 13) {
            // Simulate an unexpected internal throw — without our
            // try/catch here, this would become an UNCAUGHT
            // exception inside a setTimeout callback, which cannot
            // be caught by the caller's try/catch AT ALL (see
            // error-first-callbacks/NOTES.md for why).
            throw new Error('unlucky number internal failure');
          }
          safeCallback(null, Math.sqrt(input));
        } catch (internalErr) {
          // Converting a thrown exception into an error-first
          // callback call is exactly the kind of manual plumbing
          // Promises give you automatically (any throw inside a
          // Promise executor or .then() becomes a rejection, no
          // try/catch required from you).
          safeCallback(internalErr);
        }
      }, 20);
    } catch (syncErr) {
      safeCallback(syncErr);
    }
  });
}

console.log('--- Exercising the documented contract ---');

safeAsyncOperation(16, (err, result) => {
  console.log('16 ->', err ? err.message : result);
});

safeAsyncOperation(-4, (err, result) => {
  console.log('-4 ->', err ? err.message : result);
});

safeAsyncOperation('not a number', (err, result) => {
  console.log("'not a number' ->", err ? err.message : result);
});

safeAsyncOperation(13, (err, result) => {
  console.log('13 (internal throw case) ->', err ? err.message : result);
});

console.log('All safeAsyncOperation calls returned immediately (async, as contracted)');

/**
 * Everything demonstrated above — call-once guarding, forced
 * asynchronicity, catching internal throws and converting them to
 * error-first callbacks — is code YOU have to write and maintain,
 * for every single callback-based function, if you want the
 * guarantees Promises provide natively. Multiply this by every
 * async function in a real codebase and the appeal of Promises
 * becomes obvious: it's not about prettier syntax, it's about not
 * needing to reinvent this plumbing over and over.
 */