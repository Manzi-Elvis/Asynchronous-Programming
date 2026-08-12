/**
 * 03-error-propagation.js
 *
 * Goal: trace a rejection's exact path through a realistic
 * multi-step chain with SEVERAL .catch() calls at different points,
 * to build precise intuition for which .catch() actually intercepts
 * a given failure.
 */

function step(name, shouldFail) {
  return (input) => {
    console.log(`  [${name}] running with input:`, input);
    if (shouldFail) {
      throw new Error(`[${name}] failed`);
    }
    return `${input} -> ${name} ok`;
  };
}

function runTrace(failAtStep) {
  console.log(`\n--- Failure injected at: ${failAtStep || 'nowhere'} ---`);

  return Promise.resolve('start')
    .then(step('A', failAtStep === 'A'))
    .then(step('B', failAtStep === 'B'))
    .catch((err) => {
      // This FIRST .catch() only sees failures from A or B (anything
      // ABOVE it in the chain). If it catches something, it can
      // recover OR re-throw.
      console.log('  [catch #1] intercepted:', err.message);
      if (failAtStep === 'A' || failAtStep === 'B') {
        console.log('  [catch #1] recovering with a fallback value');
        return 'fallback-after-AB-failure';
      }
    })
    .then(step('C', failAtStep === 'C'))
    .then(step('D', failAtStep === 'D'))
    .catch((err) => {
      // This SECOND .catch() only sees failures from C or D, OR a
      // re-thrown error from catch #1 (which doesn't happen in this
      // particular setup, but WOULD if catch #1 re-threw instead of
      // recovering).
      console.log('  [catch #2] intercepted:', err.message);
    })
    .then((finalValue) => {
      if (finalValue !== undefined) {
        console.log('  [final] chain completed with:', finalValue);
      }
    });
}

async function main() {
  await runTrace(null);
  await runTrace('A');
  await runTrace('B');
  await runTrace('C');
  await runTrace('D');
}

main();

/**
 * Key trace takeaways:
 *   - A failure at A or B is caught by catch #1 and RECOVERED there
 *     — so step C and D still run afterward, using the fallback
 *     value. catch #2 never even sees anything in these cases.
 *   - A failure at C or D skips straight past catch #1 (it's ABOVE
 *     them in the chain, only watching for A/B failures) and lands
 *     in catch #2 instead.
 *   - Multiple .catch() calls in one chain act like a series of
 *     checkpoints, each only relevant to failures that occur AFTER
 *     the previous checkpoint and BEFORE itself.
 */
