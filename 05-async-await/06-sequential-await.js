/**
 * 06-sequential-await.js
 *
 * Goal: revisit sequential execution (module 04's territory)
 * specifically through the async/await lens, reinforcing that each
 * `await` on its own line genuinely blocks the NEXT line of the
 * SAME function from starting.
 */

function fetchStep(label, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  ${label} resolved at ${ms}ms`);
      resolve(label);
    }, ms);
  });
}

async function sequentialPipeline() {
  console.log('Starting sequential pipeline (each await blocks the next):\n');
  const start = Date.now();

  const step1 = await fetchStep('step1', 80);
  const step2 = await fetchStep('step2', 80); // does NOT start until step1 resolves
  const step3 = await fetchStep('step3', 80); // does NOT start until step2 resolves

  console.log(`\nTotal time: ${Date.now() - start}ms (should be ~240ms = 80+80+80)`);
  return [step1, step2, step3];
}

sequentialPipeline().then((results) => console.log('Final:', results));

/**
 * This is not a mistake here — it's shown to reinforce, visually,
 * exactly WHERE the sequential dependency comes from: it's the fact
 * that fetchStep('step2', ...) is not even CALLED until the line
 * above it finishes awaiting. The function call itself is what's
 * delayed, not just the awaiting of it. Contrast this precisely with
 * 07-concurrent-await.js, where all three calls happen before any
 * awaiting begins.
 */