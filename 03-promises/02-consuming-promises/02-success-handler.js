/**
 * 02-success-handler.js
 *
 * Goal: focus purely on the onFulfilled path — receiving values,
 * transforming them, and understanding that .then() ALWAYS returns
 * a NEW Promise (previewed here, covered fully in then/ and chaining/).
 */

function fetchNumber() {
  return Promise.resolve(21);
}

const doubled = fetchNumber().then((n) => n * 2);

console.log('doubled is a Promise, not a number yet:', doubled);

doubled.then((finalValue) => {
  console.log('finalValue:', finalValue); // 42
});

/**
 * `.then()`'s return value is ALWAYS a new Promise, regardless of
 * what the handler function returns. If the handler returns a plain
 * value (like `n * 2` above), that new Promise resolves with that
 * value. This is the mechanism that makes CHAINING possible — see
 * chaining/ for the full treatment.
 */

console.log('\n--- Transforming data through a pipeline of .then() calls ---');

function fetchRawUserData() {
  return Promise.resolve({ first_name: 'Elvis', last_name: 'Manzi', age_years: 25 });
}

fetchRawUserData()
  .then((raw) => ({
    // reshape snake_case API response into camelCase
    firstName: raw.first_name,
    lastName: raw.last_name,
    age: raw.age_years,
  }))
  .then((user) => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }))
  .then((user) => {
    console.log('final transformed user:', user);
  });

/**
 * Each .then() in that chain takes the PREVIOUS handler's return
 * value as its input — a clean, linear data pipeline, versus the
 * nested pyramid you'd get doing the equivalent with plain callbacks.
 */