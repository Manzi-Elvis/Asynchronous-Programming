/**
 * Exercise 01 — Sequential pipeline
 *
 * Build a function `runMigrations(migrations)` that runs an array of
 * "migration" functions IN ORDER, one at a time — each migration
 * must fully complete before the next starts (this mirrors how real
 * database migration tools work: migrations MUST run in sequence,
 * never concurrently, because migration N+1 might depend on schema
 * changes made by migration N).
 *
 * Each migration function returns a Promise that resolves with a
 * short description string of what it did.
 *
 * Requirements:
 *   - Use the reduce pattern from 02-reduce-chain.js.
 *   - If ANY migration rejects, stop immediately — don't run
 *     subsequent migrations — and propagate the error out of
 *     runMigrations, including which migration index failed.
 *   - Return an array of all completed migration descriptions if
 *     everything succeeds.
 */

function makeMigration(name, shouldFail = false) {
  return function migration() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error(`Migration "${name}" failed: constraint violation`));
          return;
        }
        resolve(`Applied: ${name}`);
      }, 30);
    });
  };
}

function runMigrations(migrations) {
  // migrations: array of functions, each returning a Promise
  // your implementation here
}

async function runTests() {
  console.log('--- Test 1: all migrations succeed ---');
  const goodMigrations = [
    makeMigration('create_users_table'),
    makeMigration('add_email_index'),
    makeMigration('add_created_at_column'),
  ];
  const results = await runMigrations(goodMigrations);
  console.log('All applied:', results);

  console.log('\n--- Test 2: third migration fails, should stop there ---');
  const failingMigrations = [
    makeMigration('create_orders_table'),
    makeMigration('add_orders_index'),
    makeMigration('broken_migration', true),
    makeMigration('this_should_never_run'),
  ];
  try {
    await runMigrations(failingMigrations);
    console.log('This should not print');
  } catch (err) {
    console.log('Correctly stopped:', err.message);
  }
}

// runTests();