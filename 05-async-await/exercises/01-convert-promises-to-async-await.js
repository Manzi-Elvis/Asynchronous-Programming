/**
 * Exercise 01 — Convert Promise chains to async/await
 *
 * Below are three functions written with .then()/.catch() chains.
 * Rewrite each as an equivalent async/await version, preserving
 * exact behavior (including error handling).
 */

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function delayReject(reason, ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(reason)), ms));
}

// --- Function 1: simple chain ---

function getUserProfileChain(userId) {
  return delay({ id: userId, name: 'Elvis' }, 30)
    .then((user) => {
      console.log('Got user:', user.name);
      return delay({ ...user, bio: 'Software engineer' }, 30);
    })
    .then((profile) => {
      console.log('Got profile');
      return profile;
    });
}

// TODO: rewrite as async/await
async function getUserProfileAsync(userId) {
  // your implementation here
}

// --- Function 2: chain with error handling ---

function riskyChain(shouldFail) {
  return delay('step 1 done', 20)
    .then(() => {
      if (shouldFail) {
        return delayReject('step 2 failed', 20);
      }
      return delay('step 2 done', 20);
    })
    .then((result) => {
      console.log('Chain succeeded:', result);
      return result;
    })
    .catch((err) => {
      console.log('Chain caught error:', err.message);
      return 'fallback value';
    });
}

// TODO: rewrite as async/await
async function riskyAsync(shouldFail) {
  // your implementation here
}

// --- Function 3: chain with finally ---

function chainWithFinally(shouldFail) {
  return delay('working', 20)
    .then(() => {
      if (shouldFail) throw new Error('failed mid-chain');
      return 'success';
    })
    .catch((err) => {
      console.log('caught:', err.message);
      throw err; // re-throw
    })
    .finally(() => {
      console.log('cleanup ran');
    });
}

// TODO: rewrite as async/await (the caller still needs to see the
// rejection propagate out, just like the original)
async function withFinallyAsync(shouldFail) {
  // your implementation here
}

// --- Tests ---

async function runTests() {
  console.log('--- Function 1 ---');
  await getUserProfileAsync(1);

  console.log('\n--- Function 2 (success) ---');
  await riskyAsync(false);

  console.log('\n--- Function 2 (failure) ---');
  await riskyAsync(true);

  console.log('\n--- Function 3 ---');
  try {
    await withFinallyAsync(true);
  } catch (err) {
    console.log('caught at call site:', err.message);
  }
}

// runTests();