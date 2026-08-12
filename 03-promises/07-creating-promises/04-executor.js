/**
 * 04-executor.js
 *
 * Goal: dig deeper into executor timing — specifically, that if the
 * executor THROWS synchronously (rather than calling reject), the
 * Promise still becomes rejected, automatically, with the thrown
 * error as the reason.
 */

console.log('--- Executor that throws synchronously ---');

const throwingExecutorPromise = new Promise((resolve, reject) => {
  console.log('  executor running...');
  throw new Error('thrown directly, not via reject()');
  // Nothing after a throw runs, obviously — but note we never
  // called reject() ourselves.
});

throwingExecutorPromise.catch((err) => {
  console.log('  caught (via automatic conversion):', err.message);
});

/**
 * The Promise constructor wraps your executor in an implicit
 * try/catch. If it throws synchronously, that's treated EXACTLY
 * like calling reject(theThrownError). This is a real convenience:
 * you don't need your own try/catch inside every executor just to
 * convert exceptions into rejections — the constructor already does
 * it for you.
 */

setTimeout(() => {
  console.log('\n--- But an ASYNC throw inside the executor is NOT auto-caught ---');
  console.log('  (this demo uses a global handler to catch it WITHOUT crashing,');
  console.log('   purely so this file can run start-to-finish for demonstration —');
  console.log('   in real code you would NOT normally rely on this safety net)');

  const onUncaught = (err) => {
    console.log('  process-level uncaughtException handler caught it:', err.message);
    console.log('  <- notice: NOT a .catch() on any Promise. A totally different');
    console.log('     mechanism, because this was never a rejection in the first place.');
  };
  process.once('uncaughtException', onUncaught);

  const asyncThrowPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // This throw happens INSIDE a setTimeout callback, which is a
      // completely separate call stack from the executor's own
      // synchronous execution. The Promise constructor's implicit
      // try/catch has ALREADY finished running by the time this
      // fires — it cannot catch this. Without the process-level
      // handler above, this would crash the whole script.
      throw new Error('thrown asynchronously — this will NOT become a rejection');
    }, 20);
  });

  asyncThrowPromise.catch((err) => {
    // This NEVER runs for the throw above — proving the throw did
    // NOT become a Promise rejection at all.
    console.log('  this .catch() never fires for the async throw');
  });
}, 100);

/**
 * Practical rule: only throws that happen SYNCHRONOUSLY, directly
 * inside the executor function's own top-level code, get
 * automatically converted to rejections. Anything thrown inside a
 * nested callback (setTimeout, a database driver's callback, etc.)
 * needs to be manually caught and passed to reject() yourself — see
 * error-handling/ for the full treatment of this distinction.
 */