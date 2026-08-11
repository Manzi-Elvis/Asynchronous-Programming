/**
 * 02-multiple-tasks.js
 *
 * Goal: combine tasks, microtasks, and sync code to reinforce the
 * FULL priority model in one denser example. Predict before running.
 */

console.log('1: sync');

setTimeout(() => {
  console.log('7: task A');
  Promise.resolve().then(() => console.log('8: microtask scheduled INSIDE task A'));
}, 0);

setTimeout(() => {
  console.log('9: task B (runs in the NEXT loop iteration after task A + its microtasks)');
}, 0);

Promise.resolve().then(() => console.log('3: microtask 1'));
Promise.resolve().then(() => console.log('4: microtask 2'));

console.log('2: sync');

queueMicrotask(() => console.log('5: microtask 3 (queueMicrotask)'));

setTimeout(() => console.log('10: task C (registered last, delay 0)'), 0);

console.log('6: sync end');

/**
 * Full order:
 *   1, 2, 6                     <- all sync code first
 *   3, 4, 5                     <- all pending microtasks drain fully
 *   7                           <- ONE task taken (task A)
 *   8                           <- microtask queued DURING task A drains
 *                                   immediately after, before task B
 *   9                           <- next task taken (task B)
 *   (no microtasks queued this round)
 *   10                          <- next task taken (task C)
 *
 * Key insight highlighted here: microtasks queued FROM WITHIN a task
 * still get fully drained before the event loop moves to the next
 * task. The microtask queue is checked after every single task, not
 * just once at the start.
 */