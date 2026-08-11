/**
 * 02-dom-events.js
 *
 * This module is Node-focused, and Node has no DOM — so this file
 * explains DOM events conceptually and demonstrates the SAME
 * underlying pattern using Node's EventEmitter, which works
 * identically in principle (we cover EventEmitter properly in
 * module 08-nodejs-async/events/).
 *
 * Goal: understand that event listeners are ANOTHER form of
 * environment hand-off, just triggered by user/system action instead
 * of a timer.
 */

const { EventEmitter } = require('events');

/**
 * In a browser:
 *
 *   button.addEventListener('click', () => {
 *     console.log('clicked!');
 *   });
 *
 * This registers a callback with the browser's Web API layer. The
 * browser watches for real click events (mouse hardware, OS, etc.)
 * OUTSIDE the JS call stack entirely. When a click happens, the
 * browser queues your callback onto the task queue, same as
 * setTimeout does. Nothing runs until the call stack is empty AND
 * the event loop picks it up.
 *
 * Node doesn't have a DOM, but EventEmitter is the same *pattern*:
 * register a callback now, have it invoked later in response to
 * something happening.
 */

const emitter = new EventEmitter();

emitter.on('user-clicked', (data) => {
  console.log('Handled user-clicked event:', data);
});

console.log('A: registered the listener, nothing has "clicked" yet');

// Simulate a click happening later, via a timer (standing in for
// "some real-world event occurred").
setTimeout(() => {
  console.log('B: simulating a real click happening now');
  emitter.emit('user-clicked', { x: 120, y: 340 });
}, 50);

console.log('C: this logs immediately — registering a listener does NOT block');

/**
 * Key idea: `addEventListener` / `emitter.on()` return IMMEDIATELY.
 * They don't wait for the event. This is the same non-blocking
 * hand-off pattern as setTimeout — you're registering a callback with
 * something OUTSIDE your synchronous code, to be invoked later when a
 * condition (click, timer, network response) is met.
 */