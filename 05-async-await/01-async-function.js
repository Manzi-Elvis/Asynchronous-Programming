/**
 * 01-async-function.js
 *
 * Goal: prove, directly, that every async function returns a
 * Promise — even one that looks like it's "just returning a value."
 */

async function returnsFive() {
  return 5;
}

const result = returnsFive();
console.log('returnsFive() returned:', result); // Promise { 5 }
console.log('Is it a Promise?', result instanceof Promise); // true

// To get the actual value 5, you must await it or .then() it —
// exactly like any other Promise.
returnsFive().then((value) => console.log('Resolved value:', value));

// --- An async function with no explicit return ---

async function doesNothing() {
  console.log('  doing some side-effecty work...');
}

doesNothing().then((value) => {
  console.log('doesNothing() resolved to:', value); // undefined
});

// --- Comparing to the equivalent hand-written Promise version ---

function returnsFiveManual() {
  return Promise.resolve(5);
}

console.log('\nManual version behaves identically:');
returnsFiveManual().then((value) => console.log('Resolved value:', value));

/**
 * This is the single fact that everything else in this module builds
 * on: `async` is not a different KIND of function that does
 * something magical — it's regular JS function syntax with ONE
 * guarantee bolted on: whatever you `return` (or don't) gets wrapped
 * in a Promise automatically, and whatever you `throw` becomes a
 * rejection automatically. That's the entire contract.
 */