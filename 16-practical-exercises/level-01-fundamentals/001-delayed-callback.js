/*
Topic: Callbacks + timers

Problem: Create a function: delay(callback, milliseconds)

It should execute callback after the specified delay.

Example:
  delay(() => {
    console.log("Hello");
  }, 1000);

Expected behavior:

Immediately:
program continues

After ~1000ms:
Hello

Constraints:
- Use a callback.
- Use setTimeout.
- Don't use Promises.
- Don't use async/await.

Think about:
1. Where is the callback stored?
2. Who invokes it?
3. Does delay() wait for the callback?
4. Does the JavaScript thread stop for one second?

Extension:
Modify the function so the callback receives: elapsedTime
Ask yourself how accurately you can measure it.
*/