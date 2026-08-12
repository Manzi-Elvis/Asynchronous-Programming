/**
 * 01-basic-catch.js
 *
 * Goal: prove .catch(fn) is EXACTLY .then(undefined, fn) — not just
 * similar, but literally equivalent behavior.
 */

console.log('--- .catch() ---');
Promise.reject(new Error('via .catch()'))
  .catch((err) => console.log('  caught:', err.message));

console.log('--- .then(undefined, fn) ---');
Promise.reject(new Error('via .then(undefined, fn)'))
  .then(undefined, (err) => console.log('  caught:', err.message));

/**
 * Both produce identical behavior. The ONLY difference is
 * readability — .catch() signals "this handles errors" more clearly
 * at a glance than a .then() call with an undefined first argument.
 */

console.log('\n--- .catch() also passes fulfilled values straight through ---');

Promise.resolve('all good')
  .catch((err) => console.log('  never runs'))
  .then((v) => console.log('  fulfilled value untouched:', v));

console.log('\n--- Chaining .catch() in the middle of a chain, not just at the end ---');

Promise.reject(new Error('early failure'))
  .catch((err) => {
    console.log('  caught mid-chain:', err.message);
    return 'recovered value'; // covered fully in 03-catch-recovery.js
  })
  .then((v) => {
    console.log('  chain continues normally with:', v);
  });

/**
 * A common misconception: .catch() must be the LAST thing in a
 * chain. It doesn't — you can catch, recover, and keep chaining
 * .then() calls afterward, exactly like any other link. See
 * 03-catch-recovery.js for the full treatment of this pattern.
 */