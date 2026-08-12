/**
 * 03-rejection-handler.js
 *
 * Goal: see EXACTLY why .then()'s second argument is a weaker
 * error-handling tool than a separately chained .catch(), by
 * showing a case where the second argument fails to catch an error.
 */

console.log('--- .then()\'s second argument DOES catch a direct rejection ---');

Promise.reject(new Error('direct rejection'))
  .then(
    (v) => console.log('fulfilled (not reached)'),
    (err) => console.log('caught via second argument:', err.message)
  );

console.log('\n--- But it does NOT catch an error thrown by the FIRST argument ---');

Promise.resolve('starting value')
  .then(
    (value) => {
      console.log('  onFulfilled handler running, about to throw...');
      throw new Error('thrown inside onFulfilled');
    },
    (err) => {
      // This is the onREJECTED handler of the SAME .then() call as
      // the throwing onFulfilled handler above. It will NOT run for
      // that throw, because the throw happens AFTER this .then()
      // call already decided to run the onFulfilled branch — the
      // onRejected branch was only ever a candidate for the ORIGINAL
      // Promise's rejection, not for errors in its sibling handler.
      console.log('  this NEVER runs for the error above:', err.message);
    }
  )
  .catch((err) => {
    // THIS is what actually catches it — a separately CHAINED
    // .catch(), attached to the Promise that .then() returned. Since
    // the onFulfilled handler threw, the Promise .then() returned
    // became REJECTED with that thrown error, and this .catch()
    // (further down the chain) is what picks it up.
    console.log('  caught by chained .catch() instead:', err.message);
  });

/**
 * The takeaway: .then(onFulfilled, onRejected) is a snapshot,
 * two-way switch for handling THIS Promise's own state — it can't
 * see forward into errors that happen inside onFulfilled itself.
 * A separately chained .catch() sits AFTER the .then() in the chain
 * and can catch errors from ANYWHERE earlier in the chain, including
 * ones thrown inside a .then() handler. This is why idiomatic modern
 * code almost always uses:
 *
 *   promise.then(onFulfilled).catch(onRejected)
 *
 * instead of:
 *
 *   promise.then(onFulfilled, onRejected)
 *
 * The full mechanics of WHY .catch() can "reach back" like this are
 * covered properly in catch/ and chaining/.
 */