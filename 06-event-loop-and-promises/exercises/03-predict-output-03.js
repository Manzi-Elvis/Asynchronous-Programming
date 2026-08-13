/**
 * Exercise 03 — Predict the output (task scheduling more microtasks)
 *
 * Hardest of the three: a task callback that itself schedules a
 * microtask, interacting with a second, later-registered task.
 */

console.log('1');

setTimeout(() => {
  console.log('4');
  Promise.resolve().then(() => console.log('5'));
}, 0);

setTimeout(() => {
  console.log('7');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('2');

Promise.resolve().then(() => {
  console.log('3.5');
  setTimeout(() => console.log('6'), 0);
});

// Your prediction:
// order: __________________

/**
 * Once you've predicted and verified, answer in a comment: which
 * TASK runs SECOND overall (i.e. the second setTimeout callback to
 * actually execute) — the one that logs '7', or the one that logs
 * '6'? Why, precisely, given when each was registered relative to
 * the draining of microtasks?
 */
