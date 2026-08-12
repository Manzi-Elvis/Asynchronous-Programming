/**
 * Exercise 01 — Trace the error chain
 *
 * For the chain below, WITHOUT running it, write in a comment:
 *   - Which named step(s) actually execute
 *   - Which catch block (if any) intercepts the failure
 *   - What the final logged output is
 * Then run it and check yourself.
 */

function step(name, behavior) {
  // behavior: 'ok' | 'throw' | 'reject'
  return (input) => {
    console.log(`  running ${name}`);
    if (behavior === 'throw') throw new Error(`${name} threw`);
    if (behavior === 'reject') return Promise.reject(new Error(`${name} rejected`));
    return `${input}->${name}`;
  };
}

Promise.resolve('start')
  .then(step('A', 'ok'))
  .then(step('B', 'reject'))
  .then(step('C', 'ok')) // does this run?
  .catch((err) => {
    console.log('  catch #1:', err.message);
    return 'recovered-after-1';
  })
  .then(step('D', 'throw'))
  .then(step('E', 'ok')) // does this run?
  .catch((err) => {
    console.log('  catch #2:', err.message);
  })
  .then(() => console.log('  chain finished'));

// Your prediction, written before running:
