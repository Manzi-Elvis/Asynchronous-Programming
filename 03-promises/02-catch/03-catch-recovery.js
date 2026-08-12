/**
 * 03-catch-recovery.js
 *
 * Goal: use .catch() to actually RECOVER from a failure — returning
 * a fallback value that lets the rest of the chain proceed as if
 * nothing went wrong, versus re-throwing to keep propagating the
 * failure.
 */

function fetchUserPreferences(userId) {
  // Simulate a preferences service that's down for user 999.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 999) {
        reject(new Error('preferences service unavailable'));
        return;
      }
      resolve({ theme: 'dark', notifications: true });
    }, 20);
  });
}

const DEFAULT_PREFERENCES = { theme: 'light', notifications: false };

console.log('--- Recovering with a default value ---');

fetchUserPreferences(999)
  .catch((err) => {
    console.log('  preferences fetch failed:', err.message);
    console.log('  falling back to defaults instead of propagating the error');
    return DEFAULT_PREFERENCES; // RECOVERY: returning a normal value
  })
  .then((preferences) => {
    // This runs NORMALLY, as if fetchUserPreferences had succeeded —
    // the .catch() above fully absorbed the error.
    console.log('  using preferences:', preferences);
  });

console.log('\n--- Choosing NOT to recover: re-throw to keep propagating ---');

fetchUserPreferences(999)
  .catch((err) => {
    console.log('  preferences fetch failed:', err.message);
    console.log('  this failure is too important to hide — re-throwing');
    throw new Error(`Critical: ${err.message}`); // re-throw, NOT recovery
  })
  .then((preferences) => {
    console.log('  this .then() is skipped:', preferences);
  })
  .catch((err) => {
    // A SECOND, later .catch() picks up the re-thrown error.
    console.log('  caught again, further down the chain:', err.message);
  });

console.log('\n--- Conditional recovery: only recover from SPECIFIC error types ---');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

function fetchResource(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 'missing') {
        reject(new NotFoundError(`Resource ${id} not found`));
      } else if (id === 'broken') {
        reject(new Error('Unexpected server error'));
      } else {
        resolve({ id, data: 'some data' });
      }
    }, 20);
  });
}

function fetchWithFallback(id) {
  return fetchResource(id).catch((err) => {
    if (err instanceof NotFoundError) {
      // Only "not found" is safe to recover from with an empty result.
      console.log(`  [${id}] not found, recovering with an empty placeholder`);
      return { id, data: null };
    }
    // Anything else (unexpected server errors, etc.) should NOT be
    // silently swallowed — re-throw to let it propagate as a real failure.
    console.log(`  [${id}] unexpected error, re-throwing:`, err.message);
    throw err;
  });
}

setTimeout(() => {
  fetchWithFallback('missing').then((r) => console.log('  result:', r));
  fetchWithFallback('broken').catch((err) => console.log('  still failed:', err.message));
  fetchWithFallback('123').then((r) => console.log('  result:', r));
}, 60);

/**
 * The lesson: .catch() is not "make the error go away" by default —
 * it's a decision point. You can recover (return a value), partially
 * recover conditionally (check the error type first), or refuse to
 * recover (re-throw, possibly wrapped with more context). Blindly
 * swallowing every error in a .catch() without re-throwing unexpected
 * ones is a common source of silent, hard-to-diagnose bugs.
 */