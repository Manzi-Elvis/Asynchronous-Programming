/**
 * 01-basic-callback.js
 *
 * Goal: isolate the callback PATTERN from async timing entirely, by
 * using a purely synchronous callback first. This proves a callback
 * is just "a function you pass in and call later" — nothing about
 * the word "callback" implies async by itself.
 */

function processArray(arr, callback) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    // Calling `callback` here is no different from calling any other
    // function — it happens synchronously, immediately, on this
    // same stack frame.
    results.push(callback(arr[i], i));
  }
  return results;
}

const doubled = processArray([1, 2, 3, 4], (value) => value * 2);
console.log('doubled:', doubled);

const labeled = processArray(['a', 'b', 'c'], (value, index) => `${index}: ${value}`);
console.log('labeled:', labeled);

/**
 * This is literally how Array.prototype.map is implemented under
 * the hood conceptually — map() takes a callback and calls it
 * synchronously for each element, collecting the results.
 */

console.log([10, 20, 30].map((n) => n / 10)); // built-in version, same idea

// --- A callback that runs conditionally ---
function validate(value, onValid, onInvalid) {
  if (typeof value === 'number' && value > 0) {
    onValid(value);
  } else {
    onInvalid(`Invalid value: ${JSON.stringify(value)}`);
  }
}

validate(42, (v) => console.log('valid:', v), (err) => console.log('error:', err));
validate(-5, (v) => console.log('valid:', v), (err) => console.log('error:', err));
validate('nope', (v) => console.log('valid:', v), (err) => console.log('error:', err));

/**
 * Passing TWO callbacks (one for success, one for failure) is a
 * pattern you'll see constantly before Promises existed — and it's
 * exactly the shape error-first-callbacks/ formalizes into a single
 * convention.
 */