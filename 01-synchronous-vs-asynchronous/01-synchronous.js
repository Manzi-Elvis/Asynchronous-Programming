/**
 * 01-synchronous.js
 *
 * Goal: see a fully synchronous "pipeline" — fetching a user,
 * fetching their orders, computing a total — where every step
 * genuinely blocks until the previous one is done. No callbacks, no
 * Promises, nothing async at all. This is the baseline to contrast
 * against in 02-asynchronous.js.
 */

function getUserSync(id) {
  console.log(`  fetching user ${id}... (blocking)`);
  // In real synchronous code this would be something like a blocking
  // DB driver call or fs.readFileSync — here we simulate the "cost"
  // with a busy-wait so the blocking is actually visible in timing.
  busyWaitMs(50);
  return { id, name: 'Elvis', role: 'engineer' };
}

function getOrdersSync(userId) {
  console.log(`  fetching orders for user ${userId}... (blocking)`);
  busyWaitMs(80);
  return [
    { id: 1, total: 42.5 },
    { id: 2, total: 15.0 },
  ];
}

function busyWaitMs(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // deliberately blocking the stack to simulate "slow work"
  }
}

console.log('Program start');

const start = Date.now();

const user = getUserSync(1);
console.log('Got user:', user.name);

const orders = getOrdersSync(user.id);
console.log('Got orders:', orders.length);

const total = orders.reduce((sum, o) => sum + o.total, 0);
console.log('Total spent:', total);

console.log(`Program end. Took ${Date.now() - start}ms — notice this is`);
console.log('roughly 50 + 80 = 130ms, because each step BLOCKED until done.');

/**
 * Every line above executes in exact source order, and NOTHING else
 * could have run in between "fetching user" and "Got user" — the
 * call stack was fully occupied by getUserSync() the whole time.
 * If this were a web server, EVERY other incoming request would be
 * frozen for that same 130ms, because there's only one stack.
 */