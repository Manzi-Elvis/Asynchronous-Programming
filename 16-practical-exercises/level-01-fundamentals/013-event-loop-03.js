/*
013 — Nested Microtask

Create a program where a microtask schedules another microtask.

Determine:

Which executes first?

Then explain why.
*/

Promise.resolve().then(() => {
    console.log("B");

    Promise.resolve().then(() => {
        console.log("C");
    });
});

/*
The first microtask runs and prints B. While that microtask is running,
it schedules another microtask that prints C. The newly scheduled microtask
is added to the microtask queue, so it runs after the current microtask finishes.
Therefore, B executes before C.
*/