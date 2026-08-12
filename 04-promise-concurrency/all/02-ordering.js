/**
 * 02-ordering.js
 *
 * Goal: prove decisively that Promise.all's RESULT ORDER always
 * matches INPUT order, even when the fastest-resolving Promise
 * finishes last in the input array and vice versa.
 */

function delay(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  (actually resolved: "${value}" after ${ms}ms)`);
      resolve(value);
    }, ms);
  });
}

async function main() {
  console.log('Input order: [slow(200ms), fast(20ms), medium(100ms)]');
  console.log('Watch the "(actually resolved...)" logs for REAL completion order:\n');

  const results = await Promise.all([
    delay('slow (200ms)', 200),
    delay('fast (20ms)', 20),
    delay('medium (100ms)', 100),
  ]);

  console.log('\nFinal results array (should match INPUT order, not completion order):');
  console.log(results);
  // Expect: ['slow (200ms)', 'fast (20ms)', 'medium (100ms)']
  // even though the console logs above show fast/medium/slow as the
  // REAL completion order.
}

main();