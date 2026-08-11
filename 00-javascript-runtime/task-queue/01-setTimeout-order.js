/**
 * 01-setTimeout-order.js
 *
 * Goal: nail down exactly how setTimeout ordering works — by delay
 * first, then by registration order for ties.
 */

console.log('--- Different delays: shorter delay wins ---');

setTimeout(() => console.log('100ms timer'), 100);
setTimeout(() => console.log('50ms timer'), 50);
setTimeout(() => console.log('0ms timer'), 0);

// Expected: 0ms timer, 50ms timer, 100ms timer

setTimeout(() => {
  console.log('\n--- Same delay: registration order wins ---');

  setTimeout(() => console.log('first registered (0ms)'), 0);
  setTimeout(() => console.log('second registered (0ms)'), 0);
  setTimeout(() => console.log('third registered (0ms)'), 0);

  // Expected: first, second, third — FIFO for equal delays
}, 200); // pushed out far enough to run after the block above finishes

/**
 * Practical implication: don't rely on setTimeout for precise timing.
 * "0ms" and even specific millisecond values are best-effort minimums,
 * not guarantees, because:
 *   - the stack must be empty first
 *   - the microtask queue is drained before EVERY task, which adds
 *     variable delay if microtasks keep scheduling more microtasks
 *   - browsers clamp minimum delays (historically 4ms for nested
 *     timers) and background/inactive tabs throttle timers further
 *   - Node has its own internal minimum tick granularity
 *
 * If you need guaranteed-order execution regardless of timing,
 * that's what Promise chains and async/await are for — see module 03.
 */