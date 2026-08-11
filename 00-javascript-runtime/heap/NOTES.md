# Heap

## What it is

The heap is a large, mostly unstructured region of memory where JavaScript
stores objects: plain objects, arrays, functions, closures, class
instances — anything reference-typed. Unlike the stack, the heap isn't
LIFO-ordered; it's more like a warehouse where things live until nothing
references them anymore, at which point the garbage collector reclaims the
space.

## Primitives vs references

| Primitives (stored directly, copied by value) | Reference types (stored in heap, variable holds a pointer) |
|---|---|
| `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` | `object`, `array`, `function`, `Map`, `Set`, `Date`, everything else |

```js
let a = 5;
let b = a;   // b gets its OWN copy of 5
b = 10;
console.log(a); // 5 — unaffected

let obj1 = { val: 5 };
let obj2 = obj1; // obj2 points to the SAME heap object as obj1
obj2.val = 10;
console.log(obj1.val); // 10 — same object, mutated through either reference
```

## Why this matters for async programming

Closures — functions that "remember" variables from their enclosing
scope — are how callbacks and Promise executors keep access to state after
their outer function has already returned and its stack frame is gone.

```js
function createCounter() {
  let count = 0; // normally this would die with the stack frame
  return function increment() {
    count += 1; // but this closure keeps `count` alive on the HEAP
    return count;
  };
}

const increment = createCounter();
// createCounter()'s stack frame is long gone, but `count` lives on
// in the heap because `increment` still references it.
console.log(increment()); // 1
console.log(increment()); // 2
```

This exact mechanism is what makes `setTimeout(() => console.log(x), 1000)`
still have access to `x` a full second after the surrounding function
returned — `x` escaped to the heap via the closure.

## Files here

- `01-primitives-vs-references.js` — copy-by-value vs copy-by-reference in practice
- `02-objects-and-memory.js` — closures keeping heap objects alive, shared references

## Exercises

- `exercises/01-reference-tracing.js`