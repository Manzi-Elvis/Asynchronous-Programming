/**
 * 02-resolve-promise.js
 *
 * Goal: the "adoption" behavior — resolving with ANOTHER Promise
 * makes the outer Promise wait for and mirror the inner one, rather
 * than fulfilling immediately with "a Promise" as its value.
 */

console.log('--- Outer adopts inner\'s eventual FULFILLMENT ---');

const innerFulfills = new Promise((resolve) => {
  setTimeout(() => resolve('inner value, 50ms later'), 50);
});

const outerAdoptsFulfillment = new Promise((resolve) => {
  console.log('  calling resolve(innerFulfills) — NOT fulfilled yet');
  resolve(innerFulfills);
});

console.log('  outer state right after construction: still pending, waiting on inner');

outerAdoptsFulfillment.then((v) => {
  console.log('  outer eventually fulfilled with:', v); // the INNER value, unwrapped
});

console.log('\n--- Outer adopts inner\'s eventual REJECTION too ---');

const innerRejects = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('inner failed, 50ms later')), 50);
});

const outerAdoptsRejection = new Promise((resolve) => {
  resolve(innerRejects); // called RESOLVE, not reject — but the outcome still follows inner
});

outerAdoptsRejection
  .then((v) => console.log('  never runs:', v))
  .catch((err) => {
    // Notice: we called resolve(innerRejects), NOT reject(...), yet
    // the outer Promise still ends up REJECTED. "Resolve" really
    // means "this outcome is now determined by that other thing,"
    // not "this will succeed."
    console.log('  outer REJECTED even though we called resolve():', err.message);
  });

console.log('\n--- Multiple levels of nesting all get flattened to ONE level ---');

const deeplyNested = Promise.resolve(Promise.resolve(Promise.resolve('deeply nested value')));

deeplyNested.then((v) => {
  // NOT a Promise<Promise<Promise<string>>> — fully flattened to
  // just the string, no matter how many layers of Promise.resolve()
  // wrapped it.
  console.log('  fully flattened value:', v);
});

console.log('  deeplyNested itself:', deeplyNested); // Promise { <pending> } right after creation
