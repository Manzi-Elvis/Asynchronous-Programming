/**
 * 06-microtask-starvation.js
 *
 * Goal: revisit microtask starvation (first introduced in module 00,
 * microtask-queue/03-microtask-priority.js) with the full mental
 * model from this module — showing it via async/await recursion too
 * (a more realistic real-world trigger than manual .then() chains),
 * and being explicit about the exact mechanism.
 *
 * As before, this is deliberately BOUNDED so it terminates safely —
 * read the warning at the bottom for what happens unbounded.
 */

console.log('1: sync start');

setTimeout(() => {
  console.log('LAST: this task finally runs, after the entire bounded chain below');
}, 0);

// A common REAL-WORLD way this happens by accident: a recursive
// async function that keeps awaiting already-resolved values in a
// loop, perhaps polling some in-memory state without ever yielding
// to a real (task-queue-based) delay.
async function pollUntilReady(attempt, maxAttempts) {
  console.log(`  poll attempt ${attempt}`);
  if (attempt >= maxAttempts) {
    console.log('  giving up (bounded on purpose for this demo)');
    return;
  }
  // BUG PATTERN: awaiting something that resolves IMMEDIATELY
  // (Promise.resolve(), or in this case a resolved value with no
  // real delay) means this recursive call keeps re-entering the
  // microtask queue, over and over, WITHOUT ever letting the task
  // queue (where our setTimeout above is waiting) get a turn.
  await Promise.resolve();
  await pollUntilReady(attempt + 1, maxAttempts);
}

pollUntilReady(1, 5).then(() => {
  console.log('2: sync end (well, this runs after the bounded chain, not truly sync)');
});

console.log('2: sync end');

/**
 * Even though maxAttempts is small (5) here, notice the setTimeout's
 * "LAST" log still only fires AFTER all 5 poll attempts finish —
 * because every `await Promise.resolve()` inside pollUntilReady
 * queues a microtask, and the event loop will not touch the task
 * queue until the ENTIRE microtask queue (including all these
 * self-perpetuating recursive continuations) is empty.
 *
 * --- THE UNBOUNDED VERSION (do not run — this would hang forever) ---
 *
 * async function pollForeverBuggy() {
 *   await Promise.resolve();
 *   await pollForeverBuggy(); // no base case — recurses infinitely
 * }
 * pollForeverBuggy(); // this would starve the task queue PERMANENTLY
 *
 * In a browser, this freezes the tab completely: no clicks, no
 * repaints, no timers, ever again, while showing 100% CPU usage on
 * that thread. In Node, the process hangs identically — appears
 * completely unresponsive despite "doing async work" continuously.
 *
 * How to actually avoid this in real code: whenever you have a
 * polling loop, genuinely yield to the task queue between attempts
 * using a REAL delay (even 0ms), not an already-resolved Promise:
 *
 *   await new Promise((resolve) => setTimeout(resolve, 0));
 *
 * This forces your continuation through the TASK queue instead of
 * the microtask queue, giving the event loop a chance to process
 * other pending timers, I/O, and events between iterations. See
 * 10-async-patterns/polling/ for the fully worked, production-safe
 * polling pattern.
 */