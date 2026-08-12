/**
 * 02-asynchronous.js
 *
 * Goal: the exact same "user -> orders -> total" pipeline as
 * 01-synchronous.js, but each step is now asynchronous (via
 * Promises + async/await, previewing modules 03 and 05). Compare
 * directly against the sync version.
 */

function getUserAsync(id) {
  console.log(`  fetching user ${id}... (non-blocking)`);
  return new Promise((resolve) => {
    // setTimeout hands the "waiting" off to the environment — the
    // call stack is FREE during these 50ms, unlike busyWaitMs above.
    setTimeout(() => {
      resolve({ id, name: 'Elvis', role: 'engineer' });
    }, 50);
  });
}

function getOrdersAsync(userId) {
  console.log(`  fetching orders for user ${userId}... (non-blocking)`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, total: 42.5 },
        { id: 2, total: 15.0 },
      ]);
    }, 80);
  });
}

async function run() {
  console.log('Program start');
  const start = Date.now();

  const user = await getUserAsync(1);
  console.log('Got user:', user.name);

  const orders = await getOrdersAsync(user.id);
  console.log('Got orders:', orders.length);

  const total = orders.reduce((sum, o) => sum + o.total, 0);
  console.log('Total spent:', total);

  console.log(`Program end. Took ${Date.now() - start}ms — still ~130ms`);
  console.log('here, because we AWAITED each step in sequence — being');
  console.log('async does not automatically make things faster, it only');
  console.log('means the stack was free DURING each wait (see the proof below).');
}

run();

// This proves the stack really was free during the awaits above:
// this synchronous code runs WHILE getUserAsync's timer is still
// ticking, something that was IMPOSSIBLE in the sync version.
console.log('This logs almost immediately, while user/orders are still loading!');
let n = 0;
for (let i = 0; i < 3; i++) {
  n += i;
  console.log(`  other work happening concurrently: step ${i}`);
}

/**
 * Contrast with 01-synchronous.js: there, NOTHING could log between
 * "fetching user" and "Got user" — the stack was occupied the whole
 * time. Here, "other work happening concurrently" fully interleaves
 * with the async pipeline, proving the stack was genuinely free
 * during the setTimeout-based waits.
 */