/**
 * 02-success-and-error.js
 *
 * Goal: exercise both paths of an error-first API deliberately, AND
 * demonstrate the "called back twice" bug — a real and surprisingly
 * common mistake when error paths aren't given an early `return`.
 */

function withdrawFunds(accountBalance, amount, callback) {
  setTimeout(() => {
    if (amount <= 0) {
      callback(new Error('Withdrawal amount must be positive'));
      // BUG: no `return` here! Execution falls through to the code
      // below, which will call `callback` a SECOND time.
    }

    if (amount > accountBalance) {
      callback(new Error('Insufficient funds'));
      // Same bug pattern repeated for a second condition.
    }

    // If we reach here after ALSO having called back with an error
    // above (because of the missing returns), this fires the
    // callback a second or even third time for one logical
    // operation — most callback consumers are NOT written to handle
    // being invoked more than once.
    const newBalance = accountBalance - amount;
    callback(null, newBalance);
  }, 20);
}

console.log('--- Buggy version: negative amount triggers a DOUBLE callback ---');
let callCount = 0;
withdrawFunds(100, -10, (err, newBalance) => {
  callCount++;
  if (err) {
    console.log(`  call #${callCount}: error ->`, err.message);
  } else {
    console.log(`  call #${callCount}: success -> new balance:`, newBalance);
  }
});
// Watch the output: the callback fires TWICE for this single
// withdrawFunds call — once with the validation error, once again
// with a (nonsensical) "successful" negative withdrawal.

/**
 * --- THE FIX: always `return` immediately after calling back on an
 * error path, guaranteeing the callback fires EXACTLY once. ---
 */

function withdrawFundsFixed(accountBalance, amount, callback) {
  setTimeout(() => {
    if (amount <= 0) {
      callback(new Error('Withdrawal amount must be positive'));
      return; // <- the fix
    }

    if (amount > accountBalance) {
      callback(new Error('Insufficient funds'));
      return; // <- the fix
    }

    const newBalance = accountBalance - amount;
    callback(null, newBalance);
  }, 20);
}

setTimeout(() => {
  console.log('\n--- Fixed version: exactly ONE callback invocation per call ---');

  let fixedCallCount = 0;
  withdrawFundsFixed(100, -10, (err, newBalance) => {
    fixedCallCount++;
    console.log(`  call #${fixedCallCount}:`, err ? err.message : `new balance ${newBalance}`);
  });

  withdrawFundsFixed(100, 30, (err, newBalance) => {
    console.log('  valid withdrawal ->', err ? err.message : `new balance ${newBalance}`);
  });

  withdrawFundsFixed(100, 500, (err, newBalance) => {
    console.log('  over-withdrawal ->', err ? err.message : `new balance ${newBalance}`);
  });
}, 60);

/**
 * Guarding rule to internalize: EVERY branch inside an async
 * callback-based function that calls `callback(...)` must be the
 * LAST thing that branch does — either because it's naturally the
 * end of the function, or because you explicitly `return` right
 * after. This is such a common bug that many teams enforce it via
 * lint rules (e.g. the `callback-return` ESLint rule) or simply
 * migrate to Promises, which make "resolved/rejected twice" a
 * structural impossibility — see module 03.
 */