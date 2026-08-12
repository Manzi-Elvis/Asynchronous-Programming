/**
 * 01-promise-capability.js
 *
 * Goal: simulate the concept of a "PromiseCapability" — a bundle of
 * {promise, resolve, reject} created BEFORE your executor even runs,
 * with resolve/reject then handed TO your executor as arguments.
 *
 * This is a CONCEPTUAL simulation, not how the real engine is
 * implemented internally (real engines don't run this in JS) — it's
 * here purely to make the abstract spec vocabulary concrete.
 */

function createPromiseCapability() {
  const capability = {};
  capability.promise = new Promise((resolve, reject) => {
    // We capture the REAL resolve/reject here, so we can control
    // this Promise's settlement from OUTSIDE this constructor call
    // — conceptually mirroring what the spec's internal machinery
    // does when it creates a capability before running your executor.
    capability.resolve = resolve;
    capability.reject = reject;
  });
  return capability;
}

console.log('--- What new Promise(executor) conceptually does internally ---');

function simulateNewPromise(executor) {
  console.log('  1. Engine creates a PromiseCapability FIRST (promise object exists, pending)');
  const capability = createPromiseCapability();

  console.log('  2. THEN the engine calls your executor, passing the capability\'s resolve/reject');
  try {
    executor(capability.resolve, capability.reject);
  } catch (err) {
    console.log('  (synchronous throw in executor -> auto reject, per creating-promises/04-executor.js)');
    capability.reject(err);
  }

  console.log('  3. Your executor now has direct access to settle THIS SPECIFIC Promise');
  return capability.promise;
}

const myPromise = simulateNewPromise((resolve, reject) => {
  console.log('  inside executor — calling resolve()');
  setTimeout(() => resolve('settled via the captured capability'), 30);
});

myPromise.then((v) => console.log('final value:', v));

/**
 * Why this matters conceptually: it explains WHY resolve/reject are
 * passed as arguments to your executor rather than being methods you
 * call on the Promise object itself (there's no promise.resolve()
 * instance method) — they're independently-created functions, tied
 * to this ONE Promise's internal capability, and handed to you as
 * the only way to control it. This is also exactly why you CAN
 * "leak" a resolve function out of an executor for later use (as
 * seen in fundamentals/exercises/02-predict-state.js, snippet 4) —
 * it's just a captured function reference like any other closure.
 */
