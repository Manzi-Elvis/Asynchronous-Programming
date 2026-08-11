/**
 * 01-basic-stack.js
 *
 * Goal: SEE the call stack grow and shrink by logging on the way in
 * and on the way out of each function.
 *
 * Predict the order of the logs before running this file.
 */

function first() {
  console.log('1. enter first');
  second();
  console.log('6. exit first');
}

function second() {
  console.log('2. enter second');
  third();
  console.log('5. exit second');
}

function third() {
  console.log('3. enter third');
  console.log('4. exit third (nothing left to call)');
}

first();

/**
 * Stack timeline:
 *
 *  []
 *  [first]                  <- first() called
 *  [first, second]          <- second() called from inside first
 *  [first, second, third]   <- third() called from inside second
 *  [first, second]          <- third() returned, popped
 *  [first]                  <- second() returned, popped
 *  []                       <- first() returned, popped
 *
 * Notice: execution is strictly LIFO. `third` cannot finish before it
 * starts, and `second` cannot resume until `third` is completely done.
 * There is no way for two frames to run "at the same time" — this is
 * exactly why we need callbacks/Promises/async-await for anything that
 * takes real-world time (network, disk, timers): they get the WAITING
 * off the stack, not the code itself.
 */