/**
 * 01-new-promise.js
 *
 * Goal: the basic constructor shape, and proving the executor starts
 * running synchronously, immediately.
 */

console.log('1: before new Promise');

const promise = new Promise((resolve, reject) => {
  console.log('2: inside executor — runs synchronously, right now');
  setTimeout(() => {
    console.log('4: inside setTimeout, about to resolve');
    resolve('the eventual value');
  }, 50);
});

console.log('3: after new Promise (executor already ran its sync part)');

promise.then((value) => {
  console.log('5: .then() received:', value);
});

/**
 * Output order: 1, 2, 3, 4, 5
 *
 * Line 2 happens BEFORE line 3 — the executor's synchronous code
 * (the console.log, and the setTimeout REGISTRATION itself) all
 * happens immediately as part of constructing the Promise. Only the
 * setTimeout's CALLBACK (line 4, calling resolve) is deferred.
 */