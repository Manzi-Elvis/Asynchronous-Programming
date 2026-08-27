/*
009 — Repeating Async Operation

Simulate a server health check.

- Every second: Checking server...

- Then randomly produce: "Server healthy" or "Server unavailable"

- Stop after 10 checks.

Challenge:
What happens if the health-check operation itself takes longer than the interval?
Your first implementation may hide a concurrency problem.
*/

async function healthCheck(){
      let checks = 0;
      const interval = setInterval(() => {
            checks++;
            let healthy = Math.random() >= 0.5;
            if(healthy){
                  console.log("Server healthy")
            }
            else{
                  console.log("Server unavailable")
            }
            if(checks === 10){
                  clearInterval(interval)
                  console.log("Health checks finished")
            }
      },1000);
}
healthCheck();