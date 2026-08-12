/**
 * 01-basic-chain.js
 *
 * Goal: the minimal 3-step chain — the direct Promise-based
 * counterpart to 02-callbacks/callback-hell/01-nested-callbacks.js.
 * Compare the two files side by side.
 */

function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('step1 done');
      resolve(1);
    }, 10);
  });
}

function step2(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('step2 done, input was', input);
      resolve(input + 1);
    }, 10);
  });
}

function step3(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('step3 done, input was', input);
      resolve(input + 1);
    }, 10);
  });
}

function step4(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('step4 done, input was', input);
      resolve(input + 1);
    }, 10);
  });
}

step1()
  .then((result1) => step2(result1))
  .then((result2) => step3(result2))
  .then((result3) => step4(result3))
  .then((result4) => {
    console.log('ALL STEPS DONE. Final result:', result4);
  })
  .catch((err) => {
    console.error('Pipeline failed:', err.message);
  });

/**
 * Compare directly against 02-callbacks/callback-hell/01-nested-callbacks.js
 * — same 4 sequential steps, same error-handling requirement, but:
 *   - ZERO levels of nesting (every .then() is at the same
 *     indentation level)
 *   - ONE .catch() handles errors from ANY step, instead of 4
 *     repeated `if (err) return` checks
 *   - Reading top-to-bottom matches execution order exactly
 */