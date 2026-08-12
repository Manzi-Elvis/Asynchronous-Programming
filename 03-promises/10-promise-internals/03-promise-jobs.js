/**
 * 03-promise-jobs.js
 *
 * Goal: make the reaction-to-microtask connection completely
 * explicit by manually building a tiny "job queue" ourselves,
 * mirroring (in simplified form) how the real microtask queue
 * relates to Promise reactions.
 */

// A hand-rolled job queue, standing in for the engine's real
// microtask queue, just to make the mechanism fully visible.
const jobQueue = [];

function enqueueJob(job) {
  jobQueue.push(job);
}

function drainJobQueue() {
  console.log(`  [drain] ${jobQueue.length} job(s) queued, running them all now`);
  while (jobQueue.length > 0) {
    const job = jobQueue.shift();
    job();
  }
}

class TeachingPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reactions = [];

    const settle = (state) => (value) => {
      if (this.state !== 'pending') return;
      this.state = state;
      this.value = value;
      for (const reaction of this.reactions) {
        // Each settled reaction becomes ONE job in our manual queue —
        // conceptually identical to a real PromiseReactionJob being
        // pushed onto the real microtask queue.
        enqueueJob(() => reaction(state, value));
      }
      this.reactions = [];
    };

    try {
      executor(settle('fulfilled'), settle('rejected'));
    } catch (err) {
      settle('rejected')(err);
    }
  }

  then(onFulfilled, onRejected) {
    const reaction = (state, value) => {
      if (state === 'fulfilled' && onFulfilled) onFulfilled(value);
      if (state === 'rejected' && onRejected) onRejected(value);
    };
    if (this.state === 'pending') {
      this.reactions.push(reaction);
    } else {
      enqueueJob(() => reaction(this.state, this.value));
    }
  }
}

console.log('--- Building up jobs, then draining them all in one pass ---');

const tp = new TeachingPromise((resolve) => resolve('instant value'));

tp.then((v) => console.log('  handler 1:', v));
tp.then((v) => console.log('  handler 2:', v));

console.log(`  job queue length before manual drain: ${jobQueue.length}`);
console.log('  (in a REAL engine, this draining happens automatically,');
console.log('   between synchronous code and the next task — see module 00)');

drainJobQueue();

console.log('\n--- A REAL microtask queue behaves identically, just automatically ---');

const realPromise = Promise.resolve('real value');
realPromise.then((v) => console.log('  real handler 1:', v));
realPromise.then((v) => console.log('  real handler 2:', v));
console.log('  (these will run automatically once this synchronous script finishes)');

/**
 * The manual jobQueue array above is a deliberately simplified
 * stand-in for the real engine's microtask queue. The actual engine
 * doesn't give you access to inspect or manually drain it — that
 * happens automatically as part of the event loop (module 00). This
 * file exists purely to make an otherwise invisible mechanism
 * visible by reimplementing a toy version of it yourself.
 */
