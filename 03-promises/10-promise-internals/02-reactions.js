/**
 * 02-reactions.js
 *
 * Goal: simulate the concept of a "PromiseReaction" — every .then()
 * call registers ONE reaction (handler + which output Promise to
 * settle), and a single Promise can accumulate MANY independent
 * reactions before it ever settles.
 */

class SimplePromiseWithVisibleReactions {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reactions = []; // <- conceptually mirrors the spec's [[PromiseFulfillReactions]] / [[PromiseRejectReactions]]

    const resolve = (value) => {
      if (this.state !== 'pending') return; // settle-once guarantee
      this.state = 'fulfilled';
      this.value = value;
      console.log(`  [engine] settled as fulfilled, now notifying ${this.reactions.length} reaction(s)`);
      this._flushReactions();
    };

    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.value = reason;
      console.log(`  [engine] settled as rejected, now notifying ${this.reactions.length} reaction(s)`);
      this._flushReactions();
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  _flushReactions() {
    // Each reaction becomes its own microtask, in registration order —
    // this is the PromiseReactionJob concept from NOTES.md.
    for (const reaction of this.reactions) {
      queueMicrotask(() => reaction(this.state, this.value));
    }
    this.reactions = [];
  }

  then(onFulfilled, onRejected) {
    const reaction = (state, value) => {
      if (state === 'fulfilled' && onFulfilled) onFulfilled(value);
      if (state === 'rejected' && onRejected) onRejected(value);
    };

    if (this.state === 'pending') {
      console.log('  [then()] Promise still pending — REGISTERING a new reaction, not running yet');
      this.reactions.push(reaction);
    } else {
      console.log('  [then()] Promise already settled — queuing this reaction as a microtask immediately');
      queueMicrotask(() => reaction(this.state, this.value));
    }
  }
}

console.log('--- Multiple .then() calls on a still-PENDING simplified Promise ---');

const p = new SimplePromiseWithVisibleReactions((resolve) => {
  setTimeout(() => resolve('the value'), 40);
});

p.then((v) => console.log('  reaction A received:', v));
p.then((v) => console.log('  reaction B received:', v));
p.then((v) => console.log('  reaction C received:', v));

console.log('  (all three .then() calls above just REGISTERED reactions —');
console.log('   nothing has run yet, because the Promise is still pending)');

/**
 * This is a simplified but faithful simulation of a real mechanic:
 * calling .then() on a PENDING Promise doesn't run anything
 * immediately — it just appends a reaction record to an internal
 * list. Only once the Promise actually settles does the engine walk
 * that list and schedule ONE microtask per reaction, in the order
 * they were registered — which is exactly why multiple .then()
 * handlers on the same Promise fire in registration order, every time.
 */
