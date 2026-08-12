/**
 * Exercise 02 — Predict execution order and timing
 *
 * Part 1: Predict the LOG ORDER (not timing) before running.
 */

console.log('1');

function slowSync(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

setTimeout(() => console.log('2'), 50);

slowSync(200); // blocks the stack for 200ms

console.log('3');

Promise.resolve().then(() => console.log('4'));

setTimeout(() => console.log('5'), 0);

console.log('6');

// Your prediction:
// order: __________________

/**
 * Part 2: Predict the approximate TIMING
 * -----------------------------------------
 * The setTimeout scheduled for 50ms above — will it actually fire
 * at ~50ms from program start? Explain why or why not in a comment,
 * referencing what you learned about blocking in 03-blocking-operation.js.
 */

// Your answer:

/**
 * Part 3: Fix it
 * ---------------
 * Below is a function meant to log "ready" 100ms after being called,
 * without ever blocking the stack. It currently uses a busy-wait.
 * Rewrite it to be non-blocking using setTimeout, keeping the same
 * function signature (takes a callback, calls it when "ready").
 */

function notifyReadySync(callback) {
  const end = Date.now() + 100;
  while (Date.now() < end) {}
  callback('ready');
}

// TODO: rewrite as notifyReadyAsync(callback) using setTimeout instead
function notifyReadyAsync(callback) {
  // your implementation here
}

// notifyReadyAsync((status) => console.log('notifyReadyAsync says:', status));
// console.log('this should log BEFORE "notifyReadyAsync says: ready"');