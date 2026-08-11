/**
 * 03-microtask-priority.js
 *
 * Goal: see microtasks scheduling MORE microtasks, all draining
 * before a single task gets a turn — and understand microtask
 * starvation as a real risk, safely bounded here so it doesn't hang.
 */

console.log('1: sync start');

setTimeout(() => {
  console.log('LAST: task finally runs, after ALL microtask chaining below');
}, 0);

let chainCount = 0;
const MAX_CHAIN = 5; // bounded on purpose — see the warning below

function scheduleMicrotask() {
  chainCount++;
  Promise.resolve().then(() => {
    console.log(`microtask chain link #${chainCount}`);
    if (chainCount < MAX_CHAIN) {
      scheduleMicrotask(); // each microtask schedules ANOTHER microtask
    }
  });
}

scheduleMicrotask();

console.log('2: sync end');

/**
 * Output: sync lines first, then all 5 chain links back-to-back,
 * THEN finally the task. Even though the task was registered with
 * 0ms delay and BEFORE the microtask chain even started, it has to
 * wait for the entire (self-extending) microtask chain to finish.
 *
 * --- THE STARVATION WARNING ---
 *
 * If MAX_CHAIN did not exist and scheduleMicrotask() called itself
 * UNCONDITIONALLY forever, the microtask queue would NEVER fully
 * drain. The event loop would be stuck in step 1 (drain microtasks)
 * permanently. Consequences:
 *
 *   - The setTimeout above would NEVER fire, no matter how long you
 *     wait — not delayed, literally never.
 *   - In a browser, the page would completely freeze: no repaints,
 *     no click handlers, no anything, because the loop never
 *     reaches the "let the browser do other things" step.
 *   - In Node, the process would appear completely hung, with 100%
 *     CPU usage and zero responsiveness, while LOOKING like it's
 *     "doing async work."
 *
 * This is a real bug pattern, most often caused by recursive
 * `.then()` chains, or `async` functions that `await` something
 * already-resolved in a tight, unbounded loop. If you ever see a
 * Node process pegging a CPU core while appearing to hang, an
 * unbounded microtask chain is a prime suspect.
 */