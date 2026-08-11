/**
 * 03-blocking.js
 *
 * Goal: prove that the event loop CANNOT do anything while the call
 * stack is occupied by synchronous code — not run timers, not
 * process microtasks, nothing. This is the root cause of "my UI
 * froze" and "my Node server stopped responding" bugs.
 */

console.log('A: about to schedule a "fast" timer and a microtask');

setTimeout(() => {
  console.log('C: this timer was requested for 0ms delay...');
}, 0);

Promise.resolve().then(() => {
  console.log('B: ...and this microtask was queued right after it...');
});

console.log('...but neither runs until this synchronous block finishes:');

// Simulate expensive synchronous work (e.g. a giant JSON.parse, a
// tight computational loop, a bad regex) blocking the stack for ~1s.
const blockUntil = Date.now() + 1000;
let iterations = 0;
while (Date.now() < blockUntil) {
  iterations++; // burning CPU synchronously - nothing else can run
}

console.log(`Blocking loop finished after ~1000ms (ran ${iterations} iterations)`);
console.log('NOW the stack is empty -> microtasks and tasks finally get a turn:');

/**
 * Output order:
 *   A: about to schedule...
 *   ...but neither runs until...
 *   Blocking loop finished...
 *   NOW the stack is empty...
 *   B: ...and this microtask...     <- microtask still beats the task
 *   C: this timer was requested...
 *
 * Notice B (microtask) still runs before C (task) even after a 1
 * SECOND delay — the microtask-before-task priority rule holds
 * regardless of how long the stack was blocked. What changes is WHEN
 * the event loop gets its first chance to run either of them at all.
 *
 * Real-world consequence: a single slow synchronous function in a
 * Node HTTP server blocks EVERY other request, EVERY timer, EVERY
 * pending Promise for the entire server, because there's only one
 * thread and one stack. This is why CPU-heavy work belongs in worker
 * threads or gets broken into async-yielding chunks, not run inline.
 */