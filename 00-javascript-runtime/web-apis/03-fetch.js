/**
 * 03-fetch.js
 *
 * Goal: preview fetch() as a Web API that returns a Promise, and see
 * that Promise-based APIs resolve through the MICROTASK queue —
 * which runs before setTimeout's task queue, even if fetch and
 * setTimeout are "started" in the same tick.
 *
 * We go deep on fetch itself in 07-fetch-and-web-apis/. Here we only
 * care about the SCHEDULING behavior.
 *
 * Requires Node 18+ (global fetch). No network calls needed to see
 * the ordering effect, so this file uses a fake fetch-like Promise
 * if a real endpoint isn't reachable in your environment — but try
 * the real one first.
 */

console.log('1: start');

// A real network call — resolves via microtask queue once done.
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => res.json())
  .then((data) => console.log('4: fetch resolved:', data.title))
  .catch(() => console.log('4: fetch failed (no network access in this sandbox — that is fine, the ordering lesson still holds)'));

// A macrotask, scheduled at the same moment as the fetch above.
setTimeout(() => {
  console.log('5: setTimeout fired (task queue)');
}, 0);

// A microtask with NO real async work — resolves almost instantly.
Promise.resolve().then(() => {
  console.log('3: Promise.resolve().then (microtask queue)');
});

console.log('2: end of synchronous code');

/**
 * Even though fetch() was written FIRST and setTimeout SECOND, the
 * relative order that matters is queue TYPE, not source order:
 *
 *   1 (sync) -> 2 (sync) -> 3 (microtask, no real delay)
 *   -> [network or timer delay elapses, order depends on real-world
 *      timing] -> 4 or 5, whichever's underlying operation finishes
 *      and gets queued first
 *
 * The guaranteed part: 1 and 2 ALWAYS run before 3, 4, or 5 (sync
 * code always runs before any queued callback). And any zero-delay
 * microtask (like the bare Promise.resolve().then here) will
 * essentially always beat a real network fetch, because there's no
 * actual I/O latency involved.
 *
 * The full, precise breakdown of microtask-vs-task ordering is in
 * module 06-event-loop-and-promises/ — this file is just the preview.
 */