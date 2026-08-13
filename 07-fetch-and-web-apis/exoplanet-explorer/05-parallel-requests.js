/**
 * 05-parallel-requests.js
 *
 * Goal: the finished mini-app. Fetch a list of planets for a host
 * star search term, then CONCURRENTLY fetch extra detail for each
 * one found (bounded with a small concurrency limit, applying module
 * 04's promise-pool lesson to a real API instead of simulated
 * delays), and print a combined report.
 */

function buildListUrl(hostStarSearchTerm) {
  const query = `select pl_name,hostname,disc_year from pscomppars where hostname like '%25${encodeURIComponent(hostStarSearchTerm)}%25'`;
  return `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`;
}

function buildDetailUrl(planetName) {
  const query = `select pl_name,pl_orbper,pl_eqt,disc_facility from pscomppars where pl_name = '${encodeURIComponent(planetName)}'`;
  return `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// A small concurrency-limited pool, directly reusing the pattern
// from 04-promise-concurrency/promise-pools/01-basic-pool.js.
async function promisePool(tasks, concurrency) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function runNext() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex++;
      try {
        results[currentIndex] = { status: 'fulfilled', value: await tasks[currentIndex]() };
      } catch (err) {
        results[currentIndex] = { status: 'rejected', reason: err };
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => runNext());
  await Promise.all(workers);
  return results;
}

async function exploreSystem(hostStarSearchTerm) {
  console.log(`Searching for planets around host stars matching "${hostStarSearchTerm}"...\n`);

  const planets = await fetchJson(buildListUrl(hostStarSearchTerm));
  console.log(`Found ${planets.length} planet(s). Fetching detail for each (concurrency limit: 3)...\n`);

  const detailTasks = planets.map((planet) => () => fetchJson(buildDetailUrl(planet.pl_name)));
  const detailResults = await promisePool(detailTasks, 3);

  const report = planets.map((planet, i) => {
    const detailResult = detailResults[i];
    const detail = detailResult.status === 'fulfilled' ? detailResult.value[0] : null;
    return {
      name: planet.pl_name,
      hostStar: planet.hostname,
      discoveredYear: planet.disc_year,
      orbitalPeriodDays: detail?.pl_orbper ?? 'unknown',
      equilibriumTempK: detail?.pl_eqt ?? 'unknown',
      facility: detail?.disc_facility ?? 'unknown',
      detailFetchFailed: detailResult.status === 'rejected',
    };
  });

  return report;
}

function printReport(report) {
  console.log('=== Exoplanet Report ===\n');
  report.forEach((entry) => {
    console.log(`${entry.name} (host: ${entry.hostStar}, discovered ${entry.discoveredYear})`);
    console.log(`  orbital period: ${entry.orbitalPeriodDays} days`);
    console.log(`  equilibrium temp: ${entry.equilibriumTempK} K`);
    console.log(`  discovery facility: ${entry.facility}`);
    if (entry.detailFetchFailed) {
      console.log('  (detail fetch failed for this planet — showing list data only)');
    }
    console.log('');
  });
}

async function main() {
  try {
    const report = await exploreSystem('TRAPPIST-1');
    printReport(report);
  } catch (err) {
    console.log('The exploration failed:', err.message);
    console.log('\nThis is expected if running without network access to');
    console.log('exoplanetarchive.ipac.caltech.edu. With network access,');
    console.log('this prints a full report combining the list endpoint');
    console.log('with concurrently-fetched per-planet detail, e.g.:\n');
    printReport([
      {
        name: 'TRAPPIST-1 e',
        hostStar: 'TRAPPIST-1',
        discoveredYear: 2017,
        orbitalPeriodDays: 6.1,
        equilibriumTempK: 251,
        facility: 'Transiting Exoplanet Survey Satellite (TESS)',
        detailFetchFailed: false,
      },
    ]);
  }
}

main();

/**
 * This file is the payoff of the entire module: a real fetch() call,
 * correct response.ok checking, a list-then-detail pattern, bounded
 * concurrency reusing module 04's promise pool, and defensive
 * handling of partially-failed detail fetches (using allSettled-
 * style semantics inside the pool so one failed detail fetch doesn't
 * take down the whole report) — every idea from modules 00 through
 * 07 converging on one small, real, useful program.
 */