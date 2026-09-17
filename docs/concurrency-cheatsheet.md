## The Challenge

Can you predict **exactly** what gets printed?

You'll need to track:

- 🟢 Synchronous code
- 🔵 `Promise.then()`
- 🟣 `queueMicrotask()`
- 🟠 `async/await`
- 🔴 `setTimeout()`
- 🔄 Nested callbacks

### Your Mission

Look at this code:

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

async function first() {
    console.log("C");

    await Promise.resolve().then(() => {
        console.log("D");
    });

    console.log("E");
}

first();

console.log("F");

queueMicrotask(() => {
    console.log("G");
});

Promise.resolve()
    .then(() => {
        console.log("H");

        queueMicrotask(() => {
            console.log("I");
        });
    })
    .then(() => {
        console.log("J");
    });

setTimeout(() => {
    console.log("K");
}, 0);

console.log("L");
```

### ❓ What is the output?
Write the messages in the exact order:
```
1.
2.
3.
4.
5.
...
```

### Rules of the Game
Before running the code, think about:

1. What runs synchronously?
2. What gets added to the microtask queue?
3. What gets added to the timer queue?
4. What happens when an await pauses an async function?
5. What happens when a microtask creates another microtask?

Don't run the code to find the answer.

### 💡 Hint
Remember:
`Synchronous code → Microtasks → Timer tasks`

But there's a twist: new microtasks can be added while the microtask queue is already being processed.

### 🏆 Goal
Implement:
```
function executionOrder() {
    // Your solution
}
```

and return the exact execution order as an array.

### Example format:
```
[
    "A",
    "C",
    "F",
    // ...
]
```
Good luck — the event loop is watching 👀