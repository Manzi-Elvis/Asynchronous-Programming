/**
 * Exercise 01 — Fastest response wins
 *
 * You have three "mirror" servers that all serve the same data, with
 * different (simulated) latencies. Write a function
 * `fetchFromFastestMirror(mirrors)` that races all of them and
 * returns whichever responds first — using Promise.race.
 *
 * Then write a SECOND function `fetchWithTimeout(mirrors, timeoutMs)`
 * that races the fastest mirror against a timeout, so that if ALL
 * mirrors are slower than timeoutMs, you get a timeout error instead
 * of waiting forever.
 *
 * Use the provided `queryMirror` mock.
 */

function queryMirror(name, latencyMs) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`response from ${name}`), latencyMs);
  });
}

function fetchFromFastestMirror(mirrors) {
  // mirrors: array of { name, latencyMs }
  // your implementation here
}

function fetchWithTimeout(mirrors, timeoutMs) {
  // your implementation here — should reuse fetchFromFastestMirror
  // and race it against a timeout promise
}

async function runTests() {
  const mirrors = [
    { name: 'mirror-us', latencyMs: 150 },
    { name: 'mirror-eu', latencyMs: 60 },
    { name: 'mirror-asia', latencyMs: 200 },
  ];

  console.log('--- Test 1: fastest mirror wins ---');
  const fastest = await fetchFromFastestMirror(mirrors);
  console.log('Result:', fastest); // expect 'response from mirror-eu'

  console.log('\n--- Test 2: timeout shorter than any mirror ---');
  try {
    await fetchWithTimeout(mirrors, 30);
    console.log('This should not print');
  } catch (err) {
    console.log('Correctly timed out:', err.message);
  }

  console.log('\n--- Test 3: timeout longer than fastest mirror ---');
  const result = await fetchWithTimeout(mirrors, 100);
  console.log('Result:', result); // expect 'response from mirror-eu'
}

// runTests();