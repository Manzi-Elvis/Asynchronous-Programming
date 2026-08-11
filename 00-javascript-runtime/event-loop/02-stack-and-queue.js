/**
 * 02-stack-and-queue.js
 *
 * Goal: trace a more complex, realistic mix and build the habit of
 * mentally maintaining three lists as you read code:
 *   STACK      (what's executing right now)
 *   MICROTASKS (waiting, higher priority)
 *   TASKS      (waiting, lower priority)
 */

function logWithLabel(label) {
  console.log(label);
}

logWithLabel('A: sync');

setTimeout(() => logWithLabel('E: task 1 (setTimeout 0ms)'), 0);

Promise.resolve()
  .then(() => logWithLabel('C: microtask 1'))
  .then(() => logWithLabel('D: microtask 2 (chained off microtask 1)'));

setTimeout(() => logWithLabel('F: task 2 (setTimeout 0ms, registered after task 1)'), 0);

logWithLabel('B: sync');

/**
 * Trace, step by step:
 *
 * SYNCHRONOUS PASS (the whole script body runs top to bottom first):
 *   - logs 'A: sync'                     -> STACK runs it immediately
 *   - setTimeout(...) called             -> handed to environment,
 *                                            will land in TASKS queue
 *                                            after ~0ms
 *   - Promise.resolve().then(...)        -> schedules callback into
 *                                            MICROTASKS queue
 *     .then(...) chained on the result   -> NOT scheduled yet! It only
 *                                            gets queued once the FIRST
 *                                            .then's callback finishes
 *                                            and returns
 *   - setTimeout(...) called again       -> second entry in TASKS queue
 *   - logs 'B: sync'                     -> STACK runs it immediately
 *
 *   Stack is now empty. State:
 *     MICROTASKS: [ -> logs 'C' ]
 *     TASKS:      [ -> logs 'E', -> logs 'F' ]
 *
 * EVENT LOOP TAKES OVER:
 *   1. Drain microtasks:
 *      - run 'C' callback -> logs 'C: microtask 1'
 *        -> this callback's return value resolves the SECOND .then,
 *           which schedules 'D' as a NEW microtask, added to the
 *           (still being drained) microtask queue
 *      - queue is not empty yet -> run 'D' callback -> logs
 *        'D: microtask 2 (chained off microtask 1)'
 *      - microtask queue now empty, stop draining
 *   2. Take ONE task from TASKS: run 'E' -> logs 'E: task 1 (setTimeout 0ms)'
 *      (microtask queue is checked again here, but it's empty, so continue)
 *   3. Take the NEXT task from TASKS: run 'F' -> logs
 *      'F: task 2 (setTimeout 0ms, registered after task 1)'
 *
 * Final order: A, B, C, D, E, F
 */