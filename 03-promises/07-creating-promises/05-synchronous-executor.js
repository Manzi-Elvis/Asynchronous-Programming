/**
 * 05-synchronous-executor.js
 *
 * Goal: an executor that resolves with NO async work at all — proving
 * a Promise doesn't require a timer, network call, or anything
 * "really async" to exist. It only requires eventually calling
 * resolve/reject, and that can happen instantly.
 */

console.log('1: before');

const instantPromise = new Promise((resolve) => {
  console.log('2: executor running');
  const result = 2 + 2; // pure, instant computation
  resolve(result); // called synchronously, immediately
  console.log('3: resolve() already called, executor about to return');
});

console.log('4: after — Promise is already FULFILLED at this point');
console.log('   (even though nothing async has happened yet)');

instantPromise.then((value) => {
  console.log('5: .then() STILL fires as a microtask, not synchronously:', value);
});

console.log('6: this logs before the .then() callback, proving the delay');

/**
 * Output order: 1, 2, 3, 4, 6, 5
 *
 * This is an important distinction to internalize: "is this Promise
 * settled yet" and "will its handlers run synchronously" are
 * COMPLETELY separate questions. A Promise can be fulfilled the
 * instant it's created, and its .then() handlers will STILL always
 * be deferred to the microtask queue — never run inline. This
 * consistency is one of the core guarantees Promises give you over
 * plain callbacks (see 02-callbacks/callbacks/03-callback-as-argument.js
 * for the exact bug this prevents).
 */

console.log('\n--- A genuinely useful synchronous-executor pattern: memoized/cached values ---');

const cache = new Map();

function getCachedOrCompute(key, computeFn) {
  if (cache.has(key)) {
    // Even on a cache hit (instant, synchronous), we STILL return a
    // proper Promise, so callers never have to check "is this sync
    // or async" — it's always consistently a Promise.
    return Promise.resolve(cache.get(key));
  }
  const value = computeFn();
  cache.set(key, value);
  return Promise.resolve(value);
}

getCachedOrCompute('answer', () => 42).then((v) => console.log('first call (computed):', v));
getCachedOrCompute('answer', () => {
  throw new Error('should never be called — cache hit');
}).then((v) => console.log('second call (cached):', v));