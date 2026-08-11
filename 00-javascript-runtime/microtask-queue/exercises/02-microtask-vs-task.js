/**
 * Exercise 02 — Build an ordering puzzle of your own
 *
 * Part 1
 * -------
 * Write a snippet (below) using a mix of console.log, setTimeout,
 * Promise.resolve().then(), and queueMicrotask, such that the output
 * is EXACTLY the numbers 1 through 8 in order when run. You must use
 * at least 2 setTimeouts, at least 2 .then() calls, and at least 1
 * queueMicrotask. This forces you to actually reason about the
 * scheduling rules rather than just writing sequential code.
 *
 * Part 2
 * -------
 * In a comment, explain WHY your specific arrangement produces
 * 1-8 in order — reference the drain-all-microtasks-before-next-task
 * rule explicitly.
 */

// your code here

/**
 * Part 3 — Harder mode
 * ----------------------
 * Now modify your solution (or write a new one) where a microtask
 * schedules ANOTHER microtask that must run before a pending
 * setTimeout(0) fires, even though the setTimeout was registered
 * first. Prove it with output, and explain why in a comment.
 */

// your code here