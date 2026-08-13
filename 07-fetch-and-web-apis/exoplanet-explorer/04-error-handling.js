/**
 * 04-error-handling.js
 *
 * Goal: the FULL error-handling story for this project, all in one
 * place: network-level failure, HTTP-level failure, and malformed/
 * unexpected data — three genuinely different failure modes that
 * each need distinct handling.
 */

async function fetchExoplanetsRobust(hostStarSearchTerm) {
  const query = `select pl_name,hostname,disc_year from pscomppars where hostname like '%25${encodeURIComponent(hostStarSearchTerm)}%25'`;
  const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`;

  let response;
  try {
    response = await fetch(url);
  } catch (networkErr) {
    // Failure mode 1: NETWORK-level — DNS failure, connection
    // refused, offline, CORS block (in a browser context).
    throw new Error(`Network error while contacting Exoplanet Archive: ${networkErr.message}`);
  }

  if (!response.ok) {
    // Failure mode 2: HTTP-level — the request reached the server,
    // but the server returned an error status. Different status
    // codes often warrant different handling.
    if (response.status === 429) {
      throw new Error('Rate limited by Exoplanet Archive — try again later');
    }
    if (response.status >= 500) {
      throw new Error(`Exoplanet Archive server error: ${response.status}`);
    }
    throw new Error(`Exoplanet Archive request failed: ${response.status} ${response.statusText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    // Failure mode 3: the response body wasn't valid JSON at all —
    // rare, but possible (e.g. an HTML error page returned with a
    // 200 status by a misbehaving proxy).
    throw new Error('Failed to parse Exoplanet Archive response as JSON');
  }

  if (!Array.isArray(data)) {
    // Failure mode 4: got valid JSON, but not the SHAPE we expected
    // — defensive coding against a schema change or unexpected
    // response format.
    throw new Error('Unexpected response shape: expected an array');
  }

  return data;
}

async function main() {
  console.log('--- Testing the robust fetcher ---\n');

  try {
    const planets = await fetchExoplanetsRobust('Proxima Centauri');
    console.log(`Success: found ${planets.length} planets`);
  } catch (err) {
    console.log('Handled failure:', err.message);
  }

  console.log('\n--- Testing against a deliberately bad URL, to see HTTP-level handling ---\n');

  async function fetchBadUrl() {
    const response = await fetch('https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=INVALID+ADQL&format=json');
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  try {
    await fetchBadUrl();
  } catch (err) {
    console.log('Handled failure (expected — malformed query, or offline):', err.message);
  }

  console.log(`
--- Summary of the four failure modes worth handling in any real API client ---
  1. Network-level failure (fetch() itself rejects) — DNS, offline, CORS
  2. HTTP-level failure (response.ok is false) — 4xx client errors, 5xx server errors
  3. Malformed body (response.json() rejects) — invalid JSON returned
  4. Unexpected shape (valid JSON, wrong structure) — schema mismatch

Each deserves being distinguished in your error messages/handling,
because the appropriate RESPONSE differs: retry for #1/#2(5xx), don't
retry for #2(4xx) usually, log loudly for #3/#4 since they often
indicate a bug or an API change rather than a transient issue.
  `);
}

main();