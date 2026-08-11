/**
 * 01-primitives-vs-references.js
 *
 * Goal: build a rock-solid intuition for value semantics (primitives)
 * vs reference semantics (objects/arrays), because every async bug
 * involving "shared state" traces back to this.
 */

// --- Primitives: copied by value ---
let x = 10;
let y = x; // y gets an independent copy
y += 5;
console.log('x:', x); // 10 — unchanged
console.log('y:', y); // 15

let str1 = 'hello';
let str2 = str1;
str2 = str2.toUpperCase(); // strings are immutable + copied by value
console.log('str1:', str1); // 'hello'
console.log('str2:', str2); // 'HELLO'

// --- Objects: copied by reference ---
const person1 = { name: 'Elvis', role: 'engineer' };
const person2 = person1; // same heap object, two variables pointing to it
person2.role = 'senior engineer';
console.log('person1.role:', person1.role); // 'senior engineer' — SAME object
console.log('person2.role:', person2.role); // 'senior engineer'
console.log('person1 === person2:', person1 === person2); // true — same reference

// --- Arrays: also reference type ---
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log('arr1:', arr1); // [1, 2, 3, 4] — mutated through arr2
console.log('arr1 === arr2:', arr1 === arr2); // true

// --- Creating an ACTUAL independent copy ---
const arr3 = [...arr1];        // shallow copy via spread
const person3 = { ...person1 }; // shallow copy via spread
arr3.push(999);
person3.role = 'independent copy';
console.log('arr1 unaffected by arr3 push:', arr1); // still [1,2,3,4]
console.log('person1 unaffected by person3 edit:', person1.role); // 'senior engineer'

/**
 * The async connection: when you pass an object into a callback,
 * a Promise chain, or an async function, you're passing a REFERENCE.
 * If multiple async operations mutate the same object concurrently,
 * you get race conditions — not because JS ran things in parallel,
 * but because interleaved async callbacks can each grab a reference
 * to the SAME heap object and mutate it in an order you didn't
 * expect. We'll see this concretely in 13-common-mistakes/08-race-condition.js.
 */