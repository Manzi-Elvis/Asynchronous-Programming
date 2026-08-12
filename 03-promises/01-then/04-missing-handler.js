/**
 * 04-missing-handler.js
 *
 * Goal: understand value/error PASS-THROUGH when a .then()/.catch()
 * doesn't have the handler needed to intercept what's currently
 * flowing through the chain.
 */

console.log('--- .then() without an onRejected handler: rejection passes through untouched ---');

Promise.reject(new Error('original error'))
  .then((v) => {
    // This onFulfilled handler is simply SKIPPED for a rejected
    // Promise — it doesn't run, and doesn't interfere.
    console.log('  never runs:', v);
  })
  // no second argument here, so the rejection just continues down
  // the chain, looking for the next handler that CAN handle it
  .catch((err) => {
    console.log('  finally caught further down:', err.message);
  });

console.log('\n--- .catch() when there was no error: fulfillment passes through untouched ---');

Promise.resolve('all good')
  .catch((err) => {
    // Never runs — .catch() only intercepts rejections. A fulfilled
    // value just skips right past it.
    console.log('  never runs:', err);
  })
  .then((v) => {
    console.log('  fulfilled value passed straight through:', v);
  });

console.log('\n--- Multiple .then() calls, some without onFulfilled, still relay correctly ---');

Promise.resolve(1)
  .then((n) => n + 1) // 2
  .then() // no-op, value passes through unchanged
  .then((n) => n + 1) // 3
  .then((n) => console.log('  final:', n));

/**
 * The general rule: a Promise chain is a RELAY. Each link only
 * intercepts the type of outcome it's built for — .then()'s first
 * argument for fulfillments, .catch() (or .then()'s second argument)
 * for rejections. Anything a given link isn't built to intercept
 * just passes straight through to the next link, unchanged, looking
 * for a handler that IS built to receive it.
 */