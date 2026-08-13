/**
 * 03-return-values.js
 *
 * Goal: trace exactly how a `return` inside an async function
 * becomes the fulfilled value of the Promise that function call
 * produced — including the case of returning ANOTHER Promise.
 */

async function simpleReturn() {
  return 'a plain string';
}

simpleReturn().then((v) => console.log('simpleReturn resolved to:', v));

// --- Returning a Promise: it gets "flattened," not double-wrapped ---

function innerAsyncOperation() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('value from inner promise'), 50);
  });
}

async function returnsAPromise() {
  return innerAsyncOperation();
  // NOT Promise<Promise<string>> — JS automatically "unwraps" a
  // returned promise so callers still just get Promise<string>.
  // This is the Promise Resolution Procedure from module 03's
  // resolution/ sub-topic, applying here too.
}

returnsAPromise().then((v) => console.log('returnsAPromise resolved to:', v));

// --- Equivalently, awaiting before returning (same end result) ---

async function awaitsThenReturns() {
  const value = await innerAsyncOperation();
  return value;
  // This is functionally identical to `return innerAsyncOperation();`
  // above — awaiting-then-returning and directly-returning-a-promise
  // both flatten to the same single-level Promise for the caller.
}

awaitsThenReturns().then((v) => console.log('awaitsThenReturns resolved to:', v));

// --- No return statement at all -> resolves to undefined ---

async function noReturn() {
  console.log('doing work with no return value');
}

noReturn().then((v) => console.log('noReturn resolved to:', v)); // undefined

// --- Returning inside a conditional ---

async function conditionalReturn(shouldSucceed) {
  if (shouldSucceed) {
    return { status: 'ok' };
  }
  return { status: 'skipped' };
}

conditionalReturn(true).then((v) => console.log('\nconditionalReturn(true):', v));
conditionalReturn(false).then((v) => console.log('conditionalReturn(false):', v));