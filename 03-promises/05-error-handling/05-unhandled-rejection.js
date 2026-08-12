/**
 * 05-unhandled-rejection.js
 *
 * Goal: understand and demonstrate Node's unhandledRejection event —
 * how to detect it, and why global "safety nets" are a last resort,
 * not a substitute for actually handling errors where they occur.
 */

console.log('--- Setting up a global unhandledRejection listener ---');

const seenRejections = [];

process.on('unhandledRejection', (reason, promise) => {
  seenRejections.push(reason);
  console.log('  [GLOBAL HANDLER] caught an unhandled rejection:', reason.message);
});

console.log('\n--- This rejection IS handled (has a .catch()) — should NOT trigger the global handler ---');

Promise.reject(new Error('properly handled')).catch((err) => {
  console.log('  handled locally:', err.message);
});

console.log('\n--- This one is NOT handled anywhere — WILL trigger the global handler ---');

Promise.reject(new Error('nobody catches this one'));

console.log('\n--- A rejection inside a .then() chain with NO trailing .catch() ---');

Promise.resolve('start').then(() => {
  throw new Error('thrown mid-chain, chain has no .catch() at all');
});

setTimeout(() => {
  console.log('\n--- After giving the event loop a turn, what did the global handler see? ---');
  console.log('  total unhandled rejections caught:', seenRejections.length);
  seenRejections.forEach((r, i) => console.log(`    ${i + 1}.`, r.message));

  console.log(`
IMPORTANT CAVEAT about timing: Node determines whether a rejection is
"unhandled" by checking, at the end of the current microtask queue
drain, whether ANY .catch() has been attached yet — not forever, just
by that point. This means attaching a .catch() LATE (e.g. via
setTimeout) can sometimes still count as unhandled, because the check
already happened before your late .catch() was attached. This is why
error handling should be attached as part of the SAME synchronous
chain-building code, not tacked on asynchronously after the fact.
`);
}, 100);

/**
 * Practical guidance:
 *   - A global unhandledRejection listener is useful as a SAFETY NET
 *     for logging/alerting in production (so you at least find out
 *     something went wrong) — NOT as your primary error handling
 *     strategy.
 *   - The real fix for unhandled rejections is always to attach a
 *     .catch() (or use try/catch with async/await, module 05) at the
 *     appropriate point in every Promise chain your code creates.
 *   - Modern Node (recent major versions) by default CRASHES the
 *     process on an unhandled rejection if no listener is present —
 *     treat it with the same seriousness as an uncaught exception,
 *     because that's effectively what it is.
 */
