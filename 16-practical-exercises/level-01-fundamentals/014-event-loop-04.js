/*
014 — Timer Inside Microtask

Construct a program containing:

Promise.then()
setTimeout()
nested Promise.then()

Your task is to determine the exact ordering.
*/

Promise.resolve().then(() => {
    console.log("A");

    setTimeout(() => {
        console.log("B");

        Promise.resolve().then(() => {
            console.log("C");
        });
    }, 0);
});

console.log("D");

// OUTPUT:
// D
// A
// B
// C