/**
 * 05-then-is-always-async.js
 *
 * Goal: one more, denser reinforcement of the "handlers are always
 * microtasks" guarantee, specifically showing it holds true across
 * an ENTIRE chain, not just the first link.
 */

console.log('1: sync start');

Promise.resolve('a')
  .then((v) => {
    console.log('3: first .then (microtask)');
    return v + 'b';
  })
  .then((v) => {
    console.log('4: second .then (another microtask, queued from within the first)');
    return v + 'c';
  })
  .then((v) => {
    console.log('5: third .then, final value:', v);
  });

setTimeout(() => {
  console.log('6: setTimeout (task) — runs AFTER the entire chain above');
}, 0);

console.log('2: sync end');

/**
 * Output: 1, 2, 3, 4, 5, 6
 *
 * Every link in the chain — even though there's no real waiting
 * involved anywhere — still gets deferred to its own microtask turn.
 * And the ENTIRE chain (all three .then() calls) finishes before the
 * setTimeout task runs, because each .then() callback, when it
 * finishes, immediately queues the NEXT link as a new microtask,
 * and the microtask queue is drained completely before any task runs
 * (see 00-javascript-runtime/microtask-queue/03-microtask-priority.js
 * for the underlying mechanism this relies on).
 *
 * Practical implication: a long .then() chain of purely synchronous
 * transformations still completes entirely within "microtask time" —
 * it will always finish before the next setTimeout(fn, 0), no matter
 * how many links are in the chain (within reason — an enormous chain
 * could theoretically approach microtask starvation, covered in
 * module 00).
 */