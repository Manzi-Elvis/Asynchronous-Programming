/**
 * 04-chain-errors.js
 *
 * Goal: map out EXACTLY where in a chain an error can originate, and
 * confirm that no matter where it starts, it surfaces at the same
 * place — the nearest .catch() downstream.
 */

function makeStep(name, failureMode) {
  return function step(input) {
    console.log(`  running ${name} with input:`, input);
    if (failureMode === 'reject') {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`${name} rejected its Promise`)), 10);
      });
    }
    if (failureMode === 'throw-sync') {
      throw new Error(`${name} threw synchronously (before returning any Promise)`);
    }
    if (failureMode === 'throw-in-then') {
      return Promise.resolve(input).then(() => {
        throw new Error(`${name} threw inside its own internal .then()`);
      });
    }
    return Promise.resolve(`${input} -> ${name} ok`);
  };
}

async function runChain(failingStepName, failureMode) {
  const steps = ['step1', 'step2', 'step3'];
  console.log(`\n--- Failure at ${failingStepName || 'nowhere'} (${failureMode || 'n/a'}) ---`);

  let promise = Promise.resolve('start');
  for (const name of steps) {
    const mode = name === failingStepName ? failureMode : undefined;
    const fn = makeStep(name, mode);
    promise = promise.then((input) => fn(input));
  }

  return promise
    .then((result) => console.log('  chain completed successfully:', result))
    .catch((err) => console.log('  caught by the single trailing .catch():', err.message));
}

async function main() {
  // Case 1: no failure at all.
  await runChain(null, null);

  // Case 2: a step's Promise REJECTS (the most common real case —
  // e.g. a failed network request or database write).
  await runChain('step2', 'reject');

  // Case 3: a step THROWS SYNCHRONOUSLY, before even returning a
  // Promise. Thrown errors inside a .then() handler's synchronous
  // body are automatically converted into a rejection of the
  // Promise that .then() call returns — same mechanism as the
  // executor's implicit try/catch from creating-promises/04-executor.js.
  await runChain('step2', 'throw-sync');

  // Case 4: a step returns a Promise that LATER throws inside ITS
  // OWN .then() — a nested async failure, still correctly flattened
  // and propagated all the way out to our single trailing .catch().
  await runChain('step2', 'throw-in-then');
}

main();

/**
 * All three failure modes — a direct rejection, a synchronous throw,
 * and a throw nested inside another Promise's own .then() — end up
 * in EXACTLY the same place: the nearest .catch() downstream in the
 * chain. This uniformity is one of Promises' biggest practical wins
 * over callbacks: you don't need to reason differently about "what
 * kind of failure was this" when deciding where to handle it — every
 * failure mode funnels into the same propagation mechanism.
 */
