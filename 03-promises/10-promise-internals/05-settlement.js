/**
 * 05-settlement.js
 *
 * Goal: a complete, from-scratch mini simulation tying EVERYTHING in
 * this sub-topic together — capability creation, reaction
 * registration, settlement, and job-queue notification — in one
 * cohesive, heavily-commented walkthrough. This is the closest this
 * sub-topic gets to a "preview" of module 14's full implementation,
 * while still remaining intentionally simplified (no thenable
 * assimilation, no chaining support, no error propagation through
 * .then()'s return value — just the settle+notify core).
 */

const microtasks = [];
function scheduleMicrotask(fn) {
  microtasks.push(fn);
}
function drainMicrotasks() {
  while (microtasks.length > 0) {
    const job = microtasks.shift();
    job();
  }
}

class MiniPromise {
  constructor(executor) {
    // --- Step 1: internal state, mirrors [[PromiseState]] / [[PromiseResult]] ---
    this._state = 'pending';
    this._value = undefined;
    this._reactions = []; // mirrors [[PromiseFulfillReactions]] + [[PromiseRejectReactions]] combined

    // --- Step 2: the capability's resolve/reject, closures over `this` ---
    const resolve = (value) => {
      if (this._state !== 'pending') {
        console.log('    (resolve called again after settling — ignored, settle-once guarantee)');
        return;
      }
      this._state = 'fulfilled';
      this._value = value;
      console.log(`    [MiniPromise] settled: fulfilled with`, value);
      this._notifyReactions();
    };

    const reject = (reason) => {
      if (this._state !== 'pending') {
        console.log('    (reject called again after settling — ignored, settle-once guarantee)');
        return;
      }
      this._state = 'rejected';
      this._value = reason;
      console.log(`    [MiniPromise] settled: rejected with`, reason);
      this._notifyReactions();
    };

    // --- Step 3: run the executor, with the implicit try/catch ---
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  _notifyReactions() {
    // --- Step 4: one microtask job PER registered reaction ---
    for (const reaction of this._reactions) {
      scheduleMicrotask(() => reaction(this._state, this._value));
    }
    this._reactions = [];
  }

  then(onFulfilled, onRejected) {
    const reaction = (state, value) => {
      if (state === 'fulfilled') {
        if (onFulfilled) onFulfilled(value);
      } else {
        if (onRejected) onRejected(value);
      }
    };

    if (this._state === 'pending') {
      // --- Registration path: Promise not settled yet ---
      this._reactions.push(reaction);
    } else {
      // --- Already-settled path: still deferred to a microtask,
      // never run synchronously (matches creating-promises/05-synchronous-executor.js) ---
      scheduleMicrotask(() => reaction(this._state, this._value));
    }
  }
}

console.log('--- Full walkthrough: pending Promise, multiple reactions, then settlement ---\n');

console.log('1. Creating a MiniPromise (executor resolves after a fake delay)');
const mp = new MiniPromise((resolve) => {
  console.log('   executor running synchronously right now');
  setTimeout(() => {
    console.log('   (async) calling resolve() now');
    resolve('the final value');
  }, 0);
});

console.log('2. Attaching two reactions while still pending');
mp.then((v) => console.log('   reaction A got:', v));
mp.then((v) => console.log('   reaction B got:', v));

console.log('3. Nothing has run yet — reactions are just QUEUED internally, waiting');
console.log(`   current internal reaction count: ${mp._reactions.length}`);

setTimeout(() => {
  console.log('\n4. Enough real time has passed for resolve() to have fired.');
  console.log(`   microtask job queue length right now: ${microtasks.length}`);
  console.log('5. Draining our simulated microtask queue (in a real engine, automatic):');
  drainMicrotasks();
  console.log('6. Done — both reactions fired, in registration order, exactly once each.');
}, 20);
