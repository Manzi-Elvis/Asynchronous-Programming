/**
 * Exercise 04 — Explain execution order (write-up, no new code)
 *
 * For EACH of the three prediction exercises in this folder, write a
 * short paragraph (3-5 sentences) explaining the result in your own
 * words — not just "microtasks run before tasks," but the SPECIFIC
 * reasoning for that exercise: which callbacks got queued when, and
 * why the close calls resolved the way they did.
 *
 * This exercise has no code to run — it's a comprehension check.
 * Being able to EXPLAIN the ordering, not just correctly guess it, is
 * the actual skill this module is building. If you can't explain
 * one of the three clearly, go back and re-read that exercise's
 * hint plus 03-multiple-microtasks.js and 04-nested-promises.js
 * before writing your explanation.
 */

/**
 * Exercise 01 explanation:
 *
 *
 */

/**
 * Exercise 02 explanation:
 *
 *
 */

/**
 * Exercise 03 explanation:
 *
 *
 */

/**
 * Bonus: without running any code, predict the output order for this
 * NEW snippet, using everything you've learned in this module, then
 * verify by actually running it in a scratch file.
 *
 *   console.log('X');
 *   setTimeout(() => console.log('Y'), 0);
 *   (async () => {
 *     console.log('Z');
 *     await new Promise((resolve) => setTimeout(resolve, 0));
 *     console.log('W');
 *   })();
 *   console.log('V');
 *
 * Your prediction:
 */
