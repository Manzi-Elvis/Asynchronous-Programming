/**
 * Exercise 02 — Wrap a callback-based API ("promisify" by hand)
 *
 * Below is a callback-based, error-first function (same shape as
 * module 02's error-first-callbacks). Write a Promise-returning
 * wrapper around it called `readConfigAsync(key)` using
 * `new Promise(...)`.
 *
 * Then, as a bonus, write a GENERIC `promisify(fn)` helper that can
 * wrap ANY error-first callback function of the shape
 * `fn(...args, callback)` into a function that returns a Promise —
 * this is conceptually what Node's built-in `util.promisify` does.
 */

const fakeConfigStore = {
  apiKey: 'secret-123',
  timeout: 5000,
};

function readConfig(key, callback) {
  setTimeout(() => {
    if (!(key in fakeConfigStore)) {
      callback(new Error(`No such config key: ${key}`));
      return;
    }
    callback(null, fakeConfigStore[key]);
  }, 20);
}

// TODO: implement using new Promise(...)
function readConfigAsync(key) {
  // your implementation here
}

// --- Test readConfigAsync ---
readConfigAsync('apiKey').then((v) => console.log('apiKey:', v)).catch((e) => console.log('error:', e.message));
readConfigAsync('missing').then((v) => console.log('missing:', v)).catch((e) => console.log('error:', e.message));

/**
 * BONUS: generic promisify
 * -------------------------
 * function promisify(fn) {
 *   return (...args) => new Promise((resolve, reject) => {
 *     fn(...args, (err, result) => {
 *       if (err) reject(err);
 *       else resolve(result);
 *     });
 *   });
 * }
 *
 * Try writing this yourself below WITHOUT looking at the sketch
 * above, then test it against readConfig directly.
 */

function promisify(fn) {
  // your implementation here
}

// const readConfigPromisified = promisify(readConfig);
// readConfigPromisified('timeout').then((v) => console.log('promisified timeout:', v));