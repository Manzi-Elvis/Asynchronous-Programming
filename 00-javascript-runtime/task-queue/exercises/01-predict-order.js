/**
 * Exercise 01 — Predict the order
 *
 * Write your predicted output order as a comment before running.
 */

console.log('start');

setTimeout(() => console.log('timeout 300ms'), 300);
setTimeout(() => console.log('timeout 0ms, second registered'), 0);
setTimeout(() => console.log('timeout 100ms'), 100);
setTimeout(() => console.log('timeout 0ms, first registered'), 0);

console.log('end');

// Your prediction (list all 6 log lines in order):
// 1. start
// 2. end
// 3.
// 4.
// 5.
// 6.

/**
 * Follow-up question (answer in a comment):
 * If you changed BOTH 0ms timeouts to 0ms but swapped which one is
 * registered first in the source code, would the output order
 * change? Why or why not?
 */