/**
 * 05-rejected.js
 *
 * Goal: the rejected state in isolation — creating an already-
 * rejected Promise, handling it correctly, and seeing what happens
 * when you DON'T handle it (an unhandled rejection warning).
 */

console.log('--- A properly-handled rejection ---');

const handledRejection = Promise.reject(new Error('something failed'));

handledRejection.catch((err) => {
  console.log('  caught:', err.message);
});

/**
 * IMPORTANT ordering note: the .catch() above is attached
 * SYNCHRONOUSLY, right after Promise.reject() creates the rejected
 * Promise, in the very next line. This matters — see the unhandled
 * example below for what happens if you DON'T attach a handler in
 * time (or at all).
 */

console.log('\n--- Rejecting with different reason types ---');

Promise.reject(new Error('an Error object')).catch((e) => console.log('  caught Error:', e.message));
Promise.reject('a plain string reason').catch((e) => console.log('  caught string:', e));
Promise.reject({ code: 500, message: 'a plain object reason' }).catch((e) => console.log('  caught object:', e));

/**
 * You CAN reject with any value, not just an Error instance — but
 * you should almost always use a real Error (or subclass), because
 * Error objects carry a stack trace, which is often the single most
 * useful piece of debugging information when something fails deep
 * inside an async chain. Rejecting with a bare string throws away
 * that stack trace entirely.
 */

console.log('\n--- What an UNHANDLED rejection looks like ---');
console.log('(normally Node crashes the process for this — this demo');
console.log(' installs a listener JUST to show the warning without dying,');
console.log(' so this file can run start-to-finish for demonstration)');

process.once('unhandledRejection', (reason) => {
  console.log('  [unhandledRejection event fired]', reason.message);
  console.log('  in real code with NO listener, modern Node crashes the process here.');
});

// No .catch() attached anywhere. In modern Node, this triggers an
// 'unhandledRejection' event, and without a listener, crashes the
// process by default (behavior has changed across Node versions —
// always at minimum a loud warning, often a hard crash today).
Promise.reject(new Error('nobody is listening for this'));

/**
 * Why this matters: an unhandled rejection is functionally the
 * async-code equivalent of an uncaught exception. Node treats it
 * seriously (as it should) because a silently-ignored rejected
 * Promise usually means a real error happened and NOBODY in your
 * program ever found out. We cover the detection and handling
 * strategy properly in error-handling/05-unhandled-rejection.js and
 * again in 12-debugging/01-unhandled-rejection.js.
 */