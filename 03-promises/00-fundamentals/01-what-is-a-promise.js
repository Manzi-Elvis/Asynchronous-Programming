/**
 * 01-what-is-a-promise.js
 *
 * Goal: create a Promise, inspect what you CAN and CANNOT see about
 * it directly, and understand that it's a real object you can log,
 * store, and pass around — not just syntax.
 */

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('the value'), 50);
});

console.log('typeof promise:', typeof promise); // 'object'
console.log('promise instanceof Promise:', promise instanceof Promise); // true
console.log('promise itself, logged directly:', promise);
// Node will print something like: Promise { <pending> }
// This IS genuinely useful info Node gives you for debugging, but it's
// not something your own code can read programmatically — there's no
// .state property.

// The ONLY sanctioned way to find out what happened: attach a handler.
promise.then((value) => {
  console.log('Resolved value, learned via .then():', value);
});

console.log('\n--- A Promise is just an object — you can store it, pass it around ---');

function createDelayedPromise(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

const stored = createDelayedPromise('stored value', 30);
const promises = [stored, createDelayedPromise('another', 10)];
console.log('An array of Promise objects:', promises);

promises[0].then((v) => console.log('promises[0] resolved to:', v));
promises[1].then((v) => console.log('promises[1] resolved to:', v));

/**
 * Key takeaway: a Promise is a first-class JS value like any object.
 * You can put it in a variable, an array, an object property, pass
 * it as a function argument, return it from a function — all before
 * it has even settled. What's special about it isn't that it's
 * magic syntax; it's that it has this internal state machine plus a
 * `.then()` method that lets you register what happens next.
 */