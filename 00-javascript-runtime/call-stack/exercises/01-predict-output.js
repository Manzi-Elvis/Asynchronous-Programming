/**
 * Exercise 01 — Predict the output
 *
 * Instructions:
 * 1. Read the code below WITHOUT running it.
 * 2. Write down, in order, what you think will be logged.
 * 3. Then run `node 01-predict-output.js` and check yourself.
 * 4. If you got it wrong, trace through the stack frame by frame
 *    (like the diagram in 01-basic-stack.js) until you see why.
 */

function outer() {
  console.log('A');
  inner();
  console.log('D');
}

function inner() {
  console.log('B');
  innermost();
  console.log('C');
}

function innermost() {
  console.log('B.5');
}

console.log('start');
outer();
console.log('end');

// Your prediction (write it as a comment before running):
// 1.
// 2.
// 3.
// 4.
// 5.
// 6.