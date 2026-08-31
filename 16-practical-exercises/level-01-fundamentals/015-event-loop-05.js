/*
015 — Multiple Timers

Create five timers:

0ms
0ms
10ms
1ms
0ms

Determine whether the timers necessarily execute in numerical delay order.

Explain your answer.
*/

setTimeout(() => {
      console.log("A")
},0)

setTimeout(() => {
      console.log("B")
},0)

setTimeout(() => {
      console.log("C")
},10)

setTimeout(() => {
      console.log("D")
},1)

setTimeout(() => {
      console.log("E")
},0)

/*
The timers do not necessarily execute in numerical delay order.
The delay specifies the minimum amount of time before a timer
becomes eligible, not when it must execute.
Once a timer is eligible, it still has to wait for the event loop to reach it.
In this example, the 0ms timers are registered first, so the expected order is A → B → E → D → C.
*/