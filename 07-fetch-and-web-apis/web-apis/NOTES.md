# Other Common Web APIs

## What's here

A few other commonly-used browser Web APIs that follow the same
async/callback/Promise patterns you've now seen repeatedly, so you can
recognize the pattern immediately rather than needing to relearn it for
each new API. These are BROWSER-ONLY APIs (no Node equivalent), so the
files here describe accurate behavior and, where reasonable, simulate it
so the ASYNC PATTERN is still runnable and instructive in Node.

## Geolocation API — callback-based, NOT Promise-based

```js
navigator.geolocation.getCurrentPosition(
  (position) => console.log(position.coords.latitude, position.coords.longitude),
  (error) => console.log('Failed to get location:', error.message)
);
```

Notice: success and error are TWO SEPARATE callback arguments, not an
error-first single callback and not a Promise. This is an older API
design predating both conventions — a good example of "not everything in
the browser follows the same convention," and a reason the
Promise-wrapping technique from `xhr/03-xhr-to-promise.js` is broadly
useful.

## Clipboard API — Promise-based (modern)

```js
await navigator.clipboard.writeText('some text');
const text = await navigator.clipboard.readText();
```

A newer API, designed Promise-native from the start — no wrapping needed.
Requires a secure context (HTTPS) and, in most browsers, a user gesture
(can't silently read/write the clipboard from arbitrary background code).

## File API — mixed: some Promise-based, some event-based

Reading a `File` object (e.g. from an `<input type="file">` or drag-and-
drop) can be done via the older `FileReader` (event-based:
`onload`/`onerror`) or the newer `File.prototype.text()` /
`.arrayBuffer()` (Promise-based, mirroring `Response`'s body methods from
the `fetch/` sub-topic).

## Files here

- `01-geolocation.js` — the two-callback pattern, and wrapping it in a Promise
- `02-clipboard.js` — a modern, Promise-native API by contrast
- `03-file-api.js` — FileReader (event-based) vs File.text() (Promise-based) side by side