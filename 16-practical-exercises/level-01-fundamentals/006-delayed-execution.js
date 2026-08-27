/*
006 — Delayed Execution

Create: runAfter(callback, delay)

Then test it with five callbacks:

A → 1000ms
B → 300ms
C → 700ms
D → 100ms
E → 500ms

- Predict the output before running the program.
- Expected ordering should be determined by completion time rather than source-code order.

Critical question: Does JavaScript execute these callbacks concurrently?
Answer:
      No, the callbacks themselves are not executed concurrently.
      JavaScript is single-threaded, meaning it can execute only
      one piece of JavaScript code at a time on the main thread.
      However, the timers can be running/waiting concurrently.

Explain what "concurrent" means here.
      Concurrent means that multiple tasks are in progress
      during overlapping periods of time, even if they aren't
      executing at the exact same instant.
*/

function runAfter(callback, delay){
      setTimeout(() => {
            callback()
      },delay)
}
runAfter(() => console.log("A"), 1000);
runAfter(() => console.log("B"), 300);
runAfter(() => console.log("C"), 700);
runAfter(() => console.log("D"), 100);
runAfter(() => console.log("E"), 500);

// OUTPUT:
// D
// B
// E
// C
// A
