/**
 * 02-resolve.js
 *
 * Goal: exercise resolve() with several different value types, and
 * see the shortcut Promise.resolve() for creating already-fulfilled
 * Promises without the constructor boilerplate.
 */

function resolveWith(value, label) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 20);
  }).then((v) => console.log(`${label}:`, v));
}

resolveWith(42, 'number');
resolveWith('hello', 'string');
resolveWith(true, 'boolean');
resolveWith({ id: 1, name: 'Elvis' }, 'object');
resolveWith([1, 2, 3], 'array');
resolveWith(null, 'null');

console.log('\n--- Promise.resolve() shortcut ---');

// These two are equivalent in outcome (though NOT identical in
// timing nuance — see resolution/02-resolve-promise.js for the
// subtlety around resolving with an existing Promise):
const longForm = new Promise((resolve) => resolve('value'));
const shortForm = Promise.resolve('value');

longForm.then((v) => console.log('long form:', v));
shortForm.then((v) => console.log('short form:', v));

/**
 * Promise.resolve(x) is the idiomatic way to get "a Promise wrapping
 * x" without writing out the full constructor. It's especially
 * useful for normalizing a value that MIGHT already be a Promise, or
 * might just be a plain value, into "always treat this as a
 * Promise" — see resolution/ for exactly how it decides what to do
 * with different input types.
 */