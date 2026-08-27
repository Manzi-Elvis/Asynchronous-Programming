/*
004 — Callback Error Handling

Build a callback-based API following this conceptual pattern:

    operation(error, result)

Create: divideAsync(a, b, callback)

Rules:
- division by zero → error;
- valid division → result;
- operation completes asynchronously.

Then build: calculateAsync(a, b, c, callback)
which performs: (a / b) + c
Your challenge: Make sure an error at any stage stops the remaining operations.

Think: What happens if you accidentally execute the callback twice?
*/

function divideAsync(a, b, callback) {
  setTimeout(() => {
    if (b === 0) {
      callback(new Error("Cannot divide by zero"), null);
      return;
    }

    const result = a / b;
    callback(null, result);
  }, 1000);
}


function calculateAsync(a, b, c, callback) {
  divideAsync(a, b, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }

    const finalResult = result + c;
    callback(null, finalResult);
  });
}

calculateAsync(10, 2, 5, (err, result) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Result:", result);
});