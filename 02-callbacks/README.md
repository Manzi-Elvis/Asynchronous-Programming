# 02 — Callbacks

Callbacks are the original async pattern in JavaScript: instead of waiting
for a return value, you hand a function to another function and say "call
this when you're done." Every later pattern (Promises, async/await) is
built ON TOP of callbacks under the hood — a `.then()` callback and an
`await` continuation are both, mechanically, still callbacks. Understanding
callbacks deeply is what makes Promises feel like "the same idea, better
syntax" rather than a totally different concept.

## Sub-topics, in order

1. **callbacks/** — the basic pattern: pass a function, get called back later
2. **error-first-callbacks/** — the Node.js convention for handling errors without exceptions
3. **callback-hell/** — what happens when you nest callbacks for sequential async steps
4. **inversion-of-control/** — the deeper problem callback hell is a symptom of, and why it matters even after you "fix" the nesting

## Why this module exists even though Promises are better

You will still encounter callback-based APIs constantly: DOM event
listeners, Node's `fs` callback API, many older npm packages, animation
frame callbacks, WebSocket message handlers. You need to be fluent in
reading and writing them, AND you need to understand exactly what problem
Promises solved, which you can only really appreciate by feeling the pain
of callback hell and inversion of control firsthand.

## Files here

See each sub-topic's own README/NOTES for its file list.