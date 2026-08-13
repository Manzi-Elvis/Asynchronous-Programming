# Exoplanet Explorer

A small project tying together everything in this module: `fetch`,
correct HTTP error handling, and concurrent requests — built against
NASA's real, public Exoplanet Archive API (no API key required).

## What it does

1. Fetches a list of confirmed exoplanets matching a search term (by host
   star name).
2. For each result, concurrently fetches additional detail (simulated
   here as a second call, mirroring how a real master-detail API often
   works: one endpoint for a list, another for per-item detail).
3. Handles network and HTTP errors gracefully throughout, using the
   `response.ok` pattern from `../fetch/04-http-errors.js`.
4. Prints a clean, combined report.

## Running it

Requires network access to `exoplanetarchive.ipac.caltech.edu`. If you're
running this in an offline sandbox, every file is written to catch that
specific failure clearly and explain what WOULD happen with network
access, so it's still fully readable and instructive offline.

```bash
node 05-parallel-requests.js
```

## Files, in build-up order

- `01-fetch-planets.js` — the basic list-fetching call
- `02-display-planets.js` — formatting and displaying the results cleanly
- `03-fetch-details.js` — fetching one item's additional detail
- `04-error-handling.js` — the full error-handling story: network errors, HTTP errors, malformed data
- `05-parallel-requests.js` — the finished mini-app: list + concurrent detail fetches + a final report

## What this project reinforces

- `fetch` returns a Promise that resolves on ANY response, so
  `response.ok` must always be checked (module `fetch/04-http-errors.js`).
- Real-world data is messy — a field might be `null`, missing, or an
  unexpected type, and defensive code has to account for that alongside
  the purely async concerns.
- Fetching a LIST, then fetching DETAIL for each item concurrently, is
  an extremely common real-world shape — and it's exactly the
  `Promise.all(items.map(fetchDetail))` pattern from module 04, now
  applied to a real API instead of `setTimeout` simulations.