/**
 * 03-return-promise.js
 *
 * Goal: dig into the "flattening" behavior in more detail — when a
 * .then() handler returns a Promise, the CHAIN WAITS for that inner
 * Promise to settle, and adopts its outcome (value or error)
 * directly, rather than resolving with "a Promise" as its value.
 */

function step1() {
  return new Promise((resolve) => setTimeout(() => resolve('step1 result'), 20));
}

function step2(input) {
  // Returns ANOTHER Promise, using the result of step1.
  return new Promise((resolve) => setTimeout(() => resolve(`step2 result, using: ${input}`), 20));
}

step1()
  .then((result1) => {
    console.log('got result1:', result1);
    return step2(result1); // returning a Promise from inside .then()
  })
  .then((result2) => {
    // result2 here is the UNWRAPPED value from step2's Promise, not
    // a Promise itself — the chain automatically "flattened" it.
    console.log('got result2 (already flattened):', result2);
  });

/**
 * If .then() did NOT flatten returned Promises, the above would
 * instead give you a Promise wrapping a Promise
 * (Promise<Promise<string>>) as result2, forcing you to write
 * result2.then(actualValue => ...) YET AGAIN just to unwrap one more
 * level. This flattening (formally called "the resolution
 * procedure," covered fully in resolution/) is what lets you chain
 * arbitrarily many async steps with a single, flat .then() chain
 * instead of accumulating nested Promise wrappers.
 */

console.log('\n--- Also flattens rejections, not just fulfillments ---');

function stepThatFails() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('inner step failed')), 20);
  });
}

Promise.resolve('start')
  .then(() => {
    return stepThatFails(); // returning a Promise that will REJECT
  })
  .then((v) => console.log('this is skipped:', v))
  .catch((err) => {
    // The outer chain's rejection here comes DIRECTLY from the inner
    // Promise's rejection — again, automatically flattened, no
    // manual "if the returned Promise rejects, reject this one too"
    // plumbing required from you.
    console.log('caught the INNER Promise\'s rejection, flattened:', err.message);
  });