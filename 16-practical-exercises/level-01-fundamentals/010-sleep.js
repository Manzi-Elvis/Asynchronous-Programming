/*
010 — Implement sleep()

Implement: sleep(milliseconds)

The caller should be able to write conceptually:

- Print A
- sleep
- Print B

You will eventually implement this using a Promise.

Important: The goal isn't merely to make sleep().

Explain why: sleep(1000) does not freeze JavaScript
for one second when implemented asynchronously.
*/

function sleep(ms){
      return new Promise(resolve => {
            setTimeout(resolve, ms);
      });
};

async function main(){
      console.log("Print A");
      await sleep(1000);
      console.log("Print B")
}

main();

/////////////////OR//////////////

async function main2(){
      console.log("Print A");
      await function sleep2(ms){
      return new Promise(resolve => {
            setTimeout(resolve, ms);
      });
};
      console.log("Print B")
}

main();