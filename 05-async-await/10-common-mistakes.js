/**
 * 10-common-mistakes.js
 *
 * Goal: a fast tour of the async/await-specific bugs you'll hit
 * constantly in real code — each shown buggy, then fixed. Full
 * dedicated coverage of these (and more general async mistakes)
 * lives in module 13; this is the async/await-specific preview.
 */

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function mistake1_forgettingAwait() {
  console.log('--- Mistake 1: forgetting to await ---');

  // NOTE: if you forget `await` on a `return` inside an async
  // function, it usually still "works" — async functions
  // auto-flatten a returned promise (see 03-return-values.js), so
  // the CALLER's await still unwraps it correctly. The real bug
  // shows up when you forget to await BEFORE using a value directly
  // (not returning it), like this:

  async function getValueBuggy() {
    const result = delay('the value', 30); // MISSING await!
    console.log('  buggy: result is', result, '<- a pending Promise, not the value');
    return `processed: ${result}`; // string-concatenates "[object Promise]"!
  }

  const buggyValue = await getValueBuggy();
  console.log('Buggy result:', buggyValue); // "processed: [object Promise]"

  async function getValueFixed() {
    const result = await delay('the value', 30); // fixed
    return `processed: ${result}`;
  }

  const fixedValue = await getValueFixed();
  console.log('Fixed result:', fixedValue); // "processed: the value"
}

async function mistake2_awaitInLoopWhenUnnecessary() {
  console.log('\n--- Mistake 2: sequential await in a loop for independent work ---');

  async function processSequentiallyBuggy(items) {
    const results = [];
    for (const item of items) {
      // Each iteration BLOCKS the next from starting — needlessly
      // slow if items don't depend on each other.
      const result = await delay(`processed-${item}`, 50);
      results.push(result);
    }
    return results;
  }

  async function processConcurrentlyFixed(items) {
    // Start ALL of them first, then await together.
    return Promise.all(items.map((item) => delay(`processed-${item}`, 50)));
  }

  const items = ['a', 'b', 'c', 'd'];

  const start1 = Date.now();
  await processSequentiallyBuggy(items);
  console.log(`Buggy (sequential): ${Date.now() - start1}ms (should be ~200ms)`);

  const start2 = Date.now();
  await processConcurrentlyFixed(items);
  console.log(`Fixed (concurrent): ${Date.now() - start2}ms (should be ~50ms)`);
}

async function mistake3_unhandledRejectionInAsyncFunction() {
  console.log('\n--- Mistake 3: calling an async function without awaiting OR catching it ---');

  async function mightReject() {
    throw new Error('something went wrong');
  }

  // BUGGY: this call is not awaited and has no .catch() — the
  // rejection has nowhere to go. In Node this triggers an
  // unhandledRejection warning/crash depending on version/config.
  // Commented out so this file doesn't crash when run:
  // mightReject();

  // FIXED: either await it inside a try/catch...
  try {
    await mightReject();
  } catch (err) {
    console.log('Caught via try/catch:', err.message);
  }

  // ...or explicitly attach a .catch() if you intentionally don't
  // want to await it (fire-and-forget, used sparingly and carefully).
  mightReject().catch((err) => console.log('Caught via explicit .catch():', err.message));
}

async function mistake4_mixingReturnAwaitUnnecessarily() {
  console.log('\n--- Mistake 4 (minor/stylistic): "return await" inside try/catch matters! ---');

  async function withoutAwaitInReturn() {
    try {
      return delay('value', 20); // no await here
    } catch (err) {
      // This catch WILL NOT catch a rejection from the returned
      // promise, because the function already returned before the
      // promise settles — the rejection propagates to the CALLER's
      // context instead, bypassing this catch entirely.
      console.log('  this catch is unreachable for the returned promise\'s rejection');
    }
  }

  async function withAwaitInReturn() {
    try {
      return await delay('value', 20); // await here
      // Now the function STAYS inside the try block until the
      // promise settles, so a rejection here genuinely WOULD be
      // caught by this catch block.
    } catch (err) {
      console.log('  this catch WOULD catch a rejection from the awaited promise');
    }
  }

  await withoutAwaitInReturn();
  await withAwaitInReturn();
  console.log('(see module 13 for a dedicated demonstration of this exact gotcha with a real rejection)');
}

async function main() {
  await mistake1_forgettingAwait();
  await mistake2_awaitInLoopWhenUnnecessary();
  await mistake3_unhandledRejectionInAsyncFunction();
  await mistake4_mixingReturnAwaitUnnecessarily();
}

main();