/**
 * 02-custom-thenable.js
 *
 * Goal: build a small, genuinely functional custom thenable from
 * scratch — not a real Promise subclass, just a plain object that
 * correctly implements the .then(onFulfilled, onRejected) contract.
 */

function createDelayedThenable(value, ms) {
  return {
    then(onFulfilled, onRejected) {
      setTimeout(() => {
        try {
          onFulfilled(value);
        } catch (err) {
          if (onRejected) onRejected(err);
        }
      }, ms);
    },
  };
}

const myThenable = createDelayedThenable('hello from a custom thenable', 50);

console.log('myThenable instanceof Promise:', myThenable instanceof Promise); // false

myThenable.then(
  (v) => console.log('  onFulfilled called with:', v),
  (err) => console.log('  onRejected called with:', err.message)
);

console.log('\n--- A thenable that can also reject ---');

function createDelayedRejectingThenable(reason, ms) {
  return {
    then(onFulfilled, onRejected) {
      setTimeout(() => {
        if (onRejected) onRejected(reason);
      }, ms);
    },
  };
}

const rejectingThenable = createDelayedRejectingThenable(new Error('custom thenable failure'), 50);

rejectingThenable.then(
  (v) => console.log('  never runs:', v),
  (err) => console.log('  onRejected called with:', err.message)
);

/**
 * This is genuinely all that's structurally required to be treated
 * as "Promise-like" by the rest of the JS ecosystem — you don't need
 * to implement chaining, state tracking, or anything else yourself.
 * The moment something has a working .then(onFulfilled, onRejected)
 * shape, native Promises (via Promise.resolve(), and the resolution
 * procedure inside .then() handlers) know how to work with it — see
 * 03-thenable-assimilation.js next for that interop in action.
 */
