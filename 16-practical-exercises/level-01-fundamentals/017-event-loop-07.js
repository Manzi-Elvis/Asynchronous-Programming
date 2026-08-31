/*
017 — async Function

Create an async function containing:

- console.log()
- await Promise.resolve()
- console.log()

Call it alongside normal synchronous code.

Predict the result.
*/

async function myFunction(){
      console.log("A");
      await Promise.resolve().then(() => console.log("B"));
}

myFunction();
console.log("C");

// OUTPUT: A,C,B