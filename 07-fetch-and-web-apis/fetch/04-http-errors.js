/**
 * 04-http-errors.js
 *
 * Goal: prove, decisively, that fetch does NOT reject on HTTP error
 * statuses (404, 500) — only on network-level failures. This is the
 * single most common fetch-related bug: forgetting to check
 * `response.ok` and treating every non-throwing fetch as a success.
 */

async function badFetch() {
  // BUGGY pattern: assumes any fetch that doesn't throw = success
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/999999999');
  const data = await response.json(); // this "succeeds" even for a 404!
  return data;
}

async function goodFetch() {
  // FIXED pattern: explicitly check response.ok before trusting the body
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/999999999');
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function main() {
  console.log('--- Buggy version: does NOT catch a 404 ---');
  try {
    const result = await badFetch();
    console.log('badFetch "succeeded" with:', result);
    console.log('(jsonplaceholder returns an EMPTY object {} for a missing');
    console.log(' resource with a 404 status — badFetch treated this as');
    console.log(' success because fetch itself never rejected)');
  } catch (err) {
    console.log('badFetch failed at the network level (expected if offline):', err.message);
  }

  console.log('\n--- Fixed version: correctly detects and throws on 404 ---');
  try {
    const result = await goodFetch();
    console.log('goodFetch succeeded with:', result);
  } catch (err) {
    console.log('goodFetch correctly threw:', err.message);
  }

  console.log(`
--- The rule to always follow ---
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }
  const data = await response.json();

Never skip the response.ok check. A try/catch around a fetch call
alone does NOT protect you from HTTP error responses — it only
protects you from network-level failures (DNS, connection refused,
CORS). These are two genuinely different failure modes and fetch's
API design (deliberately) does not conflate them.
  `);
}

main();