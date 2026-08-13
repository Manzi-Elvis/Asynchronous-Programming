/**
 * 04-try-catch.js
 *
 * Goal: use try/catch to handle a rejected await — the direct
 * async/await equivalent of .catch() — and see that it behaves
 * exactly like catching a thrown exception, because a rejected
 * await literally throws.
 */

function riskyOperation(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Operation failed'));
      } else {
        resolve('Operation succeeded');
      }
    }, 50);
  });
}

async function handleWithTryCatch(shouldFail) {
  try {
    const result = await riskyOperation(shouldFail);
    console.log('Success:', result);
    return result;
  } catch (err) {
    console.log('Caught error:', err.message);
    return null; // recover with a fallback value
  }
}

async function main() {
  await handleWithTryCatch(false);
  await handleWithTryCatch(true);

  // --- try/catch around MULTIPLE awaits ---
  console.log('\n--- One try/catch guarding several sequential awaits ---');

  async function multiStepWithSharedCatch() {
    try {
      const a = await riskyOperation(false);
      console.log('  step A:', a);
      const b = await riskyOperation(true); // this one fails
      console.log('  step B:', b); // never reached
      const c = await riskyOperation(false);
      console.log('  step C:', c); // never reached
    } catch (err) {
      // Catches whichever step failed — you don't know WHICH step
      // from this catch block alone unless you inspect err or add
      // per-step try/catch blocks (see below for that variant).
      console.log('  caught (from whichever step failed):', err.message);
    }
  }

  await multiStepWithSharedCatch();

  // --- Per-step try/catch when you need to know WHICH step failed ---
  console.log('\n--- Per-step try/catch for granular error handling ---');

  async function multiStepWithGranularCatch() {
    let a;
    try {
      a = await riskyOperation(false);
    } catch (err) {
      console.log('  step A failed:', err.message);
      return;
    }
    console.log('  step A succeeded:', a);

    let b;
    try {
      b = await riskyOperation(true);
    } catch (err) {
      console.log('  step B failed:', err.message);
      return;
    }
    console.log('  step B succeeded:', b); // never reached
  }

  await multiStepWithGranularCatch();
}

main();

/**
 * Compare this file directly to
 * 03-promises/error-handling/01-rejection.js and
 * catch/01-basic-catch.js from module 03 — same underlying
 * rejection propagation mechanism, different syntax for consuming
 * it. try/catch with await is generally considered more readable
 * for multi-step sequences, especially once conditionals or loops
 * get mixed into the flow.
 */