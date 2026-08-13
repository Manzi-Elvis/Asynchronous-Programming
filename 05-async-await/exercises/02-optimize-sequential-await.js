/**
 * Exercise 02 — Optimize sequential await into concurrent await
 *
 * The function below fetches a product's price from three different
 * suppliers to compare them, but does so sequentially even though
 * the three fetches are completely independent. Rewrite it to fetch
 * concurrently, and measure the speedup.
 */

function fetchPriceFromSupplier(supplierName, productId, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const price = (Math.random() * 50 + 10).toFixed(2);
      resolve({ supplier: supplierName, productId, price: Number(price) });
    }, delayMs);
  });
}

// --- BUGGY: unnecessarily sequential ---

async function comparePricesSequential(productId) {
  const priceA = await fetchPriceFromSupplier('SupplierA', productId, 100);
  const priceB = await fetchPriceFromSupplier('SupplierB', productId, 80);
  const priceC = await fetchPriceFromSupplier('SupplierC', productId, 120);
  return [priceA, priceB, priceC];
}

// TODO: rewrite to be concurrent
async function comparePricesConcurrent(productId) {
  // your implementation here
}

async function time(label, fn) {
  const start = Date.now();
  const result = await fn();
  console.log(`${label}: ${Date.now() - start}ms`);
  return result;
}

async function runComparison() {
  const sequentialResults = await time('Sequential', () => comparePricesSequential('PROD-1'));
  console.log('Prices:', sequentialResults);

  const concurrentResults = await time('Concurrent', () => comparePricesConcurrent('PROD-1'));
  console.log('Prices:', concurrentResults);

  console.log('\nExpect: Sequential ~300ms, Concurrent ~120ms');
}

// runComparison();

/**
 * Bonus: extend comparePricesConcurrent to also find and return the
 * CHEAPEST price among the three, still using concurrent fetching.
 */

async function findCheapestPrice(productId) {
  // your implementation here
}

// findCheapestPrice('PROD-1').then((cheapest) => console.log('\nCheapest:', cheapest));