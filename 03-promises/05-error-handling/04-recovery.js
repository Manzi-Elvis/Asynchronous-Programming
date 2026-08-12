/**
 * 04-recovery.js
 *
 * Goal: extend catch/03-catch-recovery.js with more deliberate,
 * production-style recovery STRATEGIES: fallback values, retry,
 * graceful degradation, and "fail fast" (deliberately choosing NOT
 * to recover).
 */

function fetchPrimarySource() {
  return Promise.reject(new Error('primary source unavailable'));
}

function fetchBackupSource() {
  return Promise.resolve({ source: 'backup', data: [1, 2, 3] });
}

console.log('--- Strategy 1: Fallback to a secondary source ---');

fetchPrimarySource()
  .catch(() => {
    console.log('  primary failed, falling back to backup source');
    return fetchBackupSource();
  })
  .then((result) => console.log('  final result:', result));

console.log('\n--- Strategy 2: Retry with a delay before giving up ---');

function unreliableOperation(succeedOnAttempt) {
  let attempts = 0;
  return function attempt() {
    attempts++;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (attempts >= succeedOnAttempt) {
          resolve(`succeeded on attempt ${attempts}`);
        } else {
          reject(new Error(`attempt ${attempts} failed`));
        }
      }, 15);
    });
  };
}

function retryWithDelay(operationFactory, maxAttempts, delayMs) {
  function tryOnce(attemptsLeft) {
    return operationFactory().catch((err) => {
      if (attemptsLeft <= 1) {
        throw err; // out of retries — give up and propagate
      }
      console.log(`  retrying after failure (attempts left: ${attemptsLeft - 1})`);
      return new Promise((resolve) => setTimeout(resolve, delayMs)).then(() => tryOnce(attemptsLeft - 1));
    });
  }
  return tryOnce(maxAttempts);
}

setTimeout(() => {
  const op = unreliableOperation(3);
  retryWithDelay(op, 5, 20)
    .then((result) => console.log('  retry strategy succeeded:', result))
    .catch((err) => console.log('  retry strategy exhausted attempts:', err.message));
}, 60);

console.log('\n--- Strategy 3: Graceful degradation (partial data is OK) ---');

function fetchOptionalEnrichment() {
  return Promise.reject(new Error('enrichment service down'));
}

function fetchCoreData() {
  return Promise.resolve({ id: 1, name: 'Elvis' });
}

setTimeout(() => {
  Promise.all([
    fetchCoreData(),
    fetchOptionalEnrichment().catch(() => null), // degrade to null instead of failing everything
  ]).then(([core, enrichment]) => {
    console.log('  core data (required):', core);
    console.log('  enrichment (optional, degraded gracefully):', enrichment);
  });
}, 120);

console.log('\n--- Strategy 4: Fail fast (deliberately NOT recovering) ---');

function chargeCard(amount) {
  return Promise.reject(new Error('card declined'));
}

setTimeout(() => {
  chargeCard(99.99)
    // Deliberately no .catch() with a fallback here — a failed
    // payment should NOT be silently "recovered" from with some
    // fake default. Let it propagate as a real failure the caller
    // MUST handle.
    .then((result) => console.log('  charged:', result))
    .catch((err) => console.log('  payment genuinely failed, correctly NOT recovered:', err.message));
}, 180);

/**
 * The meta-lesson: "handling an error" doesn't always mean "make it
 * go away." Sometimes the right response is a fallback (strategy 1),
 * sometimes it's persistence with limits (strategy 2), sometimes
 * it's accepting partial success (strategy 3), and sometimes the
 * correct behavior is to let the failure propagate loudly because
 * silently continuing would be actively wrong (strategy 4, e.g.
 * never pretend a failed payment succeeded).
 */
