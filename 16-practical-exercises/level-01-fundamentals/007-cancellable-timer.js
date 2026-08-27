/*
007 — Cancellable Timer

Build: createTimer(callback, delay)

It should return something that allows the caller to cancel the timer.

Scenario:
   start timer
   ↓
   wait 500ms
   ↓
   cancel

The callback must never execute.

Think about:
1. What does clearTimeout() actually cancel?
-> The clearTimeout() function cancels the scheduled execution
   of a callback function that was previously set up using

2. Does it cancel JavaScript execution that has already begun?
-> No. clearTimeout() does not cancel JavaScript execution that has already begun.
   It only cancels a callback that is still waiting to execute.
*/
function createTimer(callback, delay){
      setTimeout(() => {
            callback();
      },delay);
      return function cancel(){
            clearTimeout(timerId)
      }
}

const cancel = createTimer(() => {
    console.log("Timer executed");
}, 1000);

setTimeout(() => {
    cancel();
    console.log("Timer cancelled");
}, 500);