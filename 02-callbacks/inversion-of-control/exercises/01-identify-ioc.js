/**
 * Exercise 01 — Identify inversion-of-control problems
 *
 * Part 1: Spot the bugs
 * -----------------------
 * Below are THREE small callback-based functions, each with a
 * DIFFERENT inversion-of-control problem from the ones named in
 * NOTES.md (called too many times / never called / called with
 * wrong args or synchronously when async was expected). For each
 * one, write a comment identifying WHICH problem it has and why.
 */

function functionA(callback) {
  if (Math.random() > 0.5) {
    callback(null, 'branch A result');
  }
  // What's wrong with functionA?
  // Your answer:
}

function functionB(items, callback) {
  items.forEach((item) => {
    callback(null, item); // called once per item...
  });
  // What's wrong with functionB, if the caller expected ONE result?
  // Your answer:
}

function functionC(value, callback) {
  if (value > 10) {
    callback(null, value); // synchronous path
  } else {
    setTimeout(() => callback(null, value), 50); // async path
  }
  // What's wrong with functionC?
  // Your answer:
}

/**
 * Part 2: Fix ONE of them
 * -------------------------
 * Pick ONE of functionA, functionB, or functionC and write a fixed
 * version below (name it functionXFixed) that resolves its specific
 * problem. Test it to prove the fix works.
 */

// your fixed version here

/**
 * Part 3: Reflection
 * --------------------
 * In a comment, explain: if all three of these functions instead
 * returned Promises, which of these three bugs would be structurally
 * IMPOSSIBLE regardless of how carelessly the Promise executor was
 * written? Which one(s), if any, could still happen even with
 * Promises?
 */

// Your answer: