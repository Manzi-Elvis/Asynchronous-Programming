/**
 * 04-fulfilled.js
 *
 * Goal: the fulfilled state in isolation — creating an
 * already-fulfilled Promise, and seeing that .then() still defers
 * to a microtask even when there's no real waiting involved at all.
 */

const instantlyFulfilled = Promise.resolve('immediate value');

console.log('Promise.resolve() creates an ALREADY fulfilled Promise:', instantlyFulfilled);

console.log('1: about to attach .then()');
instantlyFulfilled.then((value) => {
  console.log('3: .then() fired with:', value);
});
console.log('2: this logs BEFORE the .then() callback, even though the');
console.log('   Promise was fulfilled before .then() was even called');

/**
 * This is the same guarantee proven in module 00's microtask-queue
 * notes: EVERY .then() callback is scheduled as a microtask,
 * unconditionally, regardless of whether the Promise was already
 * settled at attachment time.
 */

console.log('\n--- Multiple .then() calls on the SAME fulfilled Promise ---');

const shared = Promise.resolve(100);

shared.then((v) => console.log('  handler A sees:', v));
shared.then((v) => console.log('  handler B sees:', v));
shared.then((v) => console.log('  handler C sees:', v));

/**
 * A single Promise can have MANY independent .then() handlers
 * attached to it — each one gets called with the same fulfilled
 * value, independently. This is different from a callback-based
 * function, which typically only supports ONE callback per call.
 * A fulfilled Promise's value can be "replayed" to as many
 * subscribers as you want, in the order they were attached.
 */

console.log('\n--- Fulfilling with different value types ---');

Promise.resolve(42).then((v) => console.log('number:', v));
Promise.resolve('a string').then((v) => console.log('string:', v));
Promise.resolve({ key: 'value' }).then((v) => console.log('object:', v));
Promise.resolve([1, 2, 3]).then((v) => console.log('array:', v));
Promise.resolve(null).then((v) => console.log('null:', v));
Promise.resolve(undefined).then((v) => console.log('undefined:', v));

// A Promise can fulfill with ANY value type, including another
// Promise — which triggers special "flattening" behavior covered in
// resolution/03-resolve-thenable.js and resolution/02-resolve-promise.js.