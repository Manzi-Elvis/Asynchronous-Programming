/**
 * 03-multiple-microtasks.js
 *
 * Goal: trace several INDEPENDENT Promise chains interleaving,
 * building the skill of tracking multiple queued microtasks at once
 * rather than just one.
 */

console.log('1: sync start');

Promise.resolve().then(() => console.log('A1')).then(() => console.log('A2'));
Promise.resolve().then(() => console.log('B1')).then(() => console.log('B2'));

console.log('2: sync end');

/**
 * Trace:
 *
 * SYNCHRONOUS PASS:
 *   logs '1'
 *   Chain A: Promise.resolve().then(A1) schedules A1's callback into
 *     MICROTASKS. The SECOND .then(A2) does NOT get scheduled yet —
 *     it only gets scheduled once A1's callback actually RUNS and
 *     returns (settling the intermediate Promise A1's .then created).
 *   Chain B: same thing — only B1's callback goes into MICROTASKS
 *     right now, not B2.
 *   logs '2'
 *   stack empty
 *
 *   State: MICROTASKS: [ -> A1, -> B1 ]  (in the order they were
 *          scheduled: A1 was scheduled slightly before B1, since
 *          chain A's first .then() call happens first in source order)
 *
 * EVENT LOOP - drain microtasks completely, one at a time, FIFO:
 *   run A1 -> logs 'A1' -> its return value settles the NEXT link in
 *     chain A, scheduling A2's callback into MICROTASKS (added to
 *     the END of the queue, which is CURRENTLY being drained)
 *   queue not empty yet (has [B1, A2]) -> run B1 -> logs 'B1' ->
 *     schedules B2 similarly, queue is now [A2, B2]
 *   run A2 -> logs 'A2'
 *   run B2 -> logs 'B2'
 *   queue finally empty
 *
 * Final order: 1, 2, A1, B1, A2, B2
 *
 * Notice this is NOT "finish chain A entirely, then chain B" (which
 * would be 1, 2, A1, A2, B1, B2) — it's interleaved, because each
 * chain only queues ONE STEP AHEAD at a time, and the queue is
 * strictly FIFO across BOTH chains combined.
 */