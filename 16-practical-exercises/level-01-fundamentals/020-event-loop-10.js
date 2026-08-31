/*
020 — Event Loop Challenge

Create an execution-order problem containing at least:
- 3 timers;
- 5 microtasks;
- 2 async functions;
- nested Promise callbacks;
- queueMicrotask.

Before execution, produce:

Expected output:
1.
2.
3.
...

Then execute it.

Final requirement: Explain the result without saying:
"Because that's how the event loop works."

You must explain:

call stack
→ scheduling
→ microtask queue
→ task/timer queue
→ execution
*/

console.log("A");
setTimeout(() => {console.log("B")},0);
async function myFunc1(){
      console.log("C");
      const D = await Promise.resolve().then(() => console.log("D"));
      console.log("E");
}
myFunc1();
console.log("F");
setTimeout(() => {console.log("G")},0);
console.log("H");
setTimeout(() => {console.log("I")},0);
console.log("J");
async function myFunc2(){
      console.log("K");
      const B = await Promise.resolve().then(() => console.log("L")).then(() => console.log("M"));
      console.log("N");
}
myFunc2();
console.log("O");
queueMicrotask(() => console.log("P"));
setTimeout(() => {console.log("Q")},0);
console.log("R");

// OUTPUT:
// A
// C
// F
// H
// J
// K
// O
// R
// D
// L
// P
// E
// M
// N
// B
// G
// I
// Q



/*
Why this happens
The call stack starts executing the top-level code synchronously.
Therefore, A, C, F, H, J, K, O, and R are printed first.
When myFunc1() reaches its await, its Promise .then() schedules D as a microtask,
and the function pauses. Similarly, myFunc2() reaches its await; its first .then()
schedules L, while the chained .then() for M cannot run yet because it must wait
for the first Promise callback to finish. queueMicrotask() schedules P.
Once the call stack is empty, the microtask queue is processed in order: D runs first,
and when it finishes, the continuation of myFunc1() schedules E;
then L runs, which allows its chained callback M to be scheduled.
P was already waiting in the queue, so it runs before the newly scheduled E and M.
The queue then continues with E, followed by M; when M finishes, the continuation
of myFunc2() schedules N, so N runs next. Only after the microtask queue is completely
empty does JavaScript begin executing the timer/task queue, giving B, G, I, and Q in
their registration order.

The key scheduling chain
Call stack:
A C F H J K O R
        ↓
Microtask queue:
D → L → P
        ↓
D finishes → E is added
L finishes → M is added
        ↓
P → E → M
        ↓
M finishes → N is added
        ↓
N
        ↓
Timer queue:
B → G → I → Q

One particularly important detail you got right is that
E does not immediately follow D. When D finishes, 
E is added to the back of the existing microtask queue,
so L and P get their turns first.
*/