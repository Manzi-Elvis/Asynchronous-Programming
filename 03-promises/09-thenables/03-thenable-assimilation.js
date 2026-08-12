/**
 * 03-thenable-assimilation.js
 *
 * Goal: see native Promises automatically "assimilate" a custom
 * thenable — via Promise.resolve() AND via returning a thenable from
 * inside a .then() handler (same flattening behavior as returning a
 * real Promise, from then/03-return-promise.js).
 */

function createDelayedThenable(value, ms) {
  return {
    then(onFulfilled) {
      console.log(`  [thenable] .then() called, will resolve in ${ms}ms`);
      setTimeout(() => onFulfilled(value), ms);
    },
  };
}

console.log('--- Promise.resolve() assimilates a thenable ---');

const wrapped = Promise.resolve(createDelayedThenable('assimilated value', 40));
console.log('wrapped is a REAL Promise now:', wrapped instanceof Promise); // true

wrapped.then((v) => {
  console.log('  final value, fully unwrapped through the thenable:', v);
});

console.log('\n--- Returning a thenable from inside .then() ALSO gets flattened ---');

Promise.resolve('start')
  .then((v) => {
    console.log('  first .then(), returning a thenable instead of a value or real Promise');
    return createDelayedThenable(`derived from: ${v}`, 40);
  })
  .then((v) => {
    // This receives the UNWRAPPED value from the thenable directly
    // — not the thenable object itself. Exactly the same flattening
    // behavior as returning a real Promise.
    console.log('  second .then() receives the unwrapped value:', v);
  });

console.log('\n--- A THIRD-PARTY-style thenable used to build a chain naturally ---');

// This simulates what it looks like to use an OLDER library (e.g.
// jQuery's $.ajax(), which returns a jqXHR object that is thenable
// but NOT a real Promise) inside a modern async/Promise codebase —
// it just works, transparently.
function legacyLibraryCall(input) {
  return createDelayedThenable(`legacy result for: ${input}`, 30);
}

Promise.resolve('modern code')
  .then((v) => legacyLibraryCall(v)) // interoperates seamlessly
  .then((v) => console.log('  modern chain received legacy thenable\'s value:', v));

/**
 * This is exactly why the thenable concept matters in practice: it's
 * the interoperability seam that let the JS ecosystem migrate from
 * many competing Promise-like libraries (Q, Bluebird, jQuery
 * Deferreds, custom in-house implementations) to native Promises
 * without everything breaking — any of those older objects could be
 * dropped into a native Promise chain and "just work," because they
 * all implemented the same .then(onFulfilled, onRejected) shape.
 */
