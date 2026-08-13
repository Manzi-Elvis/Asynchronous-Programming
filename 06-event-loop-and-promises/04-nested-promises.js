/**
 * 04-nested-promises.js
 *
 * Goal: trace what happens when a .then() callback RETURNS another
 * Promise (rather than a plain value) — this adds an EXTRA
 * microtask "hop" before the chain continues, a subtle but important
 * timing detail.
 */

console.log('1: sync start');

Promise.resolve()
  .then(() => {
    console.log('2: first .then');
    return Promise.resolve('nested value');
    // Returning a PROMISE here (not a plain value) means the chain
    // has to wait for THIS promise to settle too, which itself
    // takes an extra microtask tick due to how the Promise
    // Resolution Procedure handles thenables (see module 03,
    // resolution/03-resolve-thenable.js for the deep dive).
  })
  .then((value) => {
    console.log('3: second .then, got:', value);
  });

Promise.resolve().then(() => console.log('extra: a plain, unrelated microtask'));

console.log('4: sync end');

/**
 * Trace (simplified — the exact number of "extra hops" for
 * resolving a returned promise can vary slightly between engines,
 * but the OBSERVABLE consequence is consistent): returning a Promise
 * from a .then() callback takes at least one extra microtask tick
 * to fully resolve compared to returning a plain value, because the
 * engine has to "unwrap" the returned promise (call ITS .then())
 * before it can settle the outer chain's next link.
 *
 * This means: 'extra: a plain, unrelated microtask' can end up
 * printing BEFORE '3: second .then', even though it was scheduled
 * AFTER the whole first .then() chain was set up — because the
 * chain returning a nested Promise pushes its continuation slightly
 * later than a same-tick plain-value chain would.
 *
 * Run this file and observe the ACTUAL order below, then compare to
 * your prediction.
 *
 * Actual output when run:
 *   1: sync start
 *   4: sync end
 *   2: first .then
 *   extra: a plain, unrelated microtask
 *   3: second .then, got: nested value
 *
 * Confirming exactly the prediction above: 'extra' interleaves
 * BETWEEN the two links of the nested-promise chain, because
 * unwrapping the returned Promise('nested value') costs an extra
 * microtask tick that the plain, unrelated microtask gets to run
 * during.
 */