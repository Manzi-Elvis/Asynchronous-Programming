/**
 * Exercise 01 — Convert sync to async
 *
 * Below is a fully synchronous "pipeline" using busy-waits to
 * simulate slow work (same style as 01-synchronous.js). Your job:
 * rewrite it to be non-blocking, using setTimeout-backed Promises
 * and async/await (same style as 02-asynchronous.js).
 *
 * Requirements:
 *   - No busy-wait loops in your version — use setTimeout-backed
 *     Promises to simulate the delays instead.
 *   - Preserve the exact sequential DEPENDENCY between steps
 *     (step 2 needs step 1's result, step 3 needs step 2's result) —
 *     this is a sequential conversion exercise, not a concurrency
 *     exercise (that's module 04).
 *   - Prove your version doesn't block the stack by adding a
 *     console.log AFTER calling your async pipeline function, and
 *     confirming it logs before the pipeline finishes.
 */

// --- Original synchronous version (do not edit, just study it) ---

function busyWaitMs(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

function fetchConfigSync() {
  busyWaitMs(30);
  return { retries: 3, timeoutMs: 500 };
}

function connectToServiceSync(config) {
  busyWaitMs(60);
  return { connectionId: 'conn-abc123', retries: config.retries };
}

function loadDataSync(connection) {
  busyWaitMs(40);
  return { connectionId: connection.connectionId, rows: 128 };
}

function runSyncPipeline() {
  const config = fetchConfigSync();
  const connection = connectToServiceSync(config);
  const data = loadDataSync(connection);
  console.log('[sync] pipeline result:', data);
}

runSyncPipeline();

// --- TODO: your async version below ---

function fetchConfigAsync() {
  // TODO
}

function connectToServiceAsync(config) {
  // TODO
}

function loadDataAsync(connection) {
  // TODO
}

async function runAsyncPipeline() {
  // TODO: await each step in sequence, then log the final result
  // prefixed with '[async]' the same way the sync version does
}

// runAsyncPipeline();
// console.log('this should log BEFORE "[async] pipeline result:" appears');