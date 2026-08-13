/**
 * 07-concurrent-await.js
 *
 * Goal: the direct counterpart to 06 — start all three operations
 * BEFORE awaiting any of them, achieving real concurrency while
 * still using clean async/await syntax throughout.
 */

function fetchStep(label, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  ${label} resolved at ${ms}ms`);
      resolve(label);
    }, ms);
  });
}

async function concurrentPipeline() {
  console.log('Starting concurrent pipeline (all three start together):\n');
  const start = Date.now();

  // The KEY difference from 06: all three calls happen HERE,
  // synchronously, one right after another, BEFORE any await.
  const promise1 = fetchStep('step1', 80);
  const promise2 = fetchStep('step2', 80);
  const promise3 = fetchStep('step3', 80);

  // NOW we await each — but they're all already in flight, so this
  // just waits for results that are already being computed.
  const step1 = await promise1;
  const step2 = await promise2;
  const step3 = await promise3;

  console.log(`\nTotal time: ${Date.now() - start}ms (should be ~80ms, not 240ms)`);
  return [step1, step2, step3];
}

concurrentPipeline().then((results) => console.log('Final:', results));

/**
 * The ONLY difference between this file and 06-sequential-await.js
 * is WHEN each fetchStep(...) call happens relative to the awaits —
 * the await keyword itself is used identically in both. This is the
 * single most important thing to internalize about async/await
 * concurrency: `await` controls when YOUR code resumes, not when the
 * awaited operation STARTS. The operation starts the moment its
 * function is called, full stop.
 */