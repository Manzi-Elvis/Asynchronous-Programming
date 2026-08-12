/**
 * 01-what-is-thenable.js
 *
 * Goal: the minimal definition — ANY object with a callable .then()
 * method counts as a thenable, real Promise or not.
 */

console.log('--- A real Promise IS a thenable (it has .then) ---');
const realPromise = Promise.resolve('real');
console.log('typeof realPromise.then:', typeof realPromise.then); // 'function'

console.log('\n--- A plain object with a .then() method is ALSO a thenable ---');
const fakeThenable = {
  then(onFulfilled, onRejected) {
    console.log('  my custom .then() was called');
    onFulfilled('value from the fake thenable');
  },
};
console.log('fakeThenable instanceof Promise:', fakeThenable instanceof Promise); // false!
console.log('but typeof fakeThenable.then:', typeof fakeThenable.then); // 'function' — still counts

fakeThenable.then((v) => console.log('  received directly:', v));

console.log('\n--- Something with .then but NOT a function is NOT a thenable ---');
const notAThenable = {
  then: 'this is a string, not a function',
};
console.log('typeof notAThenable.then:', typeof notAThenable.then); // 'string'
console.log('This object will NOT be treated specially by Promise.resolve() etc.');

/**
 * The formal rule (from the Promises/A+ spec, which native JS
 * Promises follow): an object is "thenable" if and only if it has a
 * property named `then` that is a FUNCTION. Nothing about its
 * prototype chain, its constructor, or whether it's "really" a
 * Promise matters at all — it's pure duck typing.
 */
