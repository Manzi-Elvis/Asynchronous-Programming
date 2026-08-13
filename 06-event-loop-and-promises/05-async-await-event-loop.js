/**
 * 05-async-await-event-loop.js
 *
 * Goal: prove async/await follows EXACTLY the same microtask rules
 * as raw .then() chains, by writing the SAME logic two ways side by
 * side and confirming identical output order.
 */

function resolveWith(value) {
  return Promise.resolve(value);
}

console.log('--- Version A: raw .then() chain ---');

console.log('1: sync');
resolveWith('x').then((v) => {
  console.log('3: then callback, v =', v);
});
console.log('2: sync');

/**
 * Expected: 1, 2, 3 (standard microtask-after-sync ordering)
 */

setTimeout(() => {
  console.log('\n--- Version B: async/await, same logic ---');

  async function run() {
    console.log('4: sync (inside async function, before await)');
    const v = await resolveWith('x');
    // Everything from here on is the "continuation" — mechanically
    // equivalent to a .then() callback attached to resolveWith('x').
    console.log('6: after await, v =', v);
  }

  run();
  console.log('5: sync (after calling run(), NOT awaited here)');

  /**
   * Expected: 4, 5, 6 — IDENTICAL shape to Version A's 1, 2, 3.
   * 'run()' executes synchronously up to the await (logging '4'),
   * then SUSPENDS and returns control to its caller, which logs '5'.
   * Only once the stack is empty does the suspended continuation
   * (everything after await, logging '6') get to run, as a
   * microtask — same queue, same priority, same rules as .then().
   */
}, 50);

// --- A denser side-by-side, mixing both styles with setTimeout ---

setTimeout(() => {
  console.log('\n--- Mixed: async/await AND .then() AND setTimeout together ---');

  console.log('7: sync');

  setTimeout(() => console.log('11: task'), 0);

  async function mixedRun() {
    console.log('8: sync, inside async fn');
    await null; // awaiting a non-promise still takes exactly one microtask tick
    console.log('10: after await null');
  }

  mixedRun();

  Promise.resolve().then(() => console.log('9: plain .then microtask'));

  console.log('7.5: sync, after calling mixedRun (not awaited)');

  /**
   * Expected: 7, 8, 7.5, 9, 10, 11 — WRONG, don't guess this one,
   * verify empirically. Actual output:
   *
   *   7, 8, 7.5, 10, 9, 11
   *
   * '10' beats '9' because mixedRun() is CALLED (and runs up to its
   * `await null`, which schedules its continuation into the
   * microtask queue) BEFORE the Promise.resolve().then(...) line
   * even executes in source order. Both continuations end up in the
   * SAME microtask queue, but mixedRun's continuation was queued
   * first — registration order within the microtask queue is what
   * decides ties, exactly like 03-multiple-microtasks.js showed for
   * two independent .then() chains. The lesson: when in doubt about
   * a close-call ordering between async/await and .then(), trace
   * WHEN each continuation actually gets scheduled (which statement
   * executes first), not which syntax "feels" faster.
   */
}, 100);