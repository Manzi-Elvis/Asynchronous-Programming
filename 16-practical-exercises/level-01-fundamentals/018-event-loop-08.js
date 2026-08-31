/*
018 — Multiple awaits

1. Create an async function with three separate awaits.
2. Determine where execution pauses and resumes.

Important question:
Does every await necessarily cause the same kind of scheduling behavior?

Answer: Every await suspends the async function and causes
      its continuation to be scheduled asynchronously,
      generally as a microtask. However, the exact execution
      order can differ depending on the Promise/value being
      awaited and other work already queued
*/

console.log("A");
async function myFunction(){
      console.log("B");
      const A = await Promise.resolve().then(() => console.log("C"));
      console.log("D");
      const B = await Promise.resolve().then(() => console.log("E"));
      console.log("F");
      const C = await Promise.resolve().then(() => console.log("G"));
      console.log("H");
}
myFunction();
console.log("I");

// OUTPUT:
// A
// B
// I
// C
// D
// E
// F
// G
// H