/**
 * Exercise 01 — Create a delay utility
 *
 * Build `delay(ms, value)` that returns a Promise which resolves
 * with `value` (or undefined if not provided) after `ms`
 * milliseconds. This is one of the single most useful small
 * utilities in async JS — you'll reuse it throughout the rest of
 * this curriculum.
 *
 * Then build `delayReject(ms, reason)` — same idea, but rejects
 * instead of resolving.
 *
 * Test both:
 *   - delay(100, 'hello').then(v => console.log(v))
 *   - delayReject(100, new Error('boom')).catch(e => console.log(e.message))
 *   - Chain a few delay() calls in sequence and log a timestamp
 *     before/after to confirm the total elapsed time is roughly the
 *     sum of your delays (proving they ran sequentially, not
 *     concurrently) — you'll revisit this exact measurement in
 *     module 04 when comparing sequential vs concurrent execution.
 */

function delay(ms, value) {
  // your implementation here
}

function delayReject(ms, reason) {
  // your implementation here
}

// --- Your tests below ---