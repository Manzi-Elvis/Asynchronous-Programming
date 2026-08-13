/**
 * 08-await-promise-all.js
 *
 * Goal: the idiomatic, most common way concurrency is actually
 * written in real async/await code — awaiting a single
 * Promise.all(...) call and destructuring the results directly.
 */

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 60);
  });
}

function fetchPermissions(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['read', 'write']), 40);
  });
}

function fetchSettings(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ theme: 'dark', notifications: true }), 50);
  });
}

async function loadDashboardData(userId) {
  console.log('Loading user, permissions, and settings concurrently...');
  const start = Date.now();

  // The single most common real-world pattern: array destructuring
  // directly off an awaited Promise.all call.
  const [user, permissions, settings] = await Promise.all([
    fetchUser(userId),
    fetchPermissions(userId),
    fetchSettings(userId),
  ]);

  console.log(`Loaded everything in ${Date.now() - start}ms (concurrent, ~60ms not ~150ms)`);
  return { user, permissions, settings };
}

loadDashboardData(1).then((dashboard) => console.log('\nDashboard data:', dashboard));

// --- Named-property variant, when you have MANY concurrent calls ---
// Destructuring an array gets unwieldy past 3-4 items and is
// position-dependent (easy to mix up order). Using a plain object of
// promises with Promise.all(Object.values(...)) — or building your
// own small helper — keeps things named and self-documenting.

async function loadDashboardDataNamed(userId) {
  const promises = {
    user: fetchUser(userId),
    permissions: fetchPermissions(userId),
    settings: fetchSettings(userId),
  };

  const keys = Object.keys(promises);
  const values = await Promise.all(Object.values(promises));

  // Zip the resolved values back into a named object.
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
}

loadDashboardDataNamed(2).then((dashboard) =>
  console.log('\nNamed variant (safer against reordering mistakes):', dashboard)
);