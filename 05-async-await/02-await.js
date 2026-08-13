/**
 * 02-await.js
 *
 * Goal: see `await` pause an async function's execution, and prove
 * that OTHER code keeps running during that pause — the "pause" is
 * local to the async function, not global.
 */

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function pausedFunction() {
  console.log('1: pausedFunction started');
  const result = await delay('resolved value', 100);
  // Execution of THIS function suspends here for ~100ms. Nothing
  // after this line runs until the awaited Promise settles.
  console.log('4: pausedFunction resumed with:', result);
  return 'done';
}

console.log('Calling pausedFunction()...');
pausedFunction().then((finalResult) => {
  console.log('5: pausedFunction fully resolved with:', finalResult);
});

// This code runs WHILE pausedFunction is suspended at its await —
// proof that await does not block the whole program.
console.log('2: this runs immediately after calling pausedFunction');
console.log('3: pausedFunction is paused right now, but this still executes');

/**
 * Output order: 1, 2, 3, 4, 5 — even though pausedFunction() is
 * "called" before lines 2 and 3 run, its internal execution only
 * gets as far as the await before control returns to the caller.
 * Lines 2 and 3 run in that gap. Only once the 100ms timer resolves
 * does pausedFunction's execution RESUME (line 4), as a microtask.
 */

// --- await unwraps a Promise's fulfilled value directly ---

async function multipleAwaits() {
  console.log('\n--- Sequential awaits, one at a time ---');
  const a = await delay('A', 30);
  console.log('  got a:', a);
  const b = await delay('B', 30);
  console.log('  got b:', b);
  const c = await delay('C', 30);
  console.log('  got c:', c);
  console.log('  all done sequentially');
}

multipleAwaits();

// --- await also works on non-Promise values, trivially ---

async function awaitPlainValue() {
  const value = await 42; // not a Promise — await just passes it through
  console.log('\nawait on a plain value:', value);
}

awaitPlainValue();