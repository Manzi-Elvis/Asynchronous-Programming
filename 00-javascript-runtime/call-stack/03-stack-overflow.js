/**
 * 03-stack-overflow.js
 *
 * Goal: trigger a real stack overflow on purpose, read the error,
 * and understand WHY the stack is bounded (it's a fixed block of
 * memory, not infinite).
 *
 * Run this file with: node 03-stack-overflow.js
 * It will crash — that's the point.
 */

function recurseForever(n) {
  // No base case! Every call pushes a new frame that never pops
  // until something stops it — and nothing does.
  return recurseForever(n + 1);
}

try {
  recurseForever(0);
} catch (err) {
  console.log('Caught:', err.constructor.name); // RangeError
  console.log('Message:', err.message);          // Maximum call stack size exceeded
}

/**
 * Why this happens:
 *
 * The call stack is allocated a fixed, finite amount of memory by the
 * engine (differs by environment, roughly a few thousand to ~15k
 * frames depending on frame size and platform). Each call to
 * recurseForever() pushes a new frame and IMMEDIATELY calls itself
 * again before ever popping — the stack only ever grows, never
 * shrinks, until it runs out of room.
 *
 * V8 throws a RangeError when this happens, which — unlike most fatal
 * engine errors — IS catchable with try/catch, as shown above.
 *
 * Practical takeaway: deep, unbounded recursion is dangerous in JS.
 * For genuinely large iteration counts, prefer loops, or restructure
 * recursion to be async (e.g. spread across setTimeout/microtask
 * boundaries) or tail-call friendly where the engine supports it
 * (V8 currently does NOT implement proper tail-call optimization,
 * despite it being in the ES2015 spec — don't rely on it).
 */