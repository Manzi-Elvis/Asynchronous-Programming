/**
 * 01-basic-race.js
 *
 * Goal: the simplest race — three Promises with different delays,
 * only the fastest one's value comes through.
 */

function delay(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  ("${value}" would have resolved at ${ms}ms)`);
      resolve(value);
    }, ms);
  });
}

async function main() {
  console.log('Racing three delayed values: 200ms, 50ms, 100ms\n');

  const winner = await Promise.race([
    delay('slow (200ms)', 200),
    delay('fast (50ms)', 50),
    delay('medium (100ms)', 100),
  ]);

  console.log('\nWinner:', winner); // 'fast (50ms)'

  console.log('\nNotice the other two still logged their completion above —');
  console.log('they kept running in the background even after losing the race.');
}

main();