/**
 * Exercise 02 — Trace the stack, then fix the bug
 *
 * Part 1: Trace it
 * -----------------
 * Below is a recursive function meant to sum an array of numbers.
 * Before running anything, draw out (on paper or in a comment) what
 * the call stack looks like at its DEEPEST point for
 * sumArray([1, 2, 3]).
 *
 * Part 2: Find and fix the bug
 * -----------------------------
 * This function has a bug that will cause a stack overflow for any
 * non-empty array. Find it, fix it, and explain in a comment WHY the
 * original version never terminates.
 */

function sumArray(arr) {
  if (arr.length === 0) {
    return 0;
  }
  // BUG: this recursive call passes the SAME array every time,
  // so `arr.length === 0` is never true and the base case is
  // never reached.
  return arr[0] + sumArray(arr);
}

// Uncomment to see it blow up:
// console.log(sumArray([1, 2, 3]));

// TODO: Write a corrected version below called `sumArrayFixed` that
// actually shrinks the input on each call (hint: use arr.slice(1)
// or pass an index parameter instead of slicing).

function sumArrayFixed(arr) {
  // your implementation here
  if(arr.length === 0) return 0;
  return arr[0] + sumArrayFixed(arr.slice(1))
}

 console.log(sumArrayFixed([1, 2, 3])); // should log 6


// PART 1:
// For [1, 2, 3], the deepest point is when the recursive calls have reduced the array to []:

// sumArray([1, 2, 3])
//   → sumArray([2, 3])
//     → sumArray([3])
//       → sumArray([])

// WHAT THE CALL STACK LOOKS LIKE:
// 
// C:\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:19
//   if (arr.length === 0) {
//           ^

// RangeError: Maximum call stack size exceeded
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:19:11)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)
//     at sumArray (C:\Users\elvis\Documents\PROJECTS\Async JS\00-javascript-runtime\call-stack\exercises\02-trace-stack.js:25:19)


// PART 2:

// With slice(1)
// Now each call gets a smaller array:

// sumArrayFixed([1, 2, 3])
//         ↓
// sumArrayFixed([2, 3])
//         ↓
// sumArrayFixed([3])
//         ↓
// sumArrayFixed([])
//         ↓
//        0

// Then the stack unwinds:

// sumArrayFixed([])
// → 0

// sumArrayFixed([3])
// → 3 + 0
// → 3

// sumArrayFixed([2, 3])
// → 2 + 3
// → 5

// sumArrayFixed([1, 2, 3])
// → 1 + 5
// → 6

