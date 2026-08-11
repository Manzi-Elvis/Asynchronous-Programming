/**
 * 02-objects-and-memory.js
 *
 * Goal: see closures keep heap-allocated variables alive after their
 * creating function's stack frame is gone — the mechanism that makes
 * callbacks/Promises work at all.
 */

function createCounter() {
  let count = 0; // would normally die when createCounter() returns
  return {
    increment() {
      count += 1;
      return count;
    },
    reset() {
      count = 0;
    },
  };
}

const counterA = createCounter();
const counterB = createCounter(); // a SEPARATE `count` in the heap

console.log(counterA.increment()); // 1
console.log(counterA.increment()); // 2
console.log(counterB.increment()); // 1 — independent closure, independent heap slot

// Each call to createCounter() allocates a NEW `count` variable on the
// heap. counterA and counterB's closures each hold a reference to their
// own separate `count` — this is why they don't interfere.

// --- The async payoff: this is EXACTLY how setTimeout "remembers" things ---
function delayedGreeting(name) {
  const message = `Hello, ${name}!`; // local to this call
  setTimeout(() => {
    // delayedGreeting()'s stack frame is LONG gone by the time this
    // runs (at least 1000ms later), but `message` is still alive on
    // the heap because this arrow function closes over it.
    console.log(message);
  }, 1000);
}

delayedGreeting('Elvis');
console.log('This logs BEFORE the greeting — the stack frame for');
console.log('delayedGreeting already returned, but its closure lives on.');

// --- A classic closure pitfall: shared reference across loop iterations ---
console.log('\n--- var vs let in loops ---');

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i:', i), 10); // logs 3, 3, 3
}
// `var` is function-scoped, so there's only ONE `i` in the heap,
// shared by all three closures. By the time the timeouts fire, the
// loop has already finished and i === 3.

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let j:', j), 10); // logs 0, 1, 2
}
// `let` is block-scoped — each loop iteration gets its OWN `j` on the
// heap, so each closure captures a different value.