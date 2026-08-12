# Promise.all()

## What it does

Takes an iterable of Promises (or plain values — non-Promises are treated
as already-fulfilled). Returns a single Promise that:

- **Fulfills** with an array of all the fulfilled values, **in the same
  order as the input**, once every input Promise has fulfilled.
- **Rejects immediately** with the reason of the FIRST Promise to reject —
  as soon as any one fails, `Promise.all` doesn't wait for the rest.

```js
const results = await Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3),
]);
// results is [user1, user2, user3], in that exact order,
// regardless of which fetch actually finished first
```

## Order is preserved even though completion order isn't

This is a common point of confusion: the RESULTS array is always in input
order, even if, say, the third Promise actually resolved before the
first. `Promise.all` tracks each input's position and slots its result
in correctly — you never have to worry about "which result belongs to
which input."

## Fail-fast: the other Promises don't stop, they're just ignored

When one Promise rejects and `Promise.all` rejects immediately, the OTHER
Promises don't get cancelled — they keep running in the background (JS
Promises have no built-in cancellation, see module 09 for how
AbortController fills that gap). `Promise.all` just stops WAITING for
them; their eventual results (or further errors) are silently discarded
by `Promise.all` itself, though any unhandled rejection among them can
still trigger Node's `unhandledRejection` warning if nothing else
catches them.

## When to reach for it

Use `Promise.all` when partial success is USELESS to you — e.g. you need
a user AND their permissions AND their settings before you can render a
page at all; getting 2 out of 3 doesn't help.

## Files here

- `01-basic-all.js` — the fulfilled case, order preservation
- `02-ordering.js` — proving result order matches input order regardless of completion order
- `03-failure.js` — fail-fast behavior, and the "other promises keep running" gotcha

## Exercises

- `exercises/01-fetch-all.js`