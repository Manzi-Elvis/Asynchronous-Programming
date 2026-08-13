/**
 * 03-fetch-details.js
 *
 * Goal: fetch ADDITIONAL detail for a single planet, as a second,
 * separate request — the "detail" half of a "list then detail"
 * master-detail pattern that's extremely common in real APIs (get a
 * summary list cheaply, then fetch fuller detail per-item only when
 * needed).
 */

function buildPlanetDetailUrl(planetName) {
  // A second, more detailed query for a SPECIFIC planet by exact name.
  const query = `select pl_name,hostname,disc_year,disc_facility,pl_orbper,pl_eqt from pscomppars where pl_name = '${encodeURIComponent(planetName)}'`;
  const baseUrl = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync';
  return `${baseUrl}?query=${query}&format=json`;
}

async function fetchPlanetDetail(planetName) {
  const url = buildPlanetDetailUrl(planetName);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Detail request failed for "${planetName}": ${response.status}`);
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error(`No detail found for "${planetName}"`);
  }

  return data[0]; // exact-name query should return exactly one row
}

async function main() {
  try {
    const detail = await fetchPlanetDetail('Kepler-10 b');
    console.log('Detail for Kepler-10 b:');
    console.log(detail);
  } catch (err) {
    console.log('Request failed:', err.message);
    console.log('\nWith network access, this would return something like:');
    console.log(
      JSON.stringify(
        {
          pl_name: 'Kepler-10 b',
          hostname: 'Kepler-10',
          disc_year: 2011,
          disc_facility: 'Kepler',
          pl_orbper: 0.837,
          pl_eqt: 2169,
        },
        null,
        2
      )
    );
  }
}

main();