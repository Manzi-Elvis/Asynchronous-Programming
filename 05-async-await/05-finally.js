/**
 * 05-finally.js
 *
 * Goal: use `finally` alongside try/catch/await for cleanup that
 * must run regardless of success or failure — the async/await
 * equivalent of Promise's .finally().
 */

function connectToDatabase(shouldFail) {
  return new Promise((resolve, reject) => {
    console.log('  opening database connection...');
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Connection refused'));
      } else {
        resolve({ connectionId: 'conn-123' });
      }
    }, 40);
  });
}

function closeConnection(connectionId) {
  console.log(`  closing connection ${connectionId}`);
}

async function runQuery(shouldFail) {
  let connection;
  try {
    connection = await connectToDatabase(shouldFail);
    console.log('  running query on', connection.connectionId);
    return { rows: 42 };
  } catch (err) {
    console.log('  query failed:', err.message);
    throw err; // re-throw so the caller still knows it failed
  } finally {
    // Runs whether the try block succeeded, failed, or even if we
    // re-threw inside catch — this is the ONE guaranteed place to
    // put cleanup code that must always execute.
    if (connection) {
      closeConnection(connection.connectionId);
    } else {
      console.log('  (no connection was ever opened, nothing to close)');
    }
  }
}

async function main() {
  console.log('--- Successful query ---');
  const result = await runQuery(false);
  console.log('Result:', result);

  console.log('\n--- Failed query ---');
  try {
    await runQuery(true);
  } catch (err) {
    console.log('Caught at call site:', err.message);
  }
}

main();

/**
 * Note the finally block correctly distinguishes "connection was
 * opened, needs closing" from "connection never opened, nothing to
 * close" — finally always runs, but what it DOES inside can still be
 * conditional based on how far execution got. This pattern (acquire
 * a resource, try to use it, always release it in finally) is the
 * standard shape for anything requiring cleanup: database
 * connections, file handles, locks, loading spinners in a UI, etc.
 */