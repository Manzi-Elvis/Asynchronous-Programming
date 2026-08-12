/**
 * Exercise 01 — Create an error-first API
 *
 * Build `parseAge(input, callback)` following the error-first
 * convention:
 *   - If `input` cannot be parsed as a valid age (not a number,
 *     NaN, negative, or over 150), call
 *     `callback(new Error('descriptive message'))` and RETURN
 *     immediately (no double-callback bug allowed).
 *   - Otherwise call `callback(null, parsedAgeAsNumber)`.
 *   - Make the whole operation asynchronous via setTimeout (~20ms),
 *     even though parsing itself is instant — this mirrors how a
 *     real validation-plus-something-else async operation would
 *     behave (e.g. validate, then write to a database).
 *
 * Test cases to cover (write a call + callback for each):
 *   - '25'          -> should succeed with 25
 *   - '-5'           -> should error
 *   - 'not a number' -> should error
 *   - '200'          -> should error (over 150)
 *   - '0'            -> should succeed with 0 (edge case: 0 is valid!)
 *
 * Bonus: write a small "double-callback detector" wrapper function
 * `guardSingleCall(callback)` that returns a new function which
 * throws if the underlying callback is ever invoked more than once.
 * Use it to verify your parseAge never double-calls.
 */

function parseAge(input, callback) {
  // your implementation here
}

// --- Your test calls below ---

parseAge('25', (err, age) => {
  console.log('25 ->', err ? err.message : age);
});

parseAge('-5', (err, age) => {
  console.log('-5 ->', err ? err.message : age);
});

parseAge('not a number', (err, age) => {
  console.log('not a number ->', err ? err.message : age);
});

parseAge('200', (err, age) => {
  console.log('200 ->', err ? err.message : age);
});

parseAge('0', (err, age) => {
  console.log('0 ->', err ? err.message : age);
});

// --- Bonus: guardSingleCall ---

function guardSingleCall(callback) {
  // your implementation here
}