/**
 * Exercise 01 — First success wins
 *
 * You have three authentication providers. Write
 * `authenticateWithAnyProvider(providers)` that tries all of them
 * concurrently via Promise.any, returning the first successful
 * auth token. If ALL providers fail, catch the AggregateError and
 * throw a new, cleaner Error whose message lists how many providers
 * were tried and includes each individual failure reason on its own
 * line.
 *
 * Use the provided `authenticate` mock. Providers named starting
 * with "broken-" always reject.
 */

function authenticate(providerName, latencyMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (providerName.startsWith('broken-')) {
        reject(new Error(`${providerName}: authentication service unavailable`));
        return;
      }
      resolve(`token-from-${providerName}`);
    }, latencyMs);
  });
}

function authenticateWithAnyProvider(providers) {
  // providers: array of { name, latencyMs }
  // your implementation here
}

async function runTests() {
  console.log('--- Test 1: one working provider among broken ones ---');
  const providers1 = [
    { name: 'broken-oauth', latencyMs: 20 },
    { name: 'google-auth', latencyMs: 80 },
    { name: 'broken-legacy', latencyMs: 10 },
  ];
  const token = await authenticateWithAnyProvider(providers1);
  console.log('Got token:', token); // expect 'token-from-google-auth'

  console.log('\n--- Test 2: all providers broken ---');
  const providers2 = [
    { name: 'broken-a', latencyMs: 10 },
    { name: 'broken-b', latencyMs: 20 },
  ];
  try {
    await authenticateWithAnyProvider(providers2);
    console.log('This should not print');
  } catch (err) {
    console.log('Correctly failed:', err.message);
  }
}

// runTests();