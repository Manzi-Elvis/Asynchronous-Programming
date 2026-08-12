/**
 * 02-cleanup.js
 *
 * Goal: a realistic resource-cleanup example — "opening" a fake
 * database connection, doing work that might fail, and guaranteeing
 * the connection is always closed via .finally(), regardless of
 * outcome.
 */

function openConnection() {
  console.log('  [connection] opening...');
  return Promise.resolve({ id: 'conn-1', isOpen: true });
}

function closeConnection(connection) {
  connection.isOpen = false;
  console.log(`  [connection] closed (id: ${connection.id})`);
}

function runQuery(connection, query, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Query failed: ${query}`));
        return;
      }
      resolve([{ row: 1 }, { row: 2 }]);
    }, 30);
  });
}

function withConnection(shouldFail) {
  let connection;
  return openConnection()
    .then((conn) => {
      connection = conn;
      return runQuery(connection, 'SELECT * FROM users', shouldFail);
    })
    .then((rows) => {
      console.log('  query succeeded, rows:', rows.length);
      return rows;
    })
    .catch((err) => {
      console.log('  query failed:', err.message);
      throw err; // re-throw so the caller still sees the failure
    })
    .finally(() => {
      // THIS is the guarantee that matters: whether the query
      // succeeded or failed above, the connection gets closed
      // exactly once, right here, with no duplicated cleanup code
      // in both the .then() and .catch() branches.
      if (connection) {
        closeConnection(connection);
      }
    });
}

async function main() {
  console.log('--- Successful query ---');
  await withConnection(false).catch(() => {}); // swallow for the demo's sake
  console.log('  connection guaranteed closed above, even on success\n');

  console.log('--- Failing query ---');
  await withConnection(true).catch((err) => {
    console.log('  caller sees the propagated error:', err.message);
  });
  console.log('  connection guaranteed closed above too, even after failure');
}

main();

/**
 * Without .finally(), you'd have to duplicate the closeConnection()
 * call in BOTH the success path and the .catch() error path — easy
 * to forget one of them as the code evolves, especially if new exit
 * paths (early returns, additional .then() links) get added later.
 * .finally() centralizes "this always happens" logic in one place.
 */