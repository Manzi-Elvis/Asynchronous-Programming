/**
 * 01-nested-callbacks.js
 *
 * Goal: build the minimal possible pyramid of doom — four trivial
 * steps, each depending on the last — just to FEEL the structural
 * problem before looking at a realistic example.
 */

function step1(callback) {
  setTimeout(() => {
    console.log('step1 done');
    callback(null, 1);
  }, 10);
}

function step2(input, callback) {
  setTimeout(() => {
    console.log('step2 done, input was', input);
    callback(null, input + 1);
  }, 10);
}

function step3(input, callback) {
  setTimeout(() => {
    console.log('step3 done, input was', input);
    callback(null, input + 1);
  }, 10);
}

function step4(input, callback) {
  setTimeout(() => {
    console.log('step4 done, input was', input);
    callback(null, input + 1);
  }, 10);
}

// --- The pyramid ---
step1((err1, result1) => {
  if (err1) {
    console.error('step1 failed:', err1.message);
    return;
  }
  step2(result1, (err2, result2) => {
    if (err2) {
      console.error('step2 failed:', err2.message);
      return;
    }
    step3(result2, (err3, result3) => {
      if (err3) {
        console.error('step3 failed:', err3.message);
        return;
      }
      step4(result3, (err4, result4) => {
        if (err4) {
          console.error('step4 failed:', err4.message);
          return;
        }
        console.log('ALL STEPS DONE. Final result:', result4);
      });
    });
  });
});

/**
 * Notice: this is only FOUR steps, each doing almost nothing, and
 * it's already hard to visually track which `if (err)` belongs to
 * which step, and how deeply nested the "finally done" log is. Real
 * production flows regularly need 5-10+ sequential async steps
 * (validate input, check permissions, look up related records, write
 * to a database, send a notification, log an audit event...) — this
 * pattern gets unmanageable fast, which is exactly why Promises and
 * async/await exist.
 */