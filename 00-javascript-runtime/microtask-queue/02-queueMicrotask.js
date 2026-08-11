/**
 * 02-queueMicrotask.js
 *
 * Goal: use queueMicrotask directly (without a Promise wrapper) and
 * see it obeys the exact same priority rules as .then().
 */

console.log('1: sync');

queueMicrotask(() => {
  console.log('3: queueMicrotask callback');
});

setTimeout(() => {
  console.log('4: setTimeout callback (task, runs after ALL microtasks)');
}, 0);

console.log('2: sync');

/**
 * Order: 1, 2, 3, 4 — queueMicrotask behaves identically in priority
 * to a Promise .then(), it's just a lower-level, more explicit way
 * to schedule a microtask without needing a Promise object at all.
 */

console.log('\n--- When would you actually reach for queueMicrotask? ---');

/**
 * Real use case: deferring a callback just long enough to let the
 * CURRENT synchronous call stack finish (so callers can, for
 * instance, finish attaching their own listeners) but still wanting
 * it to run before any timer or I/O callback — i.e. "as soon as
 * possible, but not literally right now."
 *
 * A common pattern: normalizing a function to ALWAYS be async, even
 * if it sometimes has the answer synchronously available, so callers
 * can treat it consistently.
 */

function getValue(useCache, cachedValue) {
  return new Promise((resolve) => {
    if (useCache) {
      // We already have the answer, but we still defer via
      // queueMicrotask so this function is NEVER accidentally
      // synchronous from the caller's perspective.
      queueMicrotask(() => resolve(cachedValue));
    } else {
      setTimeout(() => resolve('fetched fresh value'), 50);
    }
  });
}

getValue(true, 'cached value').then((v) => console.log('cached path resolved:', v));
getValue(false).then((v) => console.log('fresh path resolved:', v));

console.log('both getValue() calls returned immediately — neither blocked');