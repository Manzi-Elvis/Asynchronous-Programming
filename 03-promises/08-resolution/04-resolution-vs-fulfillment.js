/**
 * 04-resolution-vs-fulfillment.js
 *
 * Goal: nail down the vocabulary distinction explicitly, and
 * demonstrate the one genuinely illegal case — a Promise resolving
 * to ITSELF, which throws a TypeError.
 */

console.log('--- A Promise cannot resolve to itself ---');

process.once('unhandledRejection', (reason) => {
  console.log('  [caught via unhandledRejection] the self-resolution error:', reason.message);
});

let selfRef;
const selfResolvingPromise = new Promise((resolve) => {
  selfRef = resolve;
});

// Trying to resolve a Promise with itself:
selfRef(selfResolvingPromise);

// This makes selfResolvingPromise become REJECTED (not fulfilled!)
// with a TypeError, because the spec explicitly disallows a Promise
// from adopting its own state — that would create an infinite,
// meaningless resolution loop (an object waiting on itself, forever).
selfResolvingPromise.catch((err) => {
  console.log('  caught directly:', err.constructor.name, '-', err.message);
});

console.log('\n--- "Resolve" vs "fulfill", vocabulary check ---');

console.log(`
  RESOLVE  = the ACT of calling the resolve() function with some value x.
             What happens next depends on what x is.

  FULFILL  = a FINAL STATE. A Promise is fulfilled once it has a
             concrete, settled, non-Promise, non-thenable value locked in.

  Calling resolve(plainValue)     -> immediately leads to fulfillment
  Calling resolve(anotherPromise) -> leads to a WAIT, then EVENTUALLY
                                       either fulfillment or rejection,
                                       matching the other Promise
  Calling reject(anything)        -> immediately leads to rejection,
                                       always, regardless of what you
                                       pass — reject() has NO
                                       equivalent "adoption" behavior.
                                       Even reject(somePromise) just
                                       rejects with that Promise OBJECT
                                       itself as the reason, unwrapped.
`);

console.log('--- Proving reject() has no adoption behavior, unlike resolve() ---');

const innerPromise = Promise.resolve('inner value');

const rejectedWithPromise = new Promise((_, reject) => {
  reject(innerPromise); // passing a Promise to REJECT, not resolve
});

rejectedWithPromise.catch((reason) => {
  console.log('  rejection reason is the Promise ITSELF, not unwrapped:', reason);
  console.log('  reason instanceof Promise:', reason instanceof Promise); // true!
});

/**
 * This asymmetry (resolve() unwraps Promises/thenables, reject()
 * never does) is a real, spec-defined asymmetry worth remembering —
 * it's an easy source of confusion if you ever accidentally reject
 * with a Promise expecting it to somehow "unwrap" the way resolve()
 * would.
 */
