/**
 * 01-basic-finally.js
 *
 * Goal: prove .finally() runs on BOTH the success and failure paths,
 * and that its callback receives no arguments.
 */

console.log('--- Success path ---');
Promise.resolve('success value')
  .then((v) => console.log('  .then():', v))
  .finally(() => console.log('  .finally() ran (no args available here)'));

console.log('\n--- Failure path ---');
Promise.reject(new Error('failure reason'))
  .catch((err) => console.log('  .catch():', err.message))
  .finally(() => console.log('  .finally() ran here too'));

console.log('\n--- .finally() receives NO arguments, on either path ---');

Promise.resolve('a value').finally((...args) => {
  console.log('  args received by onFinally:', args); // [] — always empty
});

Promise.reject(new Error('an error')).finally((...args) => {
  console.log('  args received by onFinally:', args); // also []
}).catch(() => {}); // swallow to avoid an unhandled rejection warning here

/**
 * The empty-args behavior is deliberate: .finally() is meant purely
 * for side effects that don't depend on the OUTCOME, only on the
 * fact that the operation has settled. If you need the actual
 * value/error, you need .then()/.catch(), not .finally().
 */