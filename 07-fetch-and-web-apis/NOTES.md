# NOTES — Fetch & Web APIs

## Why "Web APIs" and not "JavaScript APIs"

As covered in module 00's `web-apis/` sub-topic: `fetch`, `XMLHttpRequest`,
geolocation, and the Clipboard API are NOT part of the JavaScript
language. They're provided by the host environment (the browser, or in
Node's case, a built-in implementation added in Node 18+ for `fetch`
specifically). This module is where that distinction becomes practical —
these are real tools you reach for constantly, and it's worth remembering
they follow the environment's rules (CORS, browser permissions, Node's
particular fetch implementation quirks), not just JavaScript's.

## fetch vs XMLHttpRequest, at a glance

| | fetch | XMLHttpRequest (XHR) |
|---|---|---|
| Returns | a Promise | nothing — uses events/callbacks |
| Introduced | 2015 (Fetch API spec) | 1999 (part of the original AJAX toolkit) |
| Error handling | `.catch()` / try-catch with await | `onerror` event handler |
| HTTP error status (404, 500) | does NOT reject — you must check `response.ok` | does NOT "reject" either — check `.status` |
| Streaming responses | supported via `response.body` (a ReadableStream) | supported via `progress` events |
| Upload progress | not directly supported (as of the base Fetch API) | supported via `upload.onprogress` |
| Request cancellation | via AbortController (module 09) | via `.abort()` method |

The most important shared gotcha, worth internalizing NOW: **neither
fetch nor XHR treats an HTTP error status (404, 500, etc.) as a failure
by default.** Both only "fail" (reject / fire `onerror`) for NETWORK-level
problems (DNS failure, connection refused, CORS block). A 404 or 500
response is still a "successful" fetch from the Promise's perspective —
you have to check the status code yourself. This trips up nearly
everyone the first time they use `fetch`.

## Files here

See each sub-topic's own NOTES.md.
