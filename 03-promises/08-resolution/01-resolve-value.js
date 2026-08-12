/**
 * 01-resolve-value.js
 *
 * Goal: the simple, common case — resolving with a plain value leads
 * immediately (in engine terms) to fulfillment. Establishing this as
 * the baseline before contrasting with the Promise/thenable cases.
 */

const p1 = new Promise((resolve) => {
  resolve(42); // a plain number — immediate fulfillment
});

const p2 = new Promise((resolve) => {
  resolve({ key: 'an object value' }); // still a plain value, just a reference type
});

const p3 = new Promise((resolve) => {
  resolve([1, 2, 3]); // an array — also just a plain value here
});

p1.then((v) => console.log('p1 fulfilled with:', v));
p2.then((v) => console.log('p2 fulfilled with:', v));
p3.then((v) => console.log('p3 fulfilled with:', v));

/**
 * None of these values have a .then() method, so none of them
 * trigger the "adoption" behavior covered in the next two files —
 * they go straight to fulfilled. This is the 99% case in everyday
 * code: most of the time, resolve() is called with a genuine final
 * value, not another Promise.
 */

console.log('\n--- resolve(undefined) and resolve() with no argument are equivalent ---');

new Promise((resolve) => resolve()).then((v) => console.log('resolve() with no arg:', v));
new Promise((resolve) => resolve(undefined)).then((v) => console.log('resolve(undefined):', v));
