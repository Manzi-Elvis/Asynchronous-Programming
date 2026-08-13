# 07 — Fetch & Web APIs

Modules 03-06 built the theory of Promises and the event loop using
mostly `setTimeout`-simulated delays. This module applies all of that to
REAL asynchronous browser/Node APIs: `fetch` (the modern, Promise-based
way to make network requests), `XMLHttpRequest` (the older, callback/event-
based way — still worth knowing, since plenty of code and libraries still
use it), and a few other common Web APIs. It closes with a small project
(`exoplanet-explorer/`) that ties fetch, error handling, and concurrent
requests together against a real public API.

## Sub-topics

1. **fetch/** — the modern Promise-based HTTP client built into browsers and Node 18+
2. **xhr/** — XMLHttpRequest, and wrapping it in a Promise to interoperate with modern async code
3. **web-apis/** — a few other common async Web APIs (geolocation, clipboard, File API)
4. **exoplanet-explorer/** — a small project combining fetch, error handling, and parallel requests against NASA's public Exoplanet Archive API

## A note on running these examples

Files in this module make REAL network requests to public APIs
(`jsonplaceholder.typicode.com` for general examples, NASA's Exoplanet
Archive for the project). If you're running these without network access,
every fetch will reject with a network error — the demos are written to
catch and report that clearly rather than crash, so you can still read
and understand the code and its comments even offline. Try running them
with network access at least once, though; seeing real HTTP behavior
(status codes, real latency, real JSON) is worth it.

## Files here

See each sub-topic's own NOTES.md for details.
