/**
 * 01-sequential-await.js
 *
 * Goal: a genuinely dependent pipeline — each step needs the
 * previous step's actual result to proceed, so sequential await is
 * the CORRECT choice here, not a missed optimization.
 */

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  fetched user ${id}`);
      resolve({ id, name: 'Elvis', primaryAddressId: 42 });
    }, 60);
  });
}

function fetchAddress(addressId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  fetched address ${addressId}`);
      resolve({ id: addressId, city: 'Kigali', country: 'Rwanda' });
    }, 60);
  });
}

function fetchShippingRates(country) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  fetched shipping rates for ${country}`);
      resolve({ country, standard: 5.99, express: 14.99 });
    }, 60);
  });
}

async function getShippingOptionsForUser(userId) {
  // Each step here NEEDS the previous one's actual value:
  //   - can't fetch an address without knowing the address ID,
  //     which only comes from the user record
  //   - can't fetch shipping rates without knowing the country,
  //     which only comes from the address record
  // This is a genuine dependency chain, not an artificial one.
  const user = await fetchUser(userId);
  const address = await fetchAddress(user.primaryAddressId);
  const rates = await fetchShippingRates(address.country);
  return rates;
}

async function main() {
  console.log('Fetching shipping options (genuinely sequential)...');
  const start = Date.now();
  const rates = await getShippingOptionsForUser(1);
  console.log(`Done in ${Date.now() - start}ms:`, rates);
  console.log('\n~180ms total (60+60+60) is CORRECT here — there is no way');
  console.log('to know the address ID before fetching the user, so these');
  console.log('three calls cannot be parallelized no matter how clever you get.');
}

main();