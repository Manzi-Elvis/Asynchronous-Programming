// 012 — Multiple Microtasks
console.log("A");

Promise.resolve().then(() => {
    console.log("B");
});

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");

// Explain why the output occurs in that order.
/*
The output occurs in the order A, D, B, C
because A and D are synchronous code,
so they execute immediately.
The two Promise.then() callbacks are added to the microtask queue
in the order they appear.
After all synchronous code finishes, JavaScript processes the
microtask queue in order, so B runs first and then C.
Therefore, the final output is A, D, B, C.
*/