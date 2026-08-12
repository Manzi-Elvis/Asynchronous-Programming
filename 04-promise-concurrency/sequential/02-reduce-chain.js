/**
 * 02-reduce-chain.js
 *
 * Goal: process a DYNAMIC-length array of items sequentially, one at
 * a time, using the reduce-over-promises pattern — useful when order
 * of processing genuinely matters (e.g. writes that must land in a
 * specific order) and the list length isn't known ahead of time.
 */

function appendToLog(entry, delayMs) {
  // Simulates something that MUST happen in order — e.g. appending
  // lines to a file, or writes to an audit trail where order matters.
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  appended: "${entry}"`);
      resolve(entry);
    }, delayMs);
  });
}

async function appendAllSequentially(entries) {
  const results = await entries.reduce(async (accPromise, entry) => {
    const acc = await accPromise; // wait for everything processed SO FAR
    const result = await appendToLog(entry, 30);
    return [...acc, result];
  }, Promise.resolve([]));

  return results;
}

async function main() {
  const logEntries = [
    'user logged in',
    'user viewed dashboard',
    'user updated profile',
    'user logged out',
  ];

  console.log('Appending log entries IN ORDER (order matters here):\n');
  const start = Date.now();
  const results = await appendAllSequentially(logEntries);
  console.log(`\nAll appended in ${Date.now() - start}ms (sequential, ~120ms = 4 x 30ms)`);
  console.log('Final order:', results);
}

main();

/**
 * A common mistake with this pattern: using entries.map(async ...)
 * instead of reduce. map() KICKS OFF all the async callbacks
 * immediately (they don't wait for each other), so it does NOT
 * produce sequential execution — it silently becomes concurrent,
 * defeating the entire purpose. This exact trap is covered in
 * 13-common-mistakes/01-forEach-with-async.js.
 */