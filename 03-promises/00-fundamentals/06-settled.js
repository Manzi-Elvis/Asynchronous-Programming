/**
 * 06-settled.js
 *
 * Goal: PROVE that settling is permanent — calling resolve/reject
 * again after a Promise has already settled is silently a no-op,
 * no matter how you try to trigger it.
 */

console.log('--- Calling resolve() twice ---');

const p1 = new Promise((resolve, reject) => {
  resolve('first value');
  resolve('second value'); // silently ignored — already settled
  reject(new Error('this is also ignored')); // ALSO ignored
});

p1.then((v) => console.log('  p1 resolved with:', v)); // always 'first value'

console.log('\n--- Calling resolve() asynchronously, twice ---');

const p2 = new Promise((resolve) => {
  setTimeout(() => resolve('async first'), 20);
  setTimeout(() => resolve('async second — ignored'), 40);
});

p2.then((v) => console.log('  p2 resolved with:', v)); // always 'async first'

console.log('\n--- Attaching .then() AFTER a Promise already settled ---');

const p3 = Promise.resolve('already done');

setTimeout(() => {
  // Attaching a handler LONG after settling still works perfectly —
  // the settled value is remembered forever, and .then() just
  // delivers it (as a fresh microtask) whenever you ask.
  p3.then((v) => console.log('  late .then() still gets:', v));
}, 100);

console.log('\n--- Manually reimplementing "settle once" to see WHY it matters ---');

/**
 * If Promises did NOT enforce settle-once, code like this would be
 * fragile: multiple parts of a codebase could each try to "resolve"
 * the same shared Promise-like object with conflicting values, and
 * whichever ran LAST would silently win — a nightmare to debug. This
 * is exactly problem #1 from module 02's inversion-of-control notes
 * (called too many times), and Promises make it a non-issue by
 * design, not by convention.
 */

function unsafeResolveMoreThanOnce() {
  let resolvedValue;
  let hasSettled = false;
  const fakeCallback = (v) => {
    if (hasSettled) {
      console.log('  (a real Promise would have silently ignored this) attempted second resolve:', v);
      return;
    }
    hasSettled = true;
    resolvedValue = v;
    console.log('  settled with:', v);
  };
  fakeCallback('correct value');
  fakeCallback('an accidental duplicate call, e.g. from a buggy library');
  return resolvedValue;
}

unsafeResolveMoreThanOnce();