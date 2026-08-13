/**
 * 01-fetch-planets.js
 *
 * Goal: the first real call — fetch a list of confirmed exoplanets
 * from NASA's Exoplanet Archive TAP (Table Access Protocol) service,
 * which accepts SQL-like ADQL queries and can return JSON directly.
 *
 * No API key needed — this is a fully public, open endpoint.
 */

function buildExoplanetQueryUrl(hostStarSearchTerm) {
  // ADQL (Astronomical Data Query Language) is SQL-like. We select a
  // few useful columns from the "planetary systems composite
  // parameters" table (pscomppars), filtering by host star name.
  const query = `select pl_name,hostname,disc_year,pl_rade,pl_bmasse from pscomppars where hostname like '%25${encodeURIComponent(hostStarSearchTerm)}%25'`;
  const baseUrl = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync';
  return `${baseUrl}?query=${query}&format=json`;
}

async function fetchExoplanets(hostStarSearchTerm) {
  const url = buildExoplanetQueryUrl(hostStarSearchTerm);
  console.log('Fetching:', url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Exoplanet Archive request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

async function main() {
  try {
    const planets = await fetchExoplanets('Kepler');
    console.log(`\nFound ${planets.length} matching planets.`);
    console.log('First result:', planets[0]);
  } catch (err) {
    console.log('\nRequest failed:', err.message);
    console.log('This is expected if you\'re running without network access to');
    console.log('exoplanetarchive.ipac.caltech.edu (e.g. in a sandboxed environment).');
    console.log('\nWith network access, this would return an array of objects like:');
    console.log(
      JSON.stringify(
        [{ pl_name: 'Kepler-10 b', hostname: 'Kepler-10', disc_year: 2011, pl_rade: 1.47, pl_bmasse: 3.72 }],
        null,
        2
      )
    );
  }
}

main();