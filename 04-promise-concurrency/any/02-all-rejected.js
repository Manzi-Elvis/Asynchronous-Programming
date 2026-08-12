/**
 * 02-all-rejected.js
 *
 * Goal: trigger the AggregateError case — every input rejects — and
 * inspect its .errors array.
 */

function fail(reason, ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(reason)), ms));
}

async function main() {
  console.log('--- All three inputs will reject ---\n');

  try {
    await Promise.any([
      fail('mirror-us unreachable', 30),
      fail('mirror-eu unreachable', 50),
      fail('mirror-asia unreachable', 70),
    ]);
    console.log('This never prints');
  } catch (err) {
    console.log('Caught:', err.constructor.name); // AggregateError
    console.log('err instanceof AggregateError:', err instanceof AggregateError);
    console.log('err.message:', err.message); // generic summary message
    console.log('\nIndividual errors, in input order:');
    err.errors.forEach((e, i) => console.log(`  [${i}]`, e.message));
  }
}

main();

/**
 * Practical pattern: when you catch an AggregateError from
 * Promise.any, you have full visibility into WHY every single
 * source failed, not just a generic "everything failed" message.
 * This is valuable for logging/debugging a redundant-source failure:
 * you can tell at a glance whether it was a systemic issue (all
 * errors are the same, e.g. all "network unreachable") or something
 * source-specific (different error per mirror).
 */