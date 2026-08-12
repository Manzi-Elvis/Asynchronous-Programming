/**
 * 04-reaction-queue.js
 *
 * Goal: prove — with a REAL native Promise — that many .then()
 * handlers attached to the same Promise really do fire in strict
 * registration order, matching the reaction-queue model from 02 and
 * 03, using the actual engine this time instead of a simulation.
 */

const shared = new Promise((resolve) => {
  setTimeout(() => resolve('shared value'), 30);
});

const order = [];

shared.then(() => order.push('handler 1'));
shared.then(() => order.push('handler 2'));
shared.then(() => order.push('handler 3'));
shared.then(() => order.push('handler 4'));
shared.then(() => order.push('handler 5'));

shared.then(() => {
  // This runs AFTER all five handlers above have already pushed to
  // `order`, because it was registered sixth, so it goes sixth in
  // the reaction queue too.
  console.log('Execution order of reactions:', order);
  console.log('Registration order was 1,2,3,4,5 — did execution match?', 
    order.join(',') === ['handler 1','handler 2','handler 3','handler 4','handler 5'].join(','));
});

/**
 * This holds true NO MATTER how many .then() calls you attach to
 * the same Promise, and regardless of whether the Promise was
 * already settled or still pending at attachment time (see
 * fundamentals/04-fulfilled.js for the already-settled case, which
 * behaves identically — reactions queued in attachment order, always).
 */

console.log('\n--- Interleaving reactions from TWO different Promises ---');

const p1 = new Promise((resolve) => setTimeout(() => resolve('p1'), 20));
const p2 = new Promise((resolve) => setTimeout(() => resolve('p2'), 20));

const interleavedOrder = [];
p1.then(() => interleavedOrder.push('p1 handler A'));
p2.then(() => interleavedOrder.push('p2 handler A'));
p1.then(() => interleavedOrder.push('p1 handler B'));
p2.then(() => interleavedOrder.push('p2 handler B'));

setTimeout(() => {
  console.log('Interleaved order (both settle around the same time):', interleavedOrder);
  console.log('Since p1 and p2 settle independently, their reaction queues');
  console.log('are independent too — but both settling around the same tick');
  console.log('means their microtasks interleave based on SETTLEMENT order,');
  console.log('not necessarily attachment order across DIFFERENT Promises.');
}, 60);
