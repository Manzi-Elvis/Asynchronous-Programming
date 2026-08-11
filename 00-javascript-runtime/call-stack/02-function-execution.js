/**
 * 02-function-execution.js
 *
 * Goal: understand that return values travel back DOWN the stack as
 * each frame pops, and that each frame has its own local variables
 * that vanish once popped (unless captured by a closure).
 */

function square(n) {
  const result = n * n; // lives only in square()'s frame
  return result;
}

function sumOfSquares(a, b) {
  const sq1 = square(a); // square()'s frame is pushed, computes, pops
  const sq2 = square(b); // pushed again — a FRESH frame, not reused
  return sq1 + sq2;
}

console.log(sumOfSquares(3, 4)); // 9 + 16 = 25

/**
 * Each call to square() gets its own frame with its own `n` and
 * `result`. Frame 1 (square(3)) is completely gone — memory and
 * all — before frame 2 (square(4)) is even created. This is why
 * recursion works: every recursive call is a genuinely separate
 * frame with its own copy of the local variables.
 */

function factorial(n) {
  console.log(`enter factorial(${n})`);
  if (n <= 1) {
    console.log(`base case hit at n=${n}`);
    return 1;
  }
  const result = n * factorial(n - 1); // stack grows deeper each call
  console.log(`exit factorial(${n}) -> ${result}`);
  return result;
}

console.log('factorial(4) =', factorial(4));

/**
 * Watch the logs: all the "enter" lines happen on the way DOWN
 * (stack growing to depth 4), then all the "exit" lines happen on
 * the way UP as each frame pops and multiplies its result into the
 * frame below it. This down-then-up shape is universal to every
 * recursive call stack, sync or async.
 */