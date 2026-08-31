// 011 — Basic Task vs Microtask
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");


//  Determine the exact output.


// A
// D
// C
// B