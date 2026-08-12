/**
 * 03-resolve-thenable.js
 *
 * Goal: prove the exact same adoption behavior from 02 applies to
 * ANY thenable, not just real Promise instances — reinforcing the
 * thenables/ sub-topic in the specific context of resolve().
 */

function createDelayedThenable(value, ms, shouldReject) {
  return {
    then(onFulfilled, onRejected) {
      setTimeout(() => {
        if (shouldReject) {
          onRejected(value);
        } else {
          onFulfilled(value);
        }
      }, ms);
    },
  };
}

console.log('--- resolve() with a fulfilling thenable ---');

const outer1 = new Promise((resolve) => {
  resolve(createDelayedThenable('thenable value', 40, false));
});

outer1.then((v) => console.log('  outer1 fulfilled with:', v));

console.log('\n--- resolve() with a REJECTING thenable ---');

const outer2 = new Promise((resolve) => {
  resolve(createDelayedThenable(new Error('thenable rejected'), 40, true));
});

outer2.catch((err) => console.log('  outer2 rejected with:', err.message));

console.log('\n--- The engine calls the thenable\'s .then() EXACTLY once ---');

let thenCallCount = 0;
const trackedThenable = {
  then(onFulfilled) {
    thenCallCount++;
    console.log(`  .then() called (call #${thenCallCount})`);
    setTimeout(() => onFulfilled('tracked value'), 20);
  },
};

Promise.resolve(trackedThenable).then((v) => {
  console.log('  final value:', v);
  console.log('  total .then() calls on the thenable:', thenCallCount); // always 1
});

/**
 * This "called exactly once" guarantee matters: even though a
 * thenable's .then() implementation is arbitrary user code (unlike a
 * real Promise, whose internal state machine is enforced by the
 * engine), the RESOLUTION PROCEDURE itself still only invokes it a
 * single time when assimilating it into a native Promise. If a
 * misbehaving thenable tried to call onFulfilled/onRejected multiple
 * times itself, the outer native Promise would still only honor the
 * FIRST call, thanks to the same settle-once guarantee from
 * fundamentals/06-settled.js — the native Promise machinery protects
 * you even from a badly-behaved thenable.
 */
