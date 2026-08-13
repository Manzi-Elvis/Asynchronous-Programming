# XMLHttpRequest (XHR)

## What it is

The original browser API for making asynchronous HTTP requests,
predating `fetch` by over a decade. It's entirely callback/event-based —
no Promises involved natively. You'll still encounter it in older
codebases, some libraries (historically Axios used XHR internally in
browsers, though this has evolved), and it's worth understanding both as
history and because "wrap a callback-based API in a Promise" is a
genuinely reusable skill (module 02's whole point, applied here
concretely).

## The basic shape

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.log('HTTP error:', xhr.status);
  }
};
xhr.onerror = () => console.log('Network error');
xhr.send();
```

Note: XHR is a BROWSER API. It does not exist in Node.js by default —
the demos in this folder describe the pattern and, where runnable, use a
small XHR-shaped polyfill so the async/event mechanics can still be
exercised in this Node-based curriculum. If you want to see REAL XHR
behavior, the code in this folder is written to also work correctly
pasted into a browser console.

## Why wrap XHR in a Promise at all?

So it can participate in `async/await`, `Promise.all`, `.then()` chains,
and every other Promise-based tool from modules 03-06 — without a wrapper,
XHR-based code can't be `await`ed and doesn't compose with modern async
patterns at all.

## Files here

- `01-xhr.js` — the basic XHR shape, event-based
- `02-ready-state.js` — XHR's readyState lifecycle, another event to know about
- `03-xhr-to-promise.js` — wrapping XHR in a Promise, making it await-able

## Exercises

- `exercises/01-wrap-xhr.js`