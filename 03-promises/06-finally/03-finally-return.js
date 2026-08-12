/**
 * 03-finally-return.js
 *
 * Goal: prove .finally() is TRANSPARENT to the value/error passing
 * through it (its own return value is normally IGNORED), but that a
 * THROW inside .finally() does override the outcome.
 */

console.log('--- .finally()\'s return value is normally ignored ---');

Promise.resolve('original value')
  .finally(() => {
    return 'a value returned from onFinally'; // IGNORED
  })
  .then((v) => {
    console.log('  next .then() still sees the ORIGINAL value:', v);
  });

console.log('\n--- Same for a rejection: onFinally\'s return does not "fix" it ---');

Promise.reject(new Error('original error'))
  .finally(() => {
    return 'trying to recover'; // still IGNORED — does NOT recover the chain
  })
  .catch((err) => {
    console.log('  still rejected with the ORIGINAL error:', err.message);
  });

console.log('\n--- But a THROW inside .finally() DOES override the outcome ---');

Promise.resolve('would have been fine')
  .finally(() => {
    throw new Error('thrown from within onFinally');
  })
  .then((v) => console.log('  never runs:', v))
  .catch((err) => {
    console.log('  the throw inside .finally() became the new rejection:', err.message);
  });

console.log('\n--- A .finally() that returns a PENDING Promise also delays the chain ---');

Promise.resolve('value')
  .finally(() => {
    // Returning a Promise from onFinally doesn't change the eventual
    // VALUE (still ignored), but the chain DOES wait for it to
    // settle before continuing — useful if cleanup itself is async
    // (e.g. actually awaiting connection.close()).
    return new Promise((resolve) => setTimeout(resolve, 50));
  })
  .then((v) => {
    console.log('  chain waited for the async cleanup, THEN continued with:', v);
  });

/**
 * Summary:
 *   - onFinally's return VALUE: ignored, chain continues with the
 *     original value/error
 *   - onFinally's THROW: overrides the outcome, becomes the new
 *     rejection
 *   - onFinally returning a PENDING Promise: chain waits for it,
 *     but still discards its resolved VALUE afterward
 * This asymmetry (throws matter, return values don't) mirrors how
 * a real try/finally block works in synchronous JS.
 */