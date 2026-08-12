# Promise Fundamentals

## The state machine, precisely

```
        resolve(value)
pending ───────────────► fulfilled  (has a VALUE)
   │
   │ reject(reason)
   └───────────────────► rejected   (has a REASON, usually an Error)
```

- **pending -> fulfilled** and **pending -> rejected** are the ONLY two
  legal transitions. There is no transition out of fulfilled or rejected —
  once settled, a Promise is done, forever, with that exact value/reason.
- "Settled" = fulfilled OR rejected (i.e., not pending anymore).
- A Promise's state is internal — you can't synchronously ask a Promise
  "are you fulfilled yet?" There's no `.isFulfilled()` in the standard API.
  The ONLY way to observe a Promise's outcome is to attach a `.then()`/
  `.catch()` handler (or `await` it) and let it tell you when it settles.

## Files here

- `01-what-is-a-promise.js` — creating a Promise and inspecting it (as much as you can)
- `02-promise-states.js` — watching state transitions happen via console.log timing
- `03-pending.js` — a Promise that never settles, and why that's dangerous
- `04-fulfilled.js` — the fulfilled state in isolation
- `05-rejected.js` — the rejected state in isolation
- `06-settled.js` — proving settling is permanent (extra resolve/reject calls are no-ops)

## Exercises

- `exercises/01-promise-lifecycle.js`
- `exercises/02-predict-state.js`