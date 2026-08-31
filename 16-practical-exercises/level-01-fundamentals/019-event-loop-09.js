/*
019 — Nested Async Scheduling

Combine:
- async/await
- Promise.then
- queueMicrotask
- setTimeout
- nested callbacks

1. Create your own execution-order puzzle.
2. Your goal is not to solve someone else's puzzle anymore.
3. You design the puzzle and then solve it.
*/

console.log("A");
async function myFunction(){
      console.log("B");
      const C = await Promise.resolve().then(() => console.log("C"));
      console.log("D");
}
myFunction();
console.log("E");
queueMicrotask(() => console.log("F"));
console.log("G")
setTimeout(() => {console.log("H")},0);
console.log("I")
Promise.resolve().then(() => console.log("J")).then(() => console.log("K"));
console.log("L")

/*
The output is A, B, E, G, I, L, C, F, J, D, K, H because the synchronous code runs first,
producing A, B, E, G, I, L. When myFunction() reaches await, it pauses, and the .then() callback
that prints C is placed in the microtask queue. Then queueMicrotask() adds F, and the Promise chain
adds J, so F and J run before D because D can only be scheduled after the C microtask finishes
and the async function resumes. When C runs, the await continuation is added to the end of the
microtask queue, after F and J, so the order becomes C → F → J → D. When J runs, its second .then() 
callback for K is added to the end of the microtask queue, so D runs before K because D was already
waiting in the queue before K was created. Finally, after all microtasks are finished, the timer
runs H. Therefore, the final order is A → B → E → G → I → L → C → F → J → D → K → H.
*/