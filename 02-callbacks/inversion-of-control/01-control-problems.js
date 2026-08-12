/**
 * 01-control-problems.js
 *
 * Goal: demonstrate, concretely, the "called too many times" and
 * "never called" trust problems that inversion of control exposes
 * you to — using intentionally misbehaving third-party-style
 * functions to simulate library bugs you don't control.
 */

console.log('--- Problem: called more times than expected ---');

function thirdPartyLibraryBuggy(callback) {
  // Imagine this is someone else's npm package. You have no way to
  // know, just from calling it, that it's about to call your
  // callback THREE times instead of once.
  callback(null, 'first call');
  callback(null, 'second call'); // bug in the library, not your code
  setTimeout(() => callback(null, 'third call, async'), 10);
}

let processedCount = 0;
thirdPartyLibraryBuggy((err, result) => {
  processedCount++;
  console.log(`  your callback fired (call #${processedCount}):`, result);
  if (processedCount > 1) {
    console.log('  !!! Your code now has to defensively guard against this !!!');
  }
});

// A defensive pattern you'd have to add YOURSELF, because nothing in
// the callback contract prevents this:
function callOnce(fn) {
  let called = false;
  return (...args) => {
    if (called) {
      console.log('  (guarded) ignoring extra invocation');
      return;
    }
    called = true;
    fn(...args);
  };
}

console.log('\n--- Same buggy library, but YOU defend against it ---');
thirdPartyLibraryBuggy(
  callOnce((err, result) => {
    console.log('  guarded callback fired with:', result);
  })
);

console.log('\n--- Problem: never called at all ---');

function thirdPartyLibraryHangs(callback) {
  // Imagine an internal early-return bug, or a silently swallowed
  // exception, that means callback is simply never invoked. There's
  // no error, no timeout, no signal of ANY kind that something went
  // wrong — your code just... waits forever.
  const condition = false;
  if (condition) {
    callback(null, 'this never happens');
  }
  // no else branch, no error, nothing. callback is just never called.
}

let didCallbackFire = false;
thirdPartyLibraryHangs(() => {
  didCallbackFire = true;
});

setTimeout(() => {
  console.log('  1 second later, did the callback ever fire?', didCallbackFire);
  console.log('  (Your code has NO built-in way to detect this failure mode.)');
  console.log('  The only mitigation available to plain callbacks is a manual');
  console.log('  timeout you add yourself — see 10-async-patterns/timeout/ later.');
}, 1000);