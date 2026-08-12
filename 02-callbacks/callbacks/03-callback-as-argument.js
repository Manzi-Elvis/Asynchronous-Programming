/**
 * 03-callback-as-argument.js
 *
 * Goal: expose a real, subtle bug class — a function that SOMETIMES
 * calls its callback synchronously and SOMETIMES asynchronously,
 * depending on a branch (e.g. cache hit vs cache miss). This breaks
 * the caller's assumptions about ordering in ways that are very hard
 * to debug, because it "usually" works.
 */

const cache = new Map();

// --- THE BUG: inconsistent timing ---
function getValueBuggy(key, callback) {
  if (cache.has(key)) {
    // Cache hit: calls back IMMEDIATELY, synchronously.
    callback(cache.get(key));
  } else {
    // Cache miss: calls back LATER, asynchronously.
    setTimeout(() => {
      const value = `computed-value-for-${key}`;
      cache.set(key, value);
      callback(value);
    }, 50);
  }
}

console.log('--- Demonstrating the bug ---');

let flag = 'not set';
getValueBuggy('a', (value) => {
  flag = 'set by callback';
  console.log('  (miss path) callback fired, flag is now:', flag);
});
console.log('Right after calling getValueBuggy for "a" (a MISS): flag =', flag);
// flag is still 'not set' here — correct, because the miss path is async

// Prime the cache, then call again with the SAME key:
setTimeout(() => {
  console.log('\n--- Second call, same key, now a cache HIT ---');
  let flag2 = 'not set';
  getValueBuggy('a', (value) => {
    flag2 = 'set by callback';
    console.log('  (hit path) callback fired, flag2 is now:', flag2);
  });
  console.log('Right after calling getValueBuggy for "a" (a HIT): flag2 =', flag2);
  // flag2 is ALREADY 'set by callback' here — the hit path ran
  // SYNCHRONOUSLY, before this console.log even executed. Same
  // function, same call shape, DIFFERENT ordering behavior depending
  // on internal state the caller can't see or predict.
}, 100);

/**
 * Why this matters: code that assumes "the callback always runs
 * later" (a very natural assumption for async APIs) can break in
 * subtle ways on the synchronous branch — for example, a caller that
 * sets up state BEFORE calling getValueBuggy and expects the
 * callback to see that state will get inconsistent behavior between
 * hits and misses. Bugs like this often only show up under specific
 * cache states in production and are miserable to reproduce.
 */

console.log('\n--- THE FIX: always call back asynchronously, even on a "fast path" ---');

function getValueFixed(key, callback) {
  if (cache.has(key)) {
    // Even on a synchronous cache hit, defer the callback via
    // queueMicrotask (or setTimeout) so timing is ALWAYS consistent
    // for callers, regardless of internal branch taken.
    queueMicrotask(() => callback(cache.get(key)));
  } else {
    setTimeout(() => {
      const value = `computed-value-for-${key}`;
      cache.set(key, value);
      callback(value);
    }, 50);
  }
}

let flag3 = 'not set';
getValueFixed('a', () => {
  flag3 = 'set by callback';
});
console.log('Immediately after getValueFixed (should ALWAYS be "not set"):', flag3);

/**
 * Rule of thumb: an async-style function should NEVER resolve its
 * callback synchronously, even when it technically could. Always
 * force it onto a queue (microtask or task) so callers can rely on
 * consistent "this always happens later" semantics. Promises enforce
 * this automatically for you — see module 03 — which is one of the
 * quieter but genuinely important reasons they're safer than plain
 * callbacks.
 */