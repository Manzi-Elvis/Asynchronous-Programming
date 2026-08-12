/**
 * 02-catch-propagation.js
 *
 * Goal: a single .catch() at the END of a long chain, catching an
 * error that could have originated from ANY of several earlier
 * links — proving rejection propagation skips straight past every
 * intermediate .then() until it finds a handler that can deal with it.
 */

function step1(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail === 1) reject(new Error('step1 failed'));
      else resolve('step1 ok');
    }, 10);
  });
}

function step2(input, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail === 2) reject(new Error('step2 failed'));
      else resolve(`${input} -> step2 ok`);
    }, 10);
  });
}

function step3(input, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail === 3) reject(new Error('step3 failed'));
      else resolve(`${input} -> step3 ok`);
    }, 10);
  });
}

function runPipeline(failAt) {
  return step1(failAt)
    .then((r1) => {
      console.log(`  [failAt=${failAt}] step1 handler ran with:`, r1);
      return step2(r1, failAt);
    })
    .then((r2) => {
      console.log(`  [failAt=${failAt}] step2 handler ran with:`, r2);
      return step3(r2, failAt);
    })
    .then((r3) => {
      console.log(`  [failAt=${failAt}] step3 handler ran with:`, r3);
      return `PIPELINE COMPLETE: ${r3}`;
    })
    .catch((err) => {
      // This ONE .catch() correctly handles a failure from step1,
      // step2, OR step3 — it doesn't need to know or care which
      // link actually failed. Whichever link rejects, propagation
      // skips every .then() after it and lands here directly.
      console.log(`  [failAt=${failAt}] caught by the single trailing .catch():`, err.message);
    });
}

async function main() {
  console.log('--- No failure ---');
  console.log(await runPipeline(0));

  console.log('\n--- Fails at step1 ---');
  await runPipeline(1);

  console.log('\n--- Fails at step2 ---');
  await runPipeline(2);

  console.log('\n--- Fails at step3 ---');
  await runPipeline(3);
}

main();

/**
 * Notice: in the failAt=2 case, step2's own .then() handler (the one
 * logging "step2 handler ran with") NEVER RUNS, because step2()
 * itself rejected before ever calling its resolve(). The rejection
 * from inside step2() skips step2's OWN .then() success handler too
 * — rejection propagation jumps past EVERY .then() success handler
 * in its path, not just the ones "after" some arbitrary point.
 */