/*
008 — Countdown Timer

Build a countdown:
5
4
3
2
1
Done

Requirements:
- one second between values;
- use setInterval;
- stop automatically;
- don't leave the interval running after completion.

Edge cases:
What should happen for:
0
-1
1.5
"5"

Decide your behavior before implementing.
*/

const countdown = (start) => {
      if(!Number.isInteger(start) || start < 1){
            console.log("Invalid Input");
            return;
      };
      let current = start;
      console.log(current);
      const interval = setInterval(() => {
            current--;
            if(current === 0){
                  console.log("Done")
              clearInterval(interval);
              return;
            }
            console.log(current)
      },1000);
};
countdown(10);