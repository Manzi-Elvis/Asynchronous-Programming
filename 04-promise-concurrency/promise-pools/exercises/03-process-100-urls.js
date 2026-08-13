/**
 * Exercise 03 — Process 100 URLs (the capstone / "FAANG interview" version)
 *
 * This is the fully combined, realistic version of everything in
 * this folder. Build `downloadAll(urls, options)`:
 *
 *   downloadAll(urls, {
 *     concurrency: 5,
 *     retries: 2,          // retry a failed download up to 2 extra times
 *     timeoutMs: 200,       // any single attempt taking longer than this fails
 *     onProgress: (completed, total) => {...} // optional progress callback
 *   })
 *
 * Requirements:
 *   1. Never more than `options.concurrency` downloads in flight at once.
 *   2. Each URL gets up to `1 + options.retries` total attempts before
 *      being marked permanently failed.
 *   3. Each individual ATTEMPT (not the whole retry sequence) is
 *      bounded by `options.timeoutMs` — a hanging attempt should be
 *      abandoned (from the pool's perspective) and retried, not
 *      allowed to block a worker slot forever.
 *   4. Use allSettled-style semantics: ALL 100 URLs are attempted;
 *      one failing permanently should not stop the others.
 *   5. Call `options.onProgress(completed, total)` every time a URL
 *      reaches a FINAL outcome (success or permanent failure) —
 *      not on every individual attempt/retry.
 *   6. Return `{ succeeded: [{url, data}], failed: [{url, error}] }`.
 *
 * Use the provided `fakeDownload` mock, which has realistic-feeling
 * random latency and a configurable failure rate.
 */

function fakeDownload(url) {
  return new Promise((resolve, reject) => {
    const latency = 20 + Math.random() * 150; // sometimes exceeds a tight timeout
    const willFail = Math.random() < 0.35; // ~35% chance of failure per attempt
    setTimeout(() => {
      if (willFail) {
        reject(new Error(`Failed to download ${url}`));
        return;
      }
      resolve({ url, bytes: Math.floor(Math.random() * 10000) });
    }, latency);
  });
}

function downloadAll(urls, options) {
  const { concurrency, retries, timeoutMs, onProgress } = options;
  // your implementation here — you'll likely want to combine ideas
  // from 03-fail-fast.js (worker loop), 04-all-settled-pool.js
  // (never abort early), 05-pool-with-retry.js (retry wrapper), and
  // 06-pool-with-timeout.js (race against a timeout) from this folder
}

async function main() {
  const urls = Array.from({ length: 100 }, (_, i) => `https://example.com/resource/${i}`);

  let lastLogged = -1;
  const report = await downloadAll(urls, {
    concurrency: 8,
    retries: 2,
    timeoutMs: 120,
    onProgress: (completed, total) => {
      // Log every 10% to avoid flooding the console
      const percent = Math.floor((completed / total) * 10);
      if (percent !== lastLogged) {
        lastLogged = percent;
        console.log(`  progress: ${completed}/${total}`);
      }
    },
  });

  console.log(`\nFinal report: ${report.succeeded.length} succeeded, ${report.failed.length} failed`);
  console.log('Sample succeeded:', report.succeeded.slice(0, 3));
  console.log('Sample failed:', report.failed.slice(0, 3));
  console.log(`\nTotal accounted for: ${report.succeeded.length + report.failed.length} (should be 100)`);
}

// main();

/**
 * Interview follow-up questions worth being able to answer out loud
 * once this works:
 *   1. What's the time complexity / expected wall-clock time of this,
 *      roughly, given N urls, concurrency C, average latency L?
 *   2. How would you add a GLOBAL timeout for the entire batch (e.g.
 *      "give up on everything after 30 seconds total"), on top of
 *      the per-attempt timeout that already exists?
 *   3. How would this change if downloads needed to be CANCELLABLE
 *      (e.g. the user navigates away)? (Preview: AbortController,
 *      module 09.)
 */