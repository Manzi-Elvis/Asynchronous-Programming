/**
 * 02-transform-values.js
 *
 * Goal: use a chain as a genuine data pipeline — each .then()
 * purely transforms data, similar in spirit to Array.prototype.map,
 * but with async steps interspersed naturally wherever needed.
 */

function fetchRawSalesData() {
  return Promise.resolve([
    { product: 'Widget', units: 12, priceCents: 999 },
    { product: 'Gadget', units: 5, priceCents: 2499 },
    { product: 'Gizmo', units: 30, priceCents: 499 },
  ]);
}

function enrichWithTax(items) {
  // Pure synchronous transform, still fits naturally in the chain.
  const TAX_RATE = 0.08;
  return items.map((item) => ({
    ...item,
    subtotalCents: item.units * item.priceCents,
    taxCents: Math.round(item.units * item.priceCents * TAX_RATE),
  }));
}

function fetchDiscountRate(product) {
  // Simulate an async lookup — a genuinely async step mixed into
  // the pipeline, same as any synchronous transform step.
  const discounts = { Widget: 0.1, Gadget: 0, Gizmo: 0.05 };
  return new Promise((resolve) => {
    setTimeout(() => resolve(discounts[product] ?? 0), 10);
  });
}

async function applyDiscounts(items) {
  // Using Promise.all here previews module 04 — running the
  // per-item discount lookups CONCURRENTLY rather than one at a
  // time, since they don't depend on each other.
  const discountRates = await Promise.all(items.map((item) => fetchDiscountRate(item.product)));
  return items.map((item, i) => ({
    ...item,
    discountCents: Math.round(item.subtotalCents * discountRates[i]),
  }));
}

function computeTotals(items) {
  return items.map((item) => ({
    ...item,
    totalCents: item.subtotalCents + item.taxCents - item.discountCents,
  }));
}

fetchRawSalesData()
  .then((raw) => enrichWithTax(raw))
  .then((withTax) => applyDiscounts(withTax)) // returns a Promise — chain waits for it
  .then((withDiscounts) => computeTotals(withDiscounts))
  .then((final) => {
    console.log('Final sales report:');
    final.forEach((item) => {
      console.log(`  ${item.product}: $${(item.totalCents / 100).toFixed(2)}`);
    });
    const grandTotal = final.reduce((sum, item) => sum + item.totalCents, 0);
    console.log(`  Grand total: $${(grandTotal / 100).toFixed(2)}`);
  })
  .catch((err) => console.error('Report generation failed:', err.message));

/**
 * Notice the chain mixes SYNCHRONOUS transform steps (enrichWithTax,
 * computeTotals — plain functions returning plain values) with a
 * genuinely ASYNCHRONOUS step (applyDiscounts, returning a Promise)
 * seamlessly. The chain doesn't care which kind of step it is — it
 * just keeps flattening and waiting as needed (see then/03-return-promise.js
 * for exactly why that flattening works).
 */