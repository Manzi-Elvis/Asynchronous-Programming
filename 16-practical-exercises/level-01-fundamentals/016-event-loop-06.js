/*
016 — queueMicrotask()

Use: queueMicrotask(...)

alongside:

- Promise.then()
- setTimeout()
- console.log()

Determine the ordering.

Additional Question:
How is queueMicrotask() related to the Promise microtask mechanism?

ANSWER: queueMicrotask() and Promise.then() both schedule microtasks.
      They use the same microtask queue, so their callbacks execute
      in the order they were queued.
*/

console.log("A");

Promise.resolve().then(() => console.log("B"));

setTimeout(() => {
      console.log("C")
},0);

queueMicrotask(() => {
      console.log("D")
})

console.log("E")

// OUTPUT: A,E,B,D,C