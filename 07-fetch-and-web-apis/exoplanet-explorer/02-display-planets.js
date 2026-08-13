/**
 * 02-display-planets.js
 *
 * Goal: take the raw fetched data and format it into a clean,
 * readable report — and handle the REALISTIC messiness of real API
 * data (missing/null fields) defensively, which is just as important
 * as handling async failures.
 */

function buildExoplanetQueryUrl(hostStarSearchTerm) {
  const query = `select pl_name,hostname,disc_year,pl_rade,pl_bmasse from pscomppars where hostname like '%25${encodeURIComponent(hostStarSearchTerm)}%25'`;
  const baseUrl = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync';
  return `${baseUrl}?query=${query}&format=json`;
}

async function fetchExoplanets(hostStarSearchTerm) {
  const url = buildExoplanetQueryUrl(hostStarSearchTerm);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Exoplanet Archive request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function formatPlanet(planet) {
  // Real astronomical data frequently has missing measurements (not
  // every planet has a known radius or mass) — defend against null
  // the same way you'd defend against a missing field from any API.
  const radius = planet.pl_rade != null ? `${planet.pl_rade} Earth radii` : 'unknown radius';
  const mass = planet.pl_bmasse != null ? `${planet.pl_bmasse} Earth masses` : 'unknown mass';
  const year = planet.disc_year != null ? `discovered ${planet.disc_year}` : 'discovery year unknown';

  return `  ${planet.pl_name} (orbiting ${planet.hostname}) — ${year}, ${radius}, ${mass}`;
}

function displayPlanets(planets) {
  console.log(`\n${planets.length} planet(s) found:\n`);
  planets.forEach((planet) => console.log(formatPlanet(planet)));
}

async function main() {
  try {
    const planets = await fetchExoplanets('TRAPPIST-1');
    displayPlanets(planets);
  } catch (err) {
    console.log('Request failed:', err.message);
    console.log('\nDemonstrating the formatter on sample data instead:\n');

    const sampleData = [
      { pl_name: 'TRAPPIST-1 b', hostname: 'TRAPPIST-1', disc_year: 2016, pl_rade: 1.12, pl_bmasse: null },
      { pl_name: 'TRAPPIST-1 e', hostname: 'TRAPPIST-1', disc_year: 2017, pl_rade: 0.92, pl_bmasse: 0.69 },
    ];
    displayPlanets(sampleData);
  }
}

main();